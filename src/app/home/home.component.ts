import { Component, inject } from '@angular/core';
import { PokemonComponent } from "../pokemon/pokemon.component";
import { Pokemon, PokemonList } from '../interfaces/pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  imports: [PokemonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  pokemonList: PokemonList[] = [];
  pokemonService: PokemonService = inject(PokemonService);

  constructor(){
    this.pokemonService.getAllPokemons().then((
      pokemonList: PokemonList[]) => {
        this.pokemonList = pokemonList.results;
        console.log(pokemonList);
        
      });
  }
}
