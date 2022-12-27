import { Router } from 'express';
import { characterListController } from '../controller/characterListController';
import { asyncHandler } from '../utils';

export const characterListRouter = Router();

// 라우팅 : /characterlist

// <관리자용> 캐릭터 전체정보 확인
characterListRouter.get('/all/:email', asyncHandler(characterListController.getCharacterLists));
// 캐릭터 상세정보 확인
characterListRouter.get('/detail/:email', asyncHandler(characterListController.getCharacterList));
// 캐릭터 등록
characterListRouter.post('/register', asyncHandler(characterListController.createCharacterList));
// 캐릭터 수정
characterListRouter.put('/update', asyncHandler(characterListController.updateCharacterList));
// 대표캐릭터 조회
characterListRouter.get('/pick/:email', asyncHandler(characterListController.getOnePick));
// 대표캐릭터 변경
characterListRouter.put('/pick', asyncHandler(characterListController.changeOnePick));
// 캐릭터 삭제
characterListRouter.delete('/delete/:email', asyncHandler(characterListController.deleteCharacterList));
