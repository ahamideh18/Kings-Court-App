const mongoose = require('mongoose');
const bcrypt = require("bcryptjs");

var userSchema = mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    profileImageUrl: {
        type: String
    },
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ],
    likedMessages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Message"
        }
    ]
}, { timestamps: true });

userSchema.pre("save", function (next) {
    const user = this;
    if (!user.isModified("password")) {
        return next();
    }
    bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(user.password, salt, (err, hash) => {
            user.password = hash;
            next();
        });
    });
});

userSchema.methods = {
    comparePassword: function (password, done) {
        bcrypt.compare(password, this.password, (err, isMatch) => {
            done(err, isMatch);
        });
    }
};

const User = mongoose.model('User', userSchema);
module.exports = User;