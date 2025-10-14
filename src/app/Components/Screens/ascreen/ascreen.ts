import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-ascreen',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './ascreen.html',
  styleUrl: './ascreen.scss'
})
export class AScreen {
 isOn = false;
  showWelcome = false;
  options = ['Poked', 'Pokémon Search', 'Trainer Info', 'Settings'];

  powerOn() {
    this.isOn = true;
    this.showWelcome = true;
    setTimeout(() => {
      this.showWelcome = false;
    }, 3000);
  }

  powerOff() {
    this.isOn = false;
    this.showWelcome = false;
  }
}
