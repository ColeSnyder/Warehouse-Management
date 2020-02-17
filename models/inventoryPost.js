// Copyright Cole Snyder 2020 
const mongoose = require('mongoose');

// schema
const Schema = mongoose.Schema;
const InventorySchema = new Schema({
    InventoryID: String,
    ProductID: String,
    BinID: String,
    QTY: String
});

// model
const InventoryPost = mongoose.model('InventoryPost', InventorySchema);

const data = {
    InventoryID: '3',
    ProductID: '234',
    BinID: '1',
    QTY: '1000'
}

const newInventoryPost = new InventoryPost(data); //instance of the model

module.exports = InventoryPost;