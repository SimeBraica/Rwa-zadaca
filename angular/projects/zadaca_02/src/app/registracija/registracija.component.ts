import { Component } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from '../../enviroments/environment.prod';
import { Token } from '@angular/compiler';
import { SerijeService } from '../servisi/serije.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registracija',
  templateUrl: './registracija.component.html',
  styleUrls: ['./registracija.component.scss']
})
export class RegistracijaComponent {
  token:string=''
  ime:string='';
  prezime:string='';
  korime:string='';
  email:string='';
  lozinka:string='';
  tip_korisnika_id:number=2;
  drzava:string='';
  zupanija:string='';
  grad:string='';

  constructor(
    private http: HttpClient, 
    private serijeService: SerijeService,
    private router: Router
  ) {}

  async ngOnInit(): Promise<void> {
    const korime = localStorage.getItem('prijavljeniKorisnik');

  if (korime) {
    const tipKorisnikaId = await this.serijeService.provjeraUloge(korime);
    
    if (tipKorisnikaId !== null && tipKorisnikaId === 1) {
    } else {
      this.router.navigate(['/prijava']); 
    }
  } else {
    this.router.navigate(['/prijava']); 
  }
  }

  async dohvatiToken(){
    let token = await this.serijeService.dajToken();
    if (token != 'dobarToken') {
      this.token = token;
    }
  }


  async registriraj(){
    try {
      const podaciKorisnika = {
        ime:this.ime,
        prezime:this.prezime,
        korime:this.korime,
        email:this.email,
        lozinka:this.lozinka,
        drzava:this.drzava,
        zupanija:this.zupanija,
        grad:this.grad
      };

      const headers = {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.token
      };
      const envReg = environment.registracija
  
      const odgovorDodavanja = await this.http.post<any>('http://'+envReg, podaciKorisnika, { headers, withCredentials: true }).toPromise();
      console.log("Dodan: ", odgovorDodavanja);
      if (odgovorDodavanja == true) {
        this.router.navigate(['/']);
      }
      console.log(odgovorDodavanja);
    } catch (error) {
      console.error('Greska:', error);
    }
  }
}