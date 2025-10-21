import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
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

  isOn = false;
  showMenu = false;
  currentComponent: string | null = null;
  currentVideo = 'assets/videos/intro.mp4';
  options = ['Poked', 'Pokémon Search', 'Trainer Info', 'Settings'];

  showBack: boolean = false;
  volume: number = 0.3;
  isMuted: boolean = false;
  volumeIcon: string = '🔉';

  constructor(
    private screenService: ScreenService,
    private pokefronService: PokefronService
  ) {
    this.screenService.screenState$.subscribe(state => {
      this.isOn = state;
      if (this.isOn) this.startScreen();
      else this.stopScreen();
    });
  }

  ngAfterViewInit() {
    this.playVideo();
    if (this.videoPlayer) {
      this.videoPlayer.nativeElement.volume = this.volume;
    }
    this.updateVolumeIcon();
  }

  ngOnInit() {
    this.pokefronService.screenA$.subscribe(component => {
      this.currentComponent = component;
      this.showBack = !!component; // muestra Back si hay componente cargado
      this.showMenu = !component;
    });
  }

  startScreen() {
    this.showMenu = false;
    this.currentVideo = 'assets/videos/intro.mp4';
    setTimeout(() => this.playVideo(), 0);
  }

  stopScreen() {
    this.showMenu = false;
  }

  private playVideo() {
    if (this.videoPlayer) {
      const video = this.videoPlayer.nativeElement;
      video.currentTime = 0;
      video.volume = this.volume;
      video.muted = this.isMuted;
      video.play();
    }
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

  // Botón de Back
  goBack() {
    this.currentComponent = null;
    this.showBack = false;
    this.showMenu = true;
    this.currentVideo = 'assets/videos/pikachu.mp4';
    setTimeout(() => this.playVideo(), 0);
  }

  toggleMute() {
    if (this.isMuted || this.volume === 0) {
      this.isMuted = false;
      this.volume = 0.3;
      this.videoPlayer.nativeElement.muted = false;
      this.videoPlayer.nativeElement.volume = this.volume;
    } else {
      this.isMuted = true;
      this.volume = 0;
      this.videoPlayer.nativeElement.muted = true;
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

  private updateVolumeIcon(animated: boolean = false) {
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
