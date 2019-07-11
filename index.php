
<?php 

try {
              require_once('funciones/bd_conexion.php');
  
              $mysql = new Connection();
              $conexion = $mysql->get_connection();
              $query = mysqli_query($conexion,"select cant_reg() AS 'cantidad'");

              if( $f = mysqli_fetch_array($query)){
             $result = $f['cantidad'];
              $query->close(); 
              $conexion->close();  
              }
 $error = "";
} catch (Exception $e) {
  $error = $e->getMessage();
}

?>



<?php 

try {
              require_once('funciones/bd_conexion.php');
  
              $obj_conect = new Connection();
              $conectar = $obj_conect->get_connection();
              $consul = mysqli_query($conectar,"select * from contactos.contactos ");


 $error = "";
} catch (Exception $e) {
  $error = $e->getMessage();
}

?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
  <title>Agenda PHP</title>
  <link rel="stylesheet" href="css/bootstrap.min.css">
  <link rel="stylesheet" href="css/mi_css.css">

</head>
<body>
  

  <div class="container contenedor">
      <h1>Agenda de contactos</h1>
      
      <div class="container contenido" id="crear_contacto">
        <h2>Nuevo contacto</h2>
        <form action="crear.php" method="post" id="formulario_crear_usuario">

          <div class="form-group container-fluid">
            <label for="nombre">Nombre
              <input type="text" class="form-control" name="nombre" id="nombre" placeholder="nombre">
            </label>
          </div>

          <div class="form-group container-fluid ">
            <label for="numero">Número
              <input type="text" class="form-control" name="numero" id="numero" placeholder="numero">
            </label>
          </div>
          <button id="agregar" type="submit" class="btn btn-primary boton">Agregar</button>

          
          
        </form>

      </div>



      <div class="container cantidad existentes">
        <div class="form-group container-fluid buscar">
           <h2>Buscar</h2>
           <input type="text" id="buscador" name="buscador" placeholder="Buscar" class="buscador form-control" >

        </div>
        <h2>Contactos Existentes</h2>
        <p> 
          Resultados :   <span id="total" ><?php echo $result ?></span>
        </p>
        
         <table id="registrados" class="table table-hover table-inverse">
           <thead class="tencab">
             <tr>
               <th>NOMBRE</th>
               <th>TELÉFONO</th>
               <th>BORRAR</th>
               <th><button type="button" name="borrar" id="btn_borrar" class="borrar">Borrar</button>
                   <input type="checkbox" id="borrar_todos"  >
               </th>
             </tr>
           </thead>
           <tbody>

            <?php 
              while( $registros = mysqli_fetch_array($consul)){ ?>
               <tr id="<?php echo $registros['id']; ?>">
               <td> <p><?php echo $registros['nombre']; ?></p>  <input type="text" value="<?php echo $registros['nombre']; ?>" name="contacto_<?php echo $registros['id']; ?>" class="buscador form-control nombre_contacto" ></td>
               <td> <p><?php echo $registros['telefono']; ?></p> <input type="text" value="<?php echo $registros['telefono']; ?>" name="telefono_<?php echo $registros['id']; ?>" class="buscador form-control telefono_contacto" ></td>
               <td class="editar"> <a href="#" class="editarBtn" >Editar </a> <a href="#" class="guardarBtn" >Guardar </a></td>
               <td class="borrar">
                   <input class="borrar_contactos" type="checkbox" name="<?php echo $registros['id']; ?>"> 
               </td>
             </tr>
             

             <?php  }
               $consul->close(); 
              $conectar->close();
             ?>
             
           </tbody>
         </table>

      </div>

    </div>
     
    <pre>
        <?php echo $error; ?>
      </pre>


  <script src="js/jquery-3.3.1.min.js"></script>
  <script src="js/popper.min.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/app.js"></script>

</body> 
</html>