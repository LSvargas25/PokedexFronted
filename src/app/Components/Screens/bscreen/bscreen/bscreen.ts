import { Component, ElementRef, AfterViewInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { ScreenService } from '../../../../Services/screen-service';
import { gsap } from 'gsap';

@Component({
  selector: 'app-bscreen',
  templateUrl: './bscreen.html',
  styleUrls: ['./bscreen.scss']
})
export class Bscreen implements AfterViewInit {
  @ViewChild('videoPlayer', { static: false }) videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('pokeSplit', { static: false }) pokeSplit!: ElementRef<HTMLDivElement>;

  isOn = false;
  currentVideo = 'assets/videos/pokevid.mp4';

  constructor(private screenService: ScreenService, private cd: ChangeDetectorRef) {
    this.screenService.screenState$.subscribe(state => {
      this.isOn = state;
      if (this.isOn) {
        // Forzamos renderizado antes de animar
        this.cd.detectChanges();
        this.startScreen();
      }
    });
  }

  ngAfterViewInit() { }

  startScreen() {
    // Reiniciamos video por si acaso
    this.currentVideo = 'assets/videos/pokevid.mp4';
    setTimeout(() => this.animatePoke(), 50); // Esperamos a que Angular renderice la vista
  }

  private animatePoke() {
    if (!this.pokeSplit) return;

    const top = this.pokeSplit.nativeElement.querySelector('.poke-top') as HTMLElement;
    const bottom = this.pokeSplit.nativeElement.querySelector('.poke-bottom') as HTMLElement;

    gsap.to(top, { y: '-100%', duration: 1, ease: 'power2.inOut' });
    gsap.to(bottom, { y: '100%', duration: 1, ease: 'power2.inOut', onComplete: () => {
      // Ocultamos la imagen después de la animación
      this.pokeSplit.nativeElement.style.display = 'none';
      this.playVideo();
    }});
  }

  private playVideo() {
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;
      video.currentTime = 0;
      video.muted = true; // necesario para autoplay
      video.loop = true;
      video.play().catch(err => console.log('Error reproduciendo video:', err));
    }
  }
}
