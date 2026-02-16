import { NextResponse } from "next/server"
// import { prisma } from "@/lib/prisma"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    // TODO: Once Prisma schema is set up with announcements table
    // const announcement = await prisma.announcement.findFirst({
    //   where: {
    //     isActive: true,
    //     startDate: { lte: new Date() },
    //     OR: [
    //       { endDate: null },
    //       { endDate: { gte: new Date() } }
    //     ]
    //   },
    //   orderBy: { priority: 'desc' }
    // })

    // For now, return null to gracefully handle missing announcements
    return NextResponse.json({ announcement: null })
  } catch (error) {
    console.error("Failed to fetch announcements:", error)
    return NextResponse.json({ announcement: null })
  }
}
