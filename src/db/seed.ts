import { PrismaClient } from "@/generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import bcrypt from "bcrypt";

const adapter = new PrismaPg({ connectionString: process.env.DATABASE_URL! });
const prisma = new PrismaClient({ adapter });

/**
 * Script that populates the database with test data.
 * It can be run with `npm run db:seed` (or the alias `npm run seed`).
 */

const ZONES_PER_COMMUNITY = 4;
const MESSAGES_PER_COMMUNITY = 4;
const INCIDENTS_PER_COMMUNITY = 7;
const RESERVATIONS_PER_COMMUNITY = 3;
const SEED_SHARED_PASSWORD = "VecinosSeguro2026!";
const WEB_ADMIN_SEED_USER = {
  name: "Admin",
  lastName: "Plataforma",
  email: "webadmin@vecinos.local",
  role: "adminWeb"
} as const;

const COMMUNITY_SEED_DATA = [
  {
    name: "Residencial Los Arrayanes",
    street: "Calle Arrayanes",
    number: 6,
    city: "Granada",
    province: "Granada",
    country: "Espana",
    users: [
      { name: "Lucia", lastName: "Martinez", email: "lucia.martinez@vecinos.local", role: "admin" },
      { name: "Alvaro", lastName: "Santos", email: "alvaro.santos@vecinos.local", role: "inquilino" },
      { name: "Marta", lastName: "Ruiz", email: "marta.ruiz@vecinos.local", role: "inquilino" },
      { name: "Pablo", lastName: "Lopez", email: "pablo.lopez@vecinos.local", role: "inquilino" },
      { name: "Elena", lastName: "Diaz", email: "elena.diaz@vecinos.local", role: "inquilino" }
    ]
  },
  {
    name: "Mirador del Genil",
    street: "Avenida del Genil",
    number: 14,
    city: "Granada",
    province: "Granada",
    country: "Espana",
    users: [
      { name: "Javier", lastName: "Navarro", email: "javier.navarro@vecinos.local", role: "admin" },
      { name: "Sara", lastName: "Molina", email: "sara.molina@vecinos.local", role: "inquilino" },
      { name: "Irene", lastName: "Castro", email: "irene.castro@vecinos.local", role: "inquilino" },
      { name: "Diego", lastName: "Vega", email: "diego.vega@vecinos.local", role: "inquilino" },
      { name: "Raquel", lastName: "Peña", email: "raquel.pena@vecinos.local", role: "inquilino" }
    ]
  },
  {
    name: "Jardines de la Vega",
    street: "Calle Vega Alta",
    number: 21,
    city: "Granada",
    province: "Granada",
    country: "Espana",
    users: [
      { name: "Carlos", lastName: "Ortega", email: "carlos.ortega@vecinos.local", role: "admin" },
      { name: "Nuria", lastName: "Lara", email: "nuria.lara@vecinos.local", role: "inquilino" },
      { name: "Sergio", lastName: "Campos", email: "sergio.campos@vecinos.local", role: "inquilino" },
      { name: "Beatriz", lastName: "Ramos", email: "beatriz.ramos@vecinos.local", role: "inquilino" },
      { name: "Adrian", lastName: "Moreno", email: "adrian.moreno@vecinos.local", role: "inquilino" }
    ]
  },
  {
    name: "Patio de la Alhambra",
    street: "Calle Albaicin",
    number: 9,
    city: "Granada",
    province: "Granada",
    country: "Espana",
    users: [
      { name: "Carmen", lastName: "Herrera", email: "carmen.herrera@vecinos.local", role: "admin" },
      { name: "Hector", lastName: "Gil", email: "hector.gil@vecinos.local", role: "inquilino" },
      { name: "Paula", lastName: "Arias", email: "paula.arias@vecinos.local", role: "inquilino" },
      { name: "Ruben", lastName: "Blanco", email: "ruben.blanco@vecinos.local", role: "inquilino" },
      { name: "Alicia", lastName: "Prieto", email: "alicia.prieto@vecinos.local", role: "inquilino" }
    ]
  },
  {
    name: "Parque del Zaidin",
    street: "Avenida de Cadiz",
    number: 31,
    city: "Granada",
    province: "Granada",
    country: "Espana",
    users: [
      { name: "Miguel", lastName: "Reyes", email: "miguel.reyes@vecinos.local", role: "admin" },
      { name: "Claudia", lastName: "Fuentes", email: "claudia.fuentes@vecinos.local", role: "inquilino" },
      { name: "Ivan", lastName: "Soria", email: "ivan.soria@vecinos.local", role: "inquilino" },
      { name: "Noelia", lastName: "Mendez", email: "noelia.mendez@vecinos.local", role: "inquilino" },
      { name: "Tomas", lastName: "Aguilar", email: "tomas.aguilar@vecinos.local", role: "inquilino" }
    ]
  }
] as const;

const SEEDED_USER_EMAILS = [
  WEB_ADMIN_SEED_USER.email,
  ...COMMUNITY_SEED_DATA.flatMap(community => community.users.map(user => user.email))
];

const ZONE_TEMPLATES = [
  {
    name: "Piscina",
    description: "Piscina comunitaria exterior",
    start: 9,
    end: 21
  },
  {
    name: "Pista de Padel",
    description: "Pista de padel cerrada",
    start: 8,
    end: 22
  },
  {
    name: "Gimnasio",
    description: "Sala de entrenamiento comunitaria",
    start: 7,
    end: 23
  },
  {
    name: "Sala Multiusos",
    description: "Sala para reuniones y actividades",
    start: 10,
    end: 22
  }
] as const;

const MESSAGE_TEMPLATES = [
  "Recordatorio: reunion de vecinos el viernes a las 19:00.",
  "Mantenimiento del ascensor programado para la proxima semana.",
  "Aviso: limpieza de zonas comunes este miercoles.",
  "Gracias por respetar los horarios de silencio."
] as const;

const INCIDENT_TEMPLATES = [
  { title: "Bombilla fundida", description: "Bombilla fundida en el portal." },
  { title: "Ruidos nocturnos", description: "Quejas por ruido en horario nocturno." },
  {
    title: "Fuga de agua",
    description: "Se detecta pequena fuga en cuarto de contadores."
  },
  {
    title: "Puerta averiada",
    description: "La puerta del garaje no cierra correctamente."
  },
  {
    title: "Suciedad en patio",
    description: "Acumulacion de residuos en el patio interior."
  },
  {
    title: "Fallo de luz",
    description: "Intermitencias en iluminacion de escalera."
  },
  {
    title: "Desperfecto en pista",
    description: "Pavimento levantado en zona deportiva."
  }
] as const;

const INCIDENT_STATUSES = ["reported", "inProgress", "resolved"] as const;
const REQUEST_STATUSES = ["approved", "approved", "pending", "pending", "pending"] as const;

/**
 * Creates a Date object in UTC with the specified time.
 * Used to initialize common zone schedules during data seeding.
 *
 * @param hour The time in 24h format (0-23)
 * @returns A Date object with the specified time
 */
function timeAt(hour: number): Date {
  return new Date(Date.UTC(1970, 0, 1, hour, 0, 0, 0));
}

/**
 * Main data seeding function that populates the database with test data.
 * Clean existing data and create communities, users, common areas, reservations,
 * incidents, messages, requests and financial records.
 *
 * @returns Promise with no return value
 */
async function main(): Promise<void> {
  const communityNames = COMMUNITY_SEED_DATA.map(community => community.name);

  await prisma.community.deleteMany({
    where: {
      name: {
        in: communityNames
      }
    }
  });

  await prisma.community.deleteMany({
    where: {
      name: {
        startsWith: "Comunidad Seed "
      }
    }
  });

  await prisma.contact.deleteMany({
    where: {
      email: {
        endsWith: "@seed.local"
      }
    }
  });

  const userSeed: Array<{
    email: string;
    role: "admin" | "tenant" | "adminWeb";
    name: string;
    lastName: string;
  }> = COMMUNITY_SEED_DATA.flatMap(community =>
    community.users.map(user => ({
      email: user.email,
      role: user.role === "inquilino" ? "tenant" : user.role,
      name: user.name,
      lastName: user.lastName
    }))
  );

  userSeed.push({
    email: WEB_ADMIN_SEED_USER.email,
    role: WEB_ADMIN_SEED_USER.role,
    name: WEB_ADMIN_SEED_USER.name,
    lastName: WEB_ADMIN_SEED_USER.lastName
  });

  for (const user of userSeed) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {
        role: user.role,
        name: user.name,
        lastName: user.lastName
      },
      create: {
        email: user.email,
        role: user.role,
        name: user.name,
        lastName: user.lastName
      }
    });
  }

  const allUsers = await prisma.user.findMany({
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

  for (const user of allUsers) {
    await prisma.credentials.upsert({
      where: { user: user.id },
      update: { password: sharedPasswordHash },
      create: {
        user: user.id,
        password: sharedPasswordHash
      }
    });
  }

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

    const adminUser = communityUsers.find(user => user.role === "admin");
    if (!adminUser) {
      throw new Error(`Admin user missing for community ${communityData.name}`);
    }

    const userRequestStatuses = communityUsers.map((user, index) => ({
      user,
      status: REQUEST_STATUSES[index % REQUEST_STATUSES.length]
    }));

    const usersWithAccess = userRequestStatuses
      .filter(({ user, status }) => user.role === "admin" || status === "approved")
      .map(({ user }) => user);

    const community = await prisma.community.create({
      data: {
        name: communityData.name,
        street: communityData.street,
        number: communityData.number,
        city: communityData.city,
        province: communityData.province,
        country: communityData.country,
        adminId: adminUser.id
      }
    });

    await prisma.membership.createMany({
      data: usersWithAccess.map(user => ({
        user: user.id,
        community: community.id
      })),
      skipDuplicates: true
    });

    const zoneNames = ZONE_TEMPLATES.slice(0, ZONES_PER_COMMUNITY).map(zone => zone.name);

    await prisma.zone.createMany({
      data: ZONE_TEMPLATES.slice(0, ZONES_PER_COMMUNITY).map(zone => ({
        name: zone.name,
        community: community.id,
        description: zone.description,
        image: null,
        startTime: timeAt(zone.start),
        endTime: timeAt(zone.end)
      })),
      skipDuplicates: true
    });

    const messageBase = new Date(Date.UTC(2026, 0, communityNumber, 10, 0, 0));
    await prisma.message.createMany({
      data: MESSAGE_TEMPLATES.slice(0, MESSAGES_PER_COMMUNITY).map((text, index) => ({
        community: community.id,
        text,
        createdAt: new Date(messageBase.getTime() + index * 1000)
      })),
      skipDuplicates: true
    });

    const incidentBase = new Date(Date.UTC(2026, 0, communityNumber + 5, 8, 0, 0));
    await prisma.incident.createMany({
      data: INCIDENT_TEMPLATES.slice(0, INCIDENTS_PER_COMMUNITY).map((incident, index) => ({
        community: community.id,
        user: usersWithAccess[index % usersWithAccess.length].id,
        date: new Date(incidentBase.getTime() + index * 60000),
        title: incident.title,
        description: incident.description,
        status: INCIDENT_STATUSES[index % INCIDENT_STATUSES.length]
      })),
      skipDuplicates: true
    });

    await prisma.request.createMany({
      data: userRequestStatuses.map(({ user, status }) => ({
        user: user.id,
        community: community.id,
        status
      })),
      skipDuplicates: true
    });

    await prisma.reservation.createMany({
      data: Array.from({ length: RESERVATIONS_PER_COMMUNITY }, (_, reservationIndex) => {
        const startHour = 10 + reservationIndex * 2;
        return {
          user: usersWithAccess[reservationIndex % usersWithAccess.length].id,
          community: community.id,
          zone: zoneNames[reservationIndex % zoneNames.length],
          date: new Date(Date.UTC(2026, 1, communityNumber + reservationIndex, 0, 0, 0)),
          startTime: timeAt(startHour),
          endTime: timeAt(startHour + 1)
        };
      }),
      skipDuplicates: true
    });

    const createdReservations = await prisma.reservation.findMany({
      where: {
        community: community.id,
        zone: {
          in: zoneNames
        }
      },
      select: {
        id: true,
        community: true,
        zone: true,
        date: true,
        startTime: true,
        endTime: true
      }
    });

    await prisma.reservationSlot.createMany({
      data: createdReservations.flatMap(reservation => {
        const start = reservation.startTime.getUTCHours();
        const end = reservation.endTime.getUTCHours();

        return Array.from({ length: end - start }, (_, hourOffset) => ({
          reservationId: reservation.id,
          community: reservation.community,
          zone: reservation.zone,
          date: reservation.date,
          time: timeAt(start + hourOffset)
        }));
      }),
      skipDuplicates: true
    });

    const financeBase = new Date(Date.UTC(2026, 2, communityNumber, 9, 0, 0));
    await prisma.financialRecord.createMany({
      data: [
        {
          community: community.id,
          description: `Cuotas enero comunidad ${communityNumber}`,
          amount: 1400 + communityNumber * 40,
          type: "income",
          createdAt: new Date(financeBase.getTime())
        },
        {
          community: community.id,
          description: `Cuotas febrero comunidad ${communityNumber}`,
          amount: 1425 + communityNumber * 40,
          type: "income",
          createdAt: new Date(financeBase.getTime() + 1000)
        },
        {
          community: community.id,
          description: `Mantenimiento ascensor comunidad ${communityNumber}`,
          amount: 500 + communityNumber * 20,
          type: "expense",
          createdAt: new Date(financeBase.getTime() + 2000)
        },
        {
          community: community.id,
          description: `Limpieza mensual comunidad ${communityNumber}`,
          amount: 260 + communityNumber * 10,
          type: "expense",
          createdAt: new Date(financeBase.getTime() + 3000)
        }
      ]
    });
  }

  await prisma.contact.createMany({
    data: [
      {
        name: "Ana Ruiz",
        email: "ana.ruiz@gmail.com",
        message: "Consulta sobre normas de uso de la piscina.",
        createdAt: new Date(Date.UTC(2026, 3, 1, 10, 0, 0))
      },
      {
        name: "David Leon",
        email: "david.leon@yahoo.es",
        message: "Me gustaria informacion sobre cuotas comunitarias.",
        createdAt: new Date(Date.UTC(2026, 3, 2, 10, 0, 0))
      },
      {
        name: "Laura Segura",
        email: "laura.segura@gmail.com",
        message: "Hay disponibilidad en la pista de padel por las tardes?",
        createdAt: new Date(Date.UTC(2026, 3, 3, 10, 0, 0))
      },
      {
        name: "Mario Cano",
        email: "mario.cano@outlook.com",
        message: "Quiero reportar una incidencia en la puerta del garaje.",
        createdAt: new Date(Date.UTC(2026, 3, 4, 10, 0, 0))
      },
      {
        name: "Julia Prieto",
        email: "julia.prieto@gmail.com",
        message: "Gracias por la gestion de la ultima junta.",
        createdAt: new Date(Date.UTC(2026, 3, 5, 10, 0, 0))
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
