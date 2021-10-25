const { Model, DataTypes } = require('sequelize');
const bcrypt = require('bcrypt');
const sequalize = require('sequelize');

//creates user model
class User extends Model {
    checkPassword(loginPw) {
        return bcrypt.compareSync(logingPW, this.password)
    }
}

//creates fields and comlums for user 

User.init(
    {
    id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true
    },
    userName: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
            len: [4]
        }
    }
},
    {
        hooks: {
            async beforeCreate(newUserData){
                updatedUserData.password = await 
                bcrypt.hash(updatedUserData.password, 10);
                return newUserData;
            },
            async beforeUpdate(updatedUserData){
                updatedUserData.password = await bcrypt.hash(updatedUserData.password, 10);
                return updatedUserData
            }
        },
        sequalize,
        timestamps: false,
        freezeTableNameL: true,
        underscored: true,
        modelName: 'user'

    }
);

module.exports = User;