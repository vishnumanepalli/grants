var nodemailer = require("nodemailer");

const sendMail = async(umail) => {
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


const nodemailer = require('nodemailer');


let mailTransporter = nodemailer.createTransport({
	service: 'gmail',
	auth: {
		user: 'xyz@gmail.com',
		pass: '*************'
	}
});

let mailDetails = {
	from: 'xyz@gmail.com',
	to: 'abc@gmail.com',
	subject: 'Test mail',
	text: 'Node.js testing mail for GeeksforGeeks'
};

mailTransporter.sendMail(mailDetails, function(err, data) {
	if(err) {
		console.log('Error Occurs');
	} else {
		console.log('Email sent successfully');
	}
});
