const router = require('express').Router();
const { User } = require('../../models/Index');

router.post('/', (req, res) => {
    User.create({
        username: req.body.username,
        password: req.body.password
    })
    .then(dbUserData => {
        req.session.save(() => {
            req.session.userId = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            res.json(dbUserData)
        })
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});
//loggin in or creating an account
router.post('/login', (req, res) => {
    User.findOne({
        where: {
            username: req.body.username
        }
    }).then(dbUserData => {
        if (!dbUserData) {
            res.status(400).json({ message: 'No user found' });
            return;
        }
        const validatePassword = dbUserData.checkPassword(req.body.password);

        if (!validPassword){
            res.status(400).json({ message: 'wrong password'});
            return
        }

        req.session.save(() => {
            req.session.userId = dbUserData.id;
            req.session.username = dbUserData.username;
            req.session.loggedIn = true;
            
            res.json({ user: dbUserData, message: 'You are logged in'});
        });
    });
});

router.post('/logout', (req, res) => {
    if (res.session.loggedIn) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    }
    else {
        res.status(404).end();
    }
});

router.delete('/:id', (req, res) => {
    User.destroy({
        where: {
            id: req.params.id
        }
    })
    .then(dbUserData => {
        if (!dbUserData) {
            res.status(404).json
        }
    })
    .catch(err => {
        console.log(err);
        res.status(500).json(err);
    });
});

module.exports = router; 