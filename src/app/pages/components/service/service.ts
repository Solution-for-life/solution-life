import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Header } from '../../../components/header/header';
import { DatabaseService } from '@dbService/database.service';
import { Footer } from '../../../components/footer/footer';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Service as ServiceInterface } from '@interfaces/service';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-service',
  imports: [
    CommonModule,
    Header,
    Footer,
    RouterLink,
  ],
  templateUrl: './service.html',
  styleUrl: './service.css'
})
export class Service {

  constructor(private route: ActivatedRoute) {}
  private readonly db = inject(DatabaseService);
  readonly langService = inject(LanguageService);
  urlSuscription : Subscription | null = null;
  url: string | null = null;
  service: ServiceInterface | null = null;

  async getService() : Promise<ServiceInterface | null> {
    return await this.db.getItemByUrl('services', this.url!);
  }

  async getInfoURL() {
    this.urlSuscription = this.route.params.subscribe({
      next : async(res) => {
        this.url = res['id'];
        const response = await this.db.getItemByUrl('services', this.url!);
        this.service = response ? Object.values(response)[0] as ServiceInterface : null;

        if(this.service?.subServices){
              this.service.subServices = this.service.subServices.filter(s => s !== null);
        }

      },
      error : (err) => {
        console.log(err);
      }
    });
  }

  ngOnInit() {
    this.getInfoURL();
  }

  ngOnDestroy() {
    this.urlSuscription?.unsubscribe();
  }
}
