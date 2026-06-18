import ActionButton from "@/components/ui/ActionButton";
import PageHelpWidget, { type HelpContent } from "@/components/ui/PageHelpWidget";
import Table, { TableRow } from "@/components/ui/Table";
import { calculateFinancialSummary, formatCurrencyAmount, FinancialRecordCalculable } from "@/lib/finance";
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
  description: FinancialRecordCalculable["description"];
  amount: FinancialRecordCalculable["amount"];
  type: "income" | "expense";
  createdAt: Date;
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

/**
 * Formats a Date object as a Spanish date label (dd/mm/yyyy).
 *
 * @param date El objeto Date a formatear
 * @returns String with the date in dd/mm/yyyy format
 */
const toDateLabel = (date: Date): string => {
  return new Intl.DateTimeFormat("es-ES", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric"
  }).format(date);
};

/**
 * Constructs an array of table rows for a financial section (income or expenses).
 * It includes a section header, record rows, and a total row.
 *
 * @param title The section title (ex: "Income", "Expenses")
 * @param registros Array of section financial records
 * @param emptyMessage Message to show when there are no records
 * @param total The cumulative total of the section
 * @returns Array of rows (TableRow[]) to render to the table
 */
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
          registro.description,
          toDateLabel(registro.createdAt),
          formatCurrencyAmount(Number(registro.amount.toString()))
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

/**
 * Community finance page.
 * Shows the income, expenses and financial balance of the community.
 * Allows administrators to add new financial records.
 *
 * @component
 * @param params Route parameters including community ID
 * @returns La community finance page rendered
 */
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

  const community = await prisma.community.findUnique({
    where: { id: communityID },
    select: {
      id: true,
      name: true,
      street: true,
      number: true,
      city: true,
      province: true,
      country: true,
      financialRecords: {
        select: {
          id: true,
          description: true,
          amount: true,
          type: true,
          createdAt: true
        },
        orderBy: {
          createdAt: "desc"
        }
      }
    }
  });

  if (!community) {
    notFound();
  }

  const pagos = community.financialRecords.filter(registro => registro.type === "expense");
  const ingresos = community.financialRecords.filter(registro => registro.type === "income");
  const canAddRecord =
    verifiedSession.session.role === UserRole.admin || verifiedSession.session.role === UserRole.webAdmin;

  const { totalIngresos, totalPagos, balanceFinal } = calculateFinancialSummary(community.financialRecords);

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
          alt={`Imagen de la comunidad ${community.name}`}
          width={240}
          height={160}
          className={style.headerImage}
          priority
        />

        <div className={style.headerInfo}>
          <h1 className={style.title}>Finanzas</h1>
          <p className={style.communityName}>{community.name}</p>
          <p className={style.address}>
            {community.street}, {community.number}. {community.city}, {community.province}, {community.country}
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
