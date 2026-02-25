<?php
// ============================================================
//  contact.php — Contact Form Handler
// ============================================================

header('Content-Type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') { http_response_code(204); exit; }
if ($_SERVER['REQUEST_METHOD'] !== 'POST')    { http_response_code(405); echo json_encode(['success'=>false,'error'=>'Method not allowed']); exit; }

require_once __DIR__ . '/db.php';

// ── Rate limiting (5 messages per IP per hour) ──
$ip  = $_SERVER['HTTP_X_FORWARDED_FOR'] ?? $_SERVER['REMOTE_ADDR'] ?? 'unknown';
$db  = getDB();

$rateCheck = $db->prepare("SELECT COUNT(*) FROM messages WHERE ip_address = ? AND sent_at > DATE_SUB(NOW(), INTERVAL 1 HOUR)");
$rateCheck->execute([$ip]);
if ($rateCheck->fetchColumn() >= 5) {
    http_response_code(429);
    echo json_encode(['success' => false, 'error' => 'Too many messages. Please try again later.']);
    exit;
}

// ── Read & sanitise input ──
$raw     = json_decode(file_get_contents('php://input'), true) ?: $_POST;
$name    = trim(strip_tags($raw['name']    ?? ''));
$email   = trim(strip_tags($raw['email']   ?? ''));
$subject = trim(strip_tags($raw['subject'] ?? ''));
$message = trim(strip_tags($raw['message'] ?? ''));

// ── Validation ──
$errors = [];
if (strlen($name)    < 2)                       $errors[] = 'Name must be at least 2 characters.';
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) $errors[] = 'Please enter a valid email address.';
if (strlen($subject) < 3)                       $errors[] = 'Subject must be at least 3 characters.';
if (strlen($message) < 10)                      $errors[] = 'Message must be at least 10 characters.';
if (strlen($message) > 5000)                    $errors[] = 'Message is too long (max 5000 characters).';

if (!empty($errors)) {
    http_response_code(422);
    echo json_encode(['success' => false, 'errors' => $errors]);
    exit;
}

// ── Save to DB ──
try {
    $stmt = $db->prepare("INSERT INTO messages (name, email, subject, message, ip_address) VALUES (?, ?, ?, ?, ?)");
    $stmt->execute([$name, $email, $subject, $message, $ip]);
    echo json_encode(['success' => true, 'message' => 'Message sent successfully! I\'ll get back to you soon.']);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['success' => false, 'error' => 'Failed to save message. Please try again.']);
}
