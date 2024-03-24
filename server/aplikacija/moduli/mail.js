const nodemailer = require('nodemailer');

let mailer = nodemailer.createTransport({
	host: "smtp.gmail.com",
	port: 587,
	secureConnection: false,
	auth: {
		   user: "rwa784964@gmail.com",
		   pass: "nodemailer",
	},
	tls: {
		 ciphers: "SSLv3",
	},
});

async function posaljiMail(salje, prima, predmet, poruka) {
    try {
        let message = {
            from: salje,
            to: prima,
            subject: predmet,
            text: poruka
        };
        
        let odgovor = await mailer.sendMail(message);
        console.log(odgovor);
        return odgovor;
    } catch (error) {
        console.error("Greska tijekom slanja:", error);
        throw error; 
    }
}

module.exports = {
    posaljiMail: posaljiMail
};
