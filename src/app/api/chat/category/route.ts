import data from './chatData.json';

export type CategoryType =
    | 'realPlace'
    | 'weekendPlan'
    | 'food'
    | 'free'
    | 'excursion'
    | 'facts';

export type IChatDataResponse = {
    name: string;
    choices: {
        title: string;
        description: string;
        img: string;
        view?: string;
        type: CategoryType;
    }[];
}[];

export async function GET() {
    try {
        return Response.json(data);
    } catch (error) {
        let e = error as Error;
        return new Response(e.message, {
            status: 500
        });
    }
}
