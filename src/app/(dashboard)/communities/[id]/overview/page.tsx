import MessageBoard from "@/components/layouts/MessageBoard";
import CardCommonArea from "@/components/ui/Cards/CardCommonArea";
import CardStat from "@/components/ui/Cards/CardStat";
import PageHelpWidget, { type HelpContent } from "@/components/ui/PageHelpWidget";
import verifySession from "@/lib/dal";
import { calculateFinancialSummary, formatCurrencyAmount } from "@/lib/finance";
import Link from "next/link";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { UserRole } from "@/types";
import { notFound, redirect } from "next/navigation";
import style from "./style.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

const helpContent: HelpContent = {
  title: "Ayuda: Vista general",
  summary: "Resumen principal de la comunidad y acceso a módulos.",
  steps: [
    "Consulta los datos destacados de la comunidad.",
    "Usa los accesos para navegar a incidencias, finanzas o zonas.",
    "Revisa notificaciones y estado general.",
    "Continúa en el módulo que necesites gestionar."
  ],
  constraints: [
    "Debes estar inscrito en la comunidad para entrar.",
    "Algunas opciones dependen de permisos de administrador."
  ]
};

/**
 * Community overview page.
 * Shows the main community summary with statistics, message board and
 * Featured common areas. Provides quick access to community modules.
 *
 * @component
 * @param params Route parameters including community ID
 * @returns La community overview page rendered
 */
const CommunityOverviewPage = async ({ params }: Props): Promise<React.ReactNode> => {
  const { id } = await params;
  const comunidadId = Number(id);

  if (isNaN(comunidadId)) {
    notFound();
  }

  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    redirect("/login");
  }

  const comunidad = await prisma.community.findUnique({
    where: { id: comunidadId },
    select: {
      id: true,
      name: true,
      street: true,
      number: true,
      city: true,
      province: true,
      country: true,
      messages: {
        select: {
          text: true,
          createdAt: true
        },
        orderBy: {
          createdAt: "desc"
        },
        take: 20
      },
      zones: {
        select: {
          name: true,
          description: true,
          startTime: true,
          endTime: true,
          image: true
        },
        orderBy: {
          name: "asc"
        }
      },
      _count: {
        select: {
          incidents: true
        }
      },
      financialRecords: {
        select: {
          type: true,
          amount: true
        }
      }
    }
  });

  if (!comunidad) {
    notFound();
  }

  const { balanceFinal } = calculateFinancialSummary(comunidad.financialRecords);
  const esAdmin =
    sesionVerificada.session.role === UserRole.admin || sesionVerificada.session.role === UserRole.webAdmin;

  return (
    <main className={style.main}>
      <PageHelpWidget content={helpContent} />
      <section className={style.headerSection}>
        <Image
          src="/assets/images/default-community.jpeg"
          alt={`Imagen de la comunidad ${comunidad.name}`}
          width={240}
          height={160}
          className={style.headerImage}
          priority
        />

        <div className={style.headerInfo}>
          <h1 className={style.title}>{comunidad.name}</h1>
          <p className={style.address}>
            {comunidad.street}, {comunidad.number}. {comunidad.city}, {comunidad.province}, {comunidad.country}
          </p>
        </div>
      </section>

      <section className={style.section}>
        <h2 className={style.sectionTitle}>Tablón de mensajes</h2>
        <MessageBoard messages={comunidad.messages} communityID={comunidadId} isAdmin={esAdmin} />
      </section>

      <section className={style.section}>
        <h2 className={style.sectionTitle}>Zonas comunes</h2>

        {comunidad.zones.length > 0 ? (
          <div className={style.zonesGrid}>
            {comunidad.zones.map(zona => (
              <CardCommonArea
                key={zona.name}
                name={zona.name}
                description={zona.description}
                startTime={zona.startTime}
                endTime={zona.endTime}
                imageUrl={zona.image ?? "/assets/images/default-community.jpeg"}
                reservationSummary="Reserva turnos de 1 o 2 horas en los próximos 7 días. Solo una reserva activa por usuario."
                action={
                  <Link className={style.zoneLink} href={`/communities/${comunidadId}/zonas-comunes`}>
                    Ir a reservas
                  </Link>
                }
              />
            ))}
          </div>
        ) : (
          <p className={style.emptyState}>Esta comunidad todavia no tiene zonas comunes registradas.</p>
        )}
      </section>

      <section className={`${style.section} ${style.statsSection}`.trim()}>
        <CardStat
          title="Incidencias"
          value={String(comunidad._count.incidents)}
          description="Incidencias totales registradas en la comunidad"
        />
        <CardStat
          title="Balance total"
          value={formatCurrencyAmount(balanceFinal)}
          description="Balance total calculado como ingresos menos pagos registrados"
        />
      </section>
    </main>
  );
};

export default CommunityOverviewPage;
