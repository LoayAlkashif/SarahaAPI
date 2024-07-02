import nodemailer from "nodemailer";

export const sendEmail = async (email, otp) => {
  const transporter = nodemailer.createTransport({
    // Use `true` for port 465, `false` for all other ports
    service: "gmail",
    auth: {
      user: "loayalkashif@gmail.com",
      pass: "ieyutugojhynsqob",
    },
  });

  // send mail with defined transport object
  const info = await transporter.sendMail({
    from: '"A5ook loay 😁" <loayalkashif@gmail.com>', // sender address
    to: email, // list of receivers
    subject: "Saraha App",
    text: `Your OTP code is ${otp}. It will expire in 3 minutes.`,
  });

  console.log("Message sent: %s", info.messageId);
};
// Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
