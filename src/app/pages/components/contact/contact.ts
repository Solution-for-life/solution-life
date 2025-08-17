import { Component, inject } from '@angular/core';
import { Header } from "../../../components/header/header";
import { Footer } from '../../../components/footer/footer';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';

@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    Header,
    Footer,
    TranslateModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
}
