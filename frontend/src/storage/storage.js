import { makeAutoObservable } from 'mobx'
import AuthService from '../services/AuthService'


export default class Storage {
    user = {}
    isAuth = false
    isLoading = false

    constructor() {
        makeAutoObservable(this)
    }

    setUser(user) {
        this.user = user
    }

    setAuth(bool) {
        this.isAuth = bool
    }

    setLoading(bool) {
        this.isLoading = bool
    }

    async login(username, password) {
        try {
            const response = await AuthService.login(username, password)
            localStorage.setItem('token', response.data.access_token)
            this.setAuth(true)
            this.setUser(response.data)

        } catch (e) {
            alert('test')
            alert(e)
            alert(e.response?.data?.detail)
        }
    }

    async checkAuth() {
        this.setLoading(true)
        try {
            const response = await AuthService.getUser()
            this.setAuth(true)
            this.setUser(response.data)
        } catch (e) {
            this.setAuth(false)
            this.setUser({})
            localStorage.removeItem('token')
        } finally {
            this.setLoading(false)
        }
    }
}