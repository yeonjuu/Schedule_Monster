import { userItemService } from '../services';
import { AsyncRequestHandler } from '../types';

interface userItemControllerInterface {
    getUserItems: AsyncRequestHandler;
    getUserItem: AsyncRequestHandler;
    createUserItem: AsyncRequestHandler;
    deleteUserItem: AsyncRequestHandler;
}

export const userItemController: userItemControllerInterface = {
    async getUserItems(req, res) {
        const items = await userItemService.getUserItems();
        res.json(items);
    },
    async getUserItem(req, res) {
        const { email } = req.params;
        const item = await userItemService.getUserItem(email);
        res.json(item);
    },
    async createUserItem(req, res) {
        const response = await userItemService.createUserItem(req.body);
        res.json(response);
    },
    async deleteUserItem(req, res) {
        const { id } = req.params;
        const response = await userItemService.deleteUserItem(id);
        res.json(response);
    },
};
