import { CommonModule } from '@angular/common';
import { Component, OnInit, HostListener } from '@angular/core';
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
  displayedPokemons: Pokemon[] = []; // los 4 visibles
  currentIndex = 0; // índice inicial del primer pokemon visible
  loading = false;
  error: string | null = null;

  private scrollInterval: any;

  constructor(private pokemonService: PokemonService) {}

  ngOnInit(): void {
    this.loadPokemons();
  }

  loadPokemons(): void {
    this.loading = true;
    this.error = null;
    console.log('Solicitando pokemons...');
    // Traemos más pokemons para hacer scroll (ej. 20)
    this.pokemonService.getPokemons(20, 0).subscribe({
      next: (data) => {
        console.log('Pokemons recibidos desde servicio:', data);
        this.pokemons = data || [];
        this.updateDisplayed();
        this.loading = false;
      },
      error: (err) => {
        console.error('Error cargando pokemons', err);
        this.error = err?.message || 'Error al cargar pokemons';
        this.loading = false;
      }
    });
  }

  updateDisplayed(): void {
    // Muestra 4 pokemons a partir de currentIndex
    this.displayedPokemons = this.pokemons.slice(this.currentIndex, this.currentIndex + 4);
  }

  scrollUp(): void {
    if (this.currentIndex > 0) {
      this.currentIndex--;
      this.updateDisplayed();
    }
  }

  scrollDown(): void {
    if (this.currentIndex < this.pokemons.length - 4) {
      this.currentIndex++;
      this.updateDisplayed();
    }
  }

  // Detectar teclas de flecha
  @HostListener('window:keydown', ['$event'])
  handleKeyDown(event: KeyboardEvent): void {
    if (event.key === 'ArrowUp') {
      event.preventDefault();
      this.scrollUp();
    } else if (event.key === 'ArrowDown') {
      event.preventDefault();
      this.scrollDown();
    }
  }

  // Mouse hover: detectar posición y scroll automático
  onMouseMove(event: MouseEvent, container: HTMLElement): void {
    const rect = container.getBoundingClientRect();
    const y = event.clientY - rect.top;
    const height = rect.height;

    // Si está en el tercio superior, scroll hacia arriba
    if (y < height * 0.25) {
      this.startAutoScroll('up');
    }
    // Si está en el tercio inferior, scroll hacia abajo
    else if (y > height * 0.75) {
      this.startAutoScroll('down');
    } else {
      this.stopAutoScroll();
    }
  }

  onMouseLeave(): void {
    this.stopAutoScroll();
  }

  private startAutoScroll(direction: 'up' | 'down'): void {
    if (this.scrollInterval) return; // ya está scrolleando
    this.scrollInterval = setInterval(() => {
      if (direction === 'up') {
        this.scrollUp();
      } else {
        this.scrollDown();
      }
    }, 200); // velocidad de scroll (200ms)
  }

  private stopAutoScroll(): void {
    if (this.scrollInterval) {
      clearInterval(this.scrollInterval);
      this.scrollInterval = null;
    }
  }
}
