const router = require('express').Router();
const { Post, User, Comment } = require('../../models/');
const withAuth = require('../../utils/auth');

router.post('/', withAuth, (req, res) => {
    const body = req.body;
    Post.create({ ...body, userId: req.session.userId })
    .then(newPost => {
        res.json(newPost)
    })
    .catch(err => {
        res.status(500).json(err)
    });
});

router.post('/:id', withAuth, (req, res) => {
    Post.update( req.body, {
        where: {
            id: req.params.id
        }
    })
        .then(affectedRows => {
            if (affectedRows > 0) {
               res.status(200).end();
            } else {
                res.status(404).end();
            }
        })
        .catch(err => {
            res.status(500).json(err);
        })
});

router.post('/', withAuth, (req, res) => {
    Post.create({
        title: req.body.title,
        post_url: req.body.post_url,
        user_id: req.session.user_id
    })
        .then(dbPostData => res.json(dbPostData))
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});


router.put('/:id', withAuth, (req, res) => {
    Post.update(
        {
            title: req.body.title
        },
        {
            where: {
                id: req.params.id
            }
        }
    )
        .then(dbPostData => {
            if (!dbPostData) {
                res.status(404).json({ message: 'No post found with this id' });
                return;
            }
            res.json(dbPostData);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

router.delete('/:id', withAuth, (req, res) => {
    // console.log('id', req.params.id);
    Post.destroy({
        where: {
            id: req.params.id
        }
    })
        .then(affectedRows => {
            if (affectedRows) {
                res.status(200).end();
            } else {
                res.status(404).end()
                return;
            }
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});

module.exports = router;
