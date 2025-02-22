import { Component, Input } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';



@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent {
  @Input() pokemon!: any;
    

}


