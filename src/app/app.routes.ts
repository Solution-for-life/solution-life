import { Routes } from '@angular/router';
import { AboutUs } from './pages/components/about-us/about-us';
import Home from './pages/components/home/home';
import { Contact } from './pages/components/contact/contact';
import { Login } from './pages/components/login/login';
import { Services } from './pages/components/services/services';
import { Service } from './pages/components/service/service';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'about-us', component: AboutUs},
  { path: 'contact', component: Contact},
  { path : 'login', component: Login},
  { path: 'services', component: Services},
  { path: 'services/:id', component: Service},
  { path: '**', redirectTo: '' }
];
