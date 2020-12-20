import { Component, OnInit } from '@angular/core';
import { PokeapiClientService } from 'src/app/services/pokeapi-client.service';
import { ListaPokemon } from 'src/app/models/lista-pokemon';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lista-pokemons',
  templateUrl: './lista-pokemons.component.html',
  styleUrls: ['./lista-pokemons.component.css']
})
export class ListaPokemonsComponent implements OnInit {

  listaPokemons: ListaPokemon[] = [];;
  search: string = '';
  erro: string = '';
  paginacao: number = 0;
  constructor(private pokeapi: PokeapiClientService, 
              private router: Router) { }

  ngOnInit() {

    this.pokeapi.getPokemons()
      .then(pokemons => this.listaPokemons = pokemons)
      .catch(err => this.erro = err.message )
  }

  pokemonDetalhe(pokeId: string){
    this.router.navigate(['/pokemon', pokeId]);
  }

}

