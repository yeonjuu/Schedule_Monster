import { categoryService } from '../services';
import { AsyncRequestHandler } from '../types';

interface categoryControllerInterface {
    getCategory: AsyncRequestHandler;
    createCategory: AsyncRequestHandler;
    updateCategory: AsyncRequestHandler;
    deleteCategory: AsyncRequestHandler;
}

export const categoryController: categoryControllerInterface = {
    async getCategory(req, res) {
        const category = await categoryService.getCategory();
        res.json(category);
    },
    async createCategory(req, res) {
        const response = await categoryService.createCategory(req.body);
        res.json(response);
    },
    async updateCategory(req, res) {
        const response = await categoryService.updateCategory(req.body);
        res.json(response);
    },
    async deleteCategory(req, res) {
        const { id } = req.params;
        const response = await categoryService.deleteCategory(id);
        res.json(response);
    },
};
