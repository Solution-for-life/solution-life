import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Header } from '../../../components/header/header';
import { DatabaseService } from '@dbService/database.service';

@Component({
  selector: 'app-service',
  imports: [
    CommonModule,
    Header,
  ],
  templateUrl: './service.html',
  styleUrl: './service.css'
})
export class Service {

  private readonly db = inject(DatabaseService);

}
