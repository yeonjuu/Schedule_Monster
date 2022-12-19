import { Schema, model, Model } from 'mongoose';

// 인터페이스
export interface CategoryInterface {
    categoryName: String;
}
export interface UpdateCategoryInterface {
    _id: string;
    categoryName: String;
}

// 스키마
export const categorySchema = new Schema<CategoryInterface>(
    {
        categoryName: {
            type: String,
            required: true,
        }
    },
    {
        timestamps: true,
        collection: 'item',
    },
);

// 모델
export interface categoryModelType extends Model<CategoryInterface> {}
export const categoryModel = model<CategoryInterface, categoryModelType>('Category', categorySchema);
