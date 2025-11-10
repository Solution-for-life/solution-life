import { Component, inject, signal, ElementRef, ViewChild, AfterViewInit, OnDestroy } from '@angular/core';
import { Header } from '../../../components/header/header';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faCheckCircle, faCogs, faCubes, faHandshake, faStar, faUniversity, faUser } from '@fortawesome/free-solid-svg-icons';
import { HomeContact } from "../home-contact/home-contact";
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { Footer } from '../../../components/footer/footer';
import { RouterLink } from '@angular/router';

import { initFlowbite } from 'flowbite';
import { WhatsappButton } from '../whatsapp-button/whatsapp-button';
import { DatabaseService } from '@dbService/database.service';
import { Image } from '@interfaces/image';
import { LanguageService } from '../../../services/language.service';

@Component({
  selector: 'app-home',
  imports: [
    Header,
    FontAwesomeModule,
    HomeContact,
    CommonModule,
    TranslateModule,
    Footer,
    RouterLink,
    WhatsappButton
  ],
  templateUrl: './home.html',
  styleUrl: './home.css'
})
export default class Home implements AfterViewInit, OnDestroy {
  faUser = faUser;
  faCheckCircle = faCheckCircle;
  faCubes = faCubes;
  faHandshake = faHandshake;
  faStar = faStar;
  faUniversity = faUniversity;
  faCogs = faCogs;

  items: Image[] = [];

  readonly dbService = inject(DatabaseService);
  readonly langService = inject(LanguageService);

  // Para la animación de contadores
  @ViewChild('counterSection') counterSection?: ElementRef;
  @ViewChild('confettiCanvas1') confettiCanvas1?: ElementRef<HTMLCanvasElement>;
  @ViewChild('confettiCanvas2') confettiCanvas2?: ElementRef<HTMLCanvasElement>;

  currentYears = 0;
  currentClients = 0;
  private observer?: IntersectionObserver;
  private isAnimating = false;
  private animationFrames: number[] = [];

  async getImages() {
    const images = await this.dbService.getCollection('carouselImages');
    this.items = Object.values(images ?? {});
    // espera un ciclo para que Angular pinte los items
    setTimeout(() => {
      initFlowbite();
    }, 0);
  }

  ngOnInit() {
    this.getImages();
  }

  ngAfterViewInit() {
    this.setupIntersectionObserver();
  }

  ngOnDestroy() {
    this.observer?.disconnect();
    // Cancelar todas las animaciones pendientes
    this.animationFrames.forEach(frame => cancelAnimationFrame(frame));
  }

  private setupIntersectionObserver() {
    if (!this.counterSection) return;

    this.observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && !this.isAnimating) {
            // Está visible, iniciar animación
            this.isAnimating = true;
            this.animateCounters();
          } else if (!entry.isIntersecting && this.isAnimating) {
            // Salió de la vista, resetear
            this.resetCounters();
          }
        });
      },
      { 
        threshold: 0.5,
        rootMargin: '0px'
      }
    );

    this.observer.observe(this.counterSection.nativeElement);
  }

  private resetCounters() {
    // Cancelar animaciones en curso
    this.animationFrames.forEach(frame => cancelAnimationFrame(frame));
    this.animationFrames = [];
    
    // Resetear valores
    this.currentYears = 0;
    this.currentClients = 0;
    this.isAnimating = false;
    
    // Limpiar canvas
    if (this.confettiCanvas1) {
      const ctx = this.confettiCanvas1.nativeElement.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, this.confettiCanvas1.nativeElement.width, this.confettiCanvas1.nativeElement.height);
      }
    }
    if (this.confettiCanvas2) {
      const ctx = this.confettiCanvas2.nativeElement.getContext('2d');
      if (ctx) {
        ctx.clearRect(0, 0, this.confettiCanvas2.nativeElement.width, this.confettiCanvas2.nativeElement.height);
      }
    }
  }

  private animateCounters() {
    // Animar años (1 a 10)
    this.animateValue(0, 10, 1500, (value) => {
      this.currentYears = value;
      if (value === 10 && this.confettiCanvas1) {
        this.launchConfetti(this.confettiCanvas1.nativeElement, '#09b850');
      }
    });

    // Animar clientes (0.1 a 1.2 en incrementos de 0.1)
    this.animateValue(0, 12, 1500, (value) => {
      this.currentClients = value / 10;
      if (value === 12 && this.confettiCanvas2) {
        this.launchConfetti(this.confettiCanvas2.nativeElement, '#ffffff');
      }
    });
  }

  private animateValue(start: number, end: number, duration: number, callback: (value: number) => void) {
    const startTime = performance.now();
    const difference = end - start;

    const step = (currentTime: number) => {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      // Ease out effect
      const easeProgress = 1 - Math.pow(1 - progress, 3);
      const currentValue = Math.round(start + difference * easeProgress);
      
      callback(currentValue);

      if (progress < 1) {
        const frameId = requestAnimationFrame(step);
        this.animationFrames.push(frameId);
      }
    };

    const frameId = requestAnimationFrame(step);
    this.animationFrames.push(frameId);
  }

  private launchConfetti(canvas: HTMLCanvasElement, color: string) {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const parent = canvas.parentElement;
    if (!parent) return;

    canvas.width = parent.offsetWidth;
    canvas.height = parent.offsetHeight;

    const confettiCount = 50;
    const confetti: Array<{
      x: number;
      y: number;
      vx: number;
      vy: number;
      size: number;
      color: string;
      rotation: number;
      rotationSpeed: number;
    }> = [];

    // Colores del confeti
    const colors = [color, '#FFD700', '#FF6B6B', '#4ECDC4', '#95E1D3'];

    // Crear partículas
    for (let i = 0; i < confettiCount; i++) {
      confetti.push({
        x: canvas.width / 2,
        y: canvas.height / 2,
        vx: (Math.random() - 0.5) * 8,
        vy: (Math.random() - 0.5) * 8 - 3,
        size: Math.random() * 6 + 3,
        color: colors[Math.floor(Math.random() * colors.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 10
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      let allOutside = true;

      confetti.forEach((c) => {
        c.x += c.vx;
        c.y += c.vy;
        c.vy += 0.3; // Gravedad
        c.rotation += c.rotationSpeed;

        // Verificar si aún está visible
        if (c.y < canvas.height + 20) {
          allOutside = false;
        }

        ctx.save();
        ctx.translate(c.x, c.y);
        ctx.rotate((c.rotation * Math.PI) / 180);
        ctx.fillStyle = c.color;
        ctx.fillRect(-c.size / 2, -c.size / 2, c.size, c.size);
        ctx.restore();
      });

      if (!allOutside) {
        const frameId = requestAnimationFrame(animate);
        this.animationFrames.push(frameId);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    const frameId = requestAnimationFrame(animate);
    this.animationFrames.push(frameId);
  }
}