const {Schema , model } = require('mongoose');
const reactionSchema = require('./reaction');

const thoughtSchema = new Schema(
    {
        thoughtText: {
            type: String,
            required: true,
            validate: {
                validator: 'isLength',
                arguements: [1,280],
                message: 'The text must be between 1 ans 280 characters.'
            }
        },
        createdAT: {
            type: Date,
            default: Date.now(),
            // use a getter methond to format the timestamp on query. What does this mean
        },
        username: {
            type: String,
            required: true,
        },
        reactions:[reactionSchema],
    },
    {
        toJSON: {
            virtuals: true,
            getters: true,
        }
    }
);

thoughtSchema.virtual('reactionCount')
.get(function() {
    reactionCounter = this.reactions.length;
    return reactionCounter;
})

const Thought = new model('thought', thoughtSchema);

module.exports = Thought;