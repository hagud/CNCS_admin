import axios from "../utils/axios"
import { ENV } from "../utils/constants"

class USER {
    async createUser(user) {
        const res = await axios.post(`${ENV.USER}/create`, user)
        return res.data
    }
}

export const userController = new USER()