const User = require('./user');
const Post = require('./Post');
const Comment = require('./comment');

Post.belongsTo(User, {
    forginKey: 'userId',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    forginKey: 'postId',
    onDelete: 'CASCADE'
});

Comment.belongsTo(User, {
    forginKey: 'userId',
    onDelete: 'CASCADE'
});

module.exports ={
    User, Comment, Post
}