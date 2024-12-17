import express from "express";
import bookController from "../controller/bookController";

const router = express.Router();

router.route('/')
    .get(bookController.getBookPage)
    .post(bookController.addBook);
router.route('/all')
    .get(bookController.getAllBooks)
router.route('/author')
    .get(bookController.getBooksWithAuthor)
router.route('/editor')
    .get(bookController.getBooksWithEditor)
router.route('/:id')
    .patch(bookController.updateBook)
    .delete(bookController.deleteBook);

export default router;