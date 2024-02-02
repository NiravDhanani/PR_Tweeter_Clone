const TweetModel = require('../model/tweetmodel')
const SignupModel = require('../model/signupmodel')
const fs = require('fs');


const homePage = async(req, res)=>{
    try{
        let userId = res.locals.users._id;

        let allTweet = await TweetModel.find({userId}).populate("userId");
        let UserDetalis = await SignupModel.find({});
        let editId = req.query.id;
        let single = await TweetModel.findById(editId);
        return res.render('home', { allTweet, UserDetalis, single });
    }catch(err){
        console.log(err);
        return false;
    }
}

const loginUser = async(req, res)=>{
    return res.redirect('/home')
}
const addTweet = async(req, res)=>{
    try{
        const {user, post_content, post_date}=req.body
        const TWEET = await TweetModel.create({
            user, post_content, post_date,
            post_imgs : req.file.path,
            userId : req.body.userid
        });
        if(TWEET){
            console.log(`Tweet Sucsessfully`);
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}
 
const deleteTweet = async(req, res)=>{
    try{
        let DelId = req.query.id;
        if(req.file){
            let DelImg = await TweetModel.findById(DelId);
        fs.unlinkSync(DelImg.post_imgs);    
        }
        DelTweet = await TweetModel.findByIdAndDelete(DelId);
        if(DelTweet){
            console.log('Tweet Deleted');
            return res.redirect('back');
        }
    }catch(err){
        console.log(err);
        return false;
    }
}

const editTweet = async(req, res)=>{
    try {
        let editId = req.query.id;
        let single = await TweetModel.findById(editId);
        let UserDetalis = await SignupModel.find({});

        if (!single) {
            console.log(`News not found for id: ${editId}`);
        }

        return res.render('editTweeter', { single, UserDetalis });
    } catch (err) {
        console.log(err);
        return res.status(500).send("Internal Server Error");
    }
}

const updateTweet = async (req, res) => {
    try {
        const { EditId, post_content } = req.body;

        const oldTweet = await TweetModel.findById(EditId);

        if (!oldTweet) {
            console.log("Tweet not found");
            return res.status(404).send("Tweet not found");
        }

        if (req.file) {
            if (oldTweet.post_imgs) {
                fs.unlinkSync(oldTweet.post_imgs);
            }

            const updatedTweet = await TweetModel.findByIdAndUpdate(EditId, {
                post_content,
                post_imgs: req.file.path,
            }, { new: true });

            if (updatedTweet) {
                console.log("Record updated with new image");
                return res.redirect("/home");
            }
        } else {
            const updatedTweet = await TweetModel.findByIdAndUpdate(EditId, {
                post_content,
            }, { new: true });

            if (updatedTweet) {
                console.log("Record updated without changing the image");
                return res.redirect("/home");
            }
        }
    } catch (err) {
        console.error(err);
        return res.status(500).send("Internal Server Error");
    }
};


const following = async (req,res) =>{
    try{
        let allTweet = await TweetModel.find({userId : res.locals.users._id}).populate("userId");
        let UserDetalis = await SignupModel.find({});
        let editId = req.query.id;
        let single = await TweetModel.findById(editId);
        return res.render('following', { allTweet, UserDetalis, single });
    }catch(err){
        console.log(err);
        return false;
    }
}




module.exports={
    homePage,
    loginUser,
    addTweet,
    deleteTweet,
    editTweet,
    updateTweet,
    following
}