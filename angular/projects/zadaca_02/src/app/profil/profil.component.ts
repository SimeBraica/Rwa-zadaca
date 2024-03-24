import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/environment.prod';
@Component({
  selector: 'app-profil',
  templateUrl: './profil.component.html',
  styleUrls: ['./profil.component.scss']
})
export class ProfilComponent implements OnInit {
  userInfo: any; 
  constructor(private http: HttpClient) {}

  ngOnInit(): void {
    this.fetchUserProfile();
  }

  fetchUserProfile(): void {
    const envAllUsers = environment.sviKorisnici;
    const prosloPrijavu = localStorage.getItem('prijavljeniKorisnik');
    const url = `http://${envAllUsers}/${prosloPrijavu}`;
    
    this.http.get(url)
      .subscribe(
        (data: any) => {
          this.userInfo = data;
          
        },
        (error) => {
          console.error('Greska prilikom dohvacanja profila', error);
        }
      );
  }
}
