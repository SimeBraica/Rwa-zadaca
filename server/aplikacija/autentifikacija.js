const mail = require("./moduli/mail.js")
const kodovi = require("./moduli/kodovi.js")
const nodemailer = require("nodemailer")
const portRest = 12000;

class Autentifikacija {
    async dodajKorisnika(korisnik) {
        let tijelo = {
            ime: korisnik.ime,
            prezime: korisnik.prezime,
            lozinka: kodovi.kreirajSHA256(korisnik.lozinka, "moja sol"),
            email: korisnik.email,
            korime: korisnik.korime,
            tip_korisnika_id: 1,
            drzava:korisnik.drzava,
            zupanija:korisnik.zupanija,
            grad:korisnik.grad

        };

        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        let parametri = {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        let odgovor = await fetch("http://localhost:" + portRest + "/baza/korisnici", parametri)

        if (odgovor.status == 200) {
            console.log("Korisnik ubačen na servisu");
            return true;
        }
        else{
            return false;
        }
    }


    async prijaviKorisnika(korime, lozinka) {
        lozinka = kodovi.kreirajSHA256(lozinka, "moja sol");
        let tijelo = {
            lozinka: lozinka,
        };
        let zaglavlje = new Headers();
        zaglavlje.set("Content-Type", "application/json");

        let parametri = {
            method: 'POST',
            body: JSON.stringify(tijelo),
            headers: zaglavlje
        }
        let odgovor = await fetch("http://localhost:" + portRest + "/baza/korisnici/" + korime + "/prijava", parametri)

        if (odgovor.status == 200) {
            return await odgovor.text();
        } else {
            return false;
        }
    }


}



module.exports = Autentifikacija;
