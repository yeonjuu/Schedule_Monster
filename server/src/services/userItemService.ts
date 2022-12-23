import {
    userItemModel,
    userItemModelType,
    UserItemInterface,
} from '../models/schemas/UserItem';
import { userModel, characterListModel } from '../models/';

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
        const result = await this.UserItem.findOne({ email: email });
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

    //=================================================================
    // POST localhost:5000/userItem/buy

    // 아이템 구매 (= 사용자 수집 아이템목록에는 추가, 사용자의 포인트는 차감)
    async buyUserItem(itemInfo: UserItemInterface) {
        const {email, itemName, price, exp, categoryName} = itemInfo
        // 1. 수집 아이템 목록에 추가
        await this.UserItem.create(itemInfo);

        // 사용자 정보 가져옴
        const userData = await userModel.findOne({ email: email })
        console.log(userData)
        // const { point } = userData // 에러가 남

        // 2. 사용자 포인트에서 아이템 금액만큼 차감 후 업데이트
        // const point = userData.point // 에러가 남
        // if (point > price){
        //     const newPoint = point - price
        //     // 사용자 정보 중에서 업데이트 할 부분(금액) 수정
        //     const updatePoint = {
        //         ...(point && { point }),
        //     }
        //     await userModel.findOneAndUpdate({ email: email },{ ...updatePoint },{ returnOriginal: false },)
        // }

        return
    }

    // POST localhost:5000/userItem/use

    // 아이템 사용 (=사용자 수집 아이템 목록에서 삭제, 수집한 캐릭터의 애정도는 증가)
    async useUserItem(email: string, itemId: string, characterId: string) {
        // 아이템 정보 받아옴
        const itemResult = await this.UserItem.find({_id:itemId})
        console.log('itemResult', itemResult)

        // 사용자 수집캐릭터 목록 get
        const characterList = await characterListModel.findOne({ _id: characterId });
        console.log('characterResult', characterList)

        // 1. 사용자가 수집한 캐릭터의 애정도 높임
        // 구현해야함

        // 2. 사용자수집아이템 리스트에서 삭제
        await this.UserItem.remove({ _id: itemId });
        return;
    }
}
const userItemService = new UserItemService(userItemModel);

export { userItemService };
