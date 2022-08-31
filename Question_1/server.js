const express = require('express');
const passport = require('passport');
const app = express();
const flash = require('express-flash');
const session = require('express-session');
const mongoose = require('mongoose');
const User = require('./models/user.js');
const { findOne } = require('./models/user.js');

mongoose.connect("mongodb://localhost/rad_activity");

const localStrategy = require('passport-local').Strategy;

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(express.urlencoded({extended: false}));
app.use(flash());

app.use(session({
    secret: "mongodb",
    resave: false,   
    saveUninitialized: true
}));


app.use(passport.initialize());
app.use(passport.session());


authenticateUser = (email, password, done) => {
    User.findOne({email: email}, function(err, user){
        if(err){
            console.log(err);
        }
        else{
            console.log(user);
            //console.log(password, user[0]['password']);
            if(user == null){   //user not found
                console.log("user not found");
                return done(null, false, {message: 'User was not found'});
            }
        
            if(user['password'] === password){  //correct password
                console.log("correct password");    
                return done(null, user);
            }
            else{   //incorrect password
                console.log("incorrect password");
                return done(null, false, {message: 'Incorrect password'});
            }
        }
    });
}

passport.use(new localStrategy(
    {usernameField: 'email',
    passwordField: 'password'},
    authenticateUser
));
passport.serializeUser((user, done) =>{
    console.log("Serialize: " + user['_id']);
    done(null, user['_id'])
})
passport.deserializeUser((id, done) =>{ 
    console.log("Deserialize: " + id);
    User.findOne({_id: id},function(err,user){
        if(err){
            console.log(err);
        }
        else{
            return done(null, user);
        }
    })
})  


app.get("/",(req, res)=>{   //log in ui
    res.render("login");
});

app.get('/register', (req, res) =>{ //register ui
    res.render("register");
})

app.get('/welcome', (req, res) => {
    res.render('welcome');
})

app.post('/login', passport.authenticate('local', {
    successRedirect: '/welcome',
    failureRedirect: '/',
    failureFlash: true
}))

app.post("/register",(req, res)=>{
    const password = req.body.password;
    const email = req.body.email;
    if(email == "" || password == ""){  //empty fields
        res.redirect("/register");
    }
    else{
        User.findOne({email:email}, function(err, user){
            if(err){
                console.log(err);
            }
            else{
                console.log(user);
                if(user == null){ //not registered
                    let newUser = {email : email, password: password};
                    console.log(newUser);
                    User.create(newUser, function(err, user){
                        if(err){
                            console.log(err);
                        }
                        else{   //redirect to log in page
                            console.log(user);
                            res.redirect('/');
                        }
                    });

                }
                else{
                    res.redirect("/register");
                }
            }
        })
    }
});
app.listen(3000);