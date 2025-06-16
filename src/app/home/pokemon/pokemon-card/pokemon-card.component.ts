import { Component, Input } from '@angular/core';
import { PokemonService } from '../../../services/pokemon.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-pokemon-card',
  standalone: true,
  imports: [RouterModule,CommonModule],
  templateUrl: './pokemon-card.component.html',
  styleUrl: './pokemon-card.component.css'
})
export class PokemonCardComponent {
@Input() pokemon!: any;
  pokemonPhoto :any;

  constructor(private pokemonService: PokemonService){
  }
    
  ngOnInit(): void{
    this.pokemonService.getPokemon(this.pokemon.name).subscribe({
      next: (data) => {this.pokemonPhoto = data.sprites.front_default;
        console.log("Hola desde la peticion para las fotos");
        
        },
      error: (err) => console.error('Error fetching Pokemons', err)
    });
  }
}
