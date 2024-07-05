import axios from "../utils/axios"
import { ENV } from "../utils/constants"

export class BRANCHES_TYPE {
    async getAllBranchesType(page, limit, query) {
        const res = await axios.get(`${ENV.BRANCHES_TYPE}?page=${page}&limit=${limit}&query=${query}`)
        return res.data
    }
}