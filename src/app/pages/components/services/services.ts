import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Header } from '../../../components/header/header';
import { DatabaseService } from '@dbService/database.service';
import { Service } from '@interfaces/service';
import { LanguageService } from '../../../services/language.service';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { RouterLink } from '@angular/router';
import { Footer } from '../../../components/footer/footer';

@Component({
  selector: 'app-services',
  imports: [
    CommonModule,
    Header,
    TranslateModule,
    RouterLink,
    Footer,
  ],
  templateUrl: './services.html',
  styleUrl: './services.css'
})
export class Services {

  private readonly db = inject(DatabaseService);
  public services : Service[] = [];
  public readonly langService = inject(LanguageService);
  private readonly translate = inject(TranslateService);

  async getServices() {
    const result = await this.db.getCollection('services');
    this.services = Object.entries(result as Record<string, Service>).map(([key, value]) => ({
      id: key,
      ...value
    }));
    console.log(this.services);
  }

  ngOnInit() {
    this.getServices();
  }
}
