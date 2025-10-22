
  import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap';
import { ScreenService } from '../../../Services/On-OFF Service/screen-service';

@Component({
  selector: 'app-ascreen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ascreen.html',
  styleUrls: ['./ascreen.scss']
})
export class AScreen implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('blackSplit') blackSplit!: ElementRef<HTMLDivElement>;

  isOn = false;
  showMenu = false;
  currentComponent: string | null = null;
  currentVideo = 'assets/videos/intro.mp4';
  options = ['Poked', 'Pokémon Search', 'Trainer Info', 'Settings'];
  showBack = false;

  volume = 0.3;
  isMuted = false;
  volumeIcon = '🔉';

  constructor(private screenService: ScreenService) {
    this.screenService.screenState$.subscribe(state => {
      if (state && !this.isOn) this.startScreen();
      else if (!state && this.isOn) this.stopScreen();
      this.isOn = state;
    });

    this.screenService.reset$.subscribe(() => this.resetScreenState());
  }

  ngAfterViewInit() {
    if (this.videoPlayer) this.videoPlayer.nativeElement.volume = this.volume;
    this.updateVolumeIcon();
  }

  /** 🔵 Animación de encendido (abrir cortina) */
  private startScreen() {
    this.showMenu = false;
    this.currentVideo = 'assets/videos/intro.mp4';
    const splitEl = this.blackSplit.nativeElement;
    const top = splitEl.querySelector('.black-top') as HTMLElement;
    const bottom = splitEl.querySelector('.black-bottom') as HTMLElement;

    // Empieza cerrada (mitades cubriendo el centro)
    gsap.set(top, { y: '0%' });
    gsap.set(bottom, { y: '0%' });
    splitEl.style.display = 'flex';

    // Se abren suavemente hacia arriba y abajo
    gsap.to(top, { y: '-100%', duration: 1, ease: 'power2.inOut' });
    gsap.to(bottom, {
      y: '100%',
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        splitEl.style.display = 'none';
        this.playVideo();
      }
    });
  }

  /** 🔴 Animación de apagado (cerrar cortina) */
  private stopScreen() {
    const splitEl = this.blackSplit.nativeElement;
    const top = splitEl.querySelector('.black-top') as HTMLElement;
    const bottom = splitEl.querySelector('.black-bottom') as HTMLElement;

    // Aseguramos que sea visible
    splitEl.style.display = 'flex';

    // Empieza fuera del área
    gsap.set(top, { y: '-100%' });
    gsap.set(bottom, { y: '100%' });

    // Se cierran hacia el centro
    gsap.to(top, { y: '0%', duration: 1, ease: 'power2.inOut' });
    gsap.to(bottom, {
      y: '0%',
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => {
        this.finishPowerOff();
      }
    });
  }

  /** ⚫ Acción final tras apagarse */
  private finishPowerOff() {
    const video = this.videoPlayer?.nativeElement;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    console.log('💤 Pantalla apagada');
  }

  private playVideo() {
    const video = this.videoPlayer?.nativeElement;
    if (!video) return;
    video.currentTime = 0;
    video.volume = this.volume;
    video.muted = this.isMuted;
    video.play();
  }

  private resetScreenState() {
    this.showMenu = false;
    this.showBack = false;
    this.currentComponent = null;
    this.currentVideo = 'assets/videos/intro.mp4';
    const splitEl = this.blackSplit.nativeElement;
    splitEl.style.display = 'flex';
    const top = splitEl.querySelector('.black-top') as HTMLElement;
    const bottom = splitEl.querySelector('.black-bottom') as HTMLElement;
    gsap.set([top, bottom], { y: '0%' });

    const video = this.videoPlayer?.nativeElement;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }

    console.log('🔄 Pokedex reiniciada completamente');
  }
  onVideoEnded() {
    if (!this.showMenu) {
      this.showMenu = true;
      this.currentVideo = 'assets/videos/pikachu.mp4';
      setTimeout(() => this.playVideo(), 0);
    }
  }

  onOptionClick(option: string) {
    this.showMenu = false;
    this.showBack = true;
    const video = this.videoPlayer?.nativeElement;
    if (video) {
      video.pause();
      video.currentTime = 0;
    }
    this.currentVideo = '';

    switch (option) {
      case 'Poked':
        this.currentComponent = 'Poked';
           this.currentComponent =  'Poked' ;
        break;
      case 'Pokémon Search':
        this.currentComponent = 'Pokémon Search';
        break;
      case 'Trainer Info':
        this.currentComponent = 'Trainer Info';
        break;
      case 'Settings':
        this.currentComponent = 'Settings';
        break;
    }
  }

  goBack() {
    this.currentComponent = null;
    this.showBack = false;
    this.showMenu = true;
    this.currentVideo = 'assets/videos/pikachu.mp4';
    setTimeout(() => this.playVideo(), 0);
  }

  toggleMute() {
    const video = this.videoPlayer.nativeElement;
    if (this.isMuted || this.volume === 0) {
      this.isMuted = false;
      this.volume = 0.3;
      video.muted = false;
      video.volume = this.volume;
    } else {
      this.isMuted = true;
      this.volume = 0;
      video.muted = true;
    }
    this.updateVolumeIcon(true);
  }

  changeVolume() {
    const video = this.videoPlayer.nativeElement;
    video.volume = this.volume;
    this.isMuted = this.volume === 0;
    video.muted = this.isMuted;
    this.updateVolumeIcon(true);
  }

  private updateVolumeIcon(animated = false) {
    if (this.isMuted || this.volume === 0) this.volumeIcon = '🔇';
    else if (this.volume < 0.3) this.volumeIcon = '🔈';
    else if (this.volume < 0.7) this.volumeIcon = '🔉';
    else this.volumeIcon = '🔊';

    if (animated) {
      const icon = document.querySelector('.volume-icon');
      if (icon) {
        icon.classList.add('bounce');
        setTimeout(() => icon.classList.remove('bounce'), 300);
      }
    }
  }
}
