import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {promisify} from "util";
import {dataAccessLayer} from "../utils/server.js";
import catchAsync from '../utils/catchAsync.js'
import AppError from "../utils/appError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const signToken = (id) => {
    console.log(id);
    return jwt.sign({id},
        process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN
    });
}

const createSendToken = (user, statusCode, req, res) => {
    const token = signToken(user.ID);

    res.cookie('jwt', token, {
        expires: new Date(
            Date.now() + Number(process.env.JWT_COOKIE_EXPIRES_IN) * 24 * 60 * 60 * 1000
        ),
        secure: req.secure || req.headers['x-forwarded-proto'] === 'https',
    });

    res.status(statusCode).json({
        status: 'success',
        token,
        data: {
            user
        }
    });
};

const getRegistrationPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/register.html'));
}

const getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/login.html'));
}

const registerUser = catchAsync(async (req, res) => {
    try {
        const {username, password} = req.body;

        if(username.length === 0){
            return res.status(400).json({
                status: 'fail',
                message: 'Please provide a username'
            })
        }

        if(password.length < 8){
            return res.status(400).json({
                status: 'fail',
                message: 'Password must be at least 8 characters long'
            })
        }

        const existingUser = await dataAccessLayer.getUserByUsername(username);
        if(existingUser){
            return res.status(400).json({
                status: 'fail',
                message: 'Username is already taken'
            })
        }

        const hashedPassword = await bcrypt.hash(password, 12);

        await dataAccessLayer.addUser(
            username,
            hashedPassword,
            false
        );
        const newUser = await dataAccessLayer.getUserByUsername(username);
        console.log(newUser);

        createSendToken(newUser, 201, req, res);
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        })
    }
})

const loginUser = catchAsync(async (req, res) => {
    const {username, password } = req.body;
    console.log(username, password);

    if(!username || !password){
        return next(res.status(400).json({
            status: 'fail',
            message: 'Please provide a username and password'
        }))
    }

    const user = await dataAccessLayer.getUserByUsername(username);
    console.log(user);
    if(!user){
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid username or password'
        })
    }
    const isPasswordMatch = await bcrypt.compare(password, user.password);
    if(!isPasswordMatch){
        return res.status(400).json({
            status: 'fail',
            message: 'Invalid username or password'
        })
    }
    createSendToken(user, 200, req, res);
})

const getAllUsers = async (req, res) => {
    try{
        const users = await dataAccessLayer.getAllUsers();

        res.status(201).json({
            status: 'success',
            data: {
                users
            }
        });
    }
    catch (error) {
        console.log('Error fetching all the users:', error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}

const addUser = async (req, res) => {
    const {username, password,isAdmin} = req.body;

    if(!username || !password){
        return res.status(400).json({
            status: 'fail',
            message: 'Please provide a username and password'
        })
    }

    try {
        const hashedPassword = await bcrypt.hash(password, 12);
        const newUser = await dataAccessLayer.addUser(
            username,
            hashedPassword,
            isAdmin);

        res.status(201).json({
            status: 'success',
            data: {
                user: newUser
            }
        });
        return newUser;
    } catch (error) {
        console.log('Error adding a new user: ', error);

        if(error.code === 'ER_DUP_ENTRY'){
            return res.status(400).json({
                status: 'fail',
                message: 'Username is already taken'
            })
        }
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}

const getUserByUsername = async (req, res) => {
    const {username} = req.params;
    try{
        const user = await dataAccessLayer.getUserByUsername(username);
        if(!user){
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            })
        }
        res.status(201).json({
            status: 'success',
            data: user
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: 'Server error'
        });
    }
}

const getUserById = async (req, res) => {
    const {id} = req.params;
    try{
        const user = await dataAccessLayer.getUserById(id);
        if(!user){
            return res.status(404).json({
                status: 'fail',
                message: 'User not found'
            })
        }
        res.status(201).json({
            status: 'success',
            data: user.username
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
}

const updateUser = async (req, res) => {
    try{
        res.status(204).json({
            status: 'success',
            data: null
        });
    }
    catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

const deleteUser = async (req, res) => {
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
        });
    }
}

const protect = catchAsync(async (req, res, next) => {
    let token;
    if(
        req.headers.authorization &&
        req.headers.authorization.startsWith('Bearer')
    ){
        token = req.headers.authorization.split(' ')[1];
    }
    else if(req.cookies.jwt){
        token = req.cookies.jwt;
    }
    if(!token){
        return next(
            res.status(401).json({
                status: 'fail',
                message: 'You are not logged in. Plese log in to get access'
            })
        )
    }

    console.log(token);
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);
    console.log(decoded);

    const currentUser = await dataAccessLayer.getUserById(decoded.id);
    console.log(currentUser);
    if(!currentUser){
        return next(
            new AppError(
                'The user belonging to this token does no longer exist',
                401
            )
        )
    }

    req.user = currentUser;
    res.locals.user = currentUser;
    next();
})

const isLoggedIn = async (req, res, next) => {
    if (req.cookies.jwt){
        try{
            const decoded = await promisify(jwt.verify)(
                req.cookies.jwt,
                process.env.JWT_SECRET
            );
            const currentUser = await dataAccessLayer.getUserById(decoded.id);
            if(!currentUser){
                return next();
            }

            res.locals.user = currentUser;
            return next();
        }
        catch (error){
            return next();
        }
    }
    next();
}

const restrictToAdmin = async (req, res, next) => {
    if(!req.user.isAdmin){
        return res.status(403).sendFile(path.join(__dirname, '../../frontend/no-access.html'));
    }
    next();
}


export default {
    getRegistrationPage,
    getLoginPage,
    registerUser,
    loginUser,
    getAllUsers,
    addUser,
    getUserByUsername,
    getUserById,
    updateUser,
    deleteUser,
    protect,
    isLoggedIn,
    restrictToAdmin
}