var equipo = ["KFC Buenisimo","Banco Pichincha","Marathon Sport","Juan Valdez Cafè","Movistar"];
var id_equipo = ["kfc","banco_pichincha","marathon","jan_valdez","movistar"];

var listaEquipos = ["KFC","Banco Pichincha","Marathon Sport","Juan Valdez Cafe","Movistar"];

var idEquipos = ["kfc","banco_pichincha","marathon","jan_valdez","movistar"];

var equipo_nombre;
var seccionTag=[];
var informacionTag=[];
var seccion2Tag=[];
var configuracionPerfil=[];
var storageNotificacion=[];
var equipoActual;

$(document).ready(function(){			
	/*for(x=0; x<id_equipo.length; x++){
		var contenidoUl=$("#opcion-equipo-listado").html();
		$("#opcion-equipo-listado").html(contenidoUl+"<li class='opcion-equipo-elegir' ref='"+id_equipo[x]+"'>" +
			"<span class='icono "+(equipo[x].toLowerCase()).replace(/\s/g,"-")+"'></span>" +
			"<span class='nombre-equipo-lista'>"+equipo[x]+"</span>" +
			"<span class='opcion-equipo-lista opcion-"+id_equipo[x]+"'></span>"+
		"</li>");
						
		
	}	
	for(x=0; x<id_equipo.length; x++){
	var contenidoUl=$(".lista-historial").html();
	$(".lista-historial").html(contenidoUl+"<li class='opcion-equipo-elegir' ref='"+id_equipo[x]+"'>" +
		"<span class='icono "+(equipo[x].toLowerCase()).replace(/\s/g,"-")+"'></span>" +
		"<span class='nombre-equipo-lista'>"+equipo[x]+"</span>" +
		"<span class='opcion-equipo-lista opcion-"+id_equipo[x]+"'></span>"+
	"</li>");
	
	}*/	
				
	/**OPCION ELEGIR EQUIPO***/		 
	$(".opcion-equipo-elegir").click(function(){		
		var respuesta=buscarElemento($(this).attr("ref"), "seccion");		
		equipoActual=$(this).attr("ref");												
		verificarOpcionInformacion($(this).attr("ref"));
		$('.opcion-'+$(this).attr("ref")).addClass('opcion-elegido');
		$("#modal-informacion-recibir").show();						
		$(".cuadro-modal").addClass("bounceInUp");
		
		if( tablet === false )
			verificarSelecion("seccion");		
	});
				
	/**OPCION ELEGIR INFORMACION DE EQUIPO A RECIBIR***/		
    Lungo.dom('.opcion-informacion-elegir').tap(function(event){  		
			var respuesta=buscarElemento(equipoActual+"-"+$(this).attr("ref"), "informacion");
			if (respuesta == 0){						
				$('.opcion-'+$(this).attr("ref")).addClass('opcion-elegido');			
			}else
				$('.opcion-'+$(this).attr("ref")).removeClass('opcion-elegido');						
			verificarSelecion("informacion");
		});
		
       Lungo.dom('.btn-iniciar').tap(function(event){  		
			cargarConfiguracionEquipos();
		});	
				
	/**OPCION MAS INFORMACION***/	
    Lungo.dom('.opcion-seccion-elegir').tap(function(event){						
			var respuesta=buscarElemento($(this).attr("ref"), "seccion2");			
			if (respuesta == 0)
				$('.opcion-'+$(this).attr("ref")).addClass('opcion-elegido');			
			else
				$('.opcion-'+$(this).attr("ref")).removeClass('opcion-elegido');
							
			verificarSelecion("seccion2");
		});	
				/********************/	
        $('.btn-cerrar').click(function(){
			localStorage.historialConfiguracion=JSON.stringify(informacionTag);		
			verificarOpcionesEquipo();
			$(".cuadro-modal").removeClass("bounceInUp");				
			$("#modal-informacion-recibir").hide();	
			for (var x = 1 ; x<=3; x++){						
				$('.opcion-IN'+x).removeClass('opcion-elegido');
			}		
		});  
    
     Lungo.dom('.btn-configuracion-finalizada').tap(function(event){		
           localStorage.ingresoApp="1";		   
		   localStorage.seccionExtra = seccion2Tag;
           $(".contenedor-datos").removeClass("ocultar");
           $(".contenedor-datos").addClass("aparecer");	
           $(".espacio-titular").addClass("ocultar");
           $(".espacio-entre-fila").addClass("ocultar");
           
		   if(device.platform == "Android"){
			registerPushwooshAndroid();						
		   }
		   if(device.platform == "iPhone" || device.platform == "iOS"){
				registerPushwooshIOS();
		    }
           
        var equipoTags=[];    	
       	
       	for(var j=0; x<seccion2Tag.length; x++ ){
       		equipoTags.push(seccion2Tag[x]);
       	}       	       	
       	       	
		});	
    
        Lungo.dom('.boton-iniciar').tap(function(event){
			$(".contenedor-datos").show();	
		});
        
        var estadoMenu=0;
        Lungo.dom('.getMenu').tap(function(event){
        	if( estadoMenu == 0){
        		estadoMenu=1;
        		$("#features").removeClass("slideOutLeft-animado");
				$("#features").addClass("slideInLeft-animado mostrar-menu");
        	}else{
        		estadoMenu=0;
        		$("#features").removeClass("slideInLeft-animado ");
        		$("#features").addClass("slideOutLeft-animado ");
        	}
		});
        
        Lungo.dom('.pop-compartir').tap(function(event){
        	$("#modal-compartir").show();
        	$(".cuadro-share").addClass("bounceInUp");        	
		});
        
        $('.btn-cerrar-modal').click(function(){
        	$("#modal-compartir").hide();
        	$(".cuadro-share").removeClass("bounceInUp");        	
		});        
   
               
    if(device.platform == "iPhone" || device.platform == "iOS"){
		$("#cuadro-superios").addClass("cuadroNegro");
		$("section").addClass("alto-section");
		
    }else{
    	$("#cuadro-superios").addClass("ocultar"); 
    }
});

function buscarElemento(elem, varArreglo){	
	var swb=0;
	if(varArreglo=="seccion"){
		for(var x=0; x<seccionTag.length;x++ ){			
			if (seccionTag[x] == elem ){				
				seccionTag.splice(x,1);
				swb=1;
			}	
		}			
		if(	swb == 0 ){
			seccionTag.push(elem);			
		}	
			
		if (swb == 0)
			return 0;
		else
			return 1;	
		
	}else if(varArreglo=="informacion"){
		for(var x=0; x<informacionTag.length;x++ ){			
			if (informacionTag[x] == elem ){				
				informacionTag.splice(x,1);
				swb=1;
			}	
		}			
		if(	swb == 0 ){
			informacionTag.push(elem);
		}
		
		if (swb == 0)
			return 0;
		else
			return 1;
		
		
	}else if( varArreglo=="seccion2"){
		for(var x=0; x<seccion2Tag.length;x++ ){			
			if (seccion2Tag[x] == elem ){				
				seccion2Tag.splice(x,1);
				swb=1;
			}	
		}			
		if(	swb == 0 )
			seccion2Tag.push(elem);
		
		if (swb == 0)
			return 0;
		else
			return 1;
	}
}; 

function verificarSelecion(tipo){
	if(tipo=="seccion"){	
		if ( seccionTag.length > 0)		
			$(".btn-continuar-eleccion-equipo").show();
		else
			$(".btn-continuar-eleccion-equipo").hide();		
	}else if (tipo=="seccion2"){
		if ( seccion2Tag.length > 0){
			if(tablet === false )
				$(".btn-configuracion-finalizada").show();
			else
				$(".btn-configuracion-finalizada").show();
				
		}else{
			if(tablet === false )
				$(".btn-configuracion-finalizada").hide();
			else
				$(".btn-configuracion-finalizada").hide();
		}
	}	
};


function actualizarStorageNotificacion(){	
	var equipoTags=[];
	$(".lista-historial").html("");	
	for(var j=0; j<seccion2Tag.length; j++ )	
		equipoTags.push(seccion2Tag[j]);
	
		
	var jqxhr = $.getJSON( "http://www.futbolecuador.com/site/getnewsjsonapp?secciones="+equipoTags.toString()+"/646544654646", function() {
	})		  
	  .fail(function() {
	   alert( "Error " );
	  });		 
		
	jqxhr.complete(function() {		
		if(tablet === false ){
	         for (var i=0 ; i < jqxhr.responseJSON.length; i++){		
		     	var contenidoUl=$(".lista-historial").html();
					$(".lista-historial").html(contenidoUl+"<li class='titulo-notificacion evento-"+i+" animated' ref='"+i+"' >" + 
				        "<div class='txt-notification notificacion-"+i+"'>"+
				        "<img class='marcara-redondeada' src='"+jqxhr.responseJSON[i].foto+"' /> "+ 
				        "<a onclick='window.open(\""+jqxhr.responseJSON[i].link+"\", \"_system\", \"location=yes\"); return false;'>"+jqxhr.responseJSON[i].resumen+"</a>" +
				        "<div class='fecha-noticia'> "+buscarNombre(jqxhr.responseJSON[i].seccion)+" | "+jqxhr.responseJSON[i].fecha_creacion+" </div>"+
				        "</div>"+			        
				        "</li>");
				 };
				 
		}else{
			for (var i=0 ; i < jqxhr.responseJSON.length; i++){		
		     	var contenidoUl=$(".lista-historial").html();
					$(".lista-historial").html(contenidoUl+"<li class='titulo-notificacion evento-"+i+" animated' ref='"+i+"' >" + 
				        "<div class='txt-notification notificacion-"+i+"'>"+
				        "<img class='marcara-redondeada' src='"+jqxhr.responseJSON[i].foto_table+"' /> "+ 
				        "<a onclick='window.open(\""+jqxhr.responseJSON[i].link+"\", \"_system\", \"location=yes\"); return false;'>"+jqxhr.responseJSON[i].resumen+"</a>" +
				        "<div class='fecha-noticia'> "+buscarNombre(jqxhr.responseJSON[i].seccion)+" | "+jqxhr.responseJSON[i].fecha_creacion+" </div>"+
				        "</div>"+			        
				        "</li>");
				 };
		}
		
			
			 $('.espera').removeClass("aparecer");
			 $('.espera').addClass("ocultar");
		});		
		$(".mensaje-notificacion").hide();	
};


function buscarNombre(valor){
	for (var x=0 ; x<idEquipos.length;){
		if(valor == idEquipos[x]){                        
			return listaEquipos[x];        
            x=idEquipos.length;
        }else
            x++;
	}
};

function cargarConfiguracionEquipos(){	
	for(var x =0; x < seccion2Tag.length; x++ ){		
		$('.opcion-'+seccion2Tag[x]).addClass('opcion-elegido');	
	}
	verificarSelecion("seccion2");	
};


/*********compartir********/
function share(expr){ 
    switch (expr) { 
      case "Twitter": 
        window.plugins.socialsharing.shareViaTwitter('Compartir Ubano connect', null /* img */, 'http://www.urbanoexpress.com/'); 
            closeOptions(); 
        break; 
      case "Facebook": 
        window.plugins.socialsharing.shareViaFacebook('Compartir Ubano connect', null /* img */, 'http://www.urbanoexpress.com/', function() {console.log('share ok')}, function(errormsg){console.log(errormsg)}); 
            closeOptions(); 
        break; 
      case "WhatsApp": 
            window.plugins.socialsharing.shareViaWhatsApp('Compartir Ubano connect', null /* img */, 'http://www.urbanoexpress.com/', function() {console.log('share ok')}, function(errormsg){console.log(errormsg)}); 
            closeOptions(); 
        break; 
      default: 
       
    } 
};
	
if(localStorage.getItem("seccionExtra") != null) {
	var listaAux = localStorage.getItem("seccionExtra").split(",");
	for(var x =0; x< listaAux.length; x++ ){
		seccion2Tag.push(listaAux[x]);
	}    
}

if(localStorage.getItem("ingresoApp") != null) {
    if(localStorage.ingresoApp == "1"){	        
			$("#saludo-inicial").html("");
			$(".espacio-titular").addClass("ocultar");
			$(".espacio-entre-fila").addClass("ocultar");
			
			$(".lista-noticias").addClass("aparecer");
			$("#btn-configurar").addClass("ocultar");
			$("#btn-configurada").addClass("ocultar");
			$(".mensaje-notificacion").addClass("ocultar");			
	        $(".contenedor-datos").removeClass("ocultar");
			$(".contenedor-datos").addClass("aparecer");
			$('.espera').addClass("aparecer");  
	    	$('.espera').removeClass("ocultar");
			
            setTimeout(function(){ 
            //    actualizarStorageNotificacion();
                cargarConfiguracionEquipos(); 
            }, 1000);
								
	}
}  















			
	
	

