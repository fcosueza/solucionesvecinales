import MessageBoard from "@/components/layouts/MessageBoard";
import CardCommonArea from "@/components/ui/CardCommonArea";
import CardStat from "@/components/ui/CardStat";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import Image from "next/image";
import { UserRole } from "@/types";
import { notFound, redirect } from "next/navigation";
import style from "./style.module.css";

interface Props {
  params: Promise<{ id: string }>;
}

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

  const comunidad = await prisma.comunidad.findUnique({
    where: { id: comunidadId },
    select: {
      id: true,
      nombre: true,
      calle: true,
      numero: true,
      ciudad: true,
      provincia: true,
      pais: true,
      mensajes: {
        select: {
          texto: true,
          creadoEn: true
        },
        orderBy: {
          creadoEn: "desc"
        },
        take: 20
      },
      zonas: {
        select: {
          nombre: true,
          descripcion: true,
          hora_inicio: true,
          hora_fin: true,
          imagen: true
        },
        orderBy: {
          nombre: "asc"
        }
      },
      _count: {
        select: {
          incidentes: true
        }
      }
    }
  });

  if (!comunidad) {
    notFound();
  }

  const balanceTotal = null;
  const esAdmin =
    sesionVerificada.session.role === UserRole.admin || sesionVerificada.session.role === UserRole.webAdmin;

  return (
    <main className={style.main}>
      <section className={style.headerSection}>
        <Image
          src="/assets/images/default-community.jpeg"
          alt={`Imagen de la comunidad ${comunidad.nombre}`}
          width={240}
          height={160}
          className={style.headerImage}
          priority
        />

        <div className={style.headerInfo}>
          <h1 className={style.title}>{comunidad.nombre}</h1>
          <p className={style.address}>
            {comunidad.calle}, {comunidad.numero}. {comunidad.ciudad}, {comunidad.provincia}, {comunidad.pais}
          </p>
        </div>
      </section>

      <section className={style.section}>
        <h2 className={style.sectionTitle}>Tablón de mensajes</h2>
        <MessageBoard mensajes={comunidad.mensajes} comunidadId={comunidadId} isAdmin={esAdmin} />
      </section>

      <section className={style.section}>
        <h2 className={style.sectionTitle}>Zonas comunes</h2>

        {comunidad.zonas.length > 0 ? (
          <div className={style.zonesGrid}>
            {comunidad.zonas.map(zona => (
              <CardCommonArea
                key={zona.nombre}
                nombre={zona.nombre}
                descripcion={zona.descripcion}
                horaInicio={zona.hora_inicio}
                horaFin={zona.hora_fin}
                imageUrl={zona.imagen ?? "/assets/images/default-community.jpeg"}
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
          value={String(comunidad._count.incidentes)}
          description="Incidencias totales registradas en la comunidad"
        />
        <CardStat
          title="Balance total"
          value={balanceTotal === null ? "Pendiente" : `${balanceTotal} EUR`}
          description="Aun no hay un modulo financiero integrado para calcular este valor"
        />
      </section>
    </main>
  );
};

export default CommunityOverviewPage;
