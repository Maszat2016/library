DROP DATABASE Library;

CREATE DATABASE IF NOT EXISTS Library;

-- Table for storing location (place) details
CREATE TABLE IF NOT EXISTS Library.Places (
    place_id INT AUTO_INCREMENT PRIMARY KEY,   -- Unique identifier for each place
    house VARCHAR(255) NOT NULL,               -- House name or identifier
    room VARCHAR(255) NOT NULL,                -- Room name or identifier
    bookcase INT NOT NULL,            -- Bookcase name or identifier
    shelf INT NOT NULL                -- Shelf name or identifier
);

-- Table for storing book details
CREATE TABLE IF NOT EXISTS  Library.Books (
    book_id INT AUTO_INCREMENT PRIMARY KEY,    -- Unique identifier for each book
    title VARCHAR(255) NOT NULL,               -- Book title
    publisher VARCHAR(255),                    -- Publisher name
    publishing_date INT,                      -- Publishing date
    isbn VARCHAR(13),                          -- ISBN code (13 characters)
    page_count INT,                            -- Number of pages in the book
    place_id INT,                              -- Location of the book (references Places table)
    comment TEXT,                              -- Optional comments or notes about the book
    FOREIGN KEY (place_id) REFERENCES Places(place_id) ON DELETE SET NULL -- Foreign key to Places table
);

-- Table for storing author details
CREATE TABLE IF NOT EXISTS Library.Authors (
    author_id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for each author
    name VARCHAR(255) NOT NULL UNIQUE          -- Author's name
);

-- Table for storing editor details
CREATE TABLE IF NOT EXISTS Library.Editors (
    editor_id INT AUTO_INCREMENT PRIMARY KEY,  -- Unique identifier for each editor
    name VARCHAR(255) NOT NULL UNIQUE          -- Editor's name
);

-- Join table for books and authors (many-to-many relationship)
CREATE TABLE IF NOT EXISTS Library.BookAuthors (
    book_id INT NOT NULL,                      -- Book ID (references Books table)
    author_id INT NOT NULL,                    -- Author ID (references Authors table)
    PRIMARY KEY (book_id, author_id),          -- Composite primary key for uniqueness
    FOREIGN KEY (book_id) REFERENCES Books(book_id) ON DELETE CASCADE,    -- Delete link if book is deleted
    FOREIGN KEY (author_id) REFERENCES Authors(author_id) ON DELETE CASCADE -- Delete link if author is deleted
);

-- Join table for books and editors (one-to-one or one-to-many relationship)
CREATE TABLE IF NOT EXISTS Library.BookEditors (
    book_id INT NOT NULL UNIQUE,               -- Book ID (references Books table)
    editor_id INT NOT NULL,                    -- Editor ID (references Editors table)
    PRIMARY KEY (book_id, editor_id),          -- Composite primary key for uniqueness
    FOREIGN KEY (book_id) REFERENCES Books(book_id) ON DELETE CASCADE,    -- Delete link if book is deleted
    FOREIGN KEY (editor_id) REFERENCES Editors(editor_id) ON DELETE CASCADE -- Delete link if editor is deleted
);

-- Table for users
CREATE TABLE IF NOT EXISTS Library.Users (
    ID INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    isAdmin BOOLEAN DEFAULT false
);
