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
    name: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(50)]],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern('[0-9]{10}')]],
    message: ['', [Validators.required, Validators.minLength(1), Validators.maxLength(500)]],
  });

  submitForm() {
    if(this.form.valid){
      const data = this.form.value;
      this.db.setItem('clients', data);
      this.router.navigate(['/home']);
    }
    else{
      console.log('invalid');
      this.toastr.error('Complete los campos requeridos');
    }

  }

}
