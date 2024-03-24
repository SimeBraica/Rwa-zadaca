
import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SerijeService } from '../servisi/serije.service';
import {Router} from '@angular/router'
import { environment } from '../../enviroments/environment.prod';
@Component({
  selector: 'app-korisnici',
  templateUrl: './korisnici.component.html',
  styleUrls: ['./korisnici.component.scss']
})
export class KorisniciComponent implements OnInit {
  users: any[] = [];

  constructor(private http: HttpClient,
    private serijeService: SerijeService,
    private router: Router) {}

    async ngOnInit(): Promise<void> {
      const korime = localStorage.getItem('prijavljeniKorisnik');

    if (korime) {
      const tipKorisnikaId = await this.serijeService.provjeraUloge(korime);
      
      if (tipKorisnikaId !== null && tipKorisnikaId === 1) {
        this.fetchUsers();
      } else {
        this.router.navigate(['/prijava']); 
      }
    } else {
      this.router.navigate(['/prijava']); 
    }
    }
    

  fetchUsers(): void {
    const envAllUsers= environment.sviKorisnici;
    this.http.get<any[]>('http://' + envAllUsers)
      .subscribe(
        (data: any[]) => {
          this.users = data;
          console.log('Svi korisnici:', this.users); 
        },
        error => {
          console.error('Greska prilikom dohvacanja korisnika:', error);
        }
      );
  }
  korimeToDelete = ''; 
  deleteUser(): void {
    const envAllUsers = environment.sviKorisnici;
    if (this.korimeToDelete.trim() !== '') {
      const korime = this.korimeToDelete.trim();
      const deleteUrl = `http://${envAllUsers}/${korime}`; 
      this.http.delete(deleteUrl)
        .subscribe(
          (response) => {
            console.log('Obrisao korisnika:', response);
            this.fetchUsers();
          },
          (error) => {
            console.error('Greska prilikom brisanja korisnika:', error);
          }
        );
    }
  }
}
