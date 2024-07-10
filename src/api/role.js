import axios from "../utils/axios"
import { ENV } from "../utils/constants"

class ROLE {
    async getAllRoles(page, limit, query) {
        const res = await axios.get(`${ENV.ROLE}?page=${page}&limit=${limit}&query=${query}`)
        return res.data
    }
}

export const roleController = new ROLE()