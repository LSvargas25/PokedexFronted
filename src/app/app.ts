import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Pokedex } from "./Components/Pokedex/pokedex/pokedex";
import { Ligths } from "./Components/ligths/ligths/ligths";
import { AScreen } from "./Components/Screens/ascreen/ascreen";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Pokedex, Ligths, AScreen],
  templateUrl: './app.html',
  styleUrl: './app.scss'
})
export class App {
  protected readonly title = signal('Pokefron');
}
