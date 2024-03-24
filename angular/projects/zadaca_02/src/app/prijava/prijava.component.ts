import { Component, OnInit } from '@angular/core';
import { SerijeService } from '../servisi/serije.service';
import { Router } from '@angular/router';

declare const grecaptcha: any; // Declare grecaptcha globally

@Component({
  selector: 'app-prijava',
  templateUrl: './prijava.component.html',
  styleUrls: ['./prijava.component.scss']
})
export class PrijavaComponent implements OnInit {
  username: string = '';
  password: string = '';

  constructor(
    private serijeService: SerijeService,
    private router: Router
  ) {}

  ngOnInit(): void {
    window.onload = () => {
      console.log("grecaptcha: ", grecaptcha);
    };
  }

  async prijavi() {
    const prijavaPomocuForme = {
      korime: this.username,
      lozinka: this.password,
    };

    try {
      await this.initiateRecaptcha();
      let rezultat = this.serijeService.prijaviKorisnika(prijavaPomocuForme);
    } catch(error) {
      console.error("Greska u recaptchi", error);
    }
  } 

  initiateRecaptcha(): Promise<string> {
    return new Promise((resolve, reject) => {
      grecaptcha.ready(() => {
        grecaptcha.execute('6LfZG0kpAAAAACFsEj7IbDy8G--YgfLKVWS0oqG-', { action: 'submit' })
          .then((token: string) => {
            console.log('Recaptcha token:', token);
            resolve(token);
          })
          .catch((error: any) => {
            console.error('Dogodila se pogreska:', error);
            reject(error);
          });
      });
    });
  }
}

