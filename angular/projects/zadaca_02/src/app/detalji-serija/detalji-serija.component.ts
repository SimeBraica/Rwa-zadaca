import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { SerijeService } from '../servisi/serije.service';
@Component({
  selector: 'app-detalji-serija',
  templateUrl: './detalji-serija.component.html',
  styleUrls: ['./detalji-serija.component.scss']
})
export class DetaljiSerijaComponent implements OnInit {
  fetchedData: any;

  constructor(private http: HttpClient,
    private serijeService: SerijeService) {}

  ngOnInit(): void {
    const daLiJePrijavljen = this.serijeService.checkLocalStorage();
    if(daLiJePrijavljen){
      this.fetchDataFromUrl();
    }
  }

  fetchDataFromUrl(): void {
    const storedUrl = localStorage.getItem('seriesUrl');
    if (storedUrl) {
      const prefixedUrl = 'http://' + storedUrl;
      this.http.get<any>(prefixedUrl)
        .subscribe(
          (data: any) => {
            this.fetchedData = data;
          },
          error => {
            console.error('Greska: ', error);
          }
        );
    } else {
      console.error('Nemogu prikazati detalje jer nema nista u localStorageu');
    }
  }
}
