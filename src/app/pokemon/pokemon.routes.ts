import { Routes } from '@angular/router';
import { PokemonLayoutComponent } from './layout/PokemonLayout/PokemonLayout.component';
import { AllPokemonPageComponent } from './pages/all-Pokemon-page/all-Pokemon-page.component';
import { TypePokemonPageComponent } from './pages/type-pokemon-page/type-pokemon-page.component';


export const routes: Routes = [

  {
    path:'',
    component: PokemonLayoutComponent,
    children:[
      {
        path:'all',
        component:AllPokemonPageComponent
      },
      {
        path:'types',
        component: TypePokemonPageComponent
      },
      {
        path: '**',
        redirectTo: 'all'
      }
    ]
  }

];

export default routes;
