import CardStat from "@/components/ui/Cards/CardStat";
import { calculateFinancialSummary, formatCurrencyAmount } from "@/lib/finance";
import prisma from "@/lib/prisma";
import Link from "next/link";
import style from "../style.module.css";

const accesosDirectos = [
  { text: "Comunidades", href: "/backoffice/communities" },
  { text: "Usuarios", href: "/backoffice/users" },
  { text: "Incidencias", href: "/backoffice/incidents" },
  { text: "Zonas Comunes", href: "/backoffice/common-zones" },
  { text: "Finanzas", href: "/backoffice/finances" },
  { text: "Solicitudes", href: "/backoffice/requests" },
  { text: "Contacto", href: "/backoffice/contact" }
] as const;

/**
 * Backoffice overview page.
 *
 * Shows a global operational summary of the platform with community statistics,
 * users, incidents, common areas, requests and financial balance.
 *
 * @returns La rendered backoffice overview page
 */
export default async function BackOfficeOverviewPage(): Promise<React.ReactNode> {
  const [totalCommunities, totalUsers, totalIncidents, totalZones, pendingRequests, records, recentCommunities] =
    await Promise.all([
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

  const { finalBalance } = calculateFinancialSummary(records);

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
        <CardStat title="Comunidades" value={String(totalCommunities)} description="Comunidades dadas de alta" />
        <CardStat title="Usuarios" value={String(totalUsers)} description="Usuarios registrados en la plataforma" />
        <CardStat
          title="Incidencias"
          value={String(totalIncidents)}
          description="Incidencias acumuladas en todas las comunidades"
        />
        <CardStat title="Zonas" value={String(totalZones)} description="Zonas comunes creadas" />
        <CardStat
          title="Solicitudes"
          value={String(pendingRequests)}
          description="Solicitudes pendientes de revision"
        />
        <CardStat
          title="Balance Global"
          value={formatCurrencyAmount(finalBalance)}
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

          {recentCommunities.length > 0 ? (
            <ul className={style.list}>
              {recentCommunities.map(community => (
                <li key={community.id} className={style.listItem}>
                  <p className={style.itemTitle}>{community.name}</p>
                  <p className={style.itemMeta}>
                    {community.city}, {community.province}
                  </p>
                  <p className={style.itemMeta}>
                    Admin: {community.admin.name} {community.admin.lastName}
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
