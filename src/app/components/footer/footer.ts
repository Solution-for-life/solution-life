import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { LanguageService } from '../../services/language.service';
import { Lang } from '../../types/lang';

@Component({
  selector: 'app-footer',
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink
],
  templateUrl: './footer.html',
  styleUrl: './footer.css'
})
export class Footer {

  readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  public readonly langService = inject(LanguageService);

  switchLang(lang: Lang) {
    this.translate.use(lang); // Afecta a toda la app
    this.langService.setLang(lang);
  }
}
