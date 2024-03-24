import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './app.component';
import { PopisSerijaComponent } from './popis-serija/popis-serija.component';
import { DetaljiSerijaComponent } from './detalji-serija/detalji-serija.component';
import { PrijavaComponent } from './prijava/prijava.component';
import { RegistracijaComponent } from './registracija/registracija.component';
import { KorisniciComponent } from './korisnici/korisnici.component';
import { ProfilComponent } from './profil/profil.component';
import { ReactiveFormsModule } from '@angular/forms';
import { OdjavaComponent } from './odjava/odjava.component';
import { DokumentacijaComponent } from './dokumentacija/dokumentacija.component';

const routes: Routes = [
  { path: 'popis', component: PopisSerijaComponent },
  { path: 'detalji', component: DetaljiSerijaComponent },
  { path: 'korisnici', component: KorisniciComponent },
  { path: 'profil', component: ProfilComponent },
  { path: 'prijava', component: PrijavaComponent },
  { path: 'registracija', component: RegistracijaComponent },
  { path: 'dokumentacija', component: DokumentacijaComponent },
  { path: 'odjava', component: OdjavaComponent },
  { path: 'detalji/:naziv', component: DetaljiSerijaComponent },
  { path: '', redirectTo: '/popis', pathMatch: 'full' }, 
];


@NgModule({
  declarations: [
    AppComponent,
    PopisSerijaComponent,
    DetaljiSerijaComponent,
    PrijavaComponent,
    RegistracijaComponent,
    KorisniciComponent,
    ProfilComponent,
    OdjavaComponent,
    DokumentacijaComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
