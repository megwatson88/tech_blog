const { Model, DataType } = require('sequalize');
const sequalize = require('../config/connection');

class Post extends Model {
    
}

Post.init(
{
    title: DataType.STRING,
    body: DataType.STRING
},
{
    sequalize
}

);



module.exports = Post;