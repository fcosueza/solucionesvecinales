import CardStat from "@/components/ui/Cards/CardStat";
import { calculateFinancialSummary, formatCurrencyAmount } from "@/lib/finance";
import prisma from "@/lib/prisma";
import Link from "next/link";
import style from "../style.module.css";

const accesosDirectos = [
  { text: "Comunidades", href: "/backoffice/comunidades" },
  { text: "Usuarios", href: "/backoffice/usuarios" },
  { text: "Incidencias", href: "/backoffice/incidencias" },
  { text: "Zonas Comunes", href: "/backoffice/zonas-comunes" },
  { text: "Finanzas", href: "/backoffice/finanzas" },
  { text: "Solicitudes", href: "/backoffice/solicitudes" },
  { text: "Contacto", href: "/backoffice/contacto" }
] as const;

/**
 * Backoffice overview page.
 * Shows a global operational summary of the platform with community statistics,
 * users, incidents, common areas, requests and financial balance.
 *
 * @component
 * @returns La rendered backoffice overview page
 */
export default async function BackOfficeOverviewPage(): Promise<React.ReactNode> {
  const [
    totalComunidades,
    totalUsuarios,
    totalIncidencias,
    totalZonas,
    solicitudesPendientes,
    registros,
    comunidadesRecientes
  ] = await Promise.all([
    prisma.community.count(),
    prisma.user.count(),
    prisma.incident.count(),
    prisma.zone.count(),
    prisma.request.count({ where: { status: "pending" } }),
    prisma.financialRecord.findMany({ select: { type: true, amount: true } }),
    prisma.community.findMany({
      take: 5,
      orderBy: { id: "desc" },
      select: {
        id: true,
        name: true,
        city: true,
        province: true,
        admin: {
          select: {
            name: true,
            lastName: true
          }
        }
      }
    })
  ]);

  const { balanceFinal } = calculateFinancialSummary(registros);

  return (
    <main className={style.main}>
      <header className={style.header}>
        <p className={style.eyebrow}>Back Office</p>
        <h1 className={style.title}>Vista General</h1>
        <p className={style.description}>
          Panel operativo global para la administracion web. Desde aqui puedes revisar el estado general de la
          plataforma y saltar a los modulos de gestion.
        </p>
      </header>

      <section className={style.statsGrid}>
        <CardStat title="Comunidades" value={String(totalComunidades)} description="Comunidades dadas de alta" />
        <CardStat title="Usuarios" value={String(totalUsuarios)} description="Usuarios registrados en la plataforma" />
        <CardStat
          title="Incidencias"
          value={String(totalIncidencias)}
          description="Incidencias acumuladas en todas las comunidades"
        />
        <CardStat title="Zonas" value={String(totalZonas)} description="Zonas comunes creadas" />
        <CardStat
          title="Solicitudes"
          value={String(solicitudesPendientes)}
          description="Solicitudes pendientes de revision"
        />
        <CardStat
          title="Balance Global"
          value={formatCurrencyAmount(balanceFinal)}
          description="Ingresos menos gastos registrados"
        />
      </section>

      <section className={style.sectionGrid}>
        <article className={style.sectionCard}>
          <h2 className={style.sectionTitle}>Accesos directos</h2>
          <p className={style.sectionDescription}>Entra directamente en cada modulo del back office.</p>

          <div className={style.linkGrid}>
            {accesosDirectos.map(link => (
              <Link key={link.href} href={link.href} className={style.linkCard}>
                {link.text}
              </Link>
            ))}
          </div>
        </article>

        <article className={style.sectionCard}>
          <h2 className={style.sectionTitle}>Ultimas comunidades</h2>
          <p className={style.sectionDescription}>Referencia rapida de las comunidades mas recientes en el sistema.</p>

          {comunidadesRecientes.length > 0 ? (
            <ul className={style.list}>
              {comunidadesRecientes.map(comunidad => (
                <li key={comunidad.id} className={style.listItem}>
                  <p className={style.itemTitle}>{comunidad.name}</p>
                  <p className={style.itemMeta}>
                    {comunidad.city}, {comunidad.province}
                  </p>
                  <p className={style.itemMeta}>
                    Admin: {comunidad.admin.name} {comunidad.admin.lastName}
                  </p>
                </li>
              ))}
            </ul>
          ) : (
            <p className={style.emptyState}>Todavia no hay comunidades registradas.</p>
          )}
        </article>
      </section>
    </main>
  );
}
