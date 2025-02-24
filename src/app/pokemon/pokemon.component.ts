import { Component, Input } from '@angular/core';
import { Pokemon } from '../interfaces/pokemon';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { PokemonService } from '../services/pokemon.service';
import { Observable } from 'rxjs';



@Component({
  selector: 'app-pokemon',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './pokemon.component.html',
  styleUrl: './pokemon.component.css'
})
export class PokemonComponent {
  @Input() pokemon!: any;
  pokemonPhoto :any;

  constructor(private pokemonService: PokemonService){
  }
    
  ngOnInit(): void{
    this.pokemonService.getPokemon(this.pokemon.name).subscribe({
      next: (data) => {this.pokemonPhoto = data.sprites.front_default;
        },
      error: (err) => console.error('Error fetching Pokemons', err)
    });
  }

}


