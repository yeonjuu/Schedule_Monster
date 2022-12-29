import { ItemType } from 'types/shopTypes';

export const resetItem = (): ItemType => {
  return {
    itemName: '',
    itemImage: '',
    _id: '',
    itemInfo: '',
    categoryName: '',
    price: '',
    exp: '',
  };
};
