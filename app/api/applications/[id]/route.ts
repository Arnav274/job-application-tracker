import { NextResponse } from "next/server"
import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"
import { db } from "@/lib/db"

// update application
export async function PATCH(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    // verify ownership
    const existing = await db.application.findUnique({
      where: { id: params.id }
    })

    if (!existing || existing.userId !== user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    const body = await req.json()
    
    const updated = await db.application.update({
      where: { id: params.id },
      data: body
    })

    return NextResponse.json(updated)
  } catch (error) {
    console.error("Error updating application:", error)
    return NextResponse.json({ error: "Failed to update" }, { status: 500 })
  }
}

// delete application
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
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

    // verify ownership before deleting
    const existing = await db.application.findUnique({
      where: { id: params.id }
    })

    if (!existing || existing.userId !== user.id) {
      return NextResponse.json({ error: "Not found" }, { status: 404 })
    }

    await db.application.delete({
      where: { id: params.id }
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Error deleting application:", error)
    return NextResponse.json({ error: "Failed to delete" }, { status: 500 })
  }
}
