-- Add category_id to the books table
ALTER TABLE books ADD COLUMN category_id UUID;

-- Create categories table
CREATE TABLE categories (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  name TEXT NOT NULL,
  color TEXT NOT NULL,
  cover_urls TEXT[] NOT NULL
);

-- Add foreign key constraint
ALTER TABLE books ADD CONSTRAINT fk_category FOREIGN KEY (category_id) REFERENCES categories(id);

-- Insert sample categories
INSERT INTO categories (name, color, cover_urls) VALUES
('Anak-anak', '#F7D154', ARRAY['https://example.com/kids1.jpg', 'https://example.com/kids2.jpg', 'https://example.com/kids3.jpg']),
('Remaja', '#9747FF', ARRAY['https://example.com/teens1.jpg', 'https://example.com/teens2.jpg', 'https://example.com/teens3.jpg']),
('Bahasa Dunia', '#2E7D32', ARRAY['https://example.com/world1.jpg', 'https://example.com/world2.jpg', 'https://example.com/world3.jpg']),
('Misteri & Thriller', '#D32F2F', ARRAY['https://example.com/mystery1.jpg', 'https://example.com/mystery2.jpg', 'https://example.com/mystery3.jpg']);

-- Update existing books with category_id (you'll need to adjust these based on your actual book data)
UPDATE books SET category_id = (SELECT id FROM categories WHERE name = 'Anak-anak') WHERE category = 'Kids';
UPDATE books SET category_id = (SELECT id FROM categories WHERE name = 'Remaja') WHERE category = 'Young Adult';
UPDATE books SET category_id = (SELECT id FROM categories WHERE name = 'Bahasa Dunia') WHERE category = 'World Languages';
UPDATE books SET category_id = (SELECT id FROM categories WHERE name = 'Misteri & Thriller') WHERE category = 'Mystery' OR category = 'Thriller';
