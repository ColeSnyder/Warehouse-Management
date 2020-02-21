// Copyright Cole Snyder 2020 
const express = require('express');
const router = express.Router();
mongo = require('mongodb');

const BinsPost = require('../models/binsPost');
const ProductPost = require('../models/productPost');
const InventoryPost = require('../models/inventoryPost');
const OrderPost = require('../models/orderPost');
const OrderLinesPost = require('../models/orderLinesPost');

// GET FUNCTIONS

router.get('/products', (req, res) => {

    ProductPost.find({ })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ', dataerror);
        });
});

router.get('/bins', (req, res) => {
    BinsPost.find({ })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ', dataerror);
        });
});

router.get('/inventory', (req, res) => {
    InventoryPost.find({ })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ', dataerror);
        });
});

router.get('/orders', (req, res) => {
    OrderPost.find({ })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ', dataerror);
        });
});

router.get('/order-lines', (req, res) => {
    OrderLinesPost.find({ })
        .then((data) => {
            console.log('Data: ', data);
            res.json(data);
        })
        .catch((error) => {
            console.log('Error: ', dataerror);
        });
});

// POST FUNCTIONS

router.post('/saveBin', (req, res) => {
    console.log('Body: ', req.body);
    const data = req.body;
    const newBinPost= new BinsPost(data);
    // .save 
    newBinPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Internal Server Error.'});
            return;
        } 
        res.json({
            msg: 'Server recieved data'
        }); 
    });
});

router.post('/saveProduct', (req, res) => {
    console.log('Body: ', req.body);
    const data = req.body;
    const newProductPost= new ProductPost(data);
    // .save 
    newProductPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Internal Server Error.'});
            return;
        } 
        res.json({
            msg: 'Server recieved data'
        }); 
    });
});

router.post('/saveInventory', (req, res) => {
    console.log('Body: ', req.body);
    const data = req.body;
    const newInventoryPost= new InventoryPost(data);
    // .save 
    newInventoryPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Internal Server Error.'});
            return;
        } 
        res.json({
            msg: 'Server recieved data'
        }); 
    });
});

router.post('/saveOrderLines', (req, res) => {
    console.log('Body: ', req.body);
    const data = req.body;
    const newOrderLinesPost= new OrderLinesPost(data);
    // .save 
    newOrderLinesPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Internal Server Error.'});
            return;
        } 
        res.json({
            msg: 'Server recieved data'
        }); 
    });
});

router.post('/saveOrder', (req, res) => {
    console.log('Body: ', req.body);
    const data = req.body;
    const newOrderPost= new OrderPost(data);
    // .save 
    newOrderPost.save((error) => {
        if (error) {
            res.status(500).json({ msg: 'Internal Server Error.'});
            return;
        } 
        res.json({
            msg: 'Server recieved data'
        }); 
    });
});

// DELETE FUNCTIONS 

router.post('/deleteBin/:id', (req, res) => {

    const id = req.params.id;

    BinsPost.deleteOne({ "_id" : new mongo.ObjectId(id)}, function (err) {
        if (err){
            console.log("there has been an error");
        } else {
            console.log("no error as far as I can tell");
        }
    });

});

router.post('/deleteProduct/:id', (req, res) => {

    const id = req.params.id;

    ProductPost.deleteOne({ "_id" : new mongo.ObjectId(id)}, function (err) {
        if (err){
            console.log("there has been an error");
        } else {
            console.log("no error as far as I can tell");
        }
    });

});

router.post('/deleteOrder/:id', (req, res) => {

    const id = req.params.id;

    OrderPost.deleteOne({ "_id" : new mongo.ObjectId(id)}, function (err) {
        if (err){
            console.log("there has been an error");
        } else {
            console.log("no error as far as I can tell");
        }
    });

});

router.post('/deleteInventory/:id', (req, res) => {

    const id = req.params.id;

    InventoryPost.deleteOne({ "_id" : new mongo.ObjectId(id)}, function (err) {
        if (err){
            console.log("there has been an error");
        } else {
            console.log("no error as far as I can tell");
        }
    });

});

router.post('/deleteOrderLines/:id', (req, res) => {

    const id = req.params.id;
    
    OrderLinesPost.deleteOne({ "_id" : new mongo.ObjectId(id)}, function (err) {
        if (err){
            console.log("there has been an error");
        } else {
            console.log("no error as far as I can tell");
        }
    });

});

// UPDATE FUNCTIONS

router.post('/updateBin/:id/:BinID/:BinName', (req, res) => {

    const id = req.params.id;

    BinsPost.findOneAndUpdate({ "_id" : new mongo.ObjectId(id)}, {BinName: req.params.BinName, BinID: req.params.BinID}).then(function() {
        console.log("Document was updated");
    });

});

router.post('/updateProduct/:id/:ProductID/:SKU/:ProductDescription', (req, res) => {

    const id = req.params.id;

    ProductPost.findOneAndUpdate({ "_id" : new mongo.ObjectId(id)}, {ProductID: req.params.ProductID, SKU: req.params.SKU, ProductDescription: req.params.ProductDescription}).then(function() {
        console.log("Document was updated");
    });

});

router.post('/updateOrder/:id/:OrderID/:OrderNumber/:DateOrdered/:CustomerName/:CustomerAddress', (req, res) => {

    const id = req.params.id;

    OrderPost.findOneAndUpdate({ "_id" : new mongo.ObjectId(id)}, {OrderID: req.params.OrderID, OrderNumber: req.params.OrderNumber, DateOrdered: req.params.DateOrdered, CustomerName: req.params.CustomerName, CustomerAddress: req.params.CustomerAddress}).then(function() {
        console.log("Document was updated");
    });

});

router.post('/updateInventory/:id/:InventoryID/:ProductID/:BinID/:QTY', (req, res) => {

    const id = req.params.id;

    InventoryPost.findOneAndUpdate({ "_id" : new mongo.ObjectId(id)}, {InventoryID: req.params.InventoryID, ProductID: req.params.ProductID, BinID: req.params.BinID, QTY: req.params.QTY}).then(function() {
        console.log("Document was updated");
    });

});

router.post('/updateOrderLines/:id/:OrderLineID/:OrderID/:ProductID/:QTY', (req, res) => {

    const id = req.params.id;

    OrderLinesPost.findOneAndUpdate({ "_id" : new mongo.ObjectId(id)}, {OrderLineID: req.params.OrderLineID, OrderID: req.params.OrderID, ProductID: req.params.ProductID, QTY: req.params.QTY}).then(function() {
        console.log("Document was updated");
    });

});

router.get('*', (request, response) => {
    response.sendFile(path.resolve(__dirname, 'index.html'))
});

module.exports = router;
