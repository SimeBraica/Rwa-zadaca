window.addEventListener("load", async () => {
	poruka = document.getElementById("poruka");
    let filter = document.getElementById("filter");

    const pretrazivanjeNakon3 = async () => {
        if (filter.value.length >= 3) {
            await dajSerije(1);
        }
    };

    filter.addEventListener("input", async () => {
        await pretrazivanjeNakon3();
    });
});

async function dajSerije(str) {
	let parametri = { method: "GET" };
	//parametri = await dodajToken(parametri);
	let odgovor = await fetch(
		"/api/tmdb/serije?str=" + str + "&filter=" + dajFilter(),
		parametri
	);
	if (odgovor.status == 200) {
		let podaci = await odgovor.text();
		podaci = JSON.parse(podaci);
		console.log(podaci);
		prikaziSerije(podaci.results);

	} else {
		poruka.innerHTML = "Greška u dohvatu filmova!";
	}
}

function prikaziSerije(serija) {
	let glavna = document.getElementById("sadrzaj");
	let tablica = "<table border=1>";
	tablica +=
		"<tr><th>Id</th><th>Jezik</th><th>Naslov original</th><th>Naslov</th><th>Opis</th><th>Poster</th><th>Datum</th></tr>";
	for (let s of serija) {
		tablica += "<tr>";
		tablica += "<td>" + s.id + "</td>";
		tablica += "<td>" + s.original_language + "</td>";
		tablica += "<td>" + s.original_name+ "</td>";
		tablica += "<td>" + s.name + "</td>";
		tablica += "<td>" + s.overview + "</td>";
		tablica +=
			"<td><img src='https://image.tmdb.org/t/p/w600_and_h900_bestv2/" +
			s.poster_path +
			"' width='100' alt='slika_" +
			s.title +
			"'/></td>";
		tablica += "<td>" + s.first_air_date + "</td>";
		tablica +=
			"<td><button onClick='prikaziDetalje(" +
			s.id +
			")'>Prikazi detalje</button></td>";
		tablica += "</tr>";
	}
	tablica += "</table>";

	sessionStorage.dohvaceneSerije = JSON.stringify(serija);

	glavna.innerHTML = tablica;
}


function dajFilter() {
	return document.getElementById("filter").value;
}

async function prikaziDetalje(id){
	console.log(id);
	window.location.href = "/detaljiSerije?id="+id;

}