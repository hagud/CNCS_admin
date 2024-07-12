const BASE_API_URL = !process.env.REACT_APP_TYPE ? process.env.REACT_APP_BASE_API_URL_DEV : process.env.REACT_APP_BASE_API_URL;

export const ENV = {
    BASE_API_URL,
    BRANCH: "/branch",
    CITY: "/city",
    BRANCHES_TYPE: "/branches-type",
    FUNDS_TYPE: "/funds-type",
    STATE: "/state",
    COMMUNITY: "/community",
    SOFTWARE: "/software",
    ROLE: "/role",
    USER: "/user",
}