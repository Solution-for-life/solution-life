import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ThemeService } from '../../../services/theme.service';

@Component({
  selector: 'app-theme-toggle-button',
  standalone: true,
  imports: [CommonModule],
  template: `
    <button 
      (click)="themeService.toggleTheme()" 
      class="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800"
      aria-label="Toggle Theme"
    >
      <i 
        class="fa transition-all duration-300" 
        [class.fa-moon]="(themeService.theme$ | async) === 'light'"
        [class.fa-sun]="(themeService.theme$ | async) === 'dark'"
      ></i>
    </button>
  `
})
export class ThemeToggleButtonComponent {
  public readonly themeService = inject(ThemeService);
}