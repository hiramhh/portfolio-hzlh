import { Component, inject } from '@angular/core';
import { PokemonComponent } from "../pokemon/pokemon.component";
import { Pokemons } from '../interfaces/pokemon';
import { PokemonService } from '../services/pokemon.service';

@Component({
  selector: 'app-home',
  imports: [PokemonComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  pokemonList: Pokemons[] = [];
  pokemonService: PokemonService = inject(PokemonService);

  constructor(){
    this.pokemonService.getAllPokemons().then((
      pokemonList: Pokemons[]) => {
        this.pokemonList = pokemonList;
        console.log(this.pokemonList);
      });
  }
}
