-- Creator:       MySQL Workbench 8.0.32/ExportSQLite Plugin 0.1.0
-- Author:        Sime Braica
-- Caption:       New Model
-- Project:       Name of the project
-- Changed:       2023-11-21 23:21
-- Created:       2023-10-14 11:14

BEGIN;
CREATE TABLE "tip_korisnika"(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "naziv" VARCHAR(100) NOT NULL,
  "opis" VARCHAR(1000)
);
CREATE TABLE "serije"(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "naziv" VARCHAR(100) NOT NULL,
  "opis" VARCHAR(1500) NOT NULL,
  "broj_sezona" INTEGER NOT NULL,
  "broj_epizoda" INTEGER NOT NULL,
  "popularnost" INTEGER NOT NULL,
  "slika" VARCHAR(500) NOT NULL,
  "poveznica" VARCHAR(500) NOT NULL,
  CONSTRAINT "opis_UNIQUE"
    UNIQUE("opis"),
  CONSTRAINT "broj_sezona_UNIQUE"
    UNIQUE("broj_sezona"),
  CONSTRAINT "broj_epizoda_UNIQUE"
    UNIQUE("broj_epizoda"),
  CONSTRAINT "popularnost_UNIQUE"
    UNIQUE("popularnost"),
  CONSTRAINT "slika_UNIQUE"
    UNIQUE("slika"),
  CONSTRAINT "poveznica_UNIQUE"
    UNIQUE("poveznica")
);
CREATE TABLE "sezona"(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "naziv" VARCHAR(100) NOT NULL,
  "opis" VARCHAR(1500) NOT NULL,
  "broj_sezone" INTEGER NOT NULL,
  "broj_epizoda_sezone" INTEGER NOT NULL,
  "slika" VARCHAR(500) NOT NULL,
  "serije_id" INTEGER NOT NULL,
  CONSTRAINT "opis_UNIQUE"
    UNIQUE("opis"),
  CONSTRAINT "naziv_UNIQUE"
    UNIQUE("naziv"),
  CONSTRAINT "broj_sezone_UNIQUE"
    UNIQUE("broj_sezone"),
  CONSTRAINT "broj_epizoda_sezone_UNIQUE"
    UNIQUE("broj_epizoda_sezone"),
  CONSTRAINT "slika_UNIQUE"
    UNIQUE("slika"),
  CONSTRAINT "fk_sezona_serije1"
    FOREIGN KEY("serije_id")
    REFERENCES "serije"("id")
);
CREATE INDEX "sezona.fk_sezona_serije1_idx" ON "sezona" ("serije_id");
CREATE TABLE "korisnik"(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "ime" VARCHAR(50),
  "prezime" VARCHAR(100),
  "korime" VARCHAR(50) NOT NULL,
  "email" VARCHAR(100) NOT NULL,
  "lozinka" VARCHAR(100) NOT NULL,
  "tip_korisnika_id" INTEGER NOT NULL,
  "drzava" VARCHAR(45),
  "zupanija" VARCHAR(45),
  "grad" VARCHAR(45),
  CONSTRAINT "email_UNIQUE"
    UNIQUE("email"),
  CONSTRAINT "korime_UNIQUE"
    UNIQUE("korime"),
  CONSTRAINT "fk_korisnik_tip_korisnika1"
    FOREIGN KEY("tip_korisnika_id")
    REFERENCES "tip_korisnika"("id")
);
CREATE INDEX "korisnik.fk_korisnik_tip_korisnika1_idx" ON "korisnik" ("tip_korisnika_id");
CREATE TABLE "dnevnik"(
  "id" INTEGER PRIMARY KEY AUTOINCREMENT NOT NULL,
  "metode" VARCHAR(100) NOT NULL,
  "datum" TIMESTAMP(2) NOT NULL,
  "korisnik_id" INTEGER NOT NULL,
  CONSTRAINT "metode_UNIQUE"
    UNIQUE("metode"),
  CONSTRAINT "datum_UNIQUE"
    UNIQUE("datum"),
  CONSTRAINT "fk_dnevnik_korisnik"
    FOREIGN KEY("korisnik_id")
    REFERENCES "korisnik"("id")
);
CREATE INDEX "dnevnik.fk_dnevnik_korisnik_idx" ON "dnevnik" ("korisnik_id");
CREATE TABLE "favoriti"(
  "korisnik_id" INTEGER NOT NULL,
  "serije_id" INTEGER NOT NULL,
  CONSTRAINT "fk_korisnik_has_serije_korisnik1"
    FOREIGN KEY("korisnik_id")
    REFERENCES "korisnik"("id"),
  CONSTRAINT "fk_korisnik_has_serije_serije1"
    FOREIGN KEY("serije_id")
    REFERENCES "serije"("id")
);
CREATE INDEX "favoriti.fk_korisnik_has_serije_serije1_idx" ON "favoriti" ("serije_id");
CREATE INDEX "favoriti.fk_korisnik_has_serije_korisnik1_idx" ON "favoriti" ("korisnik_id");
COMMIT;

INSERT INTO tip_korisnika (naziv, opis) VALUES ("admin", "administrator");
INSERT INTO tip_korisnika (naziv, opis) VALUES ("korisnik", "korisnik");

INSERT INTO korisnik(korime,lozinka,email,tip_korisnika_id) VALUES("matnovak","123456","aaaaa@fef",1);