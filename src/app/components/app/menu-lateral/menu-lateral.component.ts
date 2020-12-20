import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.css']
})
export class MenuLateralComponent implements OnInit {
  constructor(private router: Router) { }

  ngOnInit() {
  }
  navegar(rotas: string[]) {
    this.ocultarMenu();
    this.router.navigate(rotas);
  }
  ocultarMenu() {
    $('.menu').removeClass('mostrar-menu');
	  $('.box-menu').removeClass('mostrar-menu-box');
  }
}
