delete from Library.Places;
alter table Library.Places auto_increment = 1;

INSERT INTO Library.Places (house, room, bookcase, shelf)
VALUES
    ('Main House', 'Living Room', '1', '1'),
    ('Main House', 'Bedroom', '2', '2'),
    ('Guest House', 'Study Room', '3', '1'),
    ('Office', 'Library', '3', '2');

delete from Library.Books;
alter table Library.Books auto_increment = 1;

INSERT INTO Library.Books (title, publisher, publishing_date, isbn, page_count, place_id, comment)
VALUES
    ('The Great Adventure', 'Adventure Press', '2021-05-15', '9781234567890', 320, 1, 'Signed first edition'),
    ('Mystery of the Lost Island', 'Mystery Books Ltd.', '2020-10-01', '9789876543210', 450, 2, 'Book Club Edition'),
    ('The Science of Everything', 'Academic Press', '2019-03-22', '9781111111111', 550, 3, 'Includes author annotations'),
    ('Historical Chronicles', 'History World', '2022-11-11', '9782222222222', 400, 4, 'First print, hardcover');

delete from Library.Authors;
alter table Library.Authors auto_increment = 1;

INSERT INTO Library.Authors (name)
VALUES
    ('Alice Johnson'),
    ('Bob Smith'),
    ('Clara Williams'),
    ('David Brown');

delete from Library.Editors;
alter table Library.Editors auto_increment = 1;

INSERT INTO Library.Editors (name)
VALUES
    ('Emma Davis'),
    ('Frank Wilson');

delete from Library.BookAuthors;
alter table Library.BookAuthors auto_increment = 1;

-- 'Mystery of the Lost Island' by Clara Williams
INSERT INTO Library.BookAuthors (book_id, author_id) VALUES
                                                 (2, 3),  -- Clara Williams
                                                 (2,1); -- Alice Johnson

-- 'The Science of Everything' by David Brown
INSERT INTO Library.BookAuthors (book_id, author_id) VALUES
    (3, 4);  -- David Brown

delete from Library.BookEditors;
alter table Library.BookEditors auto_increment = 1;

-- 'The Great Adventure' edited by Emma Davis
INSERT INTO Library.BookEditors (book_id, editor_id) VALUES
    (1, 1);  -- Emma Davis

-- 'Historical Chronicles' edited by Frank Wilson
INSERT INTO Library.BookEditors (book_id, editor_id) VALUES
    (4, 2);  -- Frank Wilson


DELETE FROM Library.Users;
ALTER TABLE Library.Users AUTO_INCREMENT = 1;


INSERT INTO Library.Users (username,password)
VALUES
    ('Gipsz Jakab','kiskutya84'),
    ('Derék Hugó','JslfggsH'),
    ('Sánta Krisztina','LaliALilaLo'),
    ('Jenei Gergő','HdgsiGHg3f'),
    ('Ferenc József','Lhsf6sd54');