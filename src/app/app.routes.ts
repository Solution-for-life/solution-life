import { Routes } from '@angular/router';
import { AboutUs } from './pages/components/about-us/about-us';
import Home from './pages/components/home/home';

export const routes: Routes = [
  { path: '', component: Home},
  { path: 'about-us', component: AboutUs},


];
