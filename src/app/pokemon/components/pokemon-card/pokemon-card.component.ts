import { Component, inject, input } from '@angular/core';
import { PokemonsDetails } from '../../interfaces/PokemonDetailsRestful.interface';
import { TitleCasePipe } from '@angular/common';
import { PokemonService } from '../../services/Pokemon.service';

@Component({
  selector: 'pokemon-card',
  imports: [TitleCasePipe],
  templateUrl: './pokemon-card.component.html',
})
export class PokemonCardComponent {

  PokemonService = inject(PokemonService);

  pokemon = input.required<PokemonsDetails>();


}
