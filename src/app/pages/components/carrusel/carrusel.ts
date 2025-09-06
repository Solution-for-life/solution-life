import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

@Component({
  imports: [CommonModule, TranslateModule],
  selector: 'app-carrusel',
  standalone: true,
  templateUrl: './carrusel.html',
})
export class CarruselComponent implements OnInit, OnDestroy {
  @ViewChild('carousel') carousel!: ElementRef;

  items = [
    { title: 'Recomendaciones de nuestros clientes los mejores servicios', name: 'Jeiner Aldana', img: '/assets/images/img-equipo_1.jpg' },
    { title: 'Recomendaciones de nuestros clientes opteniendo los mejores servicios', name: 'Laura Pérez', img: '/assets/images/img-equipo_1.jpg' },
    { title: 'Recomendaciones de nuestros clientes opteniendo los mejores servicios', name: 'Carlos Gómez', img: '/assets/images/img-equipo_1.jpg' },
    { title: 'Recomendaciones de nuestros clientes opteniendo los mejores servicios', name: 'Ana Martínez', img: '/assets/images/img-equipo_1.jpg' },
    { title: 'Recomendaciones de nuestros clientes opteniendo los mejores servicios', name: 'David Rodríguez', img: '/assets/images/img-equipo_1.jpg' },
  ];

  displayItems = [...this.items, ...this.items]; // duplicamos para el loop
  private animationFrameId: number | null = null;
  private position = 0;

  ngOnInit() {
    this.startLoop();
  }

  ngOnDestroy() {
    if (this.animationFrameId) cancelAnimationFrame(this.animationFrameId);
  }

  private startLoop() {
    const speed = 0.9; // píxeles por frame (~30px por segundo)
    const step = () => {
      this.position -= speed;

      const carouselEl = this.carousel.nativeElement;
      const itemWidth = carouselEl.firstElementChild.offsetWidth + 16; // ancho + gap
      const totalWidth = itemWidth * this.items.length;

      if (Math.abs(this.position) >= totalWidth) {
        this.position = 0; // reinicia sin que se note
      }

      carouselEl.style.transform = `translateX(${this.position}px)`;
      this.animationFrameId = requestAnimationFrame(step);
    };

    this.animationFrameId = requestAnimationFrame(step);
  }
}
