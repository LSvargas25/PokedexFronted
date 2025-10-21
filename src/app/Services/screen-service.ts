import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ScreenService {

  // Estado de la pantalla: true = encendida, false = apagada
  private screenState = new BehaviorSubject<boolean>(false);

  // Observable público para que otros componentes puedan suscribirse
  screenState$ = this.screenState.asObservable();

  constructor() { }

  // Método para encender
  powerOn() {
    this.screenState.next(true);
  }

  // Método para apagar
  powerOff() {
    this.screenState.next(false);
  }
}
