import OverviewActions from "@/components/layouts/OverviewActions";
import CardCommunity from "@/components/ui/CardCommunity";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import Link from "next/link";
import { redirect } from "next/navigation";
import style from "./style.module.css";

const tituloComunidades = "Mis comunidades";
const descripcionComunidades = "Aquí tienes todas las comunidades a las que perteneces";
const mensajeSinComunidades = "Aún no estás suscrito a ninguna comunidad. Usa el botón de búsqueda para unirte a una.";

const CommunitiesPage = async (): Promise<React.ReactNode> => {
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
      <section className={style.communitiesSection}>
        <h1 className={style.title}>{tituloComunidades}</h1>
        <p className={style.description}>{descripcionComunidades}</p>

        <div className={style.cardsContainer}>
          {comunidadesUnicas.length > 0 ? (
            comunidadesUnicas.map(comunidad => {
              return (
                <Link
                  href={`/communities/${comunidad.id}`}
                  key={comunidad.id}
                  className={style.cardLink}
                  aria-label={`Ir al detalle de la comunidad ${comunidad.nombre}`}
                >
                  <CardCommunity
                    className={style.cardCommunity}
                    imageURL="/assets/images/default-community.jpeg"
                    imageAltText={`Imagen de la comunidad ${comunidad.nombre}`}
                    communityName={comunidad.nombre}
                    communityAddress={`${comunidad.calle}, ${comunidad.numero}. ${comunidad.ciudad}`}
                  />
                </Link>
              );
            })
          ) : (
            <p className={style.emptyState}>{mensajeSinComunidades}</p>
          )}
        </div>
      </section>

      <section className={style.actionsSection}>
        <OverviewActions role={usuario.rol as UserRole} />
      </section>
    </main>
  );
};

export default CommunitiesPage;
