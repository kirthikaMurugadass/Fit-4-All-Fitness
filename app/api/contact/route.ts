import { NextRequest, NextResponse } from "next/server"
import { writeClient } from "@/sanity/lib/writeClient"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    
    // Validate required fields
    if (!body.name || !body.email || !body.message) {
      return NextResponse.json(
        { error: "Missing required fields: name, email, and message are required" },
        { status: 400 }
      )
    }

    // Create contact message document in Sanity
    const document = {
      _type: "contactMessage",
      name: body.name,
      email: body.email,
      phone: body.phone || "",
      subject: body.subject || "General Inquiry",
      message: body.message,
      createdAt: new Date().toISOString(),
    }

    const result = await writeClient.create(document)

    return NextResponse.json(
      { success: true, id: result._id },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error creating contact message:", error)
    return NextResponse.json(
      { error: "Failed to send message. Please try again." },
      { status: 500 }
    )
  }
}
