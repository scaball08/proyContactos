
<?php 

try {        
              require_once('funciones/bd_conexion.php');
              $mysql = new Connection();

              if ((empty($_GET["id"])) || !(isset($_GET["id"]))) {
                $id_user = "";

              } else {
                $id_user = $mysql->test_input($_GET["id"]);
                $conexion = $mysql->get_connection();
                $query = mysqli_query($conexion,"select * from contactos.contactos where id =" . $id_user);

                if( $f = mysqli_fetch_array($query)){
                  $name = $f['nombre'];
                  $phone =   $f['telefono'];
                  $query->close(); 
                  $conexion->close();  
                }

              }

              
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
      
      <div class="container contenido">
        <h2>Editar contacto</h2>
        <form action="actualizar.php" method="get">

          <div class="form-group container-fluid">
            <label for="nombre">Nombre
              <input type="text" value="<?php echo $name; ?>" class="form-control" name="nombre" id="nombre" placeholder="nombre">
            </label>
          </div>

          <div class="form-group container-fluid ">
            <label for="numero">Número
              <input type="text" value="<?php echo $phone; ?>" class="form-control" name="numero" id="numero" placeholder="numero">
            </label>
          </div>
          <input type="hidden"  name="id" value="<?php echo $id_user; ?>">
          <button type="submit" class="btn btn-primary boton">Editar</button>

          

          
          
        </form>

      </div>


    </div>
     
    <pre>
        <?php echo $error; ?>
      </pre>


  <script src="js/jquery-3.3.1.min.js"></script>
  <script src="js/popper.min.js"></script>
  <script src="js/bootstrap.min.js"></script>

</body> 
</html>