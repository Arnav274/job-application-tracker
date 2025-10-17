import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/db"

// get all applications for logged in user
export async function GET() {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const applications = await db.application.findMany({
      where: { userId: user.id },
      orderBy: { appliedOn: 'desc' }
    })

    return NextResponse.json(applications)
  } catch (error) {
    console.error("Error fetching applications:", error)
    return NextResponse.json({ error: "Failed to fetch" }, { status: 500 })
  }
}

// create new application
export async function POST(req: Request) {
  try {
    const session = await getServerSession(authOptions)
    
    if (!session?.user?.email) {
      return NextResponse.json({ error: "Not authenticated" }, { status: 401 })
    }

    const user = await db.user.findUnique({
      where: { email: session.user.email }
    })

    if (!user) {
      return NextResponse.json({ error: "User not found" }, { status: 404 })
    }

    const body = await req.json()
    const { company, position, url, status, location, salary, notes, appliedOn } = body

    if (!company || !position) {
      return NextResponse.json({ error: "Company and position required" }, { status: 400 })
    }

    const application = await db.application.create({
      data: {
        userId: user.id,
        company,
        position,
        url: url || null,
        status: status || 'APPLIED',
        location: location || null,
        salary: salary || null,
        notes: notes || null,
        appliedOn: appliedOn ? new Date(appliedOn) : new Date(),
      }
    })

    return NextResponse.json(application)
  } catch (error) {
    console.error("Error creating application:", error)
    return NextResponse.json({ error: "Failed to create" }, { status: 500 })
  }
}
