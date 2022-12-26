import { characterListModel, characterListModelType } from '../models';
import {CharacterListInterface, UpdateCharacterListInterface} from '../models/schemas/CharacterList';
import { userModel, userModelType } from '../models';
class CharacterListService {
  private characterList: characterListModelType;
  private user: userModelType;

  constructor(characterListModel: characterListModelType, userModel: userModelType) {
    this.characterList = characterListModel;
    this.user = userModel;
  }

  // 관리자용 : 전체 사용자 캐릭터 리스트 전체 조회
  async getCharacterLists(email: string) {
    console.log(email);
    const user = await this.user.findOne({ email });
    if (!user) throw new Error('type:Forbidden,content:사용자가 존재하지 않거나 요청이 정상적이지 않습니다');
    if (user.auth === 'user') new Error('type:Forbidden,message:해당 관리 권한으로는 서비스 요청을 할 수 없습니다');

    const result = await this.characterList.find({}).sort({characterId: "asc"});
    return result;
  }
  // 특정 사용자 캐릭터 리스트 상세 조회
  async getCharacterList(email: string) {
    const result = await this.characterList.find({ email: email }).sort({characterId: "asc"});
    return result;
  }

  // 사용자 캐릭터 리스트 추가
  async createCharacterList(characterListInfo: CharacterListInterface) {
    return await this.characterList.create(characterListInfo);
  }

  // 캐릭터 리스트 수정
  async updateCharacterList(updateInfo: UpdateCharacterListInterface) {
    const { _id, email, myPoint, onePick } = updateInfo;
    // const origin = await this.characterList.findOne({ _id: _id });
    // const originData = origin?._id;
    const toUpdate = {
      ...(email && { email }),
      ...(myPoint && { myPoint }),
      ...({onePick: onePick})
    };
    const result = await this.characterList.findOneAndUpdate({ email }, toUpdate, { returnOriginal: false });
    return result;
  }

  // // 대표캐릭터 조회
  // async getOnePick(email:string) {
  //   const filter = {email: email, onePick: true}
  //   const result =  await this.characterList.findOne(filter);
  //   return result;
  // }
  //
  // // 대표캐릭터 변경
  // async changeOnePick(email: string, _id:string) {
  //   // 기존꺼 false
  //   const filter = {email: email, onePick: true}
  //   await this.characterList.findOneAndUpdate(filter, {onePick: false});
  //   // 현재꺼 true
  //   const result =  await this.characterList.findOneAndUpdate({_id: _id}, {onePick: true});
  //   return result;
  // }

  // 해당 사용자 캐릭터 리스트 초기화
  async deleteCharacterList(email: string) {
    const result = await this.characterList.remove({ email: email });
    return result;
  }
}
const characterListService = new CharacterListService(characterListModel, userModel);

export { characterListService };
