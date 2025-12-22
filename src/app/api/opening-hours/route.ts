// app/api/opening-hours/route.ts
import { NextRequest, NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import OpeningHours from "@/models/OpeningHours"

interface OpeningHourDay {
  day: {
    fr: string
    ar: string
  }
  hours: {
    fr: string
    ar: string
  }
  isClosed: boolean
  order: number
}

interface OpeningHoursData {
  hours: OpeningHourDay[]
  note: {
    fr: string
    ar: string
  }
}

interface ValidationError extends Error {
  name: "ValidationError"
  errors: {
    [key: string]: {
      message: string
    }
  }
}

function isValidationError(error: unknown): error is ValidationError {
  return (
    typeof error === "object" &&
    error !== null &&
    "name" in error &&
    error.name === "ValidationError"
  )
}

// GET - Récupérer les horaires d'ouverture (un seul document)
export async function GET() {
  try {
    await connectToDatabase()

    // Récupérer le document unique
    let openingHours = await OpeningHours.findOne({ singleton: "opening_hours" })

    // Si aucun document n'existe, créer les données par défaut
    if (!openingHours) {
      const defaultHours = {
        hours: [
          {
            day: { fr: "Lundi", ar: "الاثنين" },
            hours: { fr: "08:00 - 18:00", ar: "08:00 - 18:00" },
            isClosed: false,
            order: 1
          },
          {
            day: { fr: "Mardi", ar: "الثلاثاء" },
            hours: { fr: "08:00 - 18:00", ar: "08:00 - 18:00" },
            isClosed: false,
            order: 2
          },
          {
            day: { fr: "Mercredi", ar: "الأربعاء" },
            hours: { fr: "08:00 - 18:00", ar: "08:00 - 18:00" },
            isClosed: false,
            order: 3
          },
          {
            day: { fr: "Jeudi", ar: "الخميس" },
            hours: { fr: "08:00 - 18:00", ar: "08:00 - 18:00" },
            isClosed: false,
            order: 4
          },
          {
            day: { fr: "Vendredi", ar: "الجمعة" },
            hours: { fr: "08:00 - 18:00", ar: "08:00 - 18:00" },
            isClosed: false,
            order: 5
          },
          {
            day: { fr: "Samedi", ar: "السبت" },
            hours: { fr: "09:00 - 16:00", ar: "09:00 - 16:00" },
            isClosed: false,
            order: 6
          },
          {
            day: { fr: "Dimanche", ar: "الأحد" },
            hours: { fr: "Fermé", ar: "مغلق" },
            isClosed: true,
            order: 7
          }
        ],
        note: {
          fr: "Nous sommes également disponibles sur rendez-vous en dehors de ces horaires.",
          ar: "نحن متاحون أيضًا بموعد خارج هذه الساعات."
        },
        singleton: "opening_hours"
      }

      openingHours = await OpeningHours.create(defaultHours)
    }

    return NextResponse.json(
      { success: true, data: openingHours },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("Erreur lors de la récupération des horaires:", error)
    return NextResponse.json(
      { success: false, message: "Erreur serveur" },
      { status: 500 }
    )
  }
}

// PUT - Mettre à jour les horaires d'ouverture (un seul document)
export async function PUT(request: NextRequest) {
  try {
    await connectToDatabase()

    const body = (await request.json()) as OpeningHoursData

    // Validation des données
    if (!body.hours || !Array.isArray(body.hours)) {
      return NextResponse.json(
        { success: false, message: "Les horaires sont requis" },
        { status: 400 }
      )
    }

    if (body.hours.length !== 7) {
      return NextResponse.json(
        { success: false, message: "7 jours sont requis" },
        { status: 400 }
      )
    }

    // Mettre à jour ou créer le document unique
    const openingHours = await OpeningHours.findOneAndUpdate(
      { singleton: "opening_hours" },
      {
        hours: body.hours,
        note: body.note || {
          fr: "Nous sommes également disponibles sur rendez-vous en dehors de ces horaires.",
          ar: "نحن متاحون أيضًا بموعد خارج هذه الساعات."
        }
      },
      {
        new: true, // Retourner le document mis à jour
        upsert: true, // Créer si n'existe pas
        runValidators: true // Exécuter les validations
      }
    )

    return NextResponse.json(
      {
        success: true,
        message: "Horaires d'ouverture mis à jour avec succès",
        data: openingHours
      },
      { status: 200 }
    )
  } catch (error: unknown) {
    console.error("Erreur lors de la mise à jour des horaires:", error)

    if (isValidationError(error)) {
      return NextResponse.json(
        {
          success: false,
          message: "Erreur de validation",
          errors: Object.values(error.errors).map((e) => e.message)
        },
        { status: 400 }
      )
    }

    return NextResponse.json(
      {
        success: false,
        message: "Erreur lors de la mise à jour des horaires d'ouverture"
      },
      { status: 500 }
    )
  }
}

