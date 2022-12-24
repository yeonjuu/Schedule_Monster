import { Router } from 'express';
import { userItemController } from '../controller';
import { asyncHandler } from '../utils';

export const userItemRouter = Router();

// 아이템 전체정보 확인
userItemRouter.get('/all', asyncHandler(userItemController.getUserItems));
// 아이템 상세정보 확인
userItemRouter.get('/detail', asyncHandler(userItemController.getUserItem));
// 아이템 등록
userItemRouter.post('/register', asyncHandler(userItemController.createUserItem));
// 아이템 삭제
userItemRouter.delete('/delete/:id', asyncHandler(userItemController.deleteUserItem));