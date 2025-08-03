import { Routes } from '@angular/router';
import { Home } from './pages/components/home/home';
import { AboutUs } from './pages/components/about-us/about-us';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'about-us', component: AboutUs},


];
