import { Component, inject, signal } from '@angular/core';
import { PokemonService } from '../../services/Pokemon.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PokemonListComponent } from "../../PokemonList/PokemonList.component";

@Component({
  selector: 'app-all-pokemon-page',
  imports: [PokemonListComponent],
  templateUrl: './all-Pokemon-page.component.html',
})
export class AllPokemonPageComponent {

  pokemonService = inject(PokemonService);

  pokemonSearchInput = signal<string>('')


  pokemonResource = rxResource( {
   loader: () => {
    return this.pokemonService.getAllPokemon()
   }
  } )

}
