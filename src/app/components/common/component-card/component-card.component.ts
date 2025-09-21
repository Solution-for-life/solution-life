import { CommonModule } from '@angular/common';
import { Component, inject, Input } from '@angular/core';
import { ButtonComponent } from '../../ui/button/button.component';
import { ModalService } from '../../../services/modal.service';
import { ModalComponent } from '../../ui/modal/modal.component';
import { InputFieldComponent } from '../../form/input/input-field.component';
import { TextAreaComponent } from '../../form/input/text-area.component';
import { LabelComponent } from '../../form/label/label.component';

@Component({
  selector: 'app-component-card',
  imports: [
    CommonModule,
    ButtonComponent,

  ],
  templateUrl: './component-card.component.html',
  styles: ``
})
export class ComponentCardComponent {


  private readonly modalService = inject(ModalService);

  isOpen = false;
  message = '';
  messageTwo = '';
  openModal() {
    this.modalService.openModal();
  }

  closeModal() {
    this.modalService.closeModal();
  }


  @Input() title!: string;
  @Input() desc: string = '';
  @Input() className: string = '';
}
