import { Component, OnInit } from '@angular/core';
import { SerijeService } from '../servisi/serije.service';
import { Router } from '@angular/router';
import { environment } from '../../enviroments/environment.prod';
@Component({
  selector: 'app-popis-serija',
  templateUrl: './popis-serija.component.html',
  styleUrls: ['./popis-serija.component.scss']
})
export class PopisSerijaComponent implements OnInit {
  series: any[] = [];
  isLoading = false;
  searchQuery = '';

  constructor(
    private serijeService: SerijeService,
    private router : Router) {}

  ngOnInit(): void {
    const daLiJePrijavljen = this.serijeService.checkLocalStorage();
    if(daLiJePrijavljen){
      this.displaySeries();
    }
  }
  displaySeries(): void{
    const inputField = document.getElementById('searchSeries') as HTMLInputElement;
    inputField.addEventListener('input', () => {
      this.searchQuery = inputField.value.trim();
      if (this.searchQuery.length >= 3) {
        this.fetchSeries();
      } else {
        this.series = []; 
      }
    });
  }
  
  fetchSeries(): void {
    this.isLoading = true;
    this.serijeService.dajSerije(1, this.searchQuery)
      .subscribe(
        (data) => {
          this.series = data.results;
          this.isLoading = false;
        },
        (error) => {
          console.error('Greska:', error);
          this.isLoading = false;
        }
      );
  }
  getIdSeries(id: number): void {
    const envDetails = environment.detaljiSerije;
    var url = envDetails + id;
    localStorage.setItem('seriesUrl', url);
    this.router.navigate(['/detalji']);
  }
}
