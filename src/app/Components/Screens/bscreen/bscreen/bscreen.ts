import { Component, ElementRef, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ScreenService } from '../../../../Services/On-OFF Service/screen-service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-bscreen',
  templateUrl: './bscreen.html',
  styleUrls: ['./bscreen.scss'],
  imports: [  ]
})
export class Bscreen implements AfterViewInit {
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('pokeSplit', { static: false }) pokeSplit!: ElementRef<HTMLDivElement>;

  isOn = false;
  currentVideo = 'assets/videos/pokevid.mp4';
  currentBComponent: string | null = null;

  constructor(
    private screenService: ScreenService,
    private cd: ChangeDetectorRef
  ) {
    // Suscribirse al estado de la pantalla
    this.screenService.screenState$.subscribe(state => {
      this.isOn = state;
      this.cd.detectChanges();

      if (this.isOn) this.startScreen();
      else this.offScreen();
    });
        this.screenService.reset$.subscribe(() => {
    this.resetScreenState();
  });

  }

  ngAfterViewInit() {}

  /** Pantalla encendida */
  startScreen() {
    this.currentVideo = 'assets/videos/pokevid.mp4';
    if (this.pokeSplit) this.pokeSplit.nativeElement.style.display = 'flex';
    setTimeout(() => this.animatePoke(), 50);
  }
private resetScreenState() {
  this.currentBComponent = null;
  this.currentVideo = 'assets/videos/pokevid.mp4';

  if (this.pokeSplit) {
    const pokeSplitEl = this.pokeSplit.nativeElement;
    pokeSplitEl.style.display = 'flex';
    const top = pokeSplitEl.querySelector('.poke-top') as HTMLElement;
    const bottom = pokeSplitEl.querySelector('.poke-bottom') as HTMLElement;
    gsap.set([top, bottom], { y: '0%' });
  }

  const video = this.videoPlayer?.nativeElement;
  if (video) {
    video.pause();
    video.currentTime = 0;
  }

  console.log('🔄 Bscreen reiniciada completamente');
}

  /** Pantalla apagada */
  offScreen() {
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;
      video.pause();
      video.currentTime = 0;
    }

    if (this.pokeSplit) {
      const pokeSplitEl = this.pokeSplit.nativeElement;
      pokeSplitEl.style.display = 'flex';
      const top = pokeSplitEl.querySelector('.poke-top') as HTMLElement;
      const bottom = pokeSplitEl.querySelector('.poke-bottom') as HTMLElement;
      gsap.set(top, { y: '0%' });
      gsap.set(bottom, { y: '0%' });
    }
  }

  /** Animación de apertura */
  private animatePoke() {
    if (!this.pokeSplit) return;
    const pokeSplitEl = this.pokeSplit.nativeElement;
    const top = pokeSplitEl.querySelector('.poke-top') as HTMLElement;
    const bottom = pokeSplitEl.querySelector('.poke-bottom') as HTMLElement;

    gsap.to(top, { y: '-100%', duration: 1, ease: 'power2.inOut' });
    gsap.to(bottom, {
      y: '100%',
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        pokeSplitEl.style.display = 'none';
        this.playVideo();
      }
    });
  }

  /** Reproducir video con efecto ida y vuelta */
  private playVideo() {
    if (!this.videoPlayer) return;
    const video = this.videoPlayer.nativeElement;

    video.currentTime = 0;
    video.muted = true;
    video.play().catch(err => console.log('Error reproduciendo video:', err));

    let forward = true;
    const speed = 1;

    // Eliminamos escuchas previas
    video.removeEventListener('timeupdate', (video as any)._reverseHandler);

    const handler = () => {
      if (forward) {
        if (video.currentTime >= video.duration - 0.1) forward = false;
      } else {
        video.currentTime -= 0.05 * speed;
        if (video.currentTime <= 0.1) forward = true;
      }
    };

    (video as any)._reverseHandler = handler;
    video.addEventListener('timeupdate', handler);
  }
}
