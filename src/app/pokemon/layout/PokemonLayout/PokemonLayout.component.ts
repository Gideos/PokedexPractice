import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { NavComponent } from "../../../shared/components/nav/nav.component";

@Component({
  selector: 'app-pokemon-layout',
  imports: [RouterOutlet, NavComponent],
  templateUrl: './PokemonLayout.component.html',
})
export class PokemonLayoutComponent { }
