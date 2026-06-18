import CardStat from "@/components/ui/Cards/CardStat";
import { deleteCommunityAdmin } from "@/actions/community/communitySettings";
import prisma from "@/lib/prisma";
import style from "../style.module.css";

const PAGE_SIZE = 10;

/**
 * Backoffice community management page.
 * Lists all communities registered on the platform with search and pagination support.
 * Shows statistics of common areas and pending requests.
 *
 * @component
 * @param searchParams Optional search parameters: q (search term) and page (current page)
 * @returns La backoffice communities page rendered
 */
export default async function BackOfficeCommunitiesPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}): Promise<React.ReactNode> {
  const { q = "", page: pageParam = "1" } = await searchParams;
  const page = Math.max(1, parseInt(pageParam, 10) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const where = q ? { name: { contains: q, mode: "insensitive" as const } } : undefined;

  const [totalComunidades, comunidadesConZonas, comunidadesConSolicitudesPendientes, comunidades, totalFiltradas] =
    await Promise.all([
      prisma.community.count(),
      prisma.community.count({ where: { zones: { some: {} } } }),
      prisma.community.count({ where: { requests: { some: { status: "pending" } } } }),
      prisma.community.findMany({
        where,
        skip,
        take: PAGE_SIZE,
        orderBy: { id: "desc" },
        select: {
          id: true,
          name: true,
          street: true,
          number: true,
          city: true,
          province: true,
          admin: {
            select: {
              name: true,
              lastName: true
            }
          },
          _count: {
            select: {
              zones: true,
              incidents: true,
              requests: true
            }
          }
        }
      }),
      prisma.community.count({ where })
    ]);

  const totalPages = Math.max(1, Math.ceil(totalFiltradas / PAGE_SIZE));

  return (
    <main className={style.main}>
      <header className={style.header}>
        <p className={style.eyebrow}>Back Office</p>
        <h1 className={style.title}>Comunidades</h1>
        <p className={style.description}>Seguimiento global de comunidades, administradores asignados y actividad.</p>
      </header>

      <section className={style.statsGrid}>
        <CardStat title="Total" value={String(totalComunidades)} description="Comunidades activas en plataforma" />
        <CardStat
          title="Con Zonas"
          value={String(comunidadesConZonas)}
          description="Comunidades con zonas comunes configuradas"
        />
        <CardStat
          title="Con Solicitudes"
          value={String(comunidadesConSolicitudesPendientes)}
          description="Comunidades con solicitudes pendientes"
        />
      </section>

      <article className={style.sectionCard}>
        <h2 className={style.sectionTitle}>Comunidades</h2>
        <p className={style.sectionDescription}>
          {totalFiltradas} resultado{totalFiltradas !== 1 ? "s" : ""}
          {q ? ` para "${q}"` : ""}.
        </p>

        <form method="GET" className={style.searchRow}>
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Buscar por nombre..."
            className={style.searchInput}
          />
          <button type="submit" className={style.searchBtn}>
            Buscar
          </button>
        </form>

        {comunidades.length > 0 ? (
          <>
            <ul className={style.list}>
              {comunidades.map(comunidad => (
                <li key={comunidad.id} className={style.listItem}>
                  <p className={style.itemTitle}>{comunidad.name}</p>
                  <p className={style.itemMeta}>
                    {comunidad.street}, {comunidad.number}. {comunidad.city}, {comunidad.province}
                  </p>
                  <p className={style.itemMeta}>
                    Admin: {comunidad.admin.name} {comunidad.admin.lastName}
                  </p>
                  <div className={style.pillRow}>
                    <span className={style.pill}>{comunidad._count.zones} zonas</span>
                    <span className={style.pill}>{comunidad._count.incidents} incidencias</span>
                    <span className={style.pill}>{comunidad._count.requests} solicitudes</span>
                  </div>
                  <form action={deleteCommunityAdmin}>
                    <input type="hidden" name="id" value={comunidad.id} />
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
            {q ? `No hay comunidades que coincidan con "${q}".` : "Todavia no hay comunidades registradas."}
          </p>
        )}
      </article>
    </main>
  );
}
