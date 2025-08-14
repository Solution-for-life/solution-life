import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';

@Component({
  imports: [CommonModule],
  selector: 'app-carrusel',
  templateUrl: './carrusel.html',
})
export class CarruselComponent implements OnInit, OnDestroy {
  @ViewChild('carousel') carousel!: ElementRef;

  items = [
    { title: 'Recomendaciones de nuestros clientes', name: 'Jeiner Aldana' },
    { title: 'Recomendaciones de nuestros clientes', name: 'Laura Pérez' },
    { title: 'Recomendaciones de nuestros clientes', name: 'Carlos Gómez' },
    { title: 'Recomendaciones de nuestros clientes', name: 'Ana Martínez' },
    { title: 'Recomendaciones de nuestros clientes', name: 'David Rodríguez' },
  ];

  private intervalId: any;

  ngOnInit() {
    this.intervalId = setInterval(() => {
      this.scrollRight();
    }, 2000); // cada 5 segundos
  }

  ngOnDestroy() {
    if (this.intervalId) clearInterval(this.intervalId);
  }

  private scrollRight() {
    const carouselEl = this.carousel.nativeElement;
    const maxScroll = carouselEl.scrollWidth - carouselEl.clientWidth;

    if (carouselEl.scrollLeft >= maxScroll) {
      carouselEl.scrollTo({ left: 0, behavior: 'smooth' });
    } else {
      carouselEl.scrollBy({ left: 300, behavior: 'smooth' });
    }
  }
}
