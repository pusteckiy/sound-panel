import api from "../API";

export default class SoundService {
    static async fetchSounds() {
        return api.post('/api/sounds')
    }
}