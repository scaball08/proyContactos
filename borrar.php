

    <?php 

try {
             

              require_once('funciones/bd_conexion.php');
  
              $mysql = new Connection();

               $peticionAjax =  $mysql->peticion_ajax();

              if ((empty($_GET["id"])) || !(isset($_GET["id"]))) {
                $id_user = "";

              } else {
                $id_user = $mysql->test_input($_GET["id"]);
              }
            
            
            
              
              $conexion = $mysql->get_connection();
              // PREPARO LA SENTINCIA PARA EL SP
              $prep_statem = $conexion->prepare("CALL sp_elim_contac(?)"); 
              //INSERTO LOS PARAMETROS EN LA SENTENCIA PREPARADA
              $prep_statem->bind_param("s",$id_user);
              // EJECUTO LA SENTENCIA
               $resp = $prep_statem->execute();

               if ($peticionAjax) {
                 echo json_encode(array('respuesta'=>$resp));
               }else{
                exit;
               }

              $prep_statem->close();
              $conexion->close();

              $error = "Eliminacion exitosa";

} catch (Exception $e) {
  $error = $e->getMessage();
}

?>

     