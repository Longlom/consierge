export type IChatMessageResponse = {};

export async function POST(request: Request) {
    const res = await request.json();

    try {
        return Response.json(
            {},
            {
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Access-Control-Allow-Methods':
                        'GET, POST, PUT, DELETE, OPTIONS'
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
