const nodemailer = require('nodemailer');
const fs = require("fs")
const path = require("path")

let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: "lifemakers272@gmail.com",
    pass: "dkob zrhq rzue dlke"
  }
});

module.exports = {
  sendEmail: (EmailAddress, StudentName, Card) => {
    const htmlFilePath = path.join(__dirname, 'html', 'CardSender.html');
    const htmlContent = fs.readFileSync(
      htmlFilePath,
      'utf8'
    )
    .replace("[Student Name]", StudentName)
    .replace("[School/University Name]", "KAUST");

    const subject = "You Digital Card is Ready";

    let mailOptions = {
      from: "lifemakers272@gmail.com",
      to: EmailAddress,
      subject: subject,
      html: htmlContent,
      attachments: [
        {
          filename: 'student_card.pkpass',
          content: Card
        }
      ]
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.log('Error occurred:', error);
      } else {
        console.log('Email sent:', info.response);
      }
    });
  }
}