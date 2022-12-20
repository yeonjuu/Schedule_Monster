import { characterListModel, characterListModelType } from '../models';
import { CharacterListInterface } from '../models/schemas/CharacterList';
import { userModel, userModelType } from '../models';
class CharacterListService {
  private characterList: characterListModelType;
  private user: userModelType;

  constructor(
    characterListModel: characterListModelType,
    userModel: userModelType,
  ) {
    this.characterList = characterListModel;
    this.user = userModel;
  }

  // 전체 사용자 캐릭터 리스트 전체 조회
  async getCharacterLists(email: string) {
    const user = await this.user.findOne({ email });
    if (!user) throw new Error('사용자가 존재하지 않습니다');
    if (user?.auth === 'user')
      return {
        status: 401,
        error: 'Unauthorized',
        message: '해당 관리 권한으로는 서비스 요청을 할 수 없습니다',
      };

    const result = await this.characterList.find({});
    return result;
  }
  // 특정 사용자 캐릭터 리스트 상세 조회
  async getCharacterList(email: string) {
    const result = await this.characterList.findOne({ email });
    return result;
  }

  // 사용자 캐릭터 리스트 최초 추가
  async addCharacterList(email: string) {
    return await this.characterList.create({ email });
  }

  // 캐릭터 리스트 수정
  async updateCharacterList(updateInfo: CharacterListInterface) {
    const { email, characterList } = updateInfo;
    const origin = await this.characterList.findOne({ email });
    const originData = origin?.characterList;
    const toUpdate = {
      ...(originData && { originData }),
      ...(characterList && { characterList }),
    };
    const result = await this.characterList.findOneAndUpdate(
      { email },
      toUpdate,
      { returnOriginal: false },
    );
    return result;
  }

  // 해당 사용자 캐릭터 리스트 초기화
  async deleteCharacterList(email: string) {
    const result = await this.characterList.remove({ email });
    return result;
  }
}
const characterListService = new CharacterListService(
  characterListModel,
  userModel,
);

export { characterListService };
