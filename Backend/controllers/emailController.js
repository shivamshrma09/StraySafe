const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "your-email@gmail.com",
    pass: "your-app-password", // Not your real password! Use App Passwords from Gmail settings
  },
});

const sendOTPEmail = async (toEmail, otp) => {
  const mailOptions = {
    from: '"StraySafe OTP" <your-email@gmail.com>',
    to: toEmail,
    subject: "Your OTP Code",
    html: `<h2>Your OTP is: ${otp}</h2><p>This code is valid for 5 minutes.</p>`,
  };
  await transporter.sendMail(mailOptions);
};

module.exports = { sendOTPEmail };
