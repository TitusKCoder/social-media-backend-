const Schema = require('mongoose');

const reactionSchema = new Schema(
    {
        reactionId:{ 
            type: Schema.Types.ObjectId,
            default: new Schema.Types.ObjectId,
        },
        reactionBody: {
            type: String,
            required: true,
            validate: {
                validator: 'isLength',
                arguements: [1,280],
                message: 'The text must be between 1 ans 280 characters.'
            }
        },
        username: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            //Use a getter method to format the timestamp on query
        }
    }
); 

module.exports = Reaction;