import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap';
import { ScreenService } from '../../../Services/screen-service';
import { PokefronService } from '../../../Services/Options/Poked/pokefron-service';
import { Poked } from "../../Options/Poked/poked/poked";
import { PokemonSearch } from "../../Options/PokemonSearch/pokemon-search/pokemon-search";
import { TrainerInfo } from "../../Options/TrainerInfo/trainer-info/trainer-info";
import { Settings } from "../../Options/Settings/settings/settings";

@Component({
  selector: 'app-ascreen',
  standalone: true,
  imports: [CommonModule, FormsModule, Poked, PokemonSearch, TrainerInfo, Settings],
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

  constructor(
   private screenService: ScreenService,
  private pokefronService: PokefronService
  ) {
    this.screenService.screenState$.subscribe(state => {
      this.isOn = state;
      if (this.isOn) this.startScreen();
      else this.stopScreen();
    });

 this.screenService.reset$.subscribe(() => {
    this.resetScreenState();
  });

  }



  ngAfterViewInit() {
    this.playVideo();
    if (this.videoPlayer) this.videoPlayer.nativeElement.volume = this.volume;
    this.updateVolumeIcon();
  }

  ngOnInit() {
    this.pokefronService.screenA$.subscribe(component => {
      this.currentComponent = component;
      this.showBack = !!component;
      this.showMenu = !component;
    });
  }

  /** Pantalla encendida: arranca la animación */
  startScreen() {
    this.showMenu = false;
    this.currentVideo = 'assets/videos/intro.mp4';

    if (this.blackSplit) {
      const splitEl = this.blackSplit.nativeElement;
      const top = splitEl.querySelector('.black-top') as HTMLElement;
      const bottom = splitEl.querySelector('.black-bottom') as HTMLElement;

      gsap.set([top, bottom], { y: '0%' });
      splitEl.style.display = 'flex';

      // animación de apertura
      gsap.to(top, { y: '-100%', duration: 1.2, ease: 'power2.inOut' });
      gsap.to(bottom, {
        y: '100%',
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: () => {
          splitEl.style.display = 'none';
          this.playVideo();
        }
      });
    } else {
      this.playVideo();
    }
  }

  stopScreen() {
    this.showMenu = false;
    if (this.blackSplit) {
      const splitEl = this.blackSplit.nativeElement;
      splitEl.style.display = 'flex';
      const top = splitEl.querySelector('.black-top') as HTMLElement;
      const bottom = splitEl.querySelector('.black-bottom') as HTMLElement;
      gsap.set(top, { y: '0%' });
      gsap.set(bottom, { y: '0%' });
    }
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

  // Resetea animación visual si existe
  if (this.blackSplit) {
    const splitEl = this.blackSplit.nativeElement;
    splitEl.style.display = 'flex';
    const top = splitEl.querySelector('.black-top') as HTMLElement;
    const bottom = splitEl.querySelector('.black-bottom') as HTMLElement;
    gsap.set([top, bottom], { y: '0%' });
  }

  // Detenemos cualquier video en reproducción
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
        this.pokefronService.setScreenComponents('Poked', 'pokedSecondWindow');
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
