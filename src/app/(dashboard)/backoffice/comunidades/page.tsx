import CardStat from "@/components/ui/Cards/CardStat";
import { deleteCommunityAdmin } from "@/actions/community/communitySettings";
import prisma from "@/lib/prisma";
import style from "../style.module.css";

const PAGE_SIZE = 10;

export default async function BackOfficeCommunitiesPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}): Promise<React.ReactNode> {
  const { q = "", page: pageParam = "1" } = await searchParams;
  const page = Math.max(1, parseInt(pageParam, 10) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const where = q ? { nombre: { contains: q, mode: "insensitive" as const } } : undefined;

  const [totalComunidades, comunidadesConZonas, comunidadesConSolicitudesPendientes, comunidades, totalFiltradas] =
    await Promise.all([
      prisma.comunidad.count(),
      prisma.comunidad.count({ where: { zonas: { some: {} } } }),
      prisma.comunidad.count({ where: { solicitudes: { some: { estado: "pendiente" } } } }),
      prisma.comunidad.findMany({
        where,
        skip,
        take: PAGE_SIZE,
        orderBy: { id: "desc" },
        select: {
          id: true,
          nombre: true,
          calle: true,
          numero: true,
          ciudad: true,
          provincia: true,
          admin: {
            select: {
              nombre: true,
              apellido: true
            }
          },
          _count: {
            select: {
              zonas: true,
              incidentes: true,
              solicitudes: true
            }
          }
        }
      }),
      prisma.comunidad.count({ where })
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
                  <p className={style.itemTitle}>{comunidad.nombre}</p>
                  <p className={style.itemMeta}>
                    {comunidad.calle}, {comunidad.numero}. {comunidad.ciudad}, {comunidad.provincia}
                  </p>
                  <p className={style.itemMeta}>
                    Admin: {comunidad.admin.nombre} {comunidad.admin.apellido}
                  </p>
                  <div className={style.pillRow}>
                    <span className={style.pill}>{comunidad._count.zonas} zonas</span>
                    <span className={style.pill}>{comunidad._count.incidentes} incidencias</span>
                    <span className={style.pill}>{comunidad._count.solicitudes} solicitudes</span>
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
