const nodemailer = require('nodemailer');
require('dotenv').config();

const transporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    auth: {
        user: process.env.ETHEREAL_SENDER,
        pass: process.env.ETHEREAL_PASS
    }
});

module.exports = {
    send: (req, res) => {
        const { to, subject, price, cart, name, auth0_id } = req.body
        const mailOptions = {
            from: 'bomsquadbgs@test.com',
            to,
            subject,
            html: `
            <div style='display: flex; justify-content: center; align-items: center; height: 100px; background-color: #044F8F; font-family: font-family: 'Courier New', Courier, monospace;>
            <h1 style='color: white; font-size: 42px;'>
            Bombsquad Batting Gloves
            </h1>
            </div><br>
            <h1 style='font-size: 32px;'>Thank you for your purchase!</h1><br>
            
            <p>${name},</p><br>
            <p>We're writing to let you know that we appreciate your business.  We stand by the quality of our product, so if you have any questions or issues, please reply to us at this address and we will be glad to assist you.  Some other stuff that no one will read.  Marketing marketing quality assurance quality assurance and other stuff like that.  You will find a summary of your order below</p><br>
            <p>Sincerely,</p><br>
            <p>The Bombsquad Batting Gloves team</p><br>

            ${cart.map(e => {
                return (`<div>
                    <h3>${e.name}</h3>
                    <h4>$${e.price} x ${e.quantity}</h4>
                    <h4>$${price}</h4>
                </div>`)
            })}
            `
        };
        transporter.sendMail(mailOptions, (error, response) => {
            if(error){
                console.log('Error on sendMail in nodemailer', error)
            } else {
                console.log('Email sent successfully', response)
                req.app.get('db').clear_cart([auth0_id]);
            }
        });
    }
}

