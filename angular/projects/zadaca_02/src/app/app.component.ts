import { Component } from '@angular/core';
import { SerijaTmdb, SerijeTMDB } from './servisi/SerijeTMDB';
import { SerijeService } from './servisi/serije.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'zadaca_02';
  putanja = 'popis';
  serija: SerijaTmdb | null = null;

  constructor(private serijeService: SerijeService) {}
}
