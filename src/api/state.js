import axios from "../utils/axios"
import { ENV } from "../utils/constants"

class STATE {
    async getAllStates(page, limit, query) {
        const res = await axios.get(`${ENV.STATE}?page=${page}&limit=${limit}&query=${query}`)
        return res.data
    }
}

export const stateController = new STATE()