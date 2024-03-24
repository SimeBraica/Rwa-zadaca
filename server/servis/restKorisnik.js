const KorisnikDAO = require("./korisnikDAO.js");

exports.getKorisnici = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	kdao.dajSve().then((korisnici) => {
		odgovor.status(200);
		odgovor.send(JSON.stringify(korisnici));
	});
};

exports.postKorisnici = function (zahtjev, odgovor) {
    odgovor.type("application/json");
    let podaci = zahtjev.body;
    let kdao = new KorisnikDAO();
    kdao.dodaj(podaci).then((poruka) => {
		odgovor.status(201);
        odgovor.send(JSON.stringify(poruka));
    });
};


exports.getKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	let korime = zahtjev.params.korime;
	kdao.daj(korime).then((korisnik) => {
		odgovor.status(200);
		console.log(korisnik);
		odgovor.send(JSON.stringify(korisnik));
	});
};

exports.getKorisnikPrijava = function (zahtjev, odgovor) {
	console.log("zahtjev korpri: ", zahtjev);
	odgovor.type("application/json");
	let kdao = new KorisnikDAO();
	let korime = zahtjev.params.korime;
	kdao.daj(korime).then((korisnik) => {
		console.log("ispod mene je korisnik");
		console.log("korisnik: ", korisnik);
		console.log("ispod mene je zahtjev.body");
		console.log(zahtjev.body);
		if (korisnik != null && korisnik.lozinka == zahtjev.body.lozinka)
		{
			odgovor.send(JSON.stringify(korisnik));
		}
		else {
			odgovor.status(401);
			odgovor.send(JSON.stringify({ greska: "Krivi podaci!" }));
		}
	});
};
exports.postKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(405);
	let poruka = { opis: "zabranjeno" };
	odgovor.status(405);
	odgovor.send(JSON.stringify(poruka));
};



exports.deleteKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	let korime = zahtjev.params.korime;
	let kdao = new KorisnikDAO();
	kdao.obrisi(korime).then((poruka) => {
		odgovor.status(201);
		odgovor.send(JSON.stringify(poruka));
	});

};

exports.putKorisnik = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "nije implementirano" };
	odgovor.send(poruka);
};


