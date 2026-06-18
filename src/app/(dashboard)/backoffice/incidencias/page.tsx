import CardStat from "@/components/ui/Cards/CardStat";
import { deleteIncidentAdmin } from "@/actions/community/communityIncident";
import prisma from "@/lib/prisma";
import style from "../style.module.css";

const PAGE_SIZE = 10;

/**
 * Backoffice incident management page.
 * Lists all issues from all communities with search and pagination support.
 * Allows you to review the operational status of the incident flow (reported, being processed, resolved).
 *
 * @component
 * @param searchParams Optional search parameters: q (search term) and page (current page)
 * @returns La backoffice issues page rendered
 */
export default async function BackOfficeIncidentsPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}): Promise<React.ReactNode> {
  const { q = "", page: pageParam = "1" } = await searchParams;
  const page = Math.max(1, parseInt(pageParam, 10) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const where = q ? { title: { contains: q, mode: "insensitive" as const } } : undefined;

  const [totalIncidencias, reportadas, enProceso, resueltas, incidencias, totalFiltradas] = await Promise.all([
    prisma.incident.count(),
    prisma.incident.count({ where: { status: "reported" } }),
    prisma.incident.count({ where: { status: "inProgress" } }),
    prisma.incident.count({ where: { status: "resolved" } }),
    prisma.incident.findMany({
      where,
      skip,
      take: PAGE_SIZE,
      orderBy: [{ updatedAt: "desc" }, { date: "desc" }],
      select: {
        title: true,
        status: true,
        date: true,
        updatedAt: true,
        community: true,
        user: true,
        communityRef: {
          select: {
            name: true
          }
        },
        userRef: {
          select: {
            name: true,
            lastName: true
          }
        }
      }
    }),
    prisma.incident.count({ where })
  ]);

  const totalPages = Math.max(1, Math.ceil(totalFiltradas / PAGE_SIZE));

  return (
    <main className={style.main}>
      <header className={style.header}>
        <p className={style.eyebrow}>Back Office</p>
        <h1 className={style.title}>Incidencias</h1>
        <p className={style.description}>Revision global del flujo de incidencias y su estado operativo.</p>
      </header>

      <section className={style.statsGrid}>
        <CardStat title="Total" value={String(totalIncidencias)} description="Incidencias registradas" />
        <CardStat title="Reportadas" value={String(reportadas)} description="Pendientes de primera gestion" />
        <CardStat title="En proceso" value={String(enProceso)} description="Incidencias actualmente activas" />
        <CardStat title="Resueltas" value={String(resueltas)} description="Incidencias cerradas" />
      </section>

      <article className={style.sectionCard}>
        <h2 className={style.sectionTitle}>Incidencias</h2>
        <p className={style.sectionDescription}>
          {totalFiltradas} resultado{totalFiltradas !== 1 ? "s" : ""}
          {q ? ` para "${q}"` : ""}.
        </p>

        <form method="GET" className={style.searchRow}>
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Buscar por titulo..."
            className={style.searchInput}
          />
          <button type="submit" className={style.searchBtn}>
            Buscar
          </button>
        </form>

        {incidencias.length > 0 ? (
          <>
            <ul className={style.list}>
              {incidencias.map(incidencia => (
                <li
                  key={`${incidencia.title}-${incidencia.date.toISOString()}-${incidencia.communityRef.name}`}
                  className={style.listItem}
                >
                  <p className={style.itemTitle}>{incidencia.title}</p>
                  <p className={style.itemMeta}>Comunidad: {incidencia.communityRef.name}</p>
                  <p className={style.itemMeta}>
                    Reportada por {incidencia.userRef.name} {incidencia.userRef.lastName}
                  </p>
                  <div className={style.pillRow}>
                    <span className={style.pill}>{incidencia.status}</span>
                    <span className={style.pill}>{incidencia.updatedAt.toLocaleDateString("es-ES")}</span>
                  </div>
                  <form action={deleteIncidentAdmin}>
                    <input type="hidden" name="comunidad" value={incidencia.community} />
                    <input type="hidden" name="usuario" value={incidencia.user} />
                    <input type="hidden" name="fecha" value={incidencia.date.toISOString()} />
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
            {q ? `No hay incidencias que coincidan con "${q}".` : "No hay incidencias registradas."}
          </p>
        )}
      </article>
    </main>
  );
}
