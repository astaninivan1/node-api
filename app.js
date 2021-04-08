const express = require('express');
const mongoose = require('mongoose');
const apiRouter = require('./routes/api.router');

const app = express();
const jsonParser = express.json();

app.use('/api', jsonParser, apiRouter);

mongoose.connect('mongodb://localhost:27017/usersdb',{ useUnifiedTopology: true, useNewUrlParser: true, useFindAndModify: false},
    (err) => {
    if(err) return console.log(err);
    app.listen(3000, () => console.log('Service started!'));
});
