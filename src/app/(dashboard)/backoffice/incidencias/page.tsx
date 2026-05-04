import CardStat from "@/components/ui/Cards/CardStat";
import { deleteIncidentAdmin } from "@/actions/community/communityIncident";
import prisma from "@/lib/prisma";
import style from "../style.module.css";

const PAGE_SIZE = 10;

/**
 * Página de gestión de incidencias del backoffice.
 * Lista todas las incidencias de todas las comunidades con soporte de búsqueda y paginación.
 * Permite revisar el estado operativo del flujo de incidencias (reportado, procesandose, resuelto).
 *
 * @component
 * @param searchParams Parámetros de búsqueda opcionales: q (término de búsqueda) y page (página actual)
 * @returns La página de incidencias del backoffice renderizada
 */
export default async function BackOfficeIncidentsPage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}): Promise<React.ReactNode> {
  const { q = "", page: pageParam = "1" } = await searchParams;
  const page = Math.max(1, parseInt(pageParam, 10) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const where = q ? { titulo: { contains: q, mode: "insensitive" as const } } : undefined;

  const [totalIncidencias, reportadas, enProceso, resueltas, incidencias, totalFiltradas] = await Promise.all([
    prisma.incidencia.count(),
    prisma.incidencia.count({ where: { estado: "reportado" } }),
    prisma.incidencia.count({ where: { estado: "procesandose" } }),
    prisma.incidencia.count({ where: { estado: "resuelto" } }),
    prisma.incidencia.findMany({
      where,
      skip,
      take: PAGE_SIZE,
      orderBy: [{ actualizadaEn: "desc" }, { fecha: "desc" }],
      select: {
        titulo: true,
        estado: true,
        fecha: true,
        actualizadaEn: true,
        comunidad: true,
        usuario: true,
        comunidadID: {
          select: {
            nombre: true
          }
        },
        usuarioID: {
          select: {
            nombre: true,
            apellido: true
          }
        }
      }
    }),
    prisma.incidencia.count({ where })
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
                  key={`${incidencia.titulo}-${incidencia.fecha.toISOString()}-${incidencia.comunidadID.nombre}`}
                  className={style.listItem}
                >
                  <p className={style.itemTitle}>{incidencia.titulo}</p>
                  <p className={style.itemMeta}>Comunidad: {incidencia.comunidadID.nombre}</p>
                  <p className={style.itemMeta}>
                    Reportada por {incidencia.usuarioID.nombre} {incidencia.usuarioID.apellido}
                  </p>
                  <div className={style.pillRow}>
                    <span className={style.pill}>{incidencia.estado}</span>
                    <span className={style.pill}>{incidencia.actualizadaEn.toLocaleDateString("es-ES")}</span>
                  </div>
                  <form action={deleteIncidentAdmin}>
                    <input type="hidden" name="comunidad" value={incidencia.comunidad} />
                    <input type="hidden" name="usuario" value={incidencia.usuario} />
                    <input type="hidden" name="fecha" value={incidencia.fecha.toISOString()} />
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
