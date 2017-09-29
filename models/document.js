'use strict';


const mongoose = require('mongoose');

const Schema = mongoose.Schema;


var Photo = mongoose.Schema({
    url: {
        type: String,
        length: 255
    },

    rapidID: String

});
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/nem_test', { useMongoClient: true });

module.exports = mongoose.model('files', Photo);