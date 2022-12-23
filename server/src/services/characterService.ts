import {
    characterModel,
    characterModelType,
    CharacterInterface,
    UpdateCharacterInterface
} from '../models/schemas/Character';

class CharacterService {
    private Character: characterModelType;
    constructor(characterModel: characterModelType) {
        this.Character = characterModel;
    }

    // 캐릭터 전체 조회
    async getCharacters() {
        const result = await this.Character.find({});
        return result
    }
    // 캐릭터 상세 조회
    async getCharacter(_id: string) {
        const result =  await this.Character.findOne({_id: _id });
        return result
    }

    // 캐릭터 생성
    async createCharacter(characterInfo: CharacterInterface) {
        return await this.Character.create(characterInfo);
    }

    // 캐릭터 수정
    async updateCharacter(updateInfo: UpdateCharacterInterface) {
        const { _id, characterName, levelupPoint, images } = updateInfo
        const toUpdate = {
            ...(characterName && { characterName }),
            ...(levelupPoint && { levelupPoint }),
            ...(images && { images }),
        }
        const result =  await this.Character.findOneAndUpdate({_id: _id}, toUpdate, { returnOriginal: false },);
        return result
    }

    // 캐릭터 삭제
    async deleteCharacter(id: string) {
        const result = await this.Character.remove({ _id: id });
        return result
    }
}
const characterService = new CharacterService(characterModel);

export { characterService };