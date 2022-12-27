import { Router } from 'express';
import { userController } from '../controller';
import { asyncHandler } from '../utils';

export const userRouter = Router();

//  routing => /users
// 유저정보 확인
userRouter.get('/:email', asyncHandler(userController.getUsers));
userRouter.get('/user/:email', asyncHandler(userController.getUser));
userRouter.put('/user', asyncHandler(userController.updateUser));
userRouter.delete('/user/:email', asyncHandler(userController.deleteUser));
userRouter.post('/logout', asyncHandler(userController.logoutUser));
userRouter.post('/character', asyncHandler(userController.addCharater));
