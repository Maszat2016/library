import {dataAccessLayer} from "../server.js";
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



    try{
        res.status(201).json({
            status: 'success',
            data: null
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
    try{
        res.status(201).json({
            status: 'success',
            data: null
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
    try {
        res.status(201).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}

const getBookById = async (req, res) => {
    try{
        res.status(201).json({
            status: 'success',
            data: null
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}

const updateBook = async (req, res) => {
    try{
        res.status(201).json({
            status: 'success',
            data: null
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
}

const deleteBook = async (req, res) => {
    try{
        res.status(201).json({
            status: 'success',
            data: null
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
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