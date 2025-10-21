// pokefron.service.ts
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class PokefronService {
  // Aquí guardamos qué componente mostrar en cada pantalla
  private screenAComponent = new BehaviorSubject<string | null>(null);
  private screenBComponent = new BehaviorSubject<string | null>(null);

  screenA$ = this.screenAComponent.asObservable();
  screenB$ = this.screenBComponent.asObservable();

  setScreenComponents(aComponent: string, bComponent: string) {
    this.screenAComponent.next(aComponent);
    this.screenBComponent.next(bComponent);
  }
}
