const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/desafio', {useNewUrlParser: true, useUnifiedTopology: true,useCreateIndex: true});
mongoose.Promise = global.Promise;

module.exports = mongoose;