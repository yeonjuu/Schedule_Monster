import {
    userItemModel,
    userItemModelType,
    UserItemInterface,
} from '../models/schemas/UserItem';
import { characterModel } from '../models/schemas/Character';
import { userModel, characterListModel } from '../models/';
import {UserInterface} from "../models/schemas/User";

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

    //=================================================================
    // POST localhost:5000/userItem/buy

    // #1. 수집 아이템 목록에 추가 (아이템 수량만큼 반복)
    updateItem = async (itemInfo: UserItemInterface) => {
        const itemResult = await this.UserItem.create(itemInfo);
        return itemResult
    }
    // #2. 사용자 포인트 변경
    updateUserPoint = async (userData: UserInterface, price:number) => {
        const userResult = await userModel.findOneAndUpdate({email: userData.email}, {point: price }, {returnOriginal: false},)
        return userResult
    }

    // 아이템 구매 (= 사용자 수집 아이템목록에는 추가, 사용자의 포인트는 차감)
    async buyUserItem(itemInfo: UserItemInterface, quantity: number) {
        const {email, price} = itemInfo
       // 사용자 정보 가져옴
        const userData = await userModel.findOne({ email: email })
        if(!userData){
            const message = {
                "status": false,
                "message": '오류 - 입력하신 이메일의 사용자 정보가 없습니다.'
            }
            return message
        }
        const userPoint = +userData.point
        if (userPoint < price){
            const message = {
                "status": false,
                "message": '포인트 부족 - 잔여 포인트를 다시 한 번 확인 바랍니다'
            }
            return message
        }
        const newPoint = userPoint - +price*quantity
        Array(quantity).fill(0).forEach(async() => {
            await this.updateItem(itemInfo)
        })
        const result = await this.updateUserPoint(userData, newPoint)
        return result
    }

    //=================================================================
    // POST localhost:5000/userItem/use

    // 아이템 사용 (=사용자 수집 아이템 목록에서 삭제, 수집한 캐릭터의 애정도는 증가)
    async useUserItem(email: string, itemId: string, characterId: string) {
        // 아이템 정보 받아옴
        const itemResult = await this.UserItem.findOne({_id:itemId})
        if(!itemResult) {
            const message = {
                "status": false,
                "message": '아이템 오류 - 해당 아이템은 존재하지 않습니다.'
            }
            return message
        }
        // 사용자 수집캐릭터 목록 받아옴
        const characterListResult = await characterListModel.findOne({ _id: characterId });
        if(!characterListResult) {
            const message = {
                "status": false,
                "message": '캐릭터 오류 - 해당 캐릭터는 존재하지 않습니다.'
            }
            return message
        }

        const itemExp = +itemResult.exp
        const characterExp = +characterListResult.myExp
        const newExp = characterExp + itemExp


        if (characterExp >= 100){
            const message = {
                "status": false,
                "message": '캐릭터 애정도 - 해당 캐릭터는 이미 애정도가 100입니다.'
            }
            return message
        }
        else {
            // 1. 사용자가 수집한 캐릭터의 애정도 높임
            const result = await characterListModel.findOneAndUpdate({ _id: characterId }, {myExp: newExp})
            // 2. 사용자수집아이템 리스트에서 삭제
            await this.UserItem.remove({ _id: itemId });
            return result;
        }
    }


    //=================================================================
    // POST localhost:5000/userItem/egg

    // 알 깨기 (=사용자 수집 아이템 목록에서 알 삭제, 수집한 캐릭터리스트에 추가)
    async breakEgg(email: string, itemId: string) {
        // 아이템 정보 받아옴
        const itemResult = await this.UserItem.findOne({_id: itemId})
        const characterCount = await characterListModel.countDocuments({email: email})

        if(!itemResult) {
            const message = {
                "status": false,
                "message": '아이템 오류 - 해당 아이템은 존재하지 않습니다.'
            }
            return message
        }

        if (itemResult.categoryName == '알') {
            console.log(itemResult, itemResult.categoryName)
            // 1. 사용자가 수집한 캐릭터에 랜덤으로 하나 추가
            const random = await characterModel.aggregate(
                [
                    { $sample: { size: 1 } }
                ],
            );
            const randomCharacter = random[0]
            delete randomCharacter["_id"]
            randomCharacter.email = email
            randomCharacter.myExp = 0 // 애정도 초기값 0
            randomCharacter.onePick = (characterCount == 0) // 최초 캐릭터가 대표캐릭터
            const result = await characterListModel.create(randomCharacter);

            // 2. 사용자수집아이템 리스트에서 삭제
            await this.UserItem.remove({ _id: itemId });
            return result
        } else {
            const message = {
                "status": false,
                "message": '알 부화 오류 - 해당 아이템은 알이 아닙니다.'
            }
            return message
        }
    }
}
const userItemService = new UserItemService(userItemModel);

export { userItemService };