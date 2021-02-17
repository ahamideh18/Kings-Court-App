const serverless = require('serverless-http');
const
    express = require('express'),
    app = express()
const
    bodyParser = require('body-parser'),
    cors = require('cors'),
    cookieParser = require('cookie-parser'),
    session = require("express-session")

require('dotenv').config();

const messageRouter = require('./routes/messages')
const authRouter = require('./routes/users')

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use(cors({
    origin: true, credentials: true
}))
app.use(cookieParser())

app.use(session({
    secret: `${process.env.AUTH_SECRET}`,
    resave: false,
    saveUninitialized: false,
    cookie: {
        expires: 60 * 60 * 24
    }
}));

app.get('/', (req, res) => {
    res.json("HELLO SERVER")
});

app.use('/api/messages', messageRouter);
app.use('/api/user', authRouter)

app.listen(process.env.PORT || 3000, () => {
    console.log('Server running on port 3000')
})

module.exports.handler = serverless(app);