import path from 'path';
import { fileURLToPath } from 'url';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import {promisify} from "util";
import catchAsync from '../utils/catchAsync'
import {dataAccessLayer} from "../server.js";
import AppError from "../utils/appError.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const getRegistrationPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/register.html'));
}

const getLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../../frontend/login.html'));
}

const registerUser = async (req, res) => {
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

const loginUser = async (req, res) => {
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

const getAllUsers = async (req, res) => {
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

const addUser = async (req, res) => {
    try {
        res.status(201).json({
            status: 'success',
            data: null
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: error.message
        });
    }
}

const getUserByUsername = async (req, res) => {
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

const getUserById = async (req, res) => {
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

const updateUser = async (req, res) => {
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
    deleteUser
}