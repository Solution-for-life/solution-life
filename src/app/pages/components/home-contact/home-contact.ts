import { Component } from '@angular/core';
import { CarruselComponent } from "../carrusel/carrusel";
import { RouterLink } from '@angular/router';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-home-contact',
  imports: [CarruselComponent, RouterLink, TranslateModule],
  templateUrl: './home-contact.html',
  styleUrl: './home-contact.css'
})
export class HomeContact {

}
