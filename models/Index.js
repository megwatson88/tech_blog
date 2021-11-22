const User = require('./User');
const Post = require('./Post');
const Comment = require('./Comment');

//creating associations 
User.hasMany(Post, {
    foreignKey: 'userId',
    onDelete: 'CASCADE'
});
//post association
Post.belongsTo(User, {
    forginKey: 'userId',
    onDelete: 'CASCADE'
});

Post.hasMany(Comment, {
    forginKey: 'postId',
    onDelete: 'CASCADE'
});

//comment association
Comment.belongsTo(User, {
    forginKey: 'userId',
    onDelete: 'CASCADE'
});

Comment.belongsTo(Post, {
    forginKey: 'postId',
    onDelete: 'CASCADE'
})

module.exports = {
    User, Comment, Post
};