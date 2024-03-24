async function profilKorisnika() {
    let parametri = { method: "GET" };
    //parametri = await dodajToken(parametri);

    const korimeValue = localStorage.getItem('korime');

    const odgovor = await fetch(`/baza/korisnici/${korimeValue}`, parametri);
    
    const korisnik = await odgovor.json();

    const ime = document.getElementById("Ime");
    ime.textContent = korisnik.ime
    
    const prezime = document.getElementById("Prezime");
    prezime.textContent = korisnik.prezime

    const korime = document.getElementById("Korime");
    korime.textContent = korisnik.korime

    const email = document.getElementById("Email");
    email.textContent = korisnik.email

    const uloga = document.getElementById("Uloga");
    if(korisnik.tip_korisnika_id == 1){
        uloga.textContent = "Administrator"
    }
    else if (korisnik.tip_korisnika_id == 2){
        uloga.textContent = "Korisnik";
    }
    const drzava = document.getElementById("Drzava");
    drzava.textContent = korisnik.drzava

    const zupanija = document.getElementById("Zupanija");
    zupanija.textContent = korisnik.zupanija

    const grad = document.getElementById("Grad");
    grad.textContent = korisnik.grad

}

window.addEventListener("load", async () => {
    await profilKorisnika();
});
