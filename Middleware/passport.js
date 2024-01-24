// passport.js

const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const UserModel = require('../Models/UserModel'); 

passport.use(new LocalStrategy({ usernameField: 'email' }, UserModel.authenticate()));

passport.serializeUser(function(user, done){
    done(null, user._id);  
});

passport.deserializeUser(function(id, done){
    UserModel.findById(id)
        .then(user => {
            if (user) {
                done(null, user);
            } else {
                done(null, false);
            }
        })
        .catch(err => {
            done(err, null);
        });
});


module.exports = passport;
