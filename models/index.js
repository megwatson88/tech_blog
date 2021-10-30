const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');


User.hasMany(Post, {
    foreignKey: 'user_id',
});

Post.belongsTo(User, {
    forginKey: 'userId',
    onDelete: 'CASCADE'
});

User.belongsToMany(Post, {
    through: 'user_id',
    onDelete: 'SET NULL'
});

POST.belongsToMany(User, {
    through: 'user_id',
    onDelete: 'SET NULL'
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
};