import CardStat from "@/components/ui/Cards/CardStat";
import { deleteRecord } from "@/actions/community/communityFinance";
import { calculateFinancialSummary, formatCurrencyAmount } from "@/lib/finance";
import prisma from "@/lib/prisma";
import style from "../style.module.css";

const PAGE_SIZE = 10;

/**
 * Backoffice financial management page.
 * Shows an aggregated summary of the economic movements of all communities,
 * including income, expenses and total balance. Allows search and paging of records.
 *
 * @component
 * @param searchParams Optional search parameters: q (search term) and page (current page)
 * @returns La rendered backoffice finance page
 */
export default async function BackOfficeFinancePage({
  searchParams
}: {
  searchParams: Promise<{ q?: string; page?: string }>;
}): Promise<React.ReactNode> {
  const { q = "", page: pageParam = "1" } = await searchParams;
  const page = Math.max(1, parseInt(pageParam, 10) || 1);
  const skip = (page - 1) * PAGE_SIZE;

  const where = q ? { description: { contains: q, mode: "insensitive" as const } } : undefined;

  const [registrosTodos, totalRegistros, comunidadesConMovimientos, movimientos, totalFiltrados] = await Promise.all([
    prisma.financialRecord.findMany({ select: { type: true, amount: true } }),
    prisma.financialRecord.count(),
    prisma.community.count({ where: { financialRecords: { some: {} } } }),
    prisma.financialRecord.findMany({
      where,
      skip,
      take: PAGE_SIZE,
      orderBy: { createdAt: "desc" },
      select: {
        id: true,
        description: true,
        amount: true,
        type: true,
        createdAt: true,
        communityRef: {
          select: {
            name: true
          }
        }
      }
    }),
    prisma.financialRecord.count({ where })
  ]);

  const { totalIncome, totalPayments, balanceFinal } = calculateFinancialSummary(registrosTodos);
  const totalPages = Math.max(1, Math.ceil(totalFiltrados / PAGE_SIZE));

  return (
    <main className={style.main}>
      <header className={style.header}>
        <p className={style.eyebrow}>Back Office</p>
        <h1 className={style.title}>Finanzas</h1>
        <p className={style.description}>Supervision agregada de movimientos economicos en todas las comunidades.</p>
      </header>

      <section className={style.statsGrid}>
        <CardStat title="Movimientos" value={String(totalRegistros)} description="Registros financieros acumulados" />
        <CardStat title="Ingresos" value={formatCurrencyAmount(totalIncome)} description="Importe total de ingresos" />
        <CardStat title="Gastos" value={formatCurrencyAmount(totalPayments)} description="Importe total de gastos" />
        <CardStat
          title="Balance"
          value={formatCurrencyAmount(balanceFinal)}
          description={`Saldo consolidado en ${comunidadesConMovimientos} comunidades`}
        />
      </section>

      <article className={style.sectionCard}>
        <h2 className={style.sectionTitle}>Movimientos</h2>
        <p className={style.sectionDescription}>
          {totalFiltrados} resultado{totalFiltrados !== 1 ? "s" : ""}
          {q ? ` para "${q}"` : ""}.
        </p>

        <form method="GET" className={style.searchRow}>
          <input
            type="search"
            name="q"
            defaultValue={q}
            placeholder="Buscar por descripcion..."
            className={style.searchInput}
          />
          <button type="submit" className={style.searchBtn}>
            Buscar
          </button>
        </form>

        {movimientos.length > 0 ? (
          <>
            <ul className={style.list}>
              {movimientos.map(registro => (
                <li key={registro.id} className={style.listItem}>
                  <p className={style.itemTitle}>{registro.description}</p>
                  <p className={style.itemMeta}>Comunidad: {registro.communityRef.name}</p>
                  <div className={style.pillRow}>
                    <span className={style.pill}>{registro.type}</span>
                    <span className={style.pill}>{formatCurrencyAmount(Number(registro.amount.toString()))}</span>
                    <span className={style.pill}>{registro.createdAt.toLocaleDateString("es-ES")}</span>
                  </div>
                  <form action={deleteRecord}>
                    <input type="hidden" name="id" value={registro.id} />
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
            {q ? `No hay movimientos que coincidan con "${q}".` : "No hay movimientos financieros registrados."}
          </p>
        )}
      </article>
    </main>
  );
}
