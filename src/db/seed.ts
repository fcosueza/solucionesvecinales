import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

/**
 * Script que puebla la base de datos con datos de prueba. Se puede ejecutar con el comando `npm run seed` o `yarn seed`.
 */

async function main(): Promise<void> {
  await prisma.usuario.createMany({
    data: [
      {
        email: "fran@gmail.com",
        rol: "admin",
        nombre: "Francisco",
        apellido: "Sueza Rodríguez"
      },
      {
        email: "juan@gmail.com",
        rol: "inquilino",
        nombre: "Juan",
        apellido: "Ponce Perez"
      },
      {
        email: "alberto@gmail.com",
        rol: "inquilino",
        nombre: "Alberto",
        apellido: "Garcia Garcia"
      }
    ],
    skipDuplicates: true
  });

  const [admin, juan, alberto] = await Promise.all([
    prisma.usuario.findUniqueOrThrow({ where: { email: "fran@gmail.com" } }),
    prisma.usuario.findUniqueOrThrow({ where: { email: "juan@gmail.com" } }),
    prisma.usuario.findUniqueOrThrow({ where: { email: "alberto@gmail.com" } })
  ]);

  console.log("Users added: ", [admin, juan, alberto]);

  const saltRounds = 10;
  const plainPasswords = {
    admin: "123451234512345",
    juan: "123451234512345",
    alberto: "dsnojiaiojsdsnojiaiojs"
  };

  const [adminPassword, juanPassword, albertoPassword] = await Promise.all([
    bcrypt.hash(plainPasswords.admin, saltRounds),
    bcrypt.hash(plainPasswords.juan, saltRounds),
    bcrypt.hash(plainPasswords.alberto, saltRounds)
  ]);

  const credenciales = await Promise.all([
    prisma.credenciales.upsert({
      where: { usuario: admin.id },
      update: { password: adminPassword },
      create: {
        usuario: admin.id,
        password: adminPassword
      }
    }),
    prisma.credenciales.upsert({
      where: { usuario: juan.id },
      update: { password: juanPassword },
      create: {
        usuario: juan.id,
        password: juanPassword
      }
    }),
    prisma.credenciales.upsert({
      where: { usuario: alberto.id },
      update: { password: albertoPassword },
      create: {
        usuario: alberto.id,
        password: albertoPassword
      }
    })
  ]);

  console.log("Credentials added: ", credenciales);

  let comunidad = await prisma.comunidad.findFirst({
    where: {
      nombre: "Arrayanes6",
      adminID: admin.id
    }
  });

  if (!comunidad) {
    comunidad = await prisma.comunidad.create({
      data: {
        nombre: "Arrayanes6",
        calle: "Arrayanes",
        numero: 6,
        ciudad: "Granada",
        provincia: "Granada",
        pais: "España",
        admin: {
          connect: {
            id: admin.id
          }
        }
      }
    });
  }

  console.log("Communities added: ", comunidad);

  await prisma.inscripcion.deleteMany({
    where: {
      comunidad: comunidad.id,
      usuario: {
        in: [admin.id, juan.id, alberto.id]
      }
    }
  });

  const inscripciones = await prisma.inscripcion.createMany({
    data: [
      {
        usuario: admin.id,
        comunidad: comunidad.id
      },
      {
        usuario: juan.id,
        comunidad: comunidad.id
      }
    ],
    skipDuplicates: true
  });

  console.log("Community subscriptions added: ", inscripciones);

  const baseMensajeDate = new Date("2024-01-01T10:00:00.000Z");

  await prisma.mensaje.deleteMany({
    where: {
      comunidad: comunidad.id,
      texto: {
        in: ["Mensaje de Prueba 1, 2, 3", "Junta de vecinos el día 22 de Marzo"]
      }
    }
  });

  const mensajes = await prisma.mensaje.createMany({
    data: [
      {
        creadoEn: baseMensajeDate,
        comunidad: comunidad.id,
        texto: "Mensaje de Prueba 1, 2, 3"
      },
      {
        creadoEn: new Date(baseMensajeDate.getTime() + 1000),
        comunidad: comunidad.id,
        texto: "Junta de vecinos el día 22 de Marzo"
      }
    ],
    skipDuplicates: true
  });

  console.log("Messages added: ", mensajes);

  const zonas = await prisma.zona.createMany({
    data: [
      {
        nombre: "Campo de Fútbol",
        comunidad: comunidad.id,
        descripcion: "Campo de futbol con hierba artifical",
        imagen: null,
        hora_inicio: new Date("2019-01-01 10:00:00"),
        hora_fin: new Date("2019-01-01 20:00:00")
      },
      {
        nombre: "Pista de Padel",
        comunidad: comunidad.id,
        descripcion: "Pista de padel cerrada.",
        imagen: null,
        hora_inicio: new Date("2019-01-01 10:30:00"),
        hora_fin: new Date("2019-01-01 20:15:00")
      },
      {
        nombre: "SPA",
        comunidad: comunidad.id,
        descripcion: "SPA con diferentes tipos de agua y chorros.",
        imagen: null,
        hora_inicio: new Date("2019-01-01 10:00:00"),
        hora_fin: new Date("2019-01-01 21:00:00")
      }
    ],
    skipDuplicates: true
  });

  console.log("Areas added: ", zonas);

  const baseIncidenciaDate = new Date("2024-01-02T09:00:00.000Z");

  await prisma.incidencia.deleteMany({
    where: {
      comunidad: comunidad.id,
      descripcion: {
        in: ["Rotura de bombilla en planta 4", "Vecino ruidoso", "Hoyo en campo de futbol"]
      }
    }
  });

  const incidencias = await prisma.incidencia.createMany({
    data: [
      {
        comunidad: comunidad.id,
        usuario: admin.id,
        fecha: baseIncidenciaDate,
        descripcion: "Rotura de bombilla en planta 4",
        estado: "creado"
      },
      {
        comunidad: comunidad.id,
        usuario: admin.id,
        fecha: new Date(baseIncidenciaDate.getTime() + 1000),
        descripcion: "Vecino ruidoso",
        estado: "en_proceso"
      },
      {
        comunidad: comunidad.id,
        usuario: alberto.id,
        fecha: new Date(baseIncidenciaDate.getTime() + 2000),
        descripcion: "Hoyo en campo de futbol",
        estado: "resuelto"
      }
    ],
    skipDuplicates: true
  });

  console.log("Incidents added: ", incidencias);

  await prisma.reserva.deleteMany({
    where: {
      comunidad: comunidad.id,
      usuario: {
        in: [admin.id, juan.id]
      },
      zona: {
        in: ["SPA", "Pista de Padel"]
      }
    }
  });

  const reservas = await prisma.reserva.createMany({
    data: [
      {
        usuario: admin.id,
        comunidad: comunidad.id,
        zona: "SPA",
        fecha: new Date("2024-01-05"),
        hora_inicio: new Date("2019-01-01 20:00:00"),
        hora_fin: new Date("2019-01-01 21:00:00")
      },
      {
        usuario: juan.id,
        comunidad: comunidad.id,
        zona: "Pista de Padel",
        fecha: new Date("2024-02-09"),
        hora_inicio: new Date("2019-01-01 10:00:00"),
        hora_fin: new Date("2019-01-01 14:00:00")
      }
    ],
    skipDuplicates: true
  });

  console.log("Reservations added: ", reservas);

  await prisma.solicitud.deleteMany({
    where: {
      comunidad: comunidad.id,
      usuario: {
        in: [admin.id, juan.id, alberto.id]
      }
    }
  });

  const solicitudes = await prisma.solicitud.createMany({
    data: [
      {
        usuario: admin.id,
        comunidad: comunidad.id,
        estado: "aprobada"
      },
      {
        usuario: juan.id,
        comunidad: comunidad.id,
        estado: "aprobada"
      },
      {
        usuario: alberto.id,
        comunidad: comunidad.id,
        estado: "pendiente"
      }
    ],
    skipDuplicates: true
  });

  console.log("Requests added: ", solicitudes);

  const baseContactoDate = new Date("2024-01-03T09:00:00.000Z");

  await prisma.contacto.deleteMany({
    where: {
      email: {
        in: ["fran@gmail.com", "Okina@gmail.com"]
      },
      mensaje: "Lorem ipsum dolo sit amet"
    }
  });

  const contacto = await prisma.contacto.createMany({
    data: [
      {
        nombre: "Fran Son",
        email: "fran@gmail.com",
        mensaje: "Lorem ipsum dolo sit amet",
        creadoEn: baseContactoDate
      },
      {
        nombre: "Okina",
        email: "Okina@gmail.com",
        mensaje: "Lorem ipsum dolo sit amet",
        creadoEn: new Date(baseContactoDate.getTime() + 1000)
      }
    ],
    skipDuplicates: true
  });

  console.log("Added Contact: ", contacto);
}

main()
  .catch(error => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
