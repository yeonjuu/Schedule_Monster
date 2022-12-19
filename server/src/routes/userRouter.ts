import { Router } from 'express';
import { userController } from '../controller';
import { asyncHandler } from '../utils';

export const userRouter = Router();

//  routing => /users
// 유저정보 확인
userRouter.get('/', asyncHandler(userController.getUsers));
userRouter.post('/', asyncHandler(userController.postUser));
userRouter.get('/user', asyncHandler(userController.getUser));
userRouter.put('/user', asyncHandler(userController.updateUser));
userRouter.delete('/user', asyncHandler(userController.deleteUser));
userRouter.post('/login', asyncHandler(userController.loginUser));
userRouter.post('/logout', asyncHandler(userController.logoutUser));
userRouter.post('/character', asyncHandler(userController.addCharater));
