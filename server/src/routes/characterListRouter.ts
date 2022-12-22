import { Router } from 'express';
import { characterListController } from '../controller/characterListController';
import { asyncHandler } from '../utils';

export const characterListRouter = Router();

// 라우팅 : /characterlist

// 캐릭터 전체정보 확인
characterListRouter.get(
  '/all',
  asyncHandler(characterListController.getCharacterLists),
);
// 캐릭터 상세정보 확인
characterListRouter.get(
  '/',
  asyncHandler(characterListController.getCharacterList),
);
// 캐릭터 등록
characterListRouter.post(
  '/add',
  asyncHandler(characterListController.addCharacterList),
);
// 캐릭터 수정
characterListRouter.put(
  '/update',
  asyncHandler(characterListController.updateCharacterList),
);
// 캐릭터 삭제
characterListRouter.delete(
  '/delete',
  asyncHandler(characterListController.deleteCharacterList),
);
