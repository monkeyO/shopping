var express = require('express');
var router = express.Router();
var csurf = require('csurf');
var passport = require('passport');
var csrfProtection = csurf();
router.use(csrfProtection);
//优先级注意
//跳转页面
router.get('/profile',isLoggedIn,function(req, res, next) {
    res.render('user/profile');
});
//退出登录
router.get('/logout',function(req,res,next){
   req.logout();
   res.redirect('/');
});
//没有登录
router.use('/',notLoggedIn,function(req,res,next){
  next();
});
router.get('/signup', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signup', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});
//策略名
router.post('/signup',
    passport.authenticate('local.signup', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/signup',
        failureFlash: true
    }));

//登录
router.get('/signin', function(req, res, next) {
    var messages = req.flash('error');
    res.render('user/signin', {
        csrfToken: req.csrfToken(),
        messages: messages,
        hasErrors: messages.length > 0
    });
});
router.post('/signin',
    passport.authenticate('local.signin', {
        successRedirect: '/user/profile',
        failureRedirect: '/user/signin',
        failureFlash: true
    }));
module.exports = router;
function isLoggedIn(req, res, next) {
    if (req.isAuthenticated()) {//登录成功
        return next();
    }
    res.redirect('/');
}

function notLoggedIn(req, res, next) {//没有登录
    if (!req.isAuthenticated()) {
        return next();
    }
    res.redirect('/');
}
