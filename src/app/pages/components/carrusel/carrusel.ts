import { CommonModule } from '@angular/common';
import { Component, ViewChild, ElementRef, OnInit, OnDestroy } from '@angular/core';
import { TranslateModule } from '@ngx-translate/core';

interface CarouselItem {
  title: string;
  name: string;
  img: string;
  showMore?: boolean;
}

@Component({
  imports: [CommonModule, TranslateModule],
  selector: 'app-carrusel',
  standalone: true,
  templateUrl: './carrusel.html',
})
export class CarruselComponent implements OnInit, OnDestroy {
  @ViewChild('carousel') carousel!: ElementRef;

  items: CarouselItem[] = [
    {
      title: 'En nuestras dos locaciones SFL nos han ayudado con la contabilidad y con los taxes de una manera excepcional, ellos son sumamente profesionales y sobre todo HONESTOS. Recomiendo ampliamente sus servicios y agradezco su interés en cada uno de los trámites que han gestionado para nosotros.',
      name: 'Manuel Viggiano CEO Villano”s Tacos',
      img: '/assets/images/Reseña_1.jpg',
      showMore: false
    },
    {
      title: 'Gracias a Solutions for Life, mi proceso de inmigración fue mucho más sencillo de lo que esperaba. Su equipo me guió en cada paso, desde la documentación inicial hasta la obtención de mi residencia. Su experiencia y profesionalismo fueron invaluables.',
      name: 'Carlos Medina',
      img: '',
      showMore: false
    },
    {
      title: 'Ha sido un verdadero placer trabajar con Juneth Romero y su equipo de Solutions for Life . Gracias a su apoyo, pudimos llevar adelante nuestro sueño de abrir un restaurante. Su asesoría, compromiso y profesionalismo hicieron de este proceso una experiencia clara y exitosa. Estamos muy agradecidos y confiamos en seguir contando con ellos para futuros proyectos. ¡Gracias por ayudarnos a construir un gran futuro!.',
      name: 'Ana Martínez',
      img: '',
      showMore: false
    },
    {
      title: 'Llevo años con Juneth, y ella ha sido mi motor de vida. Amo su trabajo, siempre me ha guiado por el camino correcto para comprar casa y da lo mejor de sí en todo lo que hace. Gracias a ella he comprado dos casas, ¡y ya vamos por la tercera!, También quiero agradecerle por el excelente seguro médico que me brindó —sin duda, el mejor seguro de salud que he tenido. Gracias, Juneth, por tu esfuerzo, tu dedicación y por prepararme para cumplir mis metas. Te recomiendo al mundo entero porque eres la mejor en lo que haces. ¡Que Dios te bendiga siempre!',
      name: 'Minerva Perez',
      img: '',
      showMore: false
    },
    {
      title: 'Mi experiencia con los servicios de bienes raíces fue excepcional. Me ayudaron a encontrar la casa perfecta y manejaron todo el papeleo del seguro y la hipoteca. Su conocimiento integral del proceso hizo que todo fuera más fácil.',
      name: 'Laura Chen',
      img: '',
      showMore: false
    },
  ];

  displayItems: CarouselItem[] = [];
  private animationFrameId: number | null = null;
  private position = 0;
  private isPaused = false;

  ngOnInit() {
    // Inicializamos displayItems con showMore
    this.displayItems = [...this.items, ...this.items].map(item => ({
      ...item,
      showMore: false
    }));
    this.startLoop();
  }

  ngOnDestroy() {
    this.stopLoop();
  }

  toggleShowMore(item: CarouselItem): void {
    item.showMore = !item.showMore;
  }

  onMouseEnter(item: CarouselItem): void {
    this.isPaused = true;
    this.stopLoop();
  }

  onMouseLeave(item: CarouselItem): void {
    this.isPaused = false;
    // Cerrar el "leer más" cuando el mouse sale
    if (item.showMore) {
      item.showMore = false;
    }
    this.startLoop();
  }

  private stopLoop(): void {
    if (this.animationFrameId) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
  }

  private startLoop() {
    if (this.isPaused || this.animationFrameId) return;

    const speed = 0.9;
    const step = () => {
      if (this.isPaused) {
        this.stopLoop();
        return;
      }

      this.position -= speed;

      const carouselEl = this.carousel.nativeElement;
      const itemWidth = carouselEl.firstElementChild.offsetWidth + 16;
      const totalWidth = itemWidth * this.items.length;

      if (Math.abs(this.position) >= totalWidth) {
        this.position = 0;
      }

      carouselEl.style.transform = `translateX(${this.position}px)`;
      this.animationFrameId = requestAnimationFrame(step);
    };

    this.animationFrameId = requestAnimationFrame(step);
  }
}
