import { Component, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ScreenService } from '../../../Services/screen-service';

@Component({
  selector: 'app-ascreen',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './ascreen.html',
  styleUrls: ['./ascreen.scss']
})
export class AScreen implements AfterViewInit {
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  isOn = false;
  showMenu = false;

  currentVideo = 'assets/videos/intro.mp4';
  options = ['Poked', 'Pokémon Search', 'Trainer Info', 'Settings'];

  // 🎚️ Control de volumen
  volume: number = 0.3;
  isMuted: boolean = false;
  volumeIcon: string = '🔉'; // icono inicial

  constructor(private screenService: ScreenService) {
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
    console.log('Seleccionaste:', option);
  }
toggleMute() {
  // Si está muteado o el volumen es 0, sube a 0.3 y desactiva el mute
  if (this.isMuted || this.volume === 0) {
    this.isMuted = false;
    this.volume = 0.3;
    this.videoPlayer.nativeElement.muted = false;
    this.videoPlayer.nativeElement.volume = this.volume;
  }
  // Si tiene volumen (por ejemplo 0.3 o más), mutea
  else {
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

  //  Actualiza el ícono según el volumen
 onVolumeIconClick() {
  // Si está muteado o volumen en 0, sube a 0.3
  if (this.isMuted || this.volume === 0) {
    this.isMuted = false;
    this.volume = 0.3;
  }
  // Si el volumen está en 0.3 o menos, mutea
  else if (this.volume <= 0.3) {
    this.isMuted = true;
    this.volume = 0;
  }

  // Actualiza el ícono con animación
  this.updateVolumeIcon(true);
}

private updateVolumeIcon(animated: boolean = false) {
  if (this.isMuted || this.volume === 0) {
    this.volumeIcon = '🔇';
  } else if (this.volume < 0.3) {
    this.volumeIcon = '🔈';
  } else if (this.volume < 0.7) {
    this.volumeIcon = '🔉';
  } else {
    this.volumeIcon = '🔊';
  }

  if (animated) {
    const icon = document.querySelector('.volume-icon');
    if (icon) {
      icon.classList.add('bounce');
      setTimeout(() => icon.classList.remove('bounce'), 300);
    }
  }
}
}
