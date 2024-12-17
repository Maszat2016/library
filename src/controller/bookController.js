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