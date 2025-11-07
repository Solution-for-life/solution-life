import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Header } from '../../../components/header/header';
import { DatabaseService } from '@dbService/database.service';
import { Footer } from '../../../components/footer/footer';
import { ActivatedRoute, RouterLink } from '@angular/router';
import { Subscription } from 'rxjs';
import { Service as ServiceInterface } from '@interfaces/service';
import { LanguageService } from '../../../services/language.service';
import { WhatsappButton } from "../whatsapp-button/whatsapp-button";
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { Lang } from '../../../types/lang';
@Component({
  selector: 'app-service',
  imports: [
    CommonModule,
    Header,
    Footer,
    RouterLink,
    WhatsappButton,TranslateModule
],
  templateUrl: './service.html',
  styleUrl: './service.css'
})
export class Service {

  constructor(private route: ActivatedRoute) {}
   private readonly translate = inject(TranslateService);
  private readonly db = inject(DatabaseService);
  readonly langService = inject(LanguageService);
  urlSuscription : Subscription | null = null;
  url: string | null = null;
  service: ServiceInterface | null = null;
  serviceImage: string = '';

  switchLang(lang: Lang) {
      this.langService.setLang(lang);
      this.translate.use(lang);
  }

  // Mapeo de URLs a imágenes
  private serviceImages: { [key: string]: string } = {
    'insurance': '/assets/images/Hero-Seguros-de-salud.webp',
    'taxes': '/assets/images/taxes_2.png',
    'real-estate': '/assets/images/bienes_r.webp',
    'immigration': '/assets/images/inmigraciones.jpg',
    // Añade más mapeos según tus servicios
  };

  
  async getService() : Promise<ServiceInterface | null> {
    return await this.db.getItemByUrl('services', this.url!);
  }

  private updateServiceImage(url: string) {
    this.serviceImage = this.serviceImages[url] || '';
  }

  async getInfoURL() {
    this.urlSuscription = this.route.params.subscribe({
      next : async(res) => {
        this.url = res['id'];
        const response = await this.db.getItemByUrl('services', this.url!);
        this.service = response ? Object.values(response)[0] as ServiceInterface : null;

        // Actualizar la imagen según la URL
        this.updateServiceImage(this.url!);

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
