import { Component, inject } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule
],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  readonly _loginService = inject(LoginService);
  private readonly fb = inject(FormBuilder);

  form : FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  async login() {
    try{
      if(!this.form.valid){
        return;
      }
      // console.log(this.form.value);
      const response = await this._loginService.login(this.form.value.email, this.form.value.password);
      console.log(response);
    }catch(e){
      console.log(e);
    }
  }
}
