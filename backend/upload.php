<?php 
header("Content-Type: application/json; charset=utf-8");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: PUT, GET, POST");

$response = array();
$upload_dir = "uploads/";
$server_url = "http://127.0.0.1:8000";
$file= json_decode(file_get_contents("php://input"), true);

if($file) {
    $link= $file["file"]["link"];

    if ($link) {
        $name= $file["file"]["name"];
        $upload_path = $upload_dir.basename($name);
        $content=file_get_contents($link);
    
        if (file_put_contents($upload_path, $content )) {
            $response = array(
            "status" => "success",
                "error" => false,
                "message" => "File uploaded successfully",
            );
        } else {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
        }
    } else {
        $response = array(
            "status" => "error",
            "error" => true,
            "message" => "Error uploading the file!"
        );
    }     

} else if($_FILES["file"]) {
        $file_name = $_FILES["file"]["tmp_name"];
        $error = $_FILES["file"]["error"];
    
        if($error > 0) {
            $response = array(
                "status" => "error",
                "error" => true,
                "message" => "Error uploading the file!"
            );
        } else {
            $upload_path = $upload_dir.basename($_FILES["file"]["name"]);
        
            if(move_uploaded_file($file_name , $upload_path)) {
                $response = array(
                    "status" => "success",
                    "error" => false,
                    "message" => "File uploaded successfully"
                  );
            } else {
                $response = array(
                    "status" => "error",
                    "error" => true,
                    "message" => "Error uploading the file!"
                );
            }
        }
} else {
    $response = array(
        "status" => "error",
        "error" => true,
        "message" => "Error uploading the file!"
    );
       
}
echo json_encode($response); 
?>
