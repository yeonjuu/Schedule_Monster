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
    async getCharacter(characterId: string) {
        const result =  await this.Character.findOne({characterId: characterId });
        return result
    }

    // 캐릭터 생성
    async createCharacter(characterInfo: CharacterInterface) {
        return await this.Character.create(characterInfo);
    }

    // 캐릭터 수정
    async updateCharacter(updateInfo: UpdateCharacterInterface) {
        const { characterId, nameKo, nameEn, levelupPoint, image } = updateInfo
        const toUpdate = {
            ...(nameKo && { nameKo }),
            ...(nameEn && { nameEn }),
            ...(levelupPoint && { levelupPoint }),
            ...(image && { image }),
        }
        const result =  await this.Character.findOneAndUpdate({characterId: characterId}, toUpdate, { returnOriginal: false },);
        return result
    }

    // 캐릭터 삭제
    async deleteCharacter(characterId: string) {
        const result = await this.Character.remove({ characterId: characterId });
        return result
    }
}
const characterService = new CharacterService(characterModel);

export { characterService };