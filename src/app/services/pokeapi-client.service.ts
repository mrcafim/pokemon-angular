import { Injectable } from '@angular/core';
import { Headers, Http, RequestOptions } from '@angular/http';
import { Generation } from '../models/generation/generation';
import { ListaGeneration } from '../models/generation/lista-generation';
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
    return this.http.get(`${this.baseURL}pokemon/${id}`)
      .toPromise()
      .then(response => {
        return Pokemon.parse(response.json());
      })
      .catch(error => {
        console.error('Ocorreu um erro: ', error.statusText);
        return Promise.reject(error.statusText || error);
      })
  }

  getGenerations(): Promise<ListaGeneration[]> {
    return this.http.get(`${this.baseURL}generation`)
      .toPromise()
      .then(response => {
        return response.json().results.map((generation: any) => ListaGeneration.parse(generation))
      })
      .catch(error => {
        return Promise.reject(error.statusText || error);
      })
  }
  
  getGenerationById(id: number): Promise<Generation> {
    return this.http.get(`${this.baseURL}generation/${id}`)
      .toPromise()
      .then(response => {
        return Pokemon.parse(response.json());
      })
      .catch(error => {
        console.error('Ocorreu um erro: ', error.statusText);
        return Promise.reject(error.statusText || error);
      })
  }


}
