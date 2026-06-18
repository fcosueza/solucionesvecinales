import CardStat from "@/components/ui/Cards/CardStat";
import { deleteRequest } from "@/actions/community/communityRequest";
import prisma from "@/lib/prisma";
import style from "../style.module.css";

const PAGE_SIZE = 10;

/**
 * Backoffice community request management page.
 * Lists all community subscription requests with search and pagination support.
 * Shows the status (pending, approved, denied) of each request.
 *
 * @component
 * @param searchParams Optional search parameters: q (search term) and page (current page)
 * @returns La backoffice requests page rendered
 */
export default async function BackOfficeRequestsPage({
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
          { communityRef: { name: { contains: q, mode: "insensitive" as const } } },
          { userRef: { name: { contains: q, mode: "insensitive" as const } } },
          { userRef: { lastName: { contains: q, mode: "insensitive" as const } } }
        ]
      }
    : undefined;

  const [pendientes, aprobadas, denegadas, solicitudes, totalFiltradas] = await Promise.all([
    prisma.request.count({ where: { status: "pending" } }),
    prisma.request.count({ where: { status: "approved" } }),
    prisma.request.count({ where: { status: "rejected" } }),
    prisma.request.findMany({
      where,
      skip,
      take: PAGE_SIZE,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        status: true,
        createdAt: true,
        communityRef: {
          select: {
            name: true
          }
        },
        userRef: {
          select: {
            name: true,
            lastName: true,
            email: true
          }
        }
      }
    }),
    prisma.request.count({ where })
  ]);

  const totalPages = Math.max(1, Math.ceil(totalFiltradas / PAGE_SIZE));

  return (
    <main className={style.main}>
      <header className={style.header}>
        <p className={style.eyebrow}>Back Office</p>
        <h1 className={style.title}>Solicitudes</h1>
        <p className={style.description}>Seguimiento centralizado del flujo de altas y resoluciones.</p>
      </header>

      <section className={style.statsGrid}>
        <CardStat title="Pendientes" value={String(pendientes)} description="Solicitudes por revisar" />
        <CardStat title="Aprobadas" value={String(aprobadas)} description="Solicitudes aceptadas" />
        <CardStat title="Denegadas" value={String(denegadas)} description="Solicitudes rechazadas" />
      </section>

      <article className={style.sectionCard}>
        <h2 className={style.sectionTitle}>Solicitudes</h2>
        <p className={style.sectionDescription}>
          {totalFiltradas} resultado{totalFiltradas !== 1 ? "s" : ""}
          {q ? ` para "${q}"` : ""}.
        </p>

        <form method="GET" className={style.searchRow}>
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Buscar por comunidad o usuario..."
            className={style.searchInput}
          />
          <button type="submit" className={style.searchBtn}>
            Buscar
          </button>
        </form>

        {solicitudes.length > 0 ? (
          <>
            <ul className={style.list}>
              {solicitudes.map(solicitud => (
                <li key={solicitud.id} className={style.listItem}>
                  <p className={style.itemTitle}>{solicitud.communityRef.name}</p>
                  <p className={style.itemMeta}>
                    {solicitud.userRef.name} {solicitud.userRef.lastName} · {solicitud.userRef.email}
                  </p>
                  <div className={style.pillRow}>
                    <span className={style.pill}>{solicitud.status}</span>
                    <span className={style.pill}>{solicitud.createdAt.toLocaleDateString("es-ES")}</span>
                  </div>
                  <form action={deleteRequest}>
                    <input type="hidden" name="id" value={solicitud.id} />
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
            {q ? `No hay solicitudes que coincidan con "${q}".` : "No hay solicitudes registradas."}
          </p>
        )}
      </article>
    </main>
  );
}
