import axios from "axios";


export default class ImageService {

    static async setImage(payload) {
        const response = await axios.post('https://dummyjson.com/products')
        return response.data
    }
    
}