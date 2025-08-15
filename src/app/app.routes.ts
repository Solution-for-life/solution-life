import { Routes } from '@angular/router';
import { AboutUs } from './pages/components/about-us/about-us';
import Home from './pages/components/home/home';
import { Contact } from './pages/components/contact/contact';
import { Login } from './pages/components/login/login';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'about-us', component: AboutUs},
  { path: 'contact', component: Contact},
  { path : 'login', component: Login},
  { path: '**', redirectTo: '' }
];
