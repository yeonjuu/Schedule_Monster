import { characterListService } from '../services';
import { AsyncRequestHandler } from '../types';

interface characterListControllerInterface {
  getCharacterList: AsyncRequestHandler;
  getCharacterLists: AsyncRequestHandler;
  createCharacterList: AsyncRequestHandler;
  updateCharacterList: AsyncRequestHandler;
  // getOnePick: AsyncRequestHandler;
  // changeOnePick: AsyncRequestHandler;
  deleteCharacterList: AsyncRequestHandler;
}

export const characterListController: characterListControllerInterface = {
  async getCharacterList(req, res) {
    const { email } = req.body;
    const result = await characterListService.getCharacterList(email);
    return res.json(result);
  },
  async getCharacterLists(req, res) {
    const { email } = req.body;
    const result = await characterListService.getCharacterLists(email);
    return res.json(result);
  },
  async createCharacterList(req, res) {
    const result = await characterListService.createCharacterList(req.body);
    return res.json(result);
  },
  async updateCharacterList(req, res) {
    const result = await characterListService.updateCharacterList(req.body);
    return res.json(result);
  },
  // async getOnePick(req, res) {
  //   const { email } = req.body
  //   const result = await characterListService.getOnePick(email);
  //   return res.json(result);
  // },
  // async changeOnePick(req, res) {
  //   const { _id, onePick } = req.body
  //   const result = await characterListService.changeOnePick(_id, onePick);
  //   return res.json(result);
  // },
  async deleteCharacterList(req, res) {
    const { email } = req.body;
    const result = await characterListService.deleteCharacterList(email);
    return res.json(result);
  },
};
