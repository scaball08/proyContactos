var agregarContacto = document.getElementById('agregar');
var formulario = document.getElementById('formulario_crear_usuario');
var action = formulario.getAttribute('action');
var divCrear = document.getElementById('crear_contacto');
var tablaRegistrados = document.getElementById('registrados');
var checkBoxes = document.getElementsByClassName('borrar_contactos');
var btn_borrar = document.getElementById('btn_borrar');
var tableBody = document.getElementsByTagName('tbody');
var divExistentes = document.getElementsByClassName('existentes');
var inputBuscador =  document.getElementById('buscador');
var totalRegistros = document.getElementById('total');
var checkTodos = document.getElementById('borrar_todos');

function registroExitoso(nombre){
  //crear div y agregar un id
  var divMensaje =  document.createElement('DIV');
  // agregar id al div
  divMensaje.setAttribute('id',"mensaje");
  //agregar texto al div creado

	var texto = document.createTextNode("Creado: " +  nombre);
	divMensaje.appendChild(texto);
	divCrear.insertBefore(divMensaje,divCrear.childNodes[4]);

    // agregar la clase .mostrar
	divMensaje.classList.add('mostrar');

    // ocultar el mensaje creacion
    setTimeout(function(){
    	divMensaje.classList.add('ocultar');

    	setTimeout(function(){
    		var divPadreMensaje = divMensaje.parentNode;
    		divPadreMensaje.removeChild(divMensaje);
    	},500);
    },3000);

}

//construir template para insertar datos dinamicamente
function construirTemplate(nombre,telefono,registro_id){
   // crear input nombre de contacto
   var inputNombre = document.createElement('INPUT');
   inputNombre.type = "text";
   inputNombre.name = "contacto_" + registro_id;
   inputNombre.value = nombre;
   inputNombre.classList.add("buscador","form-control","nombre_contacto");


	//crear TD nombre de contacto
  var tdnombre =document.createElement('TD');
  var textNombre =  document.createTextNode(nombre);
  var parrafoNombre = document.createElement('P');
  parrafoNombre.appendChild(textNombre);
  tdnombre.appendChild(parrafoNombre);
  tdnombre.appendChild(inputNombre);

  // crear input Telefono de contacto
   var inputTelefono = document.createElement('INPUT');
   inputTelefono.type = "text";
   inputTelefono.name = "telefono_" + registro_id;
   inputTelefono.value = telefono;
   inputTelefono.classList.add("buscador","form-control","telefono_contacto");

  // crear telefono de contacto
  var tdTelefono = document.createElement('TD');
  var textoTelefono = document.createTextNode(telefono);
  var parrafoTelefono = document.createElement('P');
  parrafoTelefono.appendChild(textoTelefono);
  tdTelefono.appendChild(parrafoTelefono);
  tdTelefono.appendChild(inputTelefono);
 
  //crear enlace para editar
  var btnEditar = document.createElement('A');
  var textEnlace = document.createTextNode('Editar');
  btnEditar.appendChild(textEnlace);
  btnEditar.href = "#";
  btnEditar.setAttribute('class', 'editarBtn');

   //crear enlace para guardar
  var btnGuardar = document.createElement('A');
  var textEnlace = document.createTextNode('Guardar');
  btnGuardar.appendChild(textEnlace);
  btnGuardar.href = "#";
  btnGuardar.setAttribute('class', 'guardarBtn');

   // crear td  del boton editar contacto y agregar enlaces btn
  var tdEditar = document.createElement('TD');
  tdEditar.appendChild(btnEditar);
  tdEditar.appendChild(btnGuardar);

  tdEditar.classList.add('editar');

  //crear un checkbox bara borrar

  var checkBorrar = document.createElement('INPUT');
  checkBorrar.setAttribute("type", "checkbox");
  checkBorrar.name  = registro_id;
  checkBorrar.classList.add("borrar_contactos");

  //agregar checkbox a td
  var tdCheckbox = document.createElement('TD');
  tdCheckbox.classList.add("borrar");
  tdCheckbox.appendChild(checkBorrar);

  //agregar TR
  var trContacto = document.createElement('TR');
  trContacto.setAttribute("id", registro_id);
  trContacto.appendChild(tdnombre);
  trContacto.appendChild(tdTelefono);
  trContacto.appendChild(tdEditar);
  trContacto.appendChild(tdCheckbox);
  
  tablaRegistrados.childNodes[3].appendChild(trContacto);
  actualizarNumero();
  recorrerBotonesEditar();
  recorrerBotonesGuardar(registro_id);
  clasechbxActivos();
  

}

function crearUsuario(){
	var form_datos = new FormData(formulario);
    
    //se crea el objeto de la clase XMLHttpRequest
    xhr = new XMLHttpRequest();
    //abro la conexion al servidor
	xhr.open('POST', action, true);
	// cabecera necesario cuando se envia por POST
	xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');

	//crear funcion  mediate el metodo onreadystatechange
	// se verifica que xhr.readyState == 4 && xhr.status = 200
	xhr.onreadystatechange = function(){
		if (xhr.readyState == 4 && xhr.status == 200) {
			var resultado = xhr.responseText;
			console.log(resultado);
			var json = JSON.parse(resultado);
			console.log(json);
			if (json.respuesta==true) {
				registroExitoso(json.nombre);
				construirTemplate(json.nombre,json.telefono,json.id_c);
				actualizarNumero();

			}


		}
	}
	// se envia el formulario  
	xhr.send(form_datos); 
}

agregarContacto.addEventListener('click',function(evt){
evt.preventDefault();
crearUsuario();

});

 function mostrarEliminados(){
   // crear div y agregar div
   var divEliminado = document.createElement('DIV');
    divEliminado.setAttribute('id','borrado');

    // agregar texto
    var texto =  document.createTextNode("Eliminado de la lista de contactos");
    divEliminado.appendChild(texto);

    //insertando el elemento al 
    divExistentes[0].insertBefore(divEliminado,divExistentes[0].childNodes[0]);
    // agregar clase de CSS
    divEliminado.classList.add('mostrar');
    
     setTimeout(function(){
    	divEliminado.classList.add('ocultar');

    	setTimeout(function(){
    		var divPadreMensaje = divEliminado.parentNode;
    		divPadreMensaje.removeChild(divEliminado);
    	},500);
    },3000);
    

 }

function eliminarHTML(ids_borrados){

	for (var i = 0; i < ids_borrados.length; i++) {
		console.log(ids_borrados[i]);
		var TrBorrar = document.getElementById(ids_borrados[i]);

        tableBody[0].removeChild(TrBorrar);
	}

}

function contactosEliminar(contactos){
 xhr = new XMLHttpRequest();
 xhr.open('GET', 'borrar.php?id=' + contactos, true);
 console.log('borrar.php?id=' + contactos);
 xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
 xhr.onreadystatechange = function(){
		if (xhr.readyState == 4 && xhr.status == 200) {
			var resultadoBorrar = xhr.responseText;
			console.log(resultadoBorrar);
			var json = JSON.parse(resultadoBorrar);
			if(json.respuesta==false){
              alert("Seleciona un elemento para borrar");
			}else {
				alert("Registros Elimnados correctamente");
				console.log("Resultado: " + resultadoBorrar);
				eliminarHTML(contactos);
				mostrarEliminados();
				actualizarNumero();
			}
            
		}
	}
 xhr.send(); 	

}

function checkboxSelecionado(){
var contactos = [];
	for(i=0;i<checkBoxes.length;i++){
	  	if (checkBoxes[i].checked==true) {
          contactos.push(checkBoxes[i].name);
	  	}
	}
	console.log(contactos);
	contactosEliminar(contactos);
}

btn_borrar.addEventListener('click', function(){
  checkboxSelecionado();	
});

function clasechbxActivos(){
for(i=0;i<checkBoxes.length;i++){
  checkBoxes[i].addEventListener('change', function(){
  	if (this.checked) {
  	  this.parentNode.parentNode.classList.add('activo');
  	}else{
       this.parentNode.parentNode.classList.remove('activo');
  	}
    
  });
}
}
 clasechbxActivos();


function actualizarNumero(){
  	//variable para todos los registros
	var registros = tableBody[0].getElementsByTagName('tr');
	var cantidad = 0 ;
	var ocultos = 0 ;

	for (var i = 0; i < registros.length; i++) {
		var elementos = registros[i];
		if (elementos.style.display=='table-row') {
          cantidad++;
          totalRegistros.innerHTML = cantidad;
		}else {
			if(elementos.style.display=='none'){
			   ocultos++;
			   if (ocultos == registros.length) {
			   	ocultos-= registros.length;
			   	totalRegistros.innerHTML = ocultos;
			   }	
			}

		}
	}
}

function ocultarRegistros(nombre_buscar){
	//variable para todos los registros
	var registros = tableBody[0].getElementsByTagName('tr');

	//expresion regular que busca el nombre con case insensitive
	var expression = new RegExp(nombre_buscar, 'i');
    
	for (var i = 0; i < registros.length; i++) {
		registros[i].classList.add('ocultar');
		registros[i].style.display = 'none';
		if (registros[i].getElementsByTagName('td')[0].getElementsByTagName('p')[0].textContent.replace(/\s/g,"").search(expression)!=-1 ||nombre_buscar=="") {
         registros[i].classList.add('mostrar');
         registros[i].classList.remove('ocultar');
         registros[i].style.display = 'table-row';
		}
	}

	actualizarNumero();
}

inputBuscador.addEventListener('input',function(){

	ocultarRegistros(this.value);
});


//Seleccionar Todos

checkTodos.addEventListener('click',function(){
  if(this.checked){
    var todosRegistros = tableBody[0].getElementsByTagName('tr');
    
    for (var i = 0; i < todosRegistros.length; i++) {
  		checkBoxes[i].checked = true;
  		checkBoxes[i].parentNode.parentNode.classList.add('activo');
  	}

  }else {
  	for (var i = 0; i < checkBoxes.length; i++) {
  		checkBoxes[i].checked = false;
       checkBoxes[i].parentNode.parentNode.classList.remove('activo');
  	}
  	
  }

} );

   // ===== Recorrer botones guardar ====
   function recorrerBotonesGuardar(id){
     var btn_Guardar = tableBody[0].querySelectorAll('.guardarBtn');
      for (var i = 0; i < btn_Guardar.length; i++) {
      	btn_Guardar[i].addEventListener('click', function(){
      		actualizarRegistro(id);
      	});
      }
   }

 // ========= Editar Registros =======


 function recorrerBotonesEditar(){
 	var btn_editar = tableBody[0].querySelectorAll('.editarBtn');
 	
    for (var i = 0; i < btn_editar.length; i++) {

    	btn_editar[i].addEventListener('click',function(event){
    		event.preventDefault();
    		desabilitarEdicion();

           var resgistroActivo =  this.parentNode.parentNode;
          resgistroActivo.classList.add('modo-edicion');
          resgistroActivo.classList.remove('desactivado');

          //Actualizamos el registros especifico
          actualizarRegistro(resgistroActivo.id);
          

    	});
    }
 }

 function desabilitarEdicion(){
 	var registrosTr = document.querySelectorAll('#registrados tbody tr');
 	for (var i = 0; i < registrosTr.length; i++) {
 		registrosTr[i].classList.add('desactivado');
 	}
 }

  function habilitarEdicion(){
 	var registrosTr = document.querySelectorAll('#registrados tbody tr');
 	for (var i = 0; i < registrosTr.length; i++) {
 		registrosTr[i].classList.remove('desactivado');
 	}
 }

function actualizarRegistro(idRegistro){
 	//Selecionar Boton de guardar del Registro en especifico(se pasa ID )
  var btnGuardar = document.getElementById(idRegistro).getElementsByClassName('guardarBtn');

  // EVENTO click en GUARDAR
  btnGuardar[0].addEventListener('click', function(e){
   e.preventDefault();

   // obtiene el valor del campo Nombre ( obtener el nombre en la posicion 0)
   var inputNombreNuevo = document.getElementById(idRegistro).getElementsByClassName('nombre_contacto');
   var NombreNuevo = inputNombreNuevo[0].value;

   // obtiene el valor del campo Telefono ( obtener el nombre en la posicion 0)
   var inputTelefonoNuevo = document.getElementById(idRegistro).getElementsByClassName('telefono_contacto');
   var TelefonoNuevo = inputTelefonoNuevo[0].value;
   
   //objeto con todos los datos
   var contacto = {
   nombre:NombreNuevo,
   telefono:TelefonoNuevo,
   id:idRegistro
   };
   
   actualizarAjax(contacto);
   
  });
}

function actualizarAjax(datosContacto){
	//conviarte un objeto a un JSON con  JSON.stringify(datosContacto)
  var jsonContacto = JSON.stringify(datosContacto);
  xhr = new XMLHttpRequest();
 xhr.open('GET', 'actualizar.php?datos=' + jsonContacto, true);
 xhr.setRequestHeader('X-Requested-With','XMLHttpRequest');
 xhr.onreadystatechange = function(){
		if (xhr.readyState == 4 && xhr.status == 200) {
			var resultado = xhr.responseText;
			var Resultadojson = JSON.parse(resultado);

			if (Resultadojson.respuesta==true) {
				var RegistroActivo = document.getElementById(datosContacto.id) ;
				console.dir(RegistroActivo);
				console.dir(RegistroActivo.childNodes[3].childNodes[1]);
				// actualizar el parrafo nombre con el nuevo nombre
				RegistroActivo.getElementsByTagName('td')[0].getElementsByTagName('p')[0].innerHTML = Resultadojson.nombre;

				// actualizar el parrafo telefono con el nuevo telefono
				RegistroActivo.getElementsByTagName('td')[1].getElementsByTagName('p')[0].innerHTML = Resultadojson.telefono;

				//borrar modo edicion
	            RegistroActivo.classList.remove('modo-edicion');
	            habilitarEdicion();
			}else {
				console.log("Hubo un ERROR");
			}
						
            
		}
	}
 xhr.send(); 
}

 document.addEventListener('DOMContentLoaded', function(event){
  recorrerBotonesEditar();



 });