'use strict';

const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const reportSchema = mongoose.Schema({
    
    
    profileObj : Object,
    growableObj : Object,
    referenceid : String,
    rapidID : String,
    created_at: String,
});


mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost:27017/nem_test', { useMongoClient: true });

module.exports = mongoose.model('report', reportSchema);