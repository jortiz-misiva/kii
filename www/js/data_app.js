function getLocalStorage() {
    try {
        if(window.localStorage ) 
        	setPerfil();
    }
    catch (e){
        return undefined;
    }
};

function limpiarStorage(){
	localStorage.removeItem("ingresoApp");
	localStorage.removeItem("listaEquipo");
	localStorage.removeItem("informacionEquipo");
	localStorage.removeItem("seccionExtra");
	localStorage.removeItem("historialConfiguracion");
};

function setPerfil(){		
	if(localStorage.getItem("ingresoApp") == null) {
		localStorage.ingresoApp = "0";
		$(".contenedor-datos").addClass("ocultar");		
		$(".lista-noticias").addClass("ocultar");
		$("#saludo-inicial").addClass("aparecer");
		$(".footer-inicio").addClass("ocultar");
		buscarElemento("pbl", "seccion2");
		$('.opcion-pbl').addClass('opcion-elegido');
		verificarSelecion("seccion2");
	}	
 };

