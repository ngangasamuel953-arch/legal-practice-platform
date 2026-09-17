import { prisma } from "@/lib/prisma";
import { MatterStatus, MatterType } from "@prisma/client";

export type CreateMatterInput = {
  title: string;
  description?: string;
  type: MatterType;
  clientId: string;
  responsibleUserId?: string;
  notes?: string;
};

function clean(value?: string) {
  const trimmed = value?.trim();
  return trimmed ? trimmed : undefined;
}

export async function createMatter(data: CreateMatterInput) {
  const title = data.title.trim();

  if (!title) {
    throw new Error("Matter title is required.");
  }

  if (!data.clientId) {
    throw new Error("Client is required.");
  }

  const client = await prisma.client.findUnique({
    where: {
      id: data.clientId,
    },
  });

  if (!client) {
    throw new Error("Client not found.");
  }

  return prisma.matter.create({
    data: {
      matterNumber: `MAT-${Date.now()}`,
      title,
      description: clean(data.description),
      type: data.type,
      status: MatterStatus.OPEN,
      clientId: data.clientId,
      responsibleUserId: clean(data.responsibleUserId),
      notes: clean(data.notes),
    },
  });
}

export async function getMatterById(id: string) {
  return prisma.matter.findUnique({
    where: {
      id,
    },
    include: {
      client: true,
      tasks: true,
      deadlines: true,
      activities: true,
    },
  });
}

export async function listMatters() {
  return prisma.matter.findMany({
    orderBy: {
      title: "asc",
    },
    include: {
      client: true,
    },
  });
}

export async function listMattersByClient(clientId: string) {
  return prisma.matter.findMany({
    where: {
      clientId,
    },
    orderBy: {
      title: "asc",
    },
  });
}
