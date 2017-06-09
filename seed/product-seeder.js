var Product = require('../models/product');
var mongoose = require('mongoose');
mongoose.connect('localhost:27017/shopping');
var products = [
    new Product({
        imagePath: 'bear.jpg',
        title: "小熊",
        description: "熊熊",
        price: 120
    }),
    new Product({
        imagePath: 'bear.jpg',
        title: "小熊",
        description: "熊熊",
        price: 120
    }),
    new Product({
        imagePath: 'bear.jpg',
        title: "小熊",
        description: "熊熊",
        price: 120
    }),
    new Product({
        imagePath: 'bear.jpg',
        title: "小熊",
        description: "熊熊",
        price: 120
    }),
    new Product({
        imagePath: 'bear.jpg',
        title: "小熊",
        description: "熊熊",
        price: 120
    }),
    new Product({
        imagePath: 'bear.jpg',
        title: "小熊",
        description: "熊熊",
        price: 120
    }),
    new Product({
        imagePath: 'bear.jpg',
        title: "小熊",
        description: "熊熊",
        price: 120
    }),
    new Product({
        imagePath: 'bear.jpg',
        title: "大熊",
        description: "熊熊",
        price: 120
    }),
    new Product({
        imagePath: 'bear.jpg',
        title: "小熊",
        description: "熊熊",
        price: 120
    }),
    new Product({
        imagePath: 'bear.jpg',
        title: "小熊",
        description: "熊熊",
        price: 120
    }),
    new Product({
        imagePath: 'bear.jpg',
        title: "小熊",
        description: "熊熊",
        price: 120
    }),
    new Product({
        imagePath: 'bear.jpg',
        title: "最后一只小熊",
        description: "熊熊",
        price: 120
    })
];
var done = 0;
for (var i = 0; i < products.length; i++) {
    products[i].save(function(err, result) {
        done++;
        if (done === products.length) {
            exit();
        }
    })
}

function exit() {
    mongoose.disconnect();
}
