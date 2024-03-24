const FavoritiDAO = require("./favoritiDAO.js");

exports.getFavoriti = function (zahtjev, odgovor) {
	odgovor.type("application/json");
	odgovor.type("application/json");
	odgovor.status(501);
	let poruka = { opis: "nije implementirano" };
	odgovor.send(poruka);
};


