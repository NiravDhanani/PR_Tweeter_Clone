const express = require('express');

const routes = express.Router();
const passport = require('passport');
const multer = require('multer');

const homecontroller = require('../controller/UserController');

const FileUpload = multer({
    storage : multer.diskStorage({
        destination : (req, file, cb)=>{
            cb(null, 'uploads');
        },
        filename : (req, file, cb)=>{
            let img = Date.now()+"-"+file.originalname;
            cb(null, img);
        }
    })
}).single('post_imgs');

routes.get('/home',passport.chekUser,homecontroller.homePage);
routes.get('/following',passport.chekUser,homecontroller.following);
routes.post('/loginUser',passport.authenticate('local',{failureRedirect : '/'}),homecontroller.loginUser);
routes.post('/addTweet',FileUpload,homecontroller.addTweet);
routes.get('/DeleteTweet',homecontroller.deleteTweet);
routes.get('/EditTweet',passport.chekUser,homecontroller.editTweet);
routes.post('/UpdateTweet',FileUpload, homecontroller.updateTweet);

module.exports=routes;