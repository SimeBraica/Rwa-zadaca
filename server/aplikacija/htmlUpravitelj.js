const ds = require("fs/promises");
const jwt = require("./moduli/jwt.js")
const Autentifikacija = require("./autentifikacija.js")

class HtmlUpravitelj {

constructor(tajniKljucJWT){
	this.tajniKljucJWT = tajniKljucJWT;
	console.log(this.tajniKljucJWT);
	this.auth = new Autentifikacija();
}
pocetna = async function (zahtjev, odgovor) {
    let pocetna = await ucitajStranicu("pocetna")
    odgovor.send(pocetna);
}

detaljiSerije = async function (zahtjev, odgovor) {
    let detaljiSerije = await ucitajStranicu("detaljiSerije")
    odgovor.send(detaljiSerije);
}

dokumentacija = async function (zahtjev, odgovor) {
    let dokumentacija = await ucitajStranicuDokumentacije("dokumentacija")
    odgovor.send(dokumentacija);
}

favoriti = async function (zahtjev, odgovor) {
    let favoriti = await ucitajStranicu("favoriti")
    odgovor.send(favoriti);
}
korisnici = async function (zahtjev, odgovor) {
    if(zahtjev.session.jwt!=null){
        if(jwt.dajTijelo(zahtjev.session.jwt).uloga==1){

        }else {
            odgovor.redirect("/");
            return;
        }
    }
    else{
        odgovor.redirect("/");
        return;
    }
    let korisnici = await ucitajStranicu("korisnici")
    odgovor.send(korisnici);
}

profil = async function (zahtjev, odgovor) {
    if(zahtjev.session.jwt!=null){
        if(jwt.dajTijelo(zahtjev.session.jwt).uloga==1 || jwt.dajTijelo(zahtjev.session.jwt).uloga==2 ){

        }else {
            odgovor.redirect("/");
            return;
        }
    }
    else{
        odgovor.redirect("/");
        return;
    }

    let profil = await ucitajStranicu("profil")
    odgovor.send(profil);

}

registracija = async function (zahtjev, odgovor) {
    console.log(zahtjev.body)
    let greska = "";
    if(zahtjev.session.jwt!=null){
        if(jwt.dajTijelo(zahtjev.session.jwt).uloga==1){
            if (zahtjev.method == "POST") {
                let uspjeh = await this.auth.dodajKorisnika(zahtjev.body);
                if (uspjeh) {
                    odgovor.redirect("/prijava");
                    return;
                } else {
                    greska = "Dodavanje nije uspjelo provjerite podatke!";
                }
            }
        }
        else{
            greska = "Niste administrator";
        }
    }
    else{
        greska="Trenutno ste odjavljeni";
    }
    let stranica = await ucitajStranicu("registracija", greska);
    odgovor.send(stranica);

}

odjava = async function (zahtjev, odgovor) {
    zahtjev.session.destroy();
    odgovor.redirect("/");
};


prijava = async function (zahtjev, odgovor) {
    
    let greska = ""
    if (zahtjev.method == "POST") {
        var korime = zahtjev.body.korime;
        var lozinka = zahtjev.body.lozinka;
        var korisnik = await this.auth.prijaviKorisnika(korime, lozinka);
        console.log("korisnik: ", korisnik);
        korisnik = JSON.parse(korisnik);

        if (korisnik) {

            zahtjev.session.jwt = jwt.kreirajToken(korisnik,this.tajniKljucJWT);

            odgovor.status(200);
            odgovor.send({greska: "Tocno"});
            return;
        } else {
            odgovor.status(401);
            odgovor.send({greska: "Netocno"});
        }
    }

}

}

module.exports = HtmlUpravitelj;

async function ucitajStranicu(nazivStranice, poruka = "") {
    let stranice = [ucitajHTML(nazivStranice),
    ucitajHTML("navigacija")];
    let [stranica, nav] = await Promise.all(stranice);
    stranica = stranica.replace("#navigacija#", nav);
    stranica = stranica.replace("#poruka#", poruka)
    return stranica;
}

function ucitajHTML(htmlStranica) {
    return ds.readFile(__dirname + "/html/" + htmlStranica + ".html", "UTF-8");
}

function ucitajHTMLDokumentacije(htmlStranica) {
    return ds.readFile(__dirname + "/dokumentacija/" + htmlStranica + ".html", "UTF-8");
}
async function ucitajStranicuDokumentacije(nazivStranice, poruka = "") {
    let stranice = [ucitajHTMLDokumentacije(nazivStranice),
    ucitajHTML("navigacija")];
    let [stranica, nav] = await Promise.all(stranice);
    stranica = stranica.replace("#navigacija#", nav);
    stranica = stranica.replace("#poruka#", poruka)
    return stranica;
}
