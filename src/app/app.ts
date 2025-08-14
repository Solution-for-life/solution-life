import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('solution-life');

  constructor(private translateService: TranslateService) {
    translateService.addLangs(['en', 'es']);
    const browserLang = translateService.getBrowserLang();
    console.log(browserLang);
    translateService.use(browserLang?.match(/en|es/) ? browserLang : 'en');
  }

}
