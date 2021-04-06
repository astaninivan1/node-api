const express = require('express');
const mongoose = require('mongoose');

const app = express();
const jsonParser = express.json();
const apiRouter = express.Router();
const usersRouter = express.Router();

const Schema = mongoose.Schema;
const userScheme = new Schema({name: String, age: Number}, {versionKey: false});
const User = mongoose.model("User", userScheme);


mongoose.connect('mongodb://localhost:27017/usersdb',{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false},
    (err) => {
    if(err) return console.log(err);
    app.listen(3000, () => console.log('Service started!'));
    app.use('/api', jsonParser, apiRouter);
})

apiRouter.use('/users', usersRouter);
usersRouter.get('/', ((req, res) => {
    User.find({}, (err, users) => {
        if(err) return console.log(err);
        res.send(users)
    });
}));
