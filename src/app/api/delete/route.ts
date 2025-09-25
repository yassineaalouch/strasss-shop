import { NextRequest, NextResponse } from "next/server"
import { deleteFileFromS3 } from "@/lib/s3"

export async function DELETE(req: NextRequest) {
  const { fileName } = await req.json()

  if (!fileName)
    return NextResponse.json({ error: "No fileName provided" }, { status: 400 })

  await deleteFileFromS3(fileName)

  return NextResponse.json({ success: true })
}
