

export type IChatMessageResponse = {};

export async function GET() {
    try {
        return Response.json([]);
    } catch (error) {

        let e = error as Error;
        return new Response(e.message, {
            status: 500
        });
    }
}
