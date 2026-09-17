import { NextRequest, NextResponse } from "next/server";
import { createMatter, listMatters } from "@/lib/services/matters";

export async function GET() {
  try {
    const matters = await listMatters();

    return NextResponse.json({
      success: true,
      data: matters,
    });
  } catch (error) {
    console.error("GET /api/matters error:", error);

    return NextResponse.json(
      {
        success: false,
        error: "Failed to retrieve matters.",
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const matter = await createMatter(body);

    return NextResponse.json(
      {
        success: true,
        data: matter,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("POST /api/matters error:", error);

    const message =
      error instanceof Error ? error.message : "Failed to create matter.";

    return NextResponse.json(
      {
        success: false,
        error: message,
      },
      { status: 400 }
    );
  }
}
