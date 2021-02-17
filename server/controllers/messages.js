var db = require('../models');

exports.getMessages = (req, res) => {
    db.Message.find()
        .sort({ createdAt: "desc" })
        .populate("author", {
            username: true,
            profileImageUrl: true
        })
        .then((messages) => {
            res.json(messages);
        })
        .catch((err) => {
            res.send(err);
        })
}

exports.getMessage = (req, res) => {
    db.Message.findOne({ _id: req.params.message_id })
        .then((message) => {
            res.json(message);
        })
        .catch((err) => {
            res.send(err)
        })
}

exports.createMessage = (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            success: false,
            error: 'Message cannot be empty',
        })
    }

    const message = new db.Message({ ...req.body, author: req.user._id })
    message.save()
        .then(() => {
            return db.User.findById(req.user._id);
        })
        .then((user) => {
            user.messages.unshift(message);
            user.save();
        })
        .then(() => {
            // res.redirect('/')
            res.status(201).json(message)
        })
        .catch((err) => {
            res.json(err);
        })
}

exports.createReply = (req, res) => {
    const reply = new db.Message({ ...req.body, author: req.user._id })
    reply.save()
        .then(() => {
            return db.Message.findById(req.params.message_id);
        })
        .then((message) => {
            message.replies.unshift(reply);
            message.save();
        })
        .then(() => {
            // res.redirect('/')
            res.status(201).json(reply)
        })
        .catch((err) => {
            res.json(err);
        })
}

exports.likeMessage = (req, res) => {
    db.User.findById(req.user._id)
        .then((user) => {
            const likeOrDislike = user.likedMessages.includes(req.params.message_id) ? 1 : -1;
            db.Message.findById(req.params.message_id)
                .then((message) => {
                    message.likes -= likeOrDislike;
                    message.save()
                })
            if (likeOrDislike === -1) {
                user.likedMessages.unshift(req.params.message_id)
            } else {
                const msgIndex = user.likedMessages.indexOf(req.params.message_id)
                user.likedMessages.splice(msgIndex, 1)
            }
            user.save()
        })
        .then(() => {
            res.status(201).json("Message Patched")
        })
        .catch((err) => {
            console.log(err)
            res.status(400).json(err)
        });
}

exports.deleteMessage = (req, res) => {
    db.Message.findOneAndDelete({ _id: req.params.message_id })
        .then((message) => {
            res.json({ message: 'DELETED' });
        })
        .catch((err) => {
            res.send(err);
        })
}

module.exports = exports;