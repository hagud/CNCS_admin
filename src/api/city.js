import axios from "../utils/axios"
import { ENV } from "../utils/constants"

class CITY {
    async getAllCities(page, limit, query) {
        const res = await axios.get(`${ENV.CITY}?page=${page}&limit=${limit}&query=${query}`)
        return res.data
    }
}

export const cityController = new CITY()