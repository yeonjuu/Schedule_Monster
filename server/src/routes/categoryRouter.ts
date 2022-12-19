import { Router } from 'express';
import { categoryController } from '../controller';
import { asyncHandler } from '../utils';

export const categoryRouter = Router();

// 카테고리 확인
categoryRouter.get('/all', asyncHandler(categoryController.getCategory));
// 카테고리 등록
categoryRouter.post('/register', asyncHandler(categoryController.createCategory));
// 카테고리 수정
categoryRouter.put('/update', asyncHandler(categoryController.updateCategory));
// 카테고리 삭제
categoryRouter.delete('/delete/:id', asyncHandler(categoryController.deleteCategory));