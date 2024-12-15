delete from library.places;
alter table library.places auto_increment = 1;

INSERT INTO library.places (house, room, bookcase, shelf)
VALUES
    ('Main House', 'Living Room', 'Bookcase A', 'Top Shelf'),
    ('Main House', 'Bedroom', 'Bookcase B', 'Second Shelf'),
    ('Guest House', 'Study Room', 'Bookcase C', 'Bottom Shelf'),
    ('Office', 'Library', 'Bookcase D', 'Middle Shelf');

delete from library.books;
alter table library.books auto_increment = 1;

INSERT INTO library.books (title, publisher, publishing_date, isbn, page_count, place_id, comment)
VALUES
    ('The Great Adventure', 'Adventure Press', '2021-05-15', '9781234567890', 320, 1, 'Signed first edition'),
    ('Mystery of the Lost Island', 'Mystery Books Ltd.', '2020-10-01', '9789876543210', 450, 2, 'Book Club Edition'),
    ('The Science of Everything', 'Academic Press', '2019-03-22', '9781111111111', 550, 3, 'Includes author annotations'),
    ('Historical Chronicles', 'History World', '2022-11-11', '9782222222222', 400, 4, 'First print, hardcover');

delete from library.authors;
alter table library.authors auto_increment = 1;

INSERT INTO Authors (name)
VALUES
    ('Alice Johnson'),
    ('Bob Smith'),
    ('Clara Williams'),
    ('David Brown');

delete from library.editors;
alter table library.editors auto_increment = 1;

INSERT INTO Editors (name)
VALUES
    ('Emma Davis'),
    ('Frank Wilson');


-- 'Mystery of the Lost Island' by Clara Williams
INSERT INTO BookAuthors (book_id, author_id) VALUES
                                                 (2, 3),  -- Clara Williams
                                                 (2,1); -- Alice Johnson

-- 'The Science of Everything' by David Brown
INSERT INTO BookAuthors (book_id, author_id) VALUES
    (3, 4);  -- David Brown

-- 'The Great Adventure' edited by Emma Davis
INSERT INTO BookEditors (book_id, editor_id) VALUES
    (1, 1);  -- Emma Davis

-- 'Historical Chronicles' edited by Frank Wilson
INSERT INTO BookEditors (book_id, editor_id) VALUES
    (4, 2);  -- Frank Wilson


DELETE FROM TRAVEL_AGENCY.users;
ALTER TABLE TRAVEL_AGENCY.users AUTO_INCREMENT = 1;


INSERT INTO TRAVEL_AGENCY.users (username,password)
VALUES
    ('Gipsz Jakab','kiskutya84'),
    ('Derék Hugó','JslfggsH'),
    ('Sánta Krisztina','LaliALilaLo'),
    ('Jenei Gergő','HdgsiGHg3f'),
    ('Ferenc József','Lhsf6sd54');