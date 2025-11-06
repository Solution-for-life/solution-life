import { Component, inject } from '@angular/core';
import { Header } from "../../../components/header/header";
import { Footer } from '../../../components/footer/footer';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { Router, RouterLink, RouterLinkActive } from '@angular/router';
import { DatabaseService } from '@dbService/database.service';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { WhatsappButton } from '../whatsapp-button/whatsapp-button';
@Component({
  selector: 'app-contact',
  imports: [
    CommonModule,
    Header,
    Footer,
    TranslateModule,
    ReactiveFormsModule,
    FormsModule,
    WhatsappButton
    // RouterLink,
    // RouterLinkActive,
  ],
  templateUrl: './contact.html',
  styleUrl: './contact.css'
})
export class Contact {

  readonly router = inject(Router);
  private readonly translate = inject(TranslateService);
  private readonly db = inject(DatabaseService);
  private  toastr = inject(ToastrService);
  fb = inject(FormBuilder);

  form : FormGroup = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('^[0-9]{10,14}$')]],
    message: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(500)]],
  });

  // Método para verificar si un campo es inválido
  isFieldInvalid(fieldName: string): boolean {
    const field = this.form.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  // Método para obtener el mensaje de error específico
  getFieldError(fieldName: string): string {
    const field = this.form.get(fieldName);
    if (field && field.errors && (field.dirty || field.touched)) {
      if (field.errors['required']) return `${this.getFieldLabel(fieldName)} es requerido`;
      if (field.errors['email']) return 'Correo electrónico inválido';
      if (field.errors['pattern'] && fieldName === 'phone') return 'El teléfono debe contener entre 10 y 14 dígitos';
      if (field.errors['minlength']) {
        const requiredLength = field.errors['minlength'].requiredLength;
        if (fieldName === 'message') return `El mensaje debe tener mínimo ${requiredLength} caracteres`;
        return `${this.getFieldLabel(fieldName)} debe tener mínimo ${requiredLength} caracteres`;
      }
      if (field.errors['maxlength']) {
        const maxLength = field.errors['maxlength'].requiredLength;
        return `${this.getFieldLabel(fieldName)} debe tener máximo ${maxLength} caracteres`;
      }
    }
    return '';
  }

  // Método helper para obtener etiquetas de campos
  private getFieldLabel(fieldName: string): string {
    const labels: {[key: string]: string} = {
      'name': 'El nombre',
      'email': 'El email',
      'phone': 'El teléfono',
      'message': 'El mensaje'
    };
    return labels[fieldName] || fieldName;
  }

  submitForm() {
    if(this.form.valid){
      const data = this.form.value;
      this.db.setItem('clients', data)
        .then(() => {
          // Mostrar mensaje de éxito
          this.toastr.success('¡Mensaje enviado con éxito!', 'Éxito');
          // Limpiar el formulario
          this.form.reset();
          // Remover estado touched/dirty de todos los campos
          Object.keys(this.form.controls).forEach(key => {
            const control = this.form.get(key);
            control?.markAsUntouched();
            control?.markAsPristine();
          });
        })
        .catch(error => {
          this.toastr.error('Ocurrió un error al enviar el mensaje', 'Error');
          console.error('Error al guardar los datos:', error);
        });
    }
    else{
      // Marcar todos los campos como touched para mostrar errores
      this.form.markAllAsTouched();
      this.toastr.error('Complete los campos requeridos correctamente');
    }
  }

}
