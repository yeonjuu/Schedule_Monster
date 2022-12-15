import { Router } from 'express';
import { userController } from '../controller';
import { asyncHandler } from '../utils';

export const userRouter = Router();

//  routing => /users
// 유저정보 확인
userRouter.get('/', asyncHandler(userController.getUsers));
userRouter.post('/', asyncHandler(userController.postUser));
