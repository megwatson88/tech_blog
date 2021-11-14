const router = require('express').Router();
const sequelize = require('../config/connection');
const { Post, User, Comment } = require('../models');

router.get('/', (req, res) => {
    console.log('========');
    Post.findAll({
        indclude: {User},
    }).then(dbPostData => {
            const posts = dbPostData.map((post) => post.get({ plain: true }));
            res.render('past-post', { posts });
        })
        .catch(err => {
            console.log(err);
            res.status(500).json(err);
        });
});
//get single post 
router.get('/post/:id', (req, res) => {
    Post.findByPk(req.params.id, {
        indclude: [
            User,
            {
                model: Comment,
                indclude: [User]
            }
        ]
    }).then(dbPostData =>{
        if (dbPostData){
            const post = dbPostData.get({ plain: true });
            res.render('single-post', { post });
            res.status(404).json({message: 'No Post with this id'});
            return;
        }
    })
    .catch(err =>{
        console.log(err);
        res.status(500).json(err);
    });
}); 

router.get('/login', (req, res)=> {
    if (req.session.loggedIn) {
        res.redirect('/');
        return;
    }
    res.render('logged in')
});
router.get('/signup', (req, res) => {
    if (req.session.loggedIn) {
        res.redirect('/');;
        return;
    }
    res.render('sign-up')
});


module.exports = router;