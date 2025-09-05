import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { LoginService } from '../services/login.service';

export const authGuard: CanActivateFn = async (route, state) => {
  const loginService = inject(LoginService);
  const router = inject(Router);
  const token = await loginService.getToken();

  if (!token) {
    router.navigate(['/login']);
    return false;
  }
  return true;
};
