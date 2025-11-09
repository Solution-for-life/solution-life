import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { Header } from '../../../components/header/header';
import { Footer } from '../../../components/footer/footer';
import { TranslateService, TranslateModule } from '@ngx-translate/core';
import { WhatsappButton } from "../whatsapp-button/whatsapp-button";

@Component({
  selector: 'app-privacy-and-policy',
  imports: [
    CommonModule,
    Header,
    Footer,
    TranslateModule,
    WhatsappButton
],
  templateUrl: './privacy-and-policy.html',
  styles: ``
})
export class PrivacyAndPolicy {
    // private readonly translate = inject(TranslateService);
}
