import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';
import { RouterLink } from '@angular/router';
import { Footer } from "../../../components/footer/footer";

@Component({
  selector: 'app-about-us',
  imports: [
    CommonModule,
    Header,
    RouterLink,
    Footer
],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css'
})
export class AboutUs {

}
