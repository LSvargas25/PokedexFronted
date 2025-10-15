import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AScreen } from '../../Screens/ascreen/ascreen';

@Component({
  selector: 'app-pokedex',
  standalone: true,
  imports: [CommonModule, AScreen],
  templateUrl: './pokedex.html',
  styleUrls: ['./pokedex.scss']
})
export class Pokedex {}
