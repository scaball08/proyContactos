


    <?php 

try {
              require_once('funciones/bd_conexion.php');
  
              $mysql = new Connection();

              $peticionAjax =  $mysql->peticion_ajax();
               $datos = $_GET['datos'];

               // convertir de json string a un array con:
               // json_decode(json_string,array_assoc : true o false)
               $datos =  json_decode($datos,true);


              if ((empty($datos["id"])) || !(isset($datos["id"]))) {
                $id_user = "";

              } else {
                $id_user = $mysql->test_input($datos["id"]);
              }
            
            if ((empty($datos["nombre"])) || !(isset($datos["nombre"]))) {
                $nombre = "";

              } else {
                $nombre = $mysql->test_input($datos["nombre"]);
              }

              if ((empty($datos["telefono"])) || !(isset($datos["telefono"]))) {
                $numero = "";
              } else {
                $numero = $mysql->test_input($datos["telefono"]);
              }
            
              
              $conexion = $mysql->get_connection();
              // PREPARO LA SENTINCIA PARA EL SP
              $prep_statem = $conexion->prepare("CALL sp_modif_contac(?,?,?)"); 
              //INSERTO LOS PARAMETROS EN LA SENTENCIA PREPARADA
              $prep_statem->bind_param("iss",$id_user,$nombre,$numero);
              // EJECUTO LA SENTENCIA
              // EJECUTO LA SENTENCIA
               $resp = $prep_statem->execute();

               if ($peticionAjax) {
                 echo json_encode(array('respuesta'=>$resp,
                                         'nombre'=>$nombre,
                                          'telefono'=>$numero));
               }else{
                exit;
               }
              $prep_statem->close();
              $conexion->close();

              $error = "ACTUALIZACION exitosa";

} catch (Exception $e) {
  $error = $e->getMessage();
}

?>
