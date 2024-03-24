var prijavljeni = localStorage.getItem("korime");
console.log(prijavljeni);

window.addEventListener("load", async () => {
    let trenutniURL = window.location.href;
    let dohvatIURL = new URLSearchParams(new URL(trenutniURL).search);
    let id = dohvatIURL.get('id');
	
    console.log(id);
    await dajSeriju(id);

    prijavljeni = localStorage.removeItem("korime");
    
});

async function dajSeriju(id) {
	let parametri = { method: "GET" };
	parametri = await dodajToken(parametri);
    console.log(parametri);
	let odgovor = await fetch(
		"/api/tmdb/serija?id="+id,
		parametri
	);
	if (odgovor.status == 200) {
		let podaci = await odgovor.text();
        console.log(podaci);
		podaci = JSON.parse(podaci);
		console.log(podaci);
		prikaziSeriju(podaci);


	} else {
		poruka.innerHTML = "Greška u dohvatu serijue!";
	}
}


function prikaziSeriju(s) {
    console.log(s);
	let glavna = document.getElementById("sadrzajDetalji");
	let tablica = "<table border=1>";
	tablica +=
		"<tr><th>Naziv</th><th>Opis</th><th>Broj sezona</th><th>Broj epizoda</th><th>Popularnost</th><th>Poveznica</th><th>Slika</th></tr>";
		tablica += "<tr>";
		tablica += "<td>" + s.name + "</td>";
		tablica += "<td>" + s.overview + "</td>";
        tablica += "<td>" + s.number_of_seasons + "</td>";
        tablica += "<td>" + s.number_of_episodes + "</td>";
        tablica += "<td>" + s.popularity + "</td>";
        tablica += "<td><a href='" + s.homepage + "'>" + s.homepage + "</a></td>";
		tablica +=
			"<td><img src='https://image.tmdb.org/t/p/w600_and_h900_bestv2/" +
			s.poster_path +
			"' width='100' alt='slika_" +
			s.title +
			"'/></td>";
		tablica += "<td>" + s.first_air_date + "</td>";
 
        if (prijavljeni !== null) {
            tablica += "<td><button onClick='dodajFavorite(" + s.id + ")'>Dodaj u favorite</button></td>";
        } else {
            tablica += "<td>Prijavite se da biste dodali u favorite</td>";
        }
        
		tablica += "</tr>";
	tablica += "</table>";

	glavna.innerHTML = tablica;
}
