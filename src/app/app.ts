import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pokedex } from "./Components/Pokedex/pokedex/pokedex";
import { Ligths } from "./Components/ligths/ligths/ligths";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Pokedex, Ligths],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Pokefron');
}
