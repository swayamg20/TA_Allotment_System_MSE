const mongoose = require("mongoose");

//schema for blog posts
const tokenSchema = new mongoose.Schema({
    userId: {
        type:mongoose.Schema.Types.ObjectId,
        ref:"student",
        required:true
    },
    token: {
        type:String,
        required:true
    }
  
},{ timestamps: true });

module.exports = new mongoose.model("Token", tokenSchema);