import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Pokemon } from 'src/app/models/pokemon';
import { PokeapiClientService } from 'src/app/services/pokeapi-client.service';

@Component({
  selector: 'app-pokemon',
  templateUrl: './pokemon.component.html',
  styleUrls: ['./pokemon.component.css']
})
export class PokemonComponent implements OnInit {

  pokemon: Pokemon = new Pokemon();

  constructor(private pokeapi: PokeapiClientService, 
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.forEach((params: Params) => {
      let pokemonId = +params['id'];
      this.pokeapi.getPokemonById(pokemonId)
        .then((res: any) => {
          console.log(res);
          this.pokemon = res;
          console.log(this.pokemon);
        });
    })
  }

  calcularPeso(peso: number){
    var pesoFinal = peso * 0.1;
    return parseFloat(pesoFinal.toFixed(2));
  }
  calcularAltura(altura: number){
    var alturaFinal = altura * 0.1;
    return parseFloat(alturaFinal.toFixed(2)); 
  }
}
