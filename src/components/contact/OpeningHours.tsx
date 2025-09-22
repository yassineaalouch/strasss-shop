"use client"
import React from "react"
import { Clock } from "lucide-react"
import { OpeningHour } from "@/types/type"
import { useTranslations } from "next-intl"
const OpeningHours = () => {
  const t = useTranslations("ContactPage.OpeningHours")

  const openingHours: OpeningHour[] = [
    { day: t("days.monday"), hours: t("hours.weekdays") },
    { day: t("days.tuesday"), hours: t("hours.weekdays") },
    { day: t("days.wednesday"), hours: t("hours.weekdays") },
    { day: t("days.thursday"), hours: t("hours.weekdays") },
    { day: t("days.friday"), hours: t("hours.weekdays") },
    { day: t("days.saturday"), hours: t("hours.saturday") },
    { day: t("days.sunday"), hours: t("hours.closed") }
  ]

  return (
    <div className="bg-white rounded-lg shadow-lg p-8">
      <div className="flex items-center justify-center mb-6">
        <div className="w-20 h-20 bg-blue-500 text-white rounded-full flex items-center justify-center">
          <Clock size={40} />
        </div>
      </div>

      <h3 className="text-xl font-semibold text-gray-800 mb-6 text-center">
        {t("title")}
      </h3>

      <div className="space-y-3">
        {openingHours.map((schedule, index) => (
          <div
            key={index}
            className="flex justify-between items-center py-2 px-3 rounded"
          >
            <span className="font-medium text-gray-700">{schedule.day}</span>
            <span
              className={`${
                schedule.hours === t("hours.closed")
                  ? "text-red-500 font-medium"
                  : "text-gray-600"
              }`}
            >
              {schedule.hours}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-6 p-4 bg-green-50 rounded-lg">
        <p className="text-sm text-green-700 text-center">
          <strong>{t("note.label")}</strong> {t("note.text")}
        </p>
      </div>
    </div>
  )
}

export default OpeningHours
