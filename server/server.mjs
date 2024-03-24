import express from "express";
import kolacici from "cookie-parser";
import sesija from "express-session"
import Konfiguracija from "./konfiguracija.js";
//import portovi from "/var/www/RWA/2023/portovi.js";
import restKorisnik from "./servis/restKorisnik.js";
import restFavoriti from "./servis/restFavoriti.js";
import RestTMDB from "./servis/restTMDB.js";
import HtmlUpravitelj from "./aplikacija/htmlUpravitelj.js"
import FetchUpravitelj from "./aplikacija/fetchUpravitelj.js"
import path from 'path';
//const port = portovi.matnovak;
const port = 12000;
const server = express();



let konf = new Konfiguracija();
konf
	.ucitajKonfiguraciju()
	.then(pokreniServer)
	.catch((greska) => {
		if (process.argv.length == 2) {
			console.log("Molim unesite naziv datoteke!");
		} else {
			console.log("Naziv datoteke nije dobar: " + greska.path);
		}
		console.log(greska);
	});

function pokreniServer() {


	server.use(express.urlencoded({ extended: true }));
	server.use(express.json());

	server.use(kolacici());
	server.use(
		sesija({
			secret: konf.dajKonf().tajniKljucSesija,
			saveUninitialized: true,
			cookie: { maxAge: 1000 * 60 * 60 * 3 },
			resave: false,
		})
	);

	server.use((zahtjev, odgovor, next) => {
		odgovor.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
		odgovor.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
		odgovor.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
		odgovor.setHeader('Access-Control-Allow-Credentials', 'true');
		
		if (zahtjev.method === 'OPTIONS') {
		  return odgovor.sendStatus(200);
		}
		next();
	  });
		
	
	server.use("/js", express.static("./aplikacija/js"));
	server.use("/dokumentacija", express.static("./aplikacija/dokumentacija"));
	pripremiPutanjeKorisnik();
	pripremiPutanjeTMDB();
	pripremiPutanjePocetna();
	pripremiPutanjeFavoriti();
	pripremiPutanjeAutentifikacija();
	pripremiPutanjeOstale();
	

	
	server.use((zahtjev, odgovor) => {
		odgovor.status(404);
		odgovor.json({ opis: "nema resursa" });
	});
	server.listen(port, () => {
		console.log(`Server pokrenut na portu: ${port}`);
	});
}
function pripremiPutanjeKorisnik() {
	server.get("/baza/korisnici", restKorisnik.getKorisnici);
	server.post("/baza/korisnici", restKorisnik.postKorisnici);

	server.get("/baza/korisnici/:korime", restKorisnik.getKorisnik);
	server.post("/baza/korisnici/:korime", restKorisnik.postKorisnik);
	server.put("/baza/korisnici/:korime", restKorisnik.putKorisnik);
	server.delete("/baza/korisnici/:korime", restKorisnik.deleteKorisnik);

	server.get("/baza/korisnici/:korime/prijava", restKorisnik.getKorisnikPrijava);
	server.post("/baza/korisnici/:korime/prijava", restKorisnik.getKorisnikPrijava);
}

function pripremiPutanjeFavoriti() {
	server.get("/baza/favoriti", restFavoriti.getFavoriti);
}

function pripremiPutanjeTMDB() {
	let restTMDB = new RestTMDB(konf.dajKonf()["tmdb.apikey.v3"]);
	server.get("/api/tmdb/serije", restTMDB.getSerije.bind(restTMDB));
	server.get("/api/tmdb/serija", restTMDB.getSerijeID.bind(restTMDB));
}

function pripremiPutanjePocetna() {
	let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	server.get("/", htmlUpravitelj.pocetna.bind(htmlUpravitelj));
	server.get("/detaljiSerije", htmlUpravitelj.detaljiSerije.bind(htmlUpravitelj));
}

function pripremiPutanjeOstale() {
	let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	server.get("/dokumentacija", htmlUpravitelj.dokumentacija.bind(htmlUpravitelj));
	server.get("/korisnici", htmlUpravitelj.korisnici.bind(htmlUpravitelj));
	server.get("/profil", htmlUpravitelj.profil.bind(htmlUpravitelj));
	server.get("/favoriti", htmlUpravitelj.favoriti.bind(htmlUpravitelj));
}


function pripremiPutanjeAutentifikacija() {
	let htmlUpravitelj = new HtmlUpravitelj(konf.dajKonf().jwtTajniKljuc);
	let fetchUpravitelj = new FetchUpravitelj(konf.dajKonf().jwtTajniKljuc);
	server.get("/registracija", htmlUpravitelj.registracija.bind(htmlUpravitelj));
	server.post("/registracija", htmlUpravitelj.registracija.bind(htmlUpravitelj));
	server.get("/odjava", htmlUpravitelj.odjava.bind(htmlUpravitelj));
	server.get("/prijava", htmlUpravitelj.prijava.bind(htmlUpravitelj));
	server.post("/prijava", htmlUpravitelj.prijava.bind(htmlUpravitelj));
	server.get("/getJWT", fetchUpravitelj.getJWT.bind(fetchUpravitelj));
}

