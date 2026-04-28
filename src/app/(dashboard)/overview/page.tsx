import Gallery from "@/components/layouts/Gallery";
import OverviewActions from "@/components/layouts/OverviewActions";
import CardFeatures from "@/components/ui/CardFeatures";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import Link from "next/link";
import { redirect } from "next/navigation";
import style from "./style.module.css";

const tituloComunidades = "Mis comunidades";
const mensajeSinComunidades = "Aún no estás suscrito a ninguna comunidad. Usa el botón de búsqueda para unirte a una.";

const Overview = async (): Promise<React.ReactNode> => {
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    redirect("/login");
  }

  const usuario = await prisma.usuario.findUnique({
    where: {
      id: sesionVerificada.session.userID
    },
    select: {
      rol: true,
      adminComm: {
        select: {
          id: true,
          nombre: true,
          calle: true,
          numero: true,
          ciudad: true
        }
      },
      inquilinoComm: {
        select: {
          id: true,
          nombre: true,
          calle: true,
          numero: true,
          ciudad: true
        }
      }
    }
  });

  if (!usuario) {
    redirect("/login");
  }

  const comunidadesSuscritas = [usuario.adminComm, ...usuario.inquilinoComm].filter(comunidad => comunidad !== null);
  const comunidadesUnicas = Array.from(new Map(comunidadesSuscritas.map(c => [c.id, c])).values());

  return (
    <main className={style.main}>
      <section>
        <Gallery title={tituloComunidades}>
          {comunidadesUnicas.length > 0 ? (
            comunidadesUnicas.map(comunidad => {
              return (
                <Link
                  href={`/overview/comunidades/${comunidad.id}`}
                  key={comunidad.id}
                  className={style.cardLink}
                  aria-label={`Ir al detalle de la comunidad ${comunidad.nombre}`}
                >
                  <CardFeatures
                    className={style.cardComunity}
                    iconURL="/assets/images/default-community.jpeg"
                    iconAltText={`Icono de la comunidad ${comunidad.nombre}`}
                    iconWidth={56}
                    iconHeight={56}
                    cardTitle={comunidad.nombre}
                    cardPara={`${comunidad.calle}, ${comunidad.numero}. ${comunidad.ciudad}`}
                  />
                </Link>
              );
            })
          ) : (
            <p className={style.emptyState}>{mensajeSinComunidades}</p>
          )}
        </Gallery>
      </section>

      <section className={style.actionsSection}>
        <OverviewActions role={usuario.rol as UserRole} />
      </section>
    </main>
  );
};

export default Overview;
