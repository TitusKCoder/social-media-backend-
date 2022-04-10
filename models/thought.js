const {Schema , model } = require('mongoose');
const reactionSchema = require('./reaction');
const moment = require('moment');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            maxlength: 280,
            minlength: 1,
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            get: (timestamp) => moment(timestamp).format('MMMM Do YYYY, h:mm:ss a'),
        },
        userName: {
            type: String,
            required: true,
        },
        reactions:[reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        },
        _id: false,
    }
);

thoughtSchema.virtual('reactionCount')
.get(function() {
    reactionCounter = this.reactions.length;
    return reactionCounter;
})

const Thought = new model('thought', thoughtSchema);

module.exports = Thought;