import { NextRequest, NextResponse } from "next/server"
import { uploadFileToS3 } from "@/lib/s3"

export async function POST(req: NextRequest) {
  const formData = await req.formData()
  const file = formData.get("file") as File

  if (!file)
    return NextResponse.json({ error: "No file uploaded" }, { status: 400 })

  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  const fileName = `${Date.now()}-${file.name}`
  const url = await uploadFileToS3(buffer, fileName, file.type)

  return NextResponse.json({ url })
}
