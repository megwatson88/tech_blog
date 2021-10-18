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

