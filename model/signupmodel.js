const mongoose = require('mongoose');

const SignupModel = mongoose.Schema({
    f_name : {
        type : String,
        require : true
    },
    l_name : {
        type : String,
        require : true
    },
    name : {
        type : String,
        require : true
    },
    email : {
        type : String,
        require : true
    },
    phone : {
        type : Number,
        require : true
    },
    profile : {
        type : String,
        require : true
    },
    password : {
        type : String,
        require : true
    },
    username: {
        type: String,
        required: true,
        unique: true,
    },
})

const Signup  = mongoose.model('Signup', SignupModel);

module.exports=Signup;