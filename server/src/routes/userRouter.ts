import { Router } from 'express';
import { userController } from '../controller';
import { asyncHandler } from '../utils';

export const userRouter = Router();

//  routing => /users
// 유저정보 확인
userRouter.get('/:email', asyncHandler(userController.getUsers));
userRouter.post('/', asyncHandler(userController.postUser));
userRouter.get('/user/:email', asyncHandler(userController.getUser));
userRouter.put('/user', asyncHandler(userController.updateUser));
userRouter.delete('/user/:email', asyncHandler(userController.deleteUser));
userRouter.post('/login', asyncHandler(userController.loginUser));
userRouter.post('/logout', asyncHandler(userController.logoutUser));
userRouter.post('/character', asyncHandler(userController.addCharater));
userRouter.post('/manager', asyncHandler(userController.postManager));
userRouter.get('/auth/:email', asyncHandler(userController.authEmail));
userRouter.get('/nickname/:nickname', asyncHandler(userController.checkNickname));
userRouter.post('/check/password', asyncHandler(userController.checkPassword));
