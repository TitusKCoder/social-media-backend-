const {Schema, Types} = require('mongoose');
const moment = require('moment');


const reactionSchema = new Schema(
    {
        reactionId:{ 
            type: Schema.Types.ObjectId,
            default: new Types.ObjectId
        },
        reactionText: {
            type: String,
            required: true,
            maxlength: 280,
        },
        userName: {
            type: String,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (timestamp) => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a'),
        }
    },
    {
        toJSON: {
            getters: true
        },
        id: false
    }
); 

module.exports = reactionSchema;