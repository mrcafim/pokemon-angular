//Mostrar menu
$(".header span").click(function () {
	$('.menu').toggleClass('mostrar-menu');
	$('.box-menu').toggleClass('mostrar-menu-box');
});

$(".menu .fechar, .menu").click(function () {
	$('.menu').removeClass('mostrar-menu');
	$('.box-menu').removeClass('mostrar-menu-box');
});

//Tooltip


