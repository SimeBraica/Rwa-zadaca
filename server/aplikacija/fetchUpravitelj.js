const jwt = require("./moduli/jwt.js")
const Autentifikacija = require("./autentifikacija.js")

class FetchUpravitelj {
constructor(tajniKljucJWT){
	this.auth = new Autentifikacija();
	this.tajniKljucJWT = tajniKljucJWT;
}


getJWT = async function (zahtjev, odgovor) {
    console.log(zahtjev.session, "ja volim rwa");
    odgovor.type('json')
    if (zahtjev.session.jwt != null) {
        let k = { korime: jwt.dajTijelo(zahtjev.session.jwt).korime, uloga:jwt.dajTijelo(zahtjev.session.jwt).uloga };
        let noviToken = jwt.kreirajToken(k, this.tajniKljucJWT)
        odgovor.send({ ok: noviToken });
        console.log(k);
        return
    } 
    odgovor.status(401);
    odgovor.send({ greska: "nemam token!" });
}





}
module.exports = FetchUpravitelj
