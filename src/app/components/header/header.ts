import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, HostListener, inject, input, signal } from '@angular/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DatabaseService } from '@dbService/database.service';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Service } from '@interfaces/service';
import { Lang } from '../../types/lang';
import { LanguageService } from '../../services/language.service';

@Component({
  selector: 'app-header',
  imports: [
    CommonModule,
    TranslateModule,
    RouterLink,
    RouterLinkActive,
  ],
  templateUrl: './header.html',
  styleUrl: './header.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Header {

  isOpen = signal(false);
  isSticky = false;

  readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  private readonly db = inject(DatabaseService);
  public services : Service[] = [];
  public readonly langService = inject(LanguageService);

  switchLang(lang: Lang) {
    this.langService.setLang(lang);
    this.translate.use(lang);
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    this.isSticky = window.scrollY > 400;
  }

  toggleDropdown() {
    this.isOpen.update(open => !open);
  }

  closeDropdown() {
    this.isOpen.set(false);
    // Cerrar el menú desplegable de escritorio
    const desktopMenu = document.getElementById('desktop-menu-product') as HTMLElement;
    if (desktopMenu) {
      desktopMenu.removeAttribute('open');
    }
    // Cerrar el menú móvil y su desplegable
    const mobileMenu = document.getElementById('mobile-menu') as HTMLDialogElement;
    const productsDisclosure = document.getElementById('products') as HTMLElement;
    if (mobileMenu) {
      mobileMenu.close();
    }
    if (productsDisclosure) {
      productsDisclosure.setAttribute('hidden', '');
    }
  }

  onServiceClick() {
    // Cerrar todos los menús desplegables
    this.closeDropdown();
  }

  async getServices() {
    const result = await this.db.getCollection('services');
    this.services = Object.entries(result as Record<string, Service>).map(([key, value]) => ({
      id: key,
      ...value
    }));
    console.log(this.services);
  }

  ngOnInit () {
    this.getServices();
  }
}
