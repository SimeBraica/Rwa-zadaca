const Baza = require("./baza.js");

class FavoritiDAO {

	constructor() {
		this.baza = new Baza("sbraica21.sqlite");
	}

	dajSve = async function () {
		this.baza.spojiSeNaBazu();
		let sql = "SELECT * FROM favoriti;"
		var podaci = await this.baza.izvrsiUpit(sql, []);
		this.baza.zatvoriVezu();
		return podaci;
	}

}

module.exports = FavoritiDAO;
