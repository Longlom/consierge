import axios from "axios";

const BASE_URL = 'https://back.rebooking.travel/gptour/api';
const API_KEY = '79cYl8e2magRlt4jqJScu8nY7AoTqqo0KaXXD0owwkI=';

const instance = axios.create(
    {
        baseURL: BASE_URL,
        timeout: 600,
        params: {
            apiKey: API_KEY,
        }
    }
)

export type IAuthCredentials = {
    login: string;
    password: string;
}

export type IAuthUserResponse = {
    data: {
        token: string;
    }
}

export const authorizeUser = async ({ login, password }: IAuthCredentials): Promise<IAuthUserResponse> => {

    return instance.get('/authorization', {
        params: {
            login, password
        }
    })


}