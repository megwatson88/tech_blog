const router = require('express').Router();
const { User, Post, Comment, Vote } = require('../../models');

router.get('/', (req, res) => {
    User.findall({
        attributes: { exclude: ['password'] }
    })
    .then(dbUserData => res.json(dbUserData))
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    User.findOne({
        attributes: { exclude: ['password'] },
        where: {
            id: req.params.id
        },
        include: [
            {
                module: Post,
                attributes: ['id', 'title', 'post_url', 'created_at']
            },
            {
                module: Comment,
                attributes: ['id', 'comment_text', 'created_at'],
                include: {
                    module: Post,
                    attributes: ['title']
                }
            },
        ]
    })
    .then(dvUserData => {
        if (!dbUserData) {
            res.status(404).json({ message: 'No user found with this id'});
            return;
        }
        res.json(dbUserData);
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) =>  {
    User.create({
        username: req.body.username,
        email: req.body.email,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(()=> {
         req.session.user_is = dbUserData.id;
         req.session.username = dbUserData.user_name;
         req.session.loggedIn = true;
         
         res.json(dbUserData);
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

router.post('/', (req, res) => {
    User.findOne({
        where: {
            email: req.body.email
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user with that email' });
            return;
        }
        const validPassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword) {
            res.status(400).json({ message: 'Incorrect password!'});
            return;
        }
        req.session.save(() =>{
            req.session.user_id = dbUserData.id;
            req.session.username = dbUserData.id;
            req.session.loggedIn = true;

            res.json({ user: dbUserData, message: 'You are now logged in! '});
        });
    });
});

