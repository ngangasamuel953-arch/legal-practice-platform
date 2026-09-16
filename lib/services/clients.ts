import { prisma } from "@/lib/prisma";
import { ClientType, ClientStatus } from "@prisma/client";

export type CreateClientInput = {
  name: string;
  type: ClientType;
  email?: string;
  phone?: string;
  alternativePhone?: string;
  postalAddress?: string;
  physicalAddress?: string;
  city?: string;
  country?: string;
  notes?: string;
  responsibleUserId?: string;
};

function clean(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export async function createClient(data: CreateClientInput) {
  const name = data.name.trim();

  if (!name) {
    throw new Error("Client name is required.");
  }

  const client = await prisma.client.create({
    data: {
      clientNumber: `CLI-${Date.now()}`,
      name,
      type: data.type,
      status: ClientStatus.ACTIVE,
      email: clean(data.email),
      phone: clean(data.phone),
      alternativePhone: clean(data.alternativePhone),
      postalAddress: clean(data.postalAddress),
      physicalAddress: clean(data.physicalAddress),
      city: clean(data.city),
      country: clean(data.country) ?? "Kenya",
      notes: clean(data.notes),
      responsibleUserId: clean(data.responsibleUserId),
    },
  });

  return client;
}

export async function getClientById(id: string) {
  return prisma.client.findUnique({
    where: { id },
    include: {
      matters: true,
    },
  });
}

export async function listClients() {
  return prisma.client.findMany({
    orderBy: {
      name: "asc",
    },
  });
}