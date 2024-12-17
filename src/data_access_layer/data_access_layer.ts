import * as mysql from 'mysql2/promise'

//types for the database
export type Book = {
    book_id: number,
    title: string,
    authors: string,
    editor: string,
    publisher: string,
    publishing_date: number,
    isbn: string,
    page_count: number,
    house: string,
    room: string,
    bookcase: number,
    shelf: number,
    comment: string;
};

export type BookAuthor = {
    book_id: number,
    title: string,
    authors: string
    publisher: string,
    publishing_date: number,
    isbn: string,
    page_count: number,
    house: string,
    room: string,
    bookcase: number,
    shelf: number,
    comment: string;
}

export type BookEditor = {
    book_id: number,
    title: string,
    editor: string
    publisher: string,
    publishing_date: number,
    isbn: string,
    page_count: number,
    house: string,
    room: string,
    bookcase: number,
    shelf: number,
    comment: string;
}

export type Place = {
    place_id: number,
    house: string,
    room: string,
    bookcase: number,
    shelf: number;
};

export type Author = {
    author_id: number,
    name: string;
};

export type Editor = {
    editor_id: number,
    name: string;
};

export type User = {
    user_id : number,
    username : string,
    password : string,
    isAdmin : boolean
};

export type BookFilter = {
    title?: string,
    author?: string,
    editor?: string,
    publisher?: string,
    page_count?: number,
    house?: string,
    comment?: string;
}

export class DataAccessLayer {
    private _connection: mysql.Connection;

    //connection to the database
    async initConnection(dbUser:string, dbPassword: string, dbHost: string, dbPort: number) {
        const ConnectionOptions: mysql.ConnectionOptions = {
            user: dbUser,
            password: dbPassword,
            host: dbHost,
            port: dbPort,
        }

        this._connection = await mysql.createConnection(ConnectionOptions);
    }

    async endConnection(){
        await this._connection.end();
    }

    //Users
    async getAllUsers() : Promise<User[]>{
        const users : User[] = [];

        const sql: string = `
            SELECT user_id,username,password,isAdmin
            FROM Library.Users`
        ;

        const [rows, fields] = await this._connection.query<mysql.RowDataPacket[]>(sql);

        rows.forEach((row) => {
            let user: User = {
                user_id: row.user_id,
                username: row.username,
                password: row.password,
                isAdmin: row.isAdmin
            }

            users.push(user);
        });

        return users;
    }

    async addUser(username: string, password: string, isAdmin: boolean) {
        try{
            const sql: string = `
                INSERT INTO Library.Users (username, password, isAdmin)
                VALUES (?,?,?)
            `;

            const [result]: [mysql.ResultSetHeader, any] = await this._connection.query(sql, [username, password, isAdmin]);

            return {
                user_id: result.insertId,
                username,
                isAdmin
            };
        }
        catch (error) {
            console.error(error);
        }
    }

    async getUserById(id: number) : Promise<User | null>{
        try{
            const sql : string = `
             SELECT user_id,username,email,password,isAdmin FROM Library.Users
             WHERE user_id = ?;
           `;

            const [rows,fields] =  await this._connection.query<mysql.RowDataPacket[]>(sql,[id]);

            if(rows.length == 0){
                return null;
            }
            else{
                let row = rows[0];
                let user : User = {
                    user_id : row.user_id,
                    username : row.username,
                    password : row.password,
                    isAdmin : row.isAdmin
                };
                return user;
            }

        }
        catch(e){
            console.log(e);
            return null;

        }
    }

    async getUserByUsername(username : string) {
        const sql = 'SELECT * FROM Library.Users WHERE username = ?';
        const [rows] = await this._connection.query(sql, [username]);
        return rows[0] || null;
    }

    async updateUser(user : User){
        try{
            const sql : string = `
            UPDATE Library.Users SET
                username = ?,
                password = ?,
                isAdmin = ?
            WHERE
                user_id = ?
           `;

            await this._connection.query(sql,[user.username,user.password,user.isAdmin,user.user_id]);
        }
        catch(e){
            console.log(e);
        }
    }

    async deleteUser(id : number){
        try{
            const sql : string = `
            DELETE FROM Library.Users
            WHERE user_id = ?
           `;

            await this._connection.query(sql,[id]);

        }
        catch(e){
            console.log(e);
        }
    }

    //Authors

    async getAllAuthors(){
        const authors: Author[] = [];

        const sql: string = `
            SELECT author_id, name
            FROM Library.Authors
        `;

        const [rows, fields] = await this._connection.query<mysql.RowDataPacket[]>(sql);

        rows.forEach((row) => {
            let author: Author = {
                author_id: row.author_id,
                name: row.name
            }

            authors.push(author);
        });

        return authors;
    }

    async getAuthorById(id: number) : Promise<Author | null> {
        try{
            const sql : string = `
                SELECT author_id, name
                FROM Library.Authors
                WHERE author_id = ?;
            `

            const [rows, fields] = await this._connection.query<mysql.RowDataPacket[]>(sql,[id]);

            if(rows.length == 0){
                return null;
            }

            else{
                let x = rows[0];
                let author: Author = {
                    author_id: x.author_id,
                    name: x.name
                };
                return author;
            }
        }
        catch(e){
            console.log(e);
            return null;
        }
    }

    async getAuthorId(name: string) : Promise<number | null> {
        try{
            const sql : string = `
                SELECT author_id
                FROM Library.Authors
                WHERE name = ?;
            `
            const [rows, fields] = await this._connection.query<mysql.RowDataPacket[]>(sql,[name]);
            if(rows.length == 0){
                return null;
            }
            else{
                let x = rows[0];
                let author_id = x.author_id;
                return author_id;
            }
        }
        catch(e){
            console.log(e);
            return null;
        }
    }

    async addAuthor(name:string){
        try {
            const sql : string = `
                INSERT INTO Library.Authors (name)
                VALUES(?)
                ON DUPLICATE KEY UPDATE name = ?;
            `;

            await this._connection.query(sql,[name, name]);
        }
        catch(e){
            console.log(e);
        }
    }

    async updateAuthor(author : Author){
        try{
            const sql : string = `
                UPDATE Library.Authors SET
                    name = ?
                WHERE 
                    author_id = ?;
            `

            await this._connection.query(sql,[author.name, author.author_id]);
        }
        catch(e){
            console.log(e);
        }
    }

    async deleteAuthor(id : number){
        try{
            const sql : string = `
                DELETE FROM Library.Authors 
                WHERE author_id = ?;
            `

            await this._connection.query(sql,[id]);
        }
        catch(e){
            console.log(e);
        }
    }

    //Editors

    async getAllEditors(){
        const editors: Editor[] = [];

        const sql: string = `
            SELECT editor_id, name
            FROM Library.Editors
        `

        const [rows, fields] = await this._connection.query<mysql.RowDataPacket[]>(sql);

        rows.forEach((row) => {
            let editor: Editor = {
                editor_id: row.author_id,
                name: row.name
            }

            editors.push(editor);
        });

        return editors;
    }

    async getEditorById(id: number) : Promise<Editor | null> {
        try{
            const sql : string = `
                SELECT editor_id, name
                FROM Library.Editors
                WHERE editor_id = ?;
            `

            const [rows, fields] = await this._connection.query<mysql.RowDataPacket[]>(sql,[id]);

            if(rows.length == 0){
                return null;
            }

            else{
                let x = rows[0];
                let editor: Editor = {
                    editor_id: x.editor_id,
                    name: x.name
                };
                return editor;
            }
        }
        catch(e){
            console.log(e);
            return null;
        }
    }

    async getEditorId(name: string) : Promise<number | null> {
        try{
            const sql : string = `
                SELECT editor_id
                FROM Library.Editors
                WHERE name = ?;
            `
            const [rows, fields] = await this._connection.query<mysql.RowDataPacket[]>(sql,[name]);
            if(rows.length == 0){
                return null;
            }
            else{
                let x = rows[0];
                let editor_id = x.editor_id;
                return editor_id;
            }
        }
        catch(e){
            console.log(e);
            return null;
        }
    }

    async addEditor(name:string){
        try {
            const sql : string = `
                INSERT INTO Library.Editors (name)
                VALUES(?)
                ON DUPLICATE KEY UPDATE name = ?;
            `;

            await this._connection.query(sql,[name]);
        }
        catch(e){
            console.log(e);
        }
    }

    async updateEditor(editor : Editor){
        try{
            const sql : string = `
                UPDATE Library.Editors SET
                    name = ?
                WHERE 
                    editor_id = ?;
            `

            await this._connection.query(sql,[editor.name, editor.editor_id]);
        }
        catch(e){
            console.log(e);
        }
    }

    async deleteEditor(id : number){
        try{
            const sql : string = `
                DELETE FROM Library.Editors 
                WHERE editor_id = ?;
            `

            await this._connection.query(sql,[id]);
        }
        catch(e){
            console.log(e);
        }
    }

    //Places

    async getAllPlaces(){
        const places: Place[] = [];

        const sql: string = `
            SELECT place_id, house, room, bookcase, shelf
            FROM Library.Places
        `

        const [rows, fields] = await this._connection.query<mysql.RowDataPacket[]>(sql);

        rows.forEach((row) => {
            let place: Place = {
                place_id: row.place_id,
                house: row.house,
                room: row.room,
                bookcase: row.bookcase,
                shelf: row.shelf
            }
            places.push(place);
        });

        return places;
    }

    async addPlace(house: string, room: string, bookcase: number, shelf: number){
        try{
            const sql : string = `
                INSERT INTO Library.Places (house, room, bookcase, shelf)
                SELECT * FROM (SELECT ?, ?, ?, ?) AS tmp
                WHERE NOT EXISTS (
                    SELECT 1 
                    FROM Library.Places 
                    WHERE house = ? AND room = ? AND bookcase = ? AND shelf = ?
                );
            `

            await this._connection.query(sql,[house, room, bookcase, shelf, house, room, bookcase, shelf]);
        }
        catch(e){
            console.log(e);
        }
    }

    async getPlaceId(house: string, room: string, bookcase: number, shelf: number):Promise<number | null> {
        try{
            const sql : string = `
                SELECT place_id 
                FROM Library.Places 
                WHERE house = ? AND room = ? AND bookcase = ? AND shelf = ?;
            `;

            const [rows, fields] =  await this._connection.query<mysql.RowDataPacket[]>(sql,[house, room, bookcase, shelf]);

            if(rows.length == 0){
                return null;
            }
            else{
                let row = rows[0];
                let place_id = row.place_id;
                return place_id;
            }
        }
        catch(e){
            console.log(e);
            return null;
        }
    }

    //Book connections
    async addBookAuthor(book_id: number, author_id: number){
        try{
            const sql : string = `
                INSERT INTO Library.BookAuthors (book_id, author_id)
                SELECT * FROM (SELECT ? AS c1, ? AS c2) AS tmp
                WHERE NOT EXISTS (
                    SELECT 1 
                    FROM Library.BookAuthors 
                    WHERE book_id = ? AND author_id = ?);
            `

            await this._connection.query(sql,[book_id, author_id, book_id, author_id]);
        }
        catch(e){
            console.log(e);
        }
    }

    async deleteBookAuthor(book_id: number){
        try{
            const sql : string = `
                DELETE FROM Library.BookAuthors 
                WHERE book_id = ?;
            `;

            await this._connection.query(sql,[book_id]);
        }
        catch (e){
            console.log(e);
        }
    }

    async addBookEditor(book_id: number, editor_id: number){
        try{
            const sql : string = `
                INSERT INTO Library.BookAuthors (book_id, editor_id)
                SELECT * FROM (SELECT ? AS c1, ? AS c2) AS tmp
                WHERE NOT EXISTS (
                    SELECT 1 
                    FROM Library.BookAuthors 
                    WHERE book_id = ? AND editor_id = ?);
            `

            await this._connection.query(sql,[book_id, editor_id]);
        }
        catch(e){
            console.log(e);
        }
    }

    async deleteBookEditor(book_id: number){
        try{
            const sql : string = `
                DELETE FROM Library.BookEditors 
                WHERE book_id = ?;
            `;

            await this._connection.query(sql,[book_id]);
        }
        catch (e){
            console.log(e);
        }
    }

    //Books
    async getAllBooks(){
        const books: Book[] = [];

        const sql: string = `
            SELECT
                b.title,
                GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS authors,
                e.name AS editor,
                b.publisher,
                b.publishing_date,
                b.isbn,
                b.page_count,
                p.house,
                p.room,
                p.bookcase,
                p.shelf,
                b.comment
            FROM Library.Books b
            LEFT JOIN Library.BookAuthors ba ON b.book_id = ba.book_id
            LEFT JOIN Library.Authors a ON ba.author_id = a.author_id
            LEFT JOIN Library.BookEditors be ON b.book_id = be.book_id
            LEFT JOIN Library.Editors e ON be.editor_id = e.editor_id
            LEFT JOIN Library.Places p ON b.place_id = p.place_id
            group by b.book_id;
        `

        const [rows, fileds] = await this._connection.query<mysql.RowDataPacket[]>(sql);

        rows.forEach((row) => {
            let book: Book = {
                book_id: row.book_id,
                title: row.title,
                authors: row.authors,
                editor: row.editor,
                publisher: row.publisher,
                publishing_date: row.publishing_date,
                isbn: row.isbn,
                page_count: row.page_count,
                house: row.house,
                room: row.room,
                bookcase: row.bookcase,
                shelf: row.shelf,
                comment: row.comment
            };
            books.push(book);
        })

        return books;
    }

    async getAllBooksWithAuthors() {
        const books: BookAuthor[] = [];

        const sql: string = `
            SELECT 
                b.book_id,
                b.title,
                GROUP_CONCAT(a.name SEPARATOR ', ') AS authors,
                b.publisher,
                b.publishing_date,
                b.isbn,
                b.page_count,
                p.house,
                p.room,
                p.bookcase,
                p.shelf,
                b.comment
            FROM Library.Books b
            LEFT JOIN Library.Places p ON b.place_id = p.place_id
            JOIN Library.BookAuthors ba ON b.book_id = ba.book_id
            JOIN Library.Authors a ON ba.author_id = a.author_id
            GROUP BY b.book_id;
        `

        const [rows, fileds] = await this._connection.query<mysql.RowDataPacket[]>(sql);

        rows.forEach((row) => {
            let book: BookAuthor = {
                book_id: row.book_id,
                title: row.title,
                authors: row.authors,
                publisher: row.publisher,
                publishing_date: row.publishing_date,
                isbn: row.isbn,
                page_count: row.page_count,
                house: row.house,
                room: row.room,
                bookcase: row.bookcase,
                shelf: row.shelf,
                comment: row.comment
            };
            books.push(book);
        })

        return books;
    }

    async getAllBooksWithEditors() {
        const books: BookEditor[] = [];

        const sql: string = `
            SELECT 
                b.book_id,
                b.title,
                e.name AS editor,
                b.publisher,
                b.publishing_date,
                b.isbn,
                b.page_count,
                p.house,
                p.room,
                p.bookcase,
                p.shelf,
                b.comment
            FROM Library.Books b
            LEFT JOIN Library.Places p ON b.place_id = p.place_id
            JOIN Library.BookEditors be ON b.book_id = be.book_id
            JOIN Library.Editors e ON be.editor_id = e.editor_id;
        `

        const [rows, fileds] = await this._connection.query<mysql.RowDataPacket[]>(sql);

        rows.forEach((row) => {
            let book: BookEditor = {
                book_id: row.book_id,
                title: row.title,
                editor: row.editor,
                publisher: row.publisher,
                publishing_date: row.publishing_date,
                isbn: row.isbn,
                page_count: row.page_count,
                house: row.house,
                room: row.room,
                bookcase: row.bookcase,
                shelf: row.shelf,
                comment: row.comment
            };
            books.push(book);
        })

        return books;
    }

    async getFilteredBooks(filter: BookFilter):Promise<Book[]> {
        let sql:string = `
            SELECT
                b.book_id,
                b.title,
                GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS authors,
                e.name AS editor,
                b.publisher,
                b.publishing_date,
                b.isbn,
                b.page_count,
                p.house,
                p.room,
                p.bookcase,
                p.shelf,
                b.comment
            FROM Library.Books b
            LEFT JOIN Library.BookAuthors ba ON b.book_id = ba.book_id
            LEFT JOIN Library.Authors a ON ba.author_id = a.author_id
            LEFT JOIN Library.BookEditors be ON b.book_id = be.book_id
            LEFT JOIN Library.Editors e ON be.editor_id = e.editor_id
            LEFT JOIN Library.Places p ON b.place_id = p.place_id
            WHERE 1=1
        `

        const params: Array<string> = [];

        if(filter.title != null){
            sql += `AND LOWER(b.title) LIKE ?`;
            params.push(`%${filter.title.toLowerCase()}%`);
        }
        if(filter.publisher != null){
            sql += `AND LOWER(b.publisher) LIKE ?`;
            params.push(`%${filter.publisher.toLowerCase()}%`);
        }
        if(filter.author != null){
            sql += `AND LOWER(a.name) LIKE ?`;
            params.push(`%${filter.author.toLowerCase()}%`);
        }

        if(filter.editor != null){
            sql += `AND LOWER(e.name) LIKE ?`;
            params.push(`%${filter.editor.toLowerCase()}%`);
        }

        if(filter.house != null){
            sql += `AND LOWER(p.house) LIKE ?`;
            params.push(`%${filter.house.toLowerCase()}%`);
        }

        if(filter.page_count != null){
            sql += `AND b.page_count <= ?`;
            params.push(filter.page_count.toString());
        }
        if(filter.comment != null){
            sql += `AND LOWER(b.comment) LIKE ?`;
            params.push(`%${filter.comment.toLowerCase()}%`);
        }

        sql += `group by b.book_id;`

        const books: Array<Book> = [];

        try{
            sql = this._connection.format(sql, params);
            const [rows, fields] = await this._connection.query<mysql.RowDataPacket[]>(sql);

            rows.forEach((row) => {
                let book: Book = {
                    book_id: row.book_id,
                    title: row.title,
                    authors: row.authors,
                    editor: row.editor,
                    publisher: row.publisher,
                    publishing_date: row.publishing_date,
                    isbn: row.isbn,
                    page_count: row.page_count,
                    house: row.house,
                    room: row.room,
                    bookcase: row.bookcase,
                    shelf: row.shelf,
                    comment: row.comment
                };
                books.push(book);
            })
        }
        catch(e){
            console.log(e);
        }

        return books;
    }

    async getBookById(id: number): Promise<Book | null> {
        try{
            const sql: string = `
                SELECT 
                    b.title,
                    GROUP_CONCAT(DISTINCT a.name SEPARATOR ', ') AS authors,
                    e.name AS editor,
                    b.publisher,
                    b.publishing_date,
                    b.isbn,
                    b.page_count,
                    p.house,
                    p.room,
                    p.bookcase,
                    p.shelf,
                    b.comment
                FROM Library.Books b
                LEFT JOIN Library.BookAuthors ba ON b.book_id = ba.book_id
                LEFT JOIN Library.Authors a ON ba.author_id = a.author_id
                LEFT JOIN Library.BookEditors be ON b.book_id = be.book_id
                LEFT JOIN Library.Editors e ON be.editor_id = e.editor_id
                LEFT JOIN Library.Places p ON b.place_id = p.place_id
                where b.book_id = ?;
            `

            const [rows,fields] = await this._connection.query<mysql.RowDataPacket[]>(sql, [id]);

            if(rows.length == 0){
                return null;
            }
            else {
                let x = rows[0];
                let book: Book = {
                    book_id: x.book_id,
                    title: x.title,
                    authors: x.authors,
                    editor: x.editor,
                    publisher: x.publisher,
                    publishing_date: x.publishing_date,
                    isbn: x.isbn,
                    page_count: x.page_count,
                    house: x.house,
                    room: x.room,
                    bookcase: x.bookcase,
                    shelf: x.shelf,
                    comment: x.comment
                }
                return book;
            }
        }
        catch(e){
            console.log(e);
            return null;
        }
    }

    async getBookId(title: string, publisher: string, publishing_date: number ,isbn: string,
                    page_count: number, place_id: number): Promise<number | null> {
        try{
            const sql: string = `
                SELECT LAST_INSERT_ID();
            `

            const [rows,fields] = await this._connection.query<mysql.RowDataPacket[]>(sql);

            if(rows.length == 0){
                return null;
            }
            else{
               let row = rows[0];
               const book_id = row['LAST_INSERT_ID()'];
               return book_id;
            }
        }
        catch(e){
            console.log(e);
            return null;
        }
    }

    async addBook(title: string, authors: string[], editor: string, publisher: string, publishing_date: number, isbn: string,
                  page_count: number, house: string, room: string, bookcase: number, shelf: number, comment: string) {
        try{
            await this.addPlace(house, room, bookcase, shelf);
            const place_id = await this.getPlaceId(house, room, bookcase, shelf);

            const sql: string = `
                INSERT INTO Library.Books (title, publisher, publishing_date, isbn, page_count, place_id, comment)
                VALUES (?,?,?,?,?,?,?);
            `;

            await this._connection.query(sql,[title, publisher, publishing_date, isbn, page_count, place_id, comment]);

            const book_id = await this.getBookId(title, publisher, publishing_date, isbn, page_count, place_id);

            if(authors.length > 0){
                for (const author of authors) {
                    console.log(author);
                    await this.addAuthor(author);
                    const author_id = await this.getAuthorId(author);
                    console.log(book_id, author_id);
                    await this.addBookAuthor(book_id, author_id);
                }
            }

            if(editor != null){
                await this.addEditor(editor);
                const editor_id = await this.getEditorId(editor);
                await this.addBookEditor(book_id, editor_id);
            }

        }
        catch(e){
            console.log(e);
        }
    }

    async updateBook(book: Book){
        try{
            await this.addPlace(book.house, book.room, book.bookcase, book.shelf);
            const place_id = await this.getPlaceId(book.house, book.room, book.bookcase, book.shelf);

            const sql: string = `
                UPDATE Library.Books SET
                    title = ?,
                    publisher = ?,
                    publishing_date = ?,
                    isbn = ?,
                    page_count = ?,
                    place_id = ?
                WHERE
                    book_id = ?;
            `;

            await this._connection.query(sql,
                [book.title, book.publisher, book.publishing_date, book.isbn, book.page_count, place_id, book.book_id]);

            if(book.authors != null){
                const authorsSplit = book.authors.split(',');
                await this.deleteBookAuthor(book.book_id);
                for (const author of authorsSplit) {
                    await this.addAuthor(author);
                    const author_id = await this.getAuthorId(author);
                    await this.addBookAuthor(book.book_id, author_id);
                }
            }

            if(book.editor != null){
                await this.deleteBookEditor(book.book_id);
                await this.addEditor(book.editor);
                const editor_id = await this.getEditorId(book.editor);
                await this.addBookEditor(book.book_id, editor_id);
            }
        }
        catch(e){
            console.log(e);
        }
    }

    async deleteBook(id: number){
        try{
            const sql: string = `
                DELETE FROM Library.Books 
                WHERE book_id = ?;
            `;

            await this._connection.query(sql,[id]);
        }
        catch(e){
            console.log(e);
        }
    }
}