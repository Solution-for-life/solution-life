import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-footer',
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

  readonly router = inject(Router);
  private readonly translate = inject(TranslateService);

  switchLang(lang: string) {
    this.translate.use(lang); // Afecta a toda la app
  }
}
