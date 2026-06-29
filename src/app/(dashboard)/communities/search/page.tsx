import CommunitySearchForm from "@/components/layouts/Forms/CommunitySearchForm";
import Gallery from "@/components/layouts/Gallery";
import CardCommunity from "@/components/ui/Cards/CardCommunity";
import PageHelpWidget, { type HelpContent } from "@/components/ui/PageHelpWidget";
import { requestCommunitySubscription } from "@/actions/community/communityRequest";
import ScrollToTopOnMount from "@/components/ui/ScrollToTop";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { UserRole } from "@/types";
import { redirect } from "next/navigation";
import style from "./style.module.css";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

const aLista = <T,>(valor: T | T[] | null | undefined): T[] => {
  if (Array.isArray(valor)) {
    return valor;
  }

  if (valor == null) {
    return [];
  }

  return [valor];
};

const helpContent: HelpContent = {
  title: "Ayuda: Buscar comunidades",
  summary: "Encuentra comunidades y solicita suscripción.",
  steps: [
    "Escribe texto en el buscador para filtrar resultados.",
    "Revisa las tarjetas coincidentes.",
    "Pulsa Suscribirse en la comunidad deseada.",
    "Espera la aprobación del administrador si aplica."
  ],
  constraints: [
    "Si ya estás inscrito o tienes solicitud pendiente, el botón se desactiva.",
    "Usuarios administradores no pueden suscribirse como inquilinos."
  ]
};

/**
 * Community search page.
 * Allows users to search for communities available on the platform
 * and send subscription requests to those who want to join.
 *
 * @component
 * @param searchParams Optional search parameters: q (search term)
 * @returns La rendered community search page
 */
const SearchCommunityPage = async ({ searchParams }: SearchPageProps): Promise<React.ReactNode> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    redirect("/login");
  }

  const isAdminUser =
    verifiedSession.session.role === UserRole.admin || verifiedSession.session.role === UserRole.webAdmin;

  // We run a query to get all available communities, sorted alphabetically by name
  const communities = await prisma.community.findMany({
    select: {
      id: true,
      name: true,
      street: true,
      number: true,
      city: true,
      province: true,
      country: true
    },
    orderBy: {
      name: "asc"
    }
  });

  // We check which communities the user has to mark the ones they already have registered in the search form
  const userWithCommunities = await prisma.user.findUnique({
    where: {
      id: verifiedSession.session.userID
    },
    select: {
      memberships: {
        select: {
          community: true
        }
      },
      requests: {
        where: {
          status: "pending"
        },
        select: {
          community: true
        }
      }
    }
  });

  // We combine managed communities and communities in which the user is a tenant
  const enrolledCommunityIDs = new Set<number>(aLista(userWithCommunities?.memberships).map(i => i.community));
  const pendingRequestCommunityIDs = new Set<number>(
    aLista(userWithCommunities?.requests).map(request => request.community)
  );

  const resolvedSearchParams = await searchParams;
  const searchTerm = (resolvedSearchParams.q ?? "").trim().toLowerCase();

  const filteredCommunities =
    searchTerm === ""
      ? communities
      : communities.filter(community => {
          const searchableFields = [
            community.name,
            community.street,
            String(community.number),
            community.city,
            community.province,
            community.country
          ];

          return searchableFields.some(field => field.toLowerCase().includes(searchTerm));
        });

  return (
    <>
      <PageHelpWidget content={helpContent} />
      <ScrollToTopOnMount />
      <main className={style.main}>
        <h1 className={style.title}>Buscar comunidad</h1>
        <p className={style.description}>Aquí aparecen todas las comunidades disponibles</p>

        <section className={style.searchSection}>
          <CommunitySearchForm defaultValue={resolvedSearchParams.q ?? ""} />

          {filteredCommunities.length > 0 ? (
            <Gallery>
              {filteredCommunities.map(community => {
                const isAlreadyEnrolled = enrolledCommunityIDs.has(community.id);
                const hasPendingRequest = pendingRequestCommunityIDs.has(community.id);
                const shouldDisableCTA = isAdminUser || isAlreadyEnrolled || hasPendingRequest;
                const ctaText = isAlreadyEnrolled
                  ? "Ya inscrito"
                  : isAdminUser
                    ? "No disponible para administradores"
                    : hasPendingRequest
                      ? "Solicitud pendiente"
                      : "Suscribirse";
                const subscriptionFormID = `subscription-request-community-${community.id}`;

                return (
                  <div key={community.id}>
                    <CardCommunity
                      className={style.cardCommunity}
                      imageURL="/assets/images/default-community.jpeg"
                      imageAltText={`Imagen de la comunidad ${community.name}`}
                      communityName={community.name}
                      communityAddress={`${community.street}, ${community.number}. ${community.city}`}
                      ctaText={ctaText}
                      ctaDisabled={shouldDisableCTA}
                      ctaButtonType="submit"
                      ctaFormID={subscriptionFormID}
                    />

                    {!shouldDisableCTA ? (
                      <form action={requestCommunitySubscription} id={subscriptionFormID}>
                        <input type="hidden" name="communityID" value={community.id} />
                      </form>
                    ) : null}
                  </div>
                );
              })}
            </Gallery>
          ) : (
            <p className={style.emptyState}>No hay comunidades que coincidan con tu busqueda.</p>
          )}
        </section>
      </main>
    </>
  );
};

export default SearchCommunityPage;
