import {
    categoryModel,
    categoryModelType,
    CategoryInterface, UpdateCategoryInterface,
} from '../models/schemas/Category';

class CategoryService {
    private Category: categoryModelType;
    constructor(categoryModel: categoryModelType) {
        this.Category = categoryModel;
    }

    // 카테고리 전체 조회
    async getCategory() {
        const result = await this.Category.find({});
        return result
    }

    // 카테고리 생성
    async createCategory(categoryInfo: CategoryInterface) {
        return await this.Category.create(categoryInfo);
    }

    // 카테고리 수정
    async updateCategory(updateInfo: UpdateCategoryInterface) {
        const { _id, categoryName } = updateInfo
        const result =  await this.Category.findOneAndUpdate({_id: _id}, {categoryName: categoryName}, { returnOriginal: false },);
        return result
    }

    // 카테고리 삭제
    async deleteCategory(id: string) {
        const result = await this.Category.remove({ _id: id });
        return result
    }
}
const categoryService = new CategoryService(categoryModel);

export { categoryService };