import express from 'express';
import userContoller from '../controllers/userController.js';

const router = express.Router();

router.route('/register')
    .get(userContoller.getRegistrationPage)
    .post(userContoller.registerUser);
router.route('/login')
    .get(userContoller.getLoginPage)
    .post(userContoller.loginUser);
router.route('/:username')
    .get(userContoller.getUserByUsername)
router.route('/id/:id')
    .get(userContoller.getUserById)

router.route('/')
    .get(userContoller.getAllUsers)
    .post(userContoller.addUser);
router.route('/:id')
    .patch(userContoller.updateUser)
    .delete(userContoller.deleteUser);

export default router;