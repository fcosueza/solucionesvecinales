import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

/**
 * Script que puebla la base de datos con datos de prueba.
 * Se puede ejecutar con `npm run db:seed` (o el alias `npm run seed`).
 */

const ZONES_PER_COMMUNITY = 4;
const MESSAGES_PER_COMMUNITY = 4;
const INCIDENTS_PER_COMMUNITY = 7;
const RESERVATIONS_PER_COMMUNITY = 3;
const SEED_SHARED_PASSWORD = "VecinosSeguro2026!";

const COMMUNITY_SEED_DATA = [
  {
    nombre: "Residencial Los Arrayanes",
    calle: "Calle Arrayanes",
    numero: 6,
    ciudad: "Granada",
    provincia: "Granada",
    pais: "Espana",
    users: [
      { nombre: "Lucia", apellido: "Martinez", email: "lucia.martinez@vecinos.local", rol: "admin" },
      { nombre: "Alvaro", apellido: "Santos", email: "alvaro.santos@vecinos.local", rol: "inquilino" },
      { nombre: "Marta", apellido: "Ruiz", email: "marta.ruiz@vecinos.local", rol: "inquilino" },
      { nombre: "Pablo", apellido: "Lopez", email: "pablo.lopez@vecinos.local", rol: "inquilino" },
      { nombre: "Elena", apellido: "Diaz", email: "elena.diaz@vecinos.local", rol: "inquilino" }
    ]
  },
  {
    nombre: "Mirador del Genil",
    calle: "Avenida del Genil",
    numero: 14,
    ciudad: "Granada",
    provincia: "Granada",
    pais: "Espana",
    users: [
      { nombre: "Javier", apellido: "Navarro", email: "javier.navarro@vecinos.local", rol: "admin" },
      { nombre: "Sara", apellido: "Molina", email: "sara.molina@vecinos.local", rol: "inquilino" },
      { nombre: "Irene", apellido: "Castro", email: "irene.castro@vecinos.local", rol: "inquilino" },
      { nombre: "Diego", apellido: "Vega", email: "diego.vega@vecinos.local", rol: "inquilino" },
      { nombre: "Raquel", apellido: "Peña", email: "raquel.pena@vecinos.local", rol: "inquilino" }
    ]
  },
  {
    nombre: "Jardines de la Vega",
    calle: "Calle Vega Alta",
    numero: 21,
    ciudad: "Granada",
    provincia: "Granada",
    pais: "Espana",
    users: [
      { nombre: "Carlos", apellido: "Ortega", email: "carlos.ortega@vecinos.local", rol: "admin" },
      { nombre: "Nuria", apellido: "Lara", email: "nuria.lara@vecinos.local", rol: "inquilino" },
      { nombre: "Sergio", apellido: "Campos", email: "sergio.campos@vecinos.local", rol: "inquilino" },
      { nombre: "Beatriz", apellido: "Ramos", email: "beatriz.ramos@vecinos.local", rol: "inquilino" },
      { nombre: "Adrian", apellido: "Moreno", email: "adrian.moreno@vecinos.local", rol: "inquilino" }
    ]
  },
  {
    nombre: "Patio de la Alhambra",
    calle: "Calle Albaicin",
    numero: 9,
    ciudad: "Granada",
    provincia: "Granada",
    pais: "Espana",
    users: [
      { nombre: "Carmen", apellido: "Herrera", email: "carmen.herrera@vecinos.local", rol: "admin" },
      { nombre: "Hector", apellido: "Gil", email: "hector.gil@vecinos.local", rol: "inquilino" },
      { nombre: "Paula", apellido: "Arias", email: "paula.arias@vecinos.local", rol: "inquilino" },
      { nombre: "Ruben", apellido: "Blanco", email: "ruben.blanco@vecinos.local", rol: "inquilino" },
      { nombre: "Alicia", apellido: "Prieto", email: "alicia.prieto@vecinos.local", rol: "inquilino" }
    ]
  },
  {
    nombre: "Parque del Zaidin",
    calle: "Avenida de Cadiz",
    numero: 31,
    ciudad: "Granada",
    provincia: "Granada",
    pais: "Espana",
    users: [
      { nombre: "Miguel", apellido: "Reyes", email: "miguel.reyes@vecinos.local", rol: "admin" },
      { nombre: "Claudia", apellido: "Fuentes", email: "claudia.fuentes@vecinos.local", rol: "inquilino" },
      { nombre: "Ivan", apellido: "Soria", email: "ivan.soria@vecinos.local", rol: "inquilino" },
      { nombre: "Noelia", apellido: "Mendez", email: "noelia.mendez@vecinos.local", rol: "inquilino" },
      { nombre: "Tomas", apellido: "Aguilar", email: "tomas.aguilar@vecinos.local", rol: "inquilino" }
    ]
  }
] as const;

const SEEDED_USER_EMAILS = COMMUNITY_SEED_DATA.flatMap(community => community.users.map(user => user.email));

const ZONE_TEMPLATES = [
  {
    nombre: "Piscina",
    descripcion: "Piscina comunitaria exterior",
    inicio: 9,
    fin: 21
  },
  {
    nombre: "Pista de Padel",
    descripcion: "Pista de padel cerrada",
    inicio: 8,
    fin: 22
  },
  {
    nombre: "Gimnasio",
    descripcion: "Sala de entrenamiento comunitaria",
    inicio: 7,
    fin: 23
  },
  {
    nombre: "Sala Multiusos",
    descripcion: "Sala para reuniones y actividades",
    inicio: 10,
    fin: 22
  }
] as const;

const MESSAGE_TEMPLATES = [
  "Recordatorio: reunion de vecinos el viernes a las 19:00.",
  "Mantenimiento del ascensor programado para la proxima semana.",
  "Aviso: limpieza de zonas comunes este miercoles.",
  "Gracias por respetar los horarios de silencio."
] as const;

const INCIDENT_TEMPLATES = [
  { titulo: "Bombilla fundida", descripcion: "Bombilla fundida en el portal." },
  { titulo: "Ruidos nocturnos", descripcion: "Quejas por ruido en horario nocturno." },
  {
    titulo: "Fuga de agua",
    descripcion: "Se detecta pequena fuga en cuarto de contadores."
  },
  {
    titulo: "Puerta averiada",
    descripcion: "La puerta del garaje no cierra correctamente."
  },
  {
    titulo: "Suciedad en patio",
    descripcion: "Acumulacion de residuos en el patio interior."
  },
  {
    titulo: "Fallo de luz",
    descripcion: "Intermitencias en iluminacion de escalera."
  },
  {
    titulo: "Desperfecto en pista",
    descripcion: "Pavimento levantado en zona deportiva."
  }
] as const;

const INCIDENT_STATUSES = ["reportado", "procesandose", "resuelto"] as const;
const REQUEST_STATUSES = ["aprobada", "aprobada", "pendiente", "pendiente", "pendiente"] as const;

function timeAt(hour: number): Date {
  return new Date(Date.UTC(1970, 0, 1, hour, 0, 0, 0));
}

async function main(): Promise<void> {
  const communityNames = COMMUNITY_SEED_DATA.map(community => community.nombre);

  await prisma.comunidad.deleteMany({
    where: {
      nombre: {
        in: communityNames
      }
    }
  });

  await prisma.comunidad.deleteMany({
    where: {
      nombre: {
        startsWith: "Comunidad Seed "
      }
    }
  });

  await prisma.usuario.deleteMany({
    where: {
      OR: [
        {
          email: {
            startsWith: "seed+"
          }
        },
        {
          email: {
            in: SEEDED_USER_EMAILS
          }
        }
      ]
    }
  });

  await prisma.contacto.deleteMany({
    where: {
      email: {
        endsWith: "@seed.local"
      }
    }
  });

  const userSeed = COMMUNITY_SEED_DATA.flatMap(community =>
    community.users.map(user => ({
      email: user.email,
      rol: user.rol,
      nombre: user.nombre,
      apellido: user.apellido
    }))
  );

  await prisma.usuario.createMany({
    data: userSeed,
    skipDuplicates: true
  });

  const allUsers = await prisma.usuario.findMany({
    where: {
      email: {
        in: SEEDED_USER_EMAILS
      }
    },
    select: {
      id: true,
      email: true
    }
  });

  const userIdByEmail = new Map(allUsers.map(user => [user.email, user.id]));
  const sharedPasswordHash = await bcrypt.hash(SEED_SHARED_PASSWORD, 10);

  await prisma.credenciales.createMany({
    data: allUsers.map(user => ({
      usuario: user.id,
      password: sharedPasswordHash
    })),
    skipDuplicates: true
  });

  for (let communityIndex = 0; communityIndex < COMMUNITY_SEED_DATA.length; communityIndex += 1) {
    const communityNumber = communityIndex + 1;
    const communityData = COMMUNITY_SEED_DATA[communityIndex];

    const communityUsers = communityData.users.map(user => {
      const id = userIdByEmail.get(user.email);
      if (!id) {
        throw new Error(`User not found for email: ${user.email}`);
      }
      return { ...user, id };
    });

    const adminUser = communityUsers.find(user => user.rol === "admin");
    if (!adminUser) {
      throw new Error(`Admin user missing for community ${communityData.nombre}`);
    }

    const userRequestStatuses = communityUsers.map((user, index) => ({
      user,
      estado: REQUEST_STATUSES[index % REQUEST_STATUSES.length]
    }));

    const usersWithAccess = userRequestStatuses
      .filter(({ user, estado }) => user.rol === "admin" || estado === "aprobada")
      .map(({ user }) => user);

    const comunidad = await prisma.comunidad.create({
      data: {
        nombre: communityData.nombre,
        calle: communityData.calle,
        numero: communityData.numero,
        ciudad: communityData.ciudad,
        provincia: communityData.provincia,
        pais: communityData.pais,
        adminID: adminUser.id
      }
    });

    await prisma.inscripcion.createMany({
      data: usersWithAccess.map(user => ({
        usuario: user.id,
        comunidad: comunidad.id
      })),
      skipDuplicates: true
    });

    const zoneNames = ZONE_TEMPLATES.slice(0, ZONES_PER_COMMUNITY).map(zone => zone.nombre);

    await prisma.zona.createMany({
      data: ZONE_TEMPLATES.slice(0, ZONES_PER_COMMUNITY).map(zone => ({
        nombre: zone.nombre,
        comunidad: comunidad.id,
        descripcion: zone.descripcion,
        imagen: null,
        hora_inicio: timeAt(zone.inicio),
        hora_fin: timeAt(zone.fin)
      })),
      skipDuplicates: true
    });

    const messageBase = new Date(Date.UTC(2026, 0, communityNumber, 10, 0, 0));
    await prisma.mensaje.createMany({
      data: MESSAGE_TEMPLATES.slice(0, MESSAGES_PER_COMMUNITY).map((texto, index) => ({
        comunidad: comunidad.id,
        texto,
        creadoEn: new Date(messageBase.getTime() + index * 1000)
      })),
      skipDuplicates: true
    });

    const incidentBase = new Date(Date.UTC(2026, 0, communityNumber + 5, 8, 0, 0));
    await prisma.incidencia.createMany({
      data: INCIDENT_TEMPLATES.slice(0, INCIDENTS_PER_COMMUNITY).map((incident, index) => ({
        comunidad: comunidad.id,
        usuario: usersWithAccess[index % usersWithAccess.length].id,
        fecha: new Date(incidentBase.getTime() + index * 60000),
        titulo: incident.titulo,
        descripcion: incident.descripcion,
        estado: INCIDENT_STATUSES[index % INCIDENT_STATUSES.length]
      })),
      skipDuplicates: true
    });

    await prisma.solicitud.createMany({
      data: userRequestStatuses.map(({ user, estado }) => ({
        usuario: user.id,
        comunidad: comunidad.id,
        estado
      })),
      skipDuplicates: true
    });

    await prisma.reserva.createMany({
      data: Array.from({ length: RESERVATIONS_PER_COMMUNITY }, (_, reservationIndex) => {
        const startHour = 10 + reservationIndex * 2;
        return {
          usuario: usersWithAccess[reservationIndex % usersWithAccess.length].id,
          comunidad: comunidad.id,
          zona: zoneNames[reservationIndex % zoneNames.length],
          fecha: new Date(Date.UTC(2026, 1, communityNumber + reservationIndex, 0, 0, 0)),
          hora_inicio: timeAt(startHour),
          hora_fin: timeAt(startHour + 1)
        };
      }),
      skipDuplicates: true
    });

    const createdReservations = await prisma.reserva.findMany({
      where: {
        comunidad: comunidad.id,
        zona: {
          in: zoneNames
        }
      },
      select: {
        id: true,
        comunidad: true,
        zona: true,
        fecha: true,
        hora_inicio: true,
        hora_fin: true
      }
    });

    await prisma.reservaFranja.createMany({
      data: createdReservations.flatMap(reserva => {
        const inicio = reserva.hora_inicio.getUTCHours();
        const fin = reserva.hora_fin.getUTCHours();

        return Array.from({ length: fin - inicio }, (_, hourOffset) => ({
          reservaId: reserva.id,
          comunidad: reserva.comunidad,
          zona: reserva.zona,
          fecha: reserva.fecha,
          hora: timeAt(inicio + hourOffset)
        }));
      }),
      skipDuplicates: true
    });

    const financeBase = new Date(Date.UTC(2026, 2, communityNumber, 9, 0, 0));
    await prisma.registro.createMany({
      data: [
        {
          comunidad: comunidad.id,
          descripcion: `Cuotas enero comunidad ${communityNumber}`,
          importe: 1400 + communityNumber * 40,
          tipo: "ingreso",
          creadoEn: new Date(financeBase.getTime())
        },
        {
          comunidad: comunidad.id,
          descripcion: `Cuotas febrero comunidad ${communityNumber}`,
          importe: 1425 + communityNumber * 40,
          tipo: "ingreso",
          creadoEn: new Date(financeBase.getTime() + 1000)
        },
        {
          comunidad: comunidad.id,
          descripcion: `Mantenimiento ascensor comunidad ${communityNumber}`,
          importe: 500 + communityNumber * 20,
          tipo: "gasto",
          creadoEn: new Date(financeBase.getTime() + 2000)
        },
        {
          comunidad: comunidad.id,
          descripcion: `Limpieza mensual comunidad ${communityNumber}`,
          importe: 260 + communityNumber * 10,
          tipo: "gasto",
          creadoEn: new Date(financeBase.getTime() + 3000)
        }
      ]
    });
  }

  await prisma.contacto.createMany({
    data: [
      {
        nombre: "Ana Ruiz",
        email: "ana.ruiz@gmail.com",
        mensaje: "Consulta sobre normas de uso de la piscina.",
        creadoEn: new Date(Date.UTC(2026, 3, 1, 10, 0, 0))
      },
      {
        nombre: "David Leon",
        email: "david.leon@yahoo.es",
        mensaje: "Me gustaria informacion sobre cuotas comunitarias.",
        creadoEn: new Date(Date.UTC(2026, 3, 2, 10, 0, 0))
      },
      {
        nombre: "Laura Segura",
        email: "laura.segura@gmail.com",
        mensaje: "Hay disponibilidad en la pista de padel por las tardes?",
        creadoEn: new Date(Date.UTC(2026, 3, 3, 10, 0, 0))
      },
      {
        nombre: "Mario Cano",
        email: "mario.cano@outlook.com",
        mensaje: "Quiero reportar una incidencia en la puerta del garaje.",
        creadoEn: new Date(Date.UTC(2026, 3, 4, 10, 0, 0))
      },
      {
        nombre: "Julia Prieto",
        email: "julia.prieto@gmail.com",
        mensaje: "Gracias por la gestion de la ultima junta.",
        creadoEn: new Date(Date.UTC(2026, 3, 5, 10, 0, 0))
      }
    ],
    skipDuplicates: true
  });

  console.log("Seed completed with deterministic medium-size data set.");
}

main()
  .catch(error => {
    console.error("Seed failed:", error);
    process.exitCode = 1;
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
