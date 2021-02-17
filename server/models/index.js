var mongoose = require('mongoose');

mongoose.connect(`mongodb+srv://kc-admin:${process.env.MDB_PASSWORD}@cluster0.me1l8.mongodb.net/kc-app?retryWrites=true&w=majority`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false
})

module.exports.User = require("./user");
module.exports.Message = require("./message");