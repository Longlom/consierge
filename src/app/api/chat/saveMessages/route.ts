/* eslint-disable @typescript-eslint/no-unused-vars */
export type IChatMessageResponse = {};
import { saveMessage } from '@/resources/history';
import { cookies } from 'next/headers'

export async function POST(request: Request) {

    try {
        const cookieStore = cookies()
        const res = await request.json();
        const token = cookieStore.get('TOKEN')
        console.log(' token -', token)
        console.log('res -', res)
        const saveOp = await saveMessage({ consierge_message: res.consiergeMsg, user_message: res.userMsg, token: token?.value || '' });
        return Response.json(
            {},
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods':
                        'GET, POST, PUT, DELETE, OPTIONS',
                    'Access-Control-Allow-Headers': 'Content-Type, Authorization',

                }
            }
        );
    } catch (error) {
        let e = error as Error;
        return new Response(e.message, {
            status: 500
        });
    }
}
