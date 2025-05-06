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
      town: "Granada",
      province: "Granada",
      country: "España"
    }
  });

  console.log("Añadida la comunidad: ", community);

  const users = await prisma.user.createMany({
    data: [
      {
        email: "fran@gmail.com",
        role: "admin",
        username: "fcosueza",
        name: "Francisco",
        surname: "Sueza Rodríguez",
        street: "Arrayanes",
        number: 6,
        floor: 4,
        letter: "A",
        town: "Granada"
      },
      {
        email: "juan@gmail.com",
        role: "tenant",
        username: "juanjuan",
        name: "Juan",
        surname: "Ponce Perez",
        street: "Arrayanes",
        number: 6,
        floor: 2,
        letter: "B",
        town: "Granada"
      },
      {
        email: "alberto@gmail.com",
        role: "tenant",
        username: "albertito",
        name: "Alberto",
        surname: "Garcia Garcia",
        street: "Arrayanes",
        number: 6,
        floor: 1,
        letter: "D",
        town: "Granada"
      }
    ],
    skipDuplicates: true
  });

  console.log("Usuarios añadidos: ", users);

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

  console.log("Añadidos credenciales: ", credentials);

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

  console.log("Añadidos mensajes: ", messages);

  const zonas = await prisma.zona.createMany({
    data: [
      {
        nombre: "Campo de Fútbol",
        comunidad: 1,
        descripcion: "Campo de futbol con hierba artifical",
        imagen: null,
        hora_inicio: new Date("2019-01-01 10:00:00"),
        hora_fin: new Date("2019-01-01 20:00:00")
      },
      {
        nombre: "Pista de Padel",
        comunidad: 1,
        descripcion: "Pista de padel cerrada.",
        imagen: null,
        hora_inicio: new Date("2019-01-01 10:30:00"),
        hora_fin: new Date("2019-01-01 20:15:00")
      },
      {
        nombre: "SPA",
        comunidad: 1,
        descripcion: "SPA con diferentes tipos de agua y chorros.",
        imagen: null,
        hora_inicio: new Date("2019-01-01 10:00:00"),
        hora_fin: new Date("2019-01-01 21:00:00")
      }
    ],
    skipDuplicates: true
  });

  console.log("Añadidas zonas: ", zonas);

  const incidencias = await prisma.incidencia.createMany({
    data: [
      {
        comunidad: 1,
        usuario: "fran@gmail.com",
        fecha: new Date(),
        descripcion: "Rotura de bombilla en planta 4",
        estado: "creada"
      },
      {
        comunidad: 1,
        usuario: "fran@gmail.com",
        fecha: new Date(),
        descripcion: "Vecino ruidoso",
        estado: "procesandose"
      },
      {
        comunidad: 1,
        usuario: "juan@gmail.com",
        fecha: new Date(),
        descripcion: "Hoyo en campo de futbol",
        estado: "solucionada"
      }
    ],
    skipDuplicates: true
  });

  console.log("Añadidas incidencias: ", incidencias);

  const reservas = await prisma.reserva.createMany({
    data: [
      {
        usuario: "fran@gmail.com",
        comunidad: 1,
        zona: "SPA",
        fecha: new Date("2024-01-05"),
        hora_inicio: new Date("2019-01-01 20:00:00"),
        hora_fin: new Date("2019-01-01 21:00:00")
      },
      {
        usuario: "juan@gmail.com",
        comunidad: 1,
        zona: "Pista de Padel",
        fecha: new Date("2024-02-09"),
        hora_inicio: new Date("2019-01-01 10:00:00"),
        hora_fin: new Date("2019-01-01 14:00:00")
      }
    ],
    skipDuplicates: true
  });

  console.log("Añadidas reservas: ", reservas);

  const inscripciones = await prisma.inscripcion.createMany({
    data: [
      {
        usuario: "fran@gmail.com",
        comunidad: 1
      },
      {
        usuario: "juan@gmail.com",
        comunidad: 1
      }
    ],
    skipDuplicates: true
  });

  console.log("Añadidas inscripciones: ", inscripciones);

  const solicitudes = await prisma.solicitud.createMany({
    data: [
      {
        usuario: "fran@gmail.com",
        comunidad: 1,
        estado: "aprobada"
      },
      {
        usuario: "juan@gmail.com",
        comunidad: 1,
        estado: "aprobada"
      },
      {
        usuario: "alberto@gmail.com",
        comunidad: 1,
        estado: "pendiente"
      }
    ],
    skipDuplicates: true
  });

  console.log("Añadidas solicitudes: ", solicitudes);

  const contactos = await prisma.contacto.createMany({
    data: [
      {
        nombre: "Fran Son",
        correo: "fran@gmail.com",
        mensaje: "Lorem ipsum dolo sit amet"
      },
      {
        nombre: "Okina",
        correo: "Okina@gmail.com",
        mensaje: "Lorem ipsum dolo sit amet"
      }
    ],
    skipDuplicates: true
  });

  console.log("Añadidas solicitudes: ", contactos);
}

main();
