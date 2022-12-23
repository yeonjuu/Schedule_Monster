import { characterListService } from '../services';
import { AsyncRequestHandler } from '../types';

interface characterListControllerInterface {
  getCharacterList: AsyncRequestHandler;
  getCharacterLists: AsyncRequestHandler;
  addCharacterList: AsyncRequestHandler;
  updateCharacterList: AsyncRequestHandler;
  deleteCharacterList: AsyncRequestHandler;
}

export const characterListController: characterListControllerInterface = {
  async getCharacterList(req, res) {
    const email = req.body.email;
    const list = await characterListService.getCharacterList(email);
    return res.json(list);
  },
  async getCharacterLists(req, res) {
    const email = req.body.email;
    const lists = await characterListService.getCharacterLists(email);
    return res.json(lists);
  },
  async addCharacterList(req, res) {
    const email = req.body.email;
    const list = await characterListService.addCharacterList(email);
    return res.json(list);
  },
  async updateCharacterList(req, res) {
    const list = await characterListService.updateCharacterList(req.body);
    return res.json(list);
  },
  async deleteCharacterList(req, res) {
    const email = req.body.email;
    const result = await characterListService.deleteCharacterList(email);
    return res.json(result);
  },
};
