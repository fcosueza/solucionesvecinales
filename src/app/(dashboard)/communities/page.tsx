import OverviewActions from "@/components/layouts/OverviewActions";
import CardCommunity from "@/components/ui/Cards/CardCommunity";
import PageHelpWidget, { type HelpContent } from "@/components/ui/PageHelpWidget";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { redirect } from "next/navigation";
import style from "./style.module.css";

const communityTitle = "Mis comunidades";
const communityDescription = "Aquí tienes todas las comunidades a las que perteneces";
const communityEmptyMessage = "Aún no estás suscrito a ninguna comunidad. Usa el botón de búsqueda para unirte a una.";

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
 * @returns La rendered user communities page
 */
const CommunitiesPage = async (): Promise<React.ReactNode> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    redirect("/login");
  }

  const user = await prisma.user.findUnique({
    where: {
      id: verifiedSession.session.userID
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

  if (!user) {
    redirect("/login");
  }

  const communitiesMembership = user.memberships.map(inscripcion => inscripcion.communityRef);
  const uniqueCommunities = Array.from(
    new Map(communitiesMembership.map(comunidad => [comunidad.id, comunidad])).values()
  );

  const pendingCommunities = user.requests
    .map(s => s.communityRef)
    .filter(c => !uniqueCommunities.some(inscrita => inscrita.id === c.id));

  return (
    <main className={style.main}>
      <PageHelpWidget content={helpContent} />
      <section className={style.communitiesSection}>
        <h1 className={style.title}>{communityTitle}</h1>
        <p className={style.description}>{communityDescription}</p>

        <div className={style.cardsContainer}>
          {uniqueCommunities.map(community => {
            const detalleComunidadFormID = `community-detail-${community.id}`;

            return (
              <div key={community.id}>
                <CardCommunity
                  className={style.cardCommunity}
                  imageURL="/assets/images/default-community.jpeg"
                  imageAltText={`Imagen de la comunidad ${community.name}`}
                  communityName={community.name}
                  communityAddress={`${community.street}, ${community.number}. ${community.city}`}
                  ctaButtonType="submit"
                  ctaFormID={detalleComunidadFormID}
                />

                <form action={`/communities/${community.id}/overview`} id={detalleComunidadFormID} />
              </div>
            );
          })}

          {pendingCommunities.map(community => (
            <CardCommunity
              key={community.id}
              className={style.cardCommunity}
              imageURL="/assets/images/default-community.jpeg"
              imageAltText={`Imagen de la comunidad ${community.name}`}
              communityName={community.name}
              communityAddress={`${community.street}, ${community.number}. ${community.city}`}
              ctaText="Solicitud pendiente"
              ctaDisabled
            />
          ))}

          {uniqueCommunities.length === 0 && pendingCommunities.length === 0 && (
            <p className={style.emptyState}>{communityEmptyMessage}</p>
          )}
        </div>
      </section>

      <section className={style.actionsSection}>
        <OverviewActions role={user.role as UserRole} />
      </section>
    </main>
  );
};

export default CommunitiesPage;
