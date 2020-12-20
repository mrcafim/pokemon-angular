import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-barra-navegacao',
  templateUrl: './barra-navegacao.component.html'
})
export class BarraNavegacaoComponent implements OnInit {  
  
  constructor() { }

  ngOnInit() {    
  } 
  toggleMenu() {
    $('.menu').toggleClass('mostrar-menu');
	  $('.box-menu').toggleClass('mostrar-menu-box');
  }
}
