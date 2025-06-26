import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

/**
 * Función main() en seed.ts
 *
 * Función  principal de Prisma para poblar la base de datos con datos de prueba.
 *
 * @return Una promesa de tipo void.
 */

async function main(): Promise<void> {
  const community = await prisma.community.create({
    data: {
      name: "Arrayanes6",
      street: "Arrayanes",
      number: 6,
      city: "Granada",
      province: "Granada",
      country: "España"
    }
  });

  console.log("Communities added: ", community);

  const users = await prisma.user.createMany({
    data: [
      {
        email: "fran@gmail.com",
        role: "admin",
        name: "Francisco",
        surname: "Sueza Rodríguez"
      },
      {
        email: "juan@gmail.com",
        role: "tenant",
        name: "Juan",
        surname: "Ponce Perez"
      },
      {
        email: "alberto@gmail.com",
        role: "tenant",
        name: "Alberto",
        surname: "Garcia Garcia"
      }
    ],
    skipDuplicates: true
  });

  console.log("Users added: ", users);

  const credentials = await prisma.credentials.createMany({
    data: [
      {
        user: "fran@gmail.com",
        password: "12345"
      },
      {
        user: "juan@gmail.com",
        password: "5433212"
      },
      {
        user: "alberto@gmail.com",
        password: "dsnojiaiojs"
      }
    ],
    skipDuplicates: true
  });

  console.log("Credentials added: ", credentials);

  const messages = await prisma.message.createMany({
    data: [
      {
        createdAt: new Date(),
        community: 1,
        text: "Mensaje de Prueba 1, 2, 3"
      },
      {
        createdAt: new Date(),
        community: 1,
        text: "Junta de vecinos el día 22 de Marzo"
      }
    ],
    skipDuplicates: true
  });

  console.log("Messages added: ", messages);

  const areas = await prisma.area.createMany({
    data: [
      {
        name: "Campo de Fútbol",
        community: 1,
        description: "Campo de futbol con hierba artifical",
        image: null,
        start_time: new Date("2019-01-01 10:00:00"),
        end_time: new Date("2019-01-01 20:00:00")
      },
      {
        name: "Pista de Padel",
        community: 1,
        description: "Pista de padel cerrada.",
        image: null,
        start_time: new Date("2019-01-01 10:30:00"),
        end_time: new Date("2019-01-01 20:15:00")
      },
      {
        name: "SPA",
        community: 1,
        description: "SPA con diferentes tipos de agua y chorros.",
        image: null,
        start_time: new Date("2019-01-01 10:00:00"),
        end_time: new Date("2019-01-01 21:00:00")
      }
    ],
    skipDuplicates: true
  });

  console.log("Areas added: ", areas);

  const incidents = await prisma.incident.createMany({
    data: [
      {
        community: 1,
        user: "fran@gmail.com",
        date: new Date(),
        description: "Rotura de bombilla en planta 4",
        state: "created"
      },
      {
        community: 1,
        user: "fran@gmail.com",
        date: new Date(),
        description: "Vecino ruidoso",
        state: "processing"
      },
      {
        community: 1,
        user: "juan@gmail.com",
        date: new Date(),
        description: "Hoyo en campo de futbol",
        state: "solved"
      }
    ],
    skipDuplicates: true
  });

  console.log("Incidents added: ", incidents);

  const reservations = await prisma.reservation.createMany({
    data: [
      {
        user: "fran@gmail.com",
        community: 1,
        area: "SPA",
        date: new Date("2024-01-05"),
        start_time: new Date("2019-01-01 20:00:00"),
        end_time: new Date("2019-01-01 21:00:00")
      },
      {
        user: "juan@gmail.com",
        community: 1,
        area: "Pista de Padel",
        date: new Date("2024-02-09"),
        start_time: new Date("2019-01-01 10:00:00"),
        end_time: new Date("2019-01-01 14:00:00")
      }
    ],
    skipDuplicates: true
  });

  console.log("Reservations added: ", reservations);

  const registrations = await prisma.registration.createMany({
    data: [
      {
        user: "fran@gmail.com",
        community: 1
      },
      {
        user: "juan@gmail.com",
        community: 1
      }
    ],
    skipDuplicates: true
  });

  console.log("Registrations added: ", registrations);

  const solicitudes = await prisma.request.createMany({
    data: [
      {
        user: "fran@gmail.com",
        community: 1,
        state: "approved"
      },
      {
        user: "juan@gmail.com",
        community: 1,
        state: "approved"
      },
      {
        user: "alberto@gmail.com",
        community: 1,
        state: "pending"
      }
    ],
    skipDuplicates: true
  });

  console.log("Requests added: ", solicitudes);

  const contacts = await prisma.contact.createMany({
    data: [
      {
        name: "Fran Son",
        email: "fran@gmail.com",
        message: "Lorem ipsum dolo sit amet"
      },
      {
        name: "Okina",
        email: "Okina@gmail.com",
        message: "Lorem ipsum dolo sit amet"
      }
    ],
    skipDuplicates: true
  });

  console.log("Añadidas solicitudes: ", contacts);
}

main();
