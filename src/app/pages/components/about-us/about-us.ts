import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Header } from '../../../components/header/header';

@Component({
  selector: 'app-about-us',
  imports: [
    CommonModule,
    Header
  ],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css'
})
export class AboutUs {

}
