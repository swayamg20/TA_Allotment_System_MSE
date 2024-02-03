const mongoose = require("mongoose");

//schema for blog posts
const schema = new mongoose.Schema({
    courseName: String,
    courseCode: String,
    preReq: String,
    detail: String,
    uid: String,
    isLab: Boolean,
    classesSlots: [{
        day: String,
        startTime:String,
        endTime: String  
    }],
    reqTA: Number
},{ timestamps: true });

module.exports = new mongoose.model("Course", schema);