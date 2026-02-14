import { prisma } from "./lib/prisma";

async function main() {
  const bettas = await prisma.bettas.create({
    data: {
      name: "agus",
    },
  });
}
