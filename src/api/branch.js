import axios from "../utils/axios"
import { ENV } from "../utils/constants"

class BRANCH {
    async createBranch(branch) {
        const res = await axios.post(`${ENV.BRANCH}/create`, branch)
        return res.data
    }
    async getAllBranches(page, limit, query) {
        const res = await axios.get(`${ENV.BRANCH}?page=${page}&limit=${limit}&query=${query}`)
        return res.data
    }
    async getBranchById(id) {
        const res = await axios.get(`${ENV.BRANCH}/${id}`)
        return res.data
    }
    async checkCode(code) {
        const res = await axios.post(`${ENV.BRANCH}/check-code`, { code })
        return res.data
    }
}

export const branchController = new BRANCH()