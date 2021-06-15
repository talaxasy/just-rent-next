import nodemailer from 'nodemailer';


export async function sendEmail(to: string, html: string) {
    // let testAccount = await nodemailer.createTestAccount();
    // console.log('testAccount: ', testAccount);

    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'talaxasy.or.lev@gmail.com',
            pass: '0205973132285',
        },
    });


    let info = await transporter.sendMail({
        from: '"Fred Foo 👻" <talaxasy.or.lev@gmail.com>', // sender address
        to: to, // list of receivers
        subject: "Сброс пароля 🔑", // Subject line
        html, // html body
    });

    console.log("Message sent: %s", info.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}