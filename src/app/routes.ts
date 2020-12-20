// Components
import { Routes } from '@angular/router';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from 'src/app/components/home/home.component';
import { ListaPokemonsComponent } from './components/pokemon/lista-pokemons/lista-pokemons.component';
import { PokemonComponent } from './components/pokemon/pokemon/pokemon.component';
import { ListaGenerationComponent } from './components/generation/lista-generation/lista-generation.component';
import { GenerationComponent } from './components/generation/generation/generation.component';

export const appRoutes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'lista-pokemons', component: ListaPokemonsComponent },
  {path: 'pokemon/:id', component: PokemonComponent },
  { path: 'lista-generation', component: ListaGenerationComponent },
  {path: 'generation/:id', component: GenerationComponent },
  //última rota deve ser a página não encontrada
  { path: '**', component: NotFoundComponent}
];