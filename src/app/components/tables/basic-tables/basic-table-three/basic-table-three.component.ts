import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ButtonComponent } from '../../../ui/button/button.component';
import { TableDropdownComponent } from '../../../common/table-dropdown/table-dropdown.component';
import { BadgeComponent } from '../../../ui/badge/badge.component';
import { Image } from '@interfaces/image';
import { ModalComponent } from '../../../ui/modal/modal.component';
import { DatabaseService } from '@dbService/database.service';
import { LoaderService } from '../../../../services/loader.service';
import { LanguageService } from '../../../../services/language.service';

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
    ModalComponent,
  ],
  templateUrl: './basic-table-three.component.html',
  styles: ``
})
export class BasicTableThreeComponent {

  @Input() title?: string;
  @Input() items: Image[] | null = [];

  private readonly dbService = inject(DatabaseService);
  readonly loaderService = inject(LoaderService);
  readonly langService = inject(LanguageService);

  public item : Image | null = null;

  successModal = false;
  errorModal = false;
  infoModal = false;
  warningModal = false;

  // Type definition for the transaction data

  currentPage = 1;
  itemsPerPage = 3;
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

  async handleDeleteConfirm() {
    this.loaderService.setLoader(true);
    await this.dbService.deleteItem(this.item!.id!, 'carouselImages', this.item?.storagePath);
    this.loaderService.setLoader(false);
    this.items = this.items!.filter(item => item.id !== this.item?.id);
    this.errorModal = false;
  }

  handleDelete(item: Image | null) {
    // logic here
    this.errorModal = true;
    this.item = item;
    console.log('Delete:', item);
  }

  getBadgeColor(status: string): 'success' | 'warning' | 'error' {
    if (status === 'Success') return 'success';
    if (status === 'Pending') return 'warning';
    return 'error';
  }


  handleCloseModal(modal: 'success' | 'error' | 'info' | 'warning') {
    if(modal === 'success') this.successModal = false;
    if(modal === 'error') this.errorModal = false;
    if(modal === 'info') this.infoModal = false;
    if(modal === 'warning') this.warningModal = false;
  }
}
