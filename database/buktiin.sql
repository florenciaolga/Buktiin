-- Create Database
CREATE DATABASE IF NOT EXISTS buktiin;
USE buktiin;

-- Users Table
CREATE TABLE users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    profile_image VARCHAR(255),
    is_worker BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Worker Profiles Table
CREATE TABLE worker_profiles (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    location VARCHAR(255),
    base_price DECIMAL(10, 2),
    description TEXT,
    rating DECIMAL(2, 1) DEFAULT 0.0,
    total_jobs INT DEFAULT 0,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Skills/Tags Table
CREATE TABLE skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(100) UNIQUE NOT NULL,
    category VARCHAR(100),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Worker Skills Junction Table
CREATE TABLE worker_skills (
    id INT AUTO_INCREMENT PRIMARY KEY,
    worker_profile_id INT NOT NULL,
    skill_id INT NOT NULL,
    FOREIGN KEY (worker_profile_id) REFERENCES worker_profiles(id) ON DELETE CASCADE,
    FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
    UNIQUE KEY unique_worker_skill (worker_profile_id, skill_id)
);

-- Portfolio/Photos Table
CREATE TABLE portfolio (
    id INT AUTO_INCREMENT PRIMARY KEY,
    worker_profile_id INT NOT NULL,
    image_url VARCHAR(255) NOT NULL,
    title VARCHAR(255),
    description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (worker_profile_id) REFERENCES worker_profiles(id) ON DELETE CASCADE
);

-- Jobs/Orders Table
CREATE TABLE jobs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    customer_id INT NOT NULL,
    worker_id INT NOT NULL,
    title VARCHAR(255) NOT NULL,
    description TEXT,
    location VARCHAR(255),
    service_fee DECIMAL(10, 2) NOT NULL,
    platform_fee DECIMAL(10, 2) NOT NULL,
    total_amount DECIMAL(10, 2) NOT NULL,
    status ENUM('pending', 'accepted', 'in_progress', 'completed', 'cancelled') DEFAULT 'pending',
    payment_method VARCHAR(50),
    payment_status ENUM('unpaid', 'paid', 'refunded') DEFAULT 'unpaid',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    completed_at TIMESTAMP NULL,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (worker_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Reviews Table
CREATE TABLE reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    job_id INT NOT NULL,
    customer_id INT NOT NULL,
    worker_id INT NOT NULL,
    rating INT CHECK (rating >= 1 AND rating <= 5),
    comment TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (job_id) REFERENCES jobs(id) ON DELETE CASCADE,
    FOREIGN KEY (customer_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (worker_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Messages Table
CREATE TABLE messages (
    id INT AUTO_INCREMENT PRIMARY KEY,
    sender_id INT NOT NULL,
    receiver_id INT NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (sender_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (receiver_id) REFERENCES users(id) ON DELETE CASCADE
);

-- Favorites/Likes Table
CREATE TABLE favorites (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    worker_id INT NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    FOREIGN KEY (worker_id) REFERENCES users(id) ON DELETE CASCADE,
    UNIQUE KEY unique_favorite (user_id, worker_id)
);

-- Insert Sample Skills
INSERT INTO skills (name, category) VALUES
('#PenjahitBaju', 'Tailoring'),
('#PenjahitBajuAnak', 'Tailoring'),
('#PenjahitBajuPernikahan', 'Tailoring'),
('#PenjahitBajuAnabul', 'Tailoring'),
('#PenjahitOtodidak', 'Tailoring'),
('#ServiceAC', 'Home Service'),
('#TukangKayu', 'Construction'),
('#Fotografer', 'Creative'),
('#DesainGrafis', 'Creative'),
('#LesPrivate', 'Education'),
('#SharingMoms', 'Community'),
('#MomOfThree', 'Community'),
('#PenjahitProfesional', 'Tailoring'),
('#PenjahitPayet', 'Tailoring'),
('#PembeliKain', 'Shopping'),
('#PenjahitPria', 'Tailoring'),
('#PenjahitFullTime', 'Tailoring'),
('#PenjahitGaun', 'Tailoring'),
('#PenjahitModern', 'Tailoring'),
('#PenjahitPerempuan', 'Tailoring'),
('#PenjahitSantai', 'Tailoring'),
('#PenjahitKebaya', 'Tailoring');

-- Insert Sample User (Password: password123)
INSERT INTO users (name, email, password, phone, is_worker) VALUES
('Florentina Olivia', 'florentina@example.com', '$2b$10$XqJY8P.zF5xH9ZqGqH5Uu.rVZx3VxZH6yVxZH6yVxZH6yVxZH6yVx', '081234567890', TRUE),
('John Customer', 'john@example.com', '$2b$10$XqJY8P.zF5xH9ZqGqH5Uu.rVZx3VxZH6yVxZH6yVxZH6yVxZH6yVx', '081234567891', FALSE);

-- Insert Sample Worker Profile
INSERT INTO worker_profiles (user_id, location, base_price, description, rating, total_jobs) VALUES
(1, 'Batu Putu, Bandarlampung', 50000, 'Penjahit berpengalaman dengan spesialisasi baju anak dan dewasa', 4.9, 80);

-- Insert Sample Worker Skills
INSERT INTO worker_skills (worker_profile_id, skill_id) VALUES
(1, 1), (1, 2), (1, 3), (1, 4), (1, 5), (1, 11), (1, 12);

-- Create Indexes for Better Performance
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_worker_profiles_user_id ON worker_profiles(user_id);
CREATE INDEX idx_jobs_customer_id ON jobs(customer_id);
CREATE INDEX idx_jobs_worker_id ON jobs(worker_id);
CREATE INDEX idx_messages_sender ON messages(sender_id);
CREATE INDEX idx_messages_receiver ON messages(receiver_id);
CREATE INDEX idx_reviews_worker ON reviews(worker_id);
CREATE INDEX idx_favorites_user ON favorites(user_id);
CREATE INDEX idx_favorites_worker ON favorites(worker_id);