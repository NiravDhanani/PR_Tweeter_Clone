const mongoose = require('mongoose');

const TweetModel = mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Signup',
        required: false,
    },
    post_content : {
        type : String,
        require : true
    },
    post_imgs : {
        type : String,
        require : true
    },
    post_date : {
        type : Date,
        default :Date.now
    },
});

const Tweet = mongoose.model('Tweeter', TweetModel);

module.exports=Tweet;