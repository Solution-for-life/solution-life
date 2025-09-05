import { Component } from '@angular/core';
import { CarruselComponent } from "../carrusel/carrusel";
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home-contact',
  imports: [CarruselComponent, RouterLink],
  templateUrl: './home-contact.html',
  styleUrl: './home-contact.css'
})
export class HomeContact {

}
