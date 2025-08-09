import { Component, signal } from '@angular/core';
import { Header } from '../../../components/header/header';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faCogs, faCubes, faHandshake, faStar, faUniversity, faUser } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-home',
  imports: [Header, FontAwesomeModule],
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
