

export type IChatMessageResponse = {};

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    try {
        return Response.json([]);
    } catch (error) {

        let e = error as Error;
        return new Response(e.message, {
            status: 500
        });
    }
}
