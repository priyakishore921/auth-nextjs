import nodemailer from 'nodemailer';
import User from "@/models/userModel";
import bcrypt from 'bcryptjs';

export const sendEmail = async ({ email, emailType, userId }: any) => {
  try {
    // generate a hash,
    // find and update user
    // send an email based on emailType with url containing the hash

    const hashedToken = await bcrypt.hash(userId.toString(), 10);

    if (emailType === "RESET") {
      await User.findByIdAndUpdate(userId, {
        forgotPasswordToken: hashedToken,
        forgotPasswordTokenExpiry: Date.now() + 3600000
      });
    } else if (emailType === "VERIFY") {
      await User.findByIdAndUpdate(userId, {
        verifyToken: hashedToken,
        verifyTokenExpiry: Date.now() + 3600000
      });
    }

    // Looking to send emails in production? Check out our Email API/SMTP product!
    const transport = nodemailer.createTransport({
      host: "sandbox.smtp.mailtrap.io",
      port: 2525,
      auth: {
        user: "53357bb34271b7",
        pass: "c46a6565826965"
      }
    });

    const mailOptions = {
      from: 'test1@gmail.com',
      to: email,
      subject: emailType === ' VERIFY' ? "Verify your email" : "Reset your password",
      html: `<p>Click <a href="${process.env.domain}/${emailType === 'VERIFY' ? "verifyemail" : "forgotpassword"}?token=${hashedToken}">to ${emailType === 'VERIFY' ? "Verify your email" : "Reset your password"}</a></p>`
    }

    const mailResponse = await transport.sendMail(mailOptions);
    return mailResponse;

  } catch (error: any) {
    console.log(error);
    throw new Error("Could not send the email ", error.message);
  }
}
