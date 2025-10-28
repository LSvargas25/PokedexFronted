import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { Pokemon } from '../../../Pokemons/PokemonService/pokemon-service';

@Injectable({
  providedIn: 'root'
})
export class PokemonSelected {
  private _selectedPokemon = new BehaviorSubject<Pokemon | null>(null);
  selectedPokemon$ = this._selectedPokemon.asObservable();

  setSelected(pokemon: Pokemon | null): void {
    this._selectedPokemon.next(pokemon);
  }

  getSelected(): Pokemon | null {
    return this._selectedPokemon.value;
  }

  // Nuevo método para resetear
  reset(): void {
    this._selectedPokemon.next(null);
  }
}
