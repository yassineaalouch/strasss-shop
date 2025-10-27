// import { NextResponse } from "next/server"
// import Characteristic from "@/models/Characteristic"
// import mongoose from "mongoose"
// import { connectToDatabase } from "@/lib/mongodb"

// // GET - Une seule caractéristique
// export async function GET(
//   _: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params
//   await connectToDatabase()
//   const characteristic = await Characteristic.findById(id)
//   return NextResponse.json(characteristic)
// }

// // PUT - Modifier une caractéristique ou ses valeurs
// export async function PUT(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params

//   await connectToDatabase()
//   const body = await req.json()
//   const updated = await Characteristic.findByIdAndUpdate(id, body, {
//     new: true
//   })
//   return NextResponse.json(updated)
// }

// // DELETE - Supprimer une caractéristique
// export async function DELETE(
//   req: Request,
//   context: { params: Promise<{ id: string }> }
// ) {
//   const { id } = await context.params
//   await connectToDatabase()

//   if (!mongoose.Types.ObjectId.isValid(id)) {
//     return NextResponse.json({ error: "Invalid ID" }, { status: 400 })
//   }

//   await Characteristic.findByIdAndDelete(id)
//   return NextResponse.json({ success: true })
// }
import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import Characteristic from "@/models/Characteristic"
import mongoose from "mongoose"

export async function PUT(
  req: Request,

  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  await connectToDatabase()
  const body = await req.json()
  const updated = await Characteristic.findByIdAndUpdate(id, body, {
    new: true
  })
  return NextResponse.json(updated)
}

export async function DELETE(
  _: Request,
  context: { params: Promise<{ id: string }> }
) {
  const { id } = await context.params
  await connectToDatabase()
  if (!mongoose.Types.ObjectId.isValid(id))
    return NextResponse.json({ error: "Invalid ID" }, { status: 400 })

  await Characteristic.findByIdAndDelete(id)
  return NextResponse.json({ success: true })
}
