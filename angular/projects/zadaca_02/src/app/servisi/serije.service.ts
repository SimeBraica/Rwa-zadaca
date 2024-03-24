import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { environment } from '../../enviroments/environment.prod';
@Injectable({
  providedIn: 'root',
})
export class SerijeService {
  private envRest = environment.restServis;
  private apiUrl = 'http://'+this.envRest;
  
  constructor(private http: HttpClient,
    private router: Router) {}

  dajSerije(stranica: number, trazi: string): Observable<any> {
    stranica = 1;
    const url = `${this.apiUrl}?str=${stranica}&filter=${trazi}`;
    return this.http.get<any>(url);
}

  async dajToken(): Promise<string> {
    const envJWT = environment.jwt;
    let odgovor = await fetch("http://"+envJWT, {credentials: 'include'});
    let tekst = JSON.parse(await odgovor.text());
    if (tekst.ok != null) {
      return tekst.ok;
    } else {
      return "dobarToken";
    }
  }
  async provjeraUloge(korime: string): Promise<number | null> {
    const envAllUsers = environment.sviKorisnici;
    const dohvatiUlogu = `http://${envAllUsers}/${korime}`;

    try {
      const ulogaTrenutnogKorisnika = await this.http.get<any>(dohvatiUlogu).toPromise();
      return ulogaTrenutnogKorisnika?.tip_korisnika_id || null;
    } catch (error) {
      console.error('Greska je ovo:', error);
      return null;
    }
  }


  async prijaviKorisnika(podaciPrijava: { korime: string; lozinka: string; }) {
    const envLogin= environment.prijava;
    try {
      const options = { withCredentials: true };
      const odgovor = await this.http.post('http://'+envLogin, podaciPrijava, { observe: 'response', ...options }).toPromise();      
      const odgovorBody = odgovor!.body;
      if (odgovor!.ok) {
        console.log(odgovor?.ok);
        console.log("odgovorBody: ", odgovorBody);
        const provjereniToken = await this.dajToken();
        if (provjereniToken != "dobarToken") {
          console.log("prijavljeni korisnik"); 
          this.router.navigate(['/popis']);
          console.log(podaciPrijava.korime);
          localStorage.setItem('prijavljeniKorisnik', podaciPrijava.korime);
        } else {
          console.log("gresk");
        }
      } 
    } catch (e) {
      console.error("Greska:", e);
    }
  } 
  
  checkLocalStorage(): number {
    const korime = localStorage.getItem('prijavljeniKorisnik');
    if (korime) {
      return 1;
    } else {
      console.log("nisi prijavljen")
      this.router.navigate(['/prijava']);
      return 0;
    }
  }




  
  
}
