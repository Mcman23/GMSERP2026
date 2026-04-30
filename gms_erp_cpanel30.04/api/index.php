<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: GET, POST, PUT, DELETE, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type, Authorization");
header("Content-Type: application/json");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    exit;
}

require_once 'config.php';
$db = get_db_connection();

$method = $_SERVER['REQUEST_METHOD'];
$entity = isset($_GET['entity']) ? $_GET['entity'] : null;
$id = isset($_GET['id']) ? $_GET['id'] : null;

switch ($method) {
    case 'GET':
        if ($id) {
            $stmt = $db->prepare("SELECT * FROM app_data WHERE id = ?");
            $stmt->execute([$id]);
            $row = $stmt->fetch(PDO::FETCH_ASSOC);
            if ($row) {
                $data = json_decode($row['data'], true);
                echo json_encode(array_merge(['id' => $row['id'], 'created_date' => $row['created_at']], $data));
            } else {
                echo json_encode(null);
            }
        } elseif ($entity) {
            $stmt = $db->prepare("SELECT * FROM app_data WHERE entity_type = ? ORDER BY created_at DESC");
            $stmt->execute([$entity]);
            $results = [];
            while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
                $data = json_decode($row['data'], true);
                $results[] = array_merge(['id' => $row['id'], 'created_date' => $row['created_at']], $data);
            }
            echo json_encode($results);
        }
        break;

    case 'POST':
        $input = json_decode(file_get_contents('php://input'), true);
        if (isset($input['entity_type']) && isset($input['data'])) {
            $stmt = $db->prepare("INSERT INTO app_data (entity_type, data) VALUES (?, ?)");
            $stmt->execute([$input['entity_type'], json_encode($input['data'])]);
            $newId = $db->lastInsertId();
            echo json_encode(['id' => $newId, 'success' => true]);
        }
        break;

    case 'PUT':
        $input = json_decode(file_get_contents('php://input'), true);
        if ($id && isset($input['data'])) {
            $stmt = $db->prepare("UPDATE app_data SET data = ? WHERE id = ?");
            $stmt->execute([json_encode($input['data']), $id]);
            echo json_encode(['success' => true]);
        }
        break;

    case 'DELETE':
        if ($id) {
            $stmt = $db->prepare("DELETE FROM app_data WHERE id = ?");
            $stmt->execute([$id]);
            echo json_encode(['success' => true]);
        }
        break;
}
