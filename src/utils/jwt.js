import { jwtDecode } from "jwt-decode"

export const hasExpiredToken = (token) => {
    const { exp } = (token);

    const currentData = new Date().getTime();

    if (exp <= currentData) {
        return true;
    }

    return false;
};

export const getUserByToken = (token) => {
    const { user } = jwtDecode(token);
    return user;
};