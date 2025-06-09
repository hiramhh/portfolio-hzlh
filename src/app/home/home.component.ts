import { Component, ElementRef, inject, ViewChild} from '@angular/core';
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
  pokemonInfo: string = '';
  pokemonCard: any[] = [];
  pokemonService: PokemonService = inject(PokemonService);
 

  // Empiezan variables para scroll infinito

  isLoading = false;
  pagination: number = 1;

  // Terminan variables para scroll infinito

  // Empiezan varibles para el boton 
  @ViewChild('scrollId') myDiv!: ElementRef<HTMLDivElement>;

  // Terminan vartiables para el  boton


  showGoUpButton: boolean;
  scrollPosition: number = 0;
  showScrolHeight: number = 2500;
  hideScrollHeight: number = 200;


  constructor(){
    this.showGoUpButton =  false;
  }

  ngOnInit(){
    this.pokemonService.getAllPokemons().then((
      pokemonList: any) => {
        console.log("Hola desde ngOnInit");
        
        this.pokemon = pokemonList.results;
        this.pokemonInfo = pokemonList.next;

        this.nextPokemons();
      });     
  }

  // Inicia funciones del scroll infinito

  onPokedexScroll(event: any): void{
    const scrollTop = event.target.scrollTop;
    const scrollHeight = event.target.scrollHeight;
    const offsetHeight = event.target.offsetHeight;
    
    if ( scrollTop > this.showScrolHeight) {
      this.showGoUpButton = true;
    } else if(scrollTop < this.hideScrollHeight ){
      this.showGoUpButton = false;
    }
    if (scrollHeight - (scrollTop + offsetHeight) < 50 && !this.isLoading) {
      this.pagination++;
      this.nextPokemons();
    }
  }


  private nextPokemons(): void{
    console.log("Hola desde nextPokemons");
    
    this.isLoading = true;
    this.pokemonService.getNextPokemons(this.pokemonInfo).subscribe({
      next: (data) => {
        // this.pokemon.push(data.results);
        this.pokemon = [...this.pokemon, ...data.results];
        this.pokemonInfo = data.next;
        this.isLoading = false;
      },
      error: (err) => console.error('Error fetching Pokemons', err)
    });  
  }


  // Terminan funciones para el scroll infinito

  //Inicia logica para el boton de ir para arriba

  scrollTop(): void{
    this.myDiv.nativeElement.scrollTop = 0;    
  }

  //Termina logica para el boton de ir para arriba

}
