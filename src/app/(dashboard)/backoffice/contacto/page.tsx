import CardStat from "@/components/ui/Cards/CardStat";
import { deleteContact } from "@/actions/contactMsg";
import prisma from "@/lib/prisma";
import style from "../style.module.css";

const PAGE_SIZE = 10;

export default async function BackOfficeContactoPage({
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
          { email: { contains: q, mode: "insensitive" as const } },
          { mensaje: { contains: q, mode: "insensitive" as const } }
        ]
      }
    : undefined;

  const [total, totalFiltrados, mensajes] = await Promise.all([
    prisma.contacto.count(),
    prisma.contacto.count({ where }),
    prisma.contacto.findMany({
      where,
      skip,
      take: PAGE_SIZE,
      orderBy: { creadoEn: "desc" }
    })
  ]);

  const totalPages = Math.max(1, Math.ceil(totalFiltrados / PAGE_SIZE));

  return (
    <main className={style.main}>
      <header className={style.header}>
        <p className={style.eyebrow}>Back Office</p>
        <h1 className={style.title}>Contacto</h1>
        <p className={style.description}>Mensajes recibidos a traves del formulario de contacto de la plataforma.</p>
      </header>

      <section className={style.statsGrid}>
        <CardStat title="Mensajes" value={String(total)} description="Mensajes de contacto recibidos" />
      </section>

      <article className={style.sectionCard}>
        <h2 className={style.sectionTitle}>Mensajes de contacto</h2>
        <p className={style.sectionDescription}>
          {totalFiltrados} resultado{totalFiltrados !== 1 ? "s" : ""}
          {q ? ` para "${q}"` : ""}.
        </p>

        <form method="GET" className={style.searchRow}>
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Buscar por nombre, email o mensaje..."
            className={style.searchInput}
          />
          <button type="submit" className={style.searchBtn}>
            Buscar
          </button>
        </form>

        {mensajes.length > 0 ? (
          <>
            <ul className={style.list}>
              {mensajes.map(contacto => (
                <li
                  key={`${contacto.nombre}-${contacto.email}-${contacto.creadoEn.toISOString()}`}
                  className={style.listItem}
                >
                  <p className={style.itemTitle}>{contacto.nombre}</p>
                  <p className={style.itemMeta}>{contacto.email}</p>
                  <p className={style.itemMeta}>{contacto.mensaje}</p>
                  <div className={style.pillRow}>
                    <span className={style.pill}>{contacto.creadoEn.toLocaleDateString("es-ES")}</span>
                  </div>
                  <form action={deleteContact}>
                    <input type="hidden" name="nombre" value={contacto.nombre} />
                    <input type="hidden" name="email" value={contacto.email} />
                    <input type="hidden" name="creadoEn" value={contacto.creadoEn.toISOString()} />
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
          <p className={style.emptyState}>No hay mensajes de contacto.</p>
        )}
      </article>
    </main>
  );
}
