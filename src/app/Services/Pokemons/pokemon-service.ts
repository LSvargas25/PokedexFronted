import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

export interface Pokemon {
  id: number;
  name: string;
  image: string;
}

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  // Ajusta la URL a la que expone tu backend
  private readonly apiUrl = 'http://localhost:3000/api/pokemons';

  constructor(private http: HttpClient) {}

  getPokemons(limit = 10, offset = 0): Observable<Pokemon[]> {
    const params = new HttpParams()
      .set('limit', String(limit))
      .set('offset', String(offset));

    return this.http.get<any>(this.apiUrl, { params }).pipe(
      map(res => {
        // Si tu backend ya devuelve un array de Pokemons, devolvemos eso.
        if (Array.isArray(res)) return res as Pokemon[];
        // Si devuelve { pokemons: [...] } o similar, adaptamos:
        if (res && Array.isArray(res.pokemons)) return res.pokemons as Pokemon[];
        // fallback: intentar mapear una respuesta tipo PokeAPI
        if (res && res.results) {
          return res.results.map((p: any) => ({
            id: p.id ?? null,
            name: p.name,
            image: p.image ?? (p.sprites?.front_default ?? null)
          })) as Pokemon[];
        }
        return [];
      }),
      catchError(err => {
        console.error('Error fetching pokemons', err);
        return throwError(() => err);
      })
    );
  }
}
