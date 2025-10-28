import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface PokemonFullData {
  id: number;
  name: string;
  image: string;
  types: string[];
  height: number;
  weight: number;
  abilities: { name: string; hidden: boolean }[];
  weaknesses: string[];
  evolution: { name: string }[];
  generation: { name: string | null; number: number | null }; // ← actualizado
}

@Injectable({
  providedIn: 'root'
})
export class PokemonDetailService {
  private apiUrl = 'http://localhost:3000/api/pokemons';

  constructor(private http: HttpClient) {}

  getPokemonFullData(nameOrId: string): Observable<PokemonFullData> {
    return this.http.get<PokemonFullData>(`${this.apiUrl}/${nameOrId}`);
  }
}
