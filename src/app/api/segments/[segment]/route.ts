import { type NextRequest, NextResponse } from "next/server"
import { aws } from '@/server/aws/aws.facade'
import { INTERNAL__FRAME_URL_PARAM_DELIMITER } from '@/lib/audit-utils'
import { isAwsError } from "@/server/zod/schema.sessions"

export async function GET(req: NextRequest) {
  const params = req.nextUrl.pathname.split('/')[3]
  if (!params) return new Response('No segment provided', { status: 400 })

  const paramParts = params.split(INTERNAL__FRAME_URL_PARAM_DELIMITER);
  const segment = paramParts[0]
  const session = paramParts[1]

  if (!segment || !session) return new Response('No frame found', { status: 404 })

  const res = await aws.getSessionGeojsonById(session)
  if (isAwsError(res) || !res.data.geojson) {
    return new Response('No frame found', { status: 404 })
  }

  const {
    features
  } = res.data.geojson;
  const potentialSegment = features.find((f) => f.properties.id === segment);

  if (!potentialSegment) return new Response('No frame found', { status: 404 })

  return new NextResponse(JSON.stringify(potentialSegment), {
    headers: {
      'Content-Type': 'application/json'
    },
    status: 200,
  })
}

