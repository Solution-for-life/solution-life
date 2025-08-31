import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Header } from '../../../components/header/header';
import { RouterLink } from '@angular/router';
import { Footer } from "../../../components/footer/footer";
import { TranslateModule } from '@ngx-translate/core';

@Component({
  selector: 'app-about-us',
  imports: [
    CommonModule,
    TranslateModule,
    Header,
    RouterLink,
    Footer
],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css'
})
export class AboutUs {

}
