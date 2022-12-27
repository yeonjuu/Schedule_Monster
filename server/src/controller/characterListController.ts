import { characterListService } from '../services';
import { AsyncRequestHandler } from '../types';

interface characterListControllerInterface {
  getCharacterList: AsyncRequestHandler;
  getCharacterLists: AsyncRequestHandler;
  createCharacterList: AsyncRequestHandler;
  updateCharacterList: AsyncRequestHandler;
  getOnePick: AsyncRequestHandler;
  changeOnePick: AsyncRequestHandler;
  deleteCharacterList: AsyncRequestHandler;
}

export const characterListController: characterListControllerInterface = {
  async getCharacterList(req, res) {
    const { email } = req.params;
    const list = await characterListService.getCharacterList(email);
    return res.json(list);
  },
  // 관리자용
  async getCharacterLists(req, res) {
    const { email } = req.params;
    const lists = await characterListService.getCharacterLists(email);
    return res.json(lists);
  },
  async createCharacterList(req, res) {
    const result = await characterListService.createCharacterList(req.body);
    return res.json(result);
  },
  async updateCharacterList(req, res) {
    const result = await characterListService.updateCharacterList(req.body);
    return res.json(result);
  },
  async getOnePick(req, res) {
    const { email } = req.params
    const result = await characterListService.getOnePick(email);
    return res.json(result);
  },
  async changeOnePick(req, res) {
    const { email, characterId } = req.body
    const result = await characterListService.changeOnePick(email, characterId);
    return res.json(result);
  },
  async deleteCharacterList(req, res) {
    const { email } = req.params;
    const result = await characterListService.deleteCharacterList(email);
    return res.json(result);
  },
};
