import axios from "../utils/axios"
import { ENV } from "../utils/constants"

class FUNDS_TYPE {
    async getAllFundsType(page, limit, query) {
        const res = await axios.get(`${ENV.FUNDS_TYPE}?page=${page}&limit=${limit}&query=${query}`)
        return res.data
    }
}

export const fundsTypeController = new FUNDS_TYPE()