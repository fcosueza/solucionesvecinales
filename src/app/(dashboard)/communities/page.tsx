import OverviewActions from "@/components/layouts/OverviewActions";
import CardCommunity from "@/components/ui/Cards/CardCommunity";
import PageHelpWidget, { type HelpContent } from "@/components/ui/PageHelpWidget";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { redirect } from "next/navigation";
import style from "./style.module.css";

const tituloComunidades = "Mis comunidades";
const descripcionComunidades = "Aquí tienes todas las comunidades a las que perteneces";
const mensajeSinComunidades = "Aún no estás suscrito a ninguna comunidad. Usa el botón de búsqueda para unirte a una.";

const helpContent: HelpContent = {
  title: "Ayuda: Mis comunidades",
  summary: "Muestra tus comunidades actuales y accesos rápidos.",
  steps: [
    "Revisa las tarjetas de comunidades suscritas.",
    "Pulsa el botón de cada tarjeta para abrir su detalle.",
    "Usa las acciones laterales para buscar o crear comunidades.",
    "Si no tienes comunidades, usa la búsqueda para unirte."
  ],
  constraints: ["Algunas acciones dependen de tu rol.", "Las solicitudes pendientes se muestran sin acceso completo."]
};

/**
 * My dashboard communities page.
 * Lists all communities to which the user is subscribed.
 * Provides shortcuts to search, create or join new communities.
 *
 * @component
 * @returns La rendered user communities page
 */
const CommunitiesPage = async (): Promise<React.ReactNode> => {
  const sesionVerificada = await verifySession();

  if (!sesionVerificada.isAuth || !sesionVerificada.session) {
    redirect("/login");
  }

  const usuario = await prisma.user.findUnique({
    where: {
      id: sesionVerificada.session.userID
    },
    select: {
      role: true,
      memberships: {
        select: {
          communityRef: {
            select: {
              id: true,
              name: true,
              street: true,
              number: true,
              city: true
            }
          }
        }
      },
      requests: {
        where: { status: "pending" },
        select: {
          communityRef: {
            select: {
              id: true,
              name: true,
              street: true,
              number: true,
              city: true
            }
          }
        }
      }
    }
  });

  if (!usuario) {
    redirect("/login");
  }

  const comunidadesSuscritas = usuario.memberships.map(inscripcion => inscripcion.communityRef);
  const comunidadesUnicas = Array.from(
    new Map(comunidadesSuscritas.map(comunidad => [comunidad.id, comunidad])).values()
  );

  const comunidadesPendientes = usuario.requests
    .map(s => s.communityRef)
    .filter(c => !comunidadesUnicas.some(inscrita => inscrita.id === c.id));

  return (
    <main className={style.main}>
      <PageHelpWidget content={helpContent} />
      <section className={style.communitiesSection}>
        <h1 className={style.title}>{tituloComunidades}</h1>
        <p className={style.description}>{descripcionComunidades}</p>

        <div className={style.cardsContainer}>
          {comunidadesUnicas.map(comunidad => {
            const detalleComunidadFormID = `community-detail-${comunidad.id}`;

            return (
              <div key={comunidad.id}>
                <CardCommunity
                  className={style.cardCommunity}
                  imageURL="/assets/images/default-community.jpeg"
                  imageAltText={`Imagen de la comunidad ${comunidad.name}`}
                  communityName={comunidad.name}
                  communityAddress={`${comunidad.street}, ${comunidad.number}. ${comunidad.city}`}
                  ctaButtonType="submit"
                  ctaFormID={detalleComunidadFormID}
                />

                <form action={`/communities/${comunidad.id}/overview`} id={detalleComunidadFormID} />
              </div>
            );
          })}

          {comunidadesPendientes.map(comunidad => (
            <CardCommunity
              key={comunidad.id}
              className={style.cardCommunity}
              imageURL="/assets/images/default-community.jpeg"
              imageAltText={`Imagen de la comunidad ${comunidad.name}`}
              communityName={comunidad.name}
              communityAddress={`${comunidad.street}, ${comunidad.number}. ${comunidad.city}`}
              ctaText="Solicitud pendiente"
              ctaDisabled
            />
          ))}

          {comunidadesUnicas.length === 0 && comunidadesPendientes.length === 0 && (
            <p className={style.emptyState}>{mensajeSinComunidades}</p>
          )}
        </div>
      </section>

      <section className={style.actionsSection}>
        <OverviewActions role={usuario.role as UserRole} />
      </section>
    </main>
  );
};

export default CommunitiesPage;
