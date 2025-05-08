import { Component, computed, inject, input, signal } from '@angular/core';
import { PokemonsDetails, Type } from '../interfaces/PokemonDetailsRestful.interface';
import { PokemonCardComponent } from "../components/pokemon-card/pokemon-card.component";
import { Router } from '@angular/router';

@Component({
  selector: 'app-pokemon-list',
  imports: [ PokemonCardComponent ],
  templateUrl: './PokemonList.component.html',
})
export class PokemonListComponent {


  pokemonSearch = input<string>();
  pokemonList = input<PokemonsDetails[]>();
  isLoading  = input<boolean>(false);
  pokemonType = input<string>('');
  pokemonError = input<string | unknown | null>();
  pokemonEmpty = input();


  router = inject(Router);

  filterDataByName = computed(() => {

    return this.pokemonList()?.filter(pokemon => pokemon.name.includes(this.pokemonSearch()?.toLowerCase()!));

  })

  filterDataByType = computed(() => {

    if(!this.pokemonType()) return
    return this.pokemonList()?.filter( pokemon => pokemon.types.find( tipo => tipo.type.name === this.pokemonType()));

  })


}
