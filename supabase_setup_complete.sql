-- First, drop the existing table if it exists
DROP TABLE IF EXISTS books;

-- Create the books table with all required fields
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL,
  url TEXT,
  reading_time_hours INTEGER,
  is_featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW())
);

-- Insert sample data
INSERT INTO books (title, author, category, image_url, url, reading_time_hours, is_featured) VALUES
('Run: Book One', 'John Lewis', 'Graphic Novel', 'https://example.com/run.jpg', 'https://example.com/read/run', 8, true),
('Lazarus Man', 'Richard Price', 'Fiction', 'https://example.com/lazarus.jpg', 'https://example.com/read/lazarus', 12, false),
('Long Island Compromise', 'Taffy Brodesser-Akner', 'Fiction', 'https://example.com/long-island.jpg', 'https://example.com/read/long-island', 15, false),
('Someone Like Us', 'Dinaw Mengestu', 'Fiction', 'https://example.com/someone.jpg', 'https://example.com/read/someone', 8, false),
('The Demon of Unrest', 'Erik Larson', 'Non-Fiction', 'https://example.com/demon.jpg', 'https://example.com/read/demon', 17, false),
('Memory Piece', 'Lisa Ko', 'Fiction', 'https://example.com/memory.jpg', 'https://example.com/read/memory', 10, false);
