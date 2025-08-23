import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { LanguageService } from './services/language.service';
import { Lang } from './types/lang';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('solution-life');

  constructor(
    private translateService: TranslateService,
    private langService : LanguageService
  ) {
    translateService.addLangs(['en', 'es']);
    const browserLang  = translateService.getBrowserLang()!;

    const lang: Lang = browserLang === 'es' || browserLang === 'en' ? browserLang : 'en';

    // console.log(browserLang);
    translateService.use(lang);
    this.langService.setLang(lang);
  }

}
