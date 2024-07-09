import axios from "../utils/axios"
import { ENV } from "../utils/constants"

class BRANCH {
    async getAllBranches(page, limit, query) {
        const res = await axios.get(`${ENV.BRANCH}?page=${page}&limit=${limit}&query=${query}`)
        return res.data
    }
    async checkCode(code) {
        const res = await axios.post(`${ENV.BRANCH}/check-code`, { code })
        return res.data
    }
}

export const branchController = new BRANCH()