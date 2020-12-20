import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Generation } from 'src/app/models/generation/generation';
import { PokeapiClientService } from 'src/app/services/pokeapi-client.service';

@Component({
  selector: 'app-generation',
  templateUrl: './generation.component.html',
  styleUrls: ['./generation.component.css']
})
export class GenerationComponent implements OnInit {

  generation: Generation = new Generation();
  erro: string = '';
  paginacao: number = 0;

  constructor(private pokeapi: PokeapiClientService, 
              private route: ActivatedRoute, 
              private router: Router) { }

    ngOnInit() {
      this.route.params.forEach((params: Params) => {
        let generationId = +params['id'];
        this.pokeapi.getGenerationById(generationId)
          .then((res: any) => {
            this.generation = res;
          });
      })
    }
    pokemonDetalhe(pokeId: string){
      this.router.navigate(['/pokemon', pokeId]);
    }

}