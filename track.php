<?php
// ============================================================
//  track.php — Page View Tracker (called on each page load)
// ============================================================

header('Content-Type: application/json');

require_once __DIR__ . '/db.php';

$db   = getDB();
$ip   = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$ua   = $_SERVER['HTTP_USER_AGENT'] ?? '';
$page = trim(strip_tags($_GET['page'] ?? 'home'));

try {
    $stmt = $db->prepare("INSERT INTO page_views (page, ip_address, user_agent) VALUES (?, ?, ?)");
    $stmt->execute([$page, $ip, $ua]);

    // Return total views for this page
    $count = $db->prepare("SELECT COUNT(*) FROM page_views WHERE page = ?");
    $count->execute([$page]);
    echo json_encode(['success' => true, 'views' => (int)$count->fetchColumn()]);
} catch (PDOException $e) {
    echo json_encode(['success' => false]);
}
