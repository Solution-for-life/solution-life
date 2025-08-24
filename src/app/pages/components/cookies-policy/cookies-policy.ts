import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import {  TranslateModule } from '@ngx-translate/core';
import { Footer } from '../../../components/footer/footer';
import { Header } from '../../../components/header/header';
@Component({
  selector: 'app-cookies-policy',
  imports: [
    TranslateModule,
    CommonModule,
    Footer,
    Header
  ],
  templateUrl: './cookies-policy.html',
  styles: ``
})
export class CookiesPolicy {

}
