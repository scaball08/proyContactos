

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
    <?php 

try {
              require_once('funciones/bd_conexion.php');
  
              $mysql = new Connection();
            
            if ((empty($_POST["nombre"])) || !(isset($_POST["nombre"]))) {
                $nombre = "";

              } else {
                $nombre = $mysql->test_input($_POST["nombre"]);
              }

              if ((empty($_POST["numero"])) || !(isset($_POST["numero"]))) {
                $numero = "";
              } else {
                $numero = $mysql->test_input($_POST["numero"]);
              }
            
              
              $conexion = $mysql->get_connection();
              // PREPARO LA SENTINCIA PARA EL SP
              $prep_statem = $conexion->prepare("CALL co_inser_contacto(?,?)"); 
              //INSERTO LOS PARAMETROS EN LA SENTENCIA PREPARADA
              $prep_statem->bind_param("ss",$nombre,$numero);
              // EJECUTO LA SENTENCIA
              $prep_statem->execute();
              $prep_statem->close();
              $conexion->close();

              $error = "Insercion exitosa";

} catch (Exception $e) {
  $error = $e->getMessage();
}

?>

      <h1>Resultado de insercion</h1>
      
      <pre>
        <?php echo $error;?>
      </pre>

    </div>

    


  <script src="js/jquery.min.js"></script>
  <script src="js/bootstrap.min.js"></script>

</body> 
</html>