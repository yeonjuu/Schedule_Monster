import { Schema, model, Model } from 'mongoose';

// 인터페이스
export interface UserItemInterface {
    email: String;
    itemName: String;
    price: Number;
    exp: Number;
    categoryName: String;
}

// 스키마
export const userItemSchema = new Schema<UserItemInterface>(
    {
        email: {
            type: String,
            required: true,
        },
        itemName: {
            type: String,
            required: true,
        },
        price: {
            type: Number,
            required: true,
        },
        exp: {
            type: Number,
            required: true,
        },
        categoryName: {
            type: String,
            required: true,
        },
    },
    {
        timestamps: true,
        collection: 'userItem',
    },
);

// 모델
export interface userItemModelType extends Model<UserItemInterface> {}
export const userItemModel = model<UserItemInterface, userItemModelType>('UserItem', userItemSchema);