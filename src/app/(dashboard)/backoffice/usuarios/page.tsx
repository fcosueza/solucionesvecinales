import CardStat from "@/components/ui/Cards/CardStat";
import { deleteUsuario } from "@/actions/backoffice/delete";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import style from "../style.module.css";

const PAGE_SIZE = 10;

const etiquetasRol: Record<UserRole, string> = {
  [UserRole.tenant]: "Inquilino",
  [UserRole.admin]: "Administrador",
  [UserRole.webAdmin]: "Administrador Web"
};

export default async function BackOfficeUsersPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}): Promise<React.ReactNode> {
  const { q = "", page: pageParam = "1" } = await searchParams;
  const page = Math.max(1, parseInt(pageParam, 10) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const where = q
    ? {
        OR: [
          { nombre: { contains: q, mode: "insensitive" as const } },
          { apellido: { contains: q, mode: "insensitive" as const } },
          { email: { contains: q, mode: "insensitive" as const } }
        ]
      }
    : undefined;

  const [totalUsuarios, totalInquilinos, totalAdmins, totalAdminsWeb, usuarios, totalFiltrados] = await Promise.all([
    prisma.usuario.count(),
    prisma.usuario.count({ where: { rol: UserRole.tenant } }),
    prisma.usuario.count({ where: { rol: UserRole.admin } }),
    prisma.usuario.count({ where: { rol: UserRole.webAdmin } }),
    prisma.usuario.findMany({
      where,
      skip,
      take: PAGE_SIZE,
      orderBy: [{ apellido: "asc" }, { nombre: "asc" }],
      select: {
        id: true,
        nombre: true,
        apellido: true,
        email: true,
        rol: true,
        _count: {
          select: {
            inscripciones: true,
            solicitudes: true
          }
        }
      }
    }),
    prisma.usuario.count({ where })
  ]);

  const totalPages = Math.max(1, Math.ceil(totalFiltrados / PAGE_SIZE));

  return (
    <main className={style.main}>
      <header className={style.header}>
        <p className={style.eyebrow}>Back Office</p>
        <h1 className={style.title}>Usuarios</h1>
        <p className={style.description}>Distribucion de roles y visibilidad rapida del uso de la plataforma.</p>
      </header>

      <section className={style.statsGrid}>
        <CardStat title="Total" value={String(totalUsuarios)} description="Usuarios registrados" />
        <CardStat title="Inquilinos" value={String(totalInquilinos)} description="Usuarios finales" />
        <CardStat title="Admins" value={String(totalAdmins)} description="Administradores de comunidad" />
        <CardStat title="Admin Web" value={String(totalAdminsWeb)} description="Acceso total al back office" />
      </section>

      <article className={style.sectionCard}>
        <h2 className={style.sectionTitle}>Usuarios</h2>
        <p className={style.sectionDescription}>
          {totalFiltrados} resultado{totalFiltrados !== 1 ? "s" : ""}{q ? ` para "${q}"` : ""}.
        </p>

        <form method="GET" className={style.searchRow}>
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Buscar por nombre, apellido o email..."
            className={style.searchInput}
          />
          <button type="submit" className={style.searchBtn}>
            Buscar
          </button>
        </form>

        {usuarios.length > 0 ? (
          <>
            <ul className={style.list}>
              {usuarios.map(usuario => (
                <li key={usuario.id} className={style.listItem}>
                  <p className={style.itemTitle}>
                    {usuario.nombre} {usuario.apellido}
                  </p>
                  <p className={style.itemMeta}>{usuario.email}</p>
                  <div className={style.pillRow}>
                    <span className={style.pill}>{etiquetasRol[usuario.rol as UserRole]}</span>
                    <span className={style.pill}>{usuario._count.inscripciones} inscripciones</span>
                    <span className={style.pill}>{usuario._count.solicitudes} solicitudes</span>
                  </div>
                  <form action={deleteUsuario}>
                    <input type="hidden" name="id" value={usuario.id} />
                    <button type="submit" className={style.deleteBtn}>
                      Eliminar
                    </button>
                  </form>
                </li>
              ))}
            </ul>

            {totalPages > 1 && (
              <div className={style.pagination}>
                {page > 1 && (
                  <a href={`?q=${encodeURIComponent(q)}&page=${page - 1}`} className={style.pageLink}>
                    ← Anterior
                  </a>
                )}
                <span className={style.pageInfo}>
                  Página {page} de {totalPages}
                </span>
                {page < totalPages && (
                  <a href={`?q=${encodeURIComponent(q)}&page=${page + 1}`} className={style.pageLink}>
                    Siguiente →
                  </a>
                )}
              </div>
            )}
          </>
        ) : (
          <p className={style.emptyState}>
            {q ? `No hay usuarios que coincidan con "${q}".` : "Todavia no hay usuarios registrados."}
          </p>
        )}
      </article>
    </main>
  );
}
