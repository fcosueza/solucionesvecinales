import ActionButton from "@/components/ui/ActionButton";
import PageHelpWidget, { type HelpContent } from "@/components/ui/PageHelpWidget";
import Table, { TableRow } from "@/components/ui/Table";
import { calculateFinancialSummary, formatCurrencyAmount, RegistroCalculable } from "@/lib/finance";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { notFound, redirect } from "next/navigation";
import { UserRole } from "@/types";
import style from "./style.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

interface RegistroItem {
  id: number;
  descripcion: string;
  importe: RegistroCalculable["importe"];
  tipo: "ingreso" | "gasto";
  creadoEn: Date;
}

const helpContent: HelpContent = {
  title: "Ayuda: Finanzas",
  summary: "Consulta ingresos, gastos y balance de la comunidad.",
  steps: [
    "Revisa las secciones de pagos e ingresos.",
    "Valida importes y fechas en la tabla.",
    "Consulta el balance final para estado financiero.",
    "Si tienes permisos, añade un nuevo registro."
  ],
  constraints: [
    "No todos los roles pueden crear registros financieros.",
    "Los importes deben cumplir el formato establecido."
  ]
};

const toDateLabel = (date: Date): string => {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
};

const buildSectionRows = ({
  title,
  registros,
  emptyMessage,
  total
}: {
  title: string;
  registros: RegistroItem[];
  emptyMessage: string;
  total: number;
}): TableRow[] => {
  const rows: TableRow[] = [
    {
      key: `${title}-section`,
      variant: "section",
      cells: [{ content: title, colSpan: 3 }]
    }
  ];

  if (registros.length === 0) {
    rows.push({
      key: `${title}-empty`,
      cells: [{ content: emptyMessage, colSpan: 3 }]
    });
  } else {
    rows.push(
      ...registros.map(registro => ({
        key: registro.id,
        cells: [
          registro.descripcion,
          toDateLabel(registro.creadoEn),
          formatCurrencyAmount(Number(registro.importe.toString()))
        ]
      }))
    );
  }

  rows.push({
    key: `${title}-total`,
    variant: "summary",
    cells: [{ content: "TOTAL", colSpan: 2 }, { content: formatCurrencyAmount(total) }]
  });

  return rows;
};

const CommunityFinancePage = async ({ params }: Props): Promise<React.ReactNode> => {
  const { id } = await params;
  const communityID = Number(id);

  if (isNaN(communityID)) {
    notFound();
  }

  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    redirect("/login");
  }

  const community = await prisma.comunidad.findUnique({
    where: { id: communityID },
    select: {
      id: true,
      nombre: true,
      calle: true,
      numero: true,
      ciudad: true,
      provincia: true,
      pais: true,
      registrosFinancieros: {
        select: {
          id: true,
          descripcion: true,
          importe: true,
          tipo: true,
          creadoEn: true
        },
        orderBy: {
          creadoEn: "desc"
        }
      }
    }
  });

  if (!community) {
    notFound();
  }

  const pagos = community.registrosFinancieros.filter(registro => registro.tipo === "gasto") as RegistroItem[];
  const ingresos = community.registrosFinancieros.filter(registro => registro.tipo === "ingreso") as RegistroItem[];
  const canAddRecord =
    verifiedSession.session.role === UserRole.admin || verifiedSession.session.role === UserRole.webAdmin;

  const { totalIngresos, totalPagos, balanceFinal } = calculateFinancialSummary(community.registrosFinancieros);

  const rows: TableRow[] = [
    ...buildSectionRows({
      title: "Pagos",
      registros: pagos,
      emptyMessage: "No hay pagos registrados.",
      total: totalPagos
    }),
    ...buildSectionRows({
      title: "Ingresos",
      registros: ingresos,
      emptyMessage: "No hay ingresos registrados.",
      total: totalIngresos
    }),
    {
      key: "balance-final",
      variant: "balance",
      cells: [{ content: "Balance Final", colSpan: 2 }, { content: formatCurrencyAmount(balanceFinal) }]
    }
  ];

  return (
    <main className={style.main}>
      <PageHelpWidget content={helpContent} />
      <section className={style.headerSection}>
        <Image
          src="/assets/images/default-community.jpeg"
          alt={`Imagen de la comunidad ${community.nombre}`}
          width={240}
          height={160}
          className={style.headerImage}
          priority
        />

        <div className={style.headerInfo}>
          <h1 className={style.title}>Finanzas</h1>
          <p className={style.communityName}>{community.nombre}</p>
          <p className={style.address}>
            {community.calle}, {community.numero}. {community.ciudad}, {community.provincia}, {community.pais}
          </p>
        </div>
      </section>

      <section className={style.section}>
        <h2 className={style.sectionTitle}>Registros financieros</h2>
        <div className={style.sectionControls}>
          <p className={style.sectionDescription}>
            Consulta pagos e ingresos de la comunidad, con subtotales por seccion y balance final.
          </p>
          <ActionButton
            buttonText="+ añadir registro"
            canOpen={canAddRecord}
            modalType="finance"
            communityID={communityID}
          />
        </div>

        <div className={style.tableCard}>
          <Table headers={["Concepto", "Fecha", "Importe"]} rows={rows} />
        </div>
      </section>
    </main>
  );
};

export default CommunityFinancePage;
