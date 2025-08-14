import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, inject, input, signal } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';


@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Header {

  isOpen = signal(false);

  private readonly translate = inject(TranslateService);

  switchLang(lang: string) {
    this.translate.use(lang); // Afecta a toda la app
  }

  toggleDropdown() {
    this.isOpen.update(open => !open);
  }

  closeDropdown() {
    this.isOpen.set(false);
  }
}
