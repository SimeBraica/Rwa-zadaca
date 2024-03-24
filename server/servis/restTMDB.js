const TMDBklijent = require("./klijentTMDB.js");

class RestTMDB {
	constructor(api_kljuc) {
		this.tmdbKlijent = new TMDBklijent(api_kljuc);
		console.log(api_kljuc);

	}

	getSerije(zahtjev, odgovor) {
		console.log("provjera ispisa");
		odgovor.type("application/json");
		let stranica = zahtjev.query.str;
		let trazi = zahtjev.query.filter;

		if (stranica == null || trazi == null) {
			odgovor.status(417);
			odgovor.send({ greska: "neocekivani podaci" });
			return;
		}

		this.tmdbKlijent
			.pretraziSerijePoNazivu(trazi, stranica)
			.then((serije) => {
				console.log(serije);
				odgovor.send(serije);
			})
			.catch((greska) => {
				odgovor.json(greska);
			});
	}

	getSerijeID(zahtjev, odgovor) {
		console.log(this);
		odgovor.type("application/json");
		
		let idSerije = zahtjev.query.id;
		if (idSerije==null) {
			odgovor.status(417);
			odgovor.send({ greska: "neocekivani podaci" });
			return;
		}

		this.tmdbKlijent
			.dohvatiSeriju(idSerije)
			.then((serije) => {
				console.log(serije);
				odgovor.send(serije);
			})
			.catch((greska) => {
				odgovor.json(greska);
			});
	}
}

module.exports = RestTMDB;
