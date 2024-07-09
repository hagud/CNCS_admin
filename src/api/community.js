import axios from "../utils/axios"
import { ENV } from "../utils/constants"

class COMMUNITY {
    async getAllCommunities(page, limit, query) {
        const res = await axios.get(`${ENV.COMMUNITY}?page=${page}&limit=${limit}&query=${query}`)
        return res.data
    }
}

export const communityController = new COMMUNITY()