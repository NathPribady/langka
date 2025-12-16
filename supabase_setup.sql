-- Create the books table
CREATE TABLE books (
  id SERIAL PRIMARY KEY,
  title TEXT NOT NULL,
  author TEXT NOT NULL,
  category TEXT NOT NULL,
  image_url TEXT NOT NULL
);

-- Insert dummy data
INSERT INTO books (title, author, category, image_url) VALUES
('The Great Gatsby', 'F. Scott Fitzgerald', 'Fiction', 'https://example.com/great_gatsby.jpg'),
('To Kill a Mockingbird', 'Harper Lee', 'Fiction', 'https://example.com/mockingbird.jpg'),
('1984', 'George Orwell', 'Science Fiction', 'https://example.com/1984.jpg'),
('Pride and Prejudice', 'Jane Austen', 'Romance', 'https://example.com/pride_prejudice.jpg'),
('The Hobbit', 'J.R.R. Tolkien', 'Fantasy', 'https://example.com/hobbit.jpg'),
('Dune', 'Frank Herbert', 'Science Fiction', 'https://example.com/dune.jpg'),
('The Catcher in the Rye', 'J.D. Salinger', 'Fiction', 'https://example.com/catcher_rye.jpg'),
('Jane Eyre', 'Charlotte Brontë', 'Romance', 'https://example.com/jane_eyre.jpg'),
('The Lord of the Rings', 'J.R.R. Tolkien', 'Fantasy', 'https://example.com/lotr.jpg'),
('Brave New World', 'Aldous Huxley', 'Science Fiction', 'https://example.com/brave_new_world.jpg');

-- Create an index for faster searching
CREATE INDEX idx_books_title ON books USING GIN (to_tsvector('english', title));
CREATE INDEX idx_books_author ON books USING GIN (to_tsvector('english', author));
CREATE INDEX idx_books_category ON books (category);
