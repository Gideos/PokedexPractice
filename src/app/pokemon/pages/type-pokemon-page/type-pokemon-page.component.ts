import { Component, inject, linkedSignal, signal } from '@angular/core';
import { PokemonService } from '../../services/Pokemon.service';
import { rxResource } from '@angular/core/rxjs-interop';
import { PokemonListComponent } from '../../PokemonList/PokemonList.component';
import { TitleCasePipe } from '@angular/common';
import { PokemonTypes } from '../../interfaces/PokemonTypes.type';
import { ActivatedRoute, Router } from '@angular/router';
import { of } from 'rxjs';


function validateQueryParam(queryParam: string) : PokemonTypes{

  queryParam = queryParam.toLowerCase();

  const validTypes: Record<string, PokemonTypes> = {
     'water':'water' ,
     'bug': 'bug',
     'dragon': 'dragon',
     'electric': 'electric',
     'ghost': 'ghost',
     'fire' : 'fire',
     'fairy': 'fairy',
     'ice': 'ice',
     'fighting': 'fighting',
     'normal': 'normal',
     'grass': 'grass',
     'psychic': 'psychic',
     'rock': 'rock',
     'dark' : 'dark',
     'ground': 'ground',
     'poison': 'poison',
     'flying': 'flying'
  }

  return validTypes[queryParam] ?? 'dragon';
}


@Component({
  selector: 'app-type-pokemon-page',
  imports: [ PokemonListComponent, TitleCasePipe ],
  templateUrl: './type-pokemon-page.component.html',
})

export class TypePokemonPageComponent {



  public pokemonTypes: PokemonTypes[] = [

     'dragon',
     'steel',
     'water',
     'bug',
     'electric',
     'ghost',
     'fire',
     'fairy',
     'ice',
     'fighting',
     'normal',
     'grass',
     'psychic',
     'rock',
     'dark',
     'ground',
     'poison',
     'flying'

  ]


  pokemonService = inject(PokemonService);

  activatedRoute = inject(ActivatedRoute);
  router = inject(Router);

  queryParam = this.activatedRoute.snapshot.queryParamMap.get('type') ?? '';
  pokemonType = linkedSignal<PokemonTypes>(() => validateQueryParam(this.queryParam))

  pokemonResource = rxResource( {

    request: () => ({type: this.pokemonType()}),
    loader: ({request}) => {
    if(!request.type) return of([])
    this.router.navigate(['/pokemon/types'],{
      queryParams:{
        type: request.type
      }
    })
    return this.pokemonService.getAllPokemon()
   }
  } )



}
