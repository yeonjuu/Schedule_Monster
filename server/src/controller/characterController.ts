import { characterService } from '../services';
import { AsyncRequestHandler } from '../types';

interface characterControllerInterface {
    getCharacters: AsyncRequestHandler;
    getCharacter: AsyncRequestHandler;
    createCharacter: AsyncRequestHandler;
    updateCharacter: AsyncRequestHandler;
    deleteCharacter: AsyncRequestHandler;
}

export const characterController: characterControllerInterface = {
    async getCharacters(req, res) {
        const characters = await characterService.getCharacters();
        res.json(characters);
    },
    async getCharacter(req, res) {
        const { _id } = req.body;
        const character = await characterService.getCharacter(_id);
        res.json(character);
    },
    async createCharacter(req, res) {
        const response = await characterService.createCharacter(req.body);
        res.json(response);
    },
    async updateCharacter(req, res) {
        const response = await characterService.updateCharacter(req.body);
        res.json(response);
    },
    async deleteCharacter(req, res) {
        const { id } = req.params;
        const response = await characterService.deleteCharacter(id);
        res.json(response);
    },
};
