import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-ascreen-pokemon-search',
  imports: [CommonModule],
    standalone:true,
  templateUrl: './ascreen-pokemon-search.html',
  styleUrl: './ascreen-pokemon-search.scss'
})
export class AScreenPokemonSearch {
  AScreen = true;
  Targets =true;



}
