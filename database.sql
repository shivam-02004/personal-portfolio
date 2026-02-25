-- ============================================================
--  SHIVAM CHAUHAN — PORTFOLIO DATABASE
--  Run this SQL in phpMyAdmin or MySQL CLI
--  Database: shivam_portfolio
-- ============================================================

CREATE DATABASE IF NOT EXISTS shivam_portfolio CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE shivam_portfolio;

-- ─── PROJECTS ───────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS projects (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  title       VARCHAR(150)  NOT NULL,
  slug        VARCHAR(150)  NOT NULL UNIQUE,
  category    VARCHAR(80)   NOT NULL,
  description TEXT          NOT NULL,
  tech_stack  VARCHAR(255)  NOT NULL,
  emoji       VARCHAR(10)   DEFAULT '🚀',
  live_url    VARCHAR(255)  DEFAULT '#',
  github_url  VARCHAR(255)  DEFAULT '#',
  featured    TINYINT(1)    DEFAULT 0,
  sort_order  INT           DEFAULT 0,
  created_at  TIMESTAMP     DEFAULT CURRENT_TIMESTAMP
);

-- ─── SKILLS ─────────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS skills (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(100) NOT NULL,
  category   VARCHAR(80)  NOT NULL,
  level      INT          DEFAULT 70 CHECK (level BETWEEN 0 AND 100),
  emoji      VARCHAR(10)  DEFAULT '⚙️',
  sort_order INT          DEFAULT 0
);

-- ─── EXPERIENCE ─────────────────────────────────────────────
CREATE TABLE IF NOT EXISTS experience (
  id          INT AUTO_INCREMENT PRIMARY KEY,
  role        VARCHAR(150) NOT NULL,
  company     VARCHAR(150) NOT NULL,
  duration    VARCHAR(80)  NOT NULL,
  description TEXT,
  emoji       VARCHAR(10)  DEFAULT '💼',
  sort_order  INT          DEFAULT 0
);

-- ─── CONTACT MESSAGES ───────────────────────────────────────
CREATE TABLE IF NOT EXISTS messages (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  name       VARCHAR(150) NOT NULL,
  email      VARCHAR(255) NOT NULL,
  subject    VARCHAR(255) NOT NULL,
  message    TEXT         NOT NULL,
  ip_address VARCHAR(50),
  is_read    TINYINT(1)   DEFAULT 0,
  sent_at    TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- ─── PAGE VIEWS (Analytics) ─────────────────────────────────
CREATE TABLE IF NOT EXISTS page_views (
  id         INT AUTO_INCREMENT PRIMARY KEY,
  page       VARCHAR(80)  DEFAULT 'home',
  ip_address VARCHAR(50),
  user_agent TEXT,
  viewed_at  TIMESTAMP    DEFAULT CURRENT_TIMESTAMP
);

-- ============================================================
--  SEED DATA
-- ============================================================

INSERT INTO projects (title, slug, category, description, tech_stack, emoji, live_url, github_url, featured, sort_order) VALUES
(
  'Online Fuel Delivery System',
  'fuel-delivery',
  'Full-Stack Web App',
  'A comprehensive on-demand fuel delivery platform that allows customers to order fuel directly to their location. Features real-time order tracking, multiple fuel types (petrol, diesel, CNG), geo-location based delivery zone detection, driver assignment panel, admin dashboard with analytics, and secure payment gateway integration. Designed to eliminate the hassle of visiting petrol stations.',
  'PHP, MySQL, JavaScript, Google Maps API, Bootstrap, Razorpay',
  '⛽',
  '#',
  '#',
  1,
  1
),
(
  'Wood World',
  'wood-world',
  'E-Commerce Platform',
  'A premium e-commerce platform for handcrafted wooden furniture and home décor. Built with a rich product catalog, advanced filtering by wood type and room, 3D product preview support, custom engraving request system, order management, wishlist, and a seller dashboard for artisans to list their products. Integrates a logistics API for real-time delivery tracking across India.',
  'PHP, MySQL, JavaScript, CSS3, Swiper.js, Stripe API',
  '🪵',
  '#',
  '#',
  1,
  2
),
(
  'Simon Says Game',
  'simon-says',
  'Frontend Game',
  'An interactive memory game with animated UI, sound effects, combo multiplier, and a global leaderboard. Increasing difficulty keeps players engaged through 20+ levels.',
  'HTML, CSS, JavaScript',
  '🎮',
  '#',
  '#',
  0,
  3
),
(
  'Amazon Clone',
  'amazon-clone',
  'Frontend Clone',
  'Pixel-perfect Amazon homepage replica with responsive layout, product cards, hero carousel, category grid, and functional cart UI built entirely with vanilla HTML and CSS.',
  'HTML, CSS',
  '🛒',
  '#',
  '#',
  0,
  4
),
(
  'Spotify Clone',
  'spotify-clone',
  'Frontend Clone',
  'Music player UI with sidebar playlist navigation, now-playing bar, progress scrubber, and responsive dark layout matching Spotify's signature aesthetic.',
  'HTML, CSS, JavaScript',
  '🎵',
  '#',
  '#',
  0,
  5
),
(
  'To Do App',
  'todo-app',
  'JavaScript App',
  'Task management app with add, complete, delete, and filter functionality, persistent localStorage, and smooth animations. Clean and minimal UX.',
  'HTML, CSS, JavaScript',
  '✅',
  '#',
  '#',
  0,
  6
);

INSERT INTO skills (name, category, level, emoji, sort_order) VALUES
('HTML5',       'Frontend', 92, '🌐', 1),
('CSS3',        'Frontend', 88, '🎨', 2),
('JavaScript',  'Frontend', 75, '⚡', 3),
('Bootstrap',   'Frontend', 82, '📦', 4),
('React',       'Frontend', 62, '⚛️', 5),
('PHP',         'Backend',  70, '🐘', 6),
('MySQL',       'Backend',  68, '🗄️', 7),
('Node.js',     'Backend',  58, '🟢', 8),
('Java',        'Language', 65, '☕', 9),
('Python',      'Language', 48, '🐍', 10),
('C++',         'Language', 50, '⚙️', 11),
('Git & GitHub','Tools',    72, '🔧', 12);

INSERT INTO experience (role, company, duration, description, emoji, sort_order) VALUES
(
  'Software Development Intern',
  'IBM Cloud',
  'Oct 2023 · 1 Month',
  'Worked on cloud-based web application development, gaining hands-on experience with IBM Cloud services, REST APIs, and collaborative development practices using Git.',
  '☁️',
  1
),
(
  'Data Analytics Intern',
  'IBM Cloud',
  'Sept 2024 · 1 Month',
  'Analysed large datasets using Python and IBM Watson Studio, created visual dashboards, and delivered actionable insights to support data-driven decision making.',
  '📊',
  2
);

-- ============================================================
--  DONE ✓
-- ============================================================
