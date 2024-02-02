const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/Twitter-clone");

const db = mongoose.connection;

db.on("connected", (err)=>{
    if(err){
        console.log(`db is not connected`);
        return false;
    }
    console.log(`db is connected`);
});

module.exports=db;