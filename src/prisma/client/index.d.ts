
/**
 * Client
**/

import * as runtime from './runtime/library.js';
import $Types = runtime.Types // general types
import $Public = runtime.Types.Public
import $Utils = runtime.Types.Utils
import $Extensions = runtime.Types.Extensions
import $Result = runtime.Types.Result

export type PrismaPromise<T> = $Public.PrismaPromise<T>


/**
 * Model Comunidad
 * 
 */
export type Comunidad = $Result.DefaultSelection<Prisma.$ComunidadPayload>
/**
 * Model Contacto
 * 
 */
export type Contacto = $Result.DefaultSelection<Prisma.$ContactoPayload>
/**
 * Model Credenciales
 * 
 */
export type Credenciales = $Result.DefaultSelection<Prisma.$CredencialesPayload>
/**
 * Model Incidencia
 * 
 */
export type Incidencia = $Result.DefaultSelection<Prisma.$IncidenciaPayload>
/**
 * Model Inscripcion
 * 
 */
export type Inscripcion = $Result.DefaultSelection<Prisma.$InscripcionPayload>
/**
 * Model Mensaje
 * 
 */
export type Mensaje = $Result.DefaultSelection<Prisma.$MensajePayload>
/**
 * Model Reserva
 * 
 */
export type Reserva = $Result.DefaultSelection<Prisma.$ReservaPayload>
/**
 * Model Solicitud
 * 
 */
export type Solicitud = $Result.DefaultSelection<Prisma.$SolicitudPayload>
/**
 * Model Usuario
 * 
 */
export type Usuario = $Result.DefaultSelection<Prisma.$UsuarioPayload>
/**
 * Model Zona
 * 
 */
export type Zona = $Result.DefaultSelection<Prisma.$ZonaPayload>

/**
 * Enums
 */
export namespace $Enums {
  export const Estado_Incidencia: {
  creada: 'creada',
  procesandose: 'procesandose',
  solucionada: 'solucionada'
};

export type Estado_Incidencia = (typeof Estado_Incidencia)[keyof typeof Estado_Incidencia]


export const Estado_Solicitud: {
  pendiente: 'pendiente',
  aprobada: 'aprobada',
  denegada: 'denegada'
};

export type Estado_Solicitud = (typeof Estado_Solicitud)[keyof typeof Estado_Solicitud]


export const Role: {
  inquilino: 'inquilino',
  administrador: 'administrador',
  webAdmin: 'webAdmin'
};

export type Role = (typeof Role)[keyof typeof Role]

}

export type Estado_Incidencia = $Enums.Estado_Incidencia

export const Estado_Incidencia: typeof $Enums.Estado_Incidencia

export type Estado_Solicitud = $Enums.Estado_Solicitud

export const Estado_Solicitud: typeof $Enums.Estado_Solicitud

export type Role = $Enums.Role

export const Role: typeof $Enums.Role

/**
 * ##  Prisma Client ʲˢ
 *
 * Type-safe database client for TypeScript & Node.js
 * @example
 * ```
 * const prisma = new PrismaClient()
 * // Fetch zero or more Comunidads
 * const comunidads = await prisma.comunidad.findMany()
 * ```
 *
 *
 * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
 */
export class PrismaClient<
  ClientOptions extends Prisma.PrismaClientOptions = Prisma.PrismaClientOptions,
  U = 'log' extends keyof ClientOptions ? ClientOptions['log'] extends Array<Prisma.LogLevel | Prisma.LogDefinition> ? Prisma.GetEvents<ClientOptions['log']> : never : never,
  ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs
> {
  [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['other'] }

    /**
   * ##  Prisma Client ʲˢ
   *
   * Type-safe database client for TypeScript & Node.js
   * @example
   * ```
   * const prisma = new PrismaClient()
   * // Fetch zero or more Comunidads
   * const comunidads = await prisma.comunidad.findMany()
   * ```
   *
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client).
   */

  constructor(optionsArg ?: Prisma.Subset<ClientOptions, Prisma.PrismaClientOptions>);
  $on<V extends U>(eventType: V, callback: (event: V extends 'query' ? Prisma.QueryEvent : Prisma.LogEvent) => void): PrismaClient;

  /**
   * Connect with the database
   */
  $connect(): $Utils.JsPromise<void>;

  /**
   * Disconnect from the database
   */
  $disconnect(): $Utils.JsPromise<void>;

  /**
   * Add a middleware
   * @deprecated since 4.16.0. For new code, prefer client extensions instead.
   * @see https://pris.ly/d/extensions
   */
  $use(cb: Prisma.Middleware): void

/**
   * Executes a prepared raw query and returns the number of affected rows.
   * @example
   * ```
   * const result = await prisma.$executeRaw`UPDATE User SET cool = ${true} WHERE email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Executes a raw query and returns the number of affected rows.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$executeRawUnsafe('UPDATE User SET cool = $1 WHERE email = $2 ;', true, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $executeRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<number>;

  /**
   * Performs a prepared raw query and returns the `SELECT` data.
   * @example
   * ```
   * const result = await prisma.$queryRaw`SELECT * FROM User WHERE id = ${1} OR email = ${'user@email.com'};`
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRaw<T = unknown>(query: TemplateStringsArray | Prisma.Sql, ...values: any[]): Prisma.PrismaPromise<T>;

  /**
   * Performs a raw query and returns the `SELECT` data.
   * Susceptible to SQL injections, see documentation.
   * @example
   * ```
   * const result = await prisma.$queryRawUnsafe('SELECT * FROM User WHERE id = $1 OR email = $2;', 1, 'user@email.com')
   * ```
   *
   * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/raw-database-access).
   */
  $queryRawUnsafe<T = unknown>(query: string, ...values: any[]): Prisma.PrismaPromise<T>;


  /**
   * Allows the running of a sequence of read/write operations that are guaranteed to either succeed or fail as a whole.
   * @example
   * ```
   * const [george, bob, alice] = await prisma.$transaction([
   *   prisma.user.create({ data: { name: 'George' } }),
   *   prisma.user.create({ data: { name: 'Bob' } }),
   *   prisma.user.create({ data: { name: 'Alice' } }),
   * ])
   * ```
   * 
   * Read more in our [docs](https://www.prisma.io/docs/concepts/components/prisma-client/transactions).
   */
  $transaction<P extends Prisma.PrismaPromise<any>[]>(arg: [...P], options?: { isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<runtime.Types.Utils.UnwrapTuple<P>>

  $transaction<R>(fn: (prisma: Omit<PrismaClient, runtime.ITXClientDenyList>) => $Utils.JsPromise<R>, options?: { maxWait?: number, timeout?: number, isolationLevel?: Prisma.TransactionIsolationLevel }): $Utils.JsPromise<R>


  $extends: $Extensions.ExtendsHook<"extends", Prisma.TypeMapCb<ClientOptions>, ExtArgs, $Utils.Call<Prisma.TypeMapCb<ClientOptions>, {
    extArgs: ExtArgs
  }>>

      /**
   * `prisma.comunidad`: Exposes CRUD operations for the **Comunidad** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Comunidads
    * const comunidads = await prisma.comunidad.findMany()
    * ```
    */
  get comunidad(): Prisma.ComunidadDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.contacto`: Exposes CRUD operations for the **Contacto** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Contactos
    * const contactos = await prisma.contacto.findMany()
    * ```
    */
  get contacto(): Prisma.ContactoDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.credenciales`: Exposes CRUD operations for the **Credenciales** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Credenciales
    * const credenciales = await prisma.credenciales.findMany()
    * ```
    */
  get credenciales(): Prisma.CredencialesDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.incidencia`: Exposes CRUD operations for the **Incidencia** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Incidencias
    * const incidencias = await prisma.incidencia.findMany()
    * ```
    */
  get incidencia(): Prisma.IncidenciaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.inscripcion`: Exposes CRUD operations for the **Inscripcion** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Inscripcions
    * const inscripcions = await prisma.inscripcion.findMany()
    * ```
    */
  get inscripcion(): Prisma.InscripcionDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.mensaje`: Exposes CRUD operations for the **Mensaje** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Mensajes
    * const mensajes = await prisma.mensaje.findMany()
    * ```
    */
  get mensaje(): Prisma.MensajeDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.reserva`: Exposes CRUD operations for the **Reserva** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Reservas
    * const reservas = await prisma.reserva.findMany()
    * ```
    */
  get reserva(): Prisma.ReservaDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.solicitud`: Exposes CRUD operations for the **Solicitud** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Solicituds
    * const solicituds = await prisma.solicitud.findMany()
    * ```
    */
  get solicitud(): Prisma.SolicitudDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.usuario`: Exposes CRUD operations for the **Usuario** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Usuarios
    * const usuarios = await prisma.usuario.findMany()
    * ```
    */
  get usuario(): Prisma.UsuarioDelegate<ExtArgs, ClientOptions>;

  /**
   * `prisma.zona`: Exposes CRUD operations for the **Zona** model.
    * Example usage:
    * ```ts
    * // Fetch zero or more Zonas
    * const zonas = await prisma.zona.findMany()
    * ```
    */
  get zona(): Prisma.ZonaDelegate<ExtArgs, ClientOptions>;
}

export namespace Prisma {
  export import DMMF = runtime.DMMF

  export type PrismaPromise<T> = $Public.PrismaPromise<T>

  /**
   * Validator
   */
  export import validator = runtime.Public.validator

  /**
   * Prisma Errors
   */
  export import PrismaClientKnownRequestError = runtime.PrismaClientKnownRequestError
  export import PrismaClientUnknownRequestError = runtime.PrismaClientUnknownRequestError
  export import PrismaClientRustPanicError = runtime.PrismaClientRustPanicError
  export import PrismaClientInitializationError = runtime.PrismaClientInitializationError
  export import PrismaClientValidationError = runtime.PrismaClientValidationError

  /**
   * Re-export of sql-template-tag
   */
  export import sql = runtime.sqltag
  export import empty = runtime.empty
  export import join = runtime.join
  export import raw = runtime.raw
  export import Sql = runtime.Sql



  /**
   * Decimal.js
   */
  export import Decimal = runtime.Decimal

  export type DecimalJsLike = runtime.DecimalJsLike

  /**
   * Metrics
   */
  export type Metrics = runtime.Metrics
  export type Metric<T> = runtime.Metric<T>
  export type MetricHistogram = runtime.MetricHistogram
  export type MetricHistogramBucket = runtime.MetricHistogramBucket

  /**
  * Extensions
  */
  export import Extension = $Extensions.UserArgs
  export import getExtensionContext = runtime.Extensions.getExtensionContext
  export import Args = $Public.Args
  export import Payload = $Public.Payload
  export import Result = $Public.Result
  export import Exact = $Public.Exact

  /**
   * Prisma Client JS version: 6.6.0
   * Query Engine version: f676762280b54cd07c770017ed3711ddde35f37a
   */
  export type PrismaVersion = {
    client: string
  }

  export const prismaVersion: PrismaVersion

  /**
   * Utility Types
   */


  export import JsonObject = runtime.JsonObject
  export import JsonArray = runtime.JsonArray
  export import JsonValue = runtime.JsonValue
  export import InputJsonObject = runtime.InputJsonObject
  export import InputJsonArray = runtime.InputJsonArray
  export import InputJsonValue = runtime.InputJsonValue

  /**
   * Types of the values used to represent different kinds of `null` values when working with JSON fields.
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  namespace NullTypes {
    /**
    * Type of `Prisma.DbNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.DbNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class DbNull {
      private DbNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.JsonNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.JsonNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class JsonNull {
      private JsonNull: never
      private constructor()
    }

    /**
    * Type of `Prisma.AnyNull`.
    *
    * You cannot use other instances of this class. Please use the `Prisma.AnyNull` value.
    *
    * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
    */
    class AnyNull {
      private AnyNull: never
      private constructor()
    }
  }

  /**
   * Helper for filtering JSON entries that have `null` on the database (empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const DbNull: NullTypes.DbNull

  /**
   * Helper for filtering JSON entries that have JSON `null` values (not empty on the db)
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const JsonNull: NullTypes.JsonNull

  /**
   * Helper for filtering JSON entries that are `Prisma.DbNull` or `Prisma.JsonNull`
   *
   * @see https://www.prisma.io/docs/concepts/components/prisma-client/working-with-fields/working-with-json-fields#filtering-on-a-json-field
   */
  export const AnyNull: NullTypes.AnyNull

  type SelectAndInclude = {
    select: any
    include: any
  }

  type SelectAndOmit = {
    select: any
    omit: any
  }

  /**
   * Get the type of the value, that the Promise holds.
   */
  export type PromiseType<T extends PromiseLike<any>> = T extends PromiseLike<infer U> ? U : T;

  /**
   * Get the return type of a function which returns a Promise.
   */
  export type PromiseReturnType<T extends (...args: any) => $Utils.JsPromise<any>> = PromiseType<ReturnType<T>>

  /**
   * From T, pick a set of properties whose keys are in the union K
   */
  type Prisma__Pick<T, K extends keyof T> = {
      [P in K]: T[P];
  };


  export type Enumerable<T> = T | Array<T>;

  export type RequiredKeys<T> = {
    [K in keyof T]-?: {} extends Prisma__Pick<T, K> ? never : K
  }[keyof T]

  export type TruthyKeys<T> = keyof {
    [K in keyof T as T[K] extends false | undefined | null ? never : K]: K
  }

  export type TrueKeys<T> = TruthyKeys<Prisma__Pick<T, RequiredKeys<T>>>

  /**
   * Subset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection
   */
  export type Subset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never;
  };

  /**
   * SelectSubset
   * @desc From `T` pick properties that exist in `U`. Simple version of Intersection.
   * Additionally, it validates, if both select and include are present. If the case, it errors.
   */
  export type SelectSubset<T, U> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    (T extends SelectAndInclude
      ? 'Please either choose `select` or `include`.'
      : T extends SelectAndOmit
        ? 'Please either choose `select` or `omit`.'
        : {})

  /**
   * Subset + Intersection
   * @desc From `T` pick properties that exist in `U` and intersect `K`
   */
  export type SubsetIntersection<T, U, K> = {
    [key in keyof T]: key extends keyof U ? T[key] : never
  } &
    K

  type Without<T, U> = { [P in Exclude<keyof T, keyof U>]?: never };

  /**
   * XOR is needed to have a real mutually exclusive union type
   * https://stackoverflow.com/questions/42123407/does-typescript-support-mutually-exclusive-types
   */
  type XOR<T, U> =
    T extends object ?
    U extends object ?
      (Without<T, U> & U) | (Without<U, T> & T)
    : U : T


  /**
   * Is T a Record?
   */
  type IsObject<T extends any> = T extends Array<any>
  ? False
  : T extends Date
  ? False
  : T extends Uint8Array
  ? False
  : T extends BigInt
  ? False
  : T extends object
  ? True
  : False


  /**
   * If it's T[], return T
   */
  export type UnEnumerate<T extends unknown> = T extends Array<infer U> ? U : T

  /**
   * From ts-toolbelt
   */

  type __Either<O extends object, K extends Key> = Omit<O, K> &
    {
      // Merge all but K
      [P in K]: Prisma__Pick<O, P & keyof O> // With K possibilities
    }[K]

  type EitherStrict<O extends object, K extends Key> = Strict<__Either<O, K>>

  type EitherLoose<O extends object, K extends Key> = ComputeRaw<__Either<O, K>>

  type _Either<
    O extends object,
    K extends Key,
    strict extends Boolean
  > = {
    1: EitherStrict<O, K>
    0: EitherLoose<O, K>
  }[strict]

  type Either<
    O extends object,
    K extends Key,
    strict extends Boolean = 1
  > = O extends unknown ? _Either<O, K, strict> : never

  export type Union = any

  type PatchUndefined<O extends object, O1 extends object> = {
    [K in keyof O]: O[K] extends undefined ? At<O1, K> : O[K]
  } & {}

  /** Helper Types for "Merge" **/
  export type IntersectOf<U extends Union> = (
    U extends unknown ? (k: U) => void : never
  ) extends (k: infer I) => void
    ? I
    : never

  export type Overwrite<O extends object, O1 extends object> = {
      [K in keyof O]: K extends keyof O1 ? O1[K] : O[K];
  } & {};

  type _Merge<U extends object> = IntersectOf<Overwrite<U, {
      [K in keyof U]-?: At<U, K>;
  }>>;

  type Key = string | number | symbol;
  type AtBasic<O extends object, K extends Key> = K extends keyof O ? O[K] : never;
  type AtStrict<O extends object, K extends Key> = O[K & keyof O];
  type AtLoose<O extends object, K extends Key> = O extends unknown ? AtStrict<O, K> : never;
  export type At<O extends object, K extends Key, strict extends Boolean = 1> = {
      1: AtStrict<O, K>;
      0: AtLoose<O, K>;
  }[strict];

  export type ComputeRaw<A extends any> = A extends Function ? A : {
    [K in keyof A]: A[K];
  } & {};

  export type OptionalFlat<O> = {
    [K in keyof O]?: O[K];
  } & {};

  type _Record<K extends keyof any, T> = {
    [P in K]: T;
  };

  // cause typescript not to expand types and preserve names
  type NoExpand<T> = T extends unknown ? T : never;

  // this type assumes the passed object is entirely optional
  type AtLeast<O extends object, K extends string> = NoExpand<
    O extends unknown
    ? | (K extends keyof O ? { [P in K]: O[P] } & O : O)
      | {[P in keyof O as P extends K ? P : never]-?: O[P]} & O
    : never>;

  type _Strict<U, _U = U> = U extends unknown ? U & OptionalFlat<_Record<Exclude<Keys<_U>, keyof U>, never>> : never;

  export type Strict<U extends object> = ComputeRaw<_Strict<U>>;
  /** End Helper Types for "Merge" **/

  export type Merge<U extends object> = ComputeRaw<_Merge<Strict<U>>>;

  /**
  A [[Boolean]]
  */
  export type Boolean = True | False

  // /**
  // 1
  // */
  export type True = 1

  /**
  0
  */
  export type False = 0

  export type Not<B extends Boolean> = {
    0: 1
    1: 0
  }[B]

  export type Extends<A1 extends any, A2 extends any> = [A1] extends [never]
    ? 0 // anything `never` is false
    : A1 extends A2
    ? 1
    : 0

  export type Has<U extends Union, U1 extends Union> = Not<
    Extends<Exclude<U1, U>, U1>
  >

  export type Or<B1 extends Boolean, B2 extends Boolean> = {
    0: {
      0: 0
      1: 1
    }
    1: {
      0: 1
      1: 1
    }
  }[B1][B2]

  export type Keys<U extends Union> = U extends unknown ? keyof U : never

  type Cast<A, B> = A extends B ? A : B;

  export const type: unique symbol;



  /**
   * Used by group by
   */

  export type GetScalarType<T, O> = O extends object ? {
    [P in keyof T]: P extends keyof O
      ? O[P]
      : never
  } : never

  type FieldPaths<
    T,
    U = Omit<T, '_avg' | '_sum' | '_count' | '_min' | '_max'>
  > = IsObject<T> extends True ? U : T

  type GetHavingFields<T> = {
    [K in keyof T]: Or<
      Or<Extends<'OR', K>, Extends<'AND', K>>,
      Extends<'NOT', K>
    > extends True
      ? // infer is only needed to not hit TS limit
        // based on the brilliant idea of Pierre-Antoine Mills
        // https://github.com/microsoft/TypeScript/issues/30188#issuecomment-478938437
        T[K] extends infer TK
        ? GetHavingFields<UnEnumerate<TK> extends object ? Merge<UnEnumerate<TK>> : never>
        : never
      : {} extends FieldPaths<T[K]>
      ? never
      : K
  }[keyof T]

  /**
   * Convert tuple to union
   */
  type _TupleToUnion<T> = T extends (infer E)[] ? E : never
  type TupleToUnion<K extends readonly any[]> = _TupleToUnion<K>
  type MaybeTupleToUnion<T> = T extends any[] ? TupleToUnion<T> : T

  /**
   * Like `Pick`, but additionally can also accept an array of keys
   */
  type PickEnumerable<T, K extends Enumerable<keyof T> | keyof T> = Prisma__Pick<T, MaybeTupleToUnion<K>>

  /**
   * Exclude all keys with underscores
   */
  type ExcludeUnderscoreKeys<T extends string> = T extends `_${string}` ? never : T


  export type FieldRef<Model, FieldType> = runtime.FieldRef<Model, FieldType>

  type FieldRefInputType<Model, FieldType> = Model extends never ? never : FieldRef<Model, FieldType>


  export const ModelName: {
    Comunidad: 'Comunidad',
    Contacto: 'Contacto',
    Credenciales: 'Credenciales',
    Incidencia: 'Incidencia',
    Inscripcion: 'Inscripcion',
    Mensaje: 'Mensaje',
    Reserva: 'Reserva',
    Solicitud: 'Solicitud',
    Usuario: 'Usuario',
    Zona: 'Zona'
  };

  export type ModelName = (typeof ModelName)[keyof typeof ModelName]


  export type Datasources = {
    db?: Datasource
  }

  interface TypeMapCb<ClientOptions = {}> extends $Utils.Fn<{extArgs: $Extensions.InternalArgs }, $Utils.Record<string, any>> {
    returns: Prisma.TypeMap<this['params']['extArgs'], ClientOptions extends { omit: infer OmitOptions } ? OmitOptions : {}>
  }

  export type TypeMap<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> = {
    globalOmitOptions: {
      omit: GlobalOmitOptions
    }
    meta: {
      modelProps: "comunidad" | "contacto" | "credenciales" | "incidencia" | "inscripcion" | "mensaje" | "reserva" | "solicitud" | "usuario" | "zona"
      txIsolationLevel: Prisma.TransactionIsolationLevel
    }
    model: {
      Comunidad: {
        payload: Prisma.$ComunidadPayload<ExtArgs>
        fields: Prisma.ComunidadFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ComunidadFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComunidadPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ComunidadFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComunidadPayload>
          }
          findFirst: {
            args: Prisma.ComunidadFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComunidadPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ComunidadFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComunidadPayload>
          }
          findMany: {
            args: Prisma.ComunidadFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComunidadPayload>[]
          }
          create: {
            args: Prisma.ComunidadCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComunidadPayload>
          }
          createMany: {
            args: Prisma.ComunidadCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ComunidadCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComunidadPayload>[]
          }
          delete: {
            args: Prisma.ComunidadDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComunidadPayload>
          }
          update: {
            args: Prisma.ComunidadUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComunidadPayload>
          }
          deleteMany: {
            args: Prisma.ComunidadDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ComunidadUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ComunidadUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComunidadPayload>[]
          }
          upsert: {
            args: Prisma.ComunidadUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ComunidadPayload>
          }
          aggregate: {
            args: Prisma.ComunidadAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateComunidad>
          }
          groupBy: {
            args: Prisma.ComunidadGroupByArgs<ExtArgs>
            result: $Utils.Optional<ComunidadGroupByOutputType>[]
          }
          count: {
            args: Prisma.ComunidadCountArgs<ExtArgs>
            result: $Utils.Optional<ComunidadCountAggregateOutputType> | number
          }
        }
      }
      Contacto: {
        payload: Prisma.$ContactoPayload<ExtArgs>
        fields: Prisma.ContactoFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ContactoFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactoPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ContactoFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactoPayload>
          }
          findFirst: {
            args: Prisma.ContactoFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactoPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ContactoFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactoPayload>
          }
          findMany: {
            args: Prisma.ContactoFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactoPayload>[]
          }
          create: {
            args: Prisma.ContactoCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactoPayload>
          }
          createMany: {
            args: Prisma.ContactoCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ContactoCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactoPayload>[]
          }
          delete: {
            args: Prisma.ContactoDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactoPayload>
          }
          update: {
            args: Prisma.ContactoUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactoPayload>
          }
          deleteMany: {
            args: Prisma.ContactoDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ContactoUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ContactoUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactoPayload>[]
          }
          upsert: {
            args: Prisma.ContactoUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ContactoPayload>
          }
          aggregate: {
            args: Prisma.ContactoAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateContacto>
          }
          groupBy: {
            args: Prisma.ContactoGroupByArgs<ExtArgs>
            result: $Utils.Optional<ContactoGroupByOutputType>[]
          }
          count: {
            args: Prisma.ContactoCountArgs<ExtArgs>
            result: $Utils.Optional<ContactoCountAggregateOutputType> | number
          }
        }
      }
      Credenciales: {
        payload: Prisma.$CredencialesPayload<ExtArgs>
        fields: Prisma.CredencialesFieldRefs
        operations: {
          findUnique: {
            args: Prisma.CredencialesFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredencialesPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.CredencialesFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredencialesPayload>
          }
          findFirst: {
            args: Prisma.CredencialesFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredencialesPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.CredencialesFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredencialesPayload>
          }
          findMany: {
            args: Prisma.CredencialesFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredencialesPayload>[]
          }
          create: {
            args: Prisma.CredencialesCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredencialesPayload>
          }
          createMany: {
            args: Prisma.CredencialesCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.CredencialesCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredencialesPayload>[]
          }
          delete: {
            args: Prisma.CredencialesDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredencialesPayload>
          }
          update: {
            args: Prisma.CredencialesUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredencialesPayload>
          }
          deleteMany: {
            args: Prisma.CredencialesDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.CredencialesUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.CredencialesUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredencialesPayload>[]
          }
          upsert: {
            args: Prisma.CredencialesUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$CredencialesPayload>
          }
          aggregate: {
            args: Prisma.CredencialesAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateCredenciales>
          }
          groupBy: {
            args: Prisma.CredencialesGroupByArgs<ExtArgs>
            result: $Utils.Optional<CredencialesGroupByOutputType>[]
          }
          count: {
            args: Prisma.CredencialesCountArgs<ExtArgs>
            result: $Utils.Optional<CredencialesCountAggregateOutputType> | number
          }
        }
      }
      Incidencia: {
        payload: Prisma.$IncidenciaPayload<ExtArgs>
        fields: Prisma.IncidenciaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.IncidenciaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncidenciaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.IncidenciaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncidenciaPayload>
          }
          findFirst: {
            args: Prisma.IncidenciaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncidenciaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.IncidenciaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncidenciaPayload>
          }
          findMany: {
            args: Prisma.IncidenciaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncidenciaPayload>[]
          }
          create: {
            args: Prisma.IncidenciaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncidenciaPayload>
          }
          createMany: {
            args: Prisma.IncidenciaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.IncidenciaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncidenciaPayload>[]
          }
          delete: {
            args: Prisma.IncidenciaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncidenciaPayload>
          }
          update: {
            args: Prisma.IncidenciaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncidenciaPayload>
          }
          deleteMany: {
            args: Prisma.IncidenciaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.IncidenciaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.IncidenciaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncidenciaPayload>[]
          }
          upsert: {
            args: Prisma.IncidenciaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$IncidenciaPayload>
          }
          aggregate: {
            args: Prisma.IncidenciaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateIncidencia>
          }
          groupBy: {
            args: Prisma.IncidenciaGroupByArgs<ExtArgs>
            result: $Utils.Optional<IncidenciaGroupByOutputType>[]
          }
          count: {
            args: Prisma.IncidenciaCountArgs<ExtArgs>
            result: $Utils.Optional<IncidenciaCountAggregateOutputType> | number
          }
        }
      }
      Inscripcion: {
        payload: Prisma.$InscripcionPayload<ExtArgs>
        fields: Prisma.InscripcionFieldRefs
        operations: {
          findUnique: {
            args: Prisma.InscripcionFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.InscripcionFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>
          }
          findFirst: {
            args: Prisma.InscripcionFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.InscripcionFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>
          }
          findMany: {
            args: Prisma.InscripcionFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>[]
          }
          create: {
            args: Prisma.InscripcionCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>
          }
          createMany: {
            args: Prisma.InscripcionCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.InscripcionCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>[]
          }
          delete: {
            args: Prisma.InscripcionDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>
          }
          update: {
            args: Prisma.InscripcionUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>
          }
          deleteMany: {
            args: Prisma.InscripcionDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.InscripcionUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.InscripcionUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>[]
          }
          upsert: {
            args: Prisma.InscripcionUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$InscripcionPayload>
          }
          aggregate: {
            args: Prisma.InscripcionAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateInscripcion>
          }
          groupBy: {
            args: Prisma.InscripcionGroupByArgs<ExtArgs>
            result: $Utils.Optional<InscripcionGroupByOutputType>[]
          }
          count: {
            args: Prisma.InscripcionCountArgs<ExtArgs>
            result: $Utils.Optional<InscripcionCountAggregateOutputType> | number
          }
        }
      }
      Mensaje: {
        payload: Prisma.$MensajePayload<ExtArgs>
        fields: Prisma.MensajeFieldRefs
        operations: {
          findUnique: {
            args: Prisma.MensajeFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensajePayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.MensajeFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensajePayload>
          }
          findFirst: {
            args: Prisma.MensajeFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensajePayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.MensajeFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensajePayload>
          }
          findMany: {
            args: Prisma.MensajeFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensajePayload>[]
          }
          create: {
            args: Prisma.MensajeCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensajePayload>
          }
          createMany: {
            args: Prisma.MensajeCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.MensajeCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensajePayload>[]
          }
          delete: {
            args: Prisma.MensajeDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensajePayload>
          }
          update: {
            args: Prisma.MensajeUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensajePayload>
          }
          deleteMany: {
            args: Prisma.MensajeDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.MensajeUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.MensajeUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensajePayload>[]
          }
          upsert: {
            args: Prisma.MensajeUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$MensajePayload>
          }
          aggregate: {
            args: Prisma.MensajeAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateMensaje>
          }
          groupBy: {
            args: Prisma.MensajeGroupByArgs<ExtArgs>
            result: $Utils.Optional<MensajeGroupByOutputType>[]
          }
          count: {
            args: Prisma.MensajeCountArgs<ExtArgs>
            result: $Utils.Optional<MensajeCountAggregateOutputType> | number
          }
        }
      }
      Reserva: {
        payload: Prisma.$ReservaPayload<ExtArgs>
        fields: Prisma.ReservaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ReservaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ReservaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservaPayload>
          }
          findFirst: {
            args: Prisma.ReservaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ReservaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservaPayload>
          }
          findMany: {
            args: Prisma.ReservaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservaPayload>[]
          }
          create: {
            args: Prisma.ReservaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservaPayload>
          }
          createMany: {
            args: Prisma.ReservaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ReservaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservaPayload>[]
          }
          delete: {
            args: Prisma.ReservaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservaPayload>
          }
          update: {
            args: Prisma.ReservaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservaPayload>
          }
          deleteMany: {
            args: Prisma.ReservaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ReservaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ReservaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservaPayload>[]
          }
          upsert: {
            args: Prisma.ReservaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ReservaPayload>
          }
          aggregate: {
            args: Prisma.ReservaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateReserva>
          }
          groupBy: {
            args: Prisma.ReservaGroupByArgs<ExtArgs>
            result: $Utils.Optional<ReservaGroupByOutputType>[]
          }
          count: {
            args: Prisma.ReservaCountArgs<ExtArgs>
            result: $Utils.Optional<ReservaCountAggregateOutputType> | number
          }
        }
      }
      Solicitud: {
        payload: Prisma.$SolicitudPayload<ExtArgs>
        fields: Prisma.SolicitudFieldRefs
        operations: {
          findUnique: {
            args: Prisma.SolicitudFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.SolicitudFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudPayload>
          }
          findFirst: {
            args: Prisma.SolicitudFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.SolicitudFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudPayload>
          }
          findMany: {
            args: Prisma.SolicitudFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudPayload>[]
          }
          create: {
            args: Prisma.SolicitudCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudPayload>
          }
          createMany: {
            args: Prisma.SolicitudCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.SolicitudCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudPayload>[]
          }
          delete: {
            args: Prisma.SolicitudDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudPayload>
          }
          update: {
            args: Prisma.SolicitudUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudPayload>
          }
          deleteMany: {
            args: Prisma.SolicitudDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.SolicitudUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.SolicitudUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudPayload>[]
          }
          upsert: {
            args: Prisma.SolicitudUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$SolicitudPayload>
          }
          aggregate: {
            args: Prisma.SolicitudAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateSolicitud>
          }
          groupBy: {
            args: Prisma.SolicitudGroupByArgs<ExtArgs>
            result: $Utils.Optional<SolicitudGroupByOutputType>[]
          }
          count: {
            args: Prisma.SolicitudCountArgs<ExtArgs>
            result: $Utils.Optional<SolicitudCountAggregateOutputType> | number
          }
        }
      }
      Usuario: {
        payload: Prisma.$UsuarioPayload<ExtArgs>
        fields: Prisma.UsuarioFieldRefs
        operations: {
          findUnique: {
            args: Prisma.UsuarioFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.UsuarioFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findFirst: {
            args: Prisma.UsuarioFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.UsuarioFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          findMany: {
            args: Prisma.UsuarioFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          create: {
            args: Prisma.UsuarioCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          createMany: {
            args: Prisma.UsuarioCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.UsuarioCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          delete: {
            args: Prisma.UsuarioDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          update: {
            args: Prisma.UsuarioUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          deleteMany: {
            args: Prisma.UsuarioDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.UsuarioUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.UsuarioUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>[]
          }
          upsert: {
            args: Prisma.UsuarioUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$UsuarioPayload>
          }
          aggregate: {
            args: Prisma.UsuarioAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateUsuario>
          }
          groupBy: {
            args: Prisma.UsuarioGroupByArgs<ExtArgs>
            result: $Utils.Optional<UsuarioGroupByOutputType>[]
          }
          count: {
            args: Prisma.UsuarioCountArgs<ExtArgs>
            result: $Utils.Optional<UsuarioCountAggregateOutputType> | number
          }
        }
      }
      Zona: {
        payload: Prisma.$ZonaPayload<ExtArgs>
        fields: Prisma.ZonaFieldRefs
        operations: {
          findUnique: {
            args: Prisma.ZonaFindUniqueArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonaPayload> | null
          }
          findUniqueOrThrow: {
            args: Prisma.ZonaFindUniqueOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonaPayload>
          }
          findFirst: {
            args: Prisma.ZonaFindFirstArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonaPayload> | null
          }
          findFirstOrThrow: {
            args: Prisma.ZonaFindFirstOrThrowArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonaPayload>
          }
          findMany: {
            args: Prisma.ZonaFindManyArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonaPayload>[]
          }
          create: {
            args: Prisma.ZonaCreateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonaPayload>
          }
          createMany: {
            args: Prisma.ZonaCreateManyArgs<ExtArgs>
            result: BatchPayload
          }
          createManyAndReturn: {
            args: Prisma.ZonaCreateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonaPayload>[]
          }
          delete: {
            args: Prisma.ZonaDeleteArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonaPayload>
          }
          update: {
            args: Prisma.ZonaUpdateArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonaPayload>
          }
          deleteMany: {
            args: Prisma.ZonaDeleteManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateMany: {
            args: Prisma.ZonaUpdateManyArgs<ExtArgs>
            result: BatchPayload
          }
          updateManyAndReturn: {
            args: Prisma.ZonaUpdateManyAndReturnArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonaPayload>[]
          }
          upsert: {
            args: Prisma.ZonaUpsertArgs<ExtArgs>
            result: $Utils.PayloadToResult<Prisma.$ZonaPayload>
          }
          aggregate: {
            args: Prisma.ZonaAggregateArgs<ExtArgs>
            result: $Utils.Optional<AggregateZona>
          }
          groupBy: {
            args: Prisma.ZonaGroupByArgs<ExtArgs>
            result: $Utils.Optional<ZonaGroupByOutputType>[]
          }
          count: {
            args: Prisma.ZonaCountArgs<ExtArgs>
            result: $Utils.Optional<ZonaCountAggregateOutputType> | number
          }
        }
      }
    }
  } & {
    other: {
      payload: any
      operations: {
        $executeRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $executeRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
        $queryRaw: {
          args: [query: TemplateStringsArray | Prisma.Sql, ...values: any[]],
          result: any
        }
        $queryRawUnsafe: {
          args: [query: string, ...values: any[]],
          result: any
        }
      }
    }
  }
  export const defineExtension: $Extensions.ExtendsHook<"define", Prisma.TypeMapCb, $Extensions.DefaultArgs>
  export type DefaultPrismaClient = PrismaClient
  export type ErrorFormat = 'pretty' | 'colorless' | 'minimal'
  export interface PrismaClientOptions {
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasources?: Datasources
    /**
     * Overwrites the datasource url from your schema.prisma file
     */
    datasourceUrl?: string
    /**
     * @default "colorless"
     */
    errorFormat?: ErrorFormat
    /**
     * @example
     * ```
     * // Defaults to stdout
     * log: ['query', 'info', 'warn', 'error']
     * 
     * // Emit as events
     * log: [
     *   { emit: 'stdout', level: 'query' },
     *   { emit: 'stdout', level: 'info' },
     *   { emit: 'stdout', level: 'warn' }
     *   { emit: 'stdout', level: 'error' }
     * ]
     * ```
     * Read more in our [docs](https://www.prisma.io/docs/reference/tools-and-interfaces/prisma-client/logging#the-log-option).
     */
    log?: (LogLevel | LogDefinition)[]
    /**
     * The default values for transactionOptions
     * maxWait ?= 2000
     * timeout ?= 5000
     */
    transactionOptions?: {
      maxWait?: number
      timeout?: number
      isolationLevel?: Prisma.TransactionIsolationLevel
    }
    /**
     * Global configuration for omitting model fields by default.
     * 
     * @example
     * ```
     * const prisma = new PrismaClient({
     *   omit: {
     *     user: {
     *       password: true
     *     }
     *   }
     * })
     * ```
     */
    omit?: Prisma.GlobalOmitConfig
  }
  export type GlobalOmitConfig = {
    comunidad?: ComunidadOmit
    contacto?: ContactoOmit
    credenciales?: CredencialesOmit
    incidencia?: IncidenciaOmit
    inscripcion?: InscripcionOmit
    mensaje?: MensajeOmit
    reserva?: ReservaOmit
    solicitud?: SolicitudOmit
    usuario?: UsuarioOmit
    zona?: ZonaOmit
  }

  /* Types for Logging */
  export type LogLevel = 'info' | 'query' | 'warn' | 'error'
  export type LogDefinition = {
    level: LogLevel
    emit: 'stdout' | 'event'
  }

  export type GetLogType<T extends LogLevel | LogDefinition> = T extends LogDefinition ? T['emit'] extends 'event' ? T['level'] : never : never
  export type GetEvents<T extends any> = T extends Array<LogLevel | LogDefinition> ?
    GetLogType<T[0]> | GetLogType<T[1]> | GetLogType<T[2]> | GetLogType<T[3]>
    : never

  export type QueryEvent = {
    timestamp: Date
    query: string
    params: string
    duration: number
    target: string
  }

  export type LogEvent = {
    timestamp: Date
    message: string
    target: string
  }
  /* End Types for Logging */


  export type PrismaAction =
    | 'findUnique'
    | 'findUniqueOrThrow'
    | 'findMany'
    | 'findFirst'
    | 'findFirstOrThrow'
    | 'create'
    | 'createMany'
    | 'createManyAndReturn'
    | 'update'
    | 'updateMany'
    | 'updateManyAndReturn'
    | 'upsert'
    | 'delete'
    | 'deleteMany'
    | 'executeRaw'
    | 'queryRaw'
    | 'aggregate'
    | 'count'
    | 'runCommandRaw'
    | 'findRaw'
    | 'groupBy'

  /**
   * These options are being passed into the middleware as "params"
   */
  export type MiddlewareParams = {
    model?: ModelName
    action: PrismaAction
    args: any
    dataPath: string[]
    runInTransaction: boolean
  }

  /**
   * The `T` type makes sure, that the `return proceed` is not forgotten in the middleware implementation
   */
  export type Middleware<T = any> = (
    params: MiddlewareParams,
    next: (params: MiddlewareParams) => $Utils.JsPromise<T>,
  ) => $Utils.JsPromise<T>

  // tested in getLogLevel.test.ts
  export function getLogLevel(log: Array<LogLevel | LogDefinition>): LogLevel | undefined;

  /**
   * `PrismaClient` proxy available in interactive transactions.
   */
  export type TransactionClient = Omit<Prisma.DefaultPrismaClient, runtime.ITXClientDenyList>

  export type Datasource = {
    url?: string
  }

  /**
   * Count Types
   */


  /**
   * Count Type ComunidadCountOutputType
   */

  export type ComunidadCountOutputType = {
    mensajes: number
    zonas: number
    incidencias: number
    inscritos: number
    solicitudes: number
  }

  export type ComunidadCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mensajes?: boolean | ComunidadCountOutputTypeCountMensajesArgs
    zonas?: boolean | ComunidadCountOutputTypeCountZonasArgs
    incidencias?: boolean | ComunidadCountOutputTypeCountIncidenciasArgs
    inscritos?: boolean | ComunidadCountOutputTypeCountInscritosArgs
    solicitudes?: boolean | ComunidadCountOutputTypeCountSolicitudesArgs
  }

  // Custom InputTypes
  /**
   * ComunidadCountOutputType without action
   */
  export type ComunidadCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ComunidadCountOutputType
     */
    select?: ComunidadCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ComunidadCountOutputType without action
   */
  export type ComunidadCountOutputTypeCountMensajesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MensajeWhereInput
  }

  /**
   * ComunidadCountOutputType without action
   */
  export type ComunidadCountOutputTypeCountZonasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ZonaWhereInput
  }

  /**
   * ComunidadCountOutputType without action
   */
  export type ComunidadCountOutputTypeCountIncidenciasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IncidenciaWhereInput
  }

  /**
   * ComunidadCountOutputType without action
   */
  export type ComunidadCountOutputTypeCountInscritosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InscripcionWhereInput
  }

  /**
   * ComunidadCountOutputType without action
   */
  export type ComunidadCountOutputTypeCountSolicitudesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SolicitudWhereInput
  }


  /**
   * Count Type UsuarioCountOutputType
   */

  export type UsuarioCountOutputType = {
    incidencias: number
    reservas: number
    inscripciones: number
    solicitudes: number
  }

  export type UsuarioCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    incidencias?: boolean | UsuarioCountOutputTypeCountIncidenciasArgs
    reservas?: boolean | UsuarioCountOutputTypeCountReservasArgs
    inscripciones?: boolean | UsuarioCountOutputTypeCountInscripcionesArgs
    solicitudes?: boolean | UsuarioCountOutputTypeCountSolicitudesArgs
  }

  // Custom InputTypes
  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the UsuarioCountOutputType
     */
    select?: UsuarioCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountIncidenciasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IncidenciaWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountReservasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReservaWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountInscripcionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InscripcionWhereInput
  }

  /**
   * UsuarioCountOutputType without action
   */
  export type UsuarioCountOutputTypeCountSolicitudesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SolicitudWhereInput
  }


  /**
   * Count Type ZonaCountOutputType
   */

  export type ZonaCountOutputType = {
    reservas: number
  }

  export type ZonaCountOutputTypeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    reservas?: boolean | ZonaCountOutputTypeCountReservasArgs
  }

  // Custom InputTypes
  /**
   * ZonaCountOutputType without action
   */
  export type ZonaCountOutputTypeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the ZonaCountOutputType
     */
    select?: ZonaCountOutputTypeSelect<ExtArgs> | null
  }

  /**
   * ZonaCountOutputType without action
   */
  export type ZonaCountOutputTypeCountReservasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReservaWhereInput
  }


  /**
   * Models
   */

  /**
   * Model Comunidad
   */

  export type AggregateComunidad = {
    _count: ComunidadCountAggregateOutputType | null
    _avg: ComunidadAvgAggregateOutputType | null
    _sum: ComunidadSumAggregateOutputType | null
    _min: ComunidadMinAggregateOutputType | null
    _max: ComunidadMaxAggregateOutputType | null
  }

  export type ComunidadAvgAggregateOutputType = {
    id: number | null
    numero: number | null
  }

  export type ComunidadSumAggregateOutputType = {
    id: number | null
    numero: number | null
  }

  export type ComunidadMinAggregateOutputType = {
    id: number | null
    nombre: string | null
    calle: string | null
    numero: number | null
    localidad: string | null
    provincia: string | null
    pais: string | null
  }

  export type ComunidadMaxAggregateOutputType = {
    id: number | null
    nombre: string | null
    calle: string | null
    numero: number | null
    localidad: string | null
    provincia: string | null
    pais: string | null
  }

  export type ComunidadCountAggregateOutputType = {
    id: number
    nombre: number
    calle: number
    numero: number
    localidad: number
    provincia: number
    pais: number
    _all: number
  }


  export type ComunidadAvgAggregateInputType = {
    id?: true
    numero?: true
  }

  export type ComunidadSumAggregateInputType = {
    id?: true
    numero?: true
  }

  export type ComunidadMinAggregateInputType = {
    id?: true
    nombre?: true
    calle?: true
    numero?: true
    localidad?: true
    provincia?: true
    pais?: true
  }

  export type ComunidadMaxAggregateInputType = {
    id?: true
    nombre?: true
    calle?: true
    numero?: true
    localidad?: true
    provincia?: true
    pais?: true
  }

  export type ComunidadCountAggregateInputType = {
    id?: true
    nombre?: true
    calle?: true
    numero?: true
    localidad?: true
    provincia?: true
    pais?: true
    _all?: true
  }

  export type ComunidadAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comunidad to aggregate.
     */
    where?: ComunidadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comunidads to fetch.
     */
    orderBy?: ComunidadOrderByWithRelationInput | ComunidadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ComunidadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comunidads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comunidads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Comunidads
    **/
    _count?: true | ComunidadCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ComunidadAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ComunidadSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ComunidadMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ComunidadMaxAggregateInputType
  }

  export type GetComunidadAggregateType<T extends ComunidadAggregateArgs> = {
        [P in keyof T & keyof AggregateComunidad]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateComunidad[P]>
      : GetScalarType<T[P], AggregateComunidad[P]>
  }




  export type ComunidadGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ComunidadWhereInput
    orderBy?: ComunidadOrderByWithAggregationInput | ComunidadOrderByWithAggregationInput[]
    by: ComunidadScalarFieldEnum[] | ComunidadScalarFieldEnum
    having?: ComunidadScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ComunidadCountAggregateInputType | true
    _avg?: ComunidadAvgAggregateInputType
    _sum?: ComunidadSumAggregateInputType
    _min?: ComunidadMinAggregateInputType
    _max?: ComunidadMaxAggregateInputType
  }

  export type ComunidadGroupByOutputType = {
    id: number
    nombre: string
    calle: string
    numero: number
    localidad: string
    provincia: string
    pais: string
    _count: ComunidadCountAggregateOutputType | null
    _avg: ComunidadAvgAggregateOutputType | null
    _sum: ComunidadSumAggregateOutputType | null
    _min: ComunidadMinAggregateOutputType | null
    _max: ComunidadMaxAggregateOutputType | null
  }

  type GetComunidadGroupByPayload<T extends ComunidadGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ComunidadGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ComunidadGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ComunidadGroupByOutputType[P]>
            : GetScalarType<T[P], ComunidadGroupByOutputType[P]>
        }
      >
    >


  export type ComunidadSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    calle?: boolean
    numero?: boolean
    localidad?: boolean
    provincia?: boolean
    pais?: boolean
    mensajes?: boolean | Comunidad$mensajesArgs<ExtArgs>
    zonas?: boolean | Comunidad$zonasArgs<ExtArgs>
    incidencias?: boolean | Comunidad$incidenciasArgs<ExtArgs>
    inscritos?: boolean | Comunidad$inscritosArgs<ExtArgs>
    solicitudes?: boolean | Comunidad$solicitudesArgs<ExtArgs>
    _count?: boolean | ComunidadCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["comunidad"]>

  export type ComunidadSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    calle?: boolean
    numero?: boolean
    localidad?: boolean
    provincia?: boolean
    pais?: boolean
  }, ExtArgs["result"]["comunidad"]>

  export type ComunidadSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    id?: boolean
    nombre?: boolean
    calle?: boolean
    numero?: boolean
    localidad?: boolean
    provincia?: boolean
    pais?: boolean
  }, ExtArgs["result"]["comunidad"]>

  export type ComunidadSelectScalar = {
    id?: boolean
    nombre?: boolean
    calle?: boolean
    numero?: boolean
    localidad?: boolean
    provincia?: boolean
    pais?: boolean
  }

  export type ComunidadOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"id" | "nombre" | "calle" | "numero" | "localidad" | "provincia" | "pais", ExtArgs["result"]["comunidad"]>
  export type ComunidadInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    mensajes?: boolean | Comunidad$mensajesArgs<ExtArgs>
    zonas?: boolean | Comunidad$zonasArgs<ExtArgs>
    incidencias?: boolean | Comunidad$incidenciasArgs<ExtArgs>
    inscritos?: boolean | Comunidad$inscritosArgs<ExtArgs>
    solicitudes?: boolean | Comunidad$solicitudesArgs<ExtArgs>
    _count?: boolean | ComunidadCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ComunidadIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type ComunidadIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $ComunidadPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Comunidad"
    objects: {
      mensajes: Prisma.$MensajePayload<ExtArgs>[]
      zonas: Prisma.$ZonaPayload<ExtArgs>[]
      incidencias: Prisma.$IncidenciaPayload<ExtArgs>[]
      inscritos: Prisma.$InscripcionPayload<ExtArgs>[]
      solicitudes: Prisma.$SolicitudPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      id: number
      nombre: string
      calle: string
      numero: number
      localidad: string
      provincia: string
      pais: string
    }, ExtArgs["result"]["comunidad"]>
    composites: {}
  }

  type ComunidadGetPayload<S extends boolean | null | undefined | ComunidadDefaultArgs> = $Result.GetResult<Prisma.$ComunidadPayload, S>

  type ComunidadCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ComunidadFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ComunidadCountAggregateInputType | true
    }

  export interface ComunidadDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Comunidad'], meta: { name: 'Comunidad' } }
    /**
     * Find zero or one Comunidad that matches the filter.
     * @param {ComunidadFindUniqueArgs} args - Arguments to find a Comunidad
     * @example
     * // Get one Comunidad
     * const comunidad = await prisma.comunidad.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ComunidadFindUniqueArgs>(args: SelectSubset<T, ComunidadFindUniqueArgs<ExtArgs>>): Prisma__ComunidadClient<$Result.GetResult<Prisma.$ComunidadPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Comunidad that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ComunidadFindUniqueOrThrowArgs} args - Arguments to find a Comunidad
     * @example
     * // Get one Comunidad
     * const comunidad = await prisma.comunidad.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ComunidadFindUniqueOrThrowArgs>(args: SelectSubset<T, ComunidadFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ComunidadClient<$Result.GetResult<Prisma.$ComunidadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comunidad that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComunidadFindFirstArgs} args - Arguments to find a Comunidad
     * @example
     * // Get one Comunidad
     * const comunidad = await prisma.comunidad.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ComunidadFindFirstArgs>(args?: SelectSubset<T, ComunidadFindFirstArgs<ExtArgs>>): Prisma__ComunidadClient<$Result.GetResult<Prisma.$ComunidadPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Comunidad that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComunidadFindFirstOrThrowArgs} args - Arguments to find a Comunidad
     * @example
     * // Get one Comunidad
     * const comunidad = await prisma.comunidad.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ComunidadFindFirstOrThrowArgs>(args?: SelectSubset<T, ComunidadFindFirstOrThrowArgs<ExtArgs>>): Prisma__ComunidadClient<$Result.GetResult<Prisma.$ComunidadPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Comunidads that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComunidadFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Comunidads
     * const comunidads = await prisma.comunidad.findMany()
     * 
     * // Get first 10 Comunidads
     * const comunidads = await prisma.comunidad.findMany({ take: 10 })
     * 
     * // Only select the `id`
     * const comunidadWithIdOnly = await prisma.comunidad.findMany({ select: { id: true } })
     * 
     */
    findMany<T extends ComunidadFindManyArgs>(args?: SelectSubset<T, ComunidadFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComunidadPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Comunidad.
     * @param {ComunidadCreateArgs} args - Arguments to create a Comunidad.
     * @example
     * // Create one Comunidad
     * const Comunidad = await prisma.comunidad.create({
     *   data: {
     *     // ... data to create a Comunidad
     *   }
     * })
     * 
     */
    create<T extends ComunidadCreateArgs>(args: SelectSubset<T, ComunidadCreateArgs<ExtArgs>>): Prisma__ComunidadClient<$Result.GetResult<Prisma.$ComunidadPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Comunidads.
     * @param {ComunidadCreateManyArgs} args - Arguments to create many Comunidads.
     * @example
     * // Create many Comunidads
     * const comunidad = await prisma.comunidad.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ComunidadCreateManyArgs>(args?: SelectSubset<T, ComunidadCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Comunidads and returns the data saved in the database.
     * @param {ComunidadCreateManyAndReturnArgs} args - Arguments to create many Comunidads.
     * @example
     * // Create many Comunidads
     * const comunidad = await prisma.comunidad.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Comunidads and only return the `id`
     * const comunidadWithIdOnly = await prisma.comunidad.createManyAndReturn({
     *   select: { id: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ComunidadCreateManyAndReturnArgs>(args?: SelectSubset<T, ComunidadCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComunidadPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Comunidad.
     * @param {ComunidadDeleteArgs} args - Arguments to delete one Comunidad.
     * @example
     * // Delete one Comunidad
     * const Comunidad = await prisma.comunidad.delete({
     *   where: {
     *     // ... filter to delete one Comunidad
     *   }
     * })
     * 
     */
    delete<T extends ComunidadDeleteArgs>(args: SelectSubset<T, ComunidadDeleteArgs<ExtArgs>>): Prisma__ComunidadClient<$Result.GetResult<Prisma.$ComunidadPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Comunidad.
     * @param {ComunidadUpdateArgs} args - Arguments to update one Comunidad.
     * @example
     * // Update one Comunidad
     * const comunidad = await prisma.comunidad.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ComunidadUpdateArgs>(args: SelectSubset<T, ComunidadUpdateArgs<ExtArgs>>): Prisma__ComunidadClient<$Result.GetResult<Prisma.$ComunidadPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Comunidads.
     * @param {ComunidadDeleteManyArgs} args - Arguments to filter Comunidads to delete.
     * @example
     * // Delete a few Comunidads
     * const { count } = await prisma.comunidad.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ComunidadDeleteManyArgs>(args?: SelectSubset<T, ComunidadDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comunidads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComunidadUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Comunidads
     * const comunidad = await prisma.comunidad.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ComunidadUpdateManyArgs>(args: SelectSubset<T, ComunidadUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Comunidads and returns the data updated in the database.
     * @param {ComunidadUpdateManyAndReturnArgs} args - Arguments to update many Comunidads.
     * @example
     * // Update many Comunidads
     * const comunidad = await prisma.comunidad.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Comunidads and only return the `id`
     * const comunidadWithIdOnly = await prisma.comunidad.updateManyAndReturn({
     *   select: { id: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ComunidadUpdateManyAndReturnArgs>(args: SelectSubset<T, ComunidadUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ComunidadPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Comunidad.
     * @param {ComunidadUpsertArgs} args - Arguments to update or create a Comunidad.
     * @example
     * // Update or create a Comunidad
     * const comunidad = await prisma.comunidad.upsert({
     *   create: {
     *     // ... data to create a Comunidad
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Comunidad we want to update
     *   }
     * })
     */
    upsert<T extends ComunidadUpsertArgs>(args: SelectSubset<T, ComunidadUpsertArgs<ExtArgs>>): Prisma__ComunidadClient<$Result.GetResult<Prisma.$ComunidadPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Comunidads.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComunidadCountArgs} args - Arguments to filter Comunidads to count.
     * @example
     * // Count the number of Comunidads
     * const count = await prisma.comunidad.count({
     *   where: {
     *     // ... the filter for the Comunidads we want to count
     *   }
     * })
    **/
    count<T extends ComunidadCountArgs>(
      args?: Subset<T, ComunidadCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ComunidadCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Comunidad.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComunidadAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ComunidadAggregateArgs>(args: Subset<T, ComunidadAggregateArgs>): Prisma.PrismaPromise<GetComunidadAggregateType<T>>

    /**
     * Group by Comunidad.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ComunidadGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ComunidadGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ComunidadGroupByArgs['orderBy'] }
        : { orderBy?: ComunidadGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ComunidadGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetComunidadGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Comunidad model
   */
  readonly fields: ComunidadFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Comunidad.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ComunidadClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    mensajes<T extends Comunidad$mensajesArgs<ExtArgs> = {}>(args?: Subset<T, Comunidad$mensajesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MensajePayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    zonas<T extends Comunidad$zonasArgs<ExtArgs> = {}>(args?: Subset<T, Comunidad$zonasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ZonaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    incidencias<T extends Comunidad$incidenciasArgs<ExtArgs> = {}>(args?: Subset<T, Comunidad$incidenciasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IncidenciaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    inscritos<T extends Comunidad$inscritosArgs<ExtArgs> = {}>(args?: Subset<T, Comunidad$inscritosArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    solicitudes<T extends Comunidad$solicitudesArgs<ExtArgs> = {}>(args?: Subset<T, Comunidad$solicitudesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitudPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Comunidad model
   */
  interface ComunidadFieldRefs {
    readonly id: FieldRef<"Comunidad", 'Int'>
    readonly nombre: FieldRef<"Comunidad", 'String'>
    readonly calle: FieldRef<"Comunidad", 'String'>
    readonly numero: FieldRef<"Comunidad", 'Int'>
    readonly localidad: FieldRef<"Comunidad", 'String'>
    readonly provincia: FieldRef<"Comunidad", 'String'>
    readonly pais: FieldRef<"Comunidad", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Comunidad findUnique
   */
  export type ComunidadFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comunidad
     */
    select?: ComunidadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comunidad
     */
    omit?: ComunidadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComunidadInclude<ExtArgs> | null
    /**
     * Filter, which Comunidad to fetch.
     */
    where: ComunidadWhereUniqueInput
  }

  /**
   * Comunidad findUniqueOrThrow
   */
  export type ComunidadFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comunidad
     */
    select?: ComunidadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comunidad
     */
    omit?: ComunidadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComunidadInclude<ExtArgs> | null
    /**
     * Filter, which Comunidad to fetch.
     */
    where: ComunidadWhereUniqueInput
  }

  /**
   * Comunidad findFirst
   */
  export type ComunidadFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comunidad
     */
    select?: ComunidadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comunidad
     */
    omit?: ComunidadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComunidadInclude<ExtArgs> | null
    /**
     * Filter, which Comunidad to fetch.
     */
    where?: ComunidadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comunidads to fetch.
     */
    orderBy?: ComunidadOrderByWithRelationInput | ComunidadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comunidads.
     */
    cursor?: ComunidadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comunidads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comunidads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comunidads.
     */
    distinct?: ComunidadScalarFieldEnum | ComunidadScalarFieldEnum[]
  }

  /**
   * Comunidad findFirstOrThrow
   */
  export type ComunidadFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comunidad
     */
    select?: ComunidadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comunidad
     */
    omit?: ComunidadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComunidadInclude<ExtArgs> | null
    /**
     * Filter, which Comunidad to fetch.
     */
    where?: ComunidadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comunidads to fetch.
     */
    orderBy?: ComunidadOrderByWithRelationInput | ComunidadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Comunidads.
     */
    cursor?: ComunidadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comunidads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comunidads.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Comunidads.
     */
    distinct?: ComunidadScalarFieldEnum | ComunidadScalarFieldEnum[]
  }

  /**
   * Comunidad findMany
   */
  export type ComunidadFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comunidad
     */
    select?: ComunidadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comunidad
     */
    omit?: ComunidadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComunidadInclude<ExtArgs> | null
    /**
     * Filter, which Comunidads to fetch.
     */
    where?: ComunidadWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Comunidads to fetch.
     */
    orderBy?: ComunidadOrderByWithRelationInput | ComunidadOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Comunidads.
     */
    cursor?: ComunidadWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Comunidads from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Comunidads.
     */
    skip?: number
    distinct?: ComunidadScalarFieldEnum | ComunidadScalarFieldEnum[]
  }

  /**
   * Comunidad create
   */
  export type ComunidadCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comunidad
     */
    select?: ComunidadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comunidad
     */
    omit?: ComunidadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComunidadInclude<ExtArgs> | null
    /**
     * The data needed to create a Comunidad.
     */
    data: XOR<ComunidadCreateInput, ComunidadUncheckedCreateInput>
  }

  /**
   * Comunidad createMany
   */
  export type ComunidadCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Comunidads.
     */
    data: ComunidadCreateManyInput | ComunidadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comunidad createManyAndReturn
   */
  export type ComunidadCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comunidad
     */
    select?: ComunidadSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comunidad
     */
    omit?: ComunidadOmit<ExtArgs> | null
    /**
     * The data used to create many Comunidads.
     */
    data: ComunidadCreateManyInput | ComunidadCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Comunidad update
   */
  export type ComunidadUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comunidad
     */
    select?: ComunidadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comunidad
     */
    omit?: ComunidadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComunidadInclude<ExtArgs> | null
    /**
     * The data needed to update a Comunidad.
     */
    data: XOR<ComunidadUpdateInput, ComunidadUncheckedUpdateInput>
    /**
     * Choose, which Comunidad to update.
     */
    where: ComunidadWhereUniqueInput
  }

  /**
   * Comunidad updateMany
   */
  export type ComunidadUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Comunidads.
     */
    data: XOR<ComunidadUpdateManyMutationInput, ComunidadUncheckedUpdateManyInput>
    /**
     * Filter which Comunidads to update
     */
    where?: ComunidadWhereInput
    /**
     * Limit how many Comunidads to update.
     */
    limit?: number
  }

  /**
   * Comunidad updateManyAndReturn
   */
  export type ComunidadUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comunidad
     */
    select?: ComunidadSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Comunidad
     */
    omit?: ComunidadOmit<ExtArgs> | null
    /**
     * The data used to update Comunidads.
     */
    data: XOR<ComunidadUpdateManyMutationInput, ComunidadUncheckedUpdateManyInput>
    /**
     * Filter which Comunidads to update
     */
    where?: ComunidadWhereInput
    /**
     * Limit how many Comunidads to update.
     */
    limit?: number
  }

  /**
   * Comunidad upsert
   */
  export type ComunidadUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comunidad
     */
    select?: ComunidadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comunidad
     */
    omit?: ComunidadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComunidadInclude<ExtArgs> | null
    /**
     * The filter to search for the Comunidad to update in case it exists.
     */
    where: ComunidadWhereUniqueInput
    /**
     * In case the Comunidad found by the `where` argument doesn't exist, create a new Comunidad with this data.
     */
    create: XOR<ComunidadCreateInput, ComunidadUncheckedCreateInput>
    /**
     * In case the Comunidad was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ComunidadUpdateInput, ComunidadUncheckedUpdateInput>
  }

  /**
   * Comunidad delete
   */
  export type ComunidadDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comunidad
     */
    select?: ComunidadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comunidad
     */
    omit?: ComunidadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComunidadInclude<ExtArgs> | null
    /**
     * Filter which Comunidad to delete.
     */
    where: ComunidadWhereUniqueInput
  }

  /**
   * Comunidad deleteMany
   */
  export type ComunidadDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Comunidads to delete
     */
    where?: ComunidadWhereInput
    /**
     * Limit how many Comunidads to delete.
     */
    limit?: number
  }

  /**
   * Comunidad.mensajes
   */
  export type Comunidad$mensajesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensaje
     */
    select?: MensajeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensaje
     */
    omit?: MensajeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensajeInclude<ExtArgs> | null
    where?: MensajeWhereInput
    orderBy?: MensajeOrderByWithRelationInput | MensajeOrderByWithRelationInput[]
    cursor?: MensajeWhereUniqueInput
    take?: number
    skip?: number
    distinct?: MensajeScalarFieldEnum | MensajeScalarFieldEnum[]
  }

  /**
   * Comunidad.zonas
   */
  export type Comunidad$zonasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zona
     */
    select?: ZonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zona
     */
    omit?: ZonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZonaInclude<ExtArgs> | null
    where?: ZonaWhereInput
    orderBy?: ZonaOrderByWithRelationInput | ZonaOrderByWithRelationInput[]
    cursor?: ZonaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ZonaScalarFieldEnum | ZonaScalarFieldEnum[]
  }

  /**
   * Comunidad.incidencias
   */
  export type Comunidad$incidenciasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incidencia
     */
    select?: IncidenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incidencia
     */
    omit?: IncidenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncidenciaInclude<ExtArgs> | null
    where?: IncidenciaWhereInput
    orderBy?: IncidenciaOrderByWithRelationInput | IncidenciaOrderByWithRelationInput[]
    cursor?: IncidenciaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IncidenciaScalarFieldEnum | IncidenciaScalarFieldEnum[]
  }

  /**
   * Comunidad.inscritos
   */
  export type Comunidad$inscritosArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    where?: InscripcionWhereInput
    orderBy?: InscripcionOrderByWithRelationInput | InscripcionOrderByWithRelationInput[]
    cursor?: InscripcionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InscripcionScalarFieldEnum | InscripcionScalarFieldEnum[]
  }

  /**
   * Comunidad.solicitudes
   */
  export type Comunidad$solicitudesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitud
     */
    select?: SolicitudSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitud
     */
    omit?: SolicitudOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudInclude<ExtArgs> | null
    where?: SolicitudWhereInput
    orderBy?: SolicitudOrderByWithRelationInput | SolicitudOrderByWithRelationInput[]
    cursor?: SolicitudWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SolicitudScalarFieldEnum | SolicitudScalarFieldEnum[]
  }

  /**
   * Comunidad without action
   */
  export type ComunidadDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Comunidad
     */
    select?: ComunidadSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Comunidad
     */
    omit?: ComunidadOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ComunidadInclude<ExtArgs> | null
  }


  /**
   * Model Contacto
   */

  export type AggregateContacto = {
    _count: ContactoCountAggregateOutputType | null
    _min: ContactoMinAggregateOutputType | null
    _max: ContactoMaxAggregateOutputType | null
  }

  export type ContactoMinAggregateOutputType = {
    nombre: string | null
    correo: string | null
    mensaje: string | null
    createdAt: Date | null
  }

  export type ContactoMaxAggregateOutputType = {
    nombre: string | null
    correo: string | null
    mensaje: string | null
    createdAt: Date | null
  }

  export type ContactoCountAggregateOutputType = {
    nombre: number
    correo: number
    mensaje: number
    createdAt: number
    _all: number
  }


  export type ContactoMinAggregateInputType = {
    nombre?: true
    correo?: true
    mensaje?: true
    createdAt?: true
  }

  export type ContactoMaxAggregateInputType = {
    nombre?: true
    correo?: true
    mensaje?: true
    createdAt?: true
  }

  export type ContactoCountAggregateInputType = {
    nombre?: true
    correo?: true
    mensaje?: true
    createdAt?: true
    _all?: true
  }

  export type ContactoAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contacto to aggregate.
     */
    where?: ContactoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contactos to fetch.
     */
    orderBy?: ContactoOrderByWithRelationInput | ContactoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ContactoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contactos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contactos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Contactos
    **/
    _count?: true | ContactoCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ContactoMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ContactoMaxAggregateInputType
  }

  export type GetContactoAggregateType<T extends ContactoAggregateArgs> = {
        [P in keyof T & keyof AggregateContacto]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateContacto[P]>
      : GetScalarType<T[P], AggregateContacto[P]>
  }




  export type ContactoGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ContactoWhereInput
    orderBy?: ContactoOrderByWithAggregationInput | ContactoOrderByWithAggregationInput[]
    by: ContactoScalarFieldEnum[] | ContactoScalarFieldEnum
    having?: ContactoScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ContactoCountAggregateInputType | true
    _min?: ContactoMinAggregateInputType
    _max?: ContactoMaxAggregateInputType
  }

  export type ContactoGroupByOutputType = {
    nombre: string
    correo: string
    mensaje: string
    createdAt: Date
    _count: ContactoCountAggregateOutputType | null
    _min: ContactoMinAggregateOutputType | null
    _max: ContactoMaxAggregateOutputType | null
  }

  type GetContactoGroupByPayload<T extends ContactoGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ContactoGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ContactoGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ContactoGroupByOutputType[P]>
            : GetScalarType<T[P], ContactoGroupByOutputType[P]>
        }
      >
    >


  export type ContactoSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    nombre?: boolean
    correo?: boolean
    mensaje?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["contacto"]>

  export type ContactoSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    nombre?: boolean
    correo?: boolean
    mensaje?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["contacto"]>

  export type ContactoSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    nombre?: boolean
    correo?: boolean
    mensaje?: boolean
    createdAt?: boolean
  }, ExtArgs["result"]["contacto"]>

  export type ContactoSelectScalar = {
    nombre?: boolean
    correo?: boolean
    mensaje?: boolean
    createdAt?: boolean
  }

  export type ContactoOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"nombre" | "correo" | "mensaje" | "createdAt", ExtArgs["result"]["contacto"]>

  export type $ContactoPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Contacto"
    objects: {}
    scalars: $Extensions.GetPayloadResult<{
      nombre: string
      correo: string
      mensaje: string
      createdAt: Date
    }, ExtArgs["result"]["contacto"]>
    composites: {}
  }

  type ContactoGetPayload<S extends boolean | null | undefined | ContactoDefaultArgs> = $Result.GetResult<Prisma.$ContactoPayload, S>

  type ContactoCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ContactoFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ContactoCountAggregateInputType | true
    }

  export interface ContactoDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Contacto'], meta: { name: 'Contacto' } }
    /**
     * Find zero or one Contacto that matches the filter.
     * @param {ContactoFindUniqueArgs} args - Arguments to find a Contacto
     * @example
     * // Get one Contacto
     * const contacto = await prisma.contacto.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ContactoFindUniqueArgs>(args: SelectSubset<T, ContactoFindUniqueArgs<ExtArgs>>): Prisma__ContactoClient<$Result.GetResult<Prisma.$ContactoPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Contacto that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ContactoFindUniqueOrThrowArgs} args - Arguments to find a Contacto
     * @example
     * // Get one Contacto
     * const contacto = await prisma.contacto.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ContactoFindUniqueOrThrowArgs>(args: SelectSubset<T, ContactoFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ContactoClient<$Result.GetResult<Prisma.$ContactoPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contacto that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactoFindFirstArgs} args - Arguments to find a Contacto
     * @example
     * // Get one Contacto
     * const contacto = await prisma.contacto.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ContactoFindFirstArgs>(args?: SelectSubset<T, ContactoFindFirstArgs<ExtArgs>>): Prisma__ContactoClient<$Result.GetResult<Prisma.$ContactoPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Contacto that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactoFindFirstOrThrowArgs} args - Arguments to find a Contacto
     * @example
     * // Get one Contacto
     * const contacto = await prisma.contacto.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ContactoFindFirstOrThrowArgs>(args?: SelectSubset<T, ContactoFindFirstOrThrowArgs<ExtArgs>>): Prisma__ContactoClient<$Result.GetResult<Prisma.$ContactoPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Contactos that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactoFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Contactos
     * const contactos = await prisma.contacto.findMany()
     * 
     * // Get first 10 Contactos
     * const contactos = await prisma.contacto.findMany({ take: 10 })
     * 
     * // Only select the `nombre`
     * const contactoWithNombreOnly = await prisma.contacto.findMany({ select: { nombre: true } })
     * 
     */
    findMany<T extends ContactoFindManyArgs>(args?: SelectSubset<T, ContactoFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactoPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Contacto.
     * @param {ContactoCreateArgs} args - Arguments to create a Contacto.
     * @example
     * // Create one Contacto
     * const Contacto = await prisma.contacto.create({
     *   data: {
     *     // ... data to create a Contacto
     *   }
     * })
     * 
     */
    create<T extends ContactoCreateArgs>(args: SelectSubset<T, ContactoCreateArgs<ExtArgs>>): Prisma__ContactoClient<$Result.GetResult<Prisma.$ContactoPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Contactos.
     * @param {ContactoCreateManyArgs} args - Arguments to create many Contactos.
     * @example
     * // Create many Contactos
     * const contacto = await prisma.contacto.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ContactoCreateManyArgs>(args?: SelectSubset<T, ContactoCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Contactos and returns the data saved in the database.
     * @param {ContactoCreateManyAndReturnArgs} args - Arguments to create many Contactos.
     * @example
     * // Create many Contactos
     * const contacto = await prisma.contacto.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Contactos and only return the `nombre`
     * const contactoWithNombreOnly = await prisma.contacto.createManyAndReturn({
     *   select: { nombre: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ContactoCreateManyAndReturnArgs>(args?: SelectSubset<T, ContactoCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactoPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Contacto.
     * @param {ContactoDeleteArgs} args - Arguments to delete one Contacto.
     * @example
     * // Delete one Contacto
     * const Contacto = await prisma.contacto.delete({
     *   where: {
     *     // ... filter to delete one Contacto
     *   }
     * })
     * 
     */
    delete<T extends ContactoDeleteArgs>(args: SelectSubset<T, ContactoDeleteArgs<ExtArgs>>): Prisma__ContactoClient<$Result.GetResult<Prisma.$ContactoPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Contacto.
     * @param {ContactoUpdateArgs} args - Arguments to update one Contacto.
     * @example
     * // Update one Contacto
     * const contacto = await prisma.contacto.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ContactoUpdateArgs>(args: SelectSubset<T, ContactoUpdateArgs<ExtArgs>>): Prisma__ContactoClient<$Result.GetResult<Prisma.$ContactoPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Contactos.
     * @param {ContactoDeleteManyArgs} args - Arguments to filter Contactos to delete.
     * @example
     * // Delete a few Contactos
     * const { count } = await prisma.contacto.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ContactoDeleteManyArgs>(args?: SelectSubset<T, ContactoDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contactos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactoUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Contactos
     * const contacto = await prisma.contacto.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ContactoUpdateManyArgs>(args: SelectSubset<T, ContactoUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Contactos and returns the data updated in the database.
     * @param {ContactoUpdateManyAndReturnArgs} args - Arguments to update many Contactos.
     * @example
     * // Update many Contactos
     * const contacto = await prisma.contacto.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Contactos and only return the `nombre`
     * const contactoWithNombreOnly = await prisma.contacto.updateManyAndReturn({
     *   select: { nombre: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ContactoUpdateManyAndReturnArgs>(args: SelectSubset<T, ContactoUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ContactoPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Contacto.
     * @param {ContactoUpsertArgs} args - Arguments to update or create a Contacto.
     * @example
     * // Update or create a Contacto
     * const contacto = await prisma.contacto.upsert({
     *   create: {
     *     // ... data to create a Contacto
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Contacto we want to update
     *   }
     * })
     */
    upsert<T extends ContactoUpsertArgs>(args: SelectSubset<T, ContactoUpsertArgs<ExtArgs>>): Prisma__ContactoClient<$Result.GetResult<Prisma.$ContactoPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Contactos.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactoCountArgs} args - Arguments to filter Contactos to count.
     * @example
     * // Count the number of Contactos
     * const count = await prisma.contacto.count({
     *   where: {
     *     // ... the filter for the Contactos we want to count
     *   }
     * })
    **/
    count<T extends ContactoCountArgs>(
      args?: Subset<T, ContactoCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ContactoCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Contacto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactoAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ContactoAggregateArgs>(args: Subset<T, ContactoAggregateArgs>): Prisma.PrismaPromise<GetContactoAggregateType<T>>

    /**
     * Group by Contacto.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ContactoGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ContactoGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ContactoGroupByArgs['orderBy'] }
        : { orderBy?: ContactoGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ContactoGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetContactoGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Contacto model
   */
  readonly fields: ContactoFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Contacto.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ContactoClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Contacto model
   */
  interface ContactoFieldRefs {
    readonly nombre: FieldRef<"Contacto", 'String'>
    readonly correo: FieldRef<"Contacto", 'String'>
    readonly mensaje: FieldRef<"Contacto", 'String'>
    readonly createdAt: FieldRef<"Contacto", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Contacto findUnique
   */
  export type ContactoFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contacto
     */
    select?: ContactoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contacto
     */
    omit?: ContactoOmit<ExtArgs> | null
    /**
     * Filter, which Contacto to fetch.
     */
    where: ContactoWhereUniqueInput
  }

  /**
   * Contacto findUniqueOrThrow
   */
  export type ContactoFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contacto
     */
    select?: ContactoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contacto
     */
    omit?: ContactoOmit<ExtArgs> | null
    /**
     * Filter, which Contacto to fetch.
     */
    where: ContactoWhereUniqueInput
  }

  /**
   * Contacto findFirst
   */
  export type ContactoFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contacto
     */
    select?: ContactoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contacto
     */
    omit?: ContactoOmit<ExtArgs> | null
    /**
     * Filter, which Contacto to fetch.
     */
    where?: ContactoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contactos to fetch.
     */
    orderBy?: ContactoOrderByWithRelationInput | ContactoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contactos.
     */
    cursor?: ContactoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contactos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contactos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contactos.
     */
    distinct?: ContactoScalarFieldEnum | ContactoScalarFieldEnum[]
  }

  /**
   * Contacto findFirstOrThrow
   */
  export type ContactoFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contacto
     */
    select?: ContactoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contacto
     */
    omit?: ContactoOmit<ExtArgs> | null
    /**
     * Filter, which Contacto to fetch.
     */
    where?: ContactoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contactos to fetch.
     */
    orderBy?: ContactoOrderByWithRelationInput | ContactoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Contactos.
     */
    cursor?: ContactoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contactos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contactos.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Contactos.
     */
    distinct?: ContactoScalarFieldEnum | ContactoScalarFieldEnum[]
  }

  /**
   * Contacto findMany
   */
  export type ContactoFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contacto
     */
    select?: ContactoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contacto
     */
    omit?: ContactoOmit<ExtArgs> | null
    /**
     * Filter, which Contactos to fetch.
     */
    where?: ContactoWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Contactos to fetch.
     */
    orderBy?: ContactoOrderByWithRelationInput | ContactoOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Contactos.
     */
    cursor?: ContactoWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Contactos from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Contactos.
     */
    skip?: number
    distinct?: ContactoScalarFieldEnum | ContactoScalarFieldEnum[]
  }

  /**
   * Contacto create
   */
  export type ContactoCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contacto
     */
    select?: ContactoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contacto
     */
    omit?: ContactoOmit<ExtArgs> | null
    /**
     * The data needed to create a Contacto.
     */
    data: XOR<ContactoCreateInput, ContactoUncheckedCreateInput>
  }

  /**
   * Contacto createMany
   */
  export type ContactoCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Contactos.
     */
    data: ContactoCreateManyInput | ContactoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contacto createManyAndReturn
   */
  export type ContactoCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contacto
     */
    select?: ContactoSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contacto
     */
    omit?: ContactoOmit<ExtArgs> | null
    /**
     * The data used to create many Contactos.
     */
    data: ContactoCreateManyInput | ContactoCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Contacto update
   */
  export type ContactoUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contacto
     */
    select?: ContactoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contacto
     */
    omit?: ContactoOmit<ExtArgs> | null
    /**
     * The data needed to update a Contacto.
     */
    data: XOR<ContactoUpdateInput, ContactoUncheckedUpdateInput>
    /**
     * Choose, which Contacto to update.
     */
    where: ContactoWhereUniqueInput
  }

  /**
   * Contacto updateMany
   */
  export type ContactoUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Contactos.
     */
    data: XOR<ContactoUpdateManyMutationInput, ContactoUncheckedUpdateManyInput>
    /**
     * Filter which Contactos to update
     */
    where?: ContactoWhereInput
    /**
     * Limit how many Contactos to update.
     */
    limit?: number
  }

  /**
   * Contacto updateManyAndReturn
   */
  export type ContactoUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contacto
     */
    select?: ContactoSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Contacto
     */
    omit?: ContactoOmit<ExtArgs> | null
    /**
     * The data used to update Contactos.
     */
    data: XOR<ContactoUpdateManyMutationInput, ContactoUncheckedUpdateManyInput>
    /**
     * Filter which Contactos to update
     */
    where?: ContactoWhereInput
    /**
     * Limit how many Contactos to update.
     */
    limit?: number
  }

  /**
   * Contacto upsert
   */
  export type ContactoUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contacto
     */
    select?: ContactoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contacto
     */
    omit?: ContactoOmit<ExtArgs> | null
    /**
     * The filter to search for the Contacto to update in case it exists.
     */
    where: ContactoWhereUniqueInput
    /**
     * In case the Contacto found by the `where` argument doesn't exist, create a new Contacto with this data.
     */
    create: XOR<ContactoCreateInput, ContactoUncheckedCreateInput>
    /**
     * In case the Contacto was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ContactoUpdateInput, ContactoUncheckedUpdateInput>
  }

  /**
   * Contacto delete
   */
  export type ContactoDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contacto
     */
    select?: ContactoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contacto
     */
    omit?: ContactoOmit<ExtArgs> | null
    /**
     * Filter which Contacto to delete.
     */
    where: ContactoWhereUniqueInput
  }

  /**
   * Contacto deleteMany
   */
  export type ContactoDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Contactos to delete
     */
    where?: ContactoWhereInput
    /**
     * Limit how many Contactos to delete.
     */
    limit?: number
  }

  /**
   * Contacto without action
   */
  export type ContactoDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Contacto
     */
    select?: ContactoSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Contacto
     */
    omit?: ContactoOmit<ExtArgs> | null
  }


  /**
   * Model Credenciales
   */

  export type AggregateCredenciales = {
    _count: CredencialesCountAggregateOutputType | null
    _min: CredencialesMinAggregateOutputType | null
    _max: CredencialesMaxAggregateOutputType | null
  }

  export type CredencialesMinAggregateOutputType = {
    correoUsuario: string | null
    password: string | null
  }

  export type CredencialesMaxAggregateOutputType = {
    correoUsuario: string | null
    password: string | null
  }

  export type CredencialesCountAggregateOutputType = {
    correoUsuario: number
    password: number
    _all: number
  }


  export type CredencialesMinAggregateInputType = {
    correoUsuario?: true
    password?: true
  }

  export type CredencialesMaxAggregateInputType = {
    correoUsuario?: true
    password?: true
  }

  export type CredencialesCountAggregateInputType = {
    correoUsuario?: true
    password?: true
    _all?: true
  }

  export type CredencialesAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Credenciales to aggregate.
     */
    where?: CredencialesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Credenciales to fetch.
     */
    orderBy?: CredencialesOrderByWithRelationInput | CredencialesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: CredencialesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Credenciales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Credenciales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Credenciales
    **/
    _count?: true | CredencialesCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: CredencialesMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: CredencialesMaxAggregateInputType
  }

  export type GetCredencialesAggregateType<T extends CredencialesAggregateArgs> = {
        [P in keyof T & keyof AggregateCredenciales]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateCredenciales[P]>
      : GetScalarType<T[P], AggregateCredenciales[P]>
  }




  export type CredencialesGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: CredencialesWhereInput
    orderBy?: CredencialesOrderByWithAggregationInput | CredencialesOrderByWithAggregationInput[]
    by: CredencialesScalarFieldEnum[] | CredencialesScalarFieldEnum
    having?: CredencialesScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: CredencialesCountAggregateInputType | true
    _min?: CredencialesMinAggregateInputType
    _max?: CredencialesMaxAggregateInputType
  }

  export type CredencialesGroupByOutputType = {
    correoUsuario: string
    password: string
    _count: CredencialesCountAggregateOutputType | null
    _min: CredencialesMinAggregateOutputType | null
    _max: CredencialesMaxAggregateOutputType | null
  }

  type GetCredencialesGroupByPayload<T extends CredencialesGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<CredencialesGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof CredencialesGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], CredencialesGroupByOutputType[P]>
            : GetScalarType<T[P], CredencialesGroupByOutputType[P]>
        }
      >
    >


  export type CredencialesSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    correoUsuario?: boolean
    password?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credenciales"]>

  export type CredencialesSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    correoUsuario?: boolean
    password?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credenciales"]>

  export type CredencialesSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    correoUsuario?: boolean
    password?: boolean
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["credenciales"]>

  export type CredencialesSelectScalar = {
    correoUsuario?: boolean
    password?: boolean
  }

  export type CredencialesOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"correoUsuario" | "password", ExtArgs["result"]["credenciales"]>
  export type CredencialesInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type CredencialesIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type CredencialesIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuario?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $CredencialesPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Credenciales"
    objects: {
      usuario: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      correoUsuario: string
      password: string
    }, ExtArgs["result"]["credenciales"]>
    composites: {}
  }

  type CredencialesGetPayload<S extends boolean | null | undefined | CredencialesDefaultArgs> = $Result.GetResult<Prisma.$CredencialesPayload, S>

  type CredencialesCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<CredencialesFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: CredencialesCountAggregateInputType | true
    }

  export interface CredencialesDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Credenciales'], meta: { name: 'Credenciales' } }
    /**
     * Find zero or one Credenciales that matches the filter.
     * @param {CredencialesFindUniqueArgs} args - Arguments to find a Credenciales
     * @example
     * // Get one Credenciales
     * const credenciales = await prisma.credenciales.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends CredencialesFindUniqueArgs>(args: SelectSubset<T, CredencialesFindUniqueArgs<ExtArgs>>): Prisma__CredencialesClient<$Result.GetResult<Prisma.$CredencialesPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Credenciales that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {CredencialesFindUniqueOrThrowArgs} args - Arguments to find a Credenciales
     * @example
     * // Get one Credenciales
     * const credenciales = await prisma.credenciales.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends CredencialesFindUniqueOrThrowArgs>(args: SelectSubset<T, CredencialesFindUniqueOrThrowArgs<ExtArgs>>): Prisma__CredencialesClient<$Result.GetResult<Prisma.$CredencialesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Credenciales that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredencialesFindFirstArgs} args - Arguments to find a Credenciales
     * @example
     * // Get one Credenciales
     * const credenciales = await prisma.credenciales.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends CredencialesFindFirstArgs>(args?: SelectSubset<T, CredencialesFindFirstArgs<ExtArgs>>): Prisma__CredencialesClient<$Result.GetResult<Prisma.$CredencialesPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Credenciales that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredencialesFindFirstOrThrowArgs} args - Arguments to find a Credenciales
     * @example
     * // Get one Credenciales
     * const credenciales = await prisma.credenciales.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends CredencialesFindFirstOrThrowArgs>(args?: SelectSubset<T, CredencialesFindFirstOrThrowArgs<ExtArgs>>): Prisma__CredencialesClient<$Result.GetResult<Prisma.$CredencialesPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Credenciales that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredencialesFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Credenciales
     * const credenciales = await prisma.credenciales.findMany()
     * 
     * // Get first 10 Credenciales
     * const credenciales = await prisma.credenciales.findMany({ take: 10 })
     * 
     * // Only select the `correoUsuario`
     * const credencialesWithCorreoUsuarioOnly = await prisma.credenciales.findMany({ select: { correoUsuario: true } })
     * 
     */
    findMany<T extends CredencialesFindManyArgs>(args?: SelectSubset<T, CredencialesFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CredencialesPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Credenciales.
     * @param {CredencialesCreateArgs} args - Arguments to create a Credenciales.
     * @example
     * // Create one Credenciales
     * const Credenciales = await prisma.credenciales.create({
     *   data: {
     *     // ... data to create a Credenciales
     *   }
     * })
     * 
     */
    create<T extends CredencialesCreateArgs>(args: SelectSubset<T, CredencialesCreateArgs<ExtArgs>>): Prisma__CredencialesClient<$Result.GetResult<Prisma.$CredencialesPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Credenciales.
     * @param {CredencialesCreateManyArgs} args - Arguments to create many Credenciales.
     * @example
     * // Create many Credenciales
     * const credenciales = await prisma.credenciales.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends CredencialesCreateManyArgs>(args?: SelectSubset<T, CredencialesCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Credenciales and returns the data saved in the database.
     * @param {CredencialesCreateManyAndReturnArgs} args - Arguments to create many Credenciales.
     * @example
     * // Create many Credenciales
     * const credenciales = await prisma.credenciales.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Credenciales and only return the `correoUsuario`
     * const credencialesWithCorreoUsuarioOnly = await prisma.credenciales.createManyAndReturn({
     *   select: { correoUsuario: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends CredencialesCreateManyAndReturnArgs>(args?: SelectSubset<T, CredencialesCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CredencialesPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Credenciales.
     * @param {CredencialesDeleteArgs} args - Arguments to delete one Credenciales.
     * @example
     * // Delete one Credenciales
     * const Credenciales = await prisma.credenciales.delete({
     *   where: {
     *     // ... filter to delete one Credenciales
     *   }
     * })
     * 
     */
    delete<T extends CredencialesDeleteArgs>(args: SelectSubset<T, CredencialesDeleteArgs<ExtArgs>>): Prisma__CredencialesClient<$Result.GetResult<Prisma.$CredencialesPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Credenciales.
     * @param {CredencialesUpdateArgs} args - Arguments to update one Credenciales.
     * @example
     * // Update one Credenciales
     * const credenciales = await prisma.credenciales.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends CredencialesUpdateArgs>(args: SelectSubset<T, CredencialesUpdateArgs<ExtArgs>>): Prisma__CredencialesClient<$Result.GetResult<Prisma.$CredencialesPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Credenciales.
     * @param {CredencialesDeleteManyArgs} args - Arguments to filter Credenciales to delete.
     * @example
     * // Delete a few Credenciales
     * const { count } = await prisma.credenciales.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends CredencialesDeleteManyArgs>(args?: SelectSubset<T, CredencialesDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Credenciales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredencialesUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Credenciales
     * const credenciales = await prisma.credenciales.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends CredencialesUpdateManyArgs>(args: SelectSubset<T, CredencialesUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Credenciales and returns the data updated in the database.
     * @param {CredencialesUpdateManyAndReturnArgs} args - Arguments to update many Credenciales.
     * @example
     * // Update many Credenciales
     * const credenciales = await prisma.credenciales.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Credenciales and only return the `correoUsuario`
     * const credencialesWithCorreoUsuarioOnly = await prisma.credenciales.updateManyAndReturn({
     *   select: { correoUsuario: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends CredencialesUpdateManyAndReturnArgs>(args: SelectSubset<T, CredencialesUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$CredencialesPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Credenciales.
     * @param {CredencialesUpsertArgs} args - Arguments to update or create a Credenciales.
     * @example
     * // Update or create a Credenciales
     * const credenciales = await prisma.credenciales.upsert({
     *   create: {
     *     // ... data to create a Credenciales
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Credenciales we want to update
     *   }
     * })
     */
    upsert<T extends CredencialesUpsertArgs>(args: SelectSubset<T, CredencialesUpsertArgs<ExtArgs>>): Prisma__CredencialesClient<$Result.GetResult<Prisma.$CredencialesPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Credenciales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredencialesCountArgs} args - Arguments to filter Credenciales to count.
     * @example
     * // Count the number of Credenciales
     * const count = await prisma.credenciales.count({
     *   where: {
     *     // ... the filter for the Credenciales we want to count
     *   }
     * })
    **/
    count<T extends CredencialesCountArgs>(
      args?: Subset<T, CredencialesCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], CredencialesCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Credenciales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredencialesAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends CredencialesAggregateArgs>(args: Subset<T, CredencialesAggregateArgs>): Prisma.PrismaPromise<GetCredencialesAggregateType<T>>

    /**
     * Group by Credenciales.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {CredencialesGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends CredencialesGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: CredencialesGroupByArgs['orderBy'] }
        : { orderBy?: CredencialesGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, CredencialesGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetCredencialesGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Credenciales model
   */
  readonly fields: CredencialesFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Credenciales.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__CredencialesClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuario<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Credenciales model
   */
  interface CredencialesFieldRefs {
    readonly correoUsuario: FieldRef<"Credenciales", 'String'>
    readonly password: FieldRef<"Credenciales", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Credenciales findUnique
   */
  export type CredencialesFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credenciales
     */
    select?: CredencialesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credenciales
     */
    omit?: CredencialesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredencialesInclude<ExtArgs> | null
    /**
     * Filter, which Credenciales to fetch.
     */
    where: CredencialesWhereUniqueInput
  }

  /**
   * Credenciales findUniqueOrThrow
   */
  export type CredencialesFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credenciales
     */
    select?: CredencialesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credenciales
     */
    omit?: CredencialesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredencialesInclude<ExtArgs> | null
    /**
     * Filter, which Credenciales to fetch.
     */
    where: CredencialesWhereUniqueInput
  }

  /**
   * Credenciales findFirst
   */
  export type CredencialesFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credenciales
     */
    select?: CredencialesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credenciales
     */
    omit?: CredencialesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredencialesInclude<ExtArgs> | null
    /**
     * Filter, which Credenciales to fetch.
     */
    where?: CredencialesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Credenciales to fetch.
     */
    orderBy?: CredencialesOrderByWithRelationInput | CredencialesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Credenciales.
     */
    cursor?: CredencialesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Credenciales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Credenciales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Credenciales.
     */
    distinct?: CredencialesScalarFieldEnum | CredencialesScalarFieldEnum[]
  }

  /**
   * Credenciales findFirstOrThrow
   */
  export type CredencialesFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credenciales
     */
    select?: CredencialesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credenciales
     */
    omit?: CredencialesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredencialesInclude<ExtArgs> | null
    /**
     * Filter, which Credenciales to fetch.
     */
    where?: CredencialesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Credenciales to fetch.
     */
    orderBy?: CredencialesOrderByWithRelationInput | CredencialesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Credenciales.
     */
    cursor?: CredencialesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Credenciales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Credenciales.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Credenciales.
     */
    distinct?: CredencialesScalarFieldEnum | CredencialesScalarFieldEnum[]
  }

  /**
   * Credenciales findMany
   */
  export type CredencialesFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credenciales
     */
    select?: CredencialesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credenciales
     */
    omit?: CredencialesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredencialesInclude<ExtArgs> | null
    /**
     * Filter, which Credenciales to fetch.
     */
    where?: CredencialesWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Credenciales to fetch.
     */
    orderBy?: CredencialesOrderByWithRelationInput | CredencialesOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Credenciales.
     */
    cursor?: CredencialesWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Credenciales from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Credenciales.
     */
    skip?: number
    distinct?: CredencialesScalarFieldEnum | CredencialesScalarFieldEnum[]
  }

  /**
   * Credenciales create
   */
  export type CredencialesCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credenciales
     */
    select?: CredencialesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credenciales
     */
    omit?: CredencialesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredencialesInclude<ExtArgs> | null
    /**
     * The data needed to create a Credenciales.
     */
    data: XOR<CredencialesCreateInput, CredencialesUncheckedCreateInput>
  }

  /**
   * Credenciales createMany
   */
  export type CredencialesCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Credenciales.
     */
    data: CredencialesCreateManyInput | CredencialesCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Credenciales createManyAndReturn
   */
  export type CredencialesCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credenciales
     */
    select?: CredencialesSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Credenciales
     */
    omit?: CredencialesOmit<ExtArgs> | null
    /**
     * The data used to create many Credenciales.
     */
    data: CredencialesCreateManyInput | CredencialesCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredencialesIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Credenciales update
   */
  export type CredencialesUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credenciales
     */
    select?: CredencialesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credenciales
     */
    omit?: CredencialesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredencialesInclude<ExtArgs> | null
    /**
     * The data needed to update a Credenciales.
     */
    data: XOR<CredencialesUpdateInput, CredencialesUncheckedUpdateInput>
    /**
     * Choose, which Credenciales to update.
     */
    where: CredencialesWhereUniqueInput
  }

  /**
   * Credenciales updateMany
   */
  export type CredencialesUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Credenciales.
     */
    data: XOR<CredencialesUpdateManyMutationInput, CredencialesUncheckedUpdateManyInput>
    /**
     * Filter which Credenciales to update
     */
    where?: CredencialesWhereInput
    /**
     * Limit how many Credenciales to update.
     */
    limit?: number
  }

  /**
   * Credenciales updateManyAndReturn
   */
  export type CredencialesUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credenciales
     */
    select?: CredencialesSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Credenciales
     */
    omit?: CredencialesOmit<ExtArgs> | null
    /**
     * The data used to update Credenciales.
     */
    data: XOR<CredencialesUpdateManyMutationInput, CredencialesUncheckedUpdateManyInput>
    /**
     * Filter which Credenciales to update
     */
    where?: CredencialesWhereInput
    /**
     * Limit how many Credenciales to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredencialesIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Credenciales upsert
   */
  export type CredencialesUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credenciales
     */
    select?: CredencialesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credenciales
     */
    omit?: CredencialesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredencialesInclude<ExtArgs> | null
    /**
     * The filter to search for the Credenciales to update in case it exists.
     */
    where: CredencialesWhereUniqueInput
    /**
     * In case the Credenciales found by the `where` argument doesn't exist, create a new Credenciales with this data.
     */
    create: XOR<CredencialesCreateInput, CredencialesUncheckedCreateInput>
    /**
     * In case the Credenciales was found with the provided `where` argument, update it with this data.
     */
    update: XOR<CredencialesUpdateInput, CredencialesUncheckedUpdateInput>
  }

  /**
   * Credenciales delete
   */
  export type CredencialesDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credenciales
     */
    select?: CredencialesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credenciales
     */
    omit?: CredencialesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredencialesInclude<ExtArgs> | null
    /**
     * Filter which Credenciales to delete.
     */
    where: CredencialesWhereUniqueInput
  }

  /**
   * Credenciales deleteMany
   */
  export type CredencialesDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Credenciales to delete
     */
    where?: CredencialesWhereInput
    /**
     * Limit how many Credenciales to delete.
     */
    limit?: number
  }

  /**
   * Credenciales without action
   */
  export type CredencialesDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credenciales
     */
    select?: CredencialesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credenciales
     */
    omit?: CredencialesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredencialesInclude<ExtArgs> | null
  }


  /**
   * Model Incidencia
   */

  export type AggregateIncidencia = {
    _count: IncidenciaCountAggregateOutputType | null
    _avg: IncidenciaAvgAggregateOutputType | null
    _sum: IncidenciaSumAggregateOutputType | null
    _min: IncidenciaMinAggregateOutputType | null
    _max: IncidenciaMaxAggregateOutputType | null
  }

  export type IncidenciaAvgAggregateOutputType = {
    comunidad: number | null
  }

  export type IncidenciaSumAggregateOutputType = {
    comunidad: number | null
  }

  export type IncidenciaMinAggregateOutputType = {
    comunidad: number | null
    usuario: string | null
    fecha: Date | null
    descripcion: string | null
    estado: $Enums.Estado_Incidencia | null
  }

  export type IncidenciaMaxAggregateOutputType = {
    comunidad: number | null
    usuario: string | null
    fecha: Date | null
    descripcion: string | null
    estado: $Enums.Estado_Incidencia | null
  }

  export type IncidenciaCountAggregateOutputType = {
    comunidad: number
    usuario: number
    fecha: number
    descripcion: number
    estado: number
    _all: number
  }


  export type IncidenciaAvgAggregateInputType = {
    comunidad?: true
  }

  export type IncidenciaSumAggregateInputType = {
    comunidad?: true
  }

  export type IncidenciaMinAggregateInputType = {
    comunidad?: true
    usuario?: true
    fecha?: true
    descripcion?: true
    estado?: true
  }

  export type IncidenciaMaxAggregateInputType = {
    comunidad?: true
    usuario?: true
    fecha?: true
    descripcion?: true
    estado?: true
  }

  export type IncidenciaCountAggregateInputType = {
    comunidad?: true
    usuario?: true
    fecha?: true
    descripcion?: true
    estado?: true
    _all?: true
  }

  export type IncidenciaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Incidencia to aggregate.
     */
    where?: IncidenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Incidencias to fetch.
     */
    orderBy?: IncidenciaOrderByWithRelationInput | IncidenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: IncidenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Incidencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Incidencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Incidencias
    **/
    _count?: true | IncidenciaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: IncidenciaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: IncidenciaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: IncidenciaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: IncidenciaMaxAggregateInputType
  }

  export type GetIncidenciaAggregateType<T extends IncidenciaAggregateArgs> = {
        [P in keyof T & keyof AggregateIncidencia]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateIncidencia[P]>
      : GetScalarType<T[P], AggregateIncidencia[P]>
  }




  export type IncidenciaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: IncidenciaWhereInput
    orderBy?: IncidenciaOrderByWithAggregationInput | IncidenciaOrderByWithAggregationInput[]
    by: IncidenciaScalarFieldEnum[] | IncidenciaScalarFieldEnum
    having?: IncidenciaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: IncidenciaCountAggregateInputType | true
    _avg?: IncidenciaAvgAggregateInputType
    _sum?: IncidenciaSumAggregateInputType
    _min?: IncidenciaMinAggregateInputType
    _max?: IncidenciaMaxAggregateInputType
  }

  export type IncidenciaGroupByOutputType = {
    comunidad: number
    usuario: string
    fecha: Date
    descripcion: string
    estado: $Enums.Estado_Incidencia
    _count: IncidenciaCountAggregateOutputType | null
    _avg: IncidenciaAvgAggregateOutputType | null
    _sum: IncidenciaSumAggregateOutputType | null
    _min: IncidenciaMinAggregateOutputType | null
    _max: IncidenciaMaxAggregateOutputType | null
  }

  type GetIncidenciaGroupByPayload<T extends IncidenciaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<IncidenciaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof IncidenciaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], IncidenciaGroupByOutputType[P]>
            : GetScalarType<T[P], IncidenciaGroupByOutputType[P]>
        }
      >
    >


  export type IncidenciaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    comunidad?: boolean
    usuario?: boolean
    fecha?: boolean
    descripcion?: boolean
    estado?: boolean
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["incidencia"]>

  export type IncidenciaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    comunidad?: boolean
    usuario?: boolean
    fecha?: boolean
    descripcion?: boolean
    estado?: boolean
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["incidencia"]>

  export type IncidenciaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    comunidad?: boolean
    usuario?: boolean
    fecha?: boolean
    descripcion?: boolean
    estado?: boolean
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["incidencia"]>

  export type IncidenciaSelectScalar = {
    comunidad?: boolean
    usuario?: boolean
    fecha?: boolean
    descripcion?: boolean
    estado?: boolean
  }

  export type IncidenciaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"comunidad" | "usuario" | "fecha" | "descripcion" | "estado", ExtArgs["result"]["incidencia"]>
  export type IncidenciaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type IncidenciaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
  }
  export type IncidenciaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
  }

  export type $IncidenciaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Incidencia"
    objects: {
      comunidadID: Prisma.$ComunidadPayload<ExtArgs>
      usuarioID: Prisma.$UsuarioPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      comunidad: number
      usuario: string
      fecha: Date
      descripcion: string
      estado: $Enums.Estado_Incidencia
    }, ExtArgs["result"]["incidencia"]>
    composites: {}
  }

  type IncidenciaGetPayload<S extends boolean | null | undefined | IncidenciaDefaultArgs> = $Result.GetResult<Prisma.$IncidenciaPayload, S>

  type IncidenciaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<IncidenciaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: IncidenciaCountAggregateInputType | true
    }

  export interface IncidenciaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Incidencia'], meta: { name: 'Incidencia' } }
    /**
     * Find zero or one Incidencia that matches the filter.
     * @param {IncidenciaFindUniqueArgs} args - Arguments to find a Incidencia
     * @example
     * // Get one Incidencia
     * const incidencia = await prisma.incidencia.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends IncidenciaFindUniqueArgs>(args: SelectSubset<T, IncidenciaFindUniqueArgs<ExtArgs>>): Prisma__IncidenciaClient<$Result.GetResult<Prisma.$IncidenciaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Incidencia that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {IncidenciaFindUniqueOrThrowArgs} args - Arguments to find a Incidencia
     * @example
     * // Get one Incidencia
     * const incidencia = await prisma.incidencia.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends IncidenciaFindUniqueOrThrowArgs>(args: SelectSubset<T, IncidenciaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__IncidenciaClient<$Result.GetResult<Prisma.$IncidenciaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Incidencia that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncidenciaFindFirstArgs} args - Arguments to find a Incidencia
     * @example
     * // Get one Incidencia
     * const incidencia = await prisma.incidencia.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends IncidenciaFindFirstArgs>(args?: SelectSubset<T, IncidenciaFindFirstArgs<ExtArgs>>): Prisma__IncidenciaClient<$Result.GetResult<Prisma.$IncidenciaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Incidencia that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncidenciaFindFirstOrThrowArgs} args - Arguments to find a Incidencia
     * @example
     * // Get one Incidencia
     * const incidencia = await prisma.incidencia.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends IncidenciaFindFirstOrThrowArgs>(args?: SelectSubset<T, IncidenciaFindFirstOrThrowArgs<ExtArgs>>): Prisma__IncidenciaClient<$Result.GetResult<Prisma.$IncidenciaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Incidencias that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncidenciaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Incidencias
     * const incidencias = await prisma.incidencia.findMany()
     * 
     * // Get first 10 Incidencias
     * const incidencias = await prisma.incidencia.findMany({ take: 10 })
     * 
     * // Only select the `comunidad`
     * const incidenciaWithComunidadOnly = await prisma.incidencia.findMany({ select: { comunidad: true } })
     * 
     */
    findMany<T extends IncidenciaFindManyArgs>(args?: SelectSubset<T, IncidenciaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IncidenciaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Incidencia.
     * @param {IncidenciaCreateArgs} args - Arguments to create a Incidencia.
     * @example
     * // Create one Incidencia
     * const Incidencia = await prisma.incidencia.create({
     *   data: {
     *     // ... data to create a Incidencia
     *   }
     * })
     * 
     */
    create<T extends IncidenciaCreateArgs>(args: SelectSubset<T, IncidenciaCreateArgs<ExtArgs>>): Prisma__IncidenciaClient<$Result.GetResult<Prisma.$IncidenciaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Incidencias.
     * @param {IncidenciaCreateManyArgs} args - Arguments to create many Incidencias.
     * @example
     * // Create many Incidencias
     * const incidencia = await prisma.incidencia.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends IncidenciaCreateManyArgs>(args?: SelectSubset<T, IncidenciaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Incidencias and returns the data saved in the database.
     * @param {IncidenciaCreateManyAndReturnArgs} args - Arguments to create many Incidencias.
     * @example
     * // Create many Incidencias
     * const incidencia = await prisma.incidencia.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Incidencias and only return the `comunidad`
     * const incidenciaWithComunidadOnly = await prisma.incidencia.createManyAndReturn({
     *   select: { comunidad: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends IncidenciaCreateManyAndReturnArgs>(args?: SelectSubset<T, IncidenciaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IncidenciaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Incidencia.
     * @param {IncidenciaDeleteArgs} args - Arguments to delete one Incidencia.
     * @example
     * // Delete one Incidencia
     * const Incidencia = await prisma.incidencia.delete({
     *   where: {
     *     // ... filter to delete one Incidencia
     *   }
     * })
     * 
     */
    delete<T extends IncidenciaDeleteArgs>(args: SelectSubset<T, IncidenciaDeleteArgs<ExtArgs>>): Prisma__IncidenciaClient<$Result.GetResult<Prisma.$IncidenciaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Incidencia.
     * @param {IncidenciaUpdateArgs} args - Arguments to update one Incidencia.
     * @example
     * // Update one Incidencia
     * const incidencia = await prisma.incidencia.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends IncidenciaUpdateArgs>(args: SelectSubset<T, IncidenciaUpdateArgs<ExtArgs>>): Prisma__IncidenciaClient<$Result.GetResult<Prisma.$IncidenciaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Incidencias.
     * @param {IncidenciaDeleteManyArgs} args - Arguments to filter Incidencias to delete.
     * @example
     * // Delete a few Incidencias
     * const { count } = await prisma.incidencia.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends IncidenciaDeleteManyArgs>(args?: SelectSubset<T, IncidenciaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Incidencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncidenciaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Incidencias
     * const incidencia = await prisma.incidencia.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends IncidenciaUpdateManyArgs>(args: SelectSubset<T, IncidenciaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Incidencias and returns the data updated in the database.
     * @param {IncidenciaUpdateManyAndReturnArgs} args - Arguments to update many Incidencias.
     * @example
     * // Update many Incidencias
     * const incidencia = await prisma.incidencia.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Incidencias and only return the `comunidad`
     * const incidenciaWithComunidadOnly = await prisma.incidencia.updateManyAndReturn({
     *   select: { comunidad: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends IncidenciaUpdateManyAndReturnArgs>(args: SelectSubset<T, IncidenciaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IncidenciaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Incidencia.
     * @param {IncidenciaUpsertArgs} args - Arguments to update or create a Incidencia.
     * @example
     * // Update or create a Incidencia
     * const incidencia = await prisma.incidencia.upsert({
     *   create: {
     *     // ... data to create a Incidencia
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Incidencia we want to update
     *   }
     * })
     */
    upsert<T extends IncidenciaUpsertArgs>(args: SelectSubset<T, IncidenciaUpsertArgs<ExtArgs>>): Prisma__IncidenciaClient<$Result.GetResult<Prisma.$IncidenciaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Incidencias.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncidenciaCountArgs} args - Arguments to filter Incidencias to count.
     * @example
     * // Count the number of Incidencias
     * const count = await prisma.incidencia.count({
     *   where: {
     *     // ... the filter for the Incidencias we want to count
     *   }
     * })
    **/
    count<T extends IncidenciaCountArgs>(
      args?: Subset<T, IncidenciaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], IncidenciaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Incidencia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncidenciaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends IncidenciaAggregateArgs>(args: Subset<T, IncidenciaAggregateArgs>): Prisma.PrismaPromise<GetIncidenciaAggregateType<T>>

    /**
     * Group by Incidencia.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {IncidenciaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends IncidenciaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: IncidenciaGroupByArgs['orderBy'] }
        : { orderBy?: IncidenciaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, IncidenciaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetIncidenciaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Incidencia model
   */
  readonly fields: IncidenciaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Incidencia.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__IncidenciaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comunidadID<T extends ComunidadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ComunidadDefaultArgs<ExtArgs>>): Prisma__ComunidadClient<$Result.GetResult<Prisma.$ComunidadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    usuarioID<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Incidencia model
   */
  interface IncidenciaFieldRefs {
    readonly comunidad: FieldRef<"Incidencia", 'Int'>
    readonly usuario: FieldRef<"Incidencia", 'String'>
    readonly fecha: FieldRef<"Incidencia", 'DateTime'>
    readonly descripcion: FieldRef<"Incidencia", 'String'>
    readonly estado: FieldRef<"Incidencia", 'Estado_Incidencia'>
  }
    

  // Custom InputTypes
  /**
   * Incidencia findUnique
   */
  export type IncidenciaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incidencia
     */
    select?: IncidenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incidencia
     */
    omit?: IncidenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncidenciaInclude<ExtArgs> | null
    /**
     * Filter, which Incidencia to fetch.
     */
    where: IncidenciaWhereUniqueInput
  }

  /**
   * Incidencia findUniqueOrThrow
   */
  export type IncidenciaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incidencia
     */
    select?: IncidenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incidencia
     */
    omit?: IncidenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncidenciaInclude<ExtArgs> | null
    /**
     * Filter, which Incidencia to fetch.
     */
    where: IncidenciaWhereUniqueInput
  }

  /**
   * Incidencia findFirst
   */
  export type IncidenciaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incidencia
     */
    select?: IncidenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incidencia
     */
    omit?: IncidenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncidenciaInclude<ExtArgs> | null
    /**
     * Filter, which Incidencia to fetch.
     */
    where?: IncidenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Incidencias to fetch.
     */
    orderBy?: IncidenciaOrderByWithRelationInput | IncidenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Incidencias.
     */
    cursor?: IncidenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Incidencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Incidencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Incidencias.
     */
    distinct?: IncidenciaScalarFieldEnum | IncidenciaScalarFieldEnum[]
  }

  /**
   * Incidencia findFirstOrThrow
   */
  export type IncidenciaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incidencia
     */
    select?: IncidenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incidencia
     */
    omit?: IncidenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncidenciaInclude<ExtArgs> | null
    /**
     * Filter, which Incidencia to fetch.
     */
    where?: IncidenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Incidencias to fetch.
     */
    orderBy?: IncidenciaOrderByWithRelationInput | IncidenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Incidencias.
     */
    cursor?: IncidenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Incidencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Incidencias.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Incidencias.
     */
    distinct?: IncidenciaScalarFieldEnum | IncidenciaScalarFieldEnum[]
  }

  /**
   * Incidencia findMany
   */
  export type IncidenciaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incidencia
     */
    select?: IncidenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incidencia
     */
    omit?: IncidenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncidenciaInclude<ExtArgs> | null
    /**
     * Filter, which Incidencias to fetch.
     */
    where?: IncidenciaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Incidencias to fetch.
     */
    orderBy?: IncidenciaOrderByWithRelationInput | IncidenciaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Incidencias.
     */
    cursor?: IncidenciaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Incidencias from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Incidencias.
     */
    skip?: number
    distinct?: IncidenciaScalarFieldEnum | IncidenciaScalarFieldEnum[]
  }

  /**
   * Incidencia create
   */
  export type IncidenciaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incidencia
     */
    select?: IncidenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incidencia
     */
    omit?: IncidenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncidenciaInclude<ExtArgs> | null
    /**
     * The data needed to create a Incidencia.
     */
    data: XOR<IncidenciaCreateInput, IncidenciaUncheckedCreateInput>
  }

  /**
   * Incidencia createMany
   */
  export type IncidenciaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Incidencias.
     */
    data: IncidenciaCreateManyInput | IncidenciaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Incidencia createManyAndReturn
   */
  export type IncidenciaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incidencia
     */
    select?: IncidenciaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Incidencia
     */
    omit?: IncidenciaOmit<ExtArgs> | null
    /**
     * The data used to create many Incidencias.
     */
    data: IncidenciaCreateManyInput | IncidenciaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncidenciaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Incidencia update
   */
  export type IncidenciaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incidencia
     */
    select?: IncidenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incidencia
     */
    omit?: IncidenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncidenciaInclude<ExtArgs> | null
    /**
     * The data needed to update a Incidencia.
     */
    data: XOR<IncidenciaUpdateInput, IncidenciaUncheckedUpdateInput>
    /**
     * Choose, which Incidencia to update.
     */
    where: IncidenciaWhereUniqueInput
  }

  /**
   * Incidencia updateMany
   */
  export type IncidenciaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Incidencias.
     */
    data: XOR<IncidenciaUpdateManyMutationInput, IncidenciaUncheckedUpdateManyInput>
    /**
     * Filter which Incidencias to update
     */
    where?: IncidenciaWhereInput
    /**
     * Limit how many Incidencias to update.
     */
    limit?: number
  }

  /**
   * Incidencia updateManyAndReturn
   */
  export type IncidenciaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incidencia
     */
    select?: IncidenciaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Incidencia
     */
    omit?: IncidenciaOmit<ExtArgs> | null
    /**
     * The data used to update Incidencias.
     */
    data: XOR<IncidenciaUpdateManyMutationInput, IncidenciaUncheckedUpdateManyInput>
    /**
     * Filter which Incidencias to update
     */
    where?: IncidenciaWhereInput
    /**
     * Limit how many Incidencias to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncidenciaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Incidencia upsert
   */
  export type IncidenciaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incidencia
     */
    select?: IncidenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incidencia
     */
    omit?: IncidenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncidenciaInclude<ExtArgs> | null
    /**
     * The filter to search for the Incidencia to update in case it exists.
     */
    where: IncidenciaWhereUniqueInput
    /**
     * In case the Incidencia found by the `where` argument doesn't exist, create a new Incidencia with this data.
     */
    create: XOR<IncidenciaCreateInput, IncidenciaUncheckedCreateInput>
    /**
     * In case the Incidencia was found with the provided `where` argument, update it with this data.
     */
    update: XOR<IncidenciaUpdateInput, IncidenciaUncheckedUpdateInput>
  }

  /**
   * Incidencia delete
   */
  export type IncidenciaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incidencia
     */
    select?: IncidenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incidencia
     */
    omit?: IncidenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncidenciaInclude<ExtArgs> | null
    /**
     * Filter which Incidencia to delete.
     */
    where: IncidenciaWhereUniqueInput
  }

  /**
   * Incidencia deleteMany
   */
  export type IncidenciaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Incidencias to delete
     */
    where?: IncidenciaWhereInput
    /**
     * Limit how many Incidencias to delete.
     */
    limit?: number
  }

  /**
   * Incidencia without action
   */
  export type IncidenciaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incidencia
     */
    select?: IncidenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incidencia
     */
    omit?: IncidenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncidenciaInclude<ExtArgs> | null
  }


  /**
   * Model Inscripcion
   */

  export type AggregateInscripcion = {
    _count: InscripcionCountAggregateOutputType | null
    _avg: InscripcionAvgAggregateOutputType | null
    _sum: InscripcionSumAggregateOutputType | null
    _min: InscripcionMinAggregateOutputType | null
    _max: InscripcionMaxAggregateOutputType | null
  }

  export type InscripcionAvgAggregateOutputType = {
    comunidad: number | null
  }

  export type InscripcionSumAggregateOutputType = {
    comunidad: number | null
  }

  export type InscripcionMinAggregateOutputType = {
    usuario: string | null
    comunidad: number | null
  }

  export type InscripcionMaxAggregateOutputType = {
    usuario: string | null
    comunidad: number | null
  }

  export type InscripcionCountAggregateOutputType = {
    usuario: number
    comunidad: number
    _all: number
  }


  export type InscripcionAvgAggregateInputType = {
    comunidad?: true
  }

  export type InscripcionSumAggregateInputType = {
    comunidad?: true
  }

  export type InscripcionMinAggregateInputType = {
    usuario?: true
    comunidad?: true
  }

  export type InscripcionMaxAggregateInputType = {
    usuario?: true
    comunidad?: true
  }

  export type InscripcionCountAggregateInputType = {
    usuario?: true
    comunidad?: true
    _all?: true
  }

  export type InscripcionAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inscripcion to aggregate.
     */
    where?: InscripcionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inscripcions to fetch.
     */
    orderBy?: InscripcionOrderByWithRelationInput | InscripcionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: InscripcionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inscripcions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inscripcions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Inscripcions
    **/
    _count?: true | InscripcionCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: InscripcionAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: InscripcionSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: InscripcionMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: InscripcionMaxAggregateInputType
  }

  export type GetInscripcionAggregateType<T extends InscripcionAggregateArgs> = {
        [P in keyof T & keyof AggregateInscripcion]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateInscripcion[P]>
      : GetScalarType<T[P], AggregateInscripcion[P]>
  }




  export type InscripcionGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: InscripcionWhereInput
    orderBy?: InscripcionOrderByWithAggregationInput | InscripcionOrderByWithAggregationInput[]
    by: InscripcionScalarFieldEnum[] | InscripcionScalarFieldEnum
    having?: InscripcionScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: InscripcionCountAggregateInputType | true
    _avg?: InscripcionAvgAggregateInputType
    _sum?: InscripcionSumAggregateInputType
    _min?: InscripcionMinAggregateInputType
    _max?: InscripcionMaxAggregateInputType
  }

  export type InscripcionGroupByOutputType = {
    usuario: string
    comunidad: number
    _count: InscripcionCountAggregateOutputType | null
    _avg: InscripcionAvgAggregateOutputType | null
    _sum: InscripcionSumAggregateOutputType | null
    _min: InscripcionMinAggregateOutputType | null
    _max: InscripcionMaxAggregateOutputType | null
  }

  type GetInscripcionGroupByPayload<T extends InscripcionGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<InscripcionGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof InscripcionGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], InscripcionGroupByOutputType[P]>
            : GetScalarType<T[P], InscripcionGroupByOutputType[P]>
        }
      >
    >


  export type InscripcionSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    usuario?: boolean
    comunidad?: boolean
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inscripcion"]>

  export type InscripcionSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    usuario?: boolean
    comunidad?: boolean
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inscripcion"]>

  export type InscripcionSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    usuario?: boolean
    comunidad?: boolean
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["inscripcion"]>

  export type InscripcionSelectScalar = {
    usuario?: boolean
    comunidad?: boolean
  }

  export type InscripcionOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"usuario" | "comunidad", ExtArgs["result"]["inscripcion"]>
  export type InscripcionInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }
  export type InscripcionIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }
  export type InscripcionIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }

  export type $InscripcionPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Inscripcion"
    objects: {
      usuarioID: Prisma.$UsuarioPayload<ExtArgs>
      comunidadID: Prisma.$ComunidadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      usuario: string
      comunidad: number
    }, ExtArgs["result"]["inscripcion"]>
    composites: {}
  }

  type InscripcionGetPayload<S extends boolean | null | undefined | InscripcionDefaultArgs> = $Result.GetResult<Prisma.$InscripcionPayload, S>

  type InscripcionCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<InscripcionFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: InscripcionCountAggregateInputType | true
    }

  export interface InscripcionDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Inscripcion'], meta: { name: 'Inscripcion' } }
    /**
     * Find zero or one Inscripcion that matches the filter.
     * @param {InscripcionFindUniqueArgs} args - Arguments to find a Inscripcion
     * @example
     * // Get one Inscripcion
     * const inscripcion = await prisma.inscripcion.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends InscripcionFindUniqueArgs>(args: SelectSubset<T, InscripcionFindUniqueArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Inscripcion that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {InscripcionFindUniqueOrThrowArgs} args - Arguments to find a Inscripcion
     * @example
     * // Get one Inscripcion
     * const inscripcion = await prisma.inscripcion.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends InscripcionFindUniqueOrThrowArgs>(args: SelectSubset<T, InscripcionFindUniqueOrThrowArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inscripcion that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionFindFirstArgs} args - Arguments to find a Inscripcion
     * @example
     * // Get one Inscripcion
     * const inscripcion = await prisma.inscripcion.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends InscripcionFindFirstArgs>(args?: SelectSubset<T, InscripcionFindFirstArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Inscripcion that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionFindFirstOrThrowArgs} args - Arguments to find a Inscripcion
     * @example
     * // Get one Inscripcion
     * const inscripcion = await prisma.inscripcion.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends InscripcionFindFirstOrThrowArgs>(args?: SelectSubset<T, InscripcionFindFirstOrThrowArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Inscripcions that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Inscripcions
     * const inscripcions = await prisma.inscripcion.findMany()
     * 
     * // Get first 10 Inscripcions
     * const inscripcions = await prisma.inscripcion.findMany({ take: 10 })
     * 
     * // Only select the `usuario`
     * const inscripcionWithUsuarioOnly = await prisma.inscripcion.findMany({ select: { usuario: true } })
     * 
     */
    findMany<T extends InscripcionFindManyArgs>(args?: SelectSubset<T, InscripcionFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Inscripcion.
     * @param {InscripcionCreateArgs} args - Arguments to create a Inscripcion.
     * @example
     * // Create one Inscripcion
     * const Inscripcion = await prisma.inscripcion.create({
     *   data: {
     *     // ... data to create a Inscripcion
     *   }
     * })
     * 
     */
    create<T extends InscripcionCreateArgs>(args: SelectSubset<T, InscripcionCreateArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Inscripcions.
     * @param {InscripcionCreateManyArgs} args - Arguments to create many Inscripcions.
     * @example
     * // Create many Inscripcions
     * const inscripcion = await prisma.inscripcion.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends InscripcionCreateManyArgs>(args?: SelectSubset<T, InscripcionCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Inscripcions and returns the data saved in the database.
     * @param {InscripcionCreateManyAndReturnArgs} args - Arguments to create many Inscripcions.
     * @example
     * // Create many Inscripcions
     * const inscripcion = await prisma.inscripcion.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Inscripcions and only return the `usuario`
     * const inscripcionWithUsuarioOnly = await prisma.inscripcion.createManyAndReturn({
     *   select: { usuario: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends InscripcionCreateManyAndReturnArgs>(args?: SelectSubset<T, InscripcionCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Inscripcion.
     * @param {InscripcionDeleteArgs} args - Arguments to delete one Inscripcion.
     * @example
     * // Delete one Inscripcion
     * const Inscripcion = await prisma.inscripcion.delete({
     *   where: {
     *     // ... filter to delete one Inscripcion
     *   }
     * })
     * 
     */
    delete<T extends InscripcionDeleteArgs>(args: SelectSubset<T, InscripcionDeleteArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Inscripcion.
     * @param {InscripcionUpdateArgs} args - Arguments to update one Inscripcion.
     * @example
     * // Update one Inscripcion
     * const inscripcion = await prisma.inscripcion.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends InscripcionUpdateArgs>(args: SelectSubset<T, InscripcionUpdateArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Inscripcions.
     * @param {InscripcionDeleteManyArgs} args - Arguments to filter Inscripcions to delete.
     * @example
     * // Delete a few Inscripcions
     * const { count } = await prisma.inscripcion.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends InscripcionDeleteManyArgs>(args?: SelectSubset<T, InscripcionDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inscripcions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Inscripcions
     * const inscripcion = await prisma.inscripcion.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends InscripcionUpdateManyArgs>(args: SelectSubset<T, InscripcionUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Inscripcions and returns the data updated in the database.
     * @param {InscripcionUpdateManyAndReturnArgs} args - Arguments to update many Inscripcions.
     * @example
     * // Update many Inscripcions
     * const inscripcion = await prisma.inscripcion.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Inscripcions and only return the `usuario`
     * const inscripcionWithUsuarioOnly = await prisma.inscripcion.updateManyAndReturn({
     *   select: { usuario: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends InscripcionUpdateManyAndReturnArgs>(args: SelectSubset<T, InscripcionUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Inscripcion.
     * @param {InscripcionUpsertArgs} args - Arguments to update or create a Inscripcion.
     * @example
     * // Update or create a Inscripcion
     * const inscripcion = await prisma.inscripcion.upsert({
     *   create: {
     *     // ... data to create a Inscripcion
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Inscripcion we want to update
     *   }
     * })
     */
    upsert<T extends InscripcionUpsertArgs>(args: SelectSubset<T, InscripcionUpsertArgs<ExtArgs>>): Prisma__InscripcionClient<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Inscripcions.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionCountArgs} args - Arguments to filter Inscripcions to count.
     * @example
     * // Count the number of Inscripcions
     * const count = await prisma.inscripcion.count({
     *   where: {
     *     // ... the filter for the Inscripcions we want to count
     *   }
     * })
    **/
    count<T extends InscripcionCountArgs>(
      args?: Subset<T, InscripcionCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], InscripcionCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Inscripcion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends InscripcionAggregateArgs>(args: Subset<T, InscripcionAggregateArgs>): Prisma.PrismaPromise<GetInscripcionAggregateType<T>>

    /**
     * Group by Inscripcion.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {InscripcionGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends InscripcionGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: InscripcionGroupByArgs['orderBy'] }
        : { orderBy?: InscripcionGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, InscripcionGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetInscripcionGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Inscripcion model
   */
  readonly fields: InscripcionFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Inscripcion.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__InscripcionClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuarioID<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    comunidadID<T extends ComunidadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ComunidadDefaultArgs<ExtArgs>>): Prisma__ComunidadClient<$Result.GetResult<Prisma.$ComunidadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Inscripcion model
   */
  interface InscripcionFieldRefs {
    readonly usuario: FieldRef<"Inscripcion", 'String'>
    readonly comunidad: FieldRef<"Inscripcion", 'Int'>
  }
    

  // Custom InputTypes
  /**
   * Inscripcion findUnique
   */
  export type InscripcionFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * Filter, which Inscripcion to fetch.
     */
    where: InscripcionWhereUniqueInput
  }

  /**
   * Inscripcion findUniqueOrThrow
   */
  export type InscripcionFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * Filter, which Inscripcion to fetch.
     */
    where: InscripcionWhereUniqueInput
  }

  /**
   * Inscripcion findFirst
   */
  export type InscripcionFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * Filter, which Inscripcion to fetch.
     */
    where?: InscripcionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inscripcions to fetch.
     */
    orderBy?: InscripcionOrderByWithRelationInput | InscripcionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inscripcions.
     */
    cursor?: InscripcionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inscripcions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inscripcions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inscripcions.
     */
    distinct?: InscripcionScalarFieldEnum | InscripcionScalarFieldEnum[]
  }

  /**
   * Inscripcion findFirstOrThrow
   */
  export type InscripcionFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * Filter, which Inscripcion to fetch.
     */
    where?: InscripcionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inscripcions to fetch.
     */
    orderBy?: InscripcionOrderByWithRelationInput | InscripcionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Inscripcions.
     */
    cursor?: InscripcionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inscripcions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inscripcions.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Inscripcions.
     */
    distinct?: InscripcionScalarFieldEnum | InscripcionScalarFieldEnum[]
  }

  /**
   * Inscripcion findMany
   */
  export type InscripcionFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * Filter, which Inscripcions to fetch.
     */
    where?: InscripcionWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Inscripcions to fetch.
     */
    orderBy?: InscripcionOrderByWithRelationInput | InscripcionOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Inscripcions.
     */
    cursor?: InscripcionWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Inscripcions from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Inscripcions.
     */
    skip?: number
    distinct?: InscripcionScalarFieldEnum | InscripcionScalarFieldEnum[]
  }

  /**
   * Inscripcion create
   */
  export type InscripcionCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * The data needed to create a Inscripcion.
     */
    data: XOR<InscripcionCreateInput, InscripcionUncheckedCreateInput>
  }

  /**
   * Inscripcion createMany
   */
  export type InscripcionCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Inscripcions.
     */
    data: InscripcionCreateManyInput | InscripcionCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Inscripcion createManyAndReturn
   */
  export type InscripcionCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * The data used to create many Inscripcions.
     */
    data: InscripcionCreateManyInput | InscripcionCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Inscripcion update
   */
  export type InscripcionUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * The data needed to update a Inscripcion.
     */
    data: XOR<InscripcionUpdateInput, InscripcionUncheckedUpdateInput>
    /**
     * Choose, which Inscripcion to update.
     */
    where: InscripcionWhereUniqueInput
  }

  /**
   * Inscripcion updateMany
   */
  export type InscripcionUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Inscripcions.
     */
    data: XOR<InscripcionUpdateManyMutationInput, InscripcionUncheckedUpdateManyInput>
    /**
     * Filter which Inscripcions to update
     */
    where?: InscripcionWhereInput
    /**
     * Limit how many Inscripcions to update.
     */
    limit?: number
  }

  /**
   * Inscripcion updateManyAndReturn
   */
  export type InscripcionUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * The data used to update Inscripcions.
     */
    data: XOR<InscripcionUpdateManyMutationInput, InscripcionUncheckedUpdateManyInput>
    /**
     * Filter which Inscripcions to update
     */
    where?: InscripcionWhereInput
    /**
     * Limit how many Inscripcions to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Inscripcion upsert
   */
  export type InscripcionUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * The filter to search for the Inscripcion to update in case it exists.
     */
    where: InscripcionWhereUniqueInput
    /**
     * In case the Inscripcion found by the `where` argument doesn't exist, create a new Inscripcion with this data.
     */
    create: XOR<InscripcionCreateInput, InscripcionUncheckedCreateInput>
    /**
     * In case the Inscripcion was found with the provided `where` argument, update it with this data.
     */
    update: XOR<InscripcionUpdateInput, InscripcionUncheckedUpdateInput>
  }

  /**
   * Inscripcion delete
   */
  export type InscripcionDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    /**
     * Filter which Inscripcion to delete.
     */
    where: InscripcionWhereUniqueInput
  }

  /**
   * Inscripcion deleteMany
   */
  export type InscripcionDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Inscripcions to delete
     */
    where?: InscripcionWhereInput
    /**
     * Limit how many Inscripcions to delete.
     */
    limit?: number
  }

  /**
   * Inscripcion without action
   */
  export type InscripcionDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
  }


  /**
   * Model Mensaje
   */

  export type AggregateMensaje = {
    _count: MensajeCountAggregateOutputType | null
    _avg: MensajeAvgAggregateOutputType | null
    _sum: MensajeSumAggregateOutputType | null
    _min: MensajeMinAggregateOutputType | null
    _max: MensajeMaxAggregateOutputType | null
  }

  export type MensajeAvgAggregateOutputType = {
    comunidad: number | null
  }

  export type MensajeSumAggregateOutputType = {
    comunidad: number | null
  }

  export type MensajeMinAggregateOutputType = {
    horaCreacion: Date | null
    comunidad: number | null
    texto: string | null
  }

  export type MensajeMaxAggregateOutputType = {
    horaCreacion: Date | null
    comunidad: number | null
    texto: string | null
  }

  export type MensajeCountAggregateOutputType = {
    horaCreacion: number
    comunidad: number
    texto: number
    _all: number
  }


  export type MensajeAvgAggregateInputType = {
    comunidad?: true
  }

  export type MensajeSumAggregateInputType = {
    comunidad?: true
  }

  export type MensajeMinAggregateInputType = {
    horaCreacion?: true
    comunidad?: true
    texto?: true
  }

  export type MensajeMaxAggregateInputType = {
    horaCreacion?: true
    comunidad?: true
    texto?: true
  }

  export type MensajeCountAggregateInputType = {
    horaCreacion?: true
    comunidad?: true
    texto?: true
    _all?: true
  }

  export type MensajeAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mensaje to aggregate.
     */
    where?: MensajeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mensajes to fetch.
     */
    orderBy?: MensajeOrderByWithRelationInput | MensajeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: MensajeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mensajes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mensajes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Mensajes
    **/
    _count?: true | MensajeCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: MensajeAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: MensajeSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: MensajeMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: MensajeMaxAggregateInputType
  }

  export type GetMensajeAggregateType<T extends MensajeAggregateArgs> = {
        [P in keyof T & keyof AggregateMensaje]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateMensaje[P]>
      : GetScalarType<T[P], AggregateMensaje[P]>
  }




  export type MensajeGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: MensajeWhereInput
    orderBy?: MensajeOrderByWithAggregationInput | MensajeOrderByWithAggregationInput[]
    by: MensajeScalarFieldEnum[] | MensajeScalarFieldEnum
    having?: MensajeScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: MensajeCountAggregateInputType | true
    _avg?: MensajeAvgAggregateInputType
    _sum?: MensajeSumAggregateInputType
    _min?: MensajeMinAggregateInputType
    _max?: MensajeMaxAggregateInputType
  }

  export type MensajeGroupByOutputType = {
    horaCreacion: Date
    comunidad: number
    texto: string
    _count: MensajeCountAggregateOutputType | null
    _avg: MensajeAvgAggregateOutputType | null
    _sum: MensajeSumAggregateOutputType | null
    _min: MensajeMinAggregateOutputType | null
    _max: MensajeMaxAggregateOutputType | null
  }

  type GetMensajeGroupByPayload<T extends MensajeGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<MensajeGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof MensajeGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], MensajeGroupByOutputType[P]>
            : GetScalarType<T[P], MensajeGroupByOutputType[P]>
        }
      >
    >


  export type MensajeSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    horaCreacion?: boolean
    comunidad?: boolean
    texto?: boolean
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mensaje"]>

  export type MensajeSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    horaCreacion?: boolean
    comunidad?: boolean
    texto?: boolean
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mensaje"]>

  export type MensajeSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    horaCreacion?: boolean
    comunidad?: boolean
    texto?: boolean
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["mensaje"]>

  export type MensajeSelectScalar = {
    horaCreacion?: boolean
    comunidad?: boolean
    texto?: boolean
  }

  export type MensajeOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"horaCreacion" | "comunidad" | "texto", ExtArgs["result"]["mensaje"]>
  export type MensajeInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }
  export type MensajeIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }
  export type MensajeIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }

  export type $MensajePayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Mensaje"
    objects: {
      comunidadID: Prisma.$ComunidadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      horaCreacion: Date
      comunidad: number
      texto: string
    }, ExtArgs["result"]["mensaje"]>
    composites: {}
  }

  type MensajeGetPayload<S extends boolean | null | undefined | MensajeDefaultArgs> = $Result.GetResult<Prisma.$MensajePayload, S>

  type MensajeCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<MensajeFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: MensajeCountAggregateInputType | true
    }

  export interface MensajeDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Mensaje'], meta: { name: 'Mensaje' } }
    /**
     * Find zero or one Mensaje that matches the filter.
     * @param {MensajeFindUniqueArgs} args - Arguments to find a Mensaje
     * @example
     * // Get one Mensaje
     * const mensaje = await prisma.mensaje.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends MensajeFindUniqueArgs>(args: SelectSubset<T, MensajeFindUniqueArgs<ExtArgs>>): Prisma__MensajeClient<$Result.GetResult<Prisma.$MensajePayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Mensaje that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {MensajeFindUniqueOrThrowArgs} args - Arguments to find a Mensaje
     * @example
     * // Get one Mensaje
     * const mensaje = await prisma.mensaje.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends MensajeFindUniqueOrThrowArgs>(args: SelectSubset<T, MensajeFindUniqueOrThrowArgs<ExtArgs>>): Prisma__MensajeClient<$Result.GetResult<Prisma.$MensajePayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mensaje that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensajeFindFirstArgs} args - Arguments to find a Mensaje
     * @example
     * // Get one Mensaje
     * const mensaje = await prisma.mensaje.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends MensajeFindFirstArgs>(args?: SelectSubset<T, MensajeFindFirstArgs<ExtArgs>>): Prisma__MensajeClient<$Result.GetResult<Prisma.$MensajePayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Mensaje that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensajeFindFirstOrThrowArgs} args - Arguments to find a Mensaje
     * @example
     * // Get one Mensaje
     * const mensaje = await prisma.mensaje.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends MensajeFindFirstOrThrowArgs>(args?: SelectSubset<T, MensajeFindFirstOrThrowArgs<ExtArgs>>): Prisma__MensajeClient<$Result.GetResult<Prisma.$MensajePayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Mensajes that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensajeFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Mensajes
     * const mensajes = await prisma.mensaje.findMany()
     * 
     * // Get first 10 Mensajes
     * const mensajes = await prisma.mensaje.findMany({ take: 10 })
     * 
     * // Only select the `horaCreacion`
     * const mensajeWithHoraCreacionOnly = await prisma.mensaje.findMany({ select: { horaCreacion: true } })
     * 
     */
    findMany<T extends MensajeFindManyArgs>(args?: SelectSubset<T, MensajeFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MensajePayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Mensaje.
     * @param {MensajeCreateArgs} args - Arguments to create a Mensaje.
     * @example
     * // Create one Mensaje
     * const Mensaje = await prisma.mensaje.create({
     *   data: {
     *     // ... data to create a Mensaje
     *   }
     * })
     * 
     */
    create<T extends MensajeCreateArgs>(args: SelectSubset<T, MensajeCreateArgs<ExtArgs>>): Prisma__MensajeClient<$Result.GetResult<Prisma.$MensajePayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Mensajes.
     * @param {MensajeCreateManyArgs} args - Arguments to create many Mensajes.
     * @example
     * // Create many Mensajes
     * const mensaje = await prisma.mensaje.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends MensajeCreateManyArgs>(args?: SelectSubset<T, MensajeCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Mensajes and returns the data saved in the database.
     * @param {MensajeCreateManyAndReturnArgs} args - Arguments to create many Mensajes.
     * @example
     * // Create many Mensajes
     * const mensaje = await prisma.mensaje.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Mensajes and only return the `horaCreacion`
     * const mensajeWithHoraCreacionOnly = await prisma.mensaje.createManyAndReturn({
     *   select: { horaCreacion: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends MensajeCreateManyAndReturnArgs>(args?: SelectSubset<T, MensajeCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MensajePayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Mensaje.
     * @param {MensajeDeleteArgs} args - Arguments to delete one Mensaje.
     * @example
     * // Delete one Mensaje
     * const Mensaje = await prisma.mensaje.delete({
     *   where: {
     *     // ... filter to delete one Mensaje
     *   }
     * })
     * 
     */
    delete<T extends MensajeDeleteArgs>(args: SelectSubset<T, MensajeDeleteArgs<ExtArgs>>): Prisma__MensajeClient<$Result.GetResult<Prisma.$MensajePayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Mensaje.
     * @param {MensajeUpdateArgs} args - Arguments to update one Mensaje.
     * @example
     * // Update one Mensaje
     * const mensaje = await prisma.mensaje.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends MensajeUpdateArgs>(args: SelectSubset<T, MensajeUpdateArgs<ExtArgs>>): Prisma__MensajeClient<$Result.GetResult<Prisma.$MensajePayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Mensajes.
     * @param {MensajeDeleteManyArgs} args - Arguments to filter Mensajes to delete.
     * @example
     * // Delete a few Mensajes
     * const { count } = await prisma.mensaje.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends MensajeDeleteManyArgs>(args?: SelectSubset<T, MensajeDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mensajes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensajeUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Mensajes
     * const mensaje = await prisma.mensaje.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends MensajeUpdateManyArgs>(args: SelectSubset<T, MensajeUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Mensajes and returns the data updated in the database.
     * @param {MensajeUpdateManyAndReturnArgs} args - Arguments to update many Mensajes.
     * @example
     * // Update many Mensajes
     * const mensaje = await prisma.mensaje.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Mensajes and only return the `horaCreacion`
     * const mensajeWithHoraCreacionOnly = await prisma.mensaje.updateManyAndReturn({
     *   select: { horaCreacion: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends MensajeUpdateManyAndReturnArgs>(args: SelectSubset<T, MensajeUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$MensajePayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Mensaje.
     * @param {MensajeUpsertArgs} args - Arguments to update or create a Mensaje.
     * @example
     * // Update or create a Mensaje
     * const mensaje = await prisma.mensaje.upsert({
     *   create: {
     *     // ... data to create a Mensaje
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Mensaje we want to update
     *   }
     * })
     */
    upsert<T extends MensajeUpsertArgs>(args: SelectSubset<T, MensajeUpsertArgs<ExtArgs>>): Prisma__MensajeClient<$Result.GetResult<Prisma.$MensajePayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Mensajes.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensajeCountArgs} args - Arguments to filter Mensajes to count.
     * @example
     * // Count the number of Mensajes
     * const count = await prisma.mensaje.count({
     *   where: {
     *     // ... the filter for the Mensajes we want to count
     *   }
     * })
    **/
    count<T extends MensajeCountArgs>(
      args?: Subset<T, MensajeCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], MensajeCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Mensaje.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensajeAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends MensajeAggregateArgs>(args: Subset<T, MensajeAggregateArgs>): Prisma.PrismaPromise<GetMensajeAggregateType<T>>

    /**
     * Group by Mensaje.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {MensajeGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends MensajeGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: MensajeGroupByArgs['orderBy'] }
        : { orderBy?: MensajeGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, MensajeGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetMensajeGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Mensaje model
   */
  readonly fields: MensajeFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Mensaje.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__MensajeClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comunidadID<T extends ComunidadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ComunidadDefaultArgs<ExtArgs>>): Prisma__ComunidadClient<$Result.GetResult<Prisma.$ComunidadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Mensaje model
   */
  interface MensajeFieldRefs {
    readonly horaCreacion: FieldRef<"Mensaje", 'DateTime'>
    readonly comunidad: FieldRef<"Mensaje", 'Int'>
    readonly texto: FieldRef<"Mensaje", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Mensaje findUnique
   */
  export type MensajeFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensaje
     */
    select?: MensajeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensaje
     */
    omit?: MensajeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensajeInclude<ExtArgs> | null
    /**
     * Filter, which Mensaje to fetch.
     */
    where: MensajeWhereUniqueInput
  }

  /**
   * Mensaje findUniqueOrThrow
   */
  export type MensajeFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensaje
     */
    select?: MensajeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensaje
     */
    omit?: MensajeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensajeInclude<ExtArgs> | null
    /**
     * Filter, which Mensaje to fetch.
     */
    where: MensajeWhereUniqueInput
  }

  /**
   * Mensaje findFirst
   */
  export type MensajeFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensaje
     */
    select?: MensajeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensaje
     */
    omit?: MensajeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensajeInclude<ExtArgs> | null
    /**
     * Filter, which Mensaje to fetch.
     */
    where?: MensajeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mensajes to fetch.
     */
    orderBy?: MensajeOrderByWithRelationInput | MensajeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mensajes.
     */
    cursor?: MensajeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mensajes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mensajes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mensajes.
     */
    distinct?: MensajeScalarFieldEnum | MensajeScalarFieldEnum[]
  }

  /**
   * Mensaje findFirstOrThrow
   */
  export type MensajeFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensaje
     */
    select?: MensajeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensaje
     */
    omit?: MensajeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensajeInclude<ExtArgs> | null
    /**
     * Filter, which Mensaje to fetch.
     */
    where?: MensajeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mensajes to fetch.
     */
    orderBy?: MensajeOrderByWithRelationInput | MensajeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Mensajes.
     */
    cursor?: MensajeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mensajes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mensajes.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Mensajes.
     */
    distinct?: MensajeScalarFieldEnum | MensajeScalarFieldEnum[]
  }

  /**
   * Mensaje findMany
   */
  export type MensajeFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensaje
     */
    select?: MensajeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensaje
     */
    omit?: MensajeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensajeInclude<ExtArgs> | null
    /**
     * Filter, which Mensajes to fetch.
     */
    where?: MensajeWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Mensajes to fetch.
     */
    orderBy?: MensajeOrderByWithRelationInput | MensajeOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Mensajes.
     */
    cursor?: MensajeWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Mensajes from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Mensajes.
     */
    skip?: number
    distinct?: MensajeScalarFieldEnum | MensajeScalarFieldEnum[]
  }

  /**
   * Mensaje create
   */
  export type MensajeCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensaje
     */
    select?: MensajeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensaje
     */
    omit?: MensajeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensajeInclude<ExtArgs> | null
    /**
     * The data needed to create a Mensaje.
     */
    data: XOR<MensajeCreateInput, MensajeUncheckedCreateInput>
  }

  /**
   * Mensaje createMany
   */
  export type MensajeCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Mensajes.
     */
    data: MensajeCreateManyInput | MensajeCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Mensaje createManyAndReturn
   */
  export type MensajeCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensaje
     */
    select?: MensajeSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mensaje
     */
    omit?: MensajeOmit<ExtArgs> | null
    /**
     * The data used to create many Mensajes.
     */
    data: MensajeCreateManyInput | MensajeCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensajeIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Mensaje update
   */
  export type MensajeUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensaje
     */
    select?: MensajeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensaje
     */
    omit?: MensajeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensajeInclude<ExtArgs> | null
    /**
     * The data needed to update a Mensaje.
     */
    data: XOR<MensajeUpdateInput, MensajeUncheckedUpdateInput>
    /**
     * Choose, which Mensaje to update.
     */
    where: MensajeWhereUniqueInput
  }

  /**
   * Mensaje updateMany
   */
  export type MensajeUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Mensajes.
     */
    data: XOR<MensajeUpdateManyMutationInput, MensajeUncheckedUpdateManyInput>
    /**
     * Filter which Mensajes to update
     */
    where?: MensajeWhereInput
    /**
     * Limit how many Mensajes to update.
     */
    limit?: number
  }

  /**
   * Mensaje updateManyAndReturn
   */
  export type MensajeUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensaje
     */
    select?: MensajeSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Mensaje
     */
    omit?: MensajeOmit<ExtArgs> | null
    /**
     * The data used to update Mensajes.
     */
    data: XOR<MensajeUpdateManyMutationInput, MensajeUncheckedUpdateManyInput>
    /**
     * Filter which Mensajes to update
     */
    where?: MensajeWhereInput
    /**
     * Limit how many Mensajes to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensajeIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Mensaje upsert
   */
  export type MensajeUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensaje
     */
    select?: MensajeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensaje
     */
    omit?: MensajeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensajeInclude<ExtArgs> | null
    /**
     * The filter to search for the Mensaje to update in case it exists.
     */
    where: MensajeWhereUniqueInput
    /**
     * In case the Mensaje found by the `where` argument doesn't exist, create a new Mensaje with this data.
     */
    create: XOR<MensajeCreateInput, MensajeUncheckedCreateInput>
    /**
     * In case the Mensaje was found with the provided `where` argument, update it with this data.
     */
    update: XOR<MensajeUpdateInput, MensajeUncheckedUpdateInput>
  }

  /**
   * Mensaje delete
   */
  export type MensajeDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensaje
     */
    select?: MensajeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensaje
     */
    omit?: MensajeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensajeInclude<ExtArgs> | null
    /**
     * Filter which Mensaje to delete.
     */
    where: MensajeWhereUniqueInput
  }

  /**
   * Mensaje deleteMany
   */
  export type MensajeDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Mensajes to delete
     */
    where?: MensajeWhereInput
    /**
     * Limit how many Mensajes to delete.
     */
    limit?: number
  }

  /**
   * Mensaje without action
   */
  export type MensajeDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Mensaje
     */
    select?: MensajeSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Mensaje
     */
    omit?: MensajeOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: MensajeInclude<ExtArgs> | null
  }


  /**
   * Model Reserva
   */

  export type AggregateReserva = {
    _count: ReservaCountAggregateOutputType | null
    _avg: ReservaAvgAggregateOutputType | null
    _sum: ReservaSumAggregateOutputType | null
    _min: ReservaMinAggregateOutputType | null
    _max: ReservaMaxAggregateOutputType | null
  }

  export type ReservaAvgAggregateOutputType = {
    comunidad: number | null
  }

  export type ReservaSumAggregateOutputType = {
    comunidad: number | null
  }

  export type ReservaMinAggregateOutputType = {
    usuario: string | null
    comunidad: number | null
    zona: string | null
    fecha: Date | null
    hora_inicio: Date | null
    hora_fin: Date | null
  }

  export type ReservaMaxAggregateOutputType = {
    usuario: string | null
    comunidad: number | null
    zona: string | null
    fecha: Date | null
    hora_inicio: Date | null
    hora_fin: Date | null
  }

  export type ReservaCountAggregateOutputType = {
    usuario: number
    comunidad: number
    zona: number
    fecha: number
    hora_inicio: number
    hora_fin: number
    _all: number
  }


  export type ReservaAvgAggregateInputType = {
    comunidad?: true
  }

  export type ReservaSumAggregateInputType = {
    comunidad?: true
  }

  export type ReservaMinAggregateInputType = {
    usuario?: true
    comunidad?: true
    zona?: true
    fecha?: true
    hora_inicio?: true
    hora_fin?: true
  }

  export type ReservaMaxAggregateInputType = {
    usuario?: true
    comunidad?: true
    zona?: true
    fecha?: true
    hora_inicio?: true
    hora_fin?: true
  }

  export type ReservaCountAggregateInputType = {
    usuario?: true
    comunidad?: true
    zona?: true
    fecha?: true
    hora_inicio?: true
    hora_fin?: true
    _all?: true
  }

  export type ReservaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reserva to aggregate.
     */
    where?: ReservaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reservas to fetch.
     */
    orderBy?: ReservaOrderByWithRelationInput | ReservaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ReservaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reservas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reservas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Reservas
    **/
    _count?: true | ReservaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ReservaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ReservaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ReservaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ReservaMaxAggregateInputType
  }

  export type GetReservaAggregateType<T extends ReservaAggregateArgs> = {
        [P in keyof T & keyof AggregateReserva]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateReserva[P]>
      : GetScalarType<T[P], AggregateReserva[P]>
  }




  export type ReservaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ReservaWhereInput
    orderBy?: ReservaOrderByWithAggregationInput | ReservaOrderByWithAggregationInput[]
    by: ReservaScalarFieldEnum[] | ReservaScalarFieldEnum
    having?: ReservaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ReservaCountAggregateInputType | true
    _avg?: ReservaAvgAggregateInputType
    _sum?: ReservaSumAggregateInputType
    _min?: ReservaMinAggregateInputType
    _max?: ReservaMaxAggregateInputType
  }

  export type ReservaGroupByOutputType = {
    usuario: string
    comunidad: number
    zona: string
    fecha: Date
    hora_inicio: Date
    hora_fin: Date
    _count: ReservaCountAggregateOutputType | null
    _avg: ReservaAvgAggregateOutputType | null
    _sum: ReservaSumAggregateOutputType | null
    _min: ReservaMinAggregateOutputType | null
    _max: ReservaMaxAggregateOutputType | null
  }

  type GetReservaGroupByPayload<T extends ReservaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ReservaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ReservaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ReservaGroupByOutputType[P]>
            : GetScalarType<T[P], ReservaGroupByOutputType[P]>
        }
      >
    >


  export type ReservaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    usuario?: boolean
    comunidad?: boolean
    zona?: boolean
    fecha?: boolean
    hora_inicio?: boolean
    hora_fin?: boolean
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
    zonaID?: boolean | ZonaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reserva"]>

  export type ReservaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    usuario?: boolean
    comunidad?: boolean
    zona?: boolean
    fecha?: boolean
    hora_inicio?: boolean
    hora_fin?: boolean
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
    zonaID?: boolean | ZonaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reserva"]>

  export type ReservaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    usuario?: boolean
    comunidad?: boolean
    zona?: boolean
    fecha?: boolean
    hora_inicio?: boolean
    hora_fin?: boolean
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
    zonaID?: boolean | ZonaDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["reserva"]>

  export type ReservaSelectScalar = {
    usuario?: boolean
    comunidad?: boolean
    zona?: boolean
    fecha?: boolean
    hora_inicio?: boolean
    hora_fin?: boolean
  }

  export type ReservaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"usuario" | "comunidad" | "zona" | "fecha" | "hora_inicio" | "hora_fin", ExtArgs["result"]["reserva"]>
  export type ReservaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
    zonaID?: boolean | ZonaDefaultArgs<ExtArgs>
  }
  export type ReservaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
    zonaID?: boolean | ZonaDefaultArgs<ExtArgs>
  }
  export type ReservaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
    zonaID?: boolean | ZonaDefaultArgs<ExtArgs>
  }

  export type $ReservaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Reserva"
    objects: {
      usuarioID: Prisma.$UsuarioPayload<ExtArgs>
      zonaID: Prisma.$ZonaPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      usuario: string
      comunidad: number
      zona: string
      fecha: Date
      hora_inicio: Date
      hora_fin: Date
    }, ExtArgs["result"]["reserva"]>
    composites: {}
  }

  type ReservaGetPayload<S extends boolean | null | undefined | ReservaDefaultArgs> = $Result.GetResult<Prisma.$ReservaPayload, S>

  type ReservaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ReservaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ReservaCountAggregateInputType | true
    }

  export interface ReservaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Reserva'], meta: { name: 'Reserva' } }
    /**
     * Find zero or one Reserva that matches the filter.
     * @param {ReservaFindUniqueArgs} args - Arguments to find a Reserva
     * @example
     * // Get one Reserva
     * const reserva = await prisma.reserva.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ReservaFindUniqueArgs>(args: SelectSubset<T, ReservaFindUniqueArgs<ExtArgs>>): Prisma__ReservaClient<$Result.GetResult<Prisma.$ReservaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Reserva that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ReservaFindUniqueOrThrowArgs} args - Arguments to find a Reserva
     * @example
     * // Get one Reserva
     * const reserva = await prisma.reserva.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ReservaFindUniqueOrThrowArgs>(args: SelectSubset<T, ReservaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ReservaClient<$Result.GetResult<Prisma.$ReservaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reserva that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservaFindFirstArgs} args - Arguments to find a Reserva
     * @example
     * // Get one Reserva
     * const reserva = await prisma.reserva.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ReservaFindFirstArgs>(args?: SelectSubset<T, ReservaFindFirstArgs<ExtArgs>>): Prisma__ReservaClient<$Result.GetResult<Prisma.$ReservaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Reserva that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservaFindFirstOrThrowArgs} args - Arguments to find a Reserva
     * @example
     * // Get one Reserva
     * const reserva = await prisma.reserva.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ReservaFindFirstOrThrowArgs>(args?: SelectSubset<T, ReservaFindFirstOrThrowArgs<ExtArgs>>): Prisma__ReservaClient<$Result.GetResult<Prisma.$ReservaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Reservas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Reservas
     * const reservas = await prisma.reserva.findMany()
     * 
     * // Get first 10 Reservas
     * const reservas = await prisma.reserva.findMany({ take: 10 })
     * 
     * // Only select the `usuario`
     * const reservaWithUsuarioOnly = await prisma.reserva.findMany({ select: { usuario: true } })
     * 
     */
    findMany<T extends ReservaFindManyArgs>(args?: SelectSubset<T, ReservaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Reserva.
     * @param {ReservaCreateArgs} args - Arguments to create a Reserva.
     * @example
     * // Create one Reserva
     * const Reserva = await prisma.reserva.create({
     *   data: {
     *     // ... data to create a Reserva
     *   }
     * })
     * 
     */
    create<T extends ReservaCreateArgs>(args: SelectSubset<T, ReservaCreateArgs<ExtArgs>>): Prisma__ReservaClient<$Result.GetResult<Prisma.$ReservaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Reservas.
     * @param {ReservaCreateManyArgs} args - Arguments to create many Reservas.
     * @example
     * // Create many Reservas
     * const reserva = await prisma.reserva.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ReservaCreateManyArgs>(args?: SelectSubset<T, ReservaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Reservas and returns the data saved in the database.
     * @param {ReservaCreateManyAndReturnArgs} args - Arguments to create many Reservas.
     * @example
     * // Create many Reservas
     * const reserva = await prisma.reserva.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Reservas and only return the `usuario`
     * const reservaWithUsuarioOnly = await prisma.reserva.createManyAndReturn({
     *   select: { usuario: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ReservaCreateManyAndReturnArgs>(args?: SelectSubset<T, ReservaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Reserva.
     * @param {ReservaDeleteArgs} args - Arguments to delete one Reserva.
     * @example
     * // Delete one Reserva
     * const Reserva = await prisma.reserva.delete({
     *   where: {
     *     // ... filter to delete one Reserva
     *   }
     * })
     * 
     */
    delete<T extends ReservaDeleteArgs>(args: SelectSubset<T, ReservaDeleteArgs<ExtArgs>>): Prisma__ReservaClient<$Result.GetResult<Prisma.$ReservaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Reserva.
     * @param {ReservaUpdateArgs} args - Arguments to update one Reserva.
     * @example
     * // Update one Reserva
     * const reserva = await prisma.reserva.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ReservaUpdateArgs>(args: SelectSubset<T, ReservaUpdateArgs<ExtArgs>>): Prisma__ReservaClient<$Result.GetResult<Prisma.$ReservaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Reservas.
     * @param {ReservaDeleteManyArgs} args - Arguments to filter Reservas to delete.
     * @example
     * // Delete a few Reservas
     * const { count } = await prisma.reserva.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ReservaDeleteManyArgs>(args?: SelectSubset<T, ReservaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reservas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Reservas
     * const reserva = await prisma.reserva.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ReservaUpdateManyArgs>(args: SelectSubset<T, ReservaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Reservas and returns the data updated in the database.
     * @param {ReservaUpdateManyAndReturnArgs} args - Arguments to update many Reservas.
     * @example
     * // Update many Reservas
     * const reserva = await prisma.reserva.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Reservas and only return the `usuario`
     * const reservaWithUsuarioOnly = await prisma.reserva.updateManyAndReturn({
     *   select: { usuario: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ReservaUpdateManyAndReturnArgs>(args: SelectSubset<T, ReservaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Reserva.
     * @param {ReservaUpsertArgs} args - Arguments to update or create a Reserva.
     * @example
     * // Update or create a Reserva
     * const reserva = await prisma.reserva.upsert({
     *   create: {
     *     // ... data to create a Reserva
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Reserva we want to update
     *   }
     * })
     */
    upsert<T extends ReservaUpsertArgs>(args: SelectSubset<T, ReservaUpsertArgs<ExtArgs>>): Prisma__ReservaClient<$Result.GetResult<Prisma.$ReservaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Reservas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservaCountArgs} args - Arguments to filter Reservas to count.
     * @example
     * // Count the number of Reservas
     * const count = await prisma.reserva.count({
     *   where: {
     *     // ... the filter for the Reservas we want to count
     *   }
     * })
    **/
    count<T extends ReservaCountArgs>(
      args?: Subset<T, ReservaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ReservaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Reserva.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ReservaAggregateArgs>(args: Subset<T, ReservaAggregateArgs>): Prisma.PrismaPromise<GetReservaAggregateType<T>>

    /**
     * Group by Reserva.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ReservaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ReservaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ReservaGroupByArgs['orderBy'] }
        : { orderBy?: ReservaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ReservaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetReservaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Reserva model
   */
  readonly fields: ReservaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Reserva.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ReservaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuarioID<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    zonaID<T extends ZonaDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ZonaDefaultArgs<ExtArgs>>): Prisma__ZonaClient<$Result.GetResult<Prisma.$ZonaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Reserva model
   */
  interface ReservaFieldRefs {
    readonly usuario: FieldRef<"Reserva", 'String'>
    readonly comunidad: FieldRef<"Reserva", 'Int'>
    readonly zona: FieldRef<"Reserva", 'String'>
    readonly fecha: FieldRef<"Reserva", 'DateTime'>
    readonly hora_inicio: FieldRef<"Reserva", 'DateTime'>
    readonly hora_fin: FieldRef<"Reserva", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Reserva findUnique
   */
  export type ReservaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reserva
     */
    select?: ReservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reserva
     */
    omit?: ReservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservaInclude<ExtArgs> | null
    /**
     * Filter, which Reserva to fetch.
     */
    where: ReservaWhereUniqueInput
  }

  /**
   * Reserva findUniqueOrThrow
   */
  export type ReservaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reserva
     */
    select?: ReservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reserva
     */
    omit?: ReservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservaInclude<ExtArgs> | null
    /**
     * Filter, which Reserva to fetch.
     */
    where: ReservaWhereUniqueInput
  }

  /**
   * Reserva findFirst
   */
  export type ReservaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reserva
     */
    select?: ReservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reserva
     */
    omit?: ReservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservaInclude<ExtArgs> | null
    /**
     * Filter, which Reserva to fetch.
     */
    where?: ReservaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reservas to fetch.
     */
    orderBy?: ReservaOrderByWithRelationInput | ReservaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reservas.
     */
    cursor?: ReservaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reservas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reservas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reservas.
     */
    distinct?: ReservaScalarFieldEnum | ReservaScalarFieldEnum[]
  }

  /**
   * Reserva findFirstOrThrow
   */
  export type ReservaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reserva
     */
    select?: ReservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reserva
     */
    omit?: ReservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservaInclude<ExtArgs> | null
    /**
     * Filter, which Reserva to fetch.
     */
    where?: ReservaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reservas to fetch.
     */
    orderBy?: ReservaOrderByWithRelationInput | ReservaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Reservas.
     */
    cursor?: ReservaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reservas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reservas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Reservas.
     */
    distinct?: ReservaScalarFieldEnum | ReservaScalarFieldEnum[]
  }

  /**
   * Reserva findMany
   */
  export type ReservaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reserva
     */
    select?: ReservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reserva
     */
    omit?: ReservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservaInclude<ExtArgs> | null
    /**
     * Filter, which Reservas to fetch.
     */
    where?: ReservaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Reservas to fetch.
     */
    orderBy?: ReservaOrderByWithRelationInput | ReservaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Reservas.
     */
    cursor?: ReservaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Reservas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Reservas.
     */
    skip?: number
    distinct?: ReservaScalarFieldEnum | ReservaScalarFieldEnum[]
  }

  /**
   * Reserva create
   */
  export type ReservaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reserva
     */
    select?: ReservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reserva
     */
    omit?: ReservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservaInclude<ExtArgs> | null
    /**
     * The data needed to create a Reserva.
     */
    data: XOR<ReservaCreateInput, ReservaUncheckedCreateInput>
  }

  /**
   * Reserva createMany
   */
  export type ReservaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Reservas.
     */
    data: ReservaCreateManyInput | ReservaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Reserva createManyAndReturn
   */
  export type ReservaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reserva
     */
    select?: ReservaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reserva
     */
    omit?: ReservaOmit<ExtArgs> | null
    /**
     * The data used to create many Reservas.
     */
    data: ReservaCreateManyInput | ReservaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reserva update
   */
  export type ReservaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reserva
     */
    select?: ReservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reserva
     */
    omit?: ReservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservaInclude<ExtArgs> | null
    /**
     * The data needed to update a Reserva.
     */
    data: XOR<ReservaUpdateInput, ReservaUncheckedUpdateInput>
    /**
     * Choose, which Reserva to update.
     */
    where: ReservaWhereUniqueInput
  }

  /**
   * Reserva updateMany
   */
  export type ReservaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Reservas.
     */
    data: XOR<ReservaUpdateManyMutationInput, ReservaUncheckedUpdateManyInput>
    /**
     * Filter which Reservas to update
     */
    where?: ReservaWhereInput
    /**
     * Limit how many Reservas to update.
     */
    limit?: number
  }

  /**
   * Reserva updateManyAndReturn
   */
  export type ReservaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reserva
     */
    select?: ReservaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Reserva
     */
    omit?: ReservaOmit<ExtArgs> | null
    /**
     * The data used to update Reservas.
     */
    data: XOR<ReservaUpdateManyMutationInput, ReservaUncheckedUpdateManyInput>
    /**
     * Filter which Reservas to update
     */
    where?: ReservaWhereInput
    /**
     * Limit how many Reservas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Reserva upsert
   */
  export type ReservaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reserva
     */
    select?: ReservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reserva
     */
    omit?: ReservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservaInclude<ExtArgs> | null
    /**
     * The filter to search for the Reserva to update in case it exists.
     */
    where: ReservaWhereUniqueInput
    /**
     * In case the Reserva found by the `where` argument doesn't exist, create a new Reserva with this data.
     */
    create: XOR<ReservaCreateInput, ReservaUncheckedCreateInput>
    /**
     * In case the Reserva was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ReservaUpdateInput, ReservaUncheckedUpdateInput>
  }

  /**
   * Reserva delete
   */
  export type ReservaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reserva
     */
    select?: ReservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reserva
     */
    omit?: ReservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservaInclude<ExtArgs> | null
    /**
     * Filter which Reserva to delete.
     */
    where: ReservaWhereUniqueInput
  }

  /**
   * Reserva deleteMany
   */
  export type ReservaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Reservas to delete
     */
    where?: ReservaWhereInput
    /**
     * Limit how many Reservas to delete.
     */
    limit?: number
  }

  /**
   * Reserva without action
   */
  export type ReservaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reserva
     */
    select?: ReservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reserva
     */
    omit?: ReservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservaInclude<ExtArgs> | null
  }


  /**
   * Model Solicitud
   */

  export type AggregateSolicitud = {
    _count: SolicitudCountAggregateOutputType | null
    _avg: SolicitudAvgAggregateOutputType | null
    _sum: SolicitudSumAggregateOutputType | null
    _min: SolicitudMinAggregateOutputType | null
    _max: SolicitudMaxAggregateOutputType | null
  }

  export type SolicitudAvgAggregateOutputType = {
    comunidad: number | null
  }

  export type SolicitudSumAggregateOutputType = {
    comunidad: number | null
  }

  export type SolicitudMinAggregateOutputType = {
    usuario: string | null
    comunidad: number | null
    estado: $Enums.Estado_Solicitud | null
  }

  export type SolicitudMaxAggregateOutputType = {
    usuario: string | null
    comunidad: number | null
    estado: $Enums.Estado_Solicitud | null
  }

  export type SolicitudCountAggregateOutputType = {
    usuario: number
    comunidad: number
    estado: number
    _all: number
  }


  export type SolicitudAvgAggregateInputType = {
    comunidad?: true
  }

  export type SolicitudSumAggregateInputType = {
    comunidad?: true
  }

  export type SolicitudMinAggregateInputType = {
    usuario?: true
    comunidad?: true
    estado?: true
  }

  export type SolicitudMaxAggregateInputType = {
    usuario?: true
    comunidad?: true
    estado?: true
  }

  export type SolicitudCountAggregateInputType = {
    usuario?: true
    comunidad?: true
    estado?: true
    _all?: true
  }

  export type SolicitudAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Solicitud to aggregate.
     */
    where?: SolicitudWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Solicituds to fetch.
     */
    orderBy?: SolicitudOrderByWithRelationInput | SolicitudOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: SolicitudWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Solicituds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Solicituds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Solicituds
    **/
    _count?: true | SolicitudCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: SolicitudAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: SolicitudSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: SolicitudMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: SolicitudMaxAggregateInputType
  }

  export type GetSolicitudAggregateType<T extends SolicitudAggregateArgs> = {
        [P in keyof T & keyof AggregateSolicitud]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateSolicitud[P]>
      : GetScalarType<T[P], AggregateSolicitud[P]>
  }




  export type SolicitudGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: SolicitudWhereInput
    orderBy?: SolicitudOrderByWithAggregationInput | SolicitudOrderByWithAggregationInput[]
    by: SolicitudScalarFieldEnum[] | SolicitudScalarFieldEnum
    having?: SolicitudScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: SolicitudCountAggregateInputType | true
    _avg?: SolicitudAvgAggregateInputType
    _sum?: SolicitudSumAggregateInputType
    _min?: SolicitudMinAggregateInputType
    _max?: SolicitudMaxAggregateInputType
  }

  export type SolicitudGroupByOutputType = {
    usuario: string
    comunidad: number
    estado: $Enums.Estado_Solicitud
    _count: SolicitudCountAggregateOutputType | null
    _avg: SolicitudAvgAggregateOutputType | null
    _sum: SolicitudSumAggregateOutputType | null
    _min: SolicitudMinAggregateOutputType | null
    _max: SolicitudMaxAggregateOutputType | null
  }

  type GetSolicitudGroupByPayload<T extends SolicitudGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<SolicitudGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof SolicitudGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], SolicitudGroupByOutputType[P]>
            : GetScalarType<T[P], SolicitudGroupByOutputType[P]>
        }
      >
    >


  export type SolicitudSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    usuario?: boolean
    comunidad?: boolean
    estado?: boolean
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["solicitud"]>

  export type SolicitudSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    usuario?: boolean
    comunidad?: boolean
    estado?: boolean
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["solicitud"]>

  export type SolicitudSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    usuario?: boolean
    comunidad?: boolean
    estado?: boolean
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["solicitud"]>

  export type SolicitudSelectScalar = {
    usuario?: boolean
    comunidad?: boolean
    estado?: boolean
  }

  export type SolicitudOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"usuario" | "comunidad" | "estado", ExtArgs["result"]["solicitud"]>
  export type SolicitudInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }
  export type SolicitudIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }
  export type SolicitudIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    usuarioID?: boolean | UsuarioDefaultArgs<ExtArgs>
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }

  export type $SolicitudPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Solicitud"
    objects: {
      usuarioID: Prisma.$UsuarioPayload<ExtArgs>
      comunidadID: Prisma.$ComunidadPayload<ExtArgs>
    }
    scalars: $Extensions.GetPayloadResult<{
      usuario: string
      comunidad: number
      estado: $Enums.Estado_Solicitud
    }, ExtArgs["result"]["solicitud"]>
    composites: {}
  }

  type SolicitudGetPayload<S extends boolean | null | undefined | SolicitudDefaultArgs> = $Result.GetResult<Prisma.$SolicitudPayload, S>

  type SolicitudCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<SolicitudFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: SolicitudCountAggregateInputType | true
    }

  export interface SolicitudDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Solicitud'], meta: { name: 'Solicitud' } }
    /**
     * Find zero or one Solicitud that matches the filter.
     * @param {SolicitudFindUniqueArgs} args - Arguments to find a Solicitud
     * @example
     * // Get one Solicitud
     * const solicitud = await prisma.solicitud.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends SolicitudFindUniqueArgs>(args: SelectSubset<T, SolicitudFindUniqueArgs<ExtArgs>>): Prisma__SolicitudClient<$Result.GetResult<Prisma.$SolicitudPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Solicitud that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {SolicitudFindUniqueOrThrowArgs} args - Arguments to find a Solicitud
     * @example
     * // Get one Solicitud
     * const solicitud = await prisma.solicitud.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends SolicitudFindUniqueOrThrowArgs>(args: SelectSubset<T, SolicitudFindUniqueOrThrowArgs<ExtArgs>>): Prisma__SolicitudClient<$Result.GetResult<Prisma.$SolicitudPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Solicitud that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitudFindFirstArgs} args - Arguments to find a Solicitud
     * @example
     * // Get one Solicitud
     * const solicitud = await prisma.solicitud.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends SolicitudFindFirstArgs>(args?: SelectSubset<T, SolicitudFindFirstArgs<ExtArgs>>): Prisma__SolicitudClient<$Result.GetResult<Prisma.$SolicitudPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Solicitud that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitudFindFirstOrThrowArgs} args - Arguments to find a Solicitud
     * @example
     * // Get one Solicitud
     * const solicitud = await prisma.solicitud.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends SolicitudFindFirstOrThrowArgs>(args?: SelectSubset<T, SolicitudFindFirstOrThrowArgs<ExtArgs>>): Prisma__SolicitudClient<$Result.GetResult<Prisma.$SolicitudPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Solicituds that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitudFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Solicituds
     * const solicituds = await prisma.solicitud.findMany()
     * 
     * // Get first 10 Solicituds
     * const solicituds = await prisma.solicitud.findMany({ take: 10 })
     * 
     * // Only select the `usuario`
     * const solicitudWithUsuarioOnly = await prisma.solicitud.findMany({ select: { usuario: true } })
     * 
     */
    findMany<T extends SolicitudFindManyArgs>(args?: SelectSubset<T, SolicitudFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitudPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Solicitud.
     * @param {SolicitudCreateArgs} args - Arguments to create a Solicitud.
     * @example
     * // Create one Solicitud
     * const Solicitud = await prisma.solicitud.create({
     *   data: {
     *     // ... data to create a Solicitud
     *   }
     * })
     * 
     */
    create<T extends SolicitudCreateArgs>(args: SelectSubset<T, SolicitudCreateArgs<ExtArgs>>): Prisma__SolicitudClient<$Result.GetResult<Prisma.$SolicitudPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Solicituds.
     * @param {SolicitudCreateManyArgs} args - Arguments to create many Solicituds.
     * @example
     * // Create many Solicituds
     * const solicitud = await prisma.solicitud.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends SolicitudCreateManyArgs>(args?: SelectSubset<T, SolicitudCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Solicituds and returns the data saved in the database.
     * @param {SolicitudCreateManyAndReturnArgs} args - Arguments to create many Solicituds.
     * @example
     * // Create many Solicituds
     * const solicitud = await prisma.solicitud.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Solicituds and only return the `usuario`
     * const solicitudWithUsuarioOnly = await prisma.solicitud.createManyAndReturn({
     *   select: { usuario: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends SolicitudCreateManyAndReturnArgs>(args?: SelectSubset<T, SolicitudCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitudPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Solicitud.
     * @param {SolicitudDeleteArgs} args - Arguments to delete one Solicitud.
     * @example
     * // Delete one Solicitud
     * const Solicitud = await prisma.solicitud.delete({
     *   where: {
     *     // ... filter to delete one Solicitud
     *   }
     * })
     * 
     */
    delete<T extends SolicitudDeleteArgs>(args: SelectSubset<T, SolicitudDeleteArgs<ExtArgs>>): Prisma__SolicitudClient<$Result.GetResult<Prisma.$SolicitudPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Solicitud.
     * @param {SolicitudUpdateArgs} args - Arguments to update one Solicitud.
     * @example
     * // Update one Solicitud
     * const solicitud = await prisma.solicitud.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends SolicitudUpdateArgs>(args: SelectSubset<T, SolicitudUpdateArgs<ExtArgs>>): Prisma__SolicitudClient<$Result.GetResult<Prisma.$SolicitudPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Solicituds.
     * @param {SolicitudDeleteManyArgs} args - Arguments to filter Solicituds to delete.
     * @example
     * // Delete a few Solicituds
     * const { count } = await prisma.solicitud.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends SolicitudDeleteManyArgs>(args?: SelectSubset<T, SolicitudDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Solicituds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitudUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Solicituds
     * const solicitud = await prisma.solicitud.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends SolicitudUpdateManyArgs>(args: SelectSubset<T, SolicitudUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Solicituds and returns the data updated in the database.
     * @param {SolicitudUpdateManyAndReturnArgs} args - Arguments to update many Solicituds.
     * @example
     * // Update many Solicituds
     * const solicitud = await prisma.solicitud.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Solicituds and only return the `usuario`
     * const solicitudWithUsuarioOnly = await prisma.solicitud.updateManyAndReturn({
     *   select: { usuario: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends SolicitudUpdateManyAndReturnArgs>(args: SelectSubset<T, SolicitudUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitudPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Solicitud.
     * @param {SolicitudUpsertArgs} args - Arguments to update or create a Solicitud.
     * @example
     * // Update or create a Solicitud
     * const solicitud = await prisma.solicitud.upsert({
     *   create: {
     *     // ... data to create a Solicitud
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Solicitud we want to update
     *   }
     * })
     */
    upsert<T extends SolicitudUpsertArgs>(args: SelectSubset<T, SolicitudUpsertArgs<ExtArgs>>): Prisma__SolicitudClient<$Result.GetResult<Prisma.$SolicitudPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Solicituds.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitudCountArgs} args - Arguments to filter Solicituds to count.
     * @example
     * // Count the number of Solicituds
     * const count = await prisma.solicitud.count({
     *   where: {
     *     // ... the filter for the Solicituds we want to count
     *   }
     * })
    **/
    count<T extends SolicitudCountArgs>(
      args?: Subset<T, SolicitudCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], SolicitudCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Solicitud.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitudAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends SolicitudAggregateArgs>(args: Subset<T, SolicitudAggregateArgs>): Prisma.PrismaPromise<GetSolicitudAggregateType<T>>

    /**
     * Group by Solicitud.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {SolicitudGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends SolicitudGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: SolicitudGroupByArgs['orderBy'] }
        : { orderBy?: SolicitudGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, SolicitudGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetSolicitudGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Solicitud model
   */
  readonly fields: SolicitudFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Solicitud.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__SolicitudClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    usuarioID<T extends UsuarioDefaultArgs<ExtArgs> = {}>(args?: Subset<T, UsuarioDefaultArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    comunidadID<T extends ComunidadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ComunidadDefaultArgs<ExtArgs>>): Prisma__ComunidadClient<$Result.GetResult<Prisma.$ComunidadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Solicitud model
   */
  interface SolicitudFieldRefs {
    readonly usuario: FieldRef<"Solicitud", 'String'>
    readonly comunidad: FieldRef<"Solicitud", 'Int'>
    readonly estado: FieldRef<"Solicitud", 'Estado_Solicitud'>
  }
    

  // Custom InputTypes
  /**
   * Solicitud findUnique
   */
  export type SolicitudFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitud
     */
    select?: SolicitudSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitud
     */
    omit?: SolicitudOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudInclude<ExtArgs> | null
    /**
     * Filter, which Solicitud to fetch.
     */
    where: SolicitudWhereUniqueInput
  }

  /**
   * Solicitud findUniqueOrThrow
   */
  export type SolicitudFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitud
     */
    select?: SolicitudSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitud
     */
    omit?: SolicitudOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudInclude<ExtArgs> | null
    /**
     * Filter, which Solicitud to fetch.
     */
    where: SolicitudWhereUniqueInput
  }

  /**
   * Solicitud findFirst
   */
  export type SolicitudFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitud
     */
    select?: SolicitudSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitud
     */
    omit?: SolicitudOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudInclude<ExtArgs> | null
    /**
     * Filter, which Solicitud to fetch.
     */
    where?: SolicitudWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Solicituds to fetch.
     */
    orderBy?: SolicitudOrderByWithRelationInput | SolicitudOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Solicituds.
     */
    cursor?: SolicitudWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Solicituds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Solicituds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Solicituds.
     */
    distinct?: SolicitudScalarFieldEnum | SolicitudScalarFieldEnum[]
  }

  /**
   * Solicitud findFirstOrThrow
   */
  export type SolicitudFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitud
     */
    select?: SolicitudSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitud
     */
    omit?: SolicitudOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudInclude<ExtArgs> | null
    /**
     * Filter, which Solicitud to fetch.
     */
    where?: SolicitudWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Solicituds to fetch.
     */
    orderBy?: SolicitudOrderByWithRelationInput | SolicitudOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Solicituds.
     */
    cursor?: SolicitudWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Solicituds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Solicituds.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Solicituds.
     */
    distinct?: SolicitudScalarFieldEnum | SolicitudScalarFieldEnum[]
  }

  /**
   * Solicitud findMany
   */
  export type SolicitudFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitud
     */
    select?: SolicitudSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitud
     */
    omit?: SolicitudOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudInclude<ExtArgs> | null
    /**
     * Filter, which Solicituds to fetch.
     */
    where?: SolicitudWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Solicituds to fetch.
     */
    orderBy?: SolicitudOrderByWithRelationInput | SolicitudOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Solicituds.
     */
    cursor?: SolicitudWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Solicituds from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Solicituds.
     */
    skip?: number
    distinct?: SolicitudScalarFieldEnum | SolicitudScalarFieldEnum[]
  }

  /**
   * Solicitud create
   */
  export type SolicitudCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitud
     */
    select?: SolicitudSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitud
     */
    omit?: SolicitudOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudInclude<ExtArgs> | null
    /**
     * The data needed to create a Solicitud.
     */
    data: XOR<SolicitudCreateInput, SolicitudUncheckedCreateInput>
  }

  /**
   * Solicitud createMany
   */
  export type SolicitudCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Solicituds.
     */
    data: SolicitudCreateManyInput | SolicitudCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Solicitud createManyAndReturn
   */
  export type SolicitudCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitud
     */
    select?: SolicitudSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitud
     */
    omit?: SolicitudOmit<ExtArgs> | null
    /**
     * The data used to create many Solicituds.
     */
    data: SolicitudCreateManyInput | SolicitudCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Solicitud update
   */
  export type SolicitudUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitud
     */
    select?: SolicitudSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitud
     */
    omit?: SolicitudOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudInclude<ExtArgs> | null
    /**
     * The data needed to update a Solicitud.
     */
    data: XOR<SolicitudUpdateInput, SolicitudUncheckedUpdateInput>
    /**
     * Choose, which Solicitud to update.
     */
    where: SolicitudWhereUniqueInput
  }

  /**
   * Solicitud updateMany
   */
  export type SolicitudUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Solicituds.
     */
    data: XOR<SolicitudUpdateManyMutationInput, SolicitudUncheckedUpdateManyInput>
    /**
     * Filter which Solicituds to update
     */
    where?: SolicitudWhereInput
    /**
     * Limit how many Solicituds to update.
     */
    limit?: number
  }

  /**
   * Solicitud updateManyAndReturn
   */
  export type SolicitudUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitud
     */
    select?: SolicitudSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitud
     */
    omit?: SolicitudOmit<ExtArgs> | null
    /**
     * The data used to update Solicituds.
     */
    data: XOR<SolicitudUpdateManyMutationInput, SolicitudUncheckedUpdateManyInput>
    /**
     * Filter which Solicituds to update
     */
    where?: SolicitudWhereInput
    /**
     * Limit how many Solicituds to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Solicitud upsert
   */
  export type SolicitudUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitud
     */
    select?: SolicitudSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitud
     */
    omit?: SolicitudOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudInclude<ExtArgs> | null
    /**
     * The filter to search for the Solicitud to update in case it exists.
     */
    where: SolicitudWhereUniqueInput
    /**
     * In case the Solicitud found by the `where` argument doesn't exist, create a new Solicitud with this data.
     */
    create: XOR<SolicitudCreateInput, SolicitudUncheckedCreateInput>
    /**
     * In case the Solicitud was found with the provided `where` argument, update it with this data.
     */
    update: XOR<SolicitudUpdateInput, SolicitudUncheckedUpdateInput>
  }

  /**
   * Solicitud delete
   */
  export type SolicitudDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitud
     */
    select?: SolicitudSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitud
     */
    omit?: SolicitudOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudInclude<ExtArgs> | null
    /**
     * Filter which Solicitud to delete.
     */
    where: SolicitudWhereUniqueInput
  }

  /**
   * Solicitud deleteMany
   */
  export type SolicitudDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Solicituds to delete
     */
    where?: SolicitudWhereInput
    /**
     * Limit how many Solicituds to delete.
     */
    limit?: number
  }

  /**
   * Solicitud without action
   */
  export type SolicitudDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitud
     */
    select?: SolicitudSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitud
     */
    omit?: SolicitudOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudInclude<ExtArgs> | null
  }


  /**
   * Model Usuario
   */

  export type AggregateUsuario = {
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  export type UsuarioAvgAggregateOutputType = {
    numero: number | null
    piso: number | null
  }

  export type UsuarioSumAggregateOutputType = {
    numero: number | null
    piso: number | null
  }

  export type UsuarioMinAggregateOutputType = {
    correo: string | null
    rol: $Enums.Role | null
    nombre_usuario: string | null
    nombre: string | null
    apellidos: string | null
    calle: string | null
    numero: number | null
    piso: number | null
    letra: string | null
    localidad: string | null
  }

  export type UsuarioMaxAggregateOutputType = {
    correo: string | null
    rol: $Enums.Role | null
    nombre_usuario: string | null
    nombre: string | null
    apellidos: string | null
    calle: string | null
    numero: number | null
    piso: number | null
    letra: string | null
    localidad: string | null
  }

  export type UsuarioCountAggregateOutputType = {
    correo: number
    rol: number
    nombre_usuario: number
    nombre: number
    apellidos: number
    calle: number
    numero: number
    piso: number
    letra: number
    localidad: number
    _all: number
  }


  export type UsuarioAvgAggregateInputType = {
    numero?: true
    piso?: true
  }

  export type UsuarioSumAggregateInputType = {
    numero?: true
    piso?: true
  }

  export type UsuarioMinAggregateInputType = {
    correo?: true
    rol?: true
    nombre_usuario?: true
    nombre?: true
    apellidos?: true
    calle?: true
    numero?: true
    piso?: true
    letra?: true
    localidad?: true
  }

  export type UsuarioMaxAggregateInputType = {
    correo?: true
    rol?: true
    nombre_usuario?: true
    nombre?: true
    apellidos?: true
    calle?: true
    numero?: true
    piso?: true
    letra?: true
    localidad?: true
  }

  export type UsuarioCountAggregateInputType = {
    correo?: true
    rol?: true
    nombre_usuario?: true
    nombre?: true
    apellidos?: true
    calle?: true
    numero?: true
    piso?: true
    letra?: true
    localidad?: true
    _all?: true
  }

  export type UsuarioAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuario to aggregate.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Usuarios
    **/
    _count?: true | UsuarioCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: UsuarioAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: UsuarioSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: UsuarioMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: UsuarioMaxAggregateInputType
  }

  export type GetUsuarioAggregateType<T extends UsuarioAggregateArgs> = {
        [P in keyof T & keyof AggregateUsuario]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateUsuario[P]>
      : GetScalarType<T[P], AggregateUsuario[P]>
  }




  export type UsuarioGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: UsuarioWhereInput
    orderBy?: UsuarioOrderByWithAggregationInput | UsuarioOrderByWithAggregationInput[]
    by: UsuarioScalarFieldEnum[] | UsuarioScalarFieldEnum
    having?: UsuarioScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: UsuarioCountAggregateInputType | true
    _avg?: UsuarioAvgAggregateInputType
    _sum?: UsuarioSumAggregateInputType
    _min?: UsuarioMinAggregateInputType
    _max?: UsuarioMaxAggregateInputType
  }

  export type UsuarioGroupByOutputType = {
    correo: string
    rol: $Enums.Role
    nombre_usuario: string
    nombre: string
    apellidos: string
    calle: string
    numero: number
    piso: number | null
    letra: string | null
    localidad: string
    _count: UsuarioCountAggregateOutputType | null
    _avg: UsuarioAvgAggregateOutputType | null
    _sum: UsuarioSumAggregateOutputType | null
    _min: UsuarioMinAggregateOutputType | null
    _max: UsuarioMaxAggregateOutputType | null
  }

  type GetUsuarioGroupByPayload<T extends UsuarioGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<UsuarioGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof UsuarioGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
            : GetScalarType<T[P], UsuarioGroupByOutputType[P]>
        }
      >
    >


  export type UsuarioSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    correo?: boolean
    rol?: boolean
    nombre_usuario?: boolean
    nombre?: boolean
    apellidos?: boolean
    calle?: boolean
    numero?: boolean
    piso?: boolean
    letra?: boolean
    localidad?: boolean
    credenciales?: boolean | Usuario$credencialesArgs<ExtArgs>
    incidencias?: boolean | Usuario$incidenciasArgs<ExtArgs>
    reservas?: boolean | Usuario$reservasArgs<ExtArgs>
    inscripciones?: boolean | Usuario$inscripcionesArgs<ExtArgs>
    solicitudes?: boolean | Usuario$solicitudesArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    correo?: boolean
    rol?: boolean
    nombre_usuario?: boolean
    nombre?: boolean
    apellidos?: boolean
    calle?: boolean
    numero?: boolean
    piso?: boolean
    letra?: boolean
    localidad?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    correo?: boolean
    rol?: boolean
    nombre_usuario?: boolean
    nombre?: boolean
    apellidos?: boolean
    calle?: boolean
    numero?: boolean
    piso?: boolean
    letra?: boolean
    localidad?: boolean
  }, ExtArgs["result"]["usuario"]>

  export type UsuarioSelectScalar = {
    correo?: boolean
    rol?: boolean
    nombre_usuario?: boolean
    nombre?: boolean
    apellidos?: boolean
    calle?: boolean
    numero?: boolean
    piso?: boolean
    letra?: boolean
    localidad?: boolean
  }

  export type UsuarioOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"correo" | "rol" | "nombre_usuario" | "nombre" | "apellidos" | "calle" | "numero" | "piso" | "letra" | "localidad", ExtArgs["result"]["usuario"]>
  export type UsuarioInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    credenciales?: boolean | Usuario$credencialesArgs<ExtArgs>
    incidencias?: boolean | Usuario$incidenciasArgs<ExtArgs>
    reservas?: boolean | Usuario$reservasArgs<ExtArgs>
    inscripciones?: boolean | Usuario$inscripcionesArgs<ExtArgs>
    solicitudes?: boolean | Usuario$solicitudesArgs<ExtArgs>
    _count?: boolean | UsuarioCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type UsuarioIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}
  export type UsuarioIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {}

  export type $UsuarioPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Usuario"
    objects: {
      credenciales: Prisma.$CredencialesPayload<ExtArgs> | null
      incidencias: Prisma.$IncidenciaPayload<ExtArgs>[]
      reservas: Prisma.$ReservaPayload<ExtArgs>[]
      inscripciones: Prisma.$InscripcionPayload<ExtArgs>[]
      solicitudes: Prisma.$SolicitudPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      correo: string
      rol: $Enums.Role
      nombre_usuario: string
      nombre: string
      apellidos: string
      calle: string
      numero: number
      piso: number | null
      letra: string | null
      localidad: string
    }, ExtArgs["result"]["usuario"]>
    composites: {}
  }

  type UsuarioGetPayload<S extends boolean | null | undefined | UsuarioDefaultArgs> = $Result.GetResult<Prisma.$UsuarioPayload, S>

  type UsuarioCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<UsuarioFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: UsuarioCountAggregateInputType | true
    }

  export interface UsuarioDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Usuario'], meta: { name: 'Usuario' } }
    /**
     * Find zero or one Usuario that matches the filter.
     * @param {UsuarioFindUniqueArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends UsuarioFindUniqueArgs>(args: SelectSubset<T, UsuarioFindUniqueArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Usuario that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {UsuarioFindUniqueOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends UsuarioFindUniqueOrThrowArgs>(args: SelectSubset<T, UsuarioFindUniqueOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends UsuarioFindFirstArgs>(args?: SelectSubset<T, UsuarioFindFirstArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Usuario that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindFirstOrThrowArgs} args - Arguments to find a Usuario
     * @example
     * // Get one Usuario
     * const usuario = await prisma.usuario.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends UsuarioFindFirstOrThrowArgs>(args?: SelectSubset<T, UsuarioFindFirstOrThrowArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Usuarios that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Usuarios
     * const usuarios = await prisma.usuario.findMany()
     * 
     * // Get first 10 Usuarios
     * const usuarios = await prisma.usuario.findMany({ take: 10 })
     * 
     * // Only select the `correo`
     * const usuarioWithCorreoOnly = await prisma.usuario.findMany({ select: { correo: true } })
     * 
     */
    findMany<T extends UsuarioFindManyArgs>(args?: SelectSubset<T, UsuarioFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Usuario.
     * @param {UsuarioCreateArgs} args - Arguments to create a Usuario.
     * @example
     * // Create one Usuario
     * const Usuario = await prisma.usuario.create({
     *   data: {
     *     // ... data to create a Usuario
     *   }
     * })
     * 
     */
    create<T extends UsuarioCreateArgs>(args: SelectSubset<T, UsuarioCreateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Usuarios.
     * @param {UsuarioCreateManyArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends UsuarioCreateManyArgs>(args?: SelectSubset<T, UsuarioCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Usuarios and returns the data saved in the database.
     * @param {UsuarioCreateManyAndReturnArgs} args - Arguments to create many Usuarios.
     * @example
     * // Create many Usuarios
     * const usuario = await prisma.usuario.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Usuarios and only return the `correo`
     * const usuarioWithCorreoOnly = await prisma.usuario.createManyAndReturn({
     *   select: { correo: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends UsuarioCreateManyAndReturnArgs>(args?: SelectSubset<T, UsuarioCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Usuario.
     * @param {UsuarioDeleteArgs} args - Arguments to delete one Usuario.
     * @example
     * // Delete one Usuario
     * const Usuario = await prisma.usuario.delete({
     *   where: {
     *     // ... filter to delete one Usuario
     *   }
     * })
     * 
     */
    delete<T extends UsuarioDeleteArgs>(args: SelectSubset<T, UsuarioDeleteArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Usuario.
     * @param {UsuarioUpdateArgs} args - Arguments to update one Usuario.
     * @example
     * // Update one Usuario
     * const usuario = await prisma.usuario.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends UsuarioUpdateArgs>(args: SelectSubset<T, UsuarioUpdateArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Usuarios.
     * @param {UsuarioDeleteManyArgs} args - Arguments to filter Usuarios to delete.
     * @example
     * // Delete a few Usuarios
     * const { count } = await prisma.usuario.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends UsuarioDeleteManyArgs>(args?: SelectSubset<T, UsuarioDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends UsuarioUpdateManyArgs>(args: SelectSubset<T, UsuarioUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Usuarios and returns the data updated in the database.
     * @param {UsuarioUpdateManyAndReturnArgs} args - Arguments to update many Usuarios.
     * @example
     * // Update many Usuarios
     * const usuario = await prisma.usuario.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Usuarios and only return the `correo`
     * const usuarioWithCorreoOnly = await prisma.usuario.updateManyAndReturn({
     *   select: { correo: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends UsuarioUpdateManyAndReturnArgs>(args: SelectSubset<T, UsuarioUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Usuario.
     * @param {UsuarioUpsertArgs} args - Arguments to update or create a Usuario.
     * @example
     * // Update or create a Usuario
     * const usuario = await prisma.usuario.upsert({
     *   create: {
     *     // ... data to create a Usuario
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Usuario we want to update
     *   }
     * })
     */
    upsert<T extends UsuarioUpsertArgs>(args: SelectSubset<T, UsuarioUpsertArgs<ExtArgs>>): Prisma__UsuarioClient<$Result.GetResult<Prisma.$UsuarioPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Usuarios.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioCountArgs} args - Arguments to filter Usuarios to count.
     * @example
     * // Count the number of Usuarios
     * const count = await prisma.usuario.count({
     *   where: {
     *     // ... the filter for the Usuarios we want to count
     *   }
     * })
    **/
    count<T extends UsuarioCountArgs>(
      args?: Subset<T, UsuarioCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], UsuarioCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends UsuarioAggregateArgs>(args: Subset<T, UsuarioAggregateArgs>): Prisma.PrismaPromise<GetUsuarioAggregateType<T>>

    /**
     * Group by Usuario.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {UsuarioGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends UsuarioGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: UsuarioGroupByArgs['orderBy'] }
        : { orderBy?: UsuarioGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, UsuarioGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetUsuarioGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Usuario model
   */
  readonly fields: UsuarioFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Usuario.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__UsuarioClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    credenciales<T extends Usuario$credencialesArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$credencialesArgs<ExtArgs>>): Prisma__CredencialesClient<$Result.GetResult<Prisma.$CredencialesPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>
    incidencias<T extends Usuario$incidenciasArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$incidenciasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$IncidenciaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    reservas<T extends Usuario$reservasArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$reservasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    inscripciones<T extends Usuario$inscripcionesArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$inscripcionesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$InscripcionPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    solicitudes<T extends Usuario$solicitudesArgs<ExtArgs> = {}>(args?: Subset<T, Usuario$solicitudesArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$SolicitudPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Usuario model
   */
  interface UsuarioFieldRefs {
    readonly correo: FieldRef<"Usuario", 'String'>
    readonly rol: FieldRef<"Usuario", 'Role'>
    readonly nombre_usuario: FieldRef<"Usuario", 'String'>
    readonly nombre: FieldRef<"Usuario", 'String'>
    readonly apellidos: FieldRef<"Usuario", 'String'>
    readonly calle: FieldRef<"Usuario", 'String'>
    readonly numero: FieldRef<"Usuario", 'Int'>
    readonly piso: FieldRef<"Usuario", 'Int'>
    readonly letra: FieldRef<"Usuario", 'String'>
    readonly localidad: FieldRef<"Usuario", 'String'>
  }
    

  // Custom InputTypes
  /**
   * Usuario findUnique
   */
  export type UsuarioFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findUniqueOrThrow
   */
  export type UsuarioFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario findFirst
   */
  export type UsuarioFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findFirstOrThrow
   */
  export type UsuarioFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuario to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Usuarios.
     */
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario findMany
   */
  export type UsuarioFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter, which Usuarios to fetch.
     */
    where?: UsuarioWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Usuarios to fetch.
     */
    orderBy?: UsuarioOrderByWithRelationInput | UsuarioOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Usuarios.
     */
    cursor?: UsuarioWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Usuarios from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Usuarios.
     */
    skip?: number
    distinct?: UsuarioScalarFieldEnum | UsuarioScalarFieldEnum[]
  }

  /**
   * Usuario create
   */
  export type UsuarioCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to create a Usuario.
     */
    data: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
  }

  /**
   * Usuario createMany
   */
  export type UsuarioCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario createManyAndReturn
   */
  export type UsuarioCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to create many Usuarios.
     */
    data: UsuarioCreateManyInput | UsuarioCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Usuario update
   */
  export type UsuarioUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The data needed to update a Usuario.
     */
    data: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
    /**
     * Choose, which Usuario to update.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario updateMany
   */
  export type UsuarioUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario updateManyAndReturn
   */
  export type UsuarioUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * The data used to update Usuarios.
     */
    data: XOR<UsuarioUpdateManyMutationInput, UsuarioUncheckedUpdateManyInput>
    /**
     * Filter which Usuarios to update
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to update.
     */
    limit?: number
  }

  /**
   * Usuario upsert
   */
  export type UsuarioUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * The filter to search for the Usuario to update in case it exists.
     */
    where: UsuarioWhereUniqueInput
    /**
     * In case the Usuario found by the `where` argument doesn't exist, create a new Usuario with this data.
     */
    create: XOR<UsuarioCreateInput, UsuarioUncheckedCreateInput>
    /**
     * In case the Usuario was found with the provided `where` argument, update it with this data.
     */
    update: XOR<UsuarioUpdateInput, UsuarioUncheckedUpdateInput>
  }

  /**
   * Usuario delete
   */
  export type UsuarioDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
    /**
     * Filter which Usuario to delete.
     */
    where: UsuarioWhereUniqueInput
  }

  /**
   * Usuario deleteMany
   */
  export type UsuarioDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Usuarios to delete
     */
    where?: UsuarioWhereInput
    /**
     * Limit how many Usuarios to delete.
     */
    limit?: number
  }

  /**
   * Usuario.credenciales
   */
  export type Usuario$credencialesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Credenciales
     */
    select?: CredencialesSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Credenciales
     */
    omit?: CredencialesOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: CredencialesInclude<ExtArgs> | null
    where?: CredencialesWhereInput
  }

  /**
   * Usuario.incidencias
   */
  export type Usuario$incidenciasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Incidencia
     */
    select?: IncidenciaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Incidencia
     */
    omit?: IncidenciaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: IncidenciaInclude<ExtArgs> | null
    where?: IncidenciaWhereInput
    orderBy?: IncidenciaOrderByWithRelationInput | IncidenciaOrderByWithRelationInput[]
    cursor?: IncidenciaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: IncidenciaScalarFieldEnum | IncidenciaScalarFieldEnum[]
  }

  /**
   * Usuario.reservas
   */
  export type Usuario$reservasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reserva
     */
    select?: ReservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reserva
     */
    omit?: ReservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservaInclude<ExtArgs> | null
    where?: ReservaWhereInput
    orderBy?: ReservaOrderByWithRelationInput | ReservaOrderByWithRelationInput[]
    cursor?: ReservaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReservaScalarFieldEnum | ReservaScalarFieldEnum[]
  }

  /**
   * Usuario.inscripciones
   */
  export type Usuario$inscripcionesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Inscripcion
     */
    select?: InscripcionSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Inscripcion
     */
    omit?: InscripcionOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: InscripcionInclude<ExtArgs> | null
    where?: InscripcionWhereInput
    orderBy?: InscripcionOrderByWithRelationInput | InscripcionOrderByWithRelationInput[]
    cursor?: InscripcionWhereUniqueInput
    take?: number
    skip?: number
    distinct?: InscripcionScalarFieldEnum | InscripcionScalarFieldEnum[]
  }

  /**
   * Usuario.solicitudes
   */
  export type Usuario$solicitudesArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Solicitud
     */
    select?: SolicitudSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Solicitud
     */
    omit?: SolicitudOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: SolicitudInclude<ExtArgs> | null
    where?: SolicitudWhereInput
    orderBy?: SolicitudOrderByWithRelationInput | SolicitudOrderByWithRelationInput[]
    cursor?: SolicitudWhereUniqueInput
    take?: number
    skip?: number
    distinct?: SolicitudScalarFieldEnum | SolicitudScalarFieldEnum[]
  }

  /**
   * Usuario without action
   */
  export type UsuarioDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Usuario
     */
    select?: UsuarioSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Usuario
     */
    omit?: UsuarioOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: UsuarioInclude<ExtArgs> | null
  }


  /**
   * Model Zona
   */

  export type AggregateZona = {
    _count: ZonaCountAggregateOutputType | null
    _avg: ZonaAvgAggregateOutputType | null
    _sum: ZonaSumAggregateOutputType | null
    _min: ZonaMinAggregateOutputType | null
    _max: ZonaMaxAggregateOutputType | null
  }

  export type ZonaAvgAggregateOutputType = {
    comunidad: number | null
  }

  export type ZonaSumAggregateOutputType = {
    comunidad: number | null
  }

  export type ZonaMinAggregateOutputType = {
    nombre: string | null
    comunidad: number | null
    descripcion: string | null
    imagen: string | null
    hora_inicio: Date | null
    hora_fin: Date | null
  }

  export type ZonaMaxAggregateOutputType = {
    nombre: string | null
    comunidad: number | null
    descripcion: string | null
    imagen: string | null
    hora_inicio: Date | null
    hora_fin: Date | null
  }

  export type ZonaCountAggregateOutputType = {
    nombre: number
    comunidad: number
    descripcion: number
    imagen: number
    hora_inicio: number
    hora_fin: number
    _all: number
  }


  export type ZonaAvgAggregateInputType = {
    comunidad?: true
  }

  export type ZonaSumAggregateInputType = {
    comunidad?: true
  }

  export type ZonaMinAggregateInputType = {
    nombre?: true
    comunidad?: true
    descripcion?: true
    imagen?: true
    hora_inicio?: true
    hora_fin?: true
  }

  export type ZonaMaxAggregateInputType = {
    nombre?: true
    comunidad?: true
    descripcion?: true
    imagen?: true
    hora_inicio?: true
    hora_fin?: true
  }

  export type ZonaCountAggregateInputType = {
    nombre?: true
    comunidad?: true
    descripcion?: true
    imagen?: true
    hora_inicio?: true
    hora_fin?: true
    _all?: true
  }

  export type ZonaAggregateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Zona to aggregate.
     */
    where?: ZonaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Zonas to fetch.
     */
    orderBy?: ZonaOrderByWithRelationInput | ZonaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the start position
     */
    cursor?: ZonaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Zonas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Zonas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Count returned Zonas
    **/
    _count?: true | ZonaCountAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to average
    **/
    _avg?: ZonaAvgAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to sum
    **/
    _sum?: ZonaSumAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the minimum value
    **/
    _min?: ZonaMinAggregateInputType
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/aggregations Aggregation Docs}
     * 
     * Select which fields to find the maximum value
    **/
    _max?: ZonaMaxAggregateInputType
  }

  export type GetZonaAggregateType<T extends ZonaAggregateArgs> = {
        [P in keyof T & keyof AggregateZona]: P extends '_count' | 'count'
      ? T[P] extends true
        ? number
        : GetScalarType<T[P], AggregateZona[P]>
      : GetScalarType<T[P], AggregateZona[P]>
  }




  export type ZonaGroupByArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    where?: ZonaWhereInput
    orderBy?: ZonaOrderByWithAggregationInput | ZonaOrderByWithAggregationInput[]
    by: ZonaScalarFieldEnum[] | ZonaScalarFieldEnum
    having?: ZonaScalarWhereWithAggregatesInput
    take?: number
    skip?: number
    _count?: ZonaCountAggregateInputType | true
    _avg?: ZonaAvgAggregateInputType
    _sum?: ZonaSumAggregateInputType
    _min?: ZonaMinAggregateInputType
    _max?: ZonaMaxAggregateInputType
  }

  export type ZonaGroupByOutputType = {
    nombre: string
    comunidad: number
    descripcion: string
    imagen: string | null
    hora_inicio: Date
    hora_fin: Date
    _count: ZonaCountAggregateOutputType | null
    _avg: ZonaAvgAggregateOutputType | null
    _sum: ZonaSumAggregateOutputType | null
    _min: ZonaMinAggregateOutputType | null
    _max: ZonaMaxAggregateOutputType | null
  }

  type GetZonaGroupByPayload<T extends ZonaGroupByArgs> = Prisma.PrismaPromise<
    Array<
      PickEnumerable<ZonaGroupByOutputType, T['by']> &
        {
          [P in ((keyof T) & (keyof ZonaGroupByOutputType))]: P extends '_count'
            ? T[P] extends boolean
              ? number
              : GetScalarType<T[P], ZonaGroupByOutputType[P]>
            : GetScalarType<T[P], ZonaGroupByOutputType[P]>
        }
      >
    >


  export type ZonaSelect<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    nombre?: boolean
    comunidad?: boolean
    descripcion?: boolean
    imagen?: boolean
    hora_inicio?: boolean
    hora_fin?: boolean
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
    reservas?: boolean | Zona$reservasArgs<ExtArgs>
    _count?: boolean | ZonaCountOutputTypeDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["zona"]>

  export type ZonaSelectCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    nombre?: boolean
    comunidad?: boolean
    descripcion?: boolean
    imagen?: boolean
    hora_inicio?: boolean
    hora_fin?: boolean
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["zona"]>

  export type ZonaSelectUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetSelect<{
    nombre?: boolean
    comunidad?: boolean
    descripcion?: boolean
    imagen?: boolean
    hora_inicio?: boolean
    hora_fin?: boolean
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }, ExtArgs["result"]["zona"]>

  export type ZonaSelectScalar = {
    nombre?: boolean
    comunidad?: boolean
    descripcion?: boolean
    imagen?: boolean
    hora_inicio?: boolean
    hora_fin?: boolean
  }

  export type ZonaOmit<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = $Extensions.GetOmit<"nombre" | "comunidad" | "descripcion" | "imagen" | "hora_inicio" | "hora_fin", ExtArgs["result"]["zona"]>
  export type ZonaInclude<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
    reservas?: boolean | Zona$reservasArgs<ExtArgs>
    _count?: boolean | ZonaCountOutputTypeDefaultArgs<ExtArgs>
  }
  export type ZonaIncludeCreateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }
  export type ZonaIncludeUpdateManyAndReturn<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    comunidadID?: boolean | ComunidadDefaultArgs<ExtArgs>
  }

  export type $ZonaPayload<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    name: "Zona"
    objects: {
      comunidadID: Prisma.$ComunidadPayload<ExtArgs>
      reservas: Prisma.$ReservaPayload<ExtArgs>[]
    }
    scalars: $Extensions.GetPayloadResult<{
      nombre: string
      comunidad: number
      descripcion: string
      imagen: string | null
      hora_inicio: Date
      hora_fin: Date
    }, ExtArgs["result"]["zona"]>
    composites: {}
  }

  type ZonaGetPayload<S extends boolean | null | undefined | ZonaDefaultArgs> = $Result.GetResult<Prisma.$ZonaPayload, S>

  type ZonaCountArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> =
    Omit<ZonaFindManyArgs, 'select' | 'include' | 'distinct' | 'omit'> & {
      select?: ZonaCountAggregateInputType | true
    }

  export interface ZonaDelegate<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> {
    [K: symbol]: { types: Prisma.TypeMap<ExtArgs>['model']['Zona'], meta: { name: 'Zona' } }
    /**
     * Find zero or one Zona that matches the filter.
     * @param {ZonaFindUniqueArgs} args - Arguments to find a Zona
     * @example
     * // Get one Zona
     * const zona = await prisma.zona.findUnique({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUnique<T extends ZonaFindUniqueArgs>(args: SelectSubset<T, ZonaFindUniqueArgs<ExtArgs>>): Prisma__ZonaClient<$Result.GetResult<Prisma.$ZonaPayload<ExtArgs>, T, "findUnique", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find one Zona that matches the filter or throw an error with `error.code='P2025'`
     * if no matches were found.
     * @param {ZonaFindUniqueOrThrowArgs} args - Arguments to find a Zona
     * @example
     * // Get one Zona
     * const zona = await prisma.zona.findUniqueOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findUniqueOrThrow<T extends ZonaFindUniqueOrThrowArgs>(args: SelectSubset<T, ZonaFindUniqueOrThrowArgs<ExtArgs>>): Prisma__ZonaClient<$Result.GetResult<Prisma.$ZonaPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Zona that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZonaFindFirstArgs} args - Arguments to find a Zona
     * @example
     * // Get one Zona
     * const zona = await prisma.zona.findFirst({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirst<T extends ZonaFindFirstArgs>(args?: SelectSubset<T, ZonaFindFirstArgs<ExtArgs>>): Prisma__ZonaClient<$Result.GetResult<Prisma.$ZonaPayload<ExtArgs>, T, "findFirst", GlobalOmitOptions> | null, null, ExtArgs, GlobalOmitOptions>

    /**
     * Find the first Zona that matches the filter or
     * throw `PrismaKnownClientError` with `P2025` code if no matches were found.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZonaFindFirstOrThrowArgs} args - Arguments to find a Zona
     * @example
     * // Get one Zona
     * const zona = await prisma.zona.findFirstOrThrow({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     */
    findFirstOrThrow<T extends ZonaFindFirstOrThrowArgs>(args?: SelectSubset<T, ZonaFindFirstOrThrowArgs<ExtArgs>>): Prisma__ZonaClient<$Result.GetResult<Prisma.$ZonaPayload<ExtArgs>, T, "findFirstOrThrow", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Find zero or more Zonas that matches the filter.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZonaFindManyArgs} args - Arguments to filter and select certain fields only.
     * @example
     * // Get all Zonas
     * const zonas = await prisma.zona.findMany()
     * 
     * // Get first 10 Zonas
     * const zonas = await prisma.zona.findMany({ take: 10 })
     * 
     * // Only select the `nombre`
     * const zonaWithNombreOnly = await prisma.zona.findMany({ select: { nombre: true } })
     * 
     */
    findMany<T extends ZonaFindManyArgs>(args?: SelectSubset<T, ZonaFindManyArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ZonaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions>>

    /**
     * Create a Zona.
     * @param {ZonaCreateArgs} args - Arguments to create a Zona.
     * @example
     * // Create one Zona
     * const Zona = await prisma.zona.create({
     *   data: {
     *     // ... data to create a Zona
     *   }
     * })
     * 
     */
    create<T extends ZonaCreateArgs>(args: SelectSubset<T, ZonaCreateArgs<ExtArgs>>): Prisma__ZonaClient<$Result.GetResult<Prisma.$ZonaPayload<ExtArgs>, T, "create", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Create many Zonas.
     * @param {ZonaCreateManyArgs} args - Arguments to create many Zonas.
     * @example
     * // Create many Zonas
     * const zona = await prisma.zona.createMany({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     *     
     */
    createMany<T extends ZonaCreateManyArgs>(args?: SelectSubset<T, ZonaCreateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Create many Zonas and returns the data saved in the database.
     * @param {ZonaCreateManyAndReturnArgs} args - Arguments to create many Zonas.
     * @example
     * // Create many Zonas
     * const zona = await prisma.zona.createManyAndReturn({
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Create many Zonas and only return the `nombre`
     * const zonaWithNombreOnly = await prisma.zona.createManyAndReturn({
     *   select: { nombre: true },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    createManyAndReturn<T extends ZonaCreateManyAndReturnArgs>(args?: SelectSubset<T, ZonaCreateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ZonaPayload<ExtArgs>, T, "createManyAndReturn", GlobalOmitOptions>>

    /**
     * Delete a Zona.
     * @param {ZonaDeleteArgs} args - Arguments to delete one Zona.
     * @example
     * // Delete one Zona
     * const Zona = await prisma.zona.delete({
     *   where: {
     *     // ... filter to delete one Zona
     *   }
     * })
     * 
     */
    delete<T extends ZonaDeleteArgs>(args: SelectSubset<T, ZonaDeleteArgs<ExtArgs>>): Prisma__ZonaClient<$Result.GetResult<Prisma.$ZonaPayload<ExtArgs>, T, "delete", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Update one Zona.
     * @param {ZonaUpdateArgs} args - Arguments to update one Zona.
     * @example
     * // Update one Zona
     * const zona = await prisma.zona.update({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    update<T extends ZonaUpdateArgs>(args: SelectSubset<T, ZonaUpdateArgs<ExtArgs>>): Prisma__ZonaClient<$Result.GetResult<Prisma.$ZonaPayload<ExtArgs>, T, "update", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>

    /**
     * Delete zero or more Zonas.
     * @param {ZonaDeleteManyArgs} args - Arguments to filter Zonas to delete.
     * @example
     * // Delete a few Zonas
     * const { count } = await prisma.zona.deleteMany({
     *   where: {
     *     // ... provide filter here
     *   }
     * })
     * 
     */
    deleteMany<T extends ZonaDeleteManyArgs>(args?: SelectSubset<T, ZonaDeleteManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Zonas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZonaUpdateManyArgs} args - Arguments to update one or more rows.
     * @example
     * // Update many Zonas
     * const zona = await prisma.zona.updateMany({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: {
     *     // ... provide data here
     *   }
     * })
     * 
     */
    updateMany<T extends ZonaUpdateManyArgs>(args: SelectSubset<T, ZonaUpdateManyArgs<ExtArgs>>): Prisma.PrismaPromise<BatchPayload>

    /**
     * Update zero or more Zonas and returns the data updated in the database.
     * @param {ZonaUpdateManyAndReturnArgs} args - Arguments to update many Zonas.
     * @example
     * // Update many Zonas
     * const zona = await prisma.zona.updateManyAndReturn({
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * 
     * // Update zero or more Zonas and only return the `nombre`
     * const zonaWithNombreOnly = await prisma.zona.updateManyAndReturn({
     *   select: { nombre: true },
     *   where: {
     *     // ... provide filter here
     *   },
     *   data: [
     *     // ... provide data here
     *   ]
     * })
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * 
     */
    updateManyAndReturn<T extends ZonaUpdateManyAndReturnArgs>(args: SelectSubset<T, ZonaUpdateManyAndReturnArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ZonaPayload<ExtArgs>, T, "updateManyAndReturn", GlobalOmitOptions>>

    /**
     * Create or update one Zona.
     * @param {ZonaUpsertArgs} args - Arguments to update or create a Zona.
     * @example
     * // Update or create a Zona
     * const zona = await prisma.zona.upsert({
     *   create: {
     *     // ... data to create a Zona
     *   },
     *   update: {
     *     // ... in case it already exists, update
     *   },
     *   where: {
     *     // ... the filter for the Zona we want to update
     *   }
     * })
     */
    upsert<T extends ZonaUpsertArgs>(args: SelectSubset<T, ZonaUpsertArgs<ExtArgs>>): Prisma__ZonaClient<$Result.GetResult<Prisma.$ZonaPayload<ExtArgs>, T, "upsert", GlobalOmitOptions>, never, ExtArgs, GlobalOmitOptions>


    /**
     * Count the number of Zonas.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZonaCountArgs} args - Arguments to filter Zonas to count.
     * @example
     * // Count the number of Zonas
     * const count = await prisma.zona.count({
     *   where: {
     *     // ... the filter for the Zonas we want to count
     *   }
     * })
    **/
    count<T extends ZonaCountArgs>(
      args?: Subset<T, ZonaCountArgs>,
    ): Prisma.PrismaPromise<
      T extends $Utils.Record<'select', any>
        ? T['select'] extends true
          ? number
          : GetScalarType<T['select'], ZonaCountAggregateOutputType>
        : number
    >

    /**
     * Allows you to perform aggregations operations on a Zona.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZonaAggregateArgs} args - Select which aggregations you would like to apply and on what fields.
     * @example
     * // Ordered by age ascending
     * // Where email contains prisma.io
     * // Limited to the 10 users
     * const aggregations = await prisma.user.aggregate({
     *   _avg: {
     *     age: true,
     *   },
     *   where: {
     *     email: {
     *       contains: "prisma.io",
     *     },
     *   },
     *   orderBy: {
     *     age: "asc",
     *   },
     *   take: 10,
     * })
    **/
    aggregate<T extends ZonaAggregateArgs>(args: Subset<T, ZonaAggregateArgs>): Prisma.PrismaPromise<GetZonaAggregateType<T>>

    /**
     * Group by Zona.
     * Note, that providing `undefined` is treated as the value not being there.
     * Read more here: https://pris.ly/d/null-undefined
     * @param {ZonaGroupByArgs} args - Group by arguments.
     * @example
     * // Group by city, order by createdAt, get count
     * const result = await prisma.user.groupBy({
     *   by: ['city', 'createdAt'],
     *   orderBy: {
     *     createdAt: true
     *   },
     *   _count: {
     *     _all: true
     *   },
     * })
     * 
    **/
    groupBy<
      T extends ZonaGroupByArgs,
      HasSelectOrTake extends Or<
        Extends<'skip', Keys<T>>,
        Extends<'take', Keys<T>>
      >,
      OrderByArg extends True extends HasSelectOrTake
        ? { orderBy: ZonaGroupByArgs['orderBy'] }
        : { orderBy?: ZonaGroupByArgs['orderBy'] },
      OrderFields extends ExcludeUnderscoreKeys<Keys<MaybeTupleToUnion<T['orderBy']>>>,
      ByFields extends MaybeTupleToUnion<T['by']>,
      ByValid extends Has<ByFields, OrderFields>,
      HavingFields extends GetHavingFields<T['having']>,
      HavingValid extends Has<ByFields, HavingFields>,
      ByEmpty extends T['by'] extends never[] ? True : False,
      InputErrors extends ByEmpty extends True
      ? `Error: "by" must not be empty.`
      : HavingValid extends False
      ? {
          [P in HavingFields]: P extends ByFields
            ? never
            : P extends string
            ? `Error: Field "${P}" used in "having" needs to be provided in "by".`
            : [
                Error,
                'Field ',
                P,
                ` in "having" needs to be provided in "by"`,
              ]
        }[HavingFields]
      : 'take' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "take", you also need to provide "orderBy"'
      : 'skip' extends Keys<T>
      ? 'orderBy' extends Keys<T>
        ? ByValid extends True
          ? {}
          : {
              [P in OrderFields]: P extends ByFields
                ? never
                : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
            }[OrderFields]
        : 'Error: If you provide "skip", you also need to provide "orderBy"'
      : ByValid extends True
      ? {}
      : {
          [P in OrderFields]: P extends ByFields
            ? never
            : `Error: Field "${P}" in "orderBy" needs to be provided in "by"`
        }[OrderFields]
    >(args: SubsetIntersection<T, ZonaGroupByArgs, OrderByArg> & InputErrors): {} extends InputErrors ? GetZonaGroupByPayload<T> : Prisma.PrismaPromise<InputErrors>
  /**
   * Fields of the Zona model
   */
  readonly fields: ZonaFieldRefs;
  }

  /**
   * The delegate class that acts as a "Promise-like" for Zona.
   * Why is this prefixed with `Prisma__`?
   * Because we want to prevent naming conflicts as mentioned in
   * https://github.com/prisma/prisma-client-js/issues/707
   */
  export interface Prisma__ZonaClient<T, Null = never, ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs, GlobalOmitOptions = {}> extends Prisma.PrismaPromise<T> {
    readonly [Symbol.toStringTag]: "PrismaPromise"
    comunidadID<T extends ComunidadDefaultArgs<ExtArgs> = {}>(args?: Subset<T, ComunidadDefaultArgs<ExtArgs>>): Prisma__ComunidadClient<$Result.GetResult<Prisma.$ComunidadPayload<ExtArgs>, T, "findUniqueOrThrow", GlobalOmitOptions> | Null, Null, ExtArgs, GlobalOmitOptions>
    reservas<T extends Zona$reservasArgs<ExtArgs> = {}>(args?: Subset<T, Zona$reservasArgs<ExtArgs>>): Prisma.PrismaPromise<$Result.GetResult<Prisma.$ReservaPayload<ExtArgs>, T, "findMany", GlobalOmitOptions> | Null>
    /**
     * Attaches callbacks for the resolution and/or rejection of the Promise.
     * @param onfulfilled The callback to execute when the Promise is resolved.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of which ever callback is executed.
     */
    then<TResult1 = T, TResult2 = never>(onfulfilled?: ((value: T) => TResult1 | PromiseLike<TResult1>) | undefined | null, onrejected?: ((reason: any) => TResult2 | PromiseLike<TResult2>) | undefined | null): $Utils.JsPromise<TResult1 | TResult2>
    /**
     * Attaches a callback for only the rejection of the Promise.
     * @param onrejected The callback to execute when the Promise is rejected.
     * @returns A Promise for the completion of the callback.
     */
    catch<TResult = never>(onrejected?: ((reason: any) => TResult | PromiseLike<TResult>) | undefined | null): $Utils.JsPromise<T | TResult>
    /**
     * Attaches a callback that is invoked when the Promise is settled (fulfilled or rejected). The
     * resolved value cannot be modified from the callback.
     * @param onfinally The callback to execute when the Promise is settled (fulfilled or rejected).
     * @returns A Promise for the completion of the callback.
     */
    finally(onfinally?: (() => void) | undefined | null): $Utils.JsPromise<T>
  }




  /**
   * Fields of the Zona model
   */
  interface ZonaFieldRefs {
    readonly nombre: FieldRef<"Zona", 'String'>
    readonly comunidad: FieldRef<"Zona", 'Int'>
    readonly descripcion: FieldRef<"Zona", 'String'>
    readonly imagen: FieldRef<"Zona", 'String'>
    readonly hora_inicio: FieldRef<"Zona", 'DateTime'>
    readonly hora_fin: FieldRef<"Zona", 'DateTime'>
  }
    

  // Custom InputTypes
  /**
   * Zona findUnique
   */
  export type ZonaFindUniqueArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zona
     */
    select?: ZonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zona
     */
    omit?: ZonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZonaInclude<ExtArgs> | null
    /**
     * Filter, which Zona to fetch.
     */
    where: ZonaWhereUniqueInput
  }

  /**
   * Zona findUniqueOrThrow
   */
  export type ZonaFindUniqueOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zona
     */
    select?: ZonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zona
     */
    omit?: ZonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZonaInclude<ExtArgs> | null
    /**
     * Filter, which Zona to fetch.
     */
    where: ZonaWhereUniqueInput
  }

  /**
   * Zona findFirst
   */
  export type ZonaFindFirstArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zona
     */
    select?: ZonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zona
     */
    omit?: ZonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZonaInclude<ExtArgs> | null
    /**
     * Filter, which Zona to fetch.
     */
    where?: ZonaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Zonas to fetch.
     */
    orderBy?: ZonaOrderByWithRelationInput | ZonaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Zonas.
     */
    cursor?: ZonaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Zonas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Zonas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Zonas.
     */
    distinct?: ZonaScalarFieldEnum | ZonaScalarFieldEnum[]
  }

  /**
   * Zona findFirstOrThrow
   */
  export type ZonaFindFirstOrThrowArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zona
     */
    select?: ZonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zona
     */
    omit?: ZonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZonaInclude<ExtArgs> | null
    /**
     * Filter, which Zona to fetch.
     */
    where?: ZonaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Zonas to fetch.
     */
    orderBy?: ZonaOrderByWithRelationInput | ZonaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for searching for Zonas.
     */
    cursor?: ZonaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Zonas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Zonas.
     */
    skip?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/distinct Distinct Docs}
     * 
     * Filter by unique combinations of Zonas.
     */
    distinct?: ZonaScalarFieldEnum | ZonaScalarFieldEnum[]
  }

  /**
   * Zona findMany
   */
  export type ZonaFindManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zona
     */
    select?: ZonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zona
     */
    omit?: ZonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZonaInclude<ExtArgs> | null
    /**
     * Filter, which Zonas to fetch.
     */
    where?: ZonaWhereInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/sorting Sorting Docs}
     * 
     * Determine the order of Zonas to fetch.
     */
    orderBy?: ZonaOrderByWithRelationInput | ZonaOrderByWithRelationInput[]
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination#cursor-based-pagination Cursor Docs}
     * 
     * Sets the position for listing Zonas.
     */
    cursor?: ZonaWhereUniqueInput
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Take `±n` Zonas from the position of the cursor.
     */
    take?: number
    /**
     * {@link https://www.prisma.io/docs/concepts/components/prisma-client/pagination Pagination Docs}
     * 
     * Skip the first `n` Zonas.
     */
    skip?: number
    distinct?: ZonaScalarFieldEnum | ZonaScalarFieldEnum[]
  }

  /**
   * Zona create
   */
  export type ZonaCreateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zona
     */
    select?: ZonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zona
     */
    omit?: ZonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZonaInclude<ExtArgs> | null
    /**
     * The data needed to create a Zona.
     */
    data: XOR<ZonaCreateInput, ZonaUncheckedCreateInput>
  }

  /**
   * Zona createMany
   */
  export type ZonaCreateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to create many Zonas.
     */
    data: ZonaCreateManyInput | ZonaCreateManyInput[]
    skipDuplicates?: boolean
  }

  /**
   * Zona createManyAndReturn
   */
  export type ZonaCreateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zona
     */
    select?: ZonaSelectCreateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Zona
     */
    omit?: ZonaOmit<ExtArgs> | null
    /**
     * The data used to create many Zonas.
     */
    data: ZonaCreateManyInput | ZonaCreateManyInput[]
    skipDuplicates?: boolean
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZonaIncludeCreateManyAndReturn<ExtArgs> | null
  }

  /**
   * Zona update
   */
  export type ZonaUpdateArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zona
     */
    select?: ZonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zona
     */
    omit?: ZonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZonaInclude<ExtArgs> | null
    /**
     * The data needed to update a Zona.
     */
    data: XOR<ZonaUpdateInput, ZonaUncheckedUpdateInput>
    /**
     * Choose, which Zona to update.
     */
    where: ZonaWhereUniqueInput
  }

  /**
   * Zona updateMany
   */
  export type ZonaUpdateManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * The data used to update Zonas.
     */
    data: XOR<ZonaUpdateManyMutationInput, ZonaUncheckedUpdateManyInput>
    /**
     * Filter which Zonas to update
     */
    where?: ZonaWhereInput
    /**
     * Limit how many Zonas to update.
     */
    limit?: number
  }

  /**
   * Zona updateManyAndReturn
   */
  export type ZonaUpdateManyAndReturnArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zona
     */
    select?: ZonaSelectUpdateManyAndReturn<ExtArgs> | null
    /**
     * Omit specific fields from the Zona
     */
    omit?: ZonaOmit<ExtArgs> | null
    /**
     * The data used to update Zonas.
     */
    data: XOR<ZonaUpdateManyMutationInput, ZonaUncheckedUpdateManyInput>
    /**
     * Filter which Zonas to update
     */
    where?: ZonaWhereInput
    /**
     * Limit how many Zonas to update.
     */
    limit?: number
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZonaIncludeUpdateManyAndReturn<ExtArgs> | null
  }

  /**
   * Zona upsert
   */
  export type ZonaUpsertArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zona
     */
    select?: ZonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zona
     */
    omit?: ZonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZonaInclude<ExtArgs> | null
    /**
     * The filter to search for the Zona to update in case it exists.
     */
    where: ZonaWhereUniqueInput
    /**
     * In case the Zona found by the `where` argument doesn't exist, create a new Zona with this data.
     */
    create: XOR<ZonaCreateInput, ZonaUncheckedCreateInput>
    /**
     * In case the Zona was found with the provided `where` argument, update it with this data.
     */
    update: XOR<ZonaUpdateInput, ZonaUncheckedUpdateInput>
  }

  /**
   * Zona delete
   */
  export type ZonaDeleteArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zona
     */
    select?: ZonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zona
     */
    omit?: ZonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZonaInclude<ExtArgs> | null
    /**
     * Filter which Zona to delete.
     */
    where: ZonaWhereUniqueInput
  }

  /**
   * Zona deleteMany
   */
  export type ZonaDeleteManyArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Filter which Zonas to delete
     */
    where?: ZonaWhereInput
    /**
     * Limit how many Zonas to delete.
     */
    limit?: number
  }

  /**
   * Zona.reservas
   */
  export type Zona$reservasArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Reserva
     */
    select?: ReservaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Reserva
     */
    omit?: ReservaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ReservaInclude<ExtArgs> | null
    where?: ReservaWhereInput
    orderBy?: ReservaOrderByWithRelationInput | ReservaOrderByWithRelationInput[]
    cursor?: ReservaWhereUniqueInput
    take?: number
    skip?: number
    distinct?: ReservaScalarFieldEnum | ReservaScalarFieldEnum[]
  }

  /**
   * Zona without action
   */
  export type ZonaDefaultArgs<ExtArgs extends $Extensions.InternalArgs = $Extensions.DefaultArgs> = {
    /**
     * Select specific fields to fetch from the Zona
     */
    select?: ZonaSelect<ExtArgs> | null
    /**
     * Omit specific fields from the Zona
     */
    omit?: ZonaOmit<ExtArgs> | null
    /**
     * Choose, which related nodes to fetch as well
     */
    include?: ZonaInclude<ExtArgs> | null
  }


  /**
   * Enums
   */

  export const TransactionIsolationLevel: {
    ReadUncommitted: 'ReadUncommitted',
    ReadCommitted: 'ReadCommitted',
    RepeatableRead: 'RepeatableRead',
    Serializable: 'Serializable'
  };

  export type TransactionIsolationLevel = (typeof TransactionIsolationLevel)[keyof typeof TransactionIsolationLevel]


  export const ComunidadScalarFieldEnum: {
    id: 'id',
    nombre: 'nombre',
    calle: 'calle',
    numero: 'numero',
    localidad: 'localidad',
    provincia: 'provincia',
    pais: 'pais'
  };

  export type ComunidadScalarFieldEnum = (typeof ComunidadScalarFieldEnum)[keyof typeof ComunidadScalarFieldEnum]


  export const ContactoScalarFieldEnum: {
    nombre: 'nombre',
    correo: 'correo',
    mensaje: 'mensaje',
    createdAt: 'createdAt'
  };

  export type ContactoScalarFieldEnum = (typeof ContactoScalarFieldEnum)[keyof typeof ContactoScalarFieldEnum]


  export const CredencialesScalarFieldEnum: {
    correoUsuario: 'correoUsuario',
    password: 'password'
  };

  export type CredencialesScalarFieldEnum = (typeof CredencialesScalarFieldEnum)[keyof typeof CredencialesScalarFieldEnum]


  export const IncidenciaScalarFieldEnum: {
    comunidad: 'comunidad',
    usuario: 'usuario',
    fecha: 'fecha',
    descripcion: 'descripcion',
    estado: 'estado'
  };

  export type IncidenciaScalarFieldEnum = (typeof IncidenciaScalarFieldEnum)[keyof typeof IncidenciaScalarFieldEnum]


  export const InscripcionScalarFieldEnum: {
    usuario: 'usuario',
    comunidad: 'comunidad'
  };

  export type InscripcionScalarFieldEnum = (typeof InscripcionScalarFieldEnum)[keyof typeof InscripcionScalarFieldEnum]


  export const MensajeScalarFieldEnum: {
    horaCreacion: 'horaCreacion',
    comunidad: 'comunidad',
    texto: 'texto'
  };

  export type MensajeScalarFieldEnum = (typeof MensajeScalarFieldEnum)[keyof typeof MensajeScalarFieldEnum]


  export const ReservaScalarFieldEnum: {
    usuario: 'usuario',
    comunidad: 'comunidad',
    zona: 'zona',
    fecha: 'fecha',
    hora_inicio: 'hora_inicio',
    hora_fin: 'hora_fin'
  };

  export type ReservaScalarFieldEnum = (typeof ReservaScalarFieldEnum)[keyof typeof ReservaScalarFieldEnum]


  export const SolicitudScalarFieldEnum: {
    usuario: 'usuario',
    comunidad: 'comunidad',
    estado: 'estado'
  };

  export type SolicitudScalarFieldEnum = (typeof SolicitudScalarFieldEnum)[keyof typeof SolicitudScalarFieldEnum]


  export const UsuarioScalarFieldEnum: {
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

  export type UsuarioScalarFieldEnum = (typeof UsuarioScalarFieldEnum)[keyof typeof UsuarioScalarFieldEnum]


  export const ZonaScalarFieldEnum: {
    nombre: 'nombre',
    comunidad: 'comunidad',
    descripcion: 'descripcion',
    imagen: 'imagen',
    hora_inicio: 'hora_inicio',
    hora_fin: 'hora_fin'
  };

  export type ZonaScalarFieldEnum = (typeof ZonaScalarFieldEnum)[keyof typeof ZonaScalarFieldEnum]


  export const SortOrder: {
    asc: 'asc',
    desc: 'desc'
  };

  export type SortOrder = (typeof SortOrder)[keyof typeof SortOrder]


  export const QueryMode: {
    default: 'default',
    insensitive: 'insensitive'
  };

  export type QueryMode = (typeof QueryMode)[keyof typeof QueryMode]


  export const NullsOrder: {
    first: 'first',
    last: 'last'
  };

  export type NullsOrder = (typeof NullsOrder)[keyof typeof NullsOrder]


  /**
   * Field references
   */


  /**
   * Reference to a field of type 'Int'
   */
  export type IntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int'>
    


  /**
   * Reference to a field of type 'Int[]'
   */
  export type ListIntFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Int[]'>
    


  /**
   * Reference to a field of type 'String'
   */
  export type StringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String'>
    


  /**
   * Reference to a field of type 'String[]'
   */
  export type ListStringFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'String[]'>
    


  /**
   * Reference to a field of type 'DateTime'
   */
  export type DateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime'>
    


  /**
   * Reference to a field of type 'DateTime[]'
   */
  export type ListDateTimeFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'DateTime[]'>
    


  /**
   * Reference to a field of type 'Estado_Incidencia'
   */
  export type EnumEstado_IncidenciaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Estado_Incidencia'>
    


  /**
   * Reference to a field of type 'Estado_Incidencia[]'
   */
  export type ListEnumEstado_IncidenciaFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Estado_Incidencia[]'>
    


  /**
   * Reference to a field of type 'Estado_Solicitud'
   */
  export type EnumEstado_SolicitudFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Estado_Solicitud'>
    


  /**
   * Reference to a field of type 'Estado_Solicitud[]'
   */
  export type ListEnumEstado_SolicitudFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Estado_Solicitud[]'>
    


  /**
   * Reference to a field of type 'Role'
   */
  export type EnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role'>
    


  /**
   * Reference to a field of type 'Role[]'
   */
  export type ListEnumRoleFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Role[]'>
    


  /**
   * Reference to a field of type 'Float'
   */
  export type FloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float'>
    


  /**
   * Reference to a field of type 'Float[]'
   */
  export type ListFloatFieldRefInput<$PrismaModel> = FieldRefInputType<$PrismaModel, 'Float[]'>
    
  /**
   * Deep Input Types
   */


  export type ComunidadWhereInput = {
    AND?: ComunidadWhereInput | ComunidadWhereInput[]
    OR?: ComunidadWhereInput[]
    NOT?: ComunidadWhereInput | ComunidadWhereInput[]
    id?: IntFilter<"Comunidad"> | number
    nombre?: StringFilter<"Comunidad"> | string
    calle?: StringFilter<"Comunidad"> | string
    numero?: IntFilter<"Comunidad"> | number
    localidad?: StringFilter<"Comunidad"> | string
    provincia?: StringFilter<"Comunidad"> | string
    pais?: StringFilter<"Comunidad"> | string
    mensajes?: MensajeListRelationFilter
    zonas?: ZonaListRelationFilter
    incidencias?: IncidenciaListRelationFilter
    inscritos?: InscripcionListRelationFilter
    solicitudes?: SolicitudListRelationFilter
  }

  export type ComunidadOrderByWithRelationInput = {
    id?: SortOrder
    nombre?: SortOrder
    calle?: SortOrder
    numero?: SortOrder
    localidad?: SortOrder
    provincia?: SortOrder
    pais?: SortOrder
    mensajes?: MensajeOrderByRelationAggregateInput
    zonas?: ZonaOrderByRelationAggregateInput
    incidencias?: IncidenciaOrderByRelationAggregateInput
    inscritos?: InscripcionOrderByRelationAggregateInput
    solicitudes?: SolicitudOrderByRelationAggregateInput
  }

  export type ComunidadWhereUniqueInput = Prisma.AtLeast<{
    id?: number
    AND?: ComunidadWhereInput | ComunidadWhereInput[]
    OR?: ComunidadWhereInput[]
    NOT?: ComunidadWhereInput | ComunidadWhereInput[]
    nombre?: StringFilter<"Comunidad"> | string
    calle?: StringFilter<"Comunidad"> | string
    numero?: IntFilter<"Comunidad"> | number
    localidad?: StringFilter<"Comunidad"> | string
    provincia?: StringFilter<"Comunidad"> | string
    pais?: StringFilter<"Comunidad"> | string
    mensajes?: MensajeListRelationFilter
    zonas?: ZonaListRelationFilter
    incidencias?: IncidenciaListRelationFilter
    inscritos?: InscripcionListRelationFilter
    solicitudes?: SolicitudListRelationFilter
  }, "id">

  export type ComunidadOrderByWithAggregationInput = {
    id?: SortOrder
    nombre?: SortOrder
    calle?: SortOrder
    numero?: SortOrder
    localidad?: SortOrder
    provincia?: SortOrder
    pais?: SortOrder
    _count?: ComunidadCountOrderByAggregateInput
    _avg?: ComunidadAvgOrderByAggregateInput
    _max?: ComunidadMaxOrderByAggregateInput
    _min?: ComunidadMinOrderByAggregateInput
    _sum?: ComunidadSumOrderByAggregateInput
  }

  export type ComunidadScalarWhereWithAggregatesInput = {
    AND?: ComunidadScalarWhereWithAggregatesInput | ComunidadScalarWhereWithAggregatesInput[]
    OR?: ComunidadScalarWhereWithAggregatesInput[]
    NOT?: ComunidadScalarWhereWithAggregatesInput | ComunidadScalarWhereWithAggregatesInput[]
    id?: IntWithAggregatesFilter<"Comunidad"> | number
    nombre?: StringWithAggregatesFilter<"Comunidad"> | string
    calle?: StringWithAggregatesFilter<"Comunidad"> | string
    numero?: IntWithAggregatesFilter<"Comunidad"> | number
    localidad?: StringWithAggregatesFilter<"Comunidad"> | string
    provincia?: StringWithAggregatesFilter<"Comunidad"> | string
    pais?: StringWithAggregatesFilter<"Comunidad"> | string
  }

  export type ContactoWhereInput = {
    AND?: ContactoWhereInput | ContactoWhereInput[]
    OR?: ContactoWhereInput[]
    NOT?: ContactoWhereInput | ContactoWhereInput[]
    nombre?: StringFilter<"Contacto"> | string
    correo?: StringFilter<"Contacto"> | string
    mensaje?: StringFilter<"Contacto"> | string
    createdAt?: DateTimeFilter<"Contacto"> | Date | string
  }

  export type ContactoOrderByWithRelationInput = {
    nombre?: SortOrder
    correo?: SortOrder
    mensaje?: SortOrder
    createdAt?: SortOrder
  }

  export type ContactoWhereUniqueInput = Prisma.AtLeast<{
    nombre_correo_createdAt?: ContactoNombreCorreoCreatedAtCompoundUniqueInput
    AND?: ContactoWhereInput | ContactoWhereInput[]
    OR?: ContactoWhereInput[]
    NOT?: ContactoWhereInput | ContactoWhereInput[]
    nombre?: StringFilter<"Contacto"> | string
    correo?: StringFilter<"Contacto"> | string
    mensaje?: StringFilter<"Contacto"> | string
    createdAt?: DateTimeFilter<"Contacto"> | Date | string
  }, "nombre_correo_createdAt">

  export type ContactoOrderByWithAggregationInput = {
    nombre?: SortOrder
    correo?: SortOrder
    mensaje?: SortOrder
    createdAt?: SortOrder
    _count?: ContactoCountOrderByAggregateInput
    _max?: ContactoMaxOrderByAggregateInput
    _min?: ContactoMinOrderByAggregateInput
  }

  export type ContactoScalarWhereWithAggregatesInput = {
    AND?: ContactoScalarWhereWithAggregatesInput | ContactoScalarWhereWithAggregatesInput[]
    OR?: ContactoScalarWhereWithAggregatesInput[]
    NOT?: ContactoScalarWhereWithAggregatesInput | ContactoScalarWhereWithAggregatesInput[]
    nombre?: StringWithAggregatesFilter<"Contacto"> | string
    correo?: StringWithAggregatesFilter<"Contacto"> | string
    mensaje?: StringWithAggregatesFilter<"Contacto"> | string
    createdAt?: DateTimeWithAggregatesFilter<"Contacto"> | Date | string
  }

  export type CredencialesWhereInput = {
    AND?: CredencialesWhereInput | CredencialesWhereInput[]
    OR?: CredencialesWhereInput[]
    NOT?: CredencialesWhereInput | CredencialesWhereInput[]
    correoUsuario?: StringFilter<"Credenciales"> | string
    password?: StringFilter<"Credenciales"> | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type CredencialesOrderByWithRelationInput = {
    correoUsuario?: SortOrder
    password?: SortOrder
    usuario?: UsuarioOrderByWithRelationInput
  }

  export type CredencialesWhereUniqueInput = Prisma.AtLeast<{
    correoUsuario?: string
    AND?: CredencialesWhereInput | CredencialesWhereInput[]
    OR?: CredencialesWhereInput[]
    NOT?: CredencialesWhereInput | CredencialesWhereInput[]
    password?: StringFilter<"Credenciales"> | string
    usuario?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "correoUsuario">

  export type CredencialesOrderByWithAggregationInput = {
    correoUsuario?: SortOrder
    password?: SortOrder
    _count?: CredencialesCountOrderByAggregateInput
    _max?: CredencialesMaxOrderByAggregateInput
    _min?: CredencialesMinOrderByAggregateInput
  }

  export type CredencialesScalarWhereWithAggregatesInput = {
    AND?: CredencialesScalarWhereWithAggregatesInput | CredencialesScalarWhereWithAggregatesInput[]
    OR?: CredencialesScalarWhereWithAggregatesInput[]
    NOT?: CredencialesScalarWhereWithAggregatesInput | CredencialesScalarWhereWithAggregatesInput[]
    correoUsuario?: StringWithAggregatesFilter<"Credenciales"> | string
    password?: StringWithAggregatesFilter<"Credenciales"> | string
  }

  export type IncidenciaWhereInput = {
    AND?: IncidenciaWhereInput | IncidenciaWhereInput[]
    OR?: IncidenciaWhereInput[]
    NOT?: IncidenciaWhereInput | IncidenciaWhereInput[]
    comunidad?: IntFilter<"Incidencia"> | number
    usuario?: StringFilter<"Incidencia"> | string
    fecha?: DateTimeFilter<"Incidencia"> | Date | string
    descripcion?: StringFilter<"Incidencia"> | string
    estado?: EnumEstado_IncidenciaFilter<"Incidencia"> | $Enums.Estado_Incidencia
    comunidadID?: XOR<ComunidadScalarRelationFilter, ComunidadWhereInput>
    usuarioID?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }

  export type IncidenciaOrderByWithRelationInput = {
    comunidad?: SortOrder
    usuario?: SortOrder
    fecha?: SortOrder
    descripcion?: SortOrder
    estado?: SortOrder
    comunidadID?: ComunidadOrderByWithRelationInput
    usuarioID?: UsuarioOrderByWithRelationInput
  }

  export type IncidenciaWhereUniqueInput = Prisma.AtLeast<{
    comunidad_usuario_fecha?: IncidenciaComunidadUsuarioFechaCompoundUniqueInput
    AND?: IncidenciaWhereInput | IncidenciaWhereInput[]
    OR?: IncidenciaWhereInput[]
    NOT?: IncidenciaWhereInput | IncidenciaWhereInput[]
    comunidad?: IntFilter<"Incidencia"> | number
    usuario?: StringFilter<"Incidencia"> | string
    fecha?: DateTimeFilter<"Incidencia"> | Date | string
    descripcion?: StringFilter<"Incidencia"> | string
    estado?: EnumEstado_IncidenciaFilter<"Incidencia"> | $Enums.Estado_Incidencia
    comunidadID?: XOR<ComunidadScalarRelationFilter, ComunidadWhereInput>
    usuarioID?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
  }, "comunidad_usuario_fecha">

  export type IncidenciaOrderByWithAggregationInput = {
    comunidad?: SortOrder
    usuario?: SortOrder
    fecha?: SortOrder
    descripcion?: SortOrder
    estado?: SortOrder
    _count?: IncidenciaCountOrderByAggregateInput
    _avg?: IncidenciaAvgOrderByAggregateInput
    _max?: IncidenciaMaxOrderByAggregateInput
    _min?: IncidenciaMinOrderByAggregateInput
    _sum?: IncidenciaSumOrderByAggregateInput
  }

  export type IncidenciaScalarWhereWithAggregatesInput = {
    AND?: IncidenciaScalarWhereWithAggregatesInput | IncidenciaScalarWhereWithAggregatesInput[]
    OR?: IncidenciaScalarWhereWithAggregatesInput[]
    NOT?: IncidenciaScalarWhereWithAggregatesInput | IncidenciaScalarWhereWithAggregatesInput[]
    comunidad?: IntWithAggregatesFilter<"Incidencia"> | number
    usuario?: StringWithAggregatesFilter<"Incidencia"> | string
    fecha?: DateTimeWithAggregatesFilter<"Incidencia"> | Date | string
    descripcion?: StringWithAggregatesFilter<"Incidencia"> | string
    estado?: EnumEstado_IncidenciaWithAggregatesFilter<"Incidencia"> | $Enums.Estado_Incidencia
  }

  export type InscripcionWhereInput = {
    AND?: InscripcionWhereInput | InscripcionWhereInput[]
    OR?: InscripcionWhereInput[]
    NOT?: InscripcionWhereInput | InscripcionWhereInput[]
    usuario?: StringFilter<"Inscripcion"> | string
    comunidad?: IntFilter<"Inscripcion"> | number
    usuarioID?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    comunidadID?: XOR<ComunidadScalarRelationFilter, ComunidadWhereInput>
  }

  export type InscripcionOrderByWithRelationInput = {
    usuario?: SortOrder
    comunidad?: SortOrder
    usuarioID?: UsuarioOrderByWithRelationInput
    comunidadID?: ComunidadOrderByWithRelationInput
  }

  export type InscripcionWhereUniqueInput = Prisma.AtLeast<{
    usuario_comunidad?: InscripcionUsuarioComunidadCompoundUniqueInput
    AND?: InscripcionWhereInput | InscripcionWhereInput[]
    OR?: InscripcionWhereInput[]
    NOT?: InscripcionWhereInput | InscripcionWhereInput[]
    usuario?: StringFilter<"Inscripcion"> | string
    comunidad?: IntFilter<"Inscripcion"> | number
    usuarioID?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    comunidadID?: XOR<ComunidadScalarRelationFilter, ComunidadWhereInput>
  }, "usuario_comunidad">

  export type InscripcionOrderByWithAggregationInput = {
    usuario?: SortOrder
    comunidad?: SortOrder
    _count?: InscripcionCountOrderByAggregateInput
    _avg?: InscripcionAvgOrderByAggregateInput
    _max?: InscripcionMaxOrderByAggregateInput
    _min?: InscripcionMinOrderByAggregateInput
    _sum?: InscripcionSumOrderByAggregateInput
  }

  export type InscripcionScalarWhereWithAggregatesInput = {
    AND?: InscripcionScalarWhereWithAggregatesInput | InscripcionScalarWhereWithAggregatesInput[]
    OR?: InscripcionScalarWhereWithAggregatesInput[]
    NOT?: InscripcionScalarWhereWithAggregatesInput | InscripcionScalarWhereWithAggregatesInput[]
    usuario?: StringWithAggregatesFilter<"Inscripcion"> | string
    comunidad?: IntWithAggregatesFilter<"Inscripcion"> | number
  }

  export type MensajeWhereInput = {
    AND?: MensajeWhereInput | MensajeWhereInput[]
    OR?: MensajeWhereInput[]
    NOT?: MensajeWhereInput | MensajeWhereInput[]
    horaCreacion?: DateTimeFilter<"Mensaje"> | Date | string
    comunidad?: IntFilter<"Mensaje"> | number
    texto?: StringFilter<"Mensaje"> | string
    comunidadID?: XOR<ComunidadScalarRelationFilter, ComunidadWhereInput>
  }

  export type MensajeOrderByWithRelationInput = {
    horaCreacion?: SortOrder
    comunidad?: SortOrder
    texto?: SortOrder
    comunidadID?: ComunidadOrderByWithRelationInput
  }

  export type MensajeWhereUniqueInput = Prisma.AtLeast<{
    horaCreacion_comunidad?: MensajeHoraCreacionComunidadCompoundUniqueInput
    AND?: MensajeWhereInput | MensajeWhereInput[]
    OR?: MensajeWhereInput[]
    NOT?: MensajeWhereInput | MensajeWhereInput[]
    horaCreacion?: DateTimeFilter<"Mensaje"> | Date | string
    comunidad?: IntFilter<"Mensaje"> | number
    texto?: StringFilter<"Mensaje"> | string
    comunidadID?: XOR<ComunidadScalarRelationFilter, ComunidadWhereInput>
  }, "horaCreacion_comunidad">

  export type MensajeOrderByWithAggregationInput = {
    horaCreacion?: SortOrder
    comunidad?: SortOrder
    texto?: SortOrder
    _count?: MensajeCountOrderByAggregateInput
    _avg?: MensajeAvgOrderByAggregateInput
    _max?: MensajeMaxOrderByAggregateInput
    _min?: MensajeMinOrderByAggregateInput
    _sum?: MensajeSumOrderByAggregateInput
  }

  export type MensajeScalarWhereWithAggregatesInput = {
    AND?: MensajeScalarWhereWithAggregatesInput | MensajeScalarWhereWithAggregatesInput[]
    OR?: MensajeScalarWhereWithAggregatesInput[]
    NOT?: MensajeScalarWhereWithAggregatesInput | MensajeScalarWhereWithAggregatesInput[]
    horaCreacion?: DateTimeWithAggregatesFilter<"Mensaje"> | Date | string
    comunidad?: IntWithAggregatesFilter<"Mensaje"> | number
    texto?: StringWithAggregatesFilter<"Mensaje"> | string
  }

  export type ReservaWhereInput = {
    AND?: ReservaWhereInput | ReservaWhereInput[]
    OR?: ReservaWhereInput[]
    NOT?: ReservaWhereInput | ReservaWhereInput[]
    usuario?: StringFilter<"Reserva"> | string
    comunidad?: IntFilter<"Reserva"> | number
    zona?: StringFilter<"Reserva"> | string
    fecha?: DateTimeFilter<"Reserva"> | Date | string
    hora_inicio?: DateTimeFilter<"Reserva"> | Date | string
    hora_fin?: DateTimeFilter<"Reserva"> | Date | string
    usuarioID?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    zonaID?: XOR<ZonaScalarRelationFilter, ZonaWhereInput>
  }

  export type ReservaOrderByWithRelationInput = {
    usuario?: SortOrder
    comunidad?: SortOrder
    zona?: SortOrder
    fecha?: SortOrder
    hora_inicio?: SortOrder
    hora_fin?: SortOrder
    usuarioID?: UsuarioOrderByWithRelationInput
    zonaID?: ZonaOrderByWithRelationInput
  }

  export type ReservaWhereUniqueInput = Prisma.AtLeast<{
    usuario_comunidad_zona?: ReservaUsuarioComunidadZonaCompoundUniqueInput
    AND?: ReservaWhereInput | ReservaWhereInput[]
    OR?: ReservaWhereInput[]
    NOT?: ReservaWhereInput | ReservaWhereInput[]
    usuario?: StringFilter<"Reserva"> | string
    comunidad?: IntFilter<"Reserva"> | number
    zona?: StringFilter<"Reserva"> | string
    fecha?: DateTimeFilter<"Reserva"> | Date | string
    hora_inicio?: DateTimeFilter<"Reserva"> | Date | string
    hora_fin?: DateTimeFilter<"Reserva"> | Date | string
    usuarioID?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    zonaID?: XOR<ZonaScalarRelationFilter, ZonaWhereInput>
  }, "usuario_comunidad_zona">

  export type ReservaOrderByWithAggregationInput = {
    usuario?: SortOrder
    comunidad?: SortOrder
    zona?: SortOrder
    fecha?: SortOrder
    hora_inicio?: SortOrder
    hora_fin?: SortOrder
    _count?: ReservaCountOrderByAggregateInput
    _avg?: ReservaAvgOrderByAggregateInput
    _max?: ReservaMaxOrderByAggregateInput
    _min?: ReservaMinOrderByAggregateInput
    _sum?: ReservaSumOrderByAggregateInput
  }

  export type ReservaScalarWhereWithAggregatesInput = {
    AND?: ReservaScalarWhereWithAggregatesInput | ReservaScalarWhereWithAggregatesInput[]
    OR?: ReservaScalarWhereWithAggregatesInput[]
    NOT?: ReservaScalarWhereWithAggregatesInput | ReservaScalarWhereWithAggregatesInput[]
    usuario?: StringWithAggregatesFilter<"Reserva"> | string
    comunidad?: IntWithAggregatesFilter<"Reserva"> | number
    zona?: StringWithAggregatesFilter<"Reserva"> | string
    fecha?: DateTimeWithAggregatesFilter<"Reserva"> | Date | string
    hora_inicio?: DateTimeWithAggregatesFilter<"Reserva"> | Date | string
    hora_fin?: DateTimeWithAggregatesFilter<"Reserva"> | Date | string
  }

  export type SolicitudWhereInput = {
    AND?: SolicitudWhereInput | SolicitudWhereInput[]
    OR?: SolicitudWhereInput[]
    NOT?: SolicitudWhereInput | SolicitudWhereInput[]
    usuario?: StringFilter<"Solicitud"> | string
    comunidad?: IntFilter<"Solicitud"> | number
    estado?: EnumEstado_SolicitudFilter<"Solicitud"> | $Enums.Estado_Solicitud
    usuarioID?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    comunidadID?: XOR<ComunidadScalarRelationFilter, ComunidadWhereInput>
  }

  export type SolicitudOrderByWithRelationInput = {
    usuario?: SortOrder
    comunidad?: SortOrder
    estado?: SortOrder
    usuarioID?: UsuarioOrderByWithRelationInput
    comunidadID?: ComunidadOrderByWithRelationInput
  }

  export type SolicitudWhereUniqueInput = Prisma.AtLeast<{
    usuario_comunidad?: SolicitudUsuarioComunidadCompoundUniqueInput
    AND?: SolicitudWhereInput | SolicitudWhereInput[]
    OR?: SolicitudWhereInput[]
    NOT?: SolicitudWhereInput | SolicitudWhereInput[]
    usuario?: StringFilter<"Solicitud"> | string
    comunidad?: IntFilter<"Solicitud"> | number
    estado?: EnumEstado_SolicitudFilter<"Solicitud"> | $Enums.Estado_Solicitud
    usuarioID?: XOR<UsuarioScalarRelationFilter, UsuarioWhereInput>
    comunidadID?: XOR<ComunidadScalarRelationFilter, ComunidadWhereInput>
  }, "usuario_comunidad">

  export type SolicitudOrderByWithAggregationInput = {
    usuario?: SortOrder
    comunidad?: SortOrder
    estado?: SortOrder
    _count?: SolicitudCountOrderByAggregateInput
    _avg?: SolicitudAvgOrderByAggregateInput
    _max?: SolicitudMaxOrderByAggregateInput
    _min?: SolicitudMinOrderByAggregateInput
    _sum?: SolicitudSumOrderByAggregateInput
  }

  export type SolicitudScalarWhereWithAggregatesInput = {
    AND?: SolicitudScalarWhereWithAggregatesInput | SolicitudScalarWhereWithAggregatesInput[]
    OR?: SolicitudScalarWhereWithAggregatesInput[]
    NOT?: SolicitudScalarWhereWithAggregatesInput | SolicitudScalarWhereWithAggregatesInput[]
    usuario?: StringWithAggregatesFilter<"Solicitud"> | string
    comunidad?: IntWithAggregatesFilter<"Solicitud"> | number
    estado?: EnumEstado_SolicitudWithAggregatesFilter<"Solicitud"> | $Enums.Estado_Solicitud
  }

  export type UsuarioWhereInput = {
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    correo?: StringFilter<"Usuario"> | string
    rol?: EnumRoleFilter<"Usuario"> | $Enums.Role
    nombre_usuario?: StringFilter<"Usuario"> | string
    nombre?: StringFilter<"Usuario"> | string
    apellidos?: StringFilter<"Usuario"> | string
    calle?: StringFilter<"Usuario"> | string
    numero?: IntFilter<"Usuario"> | number
    piso?: IntNullableFilter<"Usuario"> | number | null
    letra?: StringNullableFilter<"Usuario"> | string | null
    localidad?: StringFilter<"Usuario"> | string
    credenciales?: XOR<CredencialesNullableScalarRelationFilter, CredencialesWhereInput> | null
    incidencias?: IncidenciaListRelationFilter
    reservas?: ReservaListRelationFilter
    inscripciones?: InscripcionListRelationFilter
    solicitudes?: SolicitudListRelationFilter
  }

  export type UsuarioOrderByWithRelationInput = {
    correo?: SortOrder
    rol?: SortOrder
    nombre_usuario?: SortOrder
    nombre?: SortOrder
    apellidos?: SortOrder
    calle?: SortOrder
    numero?: SortOrder
    piso?: SortOrderInput | SortOrder
    letra?: SortOrderInput | SortOrder
    localidad?: SortOrder
    credenciales?: CredencialesOrderByWithRelationInput
    incidencias?: IncidenciaOrderByRelationAggregateInput
    reservas?: ReservaOrderByRelationAggregateInput
    inscripciones?: InscripcionOrderByRelationAggregateInput
    solicitudes?: SolicitudOrderByRelationAggregateInput
  }

  export type UsuarioWhereUniqueInput = Prisma.AtLeast<{
    correo?: string
    AND?: UsuarioWhereInput | UsuarioWhereInput[]
    OR?: UsuarioWhereInput[]
    NOT?: UsuarioWhereInput | UsuarioWhereInput[]
    rol?: EnumRoleFilter<"Usuario"> | $Enums.Role
    nombre_usuario?: StringFilter<"Usuario"> | string
    nombre?: StringFilter<"Usuario"> | string
    apellidos?: StringFilter<"Usuario"> | string
    calle?: StringFilter<"Usuario"> | string
    numero?: IntFilter<"Usuario"> | number
    piso?: IntNullableFilter<"Usuario"> | number | null
    letra?: StringNullableFilter<"Usuario"> | string | null
    localidad?: StringFilter<"Usuario"> | string
    credenciales?: XOR<CredencialesNullableScalarRelationFilter, CredencialesWhereInput> | null
    incidencias?: IncidenciaListRelationFilter
    reservas?: ReservaListRelationFilter
    inscripciones?: InscripcionListRelationFilter
    solicitudes?: SolicitudListRelationFilter
  }, "correo">

  export type UsuarioOrderByWithAggregationInput = {
    correo?: SortOrder
    rol?: SortOrder
    nombre_usuario?: SortOrder
    nombre?: SortOrder
    apellidos?: SortOrder
    calle?: SortOrder
    numero?: SortOrder
    piso?: SortOrderInput | SortOrder
    letra?: SortOrderInput | SortOrder
    localidad?: SortOrder
    _count?: UsuarioCountOrderByAggregateInput
    _avg?: UsuarioAvgOrderByAggregateInput
    _max?: UsuarioMaxOrderByAggregateInput
    _min?: UsuarioMinOrderByAggregateInput
    _sum?: UsuarioSumOrderByAggregateInput
  }

  export type UsuarioScalarWhereWithAggregatesInput = {
    AND?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    OR?: UsuarioScalarWhereWithAggregatesInput[]
    NOT?: UsuarioScalarWhereWithAggregatesInput | UsuarioScalarWhereWithAggregatesInput[]
    correo?: StringWithAggregatesFilter<"Usuario"> | string
    rol?: EnumRoleWithAggregatesFilter<"Usuario"> | $Enums.Role
    nombre_usuario?: StringWithAggregatesFilter<"Usuario"> | string
    nombre?: StringWithAggregatesFilter<"Usuario"> | string
    apellidos?: StringWithAggregatesFilter<"Usuario"> | string
    calle?: StringWithAggregatesFilter<"Usuario"> | string
    numero?: IntWithAggregatesFilter<"Usuario"> | number
    piso?: IntNullableWithAggregatesFilter<"Usuario"> | number | null
    letra?: StringNullableWithAggregatesFilter<"Usuario"> | string | null
    localidad?: StringWithAggregatesFilter<"Usuario"> | string
  }

  export type ZonaWhereInput = {
    AND?: ZonaWhereInput | ZonaWhereInput[]
    OR?: ZonaWhereInput[]
    NOT?: ZonaWhereInput | ZonaWhereInput[]
    nombre?: StringFilter<"Zona"> | string
    comunidad?: IntFilter<"Zona"> | number
    descripcion?: StringFilter<"Zona"> | string
    imagen?: StringNullableFilter<"Zona"> | string | null
    hora_inicio?: DateTimeFilter<"Zona"> | Date | string
    hora_fin?: DateTimeFilter<"Zona"> | Date | string
    comunidadID?: XOR<ComunidadScalarRelationFilter, ComunidadWhereInput>
    reservas?: ReservaListRelationFilter
  }

  export type ZonaOrderByWithRelationInput = {
    nombre?: SortOrder
    comunidad?: SortOrder
    descripcion?: SortOrder
    imagen?: SortOrderInput | SortOrder
    hora_inicio?: SortOrder
    hora_fin?: SortOrder
    comunidadID?: ComunidadOrderByWithRelationInput
    reservas?: ReservaOrderByRelationAggregateInput
  }

  export type ZonaWhereUniqueInput = Prisma.AtLeast<{
    nombre_comunidad?: ZonaNombreComunidadCompoundUniqueInput
    AND?: ZonaWhereInput | ZonaWhereInput[]
    OR?: ZonaWhereInput[]
    NOT?: ZonaWhereInput | ZonaWhereInput[]
    nombre?: StringFilter<"Zona"> | string
    comunidad?: IntFilter<"Zona"> | number
    descripcion?: StringFilter<"Zona"> | string
    imagen?: StringNullableFilter<"Zona"> | string | null
    hora_inicio?: DateTimeFilter<"Zona"> | Date | string
    hora_fin?: DateTimeFilter<"Zona"> | Date | string
    comunidadID?: XOR<ComunidadScalarRelationFilter, ComunidadWhereInput>
    reservas?: ReservaListRelationFilter
  }, "nombre_comunidad">

  export type ZonaOrderByWithAggregationInput = {
    nombre?: SortOrder
    comunidad?: SortOrder
    descripcion?: SortOrder
    imagen?: SortOrderInput | SortOrder
    hora_inicio?: SortOrder
    hora_fin?: SortOrder
    _count?: ZonaCountOrderByAggregateInput
    _avg?: ZonaAvgOrderByAggregateInput
    _max?: ZonaMaxOrderByAggregateInput
    _min?: ZonaMinOrderByAggregateInput
    _sum?: ZonaSumOrderByAggregateInput
  }

  export type ZonaScalarWhereWithAggregatesInput = {
    AND?: ZonaScalarWhereWithAggregatesInput | ZonaScalarWhereWithAggregatesInput[]
    OR?: ZonaScalarWhereWithAggregatesInput[]
    NOT?: ZonaScalarWhereWithAggregatesInput | ZonaScalarWhereWithAggregatesInput[]
    nombre?: StringWithAggregatesFilter<"Zona"> | string
    comunidad?: IntWithAggregatesFilter<"Zona"> | number
    descripcion?: StringWithAggregatesFilter<"Zona"> | string
    imagen?: StringNullableWithAggregatesFilter<"Zona"> | string | null
    hora_inicio?: DateTimeWithAggregatesFilter<"Zona"> | Date | string
    hora_fin?: DateTimeWithAggregatesFilter<"Zona"> | Date | string
  }

  export type ComunidadCreateInput = {
    nombre: string
    calle: string
    numero: number
    localidad: string
    provincia: string
    pais: string
    mensajes?: MensajeCreateNestedManyWithoutComunidadIDInput
    zonas?: ZonaCreateNestedManyWithoutComunidadIDInput
    incidencias?: IncidenciaCreateNestedManyWithoutComunidadIDInput
    inscritos?: InscripcionCreateNestedManyWithoutComunidadIDInput
    solicitudes?: SolicitudCreateNestedManyWithoutComunidadIDInput
  }

  export type ComunidadUncheckedCreateInput = {
    id?: number
    nombre: string
    calle: string
    numero: number
    localidad: string
    provincia: string
    pais: string
    mensajes?: MensajeUncheckedCreateNestedManyWithoutComunidadIDInput
    zonas?: ZonaUncheckedCreateNestedManyWithoutComunidadIDInput
    incidencias?: IncidenciaUncheckedCreateNestedManyWithoutComunidadIDInput
    inscritos?: InscripcionUncheckedCreateNestedManyWithoutComunidadIDInput
    solicitudes?: SolicitudUncheckedCreateNestedManyWithoutComunidadIDInput
  }

  export type ComunidadUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    localidad?: StringFieldUpdateOperationsInput | string
    provincia?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    mensajes?: MensajeUpdateManyWithoutComunidadIDNestedInput
    zonas?: ZonaUpdateManyWithoutComunidadIDNestedInput
    incidencias?: IncidenciaUpdateManyWithoutComunidadIDNestedInput
    inscritos?: InscripcionUpdateManyWithoutComunidadIDNestedInput
    solicitudes?: SolicitudUpdateManyWithoutComunidadIDNestedInput
  }

  export type ComunidadUncheckedUpdateInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    localidad?: StringFieldUpdateOperationsInput | string
    provincia?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    mensajes?: MensajeUncheckedUpdateManyWithoutComunidadIDNestedInput
    zonas?: ZonaUncheckedUpdateManyWithoutComunidadIDNestedInput
    incidencias?: IncidenciaUncheckedUpdateManyWithoutComunidadIDNestedInput
    inscritos?: InscripcionUncheckedUpdateManyWithoutComunidadIDNestedInput
    solicitudes?: SolicitudUncheckedUpdateManyWithoutComunidadIDNestedInput
  }

  export type ComunidadCreateManyInput = {
    id?: number
    nombre: string
    calle: string
    numero: number
    localidad: string
    provincia: string
    pais: string
  }

  export type ComunidadUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    localidad?: StringFieldUpdateOperationsInput | string
    provincia?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
  }

  export type ComunidadUncheckedUpdateManyInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    localidad?: StringFieldUpdateOperationsInput | string
    provincia?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
  }

  export type ContactoCreateInput = {
    nombre: string
    correo: string
    mensaje: string
    createdAt?: Date | string
  }

  export type ContactoUncheckedCreateInput = {
    nombre: string
    correo: string
    mensaje: string
    createdAt?: Date | string
  }

  export type ContactoUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactoUncheckedUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactoCreateManyInput = {
    nombre: string
    correo: string
    mensaje: string
    createdAt?: Date | string
  }

  export type ContactoUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ContactoUncheckedUpdateManyInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    correo?: StringFieldUpdateOperationsInput | string
    mensaje?: StringFieldUpdateOperationsInput | string
    createdAt?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type CredencialesCreateInput = {
    password: string
    usuario: UsuarioCreateNestedOneWithoutCredencialesInput
  }

  export type CredencialesUncheckedCreateInput = {
    correoUsuario: string
    password: string
  }

  export type CredencialesUpdateInput = {
    password?: StringFieldUpdateOperationsInput | string
    usuario?: UsuarioUpdateOneRequiredWithoutCredencialesNestedInput
  }

  export type CredencialesUncheckedUpdateInput = {
    correoUsuario?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type CredencialesCreateManyInput = {
    correoUsuario: string
    password: string
  }

  export type CredencialesUpdateManyMutationInput = {
    password?: StringFieldUpdateOperationsInput | string
  }

  export type CredencialesUncheckedUpdateManyInput = {
    correoUsuario?: StringFieldUpdateOperationsInput | string
    password?: StringFieldUpdateOperationsInput | string
  }

  export type IncidenciaCreateInput = {
    fecha?: Date | string
    descripcion: string
    estado?: $Enums.Estado_Incidencia
    comunidadID: ComunidadCreateNestedOneWithoutIncidenciasInput
    usuarioID: UsuarioCreateNestedOneWithoutIncidenciasInput
  }

  export type IncidenciaUncheckedCreateInput = {
    comunidad: number
    usuario: string
    fecha?: Date | string
    descripcion: string
    estado?: $Enums.Estado_Incidencia
  }

  export type IncidenciaUpdateInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    descripcion?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstado_IncidenciaFieldUpdateOperationsInput | $Enums.Estado_Incidencia
    comunidadID?: ComunidadUpdateOneRequiredWithoutIncidenciasNestedInput
    usuarioID?: UsuarioUpdateOneRequiredWithoutIncidenciasNestedInput
  }

  export type IncidenciaUncheckedUpdateInput = {
    comunidad?: IntFieldUpdateOperationsInput | number
    usuario?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    descripcion?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstado_IncidenciaFieldUpdateOperationsInput | $Enums.Estado_Incidencia
  }

  export type IncidenciaCreateManyInput = {
    comunidad: number
    usuario: string
    fecha?: Date | string
    descripcion: string
    estado?: $Enums.Estado_Incidencia
  }

  export type IncidenciaUpdateManyMutationInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    descripcion?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstado_IncidenciaFieldUpdateOperationsInput | $Enums.Estado_Incidencia
  }

  export type IncidenciaUncheckedUpdateManyInput = {
    comunidad?: IntFieldUpdateOperationsInput | number
    usuario?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    descripcion?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstado_IncidenciaFieldUpdateOperationsInput | $Enums.Estado_Incidencia
  }

  export type InscripcionCreateInput = {
    usuarioID: UsuarioCreateNestedOneWithoutInscripcionesInput
    comunidadID: ComunidadCreateNestedOneWithoutInscritosInput
  }

  export type InscripcionUncheckedCreateInput = {
    usuario: string
    comunidad: number
  }

  export type InscripcionUpdateInput = {
    usuarioID?: UsuarioUpdateOneRequiredWithoutInscripcionesNestedInput
    comunidadID?: ComunidadUpdateOneRequiredWithoutInscritosNestedInput
  }

  export type InscripcionUncheckedUpdateInput = {
    usuario?: StringFieldUpdateOperationsInput | string
    comunidad?: IntFieldUpdateOperationsInput | number
  }

  export type InscripcionCreateManyInput = {
    usuario: string
    comunidad: number
  }

  export type InscripcionUpdateManyMutationInput = {

  }

  export type InscripcionUncheckedUpdateManyInput = {
    usuario?: StringFieldUpdateOperationsInput | string
    comunidad?: IntFieldUpdateOperationsInput | number
  }

  export type MensajeCreateInput = {
    horaCreacion?: Date | string
    texto: string
    comunidadID: ComunidadCreateNestedOneWithoutMensajesInput
  }

  export type MensajeUncheckedCreateInput = {
    horaCreacion?: Date | string
    comunidad: number
    texto: string
  }

  export type MensajeUpdateInput = {
    horaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    texto?: StringFieldUpdateOperationsInput | string
    comunidadID?: ComunidadUpdateOneRequiredWithoutMensajesNestedInput
  }

  export type MensajeUncheckedUpdateInput = {
    horaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    comunidad?: IntFieldUpdateOperationsInput | number
    texto?: StringFieldUpdateOperationsInput | string
  }

  export type MensajeCreateManyInput = {
    horaCreacion?: Date | string
    comunidad: number
    texto: string
  }

  export type MensajeUpdateManyMutationInput = {
    horaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    texto?: StringFieldUpdateOperationsInput | string
  }

  export type MensajeUncheckedUpdateManyInput = {
    horaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    comunidad?: IntFieldUpdateOperationsInput | number
    texto?: StringFieldUpdateOperationsInput | string
  }

  export type ReservaCreateInput = {
    fecha: Date | string
    hora_inicio: Date | string
    hora_fin: Date | string
    usuarioID: UsuarioCreateNestedOneWithoutReservasInput
    zonaID: ZonaCreateNestedOneWithoutReservasInput
  }

  export type ReservaUncheckedCreateInput = {
    usuario: string
    comunidad: number
    zona: string
    fecha: Date | string
    hora_inicio: Date | string
    hora_fin: Date | string
  }

  export type ReservaUpdateInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_fin?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarioID?: UsuarioUpdateOneRequiredWithoutReservasNestedInput
    zonaID?: ZonaUpdateOneRequiredWithoutReservasNestedInput
  }

  export type ReservaUncheckedUpdateInput = {
    usuario?: StringFieldUpdateOperationsInput | string
    comunidad?: IntFieldUpdateOperationsInput | number
    zona?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_fin?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservaCreateManyInput = {
    usuario: string
    comunidad: number
    zona: string
    fecha: Date | string
    hora_inicio: Date | string
    hora_fin: Date | string
  }

  export type ReservaUpdateManyMutationInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_fin?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservaUncheckedUpdateManyInput = {
    usuario?: StringFieldUpdateOperationsInput | string
    comunidad?: IntFieldUpdateOperationsInput | number
    zona?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_fin?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type SolicitudCreateInput = {
    estado?: $Enums.Estado_Solicitud
    usuarioID: UsuarioCreateNestedOneWithoutSolicitudesInput
    comunidadID: ComunidadCreateNestedOneWithoutSolicitudesInput
  }

  export type SolicitudUncheckedCreateInput = {
    usuario: string
    comunidad: number
    estado?: $Enums.Estado_Solicitud
  }

  export type SolicitudUpdateInput = {
    estado?: EnumEstado_SolicitudFieldUpdateOperationsInput | $Enums.Estado_Solicitud
    usuarioID?: UsuarioUpdateOneRequiredWithoutSolicitudesNestedInput
    comunidadID?: ComunidadUpdateOneRequiredWithoutSolicitudesNestedInput
  }

  export type SolicitudUncheckedUpdateInput = {
    usuario?: StringFieldUpdateOperationsInput | string
    comunidad?: IntFieldUpdateOperationsInput | number
    estado?: EnumEstado_SolicitudFieldUpdateOperationsInput | $Enums.Estado_Solicitud
  }

  export type SolicitudCreateManyInput = {
    usuario: string
    comunidad: number
    estado?: $Enums.Estado_Solicitud
  }

  export type SolicitudUpdateManyMutationInput = {
    estado?: EnumEstado_SolicitudFieldUpdateOperationsInput | $Enums.Estado_Solicitud
  }

  export type SolicitudUncheckedUpdateManyInput = {
    usuario?: StringFieldUpdateOperationsInput | string
    comunidad?: IntFieldUpdateOperationsInput | number
    estado?: EnumEstado_SolicitudFieldUpdateOperationsInput | $Enums.Estado_Solicitud
  }

  export type UsuarioCreateInput = {
    correo: string
    rol?: $Enums.Role
    nombre_usuario: string
    nombre: string
    apellidos: string
    calle: string
    numero: number
    piso?: number | null
    letra?: string | null
    localidad: string
    credenciales?: CredencialesCreateNestedOneWithoutUsuarioInput
    incidencias?: IncidenciaCreateNestedManyWithoutUsuarioIDInput
    reservas?: ReservaCreateNestedManyWithoutUsuarioIDInput
    inscripciones?: InscripcionCreateNestedManyWithoutUsuarioIDInput
    solicitudes?: SolicitudCreateNestedManyWithoutUsuarioIDInput
  }

  export type UsuarioUncheckedCreateInput = {
    correo: string
    rol?: $Enums.Role
    nombre_usuario: string
    nombre: string
    apellidos: string
    calle: string
    numero: number
    piso?: number | null
    letra?: string | null
    localidad: string
    credenciales?: CredencialesUncheckedCreateNestedOneWithoutUsuarioInput
    incidencias?: IncidenciaUncheckedCreateNestedManyWithoutUsuarioIDInput
    reservas?: ReservaUncheckedCreateNestedManyWithoutUsuarioIDInput
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutUsuarioIDInput
    solicitudes?: SolicitudUncheckedCreateNestedManyWithoutUsuarioIDInput
  }

  export type UsuarioUpdateInput = {
    correo?: StringFieldUpdateOperationsInput | string
    rol?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    nombre_usuario?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    piso?: NullableIntFieldUpdateOperationsInput | number | null
    letra?: NullableStringFieldUpdateOperationsInput | string | null
    localidad?: StringFieldUpdateOperationsInput | string
    credenciales?: CredencialesUpdateOneWithoutUsuarioNestedInput
    incidencias?: IncidenciaUpdateManyWithoutUsuarioIDNestedInput
    reservas?: ReservaUpdateManyWithoutUsuarioIDNestedInput
    inscripciones?: InscripcionUpdateManyWithoutUsuarioIDNestedInput
    solicitudes?: SolicitudUpdateManyWithoutUsuarioIDNestedInput
  }

  export type UsuarioUncheckedUpdateInput = {
    correo?: StringFieldUpdateOperationsInput | string
    rol?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    nombre_usuario?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    piso?: NullableIntFieldUpdateOperationsInput | number | null
    letra?: NullableStringFieldUpdateOperationsInput | string | null
    localidad?: StringFieldUpdateOperationsInput | string
    credenciales?: CredencialesUncheckedUpdateOneWithoutUsuarioNestedInput
    incidencias?: IncidenciaUncheckedUpdateManyWithoutUsuarioIDNestedInput
    reservas?: ReservaUncheckedUpdateManyWithoutUsuarioIDNestedInput
    inscripciones?: InscripcionUncheckedUpdateManyWithoutUsuarioIDNestedInput
    solicitudes?: SolicitudUncheckedUpdateManyWithoutUsuarioIDNestedInput
  }

  export type UsuarioCreateManyInput = {
    correo: string
    rol?: $Enums.Role
    nombre_usuario: string
    nombre: string
    apellidos: string
    calle: string
    numero: number
    piso?: number | null
    letra?: string | null
    localidad: string
  }

  export type UsuarioUpdateManyMutationInput = {
    correo?: StringFieldUpdateOperationsInput | string
    rol?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    nombre_usuario?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    piso?: NullableIntFieldUpdateOperationsInput | number | null
    letra?: NullableStringFieldUpdateOperationsInput | string | null
    localidad?: StringFieldUpdateOperationsInput | string
  }

  export type UsuarioUncheckedUpdateManyInput = {
    correo?: StringFieldUpdateOperationsInput | string
    rol?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    nombre_usuario?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    piso?: NullableIntFieldUpdateOperationsInput | number | null
    letra?: NullableStringFieldUpdateOperationsInput | string | null
    localidad?: StringFieldUpdateOperationsInput | string
  }

  export type ZonaCreateInput = {
    nombre: string
    descripcion: string
    imagen?: string | null
    hora_inicio: Date | string
    hora_fin: Date | string
    comunidadID: ComunidadCreateNestedOneWithoutZonasInput
    reservas?: ReservaCreateNestedManyWithoutZonaIDInput
  }

  export type ZonaUncheckedCreateInput = {
    nombre: string
    comunidad: number
    descripcion: string
    imagen?: string | null
    hora_inicio: Date | string
    hora_fin: Date | string
    reservas?: ReservaUncheckedCreateNestedManyWithoutZonaIDInput
  }

  export type ZonaUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    imagen?: NullableStringFieldUpdateOperationsInput | string | null
    hora_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_fin?: DateTimeFieldUpdateOperationsInput | Date | string
    comunidadID?: ComunidadUpdateOneRequiredWithoutZonasNestedInput
    reservas?: ReservaUpdateManyWithoutZonaIDNestedInput
  }

  export type ZonaUncheckedUpdateInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    comunidad?: IntFieldUpdateOperationsInput | number
    descripcion?: StringFieldUpdateOperationsInput | string
    imagen?: NullableStringFieldUpdateOperationsInput | string | null
    hora_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_fin?: DateTimeFieldUpdateOperationsInput | Date | string
    reservas?: ReservaUncheckedUpdateManyWithoutZonaIDNestedInput
  }

  export type ZonaCreateManyInput = {
    nombre: string
    comunidad: number
    descripcion: string
    imagen?: string | null
    hora_inicio: Date | string
    hora_fin: Date | string
  }

  export type ZonaUpdateManyMutationInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    imagen?: NullableStringFieldUpdateOperationsInput | string | null
    hora_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_fin?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ZonaUncheckedUpdateManyInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    comunidad?: IntFieldUpdateOperationsInput | number
    descripcion?: StringFieldUpdateOperationsInput | string
    imagen?: NullableStringFieldUpdateOperationsInput | string | null
    hora_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_fin?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type StringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type MensajeListRelationFilter = {
    every?: MensajeWhereInput
    some?: MensajeWhereInput
    none?: MensajeWhereInput
  }

  export type ZonaListRelationFilter = {
    every?: ZonaWhereInput
    some?: ZonaWhereInput
    none?: ZonaWhereInput
  }

  export type IncidenciaListRelationFilter = {
    every?: IncidenciaWhereInput
    some?: IncidenciaWhereInput
    none?: IncidenciaWhereInput
  }

  export type InscripcionListRelationFilter = {
    every?: InscripcionWhereInput
    some?: InscripcionWhereInput
    none?: InscripcionWhereInput
  }

  export type SolicitudListRelationFilter = {
    every?: SolicitudWhereInput
    some?: SolicitudWhereInput
    none?: SolicitudWhereInput
  }

  export type MensajeOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ZonaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type IncidenciaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type InscripcionOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type SolicitudOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type ComunidadCountOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    calle?: SortOrder
    numero?: SortOrder
    localidad?: SortOrder
    provincia?: SortOrder
    pais?: SortOrder
  }

  export type ComunidadAvgOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
  }

  export type ComunidadMaxOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    calle?: SortOrder
    numero?: SortOrder
    localidad?: SortOrder
    provincia?: SortOrder
    pais?: SortOrder
  }

  export type ComunidadMinOrderByAggregateInput = {
    id?: SortOrder
    nombre?: SortOrder
    calle?: SortOrder
    numero?: SortOrder
    localidad?: SortOrder
    provincia?: SortOrder
    pais?: SortOrder
  }

  export type ComunidadSumOrderByAggregateInput = {
    id?: SortOrder
    numero?: SortOrder
  }

  export type IntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type StringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type DateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type ContactoNombreCorreoCreatedAtCompoundUniqueInput = {
    nombre: string
    correo: string
    createdAt: Date | string
  }

  export type ContactoCountOrderByAggregateInput = {
    nombre?: SortOrder
    correo?: SortOrder
    mensaje?: SortOrder
    createdAt?: SortOrder
  }

  export type ContactoMaxOrderByAggregateInput = {
    nombre?: SortOrder
    correo?: SortOrder
    mensaje?: SortOrder
    createdAt?: SortOrder
  }

  export type ContactoMinOrderByAggregateInput = {
    nombre?: SortOrder
    correo?: SortOrder
    mensaje?: SortOrder
    createdAt?: SortOrder
  }

  export type DateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type UsuarioScalarRelationFilter = {
    is?: UsuarioWhereInput
    isNot?: UsuarioWhereInput
  }

  export type CredencialesCountOrderByAggregateInput = {
    correoUsuario?: SortOrder
    password?: SortOrder
  }

  export type CredencialesMaxOrderByAggregateInput = {
    correoUsuario?: SortOrder
    password?: SortOrder
  }

  export type CredencialesMinOrderByAggregateInput = {
    correoUsuario?: SortOrder
    password?: SortOrder
  }

  export type EnumEstado_IncidenciaFilter<$PrismaModel = never> = {
    equals?: $Enums.Estado_Incidencia | EnumEstado_IncidenciaFieldRefInput<$PrismaModel>
    in?: $Enums.Estado_Incidencia[] | ListEnumEstado_IncidenciaFieldRefInput<$PrismaModel>
    notIn?: $Enums.Estado_Incidencia[] | ListEnumEstado_IncidenciaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstado_IncidenciaFilter<$PrismaModel> | $Enums.Estado_Incidencia
  }

  export type ComunidadScalarRelationFilter = {
    is?: ComunidadWhereInput
    isNot?: ComunidadWhereInput
  }

  export type IncidenciaComunidadUsuarioFechaCompoundUniqueInput = {
    comunidad: number
    usuario: string
    fecha: Date | string
  }

  export type IncidenciaCountOrderByAggregateInput = {
    comunidad?: SortOrder
    usuario?: SortOrder
    fecha?: SortOrder
    descripcion?: SortOrder
    estado?: SortOrder
  }

  export type IncidenciaAvgOrderByAggregateInput = {
    comunidad?: SortOrder
  }

  export type IncidenciaMaxOrderByAggregateInput = {
    comunidad?: SortOrder
    usuario?: SortOrder
    fecha?: SortOrder
    descripcion?: SortOrder
    estado?: SortOrder
  }

  export type IncidenciaMinOrderByAggregateInput = {
    comunidad?: SortOrder
    usuario?: SortOrder
    fecha?: SortOrder
    descripcion?: SortOrder
    estado?: SortOrder
  }

  export type IncidenciaSumOrderByAggregateInput = {
    comunidad?: SortOrder
  }

  export type EnumEstado_IncidenciaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Estado_Incidencia | EnumEstado_IncidenciaFieldRefInput<$PrismaModel>
    in?: $Enums.Estado_Incidencia[] | ListEnumEstado_IncidenciaFieldRefInput<$PrismaModel>
    notIn?: $Enums.Estado_Incidencia[] | ListEnumEstado_IncidenciaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstado_IncidenciaWithAggregatesFilter<$PrismaModel> | $Enums.Estado_Incidencia
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstado_IncidenciaFilter<$PrismaModel>
    _max?: NestedEnumEstado_IncidenciaFilter<$PrismaModel>
  }

  export type InscripcionUsuarioComunidadCompoundUniqueInput = {
    usuario: string
    comunidad: number
  }

  export type InscripcionCountOrderByAggregateInput = {
    usuario?: SortOrder
    comunidad?: SortOrder
  }

  export type InscripcionAvgOrderByAggregateInput = {
    comunidad?: SortOrder
  }

  export type InscripcionMaxOrderByAggregateInput = {
    usuario?: SortOrder
    comunidad?: SortOrder
  }

  export type InscripcionMinOrderByAggregateInput = {
    usuario?: SortOrder
    comunidad?: SortOrder
  }

  export type InscripcionSumOrderByAggregateInput = {
    comunidad?: SortOrder
  }

  export type MensajeHoraCreacionComunidadCompoundUniqueInput = {
    horaCreacion: Date | string
    comunidad: number
  }

  export type MensajeCountOrderByAggregateInput = {
    horaCreacion?: SortOrder
    comunidad?: SortOrder
    texto?: SortOrder
  }

  export type MensajeAvgOrderByAggregateInput = {
    comunidad?: SortOrder
  }

  export type MensajeMaxOrderByAggregateInput = {
    horaCreacion?: SortOrder
    comunidad?: SortOrder
    texto?: SortOrder
  }

  export type MensajeMinOrderByAggregateInput = {
    horaCreacion?: SortOrder
    comunidad?: SortOrder
    texto?: SortOrder
  }

  export type MensajeSumOrderByAggregateInput = {
    comunidad?: SortOrder
  }

  export type ZonaScalarRelationFilter = {
    is?: ZonaWhereInput
    isNot?: ZonaWhereInput
  }

  export type ReservaUsuarioComunidadZonaCompoundUniqueInput = {
    usuario: string
    comunidad: number
    zona: string
  }

  export type ReservaCountOrderByAggregateInput = {
    usuario?: SortOrder
    comunidad?: SortOrder
    zona?: SortOrder
    fecha?: SortOrder
    hora_inicio?: SortOrder
    hora_fin?: SortOrder
  }

  export type ReservaAvgOrderByAggregateInput = {
    comunidad?: SortOrder
  }

  export type ReservaMaxOrderByAggregateInput = {
    usuario?: SortOrder
    comunidad?: SortOrder
    zona?: SortOrder
    fecha?: SortOrder
    hora_inicio?: SortOrder
    hora_fin?: SortOrder
  }

  export type ReservaMinOrderByAggregateInput = {
    usuario?: SortOrder
    comunidad?: SortOrder
    zona?: SortOrder
    fecha?: SortOrder
    hora_inicio?: SortOrder
    hora_fin?: SortOrder
  }

  export type ReservaSumOrderByAggregateInput = {
    comunidad?: SortOrder
  }

  export type EnumEstado_SolicitudFilter<$PrismaModel = never> = {
    equals?: $Enums.Estado_Solicitud | EnumEstado_SolicitudFieldRefInput<$PrismaModel>
    in?: $Enums.Estado_Solicitud[] | ListEnumEstado_SolicitudFieldRefInput<$PrismaModel>
    notIn?: $Enums.Estado_Solicitud[] | ListEnumEstado_SolicitudFieldRefInput<$PrismaModel>
    not?: NestedEnumEstado_SolicitudFilter<$PrismaModel> | $Enums.Estado_Solicitud
  }

  export type SolicitudUsuarioComunidadCompoundUniqueInput = {
    usuario: string
    comunidad: number
  }

  export type SolicitudCountOrderByAggregateInput = {
    usuario?: SortOrder
    comunidad?: SortOrder
    estado?: SortOrder
  }

  export type SolicitudAvgOrderByAggregateInput = {
    comunidad?: SortOrder
  }

  export type SolicitudMaxOrderByAggregateInput = {
    usuario?: SortOrder
    comunidad?: SortOrder
    estado?: SortOrder
  }

  export type SolicitudMinOrderByAggregateInput = {
    usuario?: SortOrder
    comunidad?: SortOrder
    estado?: SortOrder
  }

  export type SolicitudSumOrderByAggregateInput = {
    comunidad?: SortOrder
  }

  export type EnumEstado_SolicitudWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Estado_Solicitud | EnumEstado_SolicitudFieldRefInput<$PrismaModel>
    in?: $Enums.Estado_Solicitud[] | ListEnumEstado_SolicitudFieldRefInput<$PrismaModel>
    notIn?: $Enums.Estado_Solicitud[] | ListEnumEstado_SolicitudFieldRefInput<$PrismaModel>
    not?: NestedEnumEstado_SolicitudWithAggregatesFilter<$PrismaModel> | $Enums.Estado_Solicitud
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstado_SolicitudFilter<$PrismaModel>
    _max?: NestedEnumEstado_SolicitudFilter<$PrismaModel>
  }

  export type EnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type IntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type StringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type CredencialesNullableScalarRelationFilter = {
    is?: CredencialesWhereInput | null
    isNot?: CredencialesWhereInput | null
  }

  export type ReservaListRelationFilter = {
    every?: ReservaWhereInput
    some?: ReservaWhereInput
    none?: ReservaWhereInput
  }

  export type SortOrderInput = {
    sort: SortOrder
    nulls?: NullsOrder
  }

  export type ReservaOrderByRelationAggregateInput = {
    _count?: SortOrder
  }

  export type UsuarioCountOrderByAggregateInput = {
    correo?: SortOrder
    rol?: SortOrder
    nombre_usuario?: SortOrder
    nombre?: SortOrder
    apellidos?: SortOrder
    calle?: SortOrder
    numero?: SortOrder
    piso?: SortOrder
    letra?: SortOrder
    localidad?: SortOrder
  }

  export type UsuarioAvgOrderByAggregateInput = {
    numero?: SortOrder
    piso?: SortOrder
  }

  export type UsuarioMaxOrderByAggregateInput = {
    correo?: SortOrder
    rol?: SortOrder
    nombre_usuario?: SortOrder
    nombre?: SortOrder
    apellidos?: SortOrder
    calle?: SortOrder
    numero?: SortOrder
    piso?: SortOrder
    letra?: SortOrder
    localidad?: SortOrder
  }

  export type UsuarioMinOrderByAggregateInput = {
    correo?: SortOrder
    rol?: SortOrder
    nombre_usuario?: SortOrder
    nombre?: SortOrder
    apellidos?: SortOrder
    calle?: SortOrder
    numero?: SortOrder
    piso?: SortOrder
    letra?: SortOrder
    localidad?: SortOrder
  }

  export type UsuarioSumOrderByAggregateInput = {
    numero?: SortOrder
    piso?: SortOrder
  }

  export type EnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type IntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type StringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    mode?: QueryMode
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type ZonaNombreComunidadCompoundUniqueInput = {
    nombre: string
    comunidad: number
  }

  export type ZonaCountOrderByAggregateInput = {
    nombre?: SortOrder
    comunidad?: SortOrder
    descripcion?: SortOrder
    imagen?: SortOrder
    hora_inicio?: SortOrder
    hora_fin?: SortOrder
  }

  export type ZonaAvgOrderByAggregateInput = {
    comunidad?: SortOrder
  }

  export type ZonaMaxOrderByAggregateInput = {
    nombre?: SortOrder
    comunidad?: SortOrder
    descripcion?: SortOrder
    imagen?: SortOrder
    hora_inicio?: SortOrder
    hora_fin?: SortOrder
  }

  export type ZonaMinOrderByAggregateInput = {
    nombre?: SortOrder
    comunidad?: SortOrder
    descripcion?: SortOrder
    imagen?: SortOrder
    hora_inicio?: SortOrder
    hora_fin?: SortOrder
  }

  export type ZonaSumOrderByAggregateInput = {
    comunidad?: SortOrder
  }

  export type MensajeCreateNestedManyWithoutComunidadIDInput = {
    create?: XOR<MensajeCreateWithoutComunidadIDInput, MensajeUncheckedCreateWithoutComunidadIDInput> | MensajeCreateWithoutComunidadIDInput[] | MensajeUncheckedCreateWithoutComunidadIDInput[]
    connectOrCreate?: MensajeCreateOrConnectWithoutComunidadIDInput | MensajeCreateOrConnectWithoutComunidadIDInput[]
    createMany?: MensajeCreateManyComunidadIDInputEnvelope
    connect?: MensajeWhereUniqueInput | MensajeWhereUniqueInput[]
  }

  export type ZonaCreateNestedManyWithoutComunidadIDInput = {
    create?: XOR<ZonaCreateWithoutComunidadIDInput, ZonaUncheckedCreateWithoutComunidadIDInput> | ZonaCreateWithoutComunidadIDInput[] | ZonaUncheckedCreateWithoutComunidadIDInput[]
    connectOrCreate?: ZonaCreateOrConnectWithoutComunidadIDInput | ZonaCreateOrConnectWithoutComunidadIDInput[]
    createMany?: ZonaCreateManyComunidadIDInputEnvelope
    connect?: ZonaWhereUniqueInput | ZonaWhereUniqueInput[]
  }

  export type IncidenciaCreateNestedManyWithoutComunidadIDInput = {
    create?: XOR<IncidenciaCreateWithoutComunidadIDInput, IncidenciaUncheckedCreateWithoutComunidadIDInput> | IncidenciaCreateWithoutComunidadIDInput[] | IncidenciaUncheckedCreateWithoutComunidadIDInput[]
    connectOrCreate?: IncidenciaCreateOrConnectWithoutComunidadIDInput | IncidenciaCreateOrConnectWithoutComunidadIDInput[]
    createMany?: IncidenciaCreateManyComunidadIDInputEnvelope
    connect?: IncidenciaWhereUniqueInput | IncidenciaWhereUniqueInput[]
  }

  export type InscripcionCreateNestedManyWithoutComunidadIDInput = {
    create?: XOR<InscripcionCreateWithoutComunidadIDInput, InscripcionUncheckedCreateWithoutComunidadIDInput> | InscripcionCreateWithoutComunidadIDInput[] | InscripcionUncheckedCreateWithoutComunidadIDInput[]
    connectOrCreate?: InscripcionCreateOrConnectWithoutComunidadIDInput | InscripcionCreateOrConnectWithoutComunidadIDInput[]
    createMany?: InscripcionCreateManyComunidadIDInputEnvelope
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
  }

  export type SolicitudCreateNestedManyWithoutComunidadIDInput = {
    create?: XOR<SolicitudCreateWithoutComunidadIDInput, SolicitudUncheckedCreateWithoutComunidadIDInput> | SolicitudCreateWithoutComunidadIDInput[] | SolicitudUncheckedCreateWithoutComunidadIDInput[]
    connectOrCreate?: SolicitudCreateOrConnectWithoutComunidadIDInput | SolicitudCreateOrConnectWithoutComunidadIDInput[]
    createMany?: SolicitudCreateManyComunidadIDInputEnvelope
    connect?: SolicitudWhereUniqueInput | SolicitudWhereUniqueInput[]
  }

  export type MensajeUncheckedCreateNestedManyWithoutComunidadIDInput = {
    create?: XOR<MensajeCreateWithoutComunidadIDInput, MensajeUncheckedCreateWithoutComunidadIDInput> | MensajeCreateWithoutComunidadIDInput[] | MensajeUncheckedCreateWithoutComunidadIDInput[]
    connectOrCreate?: MensajeCreateOrConnectWithoutComunidadIDInput | MensajeCreateOrConnectWithoutComunidadIDInput[]
    createMany?: MensajeCreateManyComunidadIDInputEnvelope
    connect?: MensajeWhereUniqueInput | MensajeWhereUniqueInput[]
  }

  export type ZonaUncheckedCreateNestedManyWithoutComunidadIDInput = {
    create?: XOR<ZonaCreateWithoutComunidadIDInput, ZonaUncheckedCreateWithoutComunidadIDInput> | ZonaCreateWithoutComunidadIDInput[] | ZonaUncheckedCreateWithoutComunidadIDInput[]
    connectOrCreate?: ZonaCreateOrConnectWithoutComunidadIDInput | ZonaCreateOrConnectWithoutComunidadIDInput[]
    createMany?: ZonaCreateManyComunidadIDInputEnvelope
    connect?: ZonaWhereUniqueInput | ZonaWhereUniqueInput[]
  }

  export type IncidenciaUncheckedCreateNestedManyWithoutComunidadIDInput = {
    create?: XOR<IncidenciaCreateWithoutComunidadIDInput, IncidenciaUncheckedCreateWithoutComunidadIDInput> | IncidenciaCreateWithoutComunidadIDInput[] | IncidenciaUncheckedCreateWithoutComunidadIDInput[]
    connectOrCreate?: IncidenciaCreateOrConnectWithoutComunidadIDInput | IncidenciaCreateOrConnectWithoutComunidadIDInput[]
    createMany?: IncidenciaCreateManyComunidadIDInputEnvelope
    connect?: IncidenciaWhereUniqueInput | IncidenciaWhereUniqueInput[]
  }

  export type InscripcionUncheckedCreateNestedManyWithoutComunidadIDInput = {
    create?: XOR<InscripcionCreateWithoutComunidadIDInput, InscripcionUncheckedCreateWithoutComunidadIDInput> | InscripcionCreateWithoutComunidadIDInput[] | InscripcionUncheckedCreateWithoutComunidadIDInput[]
    connectOrCreate?: InscripcionCreateOrConnectWithoutComunidadIDInput | InscripcionCreateOrConnectWithoutComunidadIDInput[]
    createMany?: InscripcionCreateManyComunidadIDInputEnvelope
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
  }

  export type SolicitudUncheckedCreateNestedManyWithoutComunidadIDInput = {
    create?: XOR<SolicitudCreateWithoutComunidadIDInput, SolicitudUncheckedCreateWithoutComunidadIDInput> | SolicitudCreateWithoutComunidadIDInput[] | SolicitudUncheckedCreateWithoutComunidadIDInput[]
    connectOrCreate?: SolicitudCreateOrConnectWithoutComunidadIDInput | SolicitudCreateOrConnectWithoutComunidadIDInput[]
    createMany?: SolicitudCreateManyComunidadIDInputEnvelope
    connect?: SolicitudWhereUniqueInput | SolicitudWhereUniqueInput[]
  }

  export type StringFieldUpdateOperationsInput = {
    set?: string
  }

  export type IntFieldUpdateOperationsInput = {
    set?: number
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type MensajeUpdateManyWithoutComunidadIDNestedInput = {
    create?: XOR<MensajeCreateWithoutComunidadIDInput, MensajeUncheckedCreateWithoutComunidadIDInput> | MensajeCreateWithoutComunidadIDInput[] | MensajeUncheckedCreateWithoutComunidadIDInput[]
    connectOrCreate?: MensajeCreateOrConnectWithoutComunidadIDInput | MensajeCreateOrConnectWithoutComunidadIDInput[]
    upsert?: MensajeUpsertWithWhereUniqueWithoutComunidadIDInput | MensajeUpsertWithWhereUniqueWithoutComunidadIDInput[]
    createMany?: MensajeCreateManyComunidadIDInputEnvelope
    set?: MensajeWhereUniqueInput | MensajeWhereUniqueInput[]
    disconnect?: MensajeWhereUniqueInput | MensajeWhereUniqueInput[]
    delete?: MensajeWhereUniqueInput | MensajeWhereUniqueInput[]
    connect?: MensajeWhereUniqueInput | MensajeWhereUniqueInput[]
    update?: MensajeUpdateWithWhereUniqueWithoutComunidadIDInput | MensajeUpdateWithWhereUniqueWithoutComunidadIDInput[]
    updateMany?: MensajeUpdateManyWithWhereWithoutComunidadIDInput | MensajeUpdateManyWithWhereWithoutComunidadIDInput[]
    deleteMany?: MensajeScalarWhereInput | MensajeScalarWhereInput[]
  }

  export type ZonaUpdateManyWithoutComunidadIDNestedInput = {
    create?: XOR<ZonaCreateWithoutComunidadIDInput, ZonaUncheckedCreateWithoutComunidadIDInput> | ZonaCreateWithoutComunidadIDInput[] | ZonaUncheckedCreateWithoutComunidadIDInput[]
    connectOrCreate?: ZonaCreateOrConnectWithoutComunidadIDInput | ZonaCreateOrConnectWithoutComunidadIDInput[]
    upsert?: ZonaUpsertWithWhereUniqueWithoutComunidadIDInput | ZonaUpsertWithWhereUniqueWithoutComunidadIDInput[]
    createMany?: ZonaCreateManyComunidadIDInputEnvelope
    set?: ZonaWhereUniqueInput | ZonaWhereUniqueInput[]
    disconnect?: ZonaWhereUniqueInput | ZonaWhereUniqueInput[]
    delete?: ZonaWhereUniqueInput | ZonaWhereUniqueInput[]
    connect?: ZonaWhereUniqueInput | ZonaWhereUniqueInput[]
    update?: ZonaUpdateWithWhereUniqueWithoutComunidadIDInput | ZonaUpdateWithWhereUniqueWithoutComunidadIDInput[]
    updateMany?: ZonaUpdateManyWithWhereWithoutComunidadIDInput | ZonaUpdateManyWithWhereWithoutComunidadIDInput[]
    deleteMany?: ZonaScalarWhereInput | ZonaScalarWhereInput[]
  }

  export type IncidenciaUpdateManyWithoutComunidadIDNestedInput = {
    create?: XOR<IncidenciaCreateWithoutComunidadIDInput, IncidenciaUncheckedCreateWithoutComunidadIDInput> | IncidenciaCreateWithoutComunidadIDInput[] | IncidenciaUncheckedCreateWithoutComunidadIDInput[]
    connectOrCreate?: IncidenciaCreateOrConnectWithoutComunidadIDInput | IncidenciaCreateOrConnectWithoutComunidadIDInput[]
    upsert?: IncidenciaUpsertWithWhereUniqueWithoutComunidadIDInput | IncidenciaUpsertWithWhereUniqueWithoutComunidadIDInput[]
    createMany?: IncidenciaCreateManyComunidadIDInputEnvelope
    set?: IncidenciaWhereUniqueInput | IncidenciaWhereUniqueInput[]
    disconnect?: IncidenciaWhereUniqueInput | IncidenciaWhereUniqueInput[]
    delete?: IncidenciaWhereUniqueInput | IncidenciaWhereUniqueInput[]
    connect?: IncidenciaWhereUniqueInput | IncidenciaWhereUniqueInput[]
    update?: IncidenciaUpdateWithWhereUniqueWithoutComunidadIDInput | IncidenciaUpdateWithWhereUniqueWithoutComunidadIDInput[]
    updateMany?: IncidenciaUpdateManyWithWhereWithoutComunidadIDInput | IncidenciaUpdateManyWithWhereWithoutComunidadIDInput[]
    deleteMany?: IncidenciaScalarWhereInput | IncidenciaScalarWhereInput[]
  }

  export type InscripcionUpdateManyWithoutComunidadIDNestedInput = {
    create?: XOR<InscripcionCreateWithoutComunidadIDInput, InscripcionUncheckedCreateWithoutComunidadIDInput> | InscripcionCreateWithoutComunidadIDInput[] | InscripcionUncheckedCreateWithoutComunidadIDInput[]
    connectOrCreate?: InscripcionCreateOrConnectWithoutComunidadIDInput | InscripcionCreateOrConnectWithoutComunidadIDInput[]
    upsert?: InscripcionUpsertWithWhereUniqueWithoutComunidadIDInput | InscripcionUpsertWithWhereUniqueWithoutComunidadIDInput[]
    createMany?: InscripcionCreateManyComunidadIDInputEnvelope
    set?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    disconnect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    delete?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    update?: InscripcionUpdateWithWhereUniqueWithoutComunidadIDInput | InscripcionUpdateWithWhereUniqueWithoutComunidadIDInput[]
    updateMany?: InscripcionUpdateManyWithWhereWithoutComunidadIDInput | InscripcionUpdateManyWithWhereWithoutComunidadIDInput[]
    deleteMany?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[]
  }

  export type SolicitudUpdateManyWithoutComunidadIDNestedInput = {
    create?: XOR<SolicitudCreateWithoutComunidadIDInput, SolicitudUncheckedCreateWithoutComunidadIDInput> | SolicitudCreateWithoutComunidadIDInput[] | SolicitudUncheckedCreateWithoutComunidadIDInput[]
    connectOrCreate?: SolicitudCreateOrConnectWithoutComunidadIDInput | SolicitudCreateOrConnectWithoutComunidadIDInput[]
    upsert?: SolicitudUpsertWithWhereUniqueWithoutComunidadIDInput | SolicitudUpsertWithWhereUniqueWithoutComunidadIDInput[]
    createMany?: SolicitudCreateManyComunidadIDInputEnvelope
    set?: SolicitudWhereUniqueInput | SolicitudWhereUniqueInput[]
    disconnect?: SolicitudWhereUniqueInput | SolicitudWhereUniqueInput[]
    delete?: SolicitudWhereUniqueInput | SolicitudWhereUniqueInput[]
    connect?: SolicitudWhereUniqueInput | SolicitudWhereUniqueInput[]
    update?: SolicitudUpdateWithWhereUniqueWithoutComunidadIDInput | SolicitudUpdateWithWhereUniqueWithoutComunidadIDInput[]
    updateMany?: SolicitudUpdateManyWithWhereWithoutComunidadIDInput | SolicitudUpdateManyWithWhereWithoutComunidadIDInput[]
    deleteMany?: SolicitudScalarWhereInput | SolicitudScalarWhereInput[]
  }

  export type MensajeUncheckedUpdateManyWithoutComunidadIDNestedInput = {
    create?: XOR<MensajeCreateWithoutComunidadIDInput, MensajeUncheckedCreateWithoutComunidadIDInput> | MensajeCreateWithoutComunidadIDInput[] | MensajeUncheckedCreateWithoutComunidadIDInput[]
    connectOrCreate?: MensajeCreateOrConnectWithoutComunidadIDInput | MensajeCreateOrConnectWithoutComunidadIDInput[]
    upsert?: MensajeUpsertWithWhereUniqueWithoutComunidadIDInput | MensajeUpsertWithWhereUniqueWithoutComunidadIDInput[]
    createMany?: MensajeCreateManyComunidadIDInputEnvelope
    set?: MensajeWhereUniqueInput | MensajeWhereUniqueInput[]
    disconnect?: MensajeWhereUniqueInput | MensajeWhereUniqueInput[]
    delete?: MensajeWhereUniqueInput | MensajeWhereUniqueInput[]
    connect?: MensajeWhereUniqueInput | MensajeWhereUniqueInput[]
    update?: MensajeUpdateWithWhereUniqueWithoutComunidadIDInput | MensajeUpdateWithWhereUniqueWithoutComunidadIDInput[]
    updateMany?: MensajeUpdateManyWithWhereWithoutComunidadIDInput | MensajeUpdateManyWithWhereWithoutComunidadIDInput[]
    deleteMany?: MensajeScalarWhereInput | MensajeScalarWhereInput[]
  }

  export type ZonaUncheckedUpdateManyWithoutComunidadIDNestedInput = {
    create?: XOR<ZonaCreateWithoutComunidadIDInput, ZonaUncheckedCreateWithoutComunidadIDInput> | ZonaCreateWithoutComunidadIDInput[] | ZonaUncheckedCreateWithoutComunidadIDInput[]
    connectOrCreate?: ZonaCreateOrConnectWithoutComunidadIDInput | ZonaCreateOrConnectWithoutComunidadIDInput[]
    upsert?: ZonaUpsertWithWhereUniqueWithoutComunidadIDInput | ZonaUpsertWithWhereUniqueWithoutComunidadIDInput[]
    createMany?: ZonaCreateManyComunidadIDInputEnvelope
    set?: ZonaWhereUniqueInput | ZonaWhereUniqueInput[]
    disconnect?: ZonaWhereUniqueInput | ZonaWhereUniqueInput[]
    delete?: ZonaWhereUniqueInput | ZonaWhereUniqueInput[]
    connect?: ZonaWhereUniqueInput | ZonaWhereUniqueInput[]
    update?: ZonaUpdateWithWhereUniqueWithoutComunidadIDInput | ZonaUpdateWithWhereUniqueWithoutComunidadIDInput[]
    updateMany?: ZonaUpdateManyWithWhereWithoutComunidadIDInput | ZonaUpdateManyWithWhereWithoutComunidadIDInput[]
    deleteMany?: ZonaScalarWhereInput | ZonaScalarWhereInput[]
  }

  export type IncidenciaUncheckedUpdateManyWithoutComunidadIDNestedInput = {
    create?: XOR<IncidenciaCreateWithoutComunidadIDInput, IncidenciaUncheckedCreateWithoutComunidadIDInput> | IncidenciaCreateWithoutComunidadIDInput[] | IncidenciaUncheckedCreateWithoutComunidadIDInput[]
    connectOrCreate?: IncidenciaCreateOrConnectWithoutComunidadIDInput | IncidenciaCreateOrConnectWithoutComunidadIDInput[]
    upsert?: IncidenciaUpsertWithWhereUniqueWithoutComunidadIDInput | IncidenciaUpsertWithWhereUniqueWithoutComunidadIDInput[]
    createMany?: IncidenciaCreateManyComunidadIDInputEnvelope
    set?: IncidenciaWhereUniqueInput | IncidenciaWhereUniqueInput[]
    disconnect?: IncidenciaWhereUniqueInput | IncidenciaWhereUniqueInput[]
    delete?: IncidenciaWhereUniqueInput | IncidenciaWhereUniqueInput[]
    connect?: IncidenciaWhereUniqueInput | IncidenciaWhereUniqueInput[]
    update?: IncidenciaUpdateWithWhereUniqueWithoutComunidadIDInput | IncidenciaUpdateWithWhereUniqueWithoutComunidadIDInput[]
    updateMany?: IncidenciaUpdateManyWithWhereWithoutComunidadIDInput | IncidenciaUpdateManyWithWhereWithoutComunidadIDInput[]
    deleteMany?: IncidenciaScalarWhereInput | IncidenciaScalarWhereInput[]
  }

  export type InscripcionUncheckedUpdateManyWithoutComunidadIDNestedInput = {
    create?: XOR<InscripcionCreateWithoutComunidadIDInput, InscripcionUncheckedCreateWithoutComunidadIDInput> | InscripcionCreateWithoutComunidadIDInput[] | InscripcionUncheckedCreateWithoutComunidadIDInput[]
    connectOrCreate?: InscripcionCreateOrConnectWithoutComunidadIDInput | InscripcionCreateOrConnectWithoutComunidadIDInput[]
    upsert?: InscripcionUpsertWithWhereUniqueWithoutComunidadIDInput | InscripcionUpsertWithWhereUniqueWithoutComunidadIDInput[]
    createMany?: InscripcionCreateManyComunidadIDInputEnvelope
    set?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    disconnect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    delete?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    update?: InscripcionUpdateWithWhereUniqueWithoutComunidadIDInput | InscripcionUpdateWithWhereUniqueWithoutComunidadIDInput[]
    updateMany?: InscripcionUpdateManyWithWhereWithoutComunidadIDInput | InscripcionUpdateManyWithWhereWithoutComunidadIDInput[]
    deleteMany?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[]
  }

  export type SolicitudUncheckedUpdateManyWithoutComunidadIDNestedInput = {
    create?: XOR<SolicitudCreateWithoutComunidadIDInput, SolicitudUncheckedCreateWithoutComunidadIDInput> | SolicitudCreateWithoutComunidadIDInput[] | SolicitudUncheckedCreateWithoutComunidadIDInput[]
    connectOrCreate?: SolicitudCreateOrConnectWithoutComunidadIDInput | SolicitudCreateOrConnectWithoutComunidadIDInput[]
    upsert?: SolicitudUpsertWithWhereUniqueWithoutComunidadIDInput | SolicitudUpsertWithWhereUniqueWithoutComunidadIDInput[]
    createMany?: SolicitudCreateManyComunidadIDInputEnvelope
    set?: SolicitudWhereUniqueInput | SolicitudWhereUniqueInput[]
    disconnect?: SolicitudWhereUniqueInput | SolicitudWhereUniqueInput[]
    delete?: SolicitudWhereUniqueInput | SolicitudWhereUniqueInput[]
    connect?: SolicitudWhereUniqueInput | SolicitudWhereUniqueInput[]
    update?: SolicitudUpdateWithWhereUniqueWithoutComunidadIDInput | SolicitudUpdateWithWhereUniqueWithoutComunidadIDInput[]
    updateMany?: SolicitudUpdateManyWithWhereWithoutComunidadIDInput | SolicitudUpdateManyWithWhereWithoutComunidadIDInput[]
    deleteMany?: SolicitudScalarWhereInput | SolicitudScalarWhereInput[]
  }

  export type DateTimeFieldUpdateOperationsInput = {
    set?: Date | string
  }

  export type UsuarioCreateNestedOneWithoutCredencialesInput = {
    create?: XOR<UsuarioCreateWithoutCredencialesInput, UsuarioUncheckedCreateWithoutCredencialesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutCredencialesInput
    connect?: UsuarioWhereUniqueInput
  }

  export type UsuarioUpdateOneRequiredWithoutCredencialesNestedInput = {
    create?: XOR<UsuarioCreateWithoutCredencialesInput, UsuarioUncheckedCreateWithoutCredencialesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutCredencialesInput
    upsert?: UsuarioUpsertWithoutCredencialesInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutCredencialesInput, UsuarioUpdateWithoutCredencialesInput>, UsuarioUncheckedUpdateWithoutCredencialesInput>
  }

  export type ComunidadCreateNestedOneWithoutIncidenciasInput = {
    create?: XOR<ComunidadCreateWithoutIncidenciasInput, ComunidadUncheckedCreateWithoutIncidenciasInput>
    connectOrCreate?: ComunidadCreateOrConnectWithoutIncidenciasInput
    connect?: ComunidadWhereUniqueInput
  }

  export type UsuarioCreateNestedOneWithoutIncidenciasInput = {
    create?: XOR<UsuarioCreateWithoutIncidenciasInput, UsuarioUncheckedCreateWithoutIncidenciasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutIncidenciasInput
    connect?: UsuarioWhereUniqueInput
  }

  export type EnumEstado_IncidenciaFieldUpdateOperationsInput = {
    set?: $Enums.Estado_Incidencia
  }

  export type ComunidadUpdateOneRequiredWithoutIncidenciasNestedInput = {
    create?: XOR<ComunidadCreateWithoutIncidenciasInput, ComunidadUncheckedCreateWithoutIncidenciasInput>
    connectOrCreate?: ComunidadCreateOrConnectWithoutIncidenciasInput
    upsert?: ComunidadUpsertWithoutIncidenciasInput
    connect?: ComunidadWhereUniqueInput
    update?: XOR<XOR<ComunidadUpdateToOneWithWhereWithoutIncidenciasInput, ComunidadUpdateWithoutIncidenciasInput>, ComunidadUncheckedUpdateWithoutIncidenciasInput>
  }

  export type UsuarioUpdateOneRequiredWithoutIncidenciasNestedInput = {
    create?: XOR<UsuarioCreateWithoutIncidenciasInput, UsuarioUncheckedCreateWithoutIncidenciasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutIncidenciasInput
    upsert?: UsuarioUpsertWithoutIncidenciasInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutIncidenciasInput, UsuarioUpdateWithoutIncidenciasInput>, UsuarioUncheckedUpdateWithoutIncidenciasInput>
  }

  export type UsuarioCreateNestedOneWithoutInscripcionesInput = {
    create?: XOR<UsuarioCreateWithoutInscripcionesInput, UsuarioUncheckedCreateWithoutInscripcionesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutInscripcionesInput
    connect?: UsuarioWhereUniqueInput
  }

  export type ComunidadCreateNestedOneWithoutInscritosInput = {
    create?: XOR<ComunidadCreateWithoutInscritosInput, ComunidadUncheckedCreateWithoutInscritosInput>
    connectOrCreate?: ComunidadCreateOrConnectWithoutInscritosInput
    connect?: ComunidadWhereUniqueInput
  }

  export type UsuarioUpdateOneRequiredWithoutInscripcionesNestedInput = {
    create?: XOR<UsuarioCreateWithoutInscripcionesInput, UsuarioUncheckedCreateWithoutInscripcionesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutInscripcionesInput
    upsert?: UsuarioUpsertWithoutInscripcionesInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutInscripcionesInput, UsuarioUpdateWithoutInscripcionesInput>, UsuarioUncheckedUpdateWithoutInscripcionesInput>
  }

  export type ComunidadUpdateOneRequiredWithoutInscritosNestedInput = {
    create?: XOR<ComunidadCreateWithoutInscritosInput, ComunidadUncheckedCreateWithoutInscritosInput>
    connectOrCreate?: ComunidadCreateOrConnectWithoutInscritosInput
    upsert?: ComunidadUpsertWithoutInscritosInput
    connect?: ComunidadWhereUniqueInput
    update?: XOR<XOR<ComunidadUpdateToOneWithWhereWithoutInscritosInput, ComunidadUpdateWithoutInscritosInput>, ComunidadUncheckedUpdateWithoutInscritosInput>
  }

  export type ComunidadCreateNestedOneWithoutMensajesInput = {
    create?: XOR<ComunidadCreateWithoutMensajesInput, ComunidadUncheckedCreateWithoutMensajesInput>
    connectOrCreate?: ComunidadCreateOrConnectWithoutMensajesInput
    connect?: ComunidadWhereUniqueInput
  }

  export type ComunidadUpdateOneRequiredWithoutMensajesNestedInput = {
    create?: XOR<ComunidadCreateWithoutMensajesInput, ComunidadUncheckedCreateWithoutMensajesInput>
    connectOrCreate?: ComunidadCreateOrConnectWithoutMensajesInput
    upsert?: ComunidadUpsertWithoutMensajesInput
    connect?: ComunidadWhereUniqueInput
    update?: XOR<XOR<ComunidadUpdateToOneWithWhereWithoutMensajesInput, ComunidadUpdateWithoutMensajesInput>, ComunidadUncheckedUpdateWithoutMensajesInput>
  }

  export type UsuarioCreateNestedOneWithoutReservasInput = {
    create?: XOR<UsuarioCreateWithoutReservasInput, UsuarioUncheckedCreateWithoutReservasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutReservasInput
    connect?: UsuarioWhereUniqueInput
  }

  export type ZonaCreateNestedOneWithoutReservasInput = {
    create?: XOR<ZonaCreateWithoutReservasInput, ZonaUncheckedCreateWithoutReservasInput>
    connectOrCreate?: ZonaCreateOrConnectWithoutReservasInput
    connect?: ZonaWhereUniqueInput
  }

  export type UsuarioUpdateOneRequiredWithoutReservasNestedInput = {
    create?: XOR<UsuarioCreateWithoutReservasInput, UsuarioUncheckedCreateWithoutReservasInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutReservasInput
    upsert?: UsuarioUpsertWithoutReservasInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutReservasInput, UsuarioUpdateWithoutReservasInput>, UsuarioUncheckedUpdateWithoutReservasInput>
  }

  export type ZonaUpdateOneRequiredWithoutReservasNestedInput = {
    create?: XOR<ZonaCreateWithoutReservasInput, ZonaUncheckedCreateWithoutReservasInput>
    connectOrCreate?: ZonaCreateOrConnectWithoutReservasInput
    upsert?: ZonaUpsertWithoutReservasInput
    connect?: ZonaWhereUniqueInput
    update?: XOR<XOR<ZonaUpdateToOneWithWhereWithoutReservasInput, ZonaUpdateWithoutReservasInput>, ZonaUncheckedUpdateWithoutReservasInput>
  }

  export type UsuarioCreateNestedOneWithoutSolicitudesInput = {
    create?: XOR<UsuarioCreateWithoutSolicitudesInput, UsuarioUncheckedCreateWithoutSolicitudesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutSolicitudesInput
    connect?: UsuarioWhereUniqueInput
  }

  export type ComunidadCreateNestedOneWithoutSolicitudesInput = {
    create?: XOR<ComunidadCreateWithoutSolicitudesInput, ComunidadUncheckedCreateWithoutSolicitudesInput>
    connectOrCreate?: ComunidadCreateOrConnectWithoutSolicitudesInput
    connect?: ComunidadWhereUniqueInput
  }

  export type EnumEstado_SolicitudFieldUpdateOperationsInput = {
    set?: $Enums.Estado_Solicitud
  }

  export type UsuarioUpdateOneRequiredWithoutSolicitudesNestedInput = {
    create?: XOR<UsuarioCreateWithoutSolicitudesInput, UsuarioUncheckedCreateWithoutSolicitudesInput>
    connectOrCreate?: UsuarioCreateOrConnectWithoutSolicitudesInput
    upsert?: UsuarioUpsertWithoutSolicitudesInput
    connect?: UsuarioWhereUniqueInput
    update?: XOR<XOR<UsuarioUpdateToOneWithWhereWithoutSolicitudesInput, UsuarioUpdateWithoutSolicitudesInput>, UsuarioUncheckedUpdateWithoutSolicitudesInput>
  }

  export type ComunidadUpdateOneRequiredWithoutSolicitudesNestedInput = {
    create?: XOR<ComunidadCreateWithoutSolicitudesInput, ComunidadUncheckedCreateWithoutSolicitudesInput>
    connectOrCreate?: ComunidadCreateOrConnectWithoutSolicitudesInput
    upsert?: ComunidadUpsertWithoutSolicitudesInput
    connect?: ComunidadWhereUniqueInput
    update?: XOR<XOR<ComunidadUpdateToOneWithWhereWithoutSolicitudesInput, ComunidadUpdateWithoutSolicitudesInput>, ComunidadUncheckedUpdateWithoutSolicitudesInput>
  }

  export type CredencialesCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<CredencialesCreateWithoutUsuarioInput, CredencialesUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: CredencialesCreateOrConnectWithoutUsuarioInput
    connect?: CredencialesWhereUniqueInput
  }

  export type IncidenciaCreateNestedManyWithoutUsuarioIDInput = {
    create?: XOR<IncidenciaCreateWithoutUsuarioIDInput, IncidenciaUncheckedCreateWithoutUsuarioIDInput> | IncidenciaCreateWithoutUsuarioIDInput[] | IncidenciaUncheckedCreateWithoutUsuarioIDInput[]
    connectOrCreate?: IncidenciaCreateOrConnectWithoutUsuarioIDInput | IncidenciaCreateOrConnectWithoutUsuarioIDInput[]
    createMany?: IncidenciaCreateManyUsuarioIDInputEnvelope
    connect?: IncidenciaWhereUniqueInput | IncidenciaWhereUniqueInput[]
  }

  export type ReservaCreateNestedManyWithoutUsuarioIDInput = {
    create?: XOR<ReservaCreateWithoutUsuarioIDInput, ReservaUncheckedCreateWithoutUsuarioIDInput> | ReservaCreateWithoutUsuarioIDInput[] | ReservaUncheckedCreateWithoutUsuarioIDInput[]
    connectOrCreate?: ReservaCreateOrConnectWithoutUsuarioIDInput | ReservaCreateOrConnectWithoutUsuarioIDInput[]
    createMany?: ReservaCreateManyUsuarioIDInputEnvelope
    connect?: ReservaWhereUniqueInput | ReservaWhereUniqueInput[]
  }

  export type InscripcionCreateNestedManyWithoutUsuarioIDInput = {
    create?: XOR<InscripcionCreateWithoutUsuarioIDInput, InscripcionUncheckedCreateWithoutUsuarioIDInput> | InscripcionCreateWithoutUsuarioIDInput[] | InscripcionUncheckedCreateWithoutUsuarioIDInput[]
    connectOrCreate?: InscripcionCreateOrConnectWithoutUsuarioIDInput | InscripcionCreateOrConnectWithoutUsuarioIDInput[]
    createMany?: InscripcionCreateManyUsuarioIDInputEnvelope
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
  }

  export type SolicitudCreateNestedManyWithoutUsuarioIDInput = {
    create?: XOR<SolicitudCreateWithoutUsuarioIDInput, SolicitudUncheckedCreateWithoutUsuarioIDInput> | SolicitudCreateWithoutUsuarioIDInput[] | SolicitudUncheckedCreateWithoutUsuarioIDInput[]
    connectOrCreate?: SolicitudCreateOrConnectWithoutUsuarioIDInput | SolicitudCreateOrConnectWithoutUsuarioIDInput[]
    createMany?: SolicitudCreateManyUsuarioIDInputEnvelope
    connect?: SolicitudWhereUniqueInput | SolicitudWhereUniqueInput[]
  }

  export type CredencialesUncheckedCreateNestedOneWithoutUsuarioInput = {
    create?: XOR<CredencialesCreateWithoutUsuarioInput, CredencialesUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: CredencialesCreateOrConnectWithoutUsuarioInput
    connect?: CredencialesWhereUniqueInput
  }

  export type IncidenciaUncheckedCreateNestedManyWithoutUsuarioIDInput = {
    create?: XOR<IncidenciaCreateWithoutUsuarioIDInput, IncidenciaUncheckedCreateWithoutUsuarioIDInput> | IncidenciaCreateWithoutUsuarioIDInput[] | IncidenciaUncheckedCreateWithoutUsuarioIDInput[]
    connectOrCreate?: IncidenciaCreateOrConnectWithoutUsuarioIDInput | IncidenciaCreateOrConnectWithoutUsuarioIDInput[]
    createMany?: IncidenciaCreateManyUsuarioIDInputEnvelope
    connect?: IncidenciaWhereUniqueInput | IncidenciaWhereUniqueInput[]
  }

  export type ReservaUncheckedCreateNestedManyWithoutUsuarioIDInput = {
    create?: XOR<ReservaCreateWithoutUsuarioIDInput, ReservaUncheckedCreateWithoutUsuarioIDInput> | ReservaCreateWithoutUsuarioIDInput[] | ReservaUncheckedCreateWithoutUsuarioIDInput[]
    connectOrCreate?: ReservaCreateOrConnectWithoutUsuarioIDInput | ReservaCreateOrConnectWithoutUsuarioIDInput[]
    createMany?: ReservaCreateManyUsuarioIDInputEnvelope
    connect?: ReservaWhereUniqueInput | ReservaWhereUniqueInput[]
  }

  export type InscripcionUncheckedCreateNestedManyWithoutUsuarioIDInput = {
    create?: XOR<InscripcionCreateWithoutUsuarioIDInput, InscripcionUncheckedCreateWithoutUsuarioIDInput> | InscripcionCreateWithoutUsuarioIDInput[] | InscripcionUncheckedCreateWithoutUsuarioIDInput[]
    connectOrCreate?: InscripcionCreateOrConnectWithoutUsuarioIDInput | InscripcionCreateOrConnectWithoutUsuarioIDInput[]
    createMany?: InscripcionCreateManyUsuarioIDInputEnvelope
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
  }

  export type SolicitudUncheckedCreateNestedManyWithoutUsuarioIDInput = {
    create?: XOR<SolicitudCreateWithoutUsuarioIDInput, SolicitudUncheckedCreateWithoutUsuarioIDInput> | SolicitudCreateWithoutUsuarioIDInput[] | SolicitudUncheckedCreateWithoutUsuarioIDInput[]
    connectOrCreate?: SolicitudCreateOrConnectWithoutUsuarioIDInput | SolicitudCreateOrConnectWithoutUsuarioIDInput[]
    createMany?: SolicitudCreateManyUsuarioIDInputEnvelope
    connect?: SolicitudWhereUniqueInput | SolicitudWhereUniqueInput[]
  }

  export type EnumRoleFieldUpdateOperationsInput = {
    set?: $Enums.Role
  }

  export type NullableIntFieldUpdateOperationsInput = {
    set?: number | null
    increment?: number
    decrement?: number
    multiply?: number
    divide?: number
  }

  export type NullableStringFieldUpdateOperationsInput = {
    set?: string | null
  }

  export type CredencialesUpdateOneWithoutUsuarioNestedInput = {
    create?: XOR<CredencialesCreateWithoutUsuarioInput, CredencialesUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: CredencialesCreateOrConnectWithoutUsuarioInput
    upsert?: CredencialesUpsertWithoutUsuarioInput
    disconnect?: CredencialesWhereInput | boolean
    delete?: CredencialesWhereInput | boolean
    connect?: CredencialesWhereUniqueInput
    update?: XOR<XOR<CredencialesUpdateToOneWithWhereWithoutUsuarioInput, CredencialesUpdateWithoutUsuarioInput>, CredencialesUncheckedUpdateWithoutUsuarioInput>
  }

  export type IncidenciaUpdateManyWithoutUsuarioIDNestedInput = {
    create?: XOR<IncidenciaCreateWithoutUsuarioIDInput, IncidenciaUncheckedCreateWithoutUsuarioIDInput> | IncidenciaCreateWithoutUsuarioIDInput[] | IncidenciaUncheckedCreateWithoutUsuarioIDInput[]
    connectOrCreate?: IncidenciaCreateOrConnectWithoutUsuarioIDInput | IncidenciaCreateOrConnectWithoutUsuarioIDInput[]
    upsert?: IncidenciaUpsertWithWhereUniqueWithoutUsuarioIDInput | IncidenciaUpsertWithWhereUniqueWithoutUsuarioIDInput[]
    createMany?: IncidenciaCreateManyUsuarioIDInputEnvelope
    set?: IncidenciaWhereUniqueInput | IncidenciaWhereUniqueInput[]
    disconnect?: IncidenciaWhereUniqueInput | IncidenciaWhereUniqueInput[]
    delete?: IncidenciaWhereUniqueInput | IncidenciaWhereUniqueInput[]
    connect?: IncidenciaWhereUniqueInput | IncidenciaWhereUniqueInput[]
    update?: IncidenciaUpdateWithWhereUniqueWithoutUsuarioIDInput | IncidenciaUpdateWithWhereUniqueWithoutUsuarioIDInput[]
    updateMany?: IncidenciaUpdateManyWithWhereWithoutUsuarioIDInput | IncidenciaUpdateManyWithWhereWithoutUsuarioIDInput[]
    deleteMany?: IncidenciaScalarWhereInput | IncidenciaScalarWhereInput[]
  }

  export type ReservaUpdateManyWithoutUsuarioIDNestedInput = {
    create?: XOR<ReservaCreateWithoutUsuarioIDInput, ReservaUncheckedCreateWithoutUsuarioIDInput> | ReservaCreateWithoutUsuarioIDInput[] | ReservaUncheckedCreateWithoutUsuarioIDInput[]
    connectOrCreate?: ReservaCreateOrConnectWithoutUsuarioIDInput | ReservaCreateOrConnectWithoutUsuarioIDInput[]
    upsert?: ReservaUpsertWithWhereUniqueWithoutUsuarioIDInput | ReservaUpsertWithWhereUniqueWithoutUsuarioIDInput[]
    createMany?: ReservaCreateManyUsuarioIDInputEnvelope
    set?: ReservaWhereUniqueInput | ReservaWhereUniqueInput[]
    disconnect?: ReservaWhereUniqueInput | ReservaWhereUniqueInput[]
    delete?: ReservaWhereUniqueInput | ReservaWhereUniqueInput[]
    connect?: ReservaWhereUniqueInput | ReservaWhereUniqueInput[]
    update?: ReservaUpdateWithWhereUniqueWithoutUsuarioIDInput | ReservaUpdateWithWhereUniqueWithoutUsuarioIDInput[]
    updateMany?: ReservaUpdateManyWithWhereWithoutUsuarioIDInput | ReservaUpdateManyWithWhereWithoutUsuarioIDInput[]
    deleteMany?: ReservaScalarWhereInput | ReservaScalarWhereInput[]
  }

  export type InscripcionUpdateManyWithoutUsuarioIDNestedInput = {
    create?: XOR<InscripcionCreateWithoutUsuarioIDInput, InscripcionUncheckedCreateWithoutUsuarioIDInput> | InscripcionCreateWithoutUsuarioIDInput[] | InscripcionUncheckedCreateWithoutUsuarioIDInput[]
    connectOrCreate?: InscripcionCreateOrConnectWithoutUsuarioIDInput | InscripcionCreateOrConnectWithoutUsuarioIDInput[]
    upsert?: InscripcionUpsertWithWhereUniqueWithoutUsuarioIDInput | InscripcionUpsertWithWhereUniqueWithoutUsuarioIDInput[]
    createMany?: InscripcionCreateManyUsuarioIDInputEnvelope
    set?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    disconnect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    delete?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    update?: InscripcionUpdateWithWhereUniqueWithoutUsuarioIDInput | InscripcionUpdateWithWhereUniqueWithoutUsuarioIDInput[]
    updateMany?: InscripcionUpdateManyWithWhereWithoutUsuarioIDInput | InscripcionUpdateManyWithWhereWithoutUsuarioIDInput[]
    deleteMany?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[]
  }

  export type SolicitudUpdateManyWithoutUsuarioIDNestedInput = {
    create?: XOR<SolicitudCreateWithoutUsuarioIDInput, SolicitudUncheckedCreateWithoutUsuarioIDInput> | SolicitudCreateWithoutUsuarioIDInput[] | SolicitudUncheckedCreateWithoutUsuarioIDInput[]
    connectOrCreate?: SolicitudCreateOrConnectWithoutUsuarioIDInput | SolicitudCreateOrConnectWithoutUsuarioIDInput[]
    upsert?: SolicitudUpsertWithWhereUniqueWithoutUsuarioIDInput | SolicitudUpsertWithWhereUniqueWithoutUsuarioIDInput[]
    createMany?: SolicitudCreateManyUsuarioIDInputEnvelope
    set?: SolicitudWhereUniqueInput | SolicitudWhereUniqueInput[]
    disconnect?: SolicitudWhereUniqueInput | SolicitudWhereUniqueInput[]
    delete?: SolicitudWhereUniqueInput | SolicitudWhereUniqueInput[]
    connect?: SolicitudWhereUniqueInput | SolicitudWhereUniqueInput[]
    update?: SolicitudUpdateWithWhereUniqueWithoutUsuarioIDInput | SolicitudUpdateWithWhereUniqueWithoutUsuarioIDInput[]
    updateMany?: SolicitudUpdateManyWithWhereWithoutUsuarioIDInput | SolicitudUpdateManyWithWhereWithoutUsuarioIDInput[]
    deleteMany?: SolicitudScalarWhereInput | SolicitudScalarWhereInput[]
  }

  export type CredencialesUncheckedUpdateOneWithoutUsuarioNestedInput = {
    create?: XOR<CredencialesCreateWithoutUsuarioInput, CredencialesUncheckedCreateWithoutUsuarioInput>
    connectOrCreate?: CredencialesCreateOrConnectWithoutUsuarioInput
    upsert?: CredencialesUpsertWithoutUsuarioInput
    disconnect?: CredencialesWhereInput | boolean
    delete?: CredencialesWhereInput | boolean
    connect?: CredencialesWhereUniqueInput
    update?: XOR<XOR<CredencialesUpdateToOneWithWhereWithoutUsuarioInput, CredencialesUpdateWithoutUsuarioInput>, CredencialesUncheckedUpdateWithoutUsuarioInput>
  }

  export type IncidenciaUncheckedUpdateManyWithoutUsuarioIDNestedInput = {
    create?: XOR<IncidenciaCreateWithoutUsuarioIDInput, IncidenciaUncheckedCreateWithoutUsuarioIDInput> | IncidenciaCreateWithoutUsuarioIDInput[] | IncidenciaUncheckedCreateWithoutUsuarioIDInput[]
    connectOrCreate?: IncidenciaCreateOrConnectWithoutUsuarioIDInput | IncidenciaCreateOrConnectWithoutUsuarioIDInput[]
    upsert?: IncidenciaUpsertWithWhereUniqueWithoutUsuarioIDInput | IncidenciaUpsertWithWhereUniqueWithoutUsuarioIDInput[]
    createMany?: IncidenciaCreateManyUsuarioIDInputEnvelope
    set?: IncidenciaWhereUniqueInput | IncidenciaWhereUniqueInput[]
    disconnect?: IncidenciaWhereUniqueInput | IncidenciaWhereUniqueInput[]
    delete?: IncidenciaWhereUniqueInput | IncidenciaWhereUniqueInput[]
    connect?: IncidenciaWhereUniqueInput | IncidenciaWhereUniqueInput[]
    update?: IncidenciaUpdateWithWhereUniqueWithoutUsuarioIDInput | IncidenciaUpdateWithWhereUniqueWithoutUsuarioIDInput[]
    updateMany?: IncidenciaUpdateManyWithWhereWithoutUsuarioIDInput | IncidenciaUpdateManyWithWhereWithoutUsuarioIDInput[]
    deleteMany?: IncidenciaScalarWhereInput | IncidenciaScalarWhereInput[]
  }

  export type ReservaUncheckedUpdateManyWithoutUsuarioIDNestedInput = {
    create?: XOR<ReservaCreateWithoutUsuarioIDInput, ReservaUncheckedCreateWithoutUsuarioIDInput> | ReservaCreateWithoutUsuarioIDInput[] | ReservaUncheckedCreateWithoutUsuarioIDInput[]
    connectOrCreate?: ReservaCreateOrConnectWithoutUsuarioIDInput | ReservaCreateOrConnectWithoutUsuarioIDInput[]
    upsert?: ReservaUpsertWithWhereUniqueWithoutUsuarioIDInput | ReservaUpsertWithWhereUniqueWithoutUsuarioIDInput[]
    createMany?: ReservaCreateManyUsuarioIDInputEnvelope
    set?: ReservaWhereUniqueInput | ReservaWhereUniqueInput[]
    disconnect?: ReservaWhereUniqueInput | ReservaWhereUniqueInput[]
    delete?: ReservaWhereUniqueInput | ReservaWhereUniqueInput[]
    connect?: ReservaWhereUniqueInput | ReservaWhereUniqueInput[]
    update?: ReservaUpdateWithWhereUniqueWithoutUsuarioIDInput | ReservaUpdateWithWhereUniqueWithoutUsuarioIDInput[]
    updateMany?: ReservaUpdateManyWithWhereWithoutUsuarioIDInput | ReservaUpdateManyWithWhereWithoutUsuarioIDInput[]
    deleteMany?: ReservaScalarWhereInput | ReservaScalarWhereInput[]
  }

  export type InscripcionUncheckedUpdateManyWithoutUsuarioIDNestedInput = {
    create?: XOR<InscripcionCreateWithoutUsuarioIDInput, InscripcionUncheckedCreateWithoutUsuarioIDInput> | InscripcionCreateWithoutUsuarioIDInput[] | InscripcionUncheckedCreateWithoutUsuarioIDInput[]
    connectOrCreate?: InscripcionCreateOrConnectWithoutUsuarioIDInput | InscripcionCreateOrConnectWithoutUsuarioIDInput[]
    upsert?: InscripcionUpsertWithWhereUniqueWithoutUsuarioIDInput | InscripcionUpsertWithWhereUniqueWithoutUsuarioIDInput[]
    createMany?: InscripcionCreateManyUsuarioIDInputEnvelope
    set?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    disconnect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    delete?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    connect?: InscripcionWhereUniqueInput | InscripcionWhereUniqueInput[]
    update?: InscripcionUpdateWithWhereUniqueWithoutUsuarioIDInput | InscripcionUpdateWithWhereUniqueWithoutUsuarioIDInput[]
    updateMany?: InscripcionUpdateManyWithWhereWithoutUsuarioIDInput | InscripcionUpdateManyWithWhereWithoutUsuarioIDInput[]
    deleteMany?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[]
  }

  export type SolicitudUncheckedUpdateManyWithoutUsuarioIDNestedInput = {
    create?: XOR<SolicitudCreateWithoutUsuarioIDInput, SolicitudUncheckedCreateWithoutUsuarioIDInput> | SolicitudCreateWithoutUsuarioIDInput[] | SolicitudUncheckedCreateWithoutUsuarioIDInput[]
    connectOrCreate?: SolicitudCreateOrConnectWithoutUsuarioIDInput | SolicitudCreateOrConnectWithoutUsuarioIDInput[]
    upsert?: SolicitudUpsertWithWhereUniqueWithoutUsuarioIDInput | SolicitudUpsertWithWhereUniqueWithoutUsuarioIDInput[]
    createMany?: SolicitudCreateManyUsuarioIDInputEnvelope
    set?: SolicitudWhereUniqueInput | SolicitudWhereUniqueInput[]
    disconnect?: SolicitudWhereUniqueInput | SolicitudWhereUniqueInput[]
    delete?: SolicitudWhereUniqueInput | SolicitudWhereUniqueInput[]
    connect?: SolicitudWhereUniqueInput | SolicitudWhereUniqueInput[]
    update?: SolicitudUpdateWithWhereUniqueWithoutUsuarioIDInput | SolicitudUpdateWithWhereUniqueWithoutUsuarioIDInput[]
    updateMany?: SolicitudUpdateManyWithWhereWithoutUsuarioIDInput | SolicitudUpdateManyWithWhereWithoutUsuarioIDInput[]
    deleteMany?: SolicitudScalarWhereInput | SolicitudScalarWhereInput[]
  }

  export type ComunidadCreateNestedOneWithoutZonasInput = {
    create?: XOR<ComunidadCreateWithoutZonasInput, ComunidadUncheckedCreateWithoutZonasInput>
    connectOrCreate?: ComunidadCreateOrConnectWithoutZonasInput
    connect?: ComunidadWhereUniqueInput
  }

  export type ReservaCreateNestedManyWithoutZonaIDInput = {
    create?: XOR<ReservaCreateWithoutZonaIDInput, ReservaUncheckedCreateWithoutZonaIDInput> | ReservaCreateWithoutZonaIDInput[] | ReservaUncheckedCreateWithoutZonaIDInput[]
    connectOrCreate?: ReservaCreateOrConnectWithoutZonaIDInput | ReservaCreateOrConnectWithoutZonaIDInput[]
    createMany?: ReservaCreateManyZonaIDInputEnvelope
    connect?: ReservaWhereUniqueInput | ReservaWhereUniqueInput[]
  }

  export type ReservaUncheckedCreateNestedManyWithoutZonaIDInput = {
    create?: XOR<ReservaCreateWithoutZonaIDInput, ReservaUncheckedCreateWithoutZonaIDInput> | ReservaCreateWithoutZonaIDInput[] | ReservaUncheckedCreateWithoutZonaIDInput[]
    connectOrCreate?: ReservaCreateOrConnectWithoutZonaIDInput | ReservaCreateOrConnectWithoutZonaIDInput[]
    createMany?: ReservaCreateManyZonaIDInputEnvelope
    connect?: ReservaWhereUniqueInput | ReservaWhereUniqueInput[]
  }

  export type ComunidadUpdateOneRequiredWithoutZonasNestedInput = {
    create?: XOR<ComunidadCreateWithoutZonasInput, ComunidadUncheckedCreateWithoutZonasInput>
    connectOrCreate?: ComunidadCreateOrConnectWithoutZonasInput
    upsert?: ComunidadUpsertWithoutZonasInput
    connect?: ComunidadWhereUniqueInput
    update?: XOR<XOR<ComunidadUpdateToOneWithWhereWithoutZonasInput, ComunidadUpdateWithoutZonasInput>, ComunidadUncheckedUpdateWithoutZonasInput>
  }

  export type ReservaUpdateManyWithoutZonaIDNestedInput = {
    create?: XOR<ReservaCreateWithoutZonaIDInput, ReservaUncheckedCreateWithoutZonaIDInput> | ReservaCreateWithoutZonaIDInput[] | ReservaUncheckedCreateWithoutZonaIDInput[]
    connectOrCreate?: ReservaCreateOrConnectWithoutZonaIDInput | ReservaCreateOrConnectWithoutZonaIDInput[]
    upsert?: ReservaUpsertWithWhereUniqueWithoutZonaIDInput | ReservaUpsertWithWhereUniqueWithoutZonaIDInput[]
    createMany?: ReservaCreateManyZonaIDInputEnvelope
    set?: ReservaWhereUniqueInput | ReservaWhereUniqueInput[]
    disconnect?: ReservaWhereUniqueInput | ReservaWhereUniqueInput[]
    delete?: ReservaWhereUniqueInput | ReservaWhereUniqueInput[]
    connect?: ReservaWhereUniqueInput | ReservaWhereUniqueInput[]
    update?: ReservaUpdateWithWhereUniqueWithoutZonaIDInput | ReservaUpdateWithWhereUniqueWithoutZonaIDInput[]
    updateMany?: ReservaUpdateManyWithWhereWithoutZonaIDInput | ReservaUpdateManyWithWhereWithoutZonaIDInput[]
    deleteMany?: ReservaScalarWhereInput | ReservaScalarWhereInput[]
  }

  export type ReservaUncheckedUpdateManyWithoutZonaIDNestedInput = {
    create?: XOR<ReservaCreateWithoutZonaIDInput, ReservaUncheckedCreateWithoutZonaIDInput> | ReservaCreateWithoutZonaIDInput[] | ReservaUncheckedCreateWithoutZonaIDInput[]
    connectOrCreate?: ReservaCreateOrConnectWithoutZonaIDInput | ReservaCreateOrConnectWithoutZonaIDInput[]
    upsert?: ReservaUpsertWithWhereUniqueWithoutZonaIDInput | ReservaUpsertWithWhereUniqueWithoutZonaIDInput[]
    createMany?: ReservaCreateManyZonaIDInputEnvelope
    set?: ReservaWhereUniqueInput | ReservaWhereUniqueInput[]
    disconnect?: ReservaWhereUniqueInput | ReservaWhereUniqueInput[]
    delete?: ReservaWhereUniqueInput | ReservaWhereUniqueInput[]
    connect?: ReservaWhereUniqueInput | ReservaWhereUniqueInput[]
    update?: ReservaUpdateWithWhereUniqueWithoutZonaIDInput | ReservaUpdateWithWhereUniqueWithoutZonaIDInput[]
    updateMany?: ReservaUpdateManyWithWhereWithoutZonaIDInput | ReservaUpdateManyWithWhereWithoutZonaIDInput[]
    deleteMany?: ReservaScalarWhereInput | ReservaScalarWhereInput[]
  }

  export type NestedIntFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntFilter<$PrismaModel> | number
  }

  export type NestedStringFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringFilter<$PrismaModel> | string
  }

  export type NestedIntWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel>
    in?: number[] | ListIntFieldRefInput<$PrismaModel>
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel>
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntWithAggregatesFilter<$PrismaModel> | number
    _count?: NestedIntFilter<$PrismaModel>
    _avg?: NestedFloatFilter<$PrismaModel>
    _sum?: NestedIntFilter<$PrismaModel>
    _min?: NestedIntFilter<$PrismaModel>
    _max?: NestedIntFilter<$PrismaModel>
  }

  export type NestedFloatFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel>
    in?: number[] | ListFloatFieldRefInput<$PrismaModel>
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel>
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatFilter<$PrismaModel> | number
  }

  export type NestedStringWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel>
    in?: string[] | ListStringFieldRefInput<$PrismaModel>
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel>
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringWithAggregatesFilter<$PrismaModel> | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedStringFilter<$PrismaModel>
    _max?: NestedStringFilter<$PrismaModel>
  }

  export type NestedDateTimeFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeFilter<$PrismaModel> | Date | string
  }

  export type NestedDateTimeWithAggregatesFilter<$PrismaModel = never> = {
    equals?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    in?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    notIn?: Date[] | string[] | ListDateTimeFieldRefInput<$PrismaModel>
    lt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    lte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gt?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    gte?: Date | string | DateTimeFieldRefInput<$PrismaModel>
    not?: NestedDateTimeWithAggregatesFilter<$PrismaModel> | Date | string
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedDateTimeFilter<$PrismaModel>
    _max?: NestedDateTimeFilter<$PrismaModel>
  }

  export type NestedEnumEstado_IncidenciaFilter<$PrismaModel = never> = {
    equals?: $Enums.Estado_Incidencia | EnumEstado_IncidenciaFieldRefInput<$PrismaModel>
    in?: $Enums.Estado_Incidencia[] | ListEnumEstado_IncidenciaFieldRefInput<$PrismaModel>
    notIn?: $Enums.Estado_Incidencia[] | ListEnumEstado_IncidenciaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstado_IncidenciaFilter<$PrismaModel> | $Enums.Estado_Incidencia
  }

  export type NestedEnumEstado_IncidenciaWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Estado_Incidencia | EnumEstado_IncidenciaFieldRefInput<$PrismaModel>
    in?: $Enums.Estado_Incidencia[] | ListEnumEstado_IncidenciaFieldRefInput<$PrismaModel>
    notIn?: $Enums.Estado_Incidencia[] | ListEnumEstado_IncidenciaFieldRefInput<$PrismaModel>
    not?: NestedEnumEstado_IncidenciaWithAggregatesFilter<$PrismaModel> | $Enums.Estado_Incidencia
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstado_IncidenciaFilter<$PrismaModel>
    _max?: NestedEnumEstado_IncidenciaFilter<$PrismaModel>
  }

  export type NestedEnumEstado_SolicitudFilter<$PrismaModel = never> = {
    equals?: $Enums.Estado_Solicitud | EnumEstado_SolicitudFieldRefInput<$PrismaModel>
    in?: $Enums.Estado_Solicitud[] | ListEnumEstado_SolicitudFieldRefInput<$PrismaModel>
    notIn?: $Enums.Estado_Solicitud[] | ListEnumEstado_SolicitudFieldRefInput<$PrismaModel>
    not?: NestedEnumEstado_SolicitudFilter<$PrismaModel> | $Enums.Estado_Solicitud
  }

  export type NestedEnumEstado_SolicitudWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Estado_Solicitud | EnumEstado_SolicitudFieldRefInput<$PrismaModel>
    in?: $Enums.Estado_Solicitud[] | ListEnumEstado_SolicitudFieldRefInput<$PrismaModel>
    notIn?: $Enums.Estado_Solicitud[] | ListEnumEstado_SolicitudFieldRefInput<$PrismaModel>
    not?: NestedEnumEstado_SolicitudWithAggregatesFilter<$PrismaModel> | $Enums.Estado_Solicitud
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumEstado_SolicitudFilter<$PrismaModel>
    _max?: NestedEnumEstado_SolicitudFilter<$PrismaModel>
  }

  export type NestedEnumRoleFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleFilter<$PrismaModel> | $Enums.Role
  }

  export type NestedIntNullableFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableFilter<$PrismaModel> | string | null
  }

  export type NestedEnumRoleWithAggregatesFilter<$PrismaModel = never> = {
    equals?: $Enums.Role | EnumRoleFieldRefInput<$PrismaModel>
    in?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    notIn?: $Enums.Role[] | ListEnumRoleFieldRefInput<$PrismaModel>
    not?: NestedEnumRoleWithAggregatesFilter<$PrismaModel> | $Enums.Role
    _count?: NestedIntFilter<$PrismaModel>
    _min?: NestedEnumRoleFilter<$PrismaModel>
    _max?: NestedEnumRoleFilter<$PrismaModel>
  }

  export type NestedIntNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: number | IntFieldRefInput<$PrismaModel> | null
    in?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListIntFieldRefInput<$PrismaModel> | null
    lt?: number | IntFieldRefInput<$PrismaModel>
    lte?: number | IntFieldRefInput<$PrismaModel>
    gt?: number | IntFieldRefInput<$PrismaModel>
    gte?: number | IntFieldRefInput<$PrismaModel>
    not?: NestedIntNullableWithAggregatesFilter<$PrismaModel> | number | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _avg?: NestedFloatNullableFilter<$PrismaModel>
    _sum?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedIntNullableFilter<$PrismaModel>
    _max?: NestedIntNullableFilter<$PrismaModel>
  }

  export type NestedFloatNullableFilter<$PrismaModel = never> = {
    equals?: number | FloatFieldRefInput<$PrismaModel> | null
    in?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    notIn?: number[] | ListFloatFieldRefInput<$PrismaModel> | null
    lt?: number | FloatFieldRefInput<$PrismaModel>
    lte?: number | FloatFieldRefInput<$PrismaModel>
    gt?: number | FloatFieldRefInput<$PrismaModel>
    gte?: number | FloatFieldRefInput<$PrismaModel>
    not?: NestedFloatNullableFilter<$PrismaModel> | number | null
  }

  export type NestedStringNullableWithAggregatesFilter<$PrismaModel = never> = {
    equals?: string | StringFieldRefInput<$PrismaModel> | null
    in?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    notIn?: string[] | ListStringFieldRefInput<$PrismaModel> | null
    lt?: string | StringFieldRefInput<$PrismaModel>
    lte?: string | StringFieldRefInput<$PrismaModel>
    gt?: string | StringFieldRefInput<$PrismaModel>
    gte?: string | StringFieldRefInput<$PrismaModel>
    contains?: string | StringFieldRefInput<$PrismaModel>
    startsWith?: string | StringFieldRefInput<$PrismaModel>
    endsWith?: string | StringFieldRefInput<$PrismaModel>
    not?: NestedStringNullableWithAggregatesFilter<$PrismaModel> | string | null
    _count?: NestedIntNullableFilter<$PrismaModel>
    _min?: NestedStringNullableFilter<$PrismaModel>
    _max?: NestedStringNullableFilter<$PrismaModel>
  }

  export type MensajeCreateWithoutComunidadIDInput = {
    horaCreacion?: Date | string
    texto: string
  }

  export type MensajeUncheckedCreateWithoutComunidadIDInput = {
    horaCreacion?: Date | string
    texto: string
  }

  export type MensajeCreateOrConnectWithoutComunidadIDInput = {
    where: MensajeWhereUniqueInput
    create: XOR<MensajeCreateWithoutComunidadIDInput, MensajeUncheckedCreateWithoutComunidadIDInput>
  }

  export type MensajeCreateManyComunidadIDInputEnvelope = {
    data: MensajeCreateManyComunidadIDInput | MensajeCreateManyComunidadIDInput[]
    skipDuplicates?: boolean
  }

  export type ZonaCreateWithoutComunidadIDInput = {
    nombre: string
    descripcion: string
    imagen?: string | null
    hora_inicio: Date | string
    hora_fin: Date | string
    reservas?: ReservaCreateNestedManyWithoutZonaIDInput
  }

  export type ZonaUncheckedCreateWithoutComunidadIDInput = {
    nombre: string
    descripcion: string
    imagen?: string | null
    hora_inicio: Date | string
    hora_fin: Date | string
    reservas?: ReservaUncheckedCreateNestedManyWithoutZonaIDInput
  }

  export type ZonaCreateOrConnectWithoutComunidadIDInput = {
    where: ZonaWhereUniqueInput
    create: XOR<ZonaCreateWithoutComunidadIDInput, ZonaUncheckedCreateWithoutComunidadIDInput>
  }

  export type ZonaCreateManyComunidadIDInputEnvelope = {
    data: ZonaCreateManyComunidadIDInput | ZonaCreateManyComunidadIDInput[]
    skipDuplicates?: boolean
  }

  export type IncidenciaCreateWithoutComunidadIDInput = {
    fecha?: Date | string
    descripcion: string
    estado?: $Enums.Estado_Incidencia
    usuarioID: UsuarioCreateNestedOneWithoutIncidenciasInput
  }

  export type IncidenciaUncheckedCreateWithoutComunidadIDInput = {
    usuario: string
    fecha?: Date | string
    descripcion: string
    estado?: $Enums.Estado_Incidencia
  }

  export type IncidenciaCreateOrConnectWithoutComunidadIDInput = {
    where: IncidenciaWhereUniqueInput
    create: XOR<IncidenciaCreateWithoutComunidadIDInput, IncidenciaUncheckedCreateWithoutComunidadIDInput>
  }

  export type IncidenciaCreateManyComunidadIDInputEnvelope = {
    data: IncidenciaCreateManyComunidadIDInput | IncidenciaCreateManyComunidadIDInput[]
    skipDuplicates?: boolean
  }

  export type InscripcionCreateWithoutComunidadIDInput = {
    usuarioID: UsuarioCreateNestedOneWithoutInscripcionesInput
  }

  export type InscripcionUncheckedCreateWithoutComunidadIDInput = {
    usuario: string
  }

  export type InscripcionCreateOrConnectWithoutComunidadIDInput = {
    where: InscripcionWhereUniqueInput
    create: XOR<InscripcionCreateWithoutComunidadIDInput, InscripcionUncheckedCreateWithoutComunidadIDInput>
  }

  export type InscripcionCreateManyComunidadIDInputEnvelope = {
    data: InscripcionCreateManyComunidadIDInput | InscripcionCreateManyComunidadIDInput[]
    skipDuplicates?: boolean
  }

  export type SolicitudCreateWithoutComunidadIDInput = {
    estado?: $Enums.Estado_Solicitud
    usuarioID: UsuarioCreateNestedOneWithoutSolicitudesInput
  }

  export type SolicitudUncheckedCreateWithoutComunidadIDInput = {
    usuario: string
    estado?: $Enums.Estado_Solicitud
  }

  export type SolicitudCreateOrConnectWithoutComunidadIDInput = {
    where: SolicitudWhereUniqueInput
    create: XOR<SolicitudCreateWithoutComunidadIDInput, SolicitudUncheckedCreateWithoutComunidadIDInput>
  }

  export type SolicitudCreateManyComunidadIDInputEnvelope = {
    data: SolicitudCreateManyComunidadIDInput | SolicitudCreateManyComunidadIDInput[]
    skipDuplicates?: boolean
  }

  export type MensajeUpsertWithWhereUniqueWithoutComunidadIDInput = {
    where: MensajeWhereUniqueInput
    update: XOR<MensajeUpdateWithoutComunidadIDInput, MensajeUncheckedUpdateWithoutComunidadIDInput>
    create: XOR<MensajeCreateWithoutComunidadIDInput, MensajeUncheckedCreateWithoutComunidadIDInput>
  }

  export type MensajeUpdateWithWhereUniqueWithoutComunidadIDInput = {
    where: MensajeWhereUniqueInput
    data: XOR<MensajeUpdateWithoutComunidadIDInput, MensajeUncheckedUpdateWithoutComunidadIDInput>
  }

  export type MensajeUpdateManyWithWhereWithoutComunidadIDInput = {
    where: MensajeScalarWhereInput
    data: XOR<MensajeUpdateManyMutationInput, MensajeUncheckedUpdateManyWithoutComunidadIDInput>
  }

  export type MensajeScalarWhereInput = {
    AND?: MensajeScalarWhereInput | MensajeScalarWhereInput[]
    OR?: MensajeScalarWhereInput[]
    NOT?: MensajeScalarWhereInput | MensajeScalarWhereInput[]
    horaCreacion?: DateTimeFilter<"Mensaje"> | Date | string
    comunidad?: IntFilter<"Mensaje"> | number
    texto?: StringFilter<"Mensaje"> | string
  }

  export type ZonaUpsertWithWhereUniqueWithoutComunidadIDInput = {
    where: ZonaWhereUniqueInput
    update: XOR<ZonaUpdateWithoutComunidadIDInput, ZonaUncheckedUpdateWithoutComunidadIDInput>
    create: XOR<ZonaCreateWithoutComunidadIDInput, ZonaUncheckedCreateWithoutComunidadIDInput>
  }

  export type ZonaUpdateWithWhereUniqueWithoutComunidadIDInput = {
    where: ZonaWhereUniqueInput
    data: XOR<ZonaUpdateWithoutComunidadIDInput, ZonaUncheckedUpdateWithoutComunidadIDInput>
  }

  export type ZonaUpdateManyWithWhereWithoutComunidadIDInput = {
    where: ZonaScalarWhereInput
    data: XOR<ZonaUpdateManyMutationInput, ZonaUncheckedUpdateManyWithoutComunidadIDInput>
  }

  export type ZonaScalarWhereInput = {
    AND?: ZonaScalarWhereInput | ZonaScalarWhereInput[]
    OR?: ZonaScalarWhereInput[]
    NOT?: ZonaScalarWhereInput | ZonaScalarWhereInput[]
    nombre?: StringFilter<"Zona"> | string
    comunidad?: IntFilter<"Zona"> | number
    descripcion?: StringFilter<"Zona"> | string
    imagen?: StringNullableFilter<"Zona"> | string | null
    hora_inicio?: DateTimeFilter<"Zona"> | Date | string
    hora_fin?: DateTimeFilter<"Zona"> | Date | string
  }

  export type IncidenciaUpsertWithWhereUniqueWithoutComunidadIDInput = {
    where: IncidenciaWhereUniqueInput
    update: XOR<IncidenciaUpdateWithoutComunidadIDInput, IncidenciaUncheckedUpdateWithoutComunidadIDInput>
    create: XOR<IncidenciaCreateWithoutComunidadIDInput, IncidenciaUncheckedCreateWithoutComunidadIDInput>
  }

  export type IncidenciaUpdateWithWhereUniqueWithoutComunidadIDInput = {
    where: IncidenciaWhereUniqueInput
    data: XOR<IncidenciaUpdateWithoutComunidadIDInput, IncidenciaUncheckedUpdateWithoutComunidadIDInput>
  }

  export type IncidenciaUpdateManyWithWhereWithoutComunidadIDInput = {
    where: IncidenciaScalarWhereInput
    data: XOR<IncidenciaUpdateManyMutationInput, IncidenciaUncheckedUpdateManyWithoutComunidadIDInput>
  }

  export type IncidenciaScalarWhereInput = {
    AND?: IncidenciaScalarWhereInput | IncidenciaScalarWhereInput[]
    OR?: IncidenciaScalarWhereInput[]
    NOT?: IncidenciaScalarWhereInput | IncidenciaScalarWhereInput[]
    comunidad?: IntFilter<"Incidencia"> | number
    usuario?: StringFilter<"Incidencia"> | string
    fecha?: DateTimeFilter<"Incidencia"> | Date | string
    descripcion?: StringFilter<"Incidencia"> | string
    estado?: EnumEstado_IncidenciaFilter<"Incidencia"> | $Enums.Estado_Incidencia
  }

  export type InscripcionUpsertWithWhereUniqueWithoutComunidadIDInput = {
    where: InscripcionWhereUniqueInput
    update: XOR<InscripcionUpdateWithoutComunidadIDInput, InscripcionUncheckedUpdateWithoutComunidadIDInput>
    create: XOR<InscripcionCreateWithoutComunidadIDInput, InscripcionUncheckedCreateWithoutComunidadIDInput>
  }

  export type InscripcionUpdateWithWhereUniqueWithoutComunidadIDInput = {
    where: InscripcionWhereUniqueInput
    data: XOR<InscripcionUpdateWithoutComunidadIDInput, InscripcionUncheckedUpdateWithoutComunidadIDInput>
  }

  export type InscripcionUpdateManyWithWhereWithoutComunidadIDInput = {
    where: InscripcionScalarWhereInput
    data: XOR<InscripcionUpdateManyMutationInput, InscripcionUncheckedUpdateManyWithoutComunidadIDInput>
  }

  export type InscripcionScalarWhereInput = {
    AND?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[]
    OR?: InscripcionScalarWhereInput[]
    NOT?: InscripcionScalarWhereInput | InscripcionScalarWhereInput[]
    usuario?: StringFilter<"Inscripcion"> | string
    comunidad?: IntFilter<"Inscripcion"> | number
  }

  export type SolicitudUpsertWithWhereUniqueWithoutComunidadIDInput = {
    where: SolicitudWhereUniqueInput
    update: XOR<SolicitudUpdateWithoutComunidadIDInput, SolicitudUncheckedUpdateWithoutComunidadIDInput>
    create: XOR<SolicitudCreateWithoutComunidadIDInput, SolicitudUncheckedCreateWithoutComunidadIDInput>
  }

  export type SolicitudUpdateWithWhereUniqueWithoutComunidadIDInput = {
    where: SolicitudWhereUniqueInput
    data: XOR<SolicitudUpdateWithoutComunidadIDInput, SolicitudUncheckedUpdateWithoutComunidadIDInput>
  }

  export type SolicitudUpdateManyWithWhereWithoutComunidadIDInput = {
    where: SolicitudScalarWhereInput
    data: XOR<SolicitudUpdateManyMutationInput, SolicitudUncheckedUpdateManyWithoutComunidadIDInput>
  }

  export type SolicitudScalarWhereInput = {
    AND?: SolicitudScalarWhereInput | SolicitudScalarWhereInput[]
    OR?: SolicitudScalarWhereInput[]
    NOT?: SolicitudScalarWhereInput | SolicitudScalarWhereInput[]
    usuario?: StringFilter<"Solicitud"> | string
    comunidad?: IntFilter<"Solicitud"> | number
    estado?: EnumEstado_SolicitudFilter<"Solicitud"> | $Enums.Estado_Solicitud
  }

  export type UsuarioCreateWithoutCredencialesInput = {
    correo: string
    rol?: $Enums.Role
    nombre_usuario: string
    nombre: string
    apellidos: string
    calle: string
    numero: number
    piso?: number | null
    letra?: string | null
    localidad: string
    incidencias?: IncidenciaCreateNestedManyWithoutUsuarioIDInput
    reservas?: ReservaCreateNestedManyWithoutUsuarioIDInput
    inscripciones?: InscripcionCreateNestedManyWithoutUsuarioIDInput
    solicitudes?: SolicitudCreateNestedManyWithoutUsuarioIDInput
  }

  export type UsuarioUncheckedCreateWithoutCredencialesInput = {
    correo: string
    rol?: $Enums.Role
    nombre_usuario: string
    nombre: string
    apellidos: string
    calle: string
    numero: number
    piso?: number | null
    letra?: string | null
    localidad: string
    incidencias?: IncidenciaUncheckedCreateNestedManyWithoutUsuarioIDInput
    reservas?: ReservaUncheckedCreateNestedManyWithoutUsuarioIDInput
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutUsuarioIDInput
    solicitudes?: SolicitudUncheckedCreateNestedManyWithoutUsuarioIDInput
  }

  export type UsuarioCreateOrConnectWithoutCredencialesInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutCredencialesInput, UsuarioUncheckedCreateWithoutCredencialesInput>
  }

  export type UsuarioUpsertWithoutCredencialesInput = {
    update: XOR<UsuarioUpdateWithoutCredencialesInput, UsuarioUncheckedUpdateWithoutCredencialesInput>
    create: XOR<UsuarioCreateWithoutCredencialesInput, UsuarioUncheckedCreateWithoutCredencialesInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutCredencialesInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutCredencialesInput, UsuarioUncheckedUpdateWithoutCredencialesInput>
  }

  export type UsuarioUpdateWithoutCredencialesInput = {
    correo?: StringFieldUpdateOperationsInput | string
    rol?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    nombre_usuario?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    piso?: NullableIntFieldUpdateOperationsInput | number | null
    letra?: NullableStringFieldUpdateOperationsInput | string | null
    localidad?: StringFieldUpdateOperationsInput | string
    incidencias?: IncidenciaUpdateManyWithoutUsuarioIDNestedInput
    reservas?: ReservaUpdateManyWithoutUsuarioIDNestedInput
    inscripciones?: InscripcionUpdateManyWithoutUsuarioIDNestedInput
    solicitudes?: SolicitudUpdateManyWithoutUsuarioIDNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutCredencialesInput = {
    correo?: StringFieldUpdateOperationsInput | string
    rol?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    nombre_usuario?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    piso?: NullableIntFieldUpdateOperationsInput | number | null
    letra?: NullableStringFieldUpdateOperationsInput | string | null
    localidad?: StringFieldUpdateOperationsInput | string
    incidencias?: IncidenciaUncheckedUpdateManyWithoutUsuarioIDNestedInput
    reservas?: ReservaUncheckedUpdateManyWithoutUsuarioIDNestedInput
    inscripciones?: InscripcionUncheckedUpdateManyWithoutUsuarioIDNestedInput
    solicitudes?: SolicitudUncheckedUpdateManyWithoutUsuarioIDNestedInput
  }

  export type ComunidadCreateWithoutIncidenciasInput = {
    nombre: string
    calle: string
    numero: number
    localidad: string
    provincia: string
    pais: string
    mensajes?: MensajeCreateNestedManyWithoutComunidadIDInput
    zonas?: ZonaCreateNestedManyWithoutComunidadIDInput
    inscritos?: InscripcionCreateNestedManyWithoutComunidadIDInput
    solicitudes?: SolicitudCreateNestedManyWithoutComunidadIDInput
  }

  export type ComunidadUncheckedCreateWithoutIncidenciasInput = {
    id?: number
    nombre: string
    calle: string
    numero: number
    localidad: string
    provincia: string
    pais: string
    mensajes?: MensajeUncheckedCreateNestedManyWithoutComunidadIDInput
    zonas?: ZonaUncheckedCreateNestedManyWithoutComunidadIDInput
    inscritos?: InscripcionUncheckedCreateNestedManyWithoutComunidadIDInput
    solicitudes?: SolicitudUncheckedCreateNestedManyWithoutComunidadIDInput
  }

  export type ComunidadCreateOrConnectWithoutIncidenciasInput = {
    where: ComunidadWhereUniqueInput
    create: XOR<ComunidadCreateWithoutIncidenciasInput, ComunidadUncheckedCreateWithoutIncidenciasInput>
  }

  export type UsuarioCreateWithoutIncidenciasInput = {
    correo: string
    rol?: $Enums.Role
    nombre_usuario: string
    nombre: string
    apellidos: string
    calle: string
    numero: number
    piso?: number | null
    letra?: string | null
    localidad: string
    credenciales?: CredencialesCreateNestedOneWithoutUsuarioInput
    reservas?: ReservaCreateNestedManyWithoutUsuarioIDInput
    inscripciones?: InscripcionCreateNestedManyWithoutUsuarioIDInput
    solicitudes?: SolicitudCreateNestedManyWithoutUsuarioIDInput
  }

  export type UsuarioUncheckedCreateWithoutIncidenciasInput = {
    correo: string
    rol?: $Enums.Role
    nombre_usuario: string
    nombre: string
    apellidos: string
    calle: string
    numero: number
    piso?: number | null
    letra?: string | null
    localidad: string
    credenciales?: CredencialesUncheckedCreateNestedOneWithoutUsuarioInput
    reservas?: ReservaUncheckedCreateNestedManyWithoutUsuarioIDInput
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutUsuarioIDInput
    solicitudes?: SolicitudUncheckedCreateNestedManyWithoutUsuarioIDInput
  }

  export type UsuarioCreateOrConnectWithoutIncidenciasInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutIncidenciasInput, UsuarioUncheckedCreateWithoutIncidenciasInput>
  }

  export type ComunidadUpsertWithoutIncidenciasInput = {
    update: XOR<ComunidadUpdateWithoutIncidenciasInput, ComunidadUncheckedUpdateWithoutIncidenciasInput>
    create: XOR<ComunidadCreateWithoutIncidenciasInput, ComunidadUncheckedCreateWithoutIncidenciasInput>
    where?: ComunidadWhereInput
  }

  export type ComunidadUpdateToOneWithWhereWithoutIncidenciasInput = {
    where?: ComunidadWhereInput
    data: XOR<ComunidadUpdateWithoutIncidenciasInput, ComunidadUncheckedUpdateWithoutIncidenciasInput>
  }

  export type ComunidadUpdateWithoutIncidenciasInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    localidad?: StringFieldUpdateOperationsInput | string
    provincia?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    mensajes?: MensajeUpdateManyWithoutComunidadIDNestedInput
    zonas?: ZonaUpdateManyWithoutComunidadIDNestedInput
    inscritos?: InscripcionUpdateManyWithoutComunidadIDNestedInput
    solicitudes?: SolicitudUpdateManyWithoutComunidadIDNestedInput
  }

  export type ComunidadUncheckedUpdateWithoutIncidenciasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    localidad?: StringFieldUpdateOperationsInput | string
    provincia?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    mensajes?: MensajeUncheckedUpdateManyWithoutComunidadIDNestedInput
    zonas?: ZonaUncheckedUpdateManyWithoutComunidadIDNestedInput
    inscritos?: InscripcionUncheckedUpdateManyWithoutComunidadIDNestedInput
    solicitudes?: SolicitudUncheckedUpdateManyWithoutComunidadIDNestedInput
  }

  export type UsuarioUpsertWithoutIncidenciasInput = {
    update: XOR<UsuarioUpdateWithoutIncidenciasInput, UsuarioUncheckedUpdateWithoutIncidenciasInput>
    create: XOR<UsuarioCreateWithoutIncidenciasInput, UsuarioUncheckedCreateWithoutIncidenciasInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutIncidenciasInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutIncidenciasInput, UsuarioUncheckedUpdateWithoutIncidenciasInput>
  }

  export type UsuarioUpdateWithoutIncidenciasInput = {
    correo?: StringFieldUpdateOperationsInput | string
    rol?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    nombre_usuario?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    piso?: NullableIntFieldUpdateOperationsInput | number | null
    letra?: NullableStringFieldUpdateOperationsInput | string | null
    localidad?: StringFieldUpdateOperationsInput | string
    credenciales?: CredencialesUpdateOneWithoutUsuarioNestedInput
    reservas?: ReservaUpdateManyWithoutUsuarioIDNestedInput
    inscripciones?: InscripcionUpdateManyWithoutUsuarioIDNestedInput
    solicitudes?: SolicitudUpdateManyWithoutUsuarioIDNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutIncidenciasInput = {
    correo?: StringFieldUpdateOperationsInput | string
    rol?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    nombre_usuario?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    piso?: NullableIntFieldUpdateOperationsInput | number | null
    letra?: NullableStringFieldUpdateOperationsInput | string | null
    localidad?: StringFieldUpdateOperationsInput | string
    credenciales?: CredencialesUncheckedUpdateOneWithoutUsuarioNestedInput
    reservas?: ReservaUncheckedUpdateManyWithoutUsuarioIDNestedInput
    inscripciones?: InscripcionUncheckedUpdateManyWithoutUsuarioIDNestedInput
    solicitudes?: SolicitudUncheckedUpdateManyWithoutUsuarioIDNestedInput
  }

  export type UsuarioCreateWithoutInscripcionesInput = {
    correo: string
    rol?: $Enums.Role
    nombre_usuario: string
    nombre: string
    apellidos: string
    calle: string
    numero: number
    piso?: number | null
    letra?: string | null
    localidad: string
    credenciales?: CredencialesCreateNestedOneWithoutUsuarioInput
    incidencias?: IncidenciaCreateNestedManyWithoutUsuarioIDInput
    reservas?: ReservaCreateNestedManyWithoutUsuarioIDInput
    solicitudes?: SolicitudCreateNestedManyWithoutUsuarioIDInput
  }

  export type UsuarioUncheckedCreateWithoutInscripcionesInput = {
    correo: string
    rol?: $Enums.Role
    nombre_usuario: string
    nombre: string
    apellidos: string
    calle: string
    numero: number
    piso?: number | null
    letra?: string | null
    localidad: string
    credenciales?: CredencialesUncheckedCreateNestedOneWithoutUsuarioInput
    incidencias?: IncidenciaUncheckedCreateNestedManyWithoutUsuarioIDInput
    reservas?: ReservaUncheckedCreateNestedManyWithoutUsuarioIDInput
    solicitudes?: SolicitudUncheckedCreateNestedManyWithoutUsuarioIDInput
  }

  export type UsuarioCreateOrConnectWithoutInscripcionesInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutInscripcionesInput, UsuarioUncheckedCreateWithoutInscripcionesInput>
  }

  export type ComunidadCreateWithoutInscritosInput = {
    nombre: string
    calle: string
    numero: number
    localidad: string
    provincia: string
    pais: string
    mensajes?: MensajeCreateNestedManyWithoutComunidadIDInput
    zonas?: ZonaCreateNestedManyWithoutComunidadIDInput
    incidencias?: IncidenciaCreateNestedManyWithoutComunidadIDInput
    solicitudes?: SolicitudCreateNestedManyWithoutComunidadIDInput
  }

  export type ComunidadUncheckedCreateWithoutInscritosInput = {
    id?: number
    nombre: string
    calle: string
    numero: number
    localidad: string
    provincia: string
    pais: string
    mensajes?: MensajeUncheckedCreateNestedManyWithoutComunidadIDInput
    zonas?: ZonaUncheckedCreateNestedManyWithoutComunidadIDInput
    incidencias?: IncidenciaUncheckedCreateNestedManyWithoutComunidadIDInput
    solicitudes?: SolicitudUncheckedCreateNestedManyWithoutComunidadIDInput
  }

  export type ComunidadCreateOrConnectWithoutInscritosInput = {
    where: ComunidadWhereUniqueInput
    create: XOR<ComunidadCreateWithoutInscritosInput, ComunidadUncheckedCreateWithoutInscritosInput>
  }

  export type UsuarioUpsertWithoutInscripcionesInput = {
    update: XOR<UsuarioUpdateWithoutInscripcionesInput, UsuarioUncheckedUpdateWithoutInscripcionesInput>
    create: XOR<UsuarioCreateWithoutInscripcionesInput, UsuarioUncheckedCreateWithoutInscripcionesInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutInscripcionesInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutInscripcionesInput, UsuarioUncheckedUpdateWithoutInscripcionesInput>
  }

  export type UsuarioUpdateWithoutInscripcionesInput = {
    correo?: StringFieldUpdateOperationsInput | string
    rol?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    nombre_usuario?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    piso?: NullableIntFieldUpdateOperationsInput | number | null
    letra?: NullableStringFieldUpdateOperationsInput | string | null
    localidad?: StringFieldUpdateOperationsInput | string
    credenciales?: CredencialesUpdateOneWithoutUsuarioNestedInput
    incidencias?: IncidenciaUpdateManyWithoutUsuarioIDNestedInput
    reservas?: ReservaUpdateManyWithoutUsuarioIDNestedInput
    solicitudes?: SolicitudUpdateManyWithoutUsuarioIDNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutInscripcionesInput = {
    correo?: StringFieldUpdateOperationsInput | string
    rol?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    nombre_usuario?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    piso?: NullableIntFieldUpdateOperationsInput | number | null
    letra?: NullableStringFieldUpdateOperationsInput | string | null
    localidad?: StringFieldUpdateOperationsInput | string
    credenciales?: CredencialesUncheckedUpdateOneWithoutUsuarioNestedInput
    incidencias?: IncidenciaUncheckedUpdateManyWithoutUsuarioIDNestedInput
    reservas?: ReservaUncheckedUpdateManyWithoutUsuarioIDNestedInput
    solicitudes?: SolicitudUncheckedUpdateManyWithoutUsuarioIDNestedInput
  }

  export type ComunidadUpsertWithoutInscritosInput = {
    update: XOR<ComunidadUpdateWithoutInscritosInput, ComunidadUncheckedUpdateWithoutInscritosInput>
    create: XOR<ComunidadCreateWithoutInscritosInput, ComunidadUncheckedCreateWithoutInscritosInput>
    where?: ComunidadWhereInput
  }

  export type ComunidadUpdateToOneWithWhereWithoutInscritosInput = {
    where?: ComunidadWhereInput
    data: XOR<ComunidadUpdateWithoutInscritosInput, ComunidadUncheckedUpdateWithoutInscritosInput>
  }

  export type ComunidadUpdateWithoutInscritosInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    localidad?: StringFieldUpdateOperationsInput | string
    provincia?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    mensajes?: MensajeUpdateManyWithoutComunidadIDNestedInput
    zonas?: ZonaUpdateManyWithoutComunidadIDNestedInput
    incidencias?: IncidenciaUpdateManyWithoutComunidadIDNestedInput
    solicitudes?: SolicitudUpdateManyWithoutComunidadIDNestedInput
  }

  export type ComunidadUncheckedUpdateWithoutInscritosInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    localidad?: StringFieldUpdateOperationsInput | string
    provincia?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    mensajes?: MensajeUncheckedUpdateManyWithoutComunidadIDNestedInput
    zonas?: ZonaUncheckedUpdateManyWithoutComunidadIDNestedInput
    incidencias?: IncidenciaUncheckedUpdateManyWithoutComunidadIDNestedInput
    solicitudes?: SolicitudUncheckedUpdateManyWithoutComunidadIDNestedInput
  }

  export type ComunidadCreateWithoutMensajesInput = {
    nombre: string
    calle: string
    numero: number
    localidad: string
    provincia: string
    pais: string
    zonas?: ZonaCreateNestedManyWithoutComunidadIDInput
    incidencias?: IncidenciaCreateNestedManyWithoutComunidadIDInput
    inscritos?: InscripcionCreateNestedManyWithoutComunidadIDInput
    solicitudes?: SolicitudCreateNestedManyWithoutComunidadIDInput
  }

  export type ComunidadUncheckedCreateWithoutMensajesInput = {
    id?: number
    nombre: string
    calle: string
    numero: number
    localidad: string
    provincia: string
    pais: string
    zonas?: ZonaUncheckedCreateNestedManyWithoutComunidadIDInput
    incidencias?: IncidenciaUncheckedCreateNestedManyWithoutComunidadIDInput
    inscritos?: InscripcionUncheckedCreateNestedManyWithoutComunidadIDInput
    solicitudes?: SolicitudUncheckedCreateNestedManyWithoutComunidadIDInput
  }

  export type ComunidadCreateOrConnectWithoutMensajesInput = {
    where: ComunidadWhereUniqueInput
    create: XOR<ComunidadCreateWithoutMensajesInput, ComunidadUncheckedCreateWithoutMensajesInput>
  }

  export type ComunidadUpsertWithoutMensajesInput = {
    update: XOR<ComunidadUpdateWithoutMensajesInput, ComunidadUncheckedUpdateWithoutMensajesInput>
    create: XOR<ComunidadCreateWithoutMensajesInput, ComunidadUncheckedCreateWithoutMensajesInput>
    where?: ComunidadWhereInput
  }

  export type ComunidadUpdateToOneWithWhereWithoutMensajesInput = {
    where?: ComunidadWhereInput
    data: XOR<ComunidadUpdateWithoutMensajesInput, ComunidadUncheckedUpdateWithoutMensajesInput>
  }

  export type ComunidadUpdateWithoutMensajesInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    localidad?: StringFieldUpdateOperationsInput | string
    provincia?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    zonas?: ZonaUpdateManyWithoutComunidadIDNestedInput
    incidencias?: IncidenciaUpdateManyWithoutComunidadIDNestedInput
    inscritos?: InscripcionUpdateManyWithoutComunidadIDNestedInput
    solicitudes?: SolicitudUpdateManyWithoutComunidadIDNestedInput
  }

  export type ComunidadUncheckedUpdateWithoutMensajesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    localidad?: StringFieldUpdateOperationsInput | string
    provincia?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    zonas?: ZonaUncheckedUpdateManyWithoutComunidadIDNestedInput
    incidencias?: IncidenciaUncheckedUpdateManyWithoutComunidadIDNestedInput
    inscritos?: InscripcionUncheckedUpdateManyWithoutComunidadIDNestedInput
    solicitudes?: SolicitudUncheckedUpdateManyWithoutComunidadIDNestedInput
  }

  export type UsuarioCreateWithoutReservasInput = {
    correo: string
    rol?: $Enums.Role
    nombre_usuario: string
    nombre: string
    apellidos: string
    calle: string
    numero: number
    piso?: number | null
    letra?: string | null
    localidad: string
    credenciales?: CredencialesCreateNestedOneWithoutUsuarioInput
    incidencias?: IncidenciaCreateNestedManyWithoutUsuarioIDInput
    inscripciones?: InscripcionCreateNestedManyWithoutUsuarioIDInput
    solicitudes?: SolicitudCreateNestedManyWithoutUsuarioIDInput
  }

  export type UsuarioUncheckedCreateWithoutReservasInput = {
    correo: string
    rol?: $Enums.Role
    nombre_usuario: string
    nombre: string
    apellidos: string
    calle: string
    numero: number
    piso?: number | null
    letra?: string | null
    localidad: string
    credenciales?: CredencialesUncheckedCreateNestedOneWithoutUsuarioInput
    incidencias?: IncidenciaUncheckedCreateNestedManyWithoutUsuarioIDInput
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutUsuarioIDInput
    solicitudes?: SolicitudUncheckedCreateNestedManyWithoutUsuarioIDInput
  }

  export type UsuarioCreateOrConnectWithoutReservasInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutReservasInput, UsuarioUncheckedCreateWithoutReservasInput>
  }

  export type ZonaCreateWithoutReservasInput = {
    nombre: string
    descripcion: string
    imagen?: string | null
    hora_inicio: Date | string
    hora_fin: Date | string
    comunidadID: ComunidadCreateNestedOneWithoutZonasInput
  }

  export type ZonaUncheckedCreateWithoutReservasInput = {
    nombre: string
    comunidad: number
    descripcion: string
    imagen?: string | null
    hora_inicio: Date | string
    hora_fin: Date | string
  }

  export type ZonaCreateOrConnectWithoutReservasInput = {
    where: ZonaWhereUniqueInput
    create: XOR<ZonaCreateWithoutReservasInput, ZonaUncheckedCreateWithoutReservasInput>
  }

  export type UsuarioUpsertWithoutReservasInput = {
    update: XOR<UsuarioUpdateWithoutReservasInput, UsuarioUncheckedUpdateWithoutReservasInput>
    create: XOR<UsuarioCreateWithoutReservasInput, UsuarioUncheckedCreateWithoutReservasInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutReservasInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutReservasInput, UsuarioUncheckedUpdateWithoutReservasInput>
  }

  export type UsuarioUpdateWithoutReservasInput = {
    correo?: StringFieldUpdateOperationsInput | string
    rol?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    nombre_usuario?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    piso?: NullableIntFieldUpdateOperationsInput | number | null
    letra?: NullableStringFieldUpdateOperationsInput | string | null
    localidad?: StringFieldUpdateOperationsInput | string
    credenciales?: CredencialesUpdateOneWithoutUsuarioNestedInput
    incidencias?: IncidenciaUpdateManyWithoutUsuarioIDNestedInput
    inscripciones?: InscripcionUpdateManyWithoutUsuarioIDNestedInput
    solicitudes?: SolicitudUpdateManyWithoutUsuarioIDNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutReservasInput = {
    correo?: StringFieldUpdateOperationsInput | string
    rol?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    nombre_usuario?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    piso?: NullableIntFieldUpdateOperationsInput | number | null
    letra?: NullableStringFieldUpdateOperationsInput | string | null
    localidad?: StringFieldUpdateOperationsInput | string
    credenciales?: CredencialesUncheckedUpdateOneWithoutUsuarioNestedInput
    incidencias?: IncidenciaUncheckedUpdateManyWithoutUsuarioIDNestedInput
    inscripciones?: InscripcionUncheckedUpdateManyWithoutUsuarioIDNestedInput
    solicitudes?: SolicitudUncheckedUpdateManyWithoutUsuarioIDNestedInput
  }

  export type ZonaUpsertWithoutReservasInput = {
    update: XOR<ZonaUpdateWithoutReservasInput, ZonaUncheckedUpdateWithoutReservasInput>
    create: XOR<ZonaCreateWithoutReservasInput, ZonaUncheckedCreateWithoutReservasInput>
    where?: ZonaWhereInput
  }

  export type ZonaUpdateToOneWithWhereWithoutReservasInput = {
    where?: ZonaWhereInput
    data: XOR<ZonaUpdateWithoutReservasInput, ZonaUncheckedUpdateWithoutReservasInput>
  }

  export type ZonaUpdateWithoutReservasInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    imagen?: NullableStringFieldUpdateOperationsInput | string | null
    hora_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_fin?: DateTimeFieldUpdateOperationsInput | Date | string
    comunidadID?: ComunidadUpdateOneRequiredWithoutZonasNestedInput
  }

  export type ZonaUncheckedUpdateWithoutReservasInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    comunidad?: IntFieldUpdateOperationsInput | number
    descripcion?: StringFieldUpdateOperationsInput | string
    imagen?: NullableStringFieldUpdateOperationsInput | string | null
    hora_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_fin?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type UsuarioCreateWithoutSolicitudesInput = {
    correo: string
    rol?: $Enums.Role
    nombre_usuario: string
    nombre: string
    apellidos: string
    calle: string
    numero: number
    piso?: number | null
    letra?: string | null
    localidad: string
    credenciales?: CredencialesCreateNestedOneWithoutUsuarioInput
    incidencias?: IncidenciaCreateNestedManyWithoutUsuarioIDInput
    reservas?: ReservaCreateNestedManyWithoutUsuarioIDInput
    inscripciones?: InscripcionCreateNestedManyWithoutUsuarioIDInput
  }

  export type UsuarioUncheckedCreateWithoutSolicitudesInput = {
    correo: string
    rol?: $Enums.Role
    nombre_usuario: string
    nombre: string
    apellidos: string
    calle: string
    numero: number
    piso?: number | null
    letra?: string | null
    localidad: string
    credenciales?: CredencialesUncheckedCreateNestedOneWithoutUsuarioInput
    incidencias?: IncidenciaUncheckedCreateNestedManyWithoutUsuarioIDInput
    reservas?: ReservaUncheckedCreateNestedManyWithoutUsuarioIDInput
    inscripciones?: InscripcionUncheckedCreateNestedManyWithoutUsuarioIDInput
  }

  export type UsuarioCreateOrConnectWithoutSolicitudesInput = {
    where: UsuarioWhereUniqueInput
    create: XOR<UsuarioCreateWithoutSolicitudesInput, UsuarioUncheckedCreateWithoutSolicitudesInput>
  }

  export type ComunidadCreateWithoutSolicitudesInput = {
    nombre: string
    calle: string
    numero: number
    localidad: string
    provincia: string
    pais: string
    mensajes?: MensajeCreateNestedManyWithoutComunidadIDInput
    zonas?: ZonaCreateNestedManyWithoutComunidadIDInput
    incidencias?: IncidenciaCreateNestedManyWithoutComunidadIDInput
    inscritos?: InscripcionCreateNestedManyWithoutComunidadIDInput
  }

  export type ComunidadUncheckedCreateWithoutSolicitudesInput = {
    id?: number
    nombre: string
    calle: string
    numero: number
    localidad: string
    provincia: string
    pais: string
    mensajes?: MensajeUncheckedCreateNestedManyWithoutComunidadIDInput
    zonas?: ZonaUncheckedCreateNestedManyWithoutComunidadIDInput
    incidencias?: IncidenciaUncheckedCreateNestedManyWithoutComunidadIDInput
    inscritos?: InscripcionUncheckedCreateNestedManyWithoutComunidadIDInput
  }

  export type ComunidadCreateOrConnectWithoutSolicitudesInput = {
    where: ComunidadWhereUniqueInput
    create: XOR<ComunidadCreateWithoutSolicitudesInput, ComunidadUncheckedCreateWithoutSolicitudesInput>
  }

  export type UsuarioUpsertWithoutSolicitudesInput = {
    update: XOR<UsuarioUpdateWithoutSolicitudesInput, UsuarioUncheckedUpdateWithoutSolicitudesInput>
    create: XOR<UsuarioCreateWithoutSolicitudesInput, UsuarioUncheckedCreateWithoutSolicitudesInput>
    where?: UsuarioWhereInput
  }

  export type UsuarioUpdateToOneWithWhereWithoutSolicitudesInput = {
    where?: UsuarioWhereInput
    data: XOR<UsuarioUpdateWithoutSolicitudesInput, UsuarioUncheckedUpdateWithoutSolicitudesInput>
  }

  export type UsuarioUpdateWithoutSolicitudesInput = {
    correo?: StringFieldUpdateOperationsInput | string
    rol?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    nombre_usuario?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    piso?: NullableIntFieldUpdateOperationsInput | number | null
    letra?: NullableStringFieldUpdateOperationsInput | string | null
    localidad?: StringFieldUpdateOperationsInput | string
    credenciales?: CredencialesUpdateOneWithoutUsuarioNestedInput
    incidencias?: IncidenciaUpdateManyWithoutUsuarioIDNestedInput
    reservas?: ReservaUpdateManyWithoutUsuarioIDNestedInput
    inscripciones?: InscripcionUpdateManyWithoutUsuarioIDNestedInput
  }

  export type UsuarioUncheckedUpdateWithoutSolicitudesInput = {
    correo?: StringFieldUpdateOperationsInput | string
    rol?: EnumRoleFieldUpdateOperationsInput | $Enums.Role
    nombre_usuario?: StringFieldUpdateOperationsInput | string
    nombre?: StringFieldUpdateOperationsInput | string
    apellidos?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    piso?: NullableIntFieldUpdateOperationsInput | number | null
    letra?: NullableStringFieldUpdateOperationsInput | string | null
    localidad?: StringFieldUpdateOperationsInput | string
    credenciales?: CredencialesUncheckedUpdateOneWithoutUsuarioNestedInput
    incidencias?: IncidenciaUncheckedUpdateManyWithoutUsuarioIDNestedInput
    reservas?: ReservaUncheckedUpdateManyWithoutUsuarioIDNestedInput
    inscripciones?: InscripcionUncheckedUpdateManyWithoutUsuarioIDNestedInput
  }

  export type ComunidadUpsertWithoutSolicitudesInput = {
    update: XOR<ComunidadUpdateWithoutSolicitudesInput, ComunidadUncheckedUpdateWithoutSolicitudesInput>
    create: XOR<ComunidadCreateWithoutSolicitudesInput, ComunidadUncheckedCreateWithoutSolicitudesInput>
    where?: ComunidadWhereInput
  }

  export type ComunidadUpdateToOneWithWhereWithoutSolicitudesInput = {
    where?: ComunidadWhereInput
    data: XOR<ComunidadUpdateWithoutSolicitudesInput, ComunidadUncheckedUpdateWithoutSolicitudesInput>
  }

  export type ComunidadUpdateWithoutSolicitudesInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    localidad?: StringFieldUpdateOperationsInput | string
    provincia?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    mensajes?: MensajeUpdateManyWithoutComunidadIDNestedInput
    zonas?: ZonaUpdateManyWithoutComunidadIDNestedInput
    incidencias?: IncidenciaUpdateManyWithoutComunidadIDNestedInput
    inscritos?: InscripcionUpdateManyWithoutComunidadIDNestedInput
  }

  export type ComunidadUncheckedUpdateWithoutSolicitudesInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    localidad?: StringFieldUpdateOperationsInput | string
    provincia?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    mensajes?: MensajeUncheckedUpdateManyWithoutComunidadIDNestedInput
    zonas?: ZonaUncheckedUpdateManyWithoutComunidadIDNestedInput
    incidencias?: IncidenciaUncheckedUpdateManyWithoutComunidadIDNestedInput
    inscritos?: InscripcionUncheckedUpdateManyWithoutComunidadIDNestedInput
  }

  export type CredencialesCreateWithoutUsuarioInput = {
    password: string
  }

  export type CredencialesUncheckedCreateWithoutUsuarioInput = {
    password: string
  }

  export type CredencialesCreateOrConnectWithoutUsuarioInput = {
    where: CredencialesWhereUniqueInput
    create: XOR<CredencialesCreateWithoutUsuarioInput, CredencialesUncheckedCreateWithoutUsuarioInput>
  }

  export type IncidenciaCreateWithoutUsuarioIDInput = {
    fecha?: Date | string
    descripcion: string
    estado?: $Enums.Estado_Incidencia
    comunidadID: ComunidadCreateNestedOneWithoutIncidenciasInput
  }

  export type IncidenciaUncheckedCreateWithoutUsuarioIDInput = {
    comunidad: number
    fecha?: Date | string
    descripcion: string
    estado?: $Enums.Estado_Incidencia
  }

  export type IncidenciaCreateOrConnectWithoutUsuarioIDInput = {
    where: IncidenciaWhereUniqueInput
    create: XOR<IncidenciaCreateWithoutUsuarioIDInput, IncidenciaUncheckedCreateWithoutUsuarioIDInput>
  }

  export type IncidenciaCreateManyUsuarioIDInputEnvelope = {
    data: IncidenciaCreateManyUsuarioIDInput | IncidenciaCreateManyUsuarioIDInput[]
    skipDuplicates?: boolean
  }

  export type ReservaCreateWithoutUsuarioIDInput = {
    fecha: Date | string
    hora_inicio: Date | string
    hora_fin: Date | string
    zonaID: ZonaCreateNestedOneWithoutReservasInput
  }

  export type ReservaUncheckedCreateWithoutUsuarioIDInput = {
    comunidad: number
    zona: string
    fecha: Date | string
    hora_inicio: Date | string
    hora_fin: Date | string
  }

  export type ReservaCreateOrConnectWithoutUsuarioIDInput = {
    where: ReservaWhereUniqueInput
    create: XOR<ReservaCreateWithoutUsuarioIDInput, ReservaUncheckedCreateWithoutUsuarioIDInput>
  }

  export type ReservaCreateManyUsuarioIDInputEnvelope = {
    data: ReservaCreateManyUsuarioIDInput | ReservaCreateManyUsuarioIDInput[]
    skipDuplicates?: boolean
  }

  export type InscripcionCreateWithoutUsuarioIDInput = {
    comunidadID: ComunidadCreateNestedOneWithoutInscritosInput
  }

  export type InscripcionUncheckedCreateWithoutUsuarioIDInput = {
    comunidad: number
  }

  export type InscripcionCreateOrConnectWithoutUsuarioIDInput = {
    where: InscripcionWhereUniqueInput
    create: XOR<InscripcionCreateWithoutUsuarioIDInput, InscripcionUncheckedCreateWithoutUsuarioIDInput>
  }

  export type InscripcionCreateManyUsuarioIDInputEnvelope = {
    data: InscripcionCreateManyUsuarioIDInput | InscripcionCreateManyUsuarioIDInput[]
    skipDuplicates?: boolean
  }

  export type SolicitudCreateWithoutUsuarioIDInput = {
    estado?: $Enums.Estado_Solicitud
    comunidadID: ComunidadCreateNestedOneWithoutSolicitudesInput
  }

  export type SolicitudUncheckedCreateWithoutUsuarioIDInput = {
    comunidad: number
    estado?: $Enums.Estado_Solicitud
  }

  export type SolicitudCreateOrConnectWithoutUsuarioIDInput = {
    where: SolicitudWhereUniqueInput
    create: XOR<SolicitudCreateWithoutUsuarioIDInput, SolicitudUncheckedCreateWithoutUsuarioIDInput>
  }

  export type SolicitudCreateManyUsuarioIDInputEnvelope = {
    data: SolicitudCreateManyUsuarioIDInput | SolicitudCreateManyUsuarioIDInput[]
    skipDuplicates?: boolean
  }

  export type CredencialesUpsertWithoutUsuarioInput = {
    update: XOR<CredencialesUpdateWithoutUsuarioInput, CredencialesUncheckedUpdateWithoutUsuarioInput>
    create: XOR<CredencialesCreateWithoutUsuarioInput, CredencialesUncheckedCreateWithoutUsuarioInput>
    where?: CredencialesWhereInput
  }

  export type CredencialesUpdateToOneWithWhereWithoutUsuarioInput = {
    where?: CredencialesWhereInput
    data: XOR<CredencialesUpdateWithoutUsuarioInput, CredencialesUncheckedUpdateWithoutUsuarioInput>
  }

  export type CredencialesUpdateWithoutUsuarioInput = {
    password?: StringFieldUpdateOperationsInput | string
  }

  export type CredencialesUncheckedUpdateWithoutUsuarioInput = {
    password?: StringFieldUpdateOperationsInput | string
  }

  export type IncidenciaUpsertWithWhereUniqueWithoutUsuarioIDInput = {
    where: IncidenciaWhereUniqueInput
    update: XOR<IncidenciaUpdateWithoutUsuarioIDInput, IncidenciaUncheckedUpdateWithoutUsuarioIDInput>
    create: XOR<IncidenciaCreateWithoutUsuarioIDInput, IncidenciaUncheckedCreateWithoutUsuarioIDInput>
  }

  export type IncidenciaUpdateWithWhereUniqueWithoutUsuarioIDInput = {
    where: IncidenciaWhereUniqueInput
    data: XOR<IncidenciaUpdateWithoutUsuarioIDInput, IncidenciaUncheckedUpdateWithoutUsuarioIDInput>
  }

  export type IncidenciaUpdateManyWithWhereWithoutUsuarioIDInput = {
    where: IncidenciaScalarWhereInput
    data: XOR<IncidenciaUpdateManyMutationInput, IncidenciaUncheckedUpdateManyWithoutUsuarioIDInput>
  }

  export type ReservaUpsertWithWhereUniqueWithoutUsuarioIDInput = {
    where: ReservaWhereUniqueInput
    update: XOR<ReservaUpdateWithoutUsuarioIDInput, ReservaUncheckedUpdateWithoutUsuarioIDInput>
    create: XOR<ReservaCreateWithoutUsuarioIDInput, ReservaUncheckedCreateWithoutUsuarioIDInput>
  }

  export type ReservaUpdateWithWhereUniqueWithoutUsuarioIDInput = {
    where: ReservaWhereUniqueInput
    data: XOR<ReservaUpdateWithoutUsuarioIDInput, ReservaUncheckedUpdateWithoutUsuarioIDInput>
  }

  export type ReservaUpdateManyWithWhereWithoutUsuarioIDInput = {
    where: ReservaScalarWhereInput
    data: XOR<ReservaUpdateManyMutationInput, ReservaUncheckedUpdateManyWithoutUsuarioIDInput>
  }

  export type ReservaScalarWhereInput = {
    AND?: ReservaScalarWhereInput | ReservaScalarWhereInput[]
    OR?: ReservaScalarWhereInput[]
    NOT?: ReservaScalarWhereInput | ReservaScalarWhereInput[]
    usuario?: StringFilter<"Reserva"> | string
    comunidad?: IntFilter<"Reserva"> | number
    zona?: StringFilter<"Reserva"> | string
    fecha?: DateTimeFilter<"Reserva"> | Date | string
    hora_inicio?: DateTimeFilter<"Reserva"> | Date | string
    hora_fin?: DateTimeFilter<"Reserva"> | Date | string
  }

  export type InscripcionUpsertWithWhereUniqueWithoutUsuarioIDInput = {
    where: InscripcionWhereUniqueInput
    update: XOR<InscripcionUpdateWithoutUsuarioIDInput, InscripcionUncheckedUpdateWithoutUsuarioIDInput>
    create: XOR<InscripcionCreateWithoutUsuarioIDInput, InscripcionUncheckedCreateWithoutUsuarioIDInput>
  }

  export type InscripcionUpdateWithWhereUniqueWithoutUsuarioIDInput = {
    where: InscripcionWhereUniqueInput
    data: XOR<InscripcionUpdateWithoutUsuarioIDInput, InscripcionUncheckedUpdateWithoutUsuarioIDInput>
  }

  export type InscripcionUpdateManyWithWhereWithoutUsuarioIDInput = {
    where: InscripcionScalarWhereInput
    data: XOR<InscripcionUpdateManyMutationInput, InscripcionUncheckedUpdateManyWithoutUsuarioIDInput>
  }

  export type SolicitudUpsertWithWhereUniqueWithoutUsuarioIDInput = {
    where: SolicitudWhereUniqueInput
    update: XOR<SolicitudUpdateWithoutUsuarioIDInput, SolicitudUncheckedUpdateWithoutUsuarioIDInput>
    create: XOR<SolicitudCreateWithoutUsuarioIDInput, SolicitudUncheckedCreateWithoutUsuarioIDInput>
  }

  export type SolicitudUpdateWithWhereUniqueWithoutUsuarioIDInput = {
    where: SolicitudWhereUniqueInput
    data: XOR<SolicitudUpdateWithoutUsuarioIDInput, SolicitudUncheckedUpdateWithoutUsuarioIDInput>
  }

  export type SolicitudUpdateManyWithWhereWithoutUsuarioIDInput = {
    where: SolicitudScalarWhereInput
    data: XOR<SolicitudUpdateManyMutationInput, SolicitudUncheckedUpdateManyWithoutUsuarioIDInput>
  }

  export type ComunidadCreateWithoutZonasInput = {
    nombre: string
    calle: string
    numero: number
    localidad: string
    provincia: string
    pais: string
    mensajes?: MensajeCreateNestedManyWithoutComunidadIDInput
    incidencias?: IncidenciaCreateNestedManyWithoutComunidadIDInput
    inscritos?: InscripcionCreateNestedManyWithoutComunidadIDInput
    solicitudes?: SolicitudCreateNestedManyWithoutComunidadIDInput
  }

  export type ComunidadUncheckedCreateWithoutZonasInput = {
    id?: number
    nombre: string
    calle: string
    numero: number
    localidad: string
    provincia: string
    pais: string
    mensajes?: MensajeUncheckedCreateNestedManyWithoutComunidadIDInput
    incidencias?: IncidenciaUncheckedCreateNestedManyWithoutComunidadIDInput
    inscritos?: InscripcionUncheckedCreateNestedManyWithoutComunidadIDInput
    solicitudes?: SolicitudUncheckedCreateNestedManyWithoutComunidadIDInput
  }

  export type ComunidadCreateOrConnectWithoutZonasInput = {
    where: ComunidadWhereUniqueInput
    create: XOR<ComunidadCreateWithoutZonasInput, ComunidadUncheckedCreateWithoutZonasInput>
  }

  export type ReservaCreateWithoutZonaIDInput = {
    fecha: Date | string
    hora_inicio: Date | string
    hora_fin: Date | string
    usuarioID: UsuarioCreateNestedOneWithoutReservasInput
  }

  export type ReservaUncheckedCreateWithoutZonaIDInput = {
    usuario: string
    fecha: Date | string
    hora_inicio: Date | string
    hora_fin: Date | string
  }

  export type ReservaCreateOrConnectWithoutZonaIDInput = {
    where: ReservaWhereUniqueInput
    create: XOR<ReservaCreateWithoutZonaIDInput, ReservaUncheckedCreateWithoutZonaIDInput>
  }

  export type ReservaCreateManyZonaIDInputEnvelope = {
    data: ReservaCreateManyZonaIDInput | ReservaCreateManyZonaIDInput[]
    skipDuplicates?: boolean
  }

  export type ComunidadUpsertWithoutZonasInput = {
    update: XOR<ComunidadUpdateWithoutZonasInput, ComunidadUncheckedUpdateWithoutZonasInput>
    create: XOR<ComunidadCreateWithoutZonasInput, ComunidadUncheckedCreateWithoutZonasInput>
    where?: ComunidadWhereInput
  }

  export type ComunidadUpdateToOneWithWhereWithoutZonasInput = {
    where?: ComunidadWhereInput
    data: XOR<ComunidadUpdateWithoutZonasInput, ComunidadUncheckedUpdateWithoutZonasInput>
  }

  export type ComunidadUpdateWithoutZonasInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    localidad?: StringFieldUpdateOperationsInput | string
    provincia?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    mensajes?: MensajeUpdateManyWithoutComunidadIDNestedInput
    incidencias?: IncidenciaUpdateManyWithoutComunidadIDNestedInput
    inscritos?: InscripcionUpdateManyWithoutComunidadIDNestedInput
    solicitudes?: SolicitudUpdateManyWithoutComunidadIDNestedInput
  }

  export type ComunidadUncheckedUpdateWithoutZonasInput = {
    id?: IntFieldUpdateOperationsInput | number
    nombre?: StringFieldUpdateOperationsInput | string
    calle?: StringFieldUpdateOperationsInput | string
    numero?: IntFieldUpdateOperationsInput | number
    localidad?: StringFieldUpdateOperationsInput | string
    provincia?: StringFieldUpdateOperationsInput | string
    pais?: StringFieldUpdateOperationsInput | string
    mensajes?: MensajeUncheckedUpdateManyWithoutComunidadIDNestedInput
    incidencias?: IncidenciaUncheckedUpdateManyWithoutComunidadIDNestedInput
    inscritos?: InscripcionUncheckedUpdateManyWithoutComunidadIDNestedInput
    solicitudes?: SolicitudUncheckedUpdateManyWithoutComunidadIDNestedInput
  }

  export type ReservaUpsertWithWhereUniqueWithoutZonaIDInput = {
    where: ReservaWhereUniqueInput
    update: XOR<ReservaUpdateWithoutZonaIDInput, ReservaUncheckedUpdateWithoutZonaIDInput>
    create: XOR<ReservaCreateWithoutZonaIDInput, ReservaUncheckedCreateWithoutZonaIDInput>
  }

  export type ReservaUpdateWithWhereUniqueWithoutZonaIDInput = {
    where: ReservaWhereUniqueInput
    data: XOR<ReservaUpdateWithoutZonaIDInput, ReservaUncheckedUpdateWithoutZonaIDInput>
  }

  export type ReservaUpdateManyWithWhereWithoutZonaIDInput = {
    where: ReservaScalarWhereInput
    data: XOR<ReservaUpdateManyMutationInput, ReservaUncheckedUpdateManyWithoutZonaIDInput>
  }

  export type MensajeCreateManyComunidadIDInput = {
    horaCreacion?: Date | string
    texto: string
  }

  export type ZonaCreateManyComunidadIDInput = {
    nombre: string
    descripcion: string
    imagen?: string | null
    hora_inicio: Date | string
    hora_fin: Date | string
  }

  export type IncidenciaCreateManyComunidadIDInput = {
    usuario: string
    fecha?: Date | string
    descripcion: string
    estado?: $Enums.Estado_Incidencia
  }

  export type InscripcionCreateManyComunidadIDInput = {
    usuario: string
  }

  export type SolicitudCreateManyComunidadIDInput = {
    usuario: string
    estado?: $Enums.Estado_Solicitud
  }

  export type MensajeUpdateWithoutComunidadIDInput = {
    horaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    texto?: StringFieldUpdateOperationsInput | string
  }

  export type MensajeUncheckedUpdateWithoutComunidadIDInput = {
    horaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    texto?: StringFieldUpdateOperationsInput | string
  }

  export type MensajeUncheckedUpdateManyWithoutComunidadIDInput = {
    horaCreacion?: DateTimeFieldUpdateOperationsInput | Date | string
    texto?: StringFieldUpdateOperationsInput | string
  }

  export type ZonaUpdateWithoutComunidadIDInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    imagen?: NullableStringFieldUpdateOperationsInput | string | null
    hora_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_fin?: DateTimeFieldUpdateOperationsInput | Date | string
    reservas?: ReservaUpdateManyWithoutZonaIDNestedInput
  }

  export type ZonaUncheckedUpdateWithoutComunidadIDInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    imagen?: NullableStringFieldUpdateOperationsInput | string | null
    hora_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_fin?: DateTimeFieldUpdateOperationsInput | Date | string
    reservas?: ReservaUncheckedUpdateManyWithoutZonaIDNestedInput
  }

  export type ZonaUncheckedUpdateManyWithoutComunidadIDInput = {
    nombre?: StringFieldUpdateOperationsInput | string
    descripcion?: StringFieldUpdateOperationsInput | string
    imagen?: NullableStringFieldUpdateOperationsInput | string | null
    hora_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_fin?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type IncidenciaUpdateWithoutComunidadIDInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    descripcion?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstado_IncidenciaFieldUpdateOperationsInput | $Enums.Estado_Incidencia
    usuarioID?: UsuarioUpdateOneRequiredWithoutIncidenciasNestedInput
  }

  export type IncidenciaUncheckedUpdateWithoutComunidadIDInput = {
    usuario?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    descripcion?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstado_IncidenciaFieldUpdateOperationsInput | $Enums.Estado_Incidencia
  }

  export type IncidenciaUncheckedUpdateManyWithoutComunidadIDInput = {
    usuario?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    descripcion?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstado_IncidenciaFieldUpdateOperationsInput | $Enums.Estado_Incidencia
  }

  export type InscripcionUpdateWithoutComunidadIDInput = {
    usuarioID?: UsuarioUpdateOneRequiredWithoutInscripcionesNestedInput
  }

  export type InscripcionUncheckedUpdateWithoutComunidadIDInput = {
    usuario?: StringFieldUpdateOperationsInput | string
  }

  export type InscripcionUncheckedUpdateManyWithoutComunidadIDInput = {
    usuario?: StringFieldUpdateOperationsInput | string
  }

  export type SolicitudUpdateWithoutComunidadIDInput = {
    estado?: EnumEstado_SolicitudFieldUpdateOperationsInput | $Enums.Estado_Solicitud
    usuarioID?: UsuarioUpdateOneRequiredWithoutSolicitudesNestedInput
  }

  export type SolicitudUncheckedUpdateWithoutComunidadIDInput = {
    usuario?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstado_SolicitudFieldUpdateOperationsInput | $Enums.Estado_Solicitud
  }

  export type SolicitudUncheckedUpdateManyWithoutComunidadIDInput = {
    usuario?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstado_SolicitudFieldUpdateOperationsInput | $Enums.Estado_Solicitud
  }

  export type IncidenciaCreateManyUsuarioIDInput = {
    comunidad: number
    fecha?: Date | string
    descripcion: string
    estado?: $Enums.Estado_Incidencia
  }

  export type ReservaCreateManyUsuarioIDInput = {
    comunidad: number
    zona: string
    fecha: Date | string
    hora_inicio: Date | string
    hora_fin: Date | string
  }

  export type InscripcionCreateManyUsuarioIDInput = {
    comunidad: number
  }

  export type SolicitudCreateManyUsuarioIDInput = {
    comunidad: number
    estado?: $Enums.Estado_Solicitud
  }

  export type IncidenciaUpdateWithoutUsuarioIDInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    descripcion?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstado_IncidenciaFieldUpdateOperationsInput | $Enums.Estado_Incidencia
    comunidadID?: ComunidadUpdateOneRequiredWithoutIncidenciasNestedInput
  }

  export type IncidenciaUncheckedUpdateWithoutUsuarioIDInput = {
    comunidad?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    descripcion?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstado_IncidenciaFieldUpdateOperationsInput | $Enums.Estado_Incidencia
  }

  export type IncidenciaUncheckedUpdateManyWithoutUsuarioIDInput = {
    comunidad?: IntFieldUpdateOperationsInput | number
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    descripcion?: StringFieldUpdateOperationsInput | string
    estado?: EnumEstado_IncidenciaFieldUpdateOperationsInput | $Enums.Estado_Incidencia
  }

  export type ReservaUpdateWithoutUsuarioIDInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_fin?: DateTimeFieldUpdateOperationsInput | Date | string
    zonaID?: ZonaUpdateOneRequiredWithoutReservasNestedInput
  }

  export type ReservaUncheckedUpdateWithoutUsuarioIDInput = {
    comunidad?: IntFieldUpdateOperationsInput | number
    zona?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_fin?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservaUncheckedUpdateManyWithoutUsuarioIDInput = {
    comunidad?: IntFieldUpdateOperationsInput | number
    zona?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_fin?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type InscripcionUpdateWithoutUsuarioIDInput = {
    comunidadID?: ComunidadUpdateOneRequiredWithoutInscritosNestedInput
  }

  export type InscripcionUncheckedUpdateWithoutUsuarioIDInput = {
    comunidad?: IntFieldUpdateOperationsInput | number
  }

  export type InscripcionUncheckedUpdateManyWithoutUsuarioIDInput = {
    comunidad?: IntFieldUpdateOperationsInput | number
  }

  export type SolicitudUpdateWithoutUsuarioIDInput = {
    estado?: EnumEstado_SolicitudFieldUpdateOperationsInput | $Enums.Estado_Solicitud
    comunidadID?: ComunidadUpdateOneRequiredWithoutSolicitudesNestedInput
  }

  export type SolicitudUncheckedUpdateWithoutUsuarioIDInput = {
    comunidad?: IntFieldUpdateOperationsInput | number
    estado?: EnumEstado_SolicitudFieldUpdateOperationsInput | $Enums.Estado_Solicitud
  }

  export type SolicitudUncheckedUpdateManyWithoutUsuarioIDInput = {
    comunidad?: IntFieldUpdateOperationsInput | number
    estado?: EnumEstado_SolicitudFieldUpdateOperationsInput | $Enums.Estado_Solicitud
  }

  export type ReservaCreateManyZonaIDInput = {
    usuario: string
    fecha: Date | string
    hora_inicio: Date | string
    hora_fin: Date | string
  }

  export type ReservaUpdateWithoutZonaIDInput = {
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_fin?: DateTimeFieldUpdateOperationsInput | Date | string
    usuarioID?: UsuarioUpdateOneRequiredWithoutReservasNestedInput
  }

  export type ReservaUncheckedUpdateWithoutZonaIDInput = {
    usuario?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_fin?: DateTimeFieldUpdateOperationsInput | Date | string
  }

  export type ReservaUncheckedUpdateManyWithoutZonaIDInput = {
    usuario?: StringFieldUpdateOperationsInput | string
    fecha?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_inicio?: DateTimeFieldUpdateOperationsInput | Date | string
    hora_fin?: DateTimeFieldUpdateOperationsInput | Date | string
  }



  /**
   * Batch Payload for updateMany & deleteMany & createMany
   */

  export type BatchPayload = {
    count: number
  }

  /**
   * DMMF
   */
  export const dmmf: runtime.BaseDMMF
}