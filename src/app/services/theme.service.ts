import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type Theme = 'light' | 'dark';

@Injectable({ providedIn: 'root' })

export class ThemeService {
  private themeSubject = new BehaviorSubject<Theme>('dark');
  theme$ = this.themeSubject.asObservable();

  constructor() {
    const savedTheme = (localStorage.getItem('theme') as Theme) || 'light';
    this.setTheme(savedTheme);
  }

  toggleTheme() {
    const newTheme = this.themeSubject.value === 'light' ? 'dark' : 'light';
    this.setTheme(newTheme);
  }

  setTheme(theme: Theme) {
    this.themeSubject.next(theme);
    localStorage.setItem('theme', theme);
    const root = document.documentElement;
    
    if (theme === 'dark') {
      root.classList.add('dark');
      // Colores de fondo
      root.style.setProperty('--bg-primary', '#111827');  // gray-900
      root.style.setProperty('--bg-secondary', '#1F2937'); // gray-800
      root.style.setProperty('--bg-card', '#374151');     // gray-700
      
      // Colores de texto
      root.style.setProperty('--text-primary', '#F9FAFB');  // gray-50
      root.style.setProperty('--text-secondary', '#E5E7EB'); // gray-200
      
      // Bordes
      root.style.setProperty('--border-color', '#374151');  // gray-700
      
      // Hover y estados
      root.style.setProperty('--hover-bg', 'rgba(255, 255, 255, 0.1)');
      root.style.setProperty('--active-bg', '#4B5563');     // gray-600
    } else {
      root.classList.remove('dark');
      // Colores de fondo
      root.style.setProperty('--bg-primary', '#FFFFFF');
      root.style.setProperty('--bg-secondary', '#F9FAFB');  // gray-50
      root.style.setProperty('--bg-card', '#FFFFFF');
      
      // Colores de texto
      root.style.setProperty('--text-primary', '#111827');  // gray-900
      root.style.setProperty('--text-secondary', '#4B5563'); // gray-600
      
      // Bordes
      root.style.setProperty('--border-color', '#E5E7EB');  // gray-200
      
      // Hover y estados
      root.style.setProperty('--hover-bg', '#F3F4F6');     // gray-100
      root.style.setProperty('--active-bg', '#E5E7EB');    // gray-200
    }
  }
}
