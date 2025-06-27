import { aws } from "@/server/aws/aws.facade";
import { isAwsError } from "@/server/zod/schema.sessions";
import { NextResponse, type NextRequest } from "next/server";

export async function GET(req: NextRequest) {
  const session = req.nextUrl.pathname.split('/')[3]
  if (!session) return new Response('No session provided', { status: 400 })

  const res = await aws.getSessionGeojsonById(session)
  if (isAwsError(res) || !res.data.geojson) return new Response('No session data found', { status: 404 })

  return new NextResponse(JSON.stringify(res.data.geojson), {
    headers: {
      'Content-Type': 'application/json'
    },
    status: 200,
  })
}

