import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { ButtonComponent } from '../../../ui/button/button.component';
import { TableDropdownComponent } from '../../../common/table-dropdown/table-dropdown.component';
import { BadgeComponent } from '../../../ui/badge/badge.component';
import { Image } from '@interfaces/image';

interface Transaction {
  image: string;
  action: string;
  date: string;
  amount: string;
  category: string;

}

@Component({
  selector: 'app-basic-table-three',
  imports: [
    CommonModule,
    ButtonComponent,
    TableDropdownComponent,
    BadgeComponent,
  ],
  templateUrl: './basic-table-three.component.html',
  styles: ``
})
export class BasicTableThreeComponent {

  @Input() title?: string;
  @Input() items: Image[] | null = [];


  ngOnInit() {
    console.log('Items:', this.items);
  }

  // Type definition for the transaction data

  currentPage = 1;
  itemsPerPage = 5;
  get totalPages(): number {
    return Math.ceil((this.items?.length ?? 0) / this.itemsPerPage);
  }

  get currentItems(): Image[] {
    if (!this.items) return [];
    const start = (this.currentPage - 1) * this.itemsPerPage;
    return this.items.slice(start, start + this.itemsPerPage);
  }


  goToPage(page: number) {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
    }
  }

  handleViewMore(item: Transaction) {
    // logic here
    console.log('View More:', item);
  }

  handleDelete(item: Transaction) {
    // logic here
    console.log('Delete:', item);
  }

  getBadgeColor(status: string): 'success' | 'warning' | 'error' {
    if (status === 'Success') return 'success';
    if (status === 'Pending') return 'warning';
    return 'error';
  }
}
