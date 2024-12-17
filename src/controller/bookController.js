import {dataAccessLayer} from "../utils/server.js";
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getBookPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/index.html'));
}

const getAllBooks = async (req, res) => {
    try{
        const title = req.query.title !== '' ? req.query.title : null;
        const author = req.query.author !== '' ? req.query.author : null;
        const editor = req.query.editor !== '' ? req.query.editor : null;
        const publisher = req.query.publisher !== '' ? req.query.publisher : null;
        const page_count = req.query.page_count !== '' ? req.query.page_count : null;
        const house = req.query.house !== '' ? req.query.house : null;
        const comment = req.query.comment !== '' ? req.query.comment : null;

        const filters = {
            title: title,
            author: author,
            editor: editor,
            publisher: publisher,
            page_count: page_count,
            house: house,
            comment: comment
        }

        let books = await dataAccessLayer.getFilteredBooks(filters);

        res.status(200).json({
            status: 'success',
            data: books
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}

const getBooksWithAuthor = async (req, res) => {

    let books = await dataAccessLayer.getAllBooksWithAuthors();

    try{
        res.status(201).json({
            status: 'success',
            data: books
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}

const getBooksWithEditor = async (req, res) => {
    let books = await dataAccessLayer.getAllBooksWithEditors();
    try{
        res.status(201).json({
            status: 'success',
            data: books
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}

const addBook = async (req, res) => {
    const title = req.body.title;
    const authors = req.body.authors.split(',');
    const editor = req.body.editor;
    const publisher = req.body.publisher;
    const publishing_date = req.body.publishing_date;
    const isbn = req.body.isbn;
    const page_count = req.body.page_count;
    const house = req.body.house;
    const room = req.body.room;
    const bookcase = req.body.bookcase;
    const shelf = req.body.shelf;
    const comment = req.body.comment;

    try {
        await dataAccessLayer.addBook(title, authors, editor, publisher, publishing_date, isbn, page_count, house, room, bookcase, shelf, comment);

        res.status(201).json({
            status: 'success',
            message: 'Book added successfully'
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Error saving the book: ' + error.message
        })
    }
}

const getBookById = async (req, res) => {
    const id = req.params.id;
    let book = await dataAccessLayer.getBookById(id);

    if(!book){
        return res.status(404).json({
            status: 'error',
            message: 'There is no book with the given id:' + id
        })
    }

    res.status(200).json({
        status: 'success',
        data: book
    });
}

const updateBook = async (req, res) => {
    const id = req.params.id;
    let book = await dataAccessLayer.getBookById(id);

    if(!book){
        return res.status(404).json({
            status: 'error',
            message: 'There is no book with the given id:' + id
        })
    }

    for(const key in req.body){
        book[key] = req.body[key];
    }

    try{
        await dataAccessLayer.updateBook(book);

        res.status(201).json({
            status: 'success',
            message: 'Successfully updated book with id: ' + id
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Error updating book with id: ' + id
        })
    }
}

const deleteBook = async (req, res) => {
    const id = req.params.id;

    try{
        await dataAccessLayer.deleteBook(id);

        res.status(201).json({
            status: 'success',
            message: 'Successfully deleted book with id: ' + id
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: 'Error deleting book with id: ' + id
        })
    }
}

export default {
    getBookPage,
    getAllBooks,
    getBooksWithAuthor,
    getBooksWithEditor,
    addBook,
    getBookById,
    updateBook,
    deleteBook
}