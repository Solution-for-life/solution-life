import { Component, inject } from '@angular/core';
import { DatabaseService } from '@dbService/database.service';
import { LoaderService } from '../../../../services/loader.service';
import { Client } from '@interfaces/client';
import { CommonModule } from '@angular/common';
import { ModalComponent } from '../../../ui/modal/modal.component';


@Component({
  selector: 'app-clients',
  imports: [CommonModule, ModalComponent],
  templateUrl: './clients.html',
})
export class Clients   {

  constructor
  (
  ){}
  private readonly dbService = inject(DatabaseService);
  private readonly loaderService = inject(LoaderService);
  public clients: Client[] = [];
  public title = 'Clientes';
  errorModal = false;
  item : Client | null = null;

  async getClientes() {
    const clientes = await this.dbService.getCollection('clients');
    this.clients = Object.values(clientes ?? {});
  }

  handleDelete(item: Client | null) {
      // logic here
      this.errorModal = true;
      this.item = item;
      console.log('Delete:', item);
  }

  async handleDeleteConfirm() {
    this.loaderService.setLoader(true);
    await this.dbService.deleteCliente(this.item!.id!);
    this.loaderService.setLoader(false);
    this.clients = this.clients.filter(client => client.id !== this.item?.id);
    this.errorModal = false;

  }

   handleCloseModal(modal: 'success' | 'error' | 'info' | 'warning') {
    if(modal === 'error') this.errorModal = false;

  }

  async ngOnInit() {
    await this.getClientes();
  }
}
