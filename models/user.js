const { Schema, model } = require('mongoose');

const userSchema = new Schema(
    {
        username: {
            type: String,
            unique: true,
            required: true,
            trim: true,
        },
        email: {
            type: String,
            required: true,
            unique: true,
            validate: (input) => {
                return validator.isEmail(input)
            },
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Thought'
            }
        ],
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User'
            }
        ]
    },
    {
        toJSON: {
            virtuals: true,
        }
    }
);

userSchema.virtual('friendCount')
.get(function() {
    let friendCounter = this.friends.length;
    return friendCounter;
});

const User = model('user', userSchema);

module.exports = User;
