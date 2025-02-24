import { Component, HostListener, inject} from '@angular/core';
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


  showGoUpButton: boolean;
  private actualPage: number;
  showScrolHeight: number = 400;
  hideScrollHeight: number = 200;


  constructor(){
    this.actualPage = 1;
    this.showGoUpButton =  false;
  }

  ngOnInit(){
    this.pokemonService.getAllPokemons().then((
      pokemonList: any) => {
        this.pokemon = pokemonList.results;
        this.pokemonInfo = pokemonList.next;
      });  
  }

  // Inicia funciones del scroll infinito

  onPokedexScroll(event: any): void{
    const scrollTop = event.target.scrollTop;
    const scrollHeight = event.target.scrollHeight;
    const offsetHeight = event.target.offsetHeight;

    

    if (scrollHeight - (scrollTop + offsetHeight) < 50 && !this.isLoading) {
      this.pagination++;
      this.nextPokemons();
    }
  }


  private nextPokemons(): void{
    this.isLoading = true;
    this.pokemonService.getNextPokemons(this.pokemonInfo).subscribe({
      next: (data) => {
        this.pokemon = data.results;
        this.pokemonInfo = data;
      },
      error: (err) => console.error('Error fetching Pokemons', err)
    });  

  }


  // Terminan funciones para el scroll infinito

  //Inicia logica para el boton de ir para arriba

  @HostListener('window:scroll', [])
    onWindowScroll(){
      if ((window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > this.showScrolHeight) {
        this.showGoUpButton = true;
      } else if(this.showGoUpButton && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) < this.showScrolHeight ){
        this.showGoUpButton = true;
      }
    }


  scrollTop(){
    document.body.scrollTop = 0;  // Safari
    document.documentElement.scrollTop = 0;  // Other
  }

    //Termina logica para el boton de ir para arriba

}
