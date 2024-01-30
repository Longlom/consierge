import { getMessages } from "@/resources/history";
import { cookies } from "next/headers";


export type IChatMessageResponse = {};

export async function GET(request: Request) {
    try {
        const { searchParams } = new URL(request.url)
        const token = searchParams.get("token")

        if (!token) {
            throw new Error('There is no token')
        }

        const messages = await getMessages({ token: token });
        const parsedMsgs = messages.data.map((msg) => ({userMsg: msg.user_msg , consiergeMsg:  msg.consierge_msg}))
        return Response.json(parsedMsgs);
    } catch (error) {

        let e = error as Error;
        return new Response(e.message, {
            status: 500
        });
    }
}
