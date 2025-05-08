import { HttpClient } from '@angular/common/http';
import { inject, Injectable, linkedSignal } from '@angular/core';
import { PokemonList } from '../interfaces/RestfulPokemon.interfaces';
import { PokemonsDetails } from '../interfaces/PokemonDetailsRestful.interface';
import { catchError, from, mergeMap, of, switchMap, tap, throwError, toArray } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class PokemonService {


  private http = inject(HttpClient);
  private apiUrl = 'https://pokeapi.co/api/v2/pokemon'

  private pokemonCache = new Map<string, PokemonsDetails[]>();



  typeColors: {[type: string]: string}= {
    grass: 'bg-[#82C95B]',
    poison: 'bg-[#B369AF]',
    normal: 'bg-[#ACAD99]',
    fighting: 'bg-[#C45D4C]',
    flying: 'bg-[#90AAD7]',
    ground: 'bg-[#CEB250]',
    rock: 'bg-[#BAA85E]',
    bug: 'bg-[#ACC23E]',
    ghost: 'bg-[#816DB6]',
    steel: 'bg-[#9FA9AF]',
    fire: 'bg-[#E87A3D]',
    water: 'bg-[#639CE4]',
    electric: 'bg-[#E7C536]',
    psychic: 'bg-[#E96C95]',
    ice: 'bg-[#81CFD7]',
    dragon: 'bg-[#8572C8]',
    dark:'bg-[#79726B]',
    fairy: 'bg-[#E8B0EB]'
  }

  getAllPokemon(){

    if(this.pokemonCache.has('')){
      return of(this.pokemonCache.get('') ?? [])
    }

    const limit = 151;
    const offset = 0;
    return this.http.get<PokemonList>(`${this.apiUrl}?limit=${limit}&offset=${offset}`).pipe(
      switchMap( resp => from(resp.results.sort()).pipe(
        mergeMap( pokemon => this.getPokemonDetails(pokemon.url) ),
        toArray(),
        tap( pokemon => this.pokemonCache.set('', pokemon.sort((a,b) => a.id - b.id))),
        catchError((err) => {
          return throwError(() => new Error(`Ha ocurrido un error inesperado ${err}`))
        })
      ) )
    )
  }

  getPokemonDetails(url: string){
    return this.http.get<PokemonsDetails>(url);
  }


}
