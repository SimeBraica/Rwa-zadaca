let url = "http://localhost:12000";

async function prikaziSveKorisnike() {
    try {
        const odgovor = await fetch('/baza/korisnici');
        const podaci = await odgovor.json();
        const listaKorisnika = document.getElementById('userList');

        listaKorisnika.innerHTML = '';

        podaci.forEach((korisnik) => {
            const listItem = document.createElement('li');
            listItem.textContent = `${korisnik.ime} ${korisnik.prezime} - Korisničko ime: ${korisnik.korime}`;
            listaKorisnika.appendChild(listItem);
        });
    } catch (error) {
        console.error('Greska prilikom prikaza', error);
    }
}
async function obrisiKorisnikaPoKorisnickom() {
    var korisnickoIme = document.getElementById("obrisiKorisnika").value;
    let parametri = { method: "DELETE" };
	parametri = await dodajToken(parametri);

    try {
        const odgovor = await fetch(`/baza/korisnici/${korisnickoIme}`, parametri);
        const korisnik = await odgovor.json();

        if (korisnik.tip_korisnika_uloga === 1) {
            console.log("Nemozes obrisati admina");
            return;
        }
        const odgovorObris = await fetch(`/baza/korisnici/${korisnickoIme}`, {
            method: 'DELETE'
        });
        const podaci = await odgovorObris.json();
        console.log(podaci);
        prikaziSveKorisnike();
    } catch (error) {
        console.error('Greska prilikom brisanja', error);
    }
}


document.addEventListener('DOMContentLoaded', () => {
        document.getElementById('obrisiButton').addEventListener('click', () => {
            obrisiKorisnikaPoKorisnickom();
        });
        prikaziSveKorisnike();
});
