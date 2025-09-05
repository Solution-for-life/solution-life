import { Component, inject } from '@angular/core';
import { LoginService } from '../../../services/login.service';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Loader } from '../../../components/loader/loader';
import { LoaderService } from '../../../services/loader.service';

@Component({
  selector: 'app-login',
  imports: [
    CommonModule,
    RouterLink,
    ReactiveFormsModule,
    FormsModule,
    Loader
],
  templateUrl: './login.html',
  styleUrl: './login.css'
})
export class Login {
  readonly _loginService = inject(LoginService);
  private readonly fb = inject(FormBuilder);
  private readonly router = inject(Router);
  readonly loaderService = inject(LoaderService);

  form : FormGroup = this.fb.group({
    email: ['', Validators.required],
    password: ['', Validators.required]
  });

  async login() {
    try{
      if(!this.form.valid){
        return;
      }

      this.loaderService.setLoader(true);
      await this._loginService.login(this.form.value.email, this.form.value.password);
      this.loaderService.setLoader(false);
      this.router.navigate(['/dashboard']);

    }catch(e){
      console.log(e);
    }
  }
}
