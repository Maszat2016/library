import express from 'express';
import morgan from 'morgan';
import path from "path";
import cookieParser from "cookie-parser";
import { fileURLToPath } from 'url';

import bookRouter from '.././router/bookRouter';
import userRouter from '.././router/userRouter';
import authorRouter from '.././router/authorRouter';
import editorRouter from '.././router/editorRouter';
import placeRouter from '.././router/placeRouter';
import userController from "../controller/userController";

const app = express()

app.use(morgan('dev'));

app.use(express.json());

const _filename = fileURLToPath(import.meta.url);
const _dirname = path.dirname(_filename);
console.log(path.join(_dirname + '../../../frontend'));

app.use(express.static(path.join(_dirname + '../../../frontend')));

app.use(cookieParser());

app.use('/api/books', bookRouter);
app.use('/api/users', userRouter);

app.get('/api/check_admin', userController.protect, (req, res) => {
    res.status(200).json({
        success: 'success',
        data: {
            isAdmin: req.user.isAdmin
        }
    })
});

export default app;