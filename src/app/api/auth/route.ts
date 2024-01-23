import { authorizeUser } from "@/resources/rebooking-resources";

export type IAuthSuccesfullResponse = {
    token: string;
}

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)

    
    const creds = { login: searchParams.get('login') || '', password: searchParams.get('password') || '' }

    console.log('creds -', creds)
    try {
        const authData = await authorizeUser(creds);
        console.log('authData - ,', authData)
        return Response.json({ token: authData.data.token })
    } catch (error) {
        let e = error as Error;
        return new Response(e.message, {
            status: 401,
        })
    }
}