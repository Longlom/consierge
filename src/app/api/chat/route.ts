import { authorizeUser } from '@/resources/rebooking-resources';
import { cookies } from 'next/headers';

import data from './chatData.json';

const ONE_WEEK = 7 * 24 * 60 * 60 * 1000;

export type IChatDataResponse = {
    name: string;
    choices: { title: string; description: string }[];
}[];

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    try {
        return Response.json(data);
    } catch (error) {
        console.log('error - ', error);
        let e = error as Error;
        return new Response(e.message, {
            status: 500
        });
    }
}
