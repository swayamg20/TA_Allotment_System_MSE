require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const crypto = import("crypto");
const bodyParser = require('body-parser')
const nodemailer = require('nodemailer')
// const User = require("./models/userSchemaCTM")
const {Student, validate} = require("./models/studentSchema")
const Course = require("./models/courseSchema")
const Token = require("./models/tokenStudent")
const app = express();

const port = process.env.PORT || 4000;

var cors = require("cors");
app.use(cors());

app.use(bodyParser.json())

//body parser
app.use(express.urlencoded({ extended: false }));

//method override
// app.use(methodOverride("_method"));

// Connecting with database
mongoose.set("strictQuery", true);
mongoose
  .connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/ugp")
  .then(() => console.log("Connection successful..."))
  .catch((err) => console.log(err));

const sendMail_old = async (req,res) => {
    let testAccount = await nodemailer.createTestAccount();
    let transporter = nodemailer.createTransport({
      host: "smtp.ethereal.email",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: testAccount.user, // generated ethereal user
        pass: testAccount.pass, // generated ethereal password
      },
    });
  
  }

const sendEmail = async (email, subject, text) => {
    try {
      const transporter = nodemailer.createTransport({
        host: process.env.HOST,
        service: process.env.SERVICE,
        port: 465,
        secure: true,
        auth: {
          user: "gupta.swayam123@gmail.com",
          pass: "msohrtxhcptyffwx",
        },
      });
  
      await transporter.sendMail({
        from: "gupta.swayam123@gmail.com",
        to: email,
        subject: subject,
        text: text,
      });
      console.log("email sent sucessfully");
    } catch (error) {
      console.log("email not sent");
      console.log(error);
    }
  };  

  const selectCourse = async () => {
    let results = await Student.find().sort({semester:-1, updatedAt:1})
    return results;
  }

// Start UGP Routes

app.get('/',async (req,res) =>{
  const data = await selectCourse();
  res.send(data)
})

app.post('/send-email', async (req,res) => {
  try {
    const { error } = validate(req.body);
    if (error) return res.status(400).send(error.details[0].message);

    let user = await Student.findOne({ email: req.body.email });
    if (user)
      return res.status(400).send("User with given email already exist!");
      console.log(req.body.department)
    user = await new Student({
      name: req.body.name,
      email: req.body.email,
      roll: req.body.roll,
      department: req.body.department,
      preference:req.body.preference
    }).save(); 

    let token = await new Token({
      userId: user._id,
      token: user._id,
    }).save();

    const message = `${process.env.BASE_URL}/verify/${user.id}/${token.token} <b>your preferences are : ${user.department}`;
    await sendEmail(user.email, "Verify Email", message);

    res.send("An Email sent to your account please verify");
  } catch (error) {
    res.status(400).send("An error occured");
  }
})

app.get("/verify/:id/:token", async (req, res) => {
  try {
    const user = await Student.findOne({ _id: req.params.id });
    if (!user) return res.status(400).send("Invalid link");

    console.log(user)
    console.log("reached")

    const token = await Token.findOne({
      userId: user._id,
    });
    console.log(token)
    if (!token) return res.status(400).send("Invalid link");

    await Student.updateOne({ _id: user._id },{ verified: true });
    console.log("done")
    // await Token.findByIdAndRemove(token._id);

    res.send("email verified sucessfully");
  } catch (error) {
    res.status(400).send("An error occured");
  }
});

app.post("/preference-submit/:id", async (req, res) => {
    useId = req.params.id;
    console.log("reached route",useId, req.body.preferences)
    await Student.updateOne ({
        _id: useId
    }, {
      preference: req.body.preferences,
      semester: req.body.semester
    })

    const user = await Student.findById(useId);
    console.log(user)
    
    console.log("submitted")
    const message = `<b>your preferences are : ${req.body.preferences}</b>`;
    await sendEmail(user.email, "Your Preferences", message);
    console.log("Email sent")

    // res.send("An Email sent to your account please verify");
  
    res.send("Preference Submitted")

})

app.get("/all-course-detail", async (req,res) => {
    const courses = await Course.find(); 
    res.send(courses)
})

app.get('/data-show',async (req,res) =>{
  const data = await selectCourse();
  res.send(data)
})

app.post("/course-added", async (req, res) => {
  
    const courseDetail = new Course ({
        courseName: req.body.courseName,
        courseCode: req.body.courseCode,
        isLab: req.body.isLab,
        detail: req.body.details,
        preReq: req.body.preReq,
        reqTA: req.body.ta
    })
    courseDetail.save();
    res.send(courseDetail)

})

// UGP Routes

app.get('/api23/get-competitions', async (req,res)=>{
  const competitions = await competitionsdb.find();
  res.send(competitions)
})

app.get('/api23/get-competitions/:id', async (req,res)=>{
  const competitions = await competitionsdb.findById(req.params.id);
  res.send(competitions)
})

app.get('/api23/auth/:userId', async (req,res)=>{
  const uid = req.params.userId;
  const userDetail = await ContentUser.findOne({uid:uid});
  console.log(userDetail)
  if(userDetail.accessHead && userDetail.accessOrganizer===false)
  res.send("head");
  else if (userDetail.accessHead===false && userDetail.accessOrganizer)
  res.send("organizer");
  else if (userDetail.accessAll)
  res.send("admin");
  else if (userDetail.accessHead===false && userDetail.accessOrganizer===false && userDetail.accessAll===false)
  res.send("restricted");
  else
  res.send('ff')
})

app.post('/api23/tcm/auth', async (req,res)=>{
  const uid = req.body.uid;
  const email = req.body.email;
  console.log(uid)
  const checkUser = await ContentUser.findOne({uid:uid})
  if(checkUser === null)
  {
    const newUser = new User({
      uid: uid,
      email:email
    });
    const userDetail = await ContentUser.insertMany([newUser]);
    res.send(userDetail)
  } else{
    res.send(checkUser);
  }
})

app.delete('/api23/tcm/delete-team/:teamId', async(req,res)=>{
  const teamId = req.params.teamId;
  await teamDataMain.findByIdAndDelete(req.params.teamId);
})

app.post("/api23/ctm/competitions", async (req, res) => {
  console.log("Cd");
  console.log(req.body)
  const apprec = new competitionsdb({
    title: req.body.category,
    subTitle: req.body.subCategory,
    competitionsName: req.body.compName,
    description: req.body.content,
    prizeMoney: req.body.prize,
    updatedBy:req.body.updatedBy
  });

      const blog = await competitionsdb.insertMany([apprec]);
      console.log(blog);

     
      res.send(blog)
});

app.put('/api23/update-competition', async (req,res)=>{
  const objId = req.body.objId;
  const compName = req.body.compName;
  const content = req.body.content;
  const category = req.body.category;
  const subCategory = req.body.subCategory;
  const prize = req.body.prize;
  const updateBy = req.body.updateBy;
  console.log(objId)
  await competitionsdb.findByIdAndUpdate(
    objId,
    {
        title: category,
        subTitle:subCategory,
        competitionsName: compName,
        description: content,
        prizeMoney: prize,
        updateBy: updateBy
    },
  )

  res.send("Updated")
})

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});