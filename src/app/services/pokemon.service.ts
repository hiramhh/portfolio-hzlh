import { Injectable } from '@angular/core';
import { PokemonList } from '../interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  url = 'https://pokeapi.co/api/v2/'

  constructor() { }

  async getAllPokemons() :Promise<PokemonList[]>{
    const data = await fetch(`${this.url}pokemon?limit=${0}&offset=${20}`)
    return await data.json() ?? [];
  }
}
