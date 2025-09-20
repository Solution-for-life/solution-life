import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { SideBar } from './side-bar/side-bar';

@Component({
  selector: 'app-dashboard',
  imports: [
    CommonModule,
    SideBar
  ],
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {

}
