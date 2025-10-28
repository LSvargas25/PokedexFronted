import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { PokemonSelected } from '../../../../../Services/Options/SearchPokemon/PokemonSelected/pokemon-selected';


@Component({
  selector: 'app-bscreen-pokemon-search',
  imports: [CommonModule],
  standalone: true,
  templateUrl: './bscreen-pokemon-search.html',
  styleUrls: ['./bscreen-pokemon-search.scss']
})
export class BScreenPokemonSearch {
  Ison = true;

  get selectedPokemon$() { return this.pokemonSelected.selectedPokemon$; }

  constructor(private pokemonSelected: PokemonSelected) {}
}
