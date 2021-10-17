const router = require('express').Router();
const { createPool } = require('mysql2/promise');
const sequalize = require('../config/connection');
const sequelize = require('../config/connection');
const { Post, User, Comment, Vote } = require('../models');
const withAuth = require('../utils/auth');

router.get('/', (req, res) => {
    console.log('======');
    Post.findall({
        attritubtes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequelize.literal('(SELECT COUNT(*) FROM vote WHERE post.id = vote.post_id)'), 'vote_count']
        ],
        include: [
            {
                model: Comment,
                attritubtes: ['id', 'comment_text', 'post_id', 'user_id', 'created_at'],
                include: {
                    model: User,
                    attritubtes: ['username']
                }
            },
            {
                model: User,
                attritubtes: ['username']
            }]
    })
    .then(dbPostData => res.json(dbPostData))
    .catch(err => {
        res.status(500).json(err);
    });
});

router.get('/:id', (req, res) => {
    Post.findOne({
        where:{
            id: req.params.id
        },
        attritubtes: [
            'id',
            'post_url',
            'title',
            'created_at',
            [sequalize.literal('(SELECT COUNT(*) FROM VOTE WHERE post.id = vote.post_id)'), 'vote_count']
        ], 
        include: [
            {
                model: Comment, 
                attritubtes: ['id', 'comment_text', 'post_id', 'created_at'
            ], 
            include: {
                model: User, 
                attritubtes: ['username']
            }
            }
        ]
    })
    .then(dbPostData => {
        if (!dbPostData) {
            res.status(404).json({ message: 'No Post Found'});
            return;
        }
        res.json(dbPostData);
    })
    .catch(err => {
        res.status(500).json(err);
    });
});

