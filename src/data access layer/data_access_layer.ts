import * as mysql from 'mysql2/promise'

//types for the database
export type Book = {
    book_id: number,
    title: string,
    publisher: string,
    publishing_date: Date,
    isbn: string,
    page_count: number,
    place_id: number,
    comment: string;
};

export type BookAuthor = {
    book_id: number,
    title: string,
    authors: string
    publisher: string,
    publishing_date: Date,
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
    publishing_date: Date,
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

export class DataAccessLayer {
    private _connection: mysql.Connection;

    //connection to the database
    async initConnection(dbHost: string, dbPort: number) {
        const ConnectionOptions: mysql.ConnectionOptions = {
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
            FROM Users`
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
             SELECT user_id,username,email,password,isAdmin FROM library.users
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

    async updateUser(user : User){
        try{
            const sql : string = `
            UPDATE library.users SET
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
            DELETE FROM travel_agency.users
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
            FROM library.authors
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
                FROM library.authors
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

    async addAuthor(name:string){
        try {
            const sql : string = `
                INSERT INTO library.authors (name)
                VALUES(?)
            `;

            await this._connection.query(sql,[name]);
        }
        catch(e){
            console.log(e);
        }
    }

    async updateAuthor(author : Author){
        try{
            const sql : string = `
                UPDATE library.authors SET
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
                DELETE FROM library.authors 
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
            FROM library.editors
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
                FROM library.editors
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

    async addEditor(name:string){
        try {
            const sql : string = `
                INSERT INTO library.editors (name)
                VALUES(?)
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
                UPDATE library.editors SET
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
                DELETE FROM library.editors 
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
            FROM library.places
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

    //Books

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
            FROM Books b
            LEFT JOIN Places p ON b.place_id = p.place_id
            JOIN BookAuthors ba ON b.book_id = ba.book_id
            JOIN Authors a ON ba.author_id = a.author_id
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
            FROM Books b
            LEFT JOIN Places p ON b.place_id = p.place_id
            JOIN BookEditors be ON b.book_id = be.book_id
            JOIN Editors e ON ba.author_id = a.author_id
            GROUP BY b.book_id;
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




}