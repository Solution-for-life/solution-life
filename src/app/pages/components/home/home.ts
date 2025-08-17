import { Component, inject, signal } from '@angular/core';
import { Header } from '../../../components/header/header';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faCogs, faCubes, faHandshake, faStar, faUniversity, faUser } from '@fortawesome/free-solid-svg-icons';
import { HomeContact } from "../home-contact/home-contact";
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Footer } from '../../../components/footer/footer';

@Component({
  selector: 'app-home',
  imports: [Header, FontAwesomeModule, HomeContact, CommonModule, TranslateModule, Footer],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export default class Home {
  faUser = faUser;
  faCheckCircle = faCheckCircle;
  faCubes = faCubes;
  faHandshake = faHandshake;
  faStar = faStar;
  faUniversity = faUniversity;
  faCogs = faCogs;

}
