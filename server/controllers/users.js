const jwt = require('jsonwebtoken');

const db = require('../models');

exports.signUp = (req, res) => {
    const body = req.body;

    db.User.create(body)
        .then((newUser) => {
            var token = jwt.sign({ _id: newUser._id }, process.env.AUTH_SECRET, { expiresIn: "60 days" });
            res.cookie('nToken', token, { maxAge: 900000, httpOnly: true });
            // res.redirect('/')
            return res.status(200).json(token);
        })
        .catch((err) => {
            res.json(err);
        })
}

exports.signIn = (req, res) => {
    const { username, password } = req.body;

    db.User.findOne({ username })
        .then((user) => {
            if (!user) {
                return res.status(401).send({ message: "User does not exist" });
            }

            const { _id, username, profileImageUrl, email } = user
            user.comparePassword(password, (err, isMatch) => {
                if (!isMatch) {
                    return res.status(401).send({ message: "Incorrect Username or Password" });
                }

                const sessionUser = { _id, username, email, profileImageUrl };
                const token = jwt.sign({ _id }, process.env.AUTH_SECRET, { expiresIn: "60 days" });
                res.cookie("nToken", token, { maxAge: 90000, httpOnly: true });
                req.session.user = token;
                // res.redirect('/')
                return res.status(200).json({ token, sessionUser })
            })
        })
        .catch(err => {
            console.log(err);
        });
}

exports.logout = (req, res) => {
    res.clearCookie('nToken');
    res.redirect('/');
}

exports.checkAuth = (req, res) => {
    res.send(req.cookies.nToken)
}

module.exports = exports;
