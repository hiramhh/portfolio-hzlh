import { Component, inject } from '@angular/core';
import { PokemonComponent } from "../pokemon/pokemon.component";
import { Pokemon, Pokemons } from '../interfaces/pokemon';
import { PokemonService } from '../services/pokemon.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  imports: [PokemonComponent, CommonModule],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  pokemon: Pokemon[] = [];

  pokemonService: PokemonService = inject(PokemonService);


  constructor(){
    this.pokemonService.getAllPokemons().then((
      pokemonList: any) => {
        this.pokemon = pokemonList.results;
        console.log(pokemonList.results);
      });

    

  }
}
