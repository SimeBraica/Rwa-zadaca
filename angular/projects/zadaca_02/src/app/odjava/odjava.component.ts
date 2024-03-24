import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../enviroments/environment.prod';
@Component({
  selector: 'app-odjava',
  templateUrl: './odjava.component.html',
  styleUrls: ['./odjava.component.scss']
})
export class OdjavaComponent implements OnInit {

  constructor(private router: Router, private http: HttpClient) { }

  ngOnInit(): void {
    const envLogout = environment.odjava;
    const options = { withCredentials: true };
    const odgovor = this.http.get('http://'+ envLogout, { observe: 'response', ...options }).toPromise()
    localStorage.clear();
    this.router.navigate(['/prijava']);
        
      
  }
}
