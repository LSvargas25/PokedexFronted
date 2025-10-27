import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { PokemonService, Pokemon } from '../../../../../Services/Pokemons/pokemon-service';

@Component({
  selector: 'app-ascreen-pokemon-search',
  imports: [CommonModule, HttpClientModule],
  standalone: true,
  templateUrl: './ascreen-pokemon-search.html',
  styleUrls: ['./ascreen-pokemon-search.scss']
})
export class AScreenPokemonSearch implements OnInit {
  AScreen = true;
  Targets = true;

  pokemons: Pokemon[] = [];
  loading = false;
  error: string | null = null;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.loading = true;
    this.error = null;
    console.log('Solicitando pokemons...');
    this.pokemonService.getPokemons(4, 0).subscribe({
      next: (data) => {
        console.log('Pokemons recibidos desde servicio:', data);
        this.pokemons = (data || []).slice(0, 4);
        console.log('Cantidad cargada:', this.pokemons.length);
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando pokemons', err);
        this.error = err?.message || 'Error al cargar pokemons';
        this.loading = false;
      }
    });
  }
}
