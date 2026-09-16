import { createClient, listClients } from "@/lib/services/clients";
import { ClientType } from "@prisma/client";

export async function GET() {
  try {
    const clients = await listClients();

    return Response.json(clients, {
      status: 200,
    });
  } catch (error) {
    console.error("Failed to list clients:", error);

    return Response.json(
      {
        error: "Failed to retrieve clients.",
      },
      {
        status: 500,
      },
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    if (!body.name || !body.type) {
      return Response.json(
        {
          error: "Client name and client type are required.",
        },
        {
          status: 400,
        },
      );
    }

    if (!Object.values(ClientType).includes(body.type)) {
      return Response.json(
        {
          error: "Invalid client type.",
        },
        {
          status: 400,
        },
      );
    }

    const client = await createClient({
      name: body.name,
      type: body.type,
      email: body.email,
      phone: body.phone,
      alternativePhone: body.alternativePhone,
      postalAddress: body.postalAddress,
      physicalAddress: body.physicalAddress,
      city: body.city,
      country: body.country,
      notes: body.notes,
      responsibleUserId: body.responsibleUserId,
    });

    return Response.json(client, {
      status: 201,
    });
  } catch (error) {
    console.error("Failed to create client:", error);

    return Response.json(
      {
        error: "Failed to create client.",
      },
      {
        status: 500,
      },
    );
  }
}