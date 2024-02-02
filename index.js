const express = require('express');
const db = require('./config/db');
const path = require('path');
const passport = require('passport');
const passportstrategy = require('./config/passportStrategy');
const session = require('express-session');

const port = 8000;

const app = express();
app.set('view engine', 'ejs');
app.use(express.urlencoded());

app.use(session({
    name : 'Abc',
    secret : '123',
    resave : true,
    saveUninitialized : true,
    cookie : {
        maxAge : 1000 * 60 * 60 * 24 
    }
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(passport.setUser);

app.use((req, res, next) => {
    res.locals.currentUser = req.user; 
    next();
});

app.use('/public',express.static(path.join(__dirname,'public')));

app.use('/uploads',express.static(path.join(__dirname,'uploads')));
app.use('/',require('./routes/userRoutes'));
app.use('/',require('./routes/loginRouts'));


app.listen(port,(err)=>{
    if(err){
        console.log(`Server is not start`);
        return false;
    }
    console.log(`Server is start on ${port}`);
})