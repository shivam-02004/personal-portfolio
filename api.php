<?php
// ============================================================
//  api.php — Portfolio Data API
//  Returns JSON data for projects, skills, experience
// ============================================================

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');

require_once __DIR__ . '/db.php';

$action = $_GET['action'] ?? 'all';
$db     = getDB();

try {
    switch ($action) {

        case 'projects':
            $stmt = $db->query("SELECT * FROM projects ORDER BY sort_order ASC");
            echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
            break;

        case 'skills':
            $stmt = $db->query("SELECT * FROM skills ORDER BY sort_order ASC");
            echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
            break;

        case 'experience':
            $stmt = $db->query("SELECT * FROM experience ORDER BY sort_order ASC");
            echo json_encode(['success' => true, 'data' => $stmt->fetchAll()]);
            break;

        case 'all':
        default:
            $projects   = $db->query("SELECT * FROM projects ORDER BY sort_order ASC")->fetchAll();
            $skills     = $db->query("SELECT * FROM skills ORDER BY sort_order ASC")->fetchAll();
            $experience = $db->query("SELECT * FROM experience ORDER BY sort_order ASC")->fetchAll();
            echo json_encode([
                'success'    => true,
                'projects'   => $projects,
                'skills'     => $skills,
                'experience' => $experience
            ]);
            break;
    }
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Query failed.']);
}
