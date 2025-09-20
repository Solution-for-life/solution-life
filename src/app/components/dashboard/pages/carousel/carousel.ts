import { Component } from '@angular/core';
import { ComponentCardComponent } from '../../../common/component-card/component-card.component';
import { BasicTableThreeComponent } from '../../../tables/basic-tables/basic-table-three/basic-table-three.component';

@Component({
  selector: 'app-carousel',
  imports: [
    ComponentCardComponent,
    BasicTableThreeComponent
  ],
  templateUrl: './carousel.html',
  styles: ``
})
export class Carousel {

}
