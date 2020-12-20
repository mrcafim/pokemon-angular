import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ListaGeneration } from 'src/app/models/generation/lista-generation';
import { PokeapiClientService } from 'src/app/services/pokeapi-client.service';

@Component({
  selector: 'app-lista-generation',
  templateUrl: './lista-generation.component.html',
  styleUrls: ['./lista-generation.component.css']
})
export class ListaGenerationComponent implements OnInit {

  listaGeracoes: ListaGeneration[] = [];;
  search: string = '';
  erro: string = '';
  paginacao: number = 0;

  constructor(private pokeapi: PokeapiClientService, 
    private router: Router) { }

    ngOnInit() {
      this.pokeapi.getGenerations()
        .then(geracoes => this.listaGeracoes = geracoes)
        .catch(err => this.erro = err.message )
    }

    generationDetalhe(generationId: string){
      this.router.navigate(['/generation', generationId]);
    }
}


