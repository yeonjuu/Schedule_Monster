import { Schema, model, Model } from 'mongoose';

// 인터페이스
export interface ItemInterface {
    itemName: String;
    itemImage: String;
    itemInfo: String;
    price: Number;
    exp: Number;
    categoryName: String;
}
export interface UpdateItemInterface {
    _id: String;
    itemName?: String;
    itemImage?: String;
    itemInfo?: String;
    price?: Number;
    exp?: Number;
    categoryName?: String;
}

// 스키마
export const itemSchema = new Schema<ItemInterface>(
    {
        itemName: {
            type: String,
            required: true,
        },
        itemImage: {
            type: String,
            required: true,
        },
        itemInfo: {
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
        collection: 'item',
    },
);

// 모델
export interface itemModelType extends Model<ItemInterface> {}
export const itemModel = model<ItemInterface, itemModelType>('Item', itemSchema);
