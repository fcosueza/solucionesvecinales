import { PrismaClient } from "./client";

const prisma = new PrismaClient();

/**
 * Función main() en seed.ts
 *
 * Función  principal de Prisma para poblar la base de datos con datos de prueba.
 *
 * @return Una promesa de tipo void.
 */

async function main(): Promise<void> {
  const comunidad = await prisma.comunidad.create({
    data: {
      nombre: "Arrayanes6",
      calle: "Arrayanes",
      numero: 6,
      localidad: "Granada",
      provincia: "Granada",
      pais: "España"
    }
  });

  console.log("Añadida la comunidad: ", comunidad);

  const usuarios = await prisma.usuario.createMany({
    data: [
      {
        correo: "fran@gmail.com",
        rol: "administrador",
        nombre_usuario: "fcosueza",
        nombre: "Francisco",
        apellidos: "Sueza Rodríguez",
        calle: "Arrayanes",
        numero: 6,
        piso: 4,
        letra: "A",
        localidad: "Granada"
      },
      {
        correo: "juan@gmail.com",
        rol: "inquilino",
        nombre_usuario: "juanjuan",
        nombre: "Juan",
        apellidos: "Ponce Perez",
        calle: "Arrayanes",
        numero: 6,
        piso: 2,
        letra: "B",
        localidad: "Granada"
      },
      {
        correo: "alberto@gmail.com",
        rol: "inquilino",
        nombre_usuario: "albertito",
        nombre: "Alberto",
        apellidos: "Garcia Garcia",
        calle: "Arrayanes",
        numero: 6,
        piso: 1,
        letra: "D",
        localidad: "Granada"
      }
    ],
    skipDuplicates: true
  });

  console.log("Usuarios añadidos: ", usuarios);

  const credenciales = await prisma.credenciales.createMany({
    data: [
      {
        correoUsuario: "fran@gmail.com",
        password: "12345"
      },
      {
        correoUsuario: "juan@gmail.com",
        password: "5433212"
      },
      {
        correoUsuario: "alberto@gmail.com",
        password: "dsnojiaiojs"
      }
    ],
    skipDuplicates: true
  });

  console.log("Añadidos credenciales: ", credenciales);

  const mensajes = await prisma.mensaje.createMany({
    data: [
      {
        horaCreacion: new Date(),
        comunidad: 1,
        texto: "Mensaje de Prueba 1, 2, 3"
      },
      {
        horaCreacion: new Date(),
        comunidad: 1,
        texto: "Junta de vecinos el día 22 de Marzo"
      }
    ],
    skipDuplicates: true
  });

  console.log("Añadidos mensajes: ", mensajes);

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
}

main();
