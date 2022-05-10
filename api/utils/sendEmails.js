const nodemailer = require("nodemailer");

module.exports = async (email, subject, text ) => {
    try {
        const transporter = nodemailer.createTransport({
            host: process.env.SMTP,
            port: 465,
            secure: true,
            auth: {
                user: process.env.SERVER_MAILER_USER,
                pass: process.env.SERVER_MAILER_PASS
            }
        })

        await transporter.sendMail({
            from: process.env.SERVER_MAILER_USER,
            to: email,
            subject: subject,
            html: `<p>Parece ser que a alguien se le ha olvidado la contraseña.</p> 
            <p>No te preocupes, use el link inferior para resetearla.</p>
            <p>Este link <b>expira en 60 minutos</b>.</p><p>Haz click <a href=${text}>aquí</a> para proceder.</p>`,
        })

        console.log("Email send succesfully")
    } catch (err) {
        console.log(err, "email not sent");
    }
}