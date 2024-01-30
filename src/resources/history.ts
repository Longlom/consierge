import axios from "axios";


const instance = axios.create(
    {
        baseURL: process.env.NEXT_PUBLIC_HISTORY_BACK_URL,
        timeout: 1000,
    }
)

export type IGetMessagesParams = {
    token: string;
}

export type ISaveMessagesParams = {
    token: string,
    user_message: string,
    consierge_message: string,
}

export type IGetMessagesResponse = {
    data :{
        user_msg: string,
        consierge_msg: string
    }[]
}

export const getMessages = async ({ token }: IGetMessagesParams): Promise<IGetMessagesResponse> => {

    return instance.get('/messageHistory/v1.0/get', {
        params: {
            token,
        }
    })
}

export const saveMessage = async (data: ISaveMessagesParams): Promise<void> => {

    return instance.post('/messageHistory/v1.0/save', data)
}