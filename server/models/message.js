const mongoose = require('mongoose');
const User = require('./user')

var messageSchema = mongoose.Schema({
    text: {
        type: String,
        required: true,
        maxLength: 248
    },
    author: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User"
    },
    likes: {
        type: Number,
        default: 0
    },
    replies: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
}, { timestamps: true });

messageSchema.post('findOneAndDelete', { query: true }, (returnedMessage) => {
    User.findById(returnedMessage.author)
        .then((user) => {
            const idx = user.messages.indexOf(returnedMessage._id)
            user.messages.splice(idx, 1)
            user.save()
        })
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;