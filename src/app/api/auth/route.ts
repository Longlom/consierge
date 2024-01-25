import { authorizeUser } from "@/resources/rebooking-resources";
import { cookies } from "next/headers";

const ONE_WEEK = 7 *  24 * 60 * 60 * 1000;

export type IAuthSuccesfullResponse = {
    token: string;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    
    const creds = { login: searchParams.get('login') || '', password: searchParams.get('password') || '' }

    console.log('creds -', creds)
    try {
        const authData = await authorizeUser(creds);
        cookies().set('TOKEN', authData.data.token, {expires: new Date(Date.now() + ONE_WEEK)})
        return Response.json({ token: authData.data.token })
    } catch (error) {
        console.log('error - ', error)
        let e = error as Error;
        return new Response(e.message, {
            status: 401,
        })
    }
}