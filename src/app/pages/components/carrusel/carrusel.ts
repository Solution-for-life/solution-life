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
      title: 'Excelente servicio en la gestión de mi seguro de vida. El equipo me ayudó a encontrar la mejor cobertura para mi familia y me explicaron todos los detalles de manera clara y profesional. El proceso fue rápido y sin complicaciones.',
      name: 'María Rodriguez',
      img: '',
      showMore: false
    },
    {
      title: 'Gracias a Solutions for Life, mi proceso de inmigración fue mucho más sencillo de lo que esperaba. Su equipo me guió en cada paso, desde la documentación inicial hasta la obtención de mi residencia. Su experiencia y profesionalismo fueron invaluables.',
      name: 'Carlos Medina',
      img: '',
      showMore: false
    },
    {
      title: 'Como agente inmobiliario, he trabajado con muchas empresas, pero el servicio de Solutions for Life en la gestión de propiedades y seguros es excepcional. Su atención al detalle y conocimiento del mercado ayudó a mis clientes a tomar las mejores decisiones.',
      name: 'Ana Martínez',
      img: '',
      showMore: false
    },
    {
      title: 'El proceso de obtener un seguro médico parecía abrumador, pero el equipo me ayudó a encontrar el plan perfecto que se ajustaba a mis necesidades y presupuesto. Su seguimiento y atención al cliente son sobresalientes.',
      name: 'David Thompson',
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
