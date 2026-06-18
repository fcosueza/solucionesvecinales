import CardStat from "@/components/ui/Cards/CardStat";
import { deleteZoneAdmin } from "@/actions/community/communityZone";
import prisma from "@/lib/prisma";
import style from "../style.module.css";

const PAGE_SIZE = 10;

const formatoHora = new Intl.DateTimeFormat("es-ES", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "UTC"
});

/**
 * Backoffice common areas management page.
 * Lists all common areas of all communities with search and pagination support.
 * Shows information on schedules, reservations and the community to which each area belongs.
 *
 * @component
 * @param searchParams Optional search parameters: q (search term) and page (current page)
 * @returns La backoffice common areas page rendered
 */
export default async function BackOfficeZonesPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}): Promise<React.ReactNode> {
  const { q = "", page: pageParam = "1" } = await searchParams;
  const page = Math.max(1, parseInt(pageParam, 10) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const where = q ? { name: { contains: q, mode: "insensitive" as const } } : undefined;

  const [totalZonas, totalReservas, comunidadesConZonas, zonas, totalFiltradas] = await Promise.all([
    prisma.zone.count(),
    prisma.reservation.count(),
    prisma.community.count({ where: { zones: { some: {} } } }),
    prisma.zone.findMany({
      where,
      skip,
      take: PAGE_SIZE,
      orderBy: [{ community: "asc" }, { name: "asc" }],
      select: {
        name: true,
        description: true,
        startTime: true,
        endTime: true,
        community: true,
        communityRef: {
          select: {
            name: true
          }
        },
        _count: {
          select: {
            reservations: true
          }
        }
      }
    }),
    prisma.zone.count({ where })
  ]);

  const totalPages = Math.max(1, Math.ceil(totalFiltradas / PAGE_SIZE));

  return (
    <main className={style.main}>
      <header className={style.header}>
        <p className={style.eyebrow}>Back Office</p>
        <h1 className={style.title}>Zonas Comunes</h1>
        <p className={style.description}>Control transversal de zonas, disponibilidad y uso acumulado.</p>
      </header>

      <section className={style.statsGrid}>
        <CardStat title="Zonas" value={String(totalZonas)} description="Zonas comunes registradas" />
        <CardStat title="Reservas" value={String(totalReservas)} description="Reservas acumuladas" />
        <CardStat
          title="Comunidades"
          value={String(comunidadesConZonas)}
          description="Comunidades con al menos una zona comun"
        />
      </section>

      <article className={style.sectionCard}>
        <h2 className={style.sectionTitle}>Zonas Comunes</h2>
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

        {zonas.length > 0 ? (
          <>
            <ul className={style.list}>
              {zonas.map(zona => (
                <li key={`${zona.communityRef.name}-${zona.name}`} className={style.listItem}>
                  <p className={style.itemTitle}>{zona.name}</p>
                  <p className={style.itemMeta}>Comunidad: {zona.communityRef.name}</p>
                  <p className={style.itemMeta}>{zona.description}</p>
                  <div className={style.pillRow}>
                    <span className={style.pill}>
                      {formatoHora.format(zona.startTime)} - {formatoHora.format(zona.endTime)}
                    </span>
                    <span className={style.pill}>{zona._count.reservations} reservas</span>
                  </div>
                  <form action={deleteZoneAdmin}>
                    <input type="hidden" name="nombre" value={zona.name} />
                    <input type="hidden" name="comunidad" value={zona.community} />
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
            {q ? `No hay zonas que coincidan con "${q}".` : "No hay zonas comunes registradas."}
          </p>
        )}
      </article>
    </main>
  );
}
