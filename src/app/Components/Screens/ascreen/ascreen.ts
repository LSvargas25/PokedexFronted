import { Component, ViewChild, ElementRef, AfterViewInit, Type } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap';
import { ScreenService } from '../../../Services/On-OFF Service/screen-service';
import { PokedService } from '../../../Services/Screens/poked-screen-state';
import { AscreenPoked } from '../../Options/Poked/AScreen/ascreen-poked/ascreen-poked';
import { BScreenPoked } from '../../Options/Poked/BScreen/bscreen-poked/bscreen-poked';

@Component({
  selector: 'app-ascreen',
  standalone: true,
  imports: [CommonModule, FormsModule, AscreenPoked, BScreenPoked],
  templateUrl: './ascreen.html',
  styleUrls: ['./ascreen.scss']
})
export class AScreen implements AfterViewInit {

  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('blackSplit') blackSplit!: ElementRef<HTMLDivElement>;

  isOn = false;
  showMenu = false;
  currentComponent: Type<any> | null = null; // componente dinámico
  currentVideo = 'assets/videos/intro.mp4';
  options = ['Poked', 'Pokémon Search', 'Trainer Info', 'Settings'];
  showBack = false;

  volume = 0.3;
  isMuted = false;
  volumeIcon = '🔉';

  constructor(
    private screenService: ScreenService,
    private pokedService: PokedService
  ) {
    // Escucha estado de la pantalla (encendido/apagado)
    this.screenService.screenState$.subscribe(state => {
      if (state && !this.isOn) this.startScreen();
      else if (!state && this.isOn) this.stopScreen();
      this.isOn = state;
    });

    this.screenService.reset$.subscribe(() => this.resetScreenState());

    // Escucha contenido de AScreen desde el servicio
    this.pokedService.state$.subscribe(data => {
      if (data.aScreenContent) this.loadAScreenContent(data.aScreenContent);
      else this.clearAScreenContent();
    });
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

    gsap.set(top, { y: '0%' });
    gsap.set(bottom, { y: '0%' });
    splitEl.style.display = 'flex';

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

    splitEl.style.display = 'flex';
    gsap.set(top, { y: '-100%' });
    gsap.set(bottom, { y: '100%' });

    gsap.to(top, { y: '0%', duration: 1, ease: 'power2.inOut' });
    gsap.to(bottom, {
      y: '0%',
      duration: 1,
      ease: 'power2.inOut',
      onComplete: () => this.finishPowerOff()
    });
  }

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

  // 🔹 Cargar componente dinámico según el servicio
  private loadAScreenContent(content: string) {
    switch(content) {
      case 'Poked':
        this.currentComponent = AscreenPoked;
        break;
      // Otros componentes pueden agregarse aquí
      default:
        this.currentComponent = null;
        break;
    }
  }

  private clearAScreenContent() {
    this.currentComponent = null;
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

    switch(option) {
      case 'Poked':
        this.currentComponent = AscreenPoked;
        this.pokedService.setScreens('Poked', 'BScreenPoked'); // sincroniza con B
        break;
      case 'Pokémon Search':
        this.currentComponent = null;
        this.pokedService.setScreens('Pokémon Search', null);
        break;
      case 'Trainer Info':
        this.currentComponent = null;
        this.pokedService.setScreens('Trainer Info', null);
        break;
      case 'Settings':
        this.currentComponent = null;
        this.pokedService.setScreens('Settings', null);
        break;
    }
  }

  goBack() {
    this.pokedService.reset();
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
