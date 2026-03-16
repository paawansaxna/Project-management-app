import Mailgen from "mailgen";
import nodemailer from "nodemailer"

const sendEmail = async (Options) => {
    const mailGenerator = new Mailgen({
        theme: "default",
        product:{
            name:"Task Manager",
            link:"httos://taskmanagelink.com"
        },
    })

    const emailTextual = mailGenerator.generatePlaintext(Options.mailgenContent)

    const emailHtml = mailGenerator.generate(Options.mailgenContent)

    const Transporter = nodemailer.createTransport({
            host: process.env.MAILTRAP_SMTP_HOST,
            port: process.env.MAILTRAP_SMTP_PORT,
            auth: {
                user: process.env.MAILTRAP_SMTP_USER,
                pass: process.env.MAILTRAP_SMTP_PASS
            }
        })

    const mail = {
        from: "mail.taskmanager@example.com",
        to: Options.email,
        subject: Options.subject,
        text: emailTextual,
        html: emailHtml
    }

    try {
        await Transporter.sendMail(mail)
    } catch (error) {
        console.error("Email service failed silently. Make sure that you have provided your MAILTRAP credentials in the .env file")
        console.error("Erorr: ", error)
    }
}

const emailVerificationMailgenContent = (username, verificationUrl) => {
    return {
        body:{
            name: username,
            intro: "Welcome To Our App. We're Excited To Have You Onboard!",
            action:{
                instructions: "To Verify Your Email Please Click On the Following Button",
                button:{
                    color: "#22BC66",
                    text: "Verify Your Email",
                    link: verificationUrl,
                }
            },
            outro: "Need Help Or Have Questions? Just Reply To This Email. We'd Love To Help!"
        }
    }
}

const forgotPasswordMailgenContent = (username, passwordResetUrl) => {
    return {
        body:{
            name: username,
            intro: "We Got a Request To Reset The Password Of Your Account!",
            action:{
                instructions: "To Reset Your Password Please Click On the Following Button",
                button:{
                    color: "#22BC66",
                    text: "Reset Your Password",
                    link: passwordResetUrl,
                }
            },
            outro: "Need Help Or Have Questions? Just Reply To This Email. We'd Love To Help!"
        }
    }
}

export {emailVerificationMailgenContent, forgotPasswordMailgenContent, sendEmail}