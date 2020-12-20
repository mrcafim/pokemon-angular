// Angular Modules
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule, PreloadAllModules } from '@angular/router';
import { ShareModule } from './components/shared/share.module';

// Rota da aplicação
import { appRoutes } from './routes';

// Components
import { AppComponent } from './components/app/app.component';
import { BarraNavegacaoComponent } from './components/app/barra-navegacao/barra-navegacao.component';
import { MenuLateralComponent } from './components/app/menu-lateral/menu-lateral.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';

// Bibliotecas de terceiros
import * as $ from 'jquery';
import { ListaPokemonsComponent } from './components/pokemon/lista-pokemons/lista-pokemons.component';
import { PokeapiClientService } from './services/pokeapi-client.service';
import { HttpModule } from '@angular/http';
import { NgxPaginationModule } from 'ngx-pagination';
import { PokemonComponent } from './components/pokemon/pokemon/pokemon.component';
import { CapitalizePipe } from './pipes/capitalize.pipe';

@NgModule({
  declarations: [
    AppComponent,
    BarraNavegacaoComponent,
    CapitalizePipe,
    MenuLateralComponent,
    NotFoundComponent,
    HomeComponent,
    ListaPokemonsComponent,
    PokemonComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    HttpModule,
    NgxPaginationModule,
    RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules}),
    ShareModule,
  ],
  providers: [PokeapiClientService],
  bootstrap: [AppComponent]
})
export class AppModule { }
