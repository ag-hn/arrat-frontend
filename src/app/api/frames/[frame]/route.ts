import { extractUnit, INTERNAL__FRAME_URL_PARAM_DELIMITER } from "@/lib/audit-utils";
import { aws } from "@/server/aws/aws.facade";
import { isAwsError } from "@/server/zod/schema.sessions";
import { NextResponse, type NextRequest } from "next/server"

export async function GET(req: NextRequest) {
  const frame = req.nextUrl.pathname.split('/')[3]
  if (!frame) return new Response('No frame provided', { status: 400 })

  const paramParts = frame.split(INTERNAL__FRAME_URL_PARAM_DELIMITER);
  const frameName = paramParts[0]
  const unit = paramParts[1] ? extractUnit(paramParts[1]) : undefined
  const session = paramParts[2]

  if (!unit || !frameName || !session) return new Response('No frame found', { status: 404 })

  const frameData = await aws.getUnitFramesById(session, unit)
  if (isAwsError(frameData) || !frameData?.data.frames || frameData.data.frames.length === 0) return new Response(`No input frames.json matching given unit ${unit}`, { status: 404 })
  const {
    data: { frames }
  } = frameData;
  const potentialFrame = frames.find((f) => f.time === frameName);

  if (!potentialFrame) return new Response('No frame found', { status: 404 })

  return new NextResponse(JSON.stringify(potentialFrame), {
    headers: {
      'Content-Type': 'application/json'
    },
    status: 200,
  })
}
