const mongoose = require("mongoose");
const Joi = require("joi");

//schema for blog posts
const schema = new mongoose.Schema({
    name: {
        type: String,
        min: 3,
        max: 255,
        required: true,
      },
    email: {
        type: String,
        required: true,
    },
    roll: String,
    semester: Number,
    department: String,
    preference: Array,
    alloted: String,
    rank: Number,
    verified:{
        type: Boolean,
        default: false
    }
},{ timestamps: true });

const validate = (user) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(255).required(),
      email: Joi.string().email().required(),
      roll: Joi.string().required(),
      department:Joi.string().required()
      
    });
    return schema.validate(user);
  };

Student = mongoose.model("Student", schema);
module.exports = {
    Student,
    validate,
  };
