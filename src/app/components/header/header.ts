import { CommonModule } from '@angular/common';
import { Component, CUSTOM_ELEMENTS_SCHEMA, input, signal } from '@angular/core';


@Component({
  selector: 'app-header',
  imports: [CommonModule],
  templateUrl: './header.html',
  styleUrl: './header.css',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class Header {

  isOpen = signal(false);

  toggleDropdown() {
    this.isOpen.update(open => !open);
  }

  closeDropdown() {
    this.isOpen.set(false);
  }
}
