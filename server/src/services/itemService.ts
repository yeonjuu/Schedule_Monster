import {
  itemModel,
  itemModelType,
  ItemInterface,
  UpdateItemInterface,
} from '../models/schemas/Item';

class ItemService {
  private Item: itemModelType;
  constructor(itemModel: itemModelType) {
    this.Item = itemModel;
  }

  // 아이템 전체 조회
  async getItems() {
    const result = await this.Item.find({});
    return result;
  }
  // 아이템 상세 조회
  async getItem(id: string) {
    const result = await this.Item.findOne({ _id: id });
    return result;
  }



  // 아이템 생성
  async createItem(itemInfo: ItemInterface) {
    return await this.Item.create(itemInfo);
  }

  // 아이템 수정
  async updateItem(updateInfo: UpdateItemInterface) {
    const { _id, itemName, itemImage, itemInfo, price, exp, categoryName } = updateInfo;
    const toUpdate = {
      ...(itemName && { itemName }),
      ...(itemImage && { itemImage }),
      ...(itemInfo && { itemInfo }),
      ...(price && { price }),
      ...(exp && { exp }),
      ...(categoryName && { categoryName }),
    };
    const result = await this.Item.findOneAndUpdate({ _id: _id }, toUpdate, {
      returnOriginal: false,
    });
    return result;
  }

  // 아이템 삭제
  async deleteItem(id: string) {
    const result = await this.Item.remove({ _id: id });
    return result;
  }
}
const itemService = new ItemService(itemModel);

export { itemService };
