import {
    userItemModel,
    userItemModelType,
    UserItemInterface,
} from '../models/schemas/UserItem';

class UserItemService {
    private UserItem: userItemModelType;
    constructor(userItemModel: userItemModelType) {
        this.UserItem = userItemModel;
    }

    // 아이템 전체 조회(관리자용)
    async getUserItems() {
        const result = await this.UserItem.find({});
        return result;
    }
    // 아이템 상세 조회(사용자용) // 수정 필요. email을 쿼리로 넣지 않는 방법 필요.
    async getUserItem(email: string) {
        const result = await this.UserItem.find({ email: email });
        return result;
    }
    // 아이템 생성(=구매)
    async createUserItem(itemInfo: UserItemInterface) {
        return await this.UserItem.create(itemInfo);
    }

    // 아이템 삭제(=사용)
    async deleteUserItem(id: string) {
        const result = await this.UserItem.remove({ _id: id });
        return result;
    }
}
const userItemService = new UserItemService(userItemModel);

export { userItemService };
