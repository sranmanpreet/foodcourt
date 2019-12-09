require('./config/config');
require('./models/db');

const mongoose = require('mongoose');
const bodyparser = require('body-parser');
const express = require('express');
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);

const rtsChatbot = require('./routes/chatbot.router');
const rtsIndex = require('./routes/index.router');

var app = express();

app.use(bodyparser.json());
app.use(session({
    name: "fcSession",
    secret: "fcSession",
    resave: false,
    saveUninitialized: false,
    secure: false,
    store: new MongoStore({
        mongooseConnection: mongoose.connection
    }),
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 * 30
    }
}));

app.use(function(req, res, next) {
    res.locals.session = req.session;
    next();
})

// error handler
app.use((err, req, res, next) => {
    if (err.name === 'ValidationError') {
        var valErrors = [];
        Object.keys(err.errors).forEach(key => valErrors.push(err.errors[key].message));
        res.status(422).send(valErrors)
    }
});

app.use('/api/chat', rtsChatbot);
app.use('/api', rtsIndex);

app.listen(process.env.PORT, () => console.log('Server started at port :' + process.env.PORT));