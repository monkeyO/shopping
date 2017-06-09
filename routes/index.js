var express = require('express');
var router = express.Router();

var Product = require("../models/product");
var Cart = require("../models/cart");
/* 路由 */
router.get('/', function(req, res, next) {
    Product.find(function(err, docs) {
        var productChucks = [];
        var chucksize = 3;
        for (var index = 0; index < docs.length; index += chucksize) {
            productChucks.push(docs.slice(index, index + chucksize));
        }
        res.render('shop/index', {
            title: '商城购物',
            products: productChucks
        });
    })
});
//添加购物车
router.get('/add-to-cart/:id', function(req, res, next) {
    var productId = req.params.id;
    var cart = new Cart(req.session.cart ? req.session.cart : {
        items: {}
    });
    Product.findById(productId, function(err, product) {
        if (err) {
            return res.redirect('/');
        }
        cart.add(product, product.id);
        req.session.cart = cart;
        res.redirect('/');
    });
});
router.get('/shopping-cart', function(req, res, next) {
    if (!req.session.cart) {
        return res.render('shop/shopping-cart', {
            products: null
        });
    }
    var cart = new Cart(req.session.cart);
    console.log(req.session.cart);
    res.render('shop/shopping-cart', {
        products: cart.generateArray(),
        totalPrice: cart.totalPrice
    });
});
module.exports = router;
