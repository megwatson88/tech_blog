const { Sequalize, Model, DataTypes } = require('sequalize');
const sequalize = require('../config/connection');

class Comment extends Model {
    checkPassword(loginPassWord) {
        return bcrypt.compareSync(loginPassWord, this.password);
    };
};

Comment.init(
    {
       id: {
           type: DataTypes.INTEGER,
           allowNull: false, 
           primaryKey: true,
           autoIncrement: true,
       },
       comment_text: {
           type: DataTypes.STRING,
           allowNull: false,
           validate: {
               len: [1]
           }
       }, 
       user_id: {
           type: DataTypes.INTEGER,
           reference: {
            Model: 'post',
            key: 'id'
           }
       }
    },
    {
        sequalize, 
        freezeTableName: true,
        underscored: true,
        modleName: 'comment'
    }
);

module.exports = Comment;