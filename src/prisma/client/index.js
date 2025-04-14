
Object.defineProperty(exports, "__esModule", { value: true });

const {
  PrismaClientKnownRequestError,
  PrismaClientUnknownRequestError,
  PrismaClientRustPanicError,
  PrismaClientInitializationError,
  PrismaClientValidationError,
  getPrismaClient,
  sqltag,
  empty,
  join,
  raw,
  skip,
  Decimal,
  Debug,
  objectEnumValues,
  makeStrictEnum,
  Extensions,
  warnOnce,
  defineDmmfProperty,
  Public,
  getRuntime,
  createParam,
} = require('./runtime/library.js')


const Prisma = {}

exports.Prisma = Prisma
exports.$Enums = {}

/**
 * Prisma Client JS version: 6.5.0
 * Query Engine version: 173f8d54f8d52e692c7e27e72a88314ec7aeff60
 */
Prisma.prismaVersion = {
  client: "6.5.0",
  engine: "173f8d54f8d52e692c7e27e72a88314ec7aeff60"
}

Prisma.PrismaClientKnownRequestError = PrismaClientKnownRequestError;
Prisma.PrismaClientUnknownRequestError = PrismaClientUnknownRequestError
Prisma.PrismaClientRustPanicError = PrismaClientRustPanicError
Prisma.PrismaClientInitializationError = PrismaClientInitializationError
Prisma.PrismaClientValidationError = PrismaClientValidationError
Prisma.Decimal = Decimal

/**
 * Re-export of sql-template-tag
 */
Prisma.sql = sqltag
Prisma.empty = empty
Prisma.join = join
Prisma.raw = raw
Prisma.validator = Public.validator

/**
* Extensions
*/
Prisma.getExtensionContext = Extensions.getExtensionContext
Prisma.defineExtension = Extensions.defineExtension

/**
 * Shorthand utilities for JSON filtering
 */
Prisma.DbNull = objectEnumValues.instances.DbNull
Prisma.JsonNull = objectEnumValues.instances.JsonNull
Prisma.AnyNull = objectEnumValues.instances.AnyNull

Prisma.NullTypes = {
  DbNull: objectEnumValues.classes.DbNull,
  JsonNull: objectEnumValues.classes.JsonNull,
  AnyNull: objectEnumValues.classes.AnyNull
}




  const path = require('path')

/**
 * Enums
 */
exports.Prisma.TransactionIsolationLevel = makeStrictEnum({
  ReadUncommitted: 'ReadUncommitted',
  ReadCommitted: 'ReadCommitted',
  RepeatableRead: 'RepeatableRead',
  Serializable: 'Serializable'
});

exports.Prisma.ComunidadScalarFieldEnum = {
  id: 'id',
  nombre: 'nombre',
  calle: 'calle',
  numero: 'numero',
  localidad: 'localidad',
  provincia: 'provincia',
  pais: 'pais'
};

exports.Prisma.CredencialesScalarFieldEnum = {
  correoUsuario: 'correoUsuario',
  password: 'password'
};

exports.Prisma.IncidenciaScalarFieldEnum = {
  comunidad: 'comunidad',
  usuario: 'usuario',
  fecha: 'fecha',
  descripcion: 'descripcion',
  estado: 'estado'
};

exports.Prisma.InscripcionScalarFieldEnum = {
  usuario: 'usuario',
  comunidad: 'comunidad'
};

exports.Prisma.MensajeScalarFieldEnum = {
  horaCreacion: 'horaCreacion',
  comunidad: 'comunidad'
};

exports.Prisma.ReservaScalarFieldEnum = {
  usuario: 'usuario',
  comunidad: 'comunidad',
  zona: 'zona',
  fecha: 'fecha',
  hora_inicio: 'hora_inicio',
  hora_fin: 'hora_fin'
};

exports.Prisma.SolicitudScalarFieldEnum = {
  usuario: 'usuario',
  comunidad: 'comunidad',
  estado: 'estado'
};

exports.Prisma.UsuarioScalarFieldEnum = {
  correo: 'correo',
  rol: 'rol',
  nombre_usuario: 'nombre_usuario',
  nombre: 'nombre',
  apellidos: 'apellidos',
  calle: 'calle',
  numero: 'numero',
  piso: 'piso',
  letra: 'letra',
  localidad: 'localidad'
};

exports.Prisma.ZonaScalarFieldEnum = {
  nombre: 'nombre',
  comunidad: 'comunidad',
  descripcion: 'descripcion',
  imagen: 'imagen',
  hora_inicio: 'hora_inicio',
  hora_fin: 'hora_fin'
};

exports.Prisma.SortOrder = {
  asc: 'asc',
  desc: 'desc'
};

exports.Prisma.QueryMode = {
  default: 'default',
  insensitive: 'insensitive'
};

exports.Prisma.NullsOrder = {
  first: 'first',
  last: 'last'
};
exports.Estado_Incidencia = exports.$Enums.Estado_Incidencia = {
  creada: 'creada',
  procesandose: 'procesandose',
  solucionada: 'solucionada'
};

exports.Estado_Solicitud = exports.$Enums.Estado_Solicitud = {
  pendiente: 'pendiente',
  aprobada: 'aprobada',
  denegada: 'denegada'
};

exports.Role = exports.$Enums.Role = {
  inquilino: 'inquilino',
  administrador: 'administrador',
  webAdmin: 'webAdmin'
};

exports.Prisma.ModelName = {
  Comunidad: 'Comunidad',
  Credenciales: 'Credenciales',
  Incidencia: 'Incidencia',
  Inscripcion: 'Inscripcion',
  Mensaje: 'Mensaje',
  Reserva: 'Reserva',
  Solicitud: 'Solicitud',
  Usuario: 'Usuario',
  Zona: 'Zona'
};
/**
 * Create the Client
 */
const config = {
  "generator": {
    "name": "client",
    "provider": {
      "fromEnvVar": null,
      "value": "prisma-client-js"
    },
    "output": {
      "value": "/home/fcosueza/Source/solucionesvecinales/src/prisma/client",
      "fromEnvVar": null
    },
    "config": {
      "engineType": "library"
    },
    "binaryTargets": [
      {
        "fromEnvVar": null,
        "value": "debian-openssl-3.0.x",
        "native": true
      }
    ],
    "previewFeatures": [
      "prismaSchemaFolder"
    ],
    "sourceFilePath": "/home/fcosueza/Source/solucionesvecinales/src/prisma/schema/schema.prisma",
    "isCustomOutput": true
  },
  "relativeEnvPaths": {
    "rootEnvPath": null,
    "schemaEnvPath": "../../../.env"
  },
  "relativePath": "../schema",
  "clientVersion": "6.5.0",
  "engineVersion": "173f8d54f8d52e692c7e27e72a88314ec7aeff60",
  "datasourceNames": [
    "db"
  ],
  "activeProvider": "postgresql",
  "inlineDatasources": {
    "db": {
      "url": {
        "fromEnvVar": "DATABASE_URL",
        "value": null
      }
    }
  },
  "inlineSchema": "/**\n * Modelo Comunidad.\n * Modelo de la tabla comunidad, que es la principal de nuestra base de datos.\n */\n\nmodel Comunidad {\n  id        Int    @id @default(autoincrement())\n  nombre    String\n  calle     String\n  numero    Int\n  localidad String\n  provincia String\n  pais      String\n\n  mensajes    Mensaje[]\n  zonas       Zona[]\n  incidencias Incidencia[]\n  inscritos   Inscripcion[]\n  solicitudes Solicitud[]\n}\n\n/**\n * Modelo Credenciales\n * Modelo de la tabla Credencial que almacena la información de acceso de los usuarios. Los credenciales deben\n * estar relacionados con algún usuario para su creación.\n */\n\nmodel Credenciales {\n  correoUsuario String @id\n  password      String\n\n  usuario Usuario @relation(fields: [correoUsuario], references: [correo], onDelete: Cascade)\n}\n\n/**\n * Modelo Incidencia\n * Modelo que define la tabla Incidencia, la cual deberá estar ligada a un usuario y una comunidad. Además,\n * define el enum Estado que especifica los estados en los que se puede encontrar una incidencia.\n */\n\nenum Estado_Incidencia {\n  creada\n  procesandose\n  solucionada\n}\n\nmodel Incidencia {\n  comunidad   Int\n  usuario     String\n  fecha       DateTime          @default(now())\n  descripcion String\n  estado      Estado_Incidencia @default(solucionada)\n\n  comunidadID Comunidad @relation(fields: [comunidad], references: [id], onDelete: Cascade)\n  usuarioID   Usuario   @relation(fields: [usuario], references: [correo], onDelete: Cascade)\n\n  @@id([comunidad, usuario, fecha])\n}\n\n/**\n * Modelo Incripcion\n * Modelo que representa la inscripción de un usuario a una comunidad de vecinos.\n */\n\nmodel Inscripcion {\n  usuario   String\n  comunidad Int\n\n  usuarioID   Usuario   @relation(fields: [usuario], references: [correo], onDelete: Cascade)\n  comunidadID Comunidad @relation(fields: [comunidad], references: [id], onDelete: Cascade)\n\n  @@id([usuario, comunidad])\n}\n\n/**\n * Modelo Mensaje\n * Modelo de la tabla mensaje que representa los mensajes que una administrador puede\n * crear en el tablón de anuncios. Los mensajes deben estar relacionados con algún usuario.\n */\n\nmodel Mensaje {\n  horaCreacion DateTime  @default(now())\n  comunidad    Int\n  comunidadID  Comunidad @relation(fields: [comunidad], references: [id], onDelete: Cascade)\n\n  @@id([horaCreacion, comunidad])\n}\n\n/**\n * Modelo Reserva\n * Modelo que representa las reservas que se realizan en los espacios comunes. Debe estar ligada\n * a un usuario, una comunidad y un espacio común.\n */\n\nmodel Reserva {\n  usuario     String\n  comunidad   Int\n  zona        String\n  fecha       DateTime\n  hora_inicio DateTime @db.Time()\n  hora_fin    DateTime @db.Time()\n\n  usuarioID Usuario @relation(fields: [usuario], references: [correo], onDelete: Cascade)\n  zonaID    Zona    @relation(fields: [zona, comunidad], references: [nombre, comunidad], onDelete: Cascade)\n\n  @@id([usuario, comunidad, zona])\n}\n\n/**\n */\n\nenum Estado_Solicitud {\n  pendiente\n  aprobada\n  denegada\n}\n\nmodel Solicitud {\n  usuario   String\n  comunidad Int\n  estado    Estado_Solicitud @default(pendiente)\n\n  usuarioID   Usuario   @relation(fields: [usuario], references: [correo], onDelete: Cascade)\n  comunidadID Comunidad @relation(fields: [comunidad], references: [id], onDelete: Cascade)\n\n  @@id([usuario, comunidad])\n}\n\n/**\n * Modelo Usuario.\n * Modelo de la tabla Usuario, otra de las tablas principales de la aplicación. Además, se define\n * el Enum rol que especifica los diferentes tipos de usuarios que podemos encontrar en el sistema.\n */\n\nenum Role {\n  inquilino\n  administrador\n  webAdmin\n}\n\nmodel Usuario {\n  correo         String  @id\n  rol            Role    @default(inquilino)\n  nombre_usuario String\n  nombre         String\n  apellidos      String\n  calle          String\n  numero         Int\n  piso           Int?\n  letra          String? @db.Char(1)\n  localidad      String\n\n  credenciales  Credenciales?\n  incidencias   Incidencia[]\n  reservas      Reserva[]\n  inscripciones Inscripcion[]\n  solicitudes   Solicitud[]\n}\n\n/**\n * Modelo Zona\n * Modelo de la tabla Zona que representa las zonas comunes de la comunidad. Una zona debe pertenecer\n * a una comunidad para poder ser creada.\n */\n\nmodel Zona {\n  nombre      String\n  comunidad   Int\n  descripcion String\n  imagen      String?\n  hora_inicio DateTime\n  hora_fin    DateTime\n\n  comunidadID Comunidad @relation(fields: [comunidad], references: [id], onDelete: Cascade)\n\n  reservas Reserva[]\n\n  @@id([nombre, comunidad])\n}\n\n/**\n * Archivo schema.prisma\n * Archivo principal del modelo de prisma que genera el cliente y la conexión a la base de datos.\n * Emplea la opción prismaSchemaFolder para dividir el modelo en diferentes archivos, los cuales se\n * pueden encontar en la carpeta schema.\n */\n\ngenerator client {\n  provider        = \"prisma-client-js\"\n  output          = \"../client/\"\n  previewFeatures = [\"prismaSchemaFolder\"]\n}\n\ndatasource db {\n  provider = \"postgresql\"\n  url      = env(\"DATABASE_URL\")\n}\n",
  "inlineSchemaHash": "222f6d663e65ff8a5b1bdbb019022ea69508f73ab21e636beb45b251dbb6dd0e",
  "copyEngine": true
}

const fs = require('fs')

config.dirname = __dirname
if (!fs.existsSync(path.join(__dirname, 'schema.prisma'))) {
  const alternativePaths = [
    "src/prisma/client",
    "prisma/client",
  ]
  
  const alternativePath = alternativePaths.find((altPath) => {
    return fs.existsSync(path.join(process.cwd(), altPath, 'schema.prisma'))
  }) ?? alternativePaths[0]

  config.dirname = path.join(process.cwd(), alternativePath)
  config.isBundled = true
}

config.runtimeDataModel = JSON.parse("{\"models\":{\"Comunidad\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"id\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Int\",\"nativeType\":null,\"default\":{\"name\":\"autoincrement\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nombre\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"calle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"numero\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"localidad\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"provincia\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"pais\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"mensajes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Mensaje\",\"nativeType\":null,\"relationName\":\"ComunidadToMensaje\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"zonas\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Zona\",\"nativeType\":null,\"relationName\":\"ComunidadToZona\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"incidencias\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Incidencia\",\"nativeType\":null,\"relationName\":\"ComunidadToIncidencia\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"inscritos\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Inscripcion\",\"nativeType\":null,\"relationName\":\"ComunidadToInscripcion\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"solicitudes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Solicitud\",\"nativeType\":null,\"relationName\":\"ComunidadToSolicitud\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Credenciales\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"correoUsuario\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"password\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"usuario\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Usuario\",\"nativeType\":null,\"relationName\":\"CredencialesToUsuario\",\"relationFromFields\":[\"correoUsuario\"],\"relationToFields\":[\"correo\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Incidencia\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"comunidad\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"usuario\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fecha\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"descripcion\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"estado\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Estado_Incidencia\",\"nativeType\":null,\"default\":\"solucionada\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comunidadID\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Comunidad\",\"nativeType\":null,\"relationName\":\"ComunidadToIncidencia\",\"relationFromFields\":[\"comunidad\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"usuarioID\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Usuario\",\"nativeType\":null,\"relationName\":\"IncidenciaToUsuario\",\"relationFromFields\":[\"usuario\"],\"relationToFields\":[\"correo\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"comunidad\",\"usuario\",\"fecha\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Inscripcion\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"usuario\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comunidad\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"usuarioID\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Usuario\",\"nativeType\":null,\"relationName\":\"InscripcionToUsuario\",\"relationFromFields\":[\"usuario\"],\"relationToFields\":[\"correo\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comunidadID\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Comunidad\",\"nativeType\":null,\"relationName\":\"ComunidadToInscripcion\",\"relationFromFields\":[\"comunidad\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"usuario\",\"comunidad\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Mensaje\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"horaCreacion\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"DateTime\",\"nativeType\":null,\"default\":{\"name\":\"now\",\"args\":[]},\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comunidad\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comunidadID\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Comunidad\",\"nativeType\":null,\"relationName\":\"ComunidadToMensaje\",\"relationFromFields\":[\"comunidad\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"horaCreacion\",\"comunidad\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Reserva\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"usuario\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comunidad\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"zona\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"fecha\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hora_inicio\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Time\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hora_fin\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":[\"Time\",[]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"usuarioID\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Usuario\",\"nativeType\":null,\"relationName\":\"ReservaToUsuario\",\"relationFromFields\":[\"usuario\"],\"relationToFields\":[\"correo\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"zonaID\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Zona\",\"nativeType\":null,\"relationName\":\"ReservaToZona\",\"relationFromFields\":[\"zona\",\"comunidad\"],\"relationToFields\":[\"nombre\",\"comunidad\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"usuario\",\"comunidad\",\"zona\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Solicitud\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"usuario\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comunidad\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"estado\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Estado_Solicitud\",\"nativeType\":null,\"default\":\"pendiente\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"usuarioID\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Usuario\",\"nativeType\":null,\"relationName\":\"SolicitudToUsuario\",\"relationFromFields\":[\"usuario\"],\"relationToFields\":[\"correo\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comunidadID\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Comunidad\",\"nativeType\":null,\"relationName\":\"ComunidadToSolicitud\",\"relationFromFields\":[\"comunidad\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"usuario\",\"comunidad\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Usuario\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"correo\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":true,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"rol\",\"kind\":\"enum\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":true,\"type\":\"Role\",\"nativeType\":null,\"default\":\"inquilino\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nombre_usuario\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"nombre\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"apellidos\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"calle\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"numero\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"piso\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"letra\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":[\"Char\",[\"1\"]],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"localidad\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"credenciales\",\"kind\":\"object\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Credenciales\",\"nativeType\":null,\"relationName\":\"CredencialesToUsuario\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"incidencias\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Incidencia\",\"nativeType\":null,\"relationName\":\"IncidenciaToUsuario\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reservas\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Reserva\",\"nativeType\":null,\"relationName\":\"ReservaToUsuario\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"inscripciones\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Inscripcion\",\"nativeType\":null,\"relationName\":\"InscripcionToUsuario\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"solicitudes\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Solicitud\",\"nativeType\":null,\"relationName\":\"SolicitudToUsuario\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":null,\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false},\"Zona\":{\"dbName\":null,\"schema\":null,\"fields\":[{\"name\":\"nombre\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comunidad\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":true,\"hasDefaultValue\":false,\"type\":\"Int\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"descripcion\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"imagen\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":false,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"String\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hora_inicio\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"hora_fin\",\"kind\":\"scalar\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"DateTime\",\"nativeType\":null,\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"comunidadID\",\"kind\":\"object\",\"isList\":false,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Comunidad\",\"nativeType\":null,\"relationName\":\"ComunidadToZona\",\"relationFromFields\":[\"comunidad\"],\"relationToFields\":[\"id\"],\"relationOnDelete\":\"Cascade\",\"isGenerated\":false,\"isUpdatedAt\":false},{\"name\":\"reservas\",\"kind\":\"object\",\"isList\":true,\"isRequired\":true,\"isUnique\":false,\"isId\":false,\"isReadOnly\":false,\"hasDefaultValue\":false,\"type\":\"Reserva\",\"nativeType\":null,\"relationName\":\"ReservaToZona\",\"relationFromFields\":[],\"relationToFields\":[],\"isGenerated\":false,\"isUpdatedAt\":false}],\"primaryKey\":{\"name\":null,\"fields\":[\"nombre\",\"comunidad\"]},\"uniqueFields\":[],\"uniqueIndexes\":[],\"isGenerated\":false}},\"enums\":{\"Estado_Incidencia\":{\"values\":[{\"name\":\"creada\",\"dbName\":null},{\"name\":\"procesandose\",\"dbName\":null},{\"name\":\"solucionada\",\"dbName\":null}],\"dbName\":null},\"Estado_Solicitud\":{\"values\":[{\"name\":\"pendiente\",\"dbName\":null},{\"name\":\"aprobada\",\"dbName\":null},{\"name\":\"denegada\",\"dbName\":null}],\"dbName\":null},\"Role\":{\"values\":[{\"name\":\"inquilino\",\"dbName\":null},{\"name\":\"administrador\",\"dbName\":null},{\"name\":\"webAdmin\",\"dbName\":null}],\"dbName\":null}},\"types\":{}}")
defineDmmfProperty(exports.Prisma, config.runtimeDataModel)
config.engineWasm = undefined
config.compilerWasm = undefined


const { warnEnvConflicts } = require('./runtime/library.js')

warnEnvConflicts({
    rootEnvPath: config.relativeEnvPaths.rootEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.rootEnvPath),
    schemaEnvPath: config.relativeEnvPaths.schemaEnvPath && path.resolve(config.dirname, config.relativeEnvPaths.schemaEnvPath)
})

const PrismaClient = getPrismaClient(config)
exports.PrismaClient = PrismaClient
Object.assign(exports, Prisma)

// file annotations for bundling tools to include these files
path.join(__dirname, "libquery_engine-debian-openssl-3.0.x.so.node");
path.join(process.cwd(), "src/prisma/client/libquery_engine-debian-openssl-3.0.x.so.node")
// file annotations for bundling tools to include these files
path.join(__dirname, "schema.prisma");
path.join(process.cwd(), "src/prisma/client/schema.prisma")
