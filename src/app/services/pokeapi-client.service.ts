import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
///import 'rxjs/add/operator/toPromise';
///import 'rxjs/add/operator/map';

import { ListaPokemon } from '../models/lista-pokemon';
import { Pokemon } from '../models/pokemon';

@Injectable()
export class PokeapiClientService {
  private baseURL: string = "http://pokeapi.co/api/v2/";
  pokemons$: ListaPokemon[] = [];

  constructor(private http: Http) { }

  getPokemons(): Promise<ListaPokemon[]> {
    return this.http.get(`${this.baseURL}pokemon/?limit=889`)
      .toPromise()
      .then(response => {
        return response.json().results.map((pokemon: any) => ListaPokemon.parse(pokemon))
      })
      .catch(error => {
        console.error('Ocorreu um erro: ', error.statusText);
        return Promise.reject(error.statusText || error);
      })
  }

  getPokemonById(id: number): Promise<Pokemon> {
    console.log("Entrei no getby id");
    console.log(id);
    return this.http.get(`${this.baseURL}pokemon/${id}`)
      .toPromise()
      .then(response => {
        console.log('response by id', response);
        return Pokemon.parse(response.json());
      })
      .catch(this.handleError)
  }

  // getPokemonByName(name: string): Promise<Pokemon> {
  //   name = name.toLowerCase();
  //   return this.http.get(`${this.baseURL}pokemon/${name}`)
  //     .toPromise()
  //     .then(response => {
  //       console.log('json in by name search', response.json());
  //       return Pokemon.parse(response.json());
  //     })
  //     .catch(this.handleError)
  // }

  private handleError(error: any): Promise<any> {
    // debugger;
    console.error('An error occurred:', error.statusText);
    return Promise.reject(error.statusText || error);
  }

}
