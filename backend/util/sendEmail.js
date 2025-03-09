const nodemailer = require('nodemailer');

const sendEmail = async (to,subject,text) => {
  try {
    let transpoter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL,
        pass: process.env.EMAIL_PASSWORD
      }
    });

    await transpoter.sendMail({
      from: process.env.EMAIL,
      to,
      subject,
      text
    });

    console.log(`email sent to ${to}`);
    
  } catch (error) {
    console.log("Error sending email: ",error);
    
  }
}

module.exports = sendEmail