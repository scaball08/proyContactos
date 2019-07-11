


    <?php 

try {
         
          require_once('funciones/bd_conexion.php');

          $mysql = new Connection();

          $peticionAjax =  $mysql->peticion_ajax();
        
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
        
          $id_c = 0;
          $conexion = $mysql->get_connection();
          // PREPARO LA SENTINCIA PARA la funcion fn_ins_reg
          $prep_statem = $conexion->prepare("select fn_ins_reg(?,?) AS 'id_c'"); 
          //INSERTO LOS PARAMETROS EN LA SENTENCIA PREPARADA
          $prep_statem->bind_param("ss",$nombre,$numero);
          // EJECUTO LA SENTENCIA
           $resp = $prep_statem->execute();
           $prep_statem->bind_result($id_c);
           $prep_statem->fetch();

          if($peticionAjax){
            echo json_encode(array('respuesta'=>$resp,
                                    'nombre'=>$nombre,
                                    'telefono'=>$numero,
                                    'id_c'=>$id_c));
          }else {
            exit;
          }

          $prep_statem->close();
          $conexion->close();

          $error = "Insercion exitosa";

} catch (Exception $e) {
  $error = $e->getMessage();
}

?>

      