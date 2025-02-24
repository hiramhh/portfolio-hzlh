import { inject, Injectable } from '@angular/core';
import { Pokemons } from '../interfaces/pokemon';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {

  private http = inject(HttpClient);
  private url = 'https://pokeapi.co/api/v2/'

  constructor() { }

  // Request with promises
  async getAllPokemons() :Promise<Pokemons[]>{
    const data = await fetch(`${this.url}pokemon?limit=0&offset=0`);
    return await data.json() ?? [];
  }

  getPokemon(name: string) :Observable<any>{
    return this.http.get<any>(`${this.url}pokemon/${name}`);
  }

  getNextPokemons(url: string) :Observable<any>{
    return this.http.get<any>(`${url}`);
  }



}
