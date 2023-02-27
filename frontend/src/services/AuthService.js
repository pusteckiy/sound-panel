import api from "../API";

export default class AuthService {
    static async login(username, password) {
        const config = {
            headers: { 'content-type': 'application/x-www-form-urlencoded' }
        };
        return api.post('/account/login', { username, password }, config)
    }

    static async getUser() {
        return api.get('/account/')
    }
}