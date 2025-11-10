import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Header } from '../../../components/header/header';
import { RouterLink } from '@angular/router';
import { Footer } from "../../../components/footer/footer";
import { TranslateModule } from '@ngx-translate/core';
import { WhatsappButton } from "../whatsapp-button/whatsapp-button";

interface TeamMember {
  name: string;
  role: string;
  img?: string;
  twitter: string;
  instagram: string;
  facebook: string;
}

@Component({
  selector: 'app-about-us',
  imports: [
    CommonModule,
    TranslateModule,
    Header,
    RouterLink,
    Footer,
    WhatsappButton
],
  templateUrl: './about-us.html',
  styleUrl: './about-us.css'
})
export class AboutUs {
  teamMembers: TeamMember[] = [
    {
      name: 'Juneth Romero',
      role: 'CEO & Fundadora',
      img: '/assets/images/juneth.jpg',
      twitter: 'https://twitter.com/juanperez',
      instagram: 'https://instagram.com/juanperez',
      facebook: 'https://facebook.com/juanperez'
    },
    {
      name: 'Carolina Romero',
      role: 'Asistente Administrativa',
      img: '/assets/images/carolina.jpg',
      twitter: 'https://twitter.com/mariagonzalez',
      instagram: 'https://instagram.com/mariagonzalez',
      facebook: 'https://facebook.com/mariagonzalez'
    },
    {
      name: 'Geraldine Romero',
      role: 'Marketing digital',
      img: '/assets/images/gerald.jpg',
      twitter: 'https://twitter.com/carlosrodriguez',
      instagram: 'https://instagram.com/carlosrodriguez',
      facebook: 'https://facebook.com/carlosrodriguez'
    }
  ];
}
