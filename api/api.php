<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE");
header("Access-Control-Allow-Headers: Content-Type");

include 'db.php';
include 'Invitados.php';

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        handleGet($conn);
        break;
    case 'POST':
        handlePost($conn);
        break;
    case 'PUT':
        handlePut($conn);
        break;
    case 'DELETE':        
        handleDelete($conn);
        break;
    default:
        echo json_encode(['message' => 'Método no permitido']);
        break;
}

// Este método me devuelve un invitado o todos los invitados
function handleGet($conn) 
{
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if ($id > 0) 
    {
        $stmt = $conn->prepare("SELECT * FROM invitados WHERE id = ?");
        $stmt->execute([$id]);
        $invitado = $stmt->fetch(PDO::FETCH_ASSOC);

        if ($invitado) 
        {
            $invitadoObj = Invitados::fromArray($invitado);
            echo json_encode($invitadoObj->toArray());
        } 
        else 
        {
            http_response_code(404);
            echo json_encode(['message' => 'No se encontraron datos']);
        }
    } 
    else 
    {
        $stmt = $conn->query("SELECT * FROM invitados");
        $invitados = $stmt->fetchAll(PDO::FETCH_ASSOC);
        $invitadoObjs = array_map(fn($invitado) => Invitados::fromArray($invitado)->toArray(), $invitados);
        echo json_encode(['invitados' => $invitadoObjs]);
    }
}

// Este método es para ingresar invitados
function handlePost($conn) 
{
    if ($conn === null) 
    {
        echo json_encode(['message' => 'Error en la conexión a la base de datos']);
        return;
    }

    $data = json_decode(file_get_contents('php://input'), true);

    $requiredFields = ['apellido', 'nombre', 'email'];

    foreach ($requiredFields as $field) 
    {
        if (!isset($data[$field])) 
        {
            echo json_encode(['message' => 'Datos del invitado incompletos']);
            return;
        }
    }

    $invitado = Invitados::fromArray($data);

    try 
    {
        $stmt = $conn->prepare("INSERT INTO invitados (apellido, nombre, email) VALUES (?, ?, ?)");
        $stmt->execute([
            $invitado->apellido,
            $invitado->nombre,
            $invitado->email
        ]);

        echo json_encode(['message' => 'Invitado ingresado correctamente']);
    } 
    catch (PDOException $e) 
    {
        echo json_encode(['message' => 'Error al ingresar el invitado', 'error' => $e->getMessage()]);
    }
}

// Este método es para actualizar invitados
function handlePut($conn) 
{
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if ($id > 0) 
    {
        $data = json_decode(file_get_contents('php://input'), true);
        $invitado = Invitados::fromArray($data);
        $invitado->id = $id;

        $fields = [];
        $params = [];

        if ($invitado->apellido !== null) 
        {
            $fields[] = 'apellido = ?';
            $params[] = $invitado->apellido;
        }
        if ($invitado->nombre !== null) {
            $fields[] = 'nombre = ?';
            $params[] = $invitado->nombre;
        }
        if ($invitado->email !== null) {
            $fields[] = 'email = ?';
            $params[] = $invitado->email;
        }

        if (!empty($fields)) 
        {
            $params[] = $id;
            $stmt = $conn->prepare("UPDATE invitados SET " . implode(', ', $fields) . " WHERE id = ?");
            $stmt->execute($params);
            echo json_encode(['message' => 'Invitado actualizado con éxito']);
        } 
        else 
        {
            echo json_encode(['message' => 'No hay campos para actualizar']);
        }
    } 
    else 
    {
        echo json_encode(['message' => 'ID no proporcionado']);
    }
}

// Método para borrar registros
function handleDelete($conn) 
{
    $id = isset($_GET['id']) ? intval($_GET['id']) : 0;

    if ($id > 0) 
    {
        $stmt = $conn->prepare("DELETE FROM invitados WHERE id = ?");
        $stmt->execute([$id]);
        echo json_encode(['message' => 'Invitado eliminado con éxito']);
    } 
    else 
    {
        echo json_encode(['message' => 'ID no proporcionado']);
    }
}
?>
