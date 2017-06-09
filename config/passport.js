var passport = require("passport");
var User = require("../models/user");
var LocalStrategy = require("passport-local").Strategy;
passport.serializeUser(function(user, done) {
    done(null, user.id);
});
passport.deserializeUser(function(id, done) {
    User.findById(id, function(err, user) {
        done(err, user);
    });
});
//注册策略
passport.use('local.signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, function(req, email, password, done) {
    //对email进行格式进行校验
    req.checkBody('email', '您输入的 email 无效').notEmpty().isEmail();
    req.checkBody('password', '您输入无效密码').notEmpty().isLength({
        min: 4
    });
    //验证格式
    var errors = req.validationErrors();
    if (errors) {
        var messages = [];
        errors.forEach(function(error) {
            messages.push(error.msg);
        })
        return done(null, false, req.flash('error', messages))
    }
    User.findOne({ //查找
        'email': email
    }, function(err, user) {
        if (err) {
            return done(err);
        }
        if (user) {
            return done(null, false, {
                message: "此邮箱已被注册"
            });
        }
        var newUser = new User();
        newUser.email = email;
        newUser.password = newUser.encryptPassword(password);
        newUser.save(function(err, result) {
            if (err) {
                return done(err);
            }
            return done(null, newUser);
        });
    });
}));
//登录策略
passport.use('local.signin', new LocalStrategy({
usernameField: 'email',
passwordField: 'password',
passReqToCallback: true
}, function(req, email, password, done) {
//对email进行格式进行校验
req.checkBody('email', '您输入的 email 无效').notEmpty();
req.checkBody('password', '您输入无效密码').notEmpty();
//验证格式
var errors = req.validationErrors();
if (errors) {
    var messages = [];
    errors.forEach(function(error) {
        messages.push(error.msg);
    })
    return done(null, false, req.flash('error', messages))
}
User.findOne({ //查找
    'email': email
}, function(err, user) {
    if (err) {
        return done(err);
    }
    if (!user) {
        return done(null, false, {
            message: "没有此用户!"
        });
    }
    if (!user.validPassword(password)) { //判断密码错误
        return done(null, false, {
            message: "密码错误!"
        });
    }
    
     return done(null, user);
});//查找
}));
