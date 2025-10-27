import { NextRequest, NextResponse } from "next/server"
import { QA, IQA } from "@/models/QA"
import { connectToDatabase } from "@/lib/mongodb"
import mongoose from "mongoose"

interface Params {
  params: {
    id: string
  }
}

export async function PUT(req: NextRequest, { params }: Params) {
  try {
    await connectToDatabase()
    const body: IQA = await req.json()

    const updated = await QA.findByIdAndUpdate(params.id, body, {
      new: true
    })

    return NextResponse.json({ success: true, data: updated })
  } catch (error) {
    if (error instanceof Error) {
      return NextResponse.json(
        { success: false, error: error.message },
        { status: 500 }
      )
    }
    return NextResponse.json(
      { success: false, error: "Unknown error" },
      { status: 500 }
    )
  }
}

export async function DELETE(_: NextRequest, { params }: Params) {
  await connectToDatabase()

  if (!mongoose.Types.ObjectId.isValid(params.id)) {
    return NextResponse.json(
      { success: false, error: "Invalid ID" },
      { status: 400 }
    )
  }

  await QA.findByIdAndDelete(params.id)
  return NextResponse.json({ success: true })
}
