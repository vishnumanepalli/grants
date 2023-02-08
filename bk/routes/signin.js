var express = require("express");
var router = express.Router();
// const bcrypt=require("bcrypt");
const otpGenerator = require('otp-generator');
const {Otp} = require('../models/otpModel');
// const fast2sms = require('fast-two-sms');
const handleLogin = require("../handleLogin");
var config = require('../config/config.json')
var nodemailer = require("nodemailer");

const sendMail = async(umail,otp) => {
    // console.log("ready to send mails");
    var transporter = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        secure: true,
        auth: {
            user: "codeunity.test@gmail.com",
            pass: "beparojilxrzcwyc"
        }
    });
    var mailOptions = {
        from: "CodeUnity Technologies private Limited",
        to: umail,
        subject: "OTP for authentication",
        text: "OTP for login is"+otp,
        // attachments: invoices,
    };
    try {
        await transporter.sendMail(mailOptions);
        console.log("Email Sent Successfully");
    }
    catch (error) {
        console.log("Email not sent");
        console.log(error);
    }
};


router.post("/", async (req, res) => {
    try { 
        const no=req.body.Email;
        const user = await Otp.findOne({
            number:no
        });
        console.log("jh")
        console.log(no)
        // console.log(ValidateEmail(no))
        if (true){   
        var OTP = otpGenerator.generate(6,{
            digits:true, lowerCaseAlphabets:false, upperCaseAlphabets:false, specialChars:false
        });
        console.log(OTP)
        sendMail(no,OTP)
        // var options = {authorization : config.MESSAGE_KEY , message : `OTP for the email ${no} is ${OTP}` ,  numbers : [no], sender_id: "Kakarla Dental", } 
        //fast2sms.sendMessage(options)
        // const salt = await bcrypt.genSalt(no.length)
        // console.log("sent1")
        // OTP=await bcrypt.hash(OTP,salt)
        console.log("sent2")

        if(user){
            await Otp.updateOne({number:no},{$set:{otp:OTP}});
            console.log("sent3")
            res.status(200).json({
                "status": {
                "success": true,
                "code": 200,
                "message": "otp send successfully"
               
            },
        });        
        }
    
        else{
            const number= no;
            const otp = new Otp({number:number,otp:OTP});
            const result= await otp.save()
            res.status(200).json({
                "status": {
                    "success": true,
                    "code": 200,
                    "message":"otp send successfully"}})
        }
        
}
    else{
        return res.status(200).send("Please enter the Correct 10-Digit Mobile Number")
    }
}
    catch (err) {
        res.status(500).json({
            "status": {
                "success": true,
                "code": 500,
                "message": "Failed"
            },
        });
    }
})

function ValidateEmail(input) {
    var validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/; 
    if (input.value.match(validRegex)) {
      alert("Valid email address!"); 
      document.form1.text1.focus(); 
      return true; 
    } else {  
      alert("Invalid email address!");  
      document.form1.text1.focus();  
      return false;  
    }
  
  }
router.post("/verify", async (req, res) => {
    try { 
        const inotp = req.body.otp;
        console.log(inotp)
        const role = req.body.role;
        const no=req.body.Email;
        console.log(no)
        const otpHolder= await Otp.find({
            number:no
        });
        
    const rightOtpfind= otpHolder[0];
    console.log(rightOtpfind)

    // const validUser = await compare(inotp,rightOtpfind.otp);
    if(inotp==rightOtpfind.otp){
        console.log("hi");
        const userLogin = await handleLogin(no,role)
        console.log("hi");
    return res.status(200).send({
        "token" : userLogin.token,
        "isCorrect" : true,
        "status": {
            "success": true,
            "code": 200,
            "message":userLogin.message,
        }
    })
    }
    else{
        console.log("bi");
        res.status(200).json({
            "isCorrect" : false,
            "status": {
                "success": true,
                "code": 200,
                "message":"Invalid otp Please enter correct otp"}})
    }
}
    catch (err) {
        console.log(err)
        res.status(500).json({
            "status": {
                "success": true,
                "code": 500,
                "message": "failed"
            },
        });
    }})

module.exports = router;