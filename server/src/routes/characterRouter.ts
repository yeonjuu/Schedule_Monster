import { Router } from 'express';
import { characterController } from '../controller';
import { asyncHandler } from '../utils';

export const characterRouter = Router();

// 캐릭터 전체정보 확인
characterRouter.get('/all', asyncHandler(characterController.getCharacters));
// 캐릭터 상세정보 확인
characterRouter.get('/detail', asyncHandler(characterController.getCharacter));
// 캐릭터 등록
characterRouter.post('/register', asyncHandler(characterController.createCharacter));
// 캐릭터 수정
characterRouter.put('/update', asyncHandler(characterController.updateCharacter));
// 캐릭터 삭제
characterRouter.delete('/delete/:id', asyncHandler(characterController.deleteCharacter));