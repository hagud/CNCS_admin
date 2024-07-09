import axios from "../utils/axios"
import { ENV } from "../utils/constants"

class SOFTWARE {
    async getAllSoftwares(page, limit, query) {
        const res = await axios.get(`${ENV.SOFTWARE}?page=${page}&limit=${limit}&query=${query}`)
        return res.data
    }
}

export const softwareController = new SOFTWARE()