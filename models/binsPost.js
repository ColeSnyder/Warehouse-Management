// Copyright Cole Snyder 2020 
const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;

// getting unique documnet id will have to do with this declaration and the find() function in api.js
const BinsSchema = new Schema({
    BinID: String,
    BinName: String,
    ID: String
});

// model for db. This will be used in api.js
const BinsPost = mongoose.model('BinsPost', BinsSchema);

module.exports = BinsPost;