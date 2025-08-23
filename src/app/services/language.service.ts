import { Injectable, signal, WritableSignal } from '@angular/core';
import { Lang } from '../types/lang';

@Injectable({
  providedIn: 'root'
})
export class LanguageService {

  public lang : WritableSignal<Lang> = signal('en');

  setLang(lang: Lang) {
    this.lang.set(lang);
  }

  getLang() {
    return this.lang();
  }
}
