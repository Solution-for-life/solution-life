import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-about-us',
  imports: [
    CommonModule,
    Header,
    RouterLink
],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css'
})
export class AboutUs {

}
