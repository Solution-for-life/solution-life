import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoginService } from '../../../services/login.service';
import { User } from '@interfaces/user';

@Component({
  selector: 'app-register',
  imports: [
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './register.html',
  styles: ``
})
export class Register {

  private readonly fb = inject(FormBuilder);
  private readonly loginService = inject(LoginService);

  form : FormGroup = this.fb.group({
    name: ['', Validators.required],
    lastName: ['', Validators.required],
    email: ['', Validators.required],
    password: ['', Validators.required],
    confirmPassword: ['', Validators.required]
  });

  async createUser() {
    try{
      console.log(this.form.value);
      const response = await this.loginService.createUser(this.form.value);
      console.log(response);
    }catch(e){
      console.log(e);
    }
  }
}
