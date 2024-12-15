import * as mysql from 'mysql2/promise'

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


}