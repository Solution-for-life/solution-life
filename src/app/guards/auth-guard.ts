import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const router = inject(Router);
  const loginService = inject(LoginService);
  try{
    const token = await loginService.getToken();
    if (!token) {
      router.navigate(['/login']);
      return false;
    }
    await loginService.validateToken(token);
    return true;
  }
  catch(e){
    console.log(e);
    router.navigate(['/login']);
    return false;
  }
};
