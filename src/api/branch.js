import axios from "../utils/axios"
import { ENV } from "../utils/constants"

export class BRANCH {
    async checkCode(code) {
        const res = await axios.post(`${ENV.BRANCH}/check-code`, { code })
        return res.data
    }
}