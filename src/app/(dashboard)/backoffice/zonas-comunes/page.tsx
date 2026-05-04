import CardStat from "@/components/ui/Cards/CardStat";
import { deleteZona } from "@/actions/backoffice/delete";
import prisma from "@/lib/prisma";
import style from "../style.module.css";

const PAGE_SIZE = 10;

const formatoHora = new Intl.DateTimeFormat("es-ES", {
  hour: "2-digit",
  minute: "2-digit",
  hour12: false,
  timeZone: "UTC"
});

export default async function BackOfficeZonesPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}): Promise<React.ReactNode> {
  const { q = "", page: pageParam = "1" } = await searchParams;
  const page = Math.max(1, parseInt(pageParam, 10) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const where = q ? { nombre: { contains: q, mode: "insensitive" as const } } : undefined;

  const [totalZonas, totalReservas, comunidadesConZonas, zonas, totalFiltradas] = await Promise.all([
    prisma.zona.count(),
    prisma.reserva.count(),
    prisma.comunidad.count({ where: { zonas: { some: {} } } }),
    prisma.zona.findMany({
      where,
      skip,
      take: PAGE_SIZE,
      orderBy: [{ comunidad: "asc" }, { nombre: "asc" }],
      select: {
        nombre: true,
        descripcion: true,
        hora_inicio: true,
        hora_fin: true,
        comunidad: true,
        comunidadID: {
          select: {
            nombre: true
          }
        },
        _count: {
          select: {
            reservas: true
          }
        }
      }
    }),
    prisma.zona.count({ where })
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
          {totalFiltradas} resultado{totalFiltradas !== 1 ? "s" : ""}{q ? ` para "${q}"` : ""}.
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
                <li key={`${zona.comunidadID.nombre}-${zona.nombre}`} className={style.listItem}>
                  <p className={style.itemTitle}>{zona.nombre}</p>
                  <p className={style.itemMeta}>Comunidad: {zona.comunidadID.nombre}</p>
                  <p className={style.itemMeta}>{zona.descripcion}</p>
                  <div className={style.pillRow}>
                    <span className={style.pill}>
                      {formatoHora.format(zona.hora_inicio)} - {formatoHora.format(zona.hora_fin)}
                    </span>
                    <span className={style.pill}>{zona._count.reservas} reservas</span>
                  </div>
                  <form action={deleteZona}>
                    <input type="hidden" name="nombre" value={zona.nombre} />
                    <input type="hidden" name="comunidad" value={zona.comunidad} />
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
