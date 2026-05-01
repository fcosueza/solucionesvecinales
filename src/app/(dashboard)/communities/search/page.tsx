import CommunitySearchForm from "@/components/layouts/Forms/CommunitySearchForm";
import Gallery from "@/components/layouts/Gallery";
import CardCommunity from "@/components/ui/CardCommunity";
import requestCommunitySubscription from "@/actions/requestCommunitySubscription";
import ScrollToTopOnMount from "@/components/ui/ScrollToTopOnMount";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
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

const SearchCommunityPage = async ({ searchParams }: SearchPageProps): Promise<React.ReactNode> => {
  const verifiedSession = await verifySession();

  if (!verifiedSession.isAuth || !verifiedSession.session) {
    redirect("/login");
  }

  // Realizamos una consulta para obtener todas las comunidades disponibles, ordenadas alfabéticamente por nombre
  const communities = await prisma.comunidad.findMany({
    select: {
      id: true,
      nombre: true,
      calle: true,
      numero: true,
      ciudad: true,
      provincia: true,
      pais: true
    },
    orderBy: {
      nombre: "asc"
    }
  });

  // Comprobamos qué comunidades tiene el usuario para marcar las que ya tiene inscritas en el formulario de búsqueda
  const userWithCommunities = await prisma.usuario.findUnique({
    where: {
      id: verifiedSession.session.userID
    },
    select: {
      inscripciones: {
        select: {
          comunidad: true
        }
      },
      solicitudes: {
        where: {
          estado: "pendiente"
        },
        select: {
          comunidad: true
        }
      }
    }
  });

  // Combinamos las comunidades administradas y las comunidades en las que el usuario es inquilino
  const enrolledCommunityIDs = new Set<number>(aLista(userWithCommunities?.inscripciones).map(i => i.comunidad));
  const pendingRequestCommunityIDs = new Set<number>(
    aLista(userWithCommunities?.solicitudes).map(request => request.comunidad)
  );

  const resolvedSearchParams = await searchParams;
  const searchTerm = (resolvedSearchParams.q ?? "").trim().toLowerCase();

  const filteredCommunities =
    searchTerm === ""
      ? communities
      : communities.filter(community => {
          const searchableFields = [
            community.nombre,
            community.calle,
            String(community.numero),
            community.ciudad,
            community.provincia,
            community.pais
          ];

          return searchableFields.some(field => field.toLowerCase().includes(searchTerm));
        });

  return (
    <>
      <ScrollToTopOnMount />
      <main className={style.main}>
        <h1 className={style.title}>Buscar comunidad</h1>
        <p className={style.description}>Busca comunidades para inscribirte en ellas</p>

        <section className={style.searchSection}>
          <CommunitySearchForm defaultValue={resolvedSearchParams.q ?? ""} />

          {filteredCommunities.length > 0 ? (
            <Gallery>
              {filteredCommunities.map(community => {
                const isAlreadyEnrolled = enrolledCommunityIDs.has(community.id);
                const hasPendingRequest = pendingRequestCommunityIDs.has(community.id);
                const shouldDisableCTA = isAlreadyEnrolled || hasPendingRequest;
                const ctaText = isAlreadyEnrolled
                  ? "Ya inscrito"
                  : hasPendingRequest
                    ? "Solicitud pendiente"
                    : "Suscribirse";
                const subscriptionFormID = `subscription-request-community-${community.id}`;

                return (
                  <div key={community.id}>
                    <CardCommunity
                      className={style.cardCommunity}
                      imageURL="/assets/images/default-community.jpeg"
                      imageAltText={`Imagen de la comunidad ${community.nombre}`}
                      communityName={community.nombre}
                      communityAddress={`${community.calle}, ${community.numero}. ${community.ciudad}`}
                      ctaText={ctaText}
                      ctaAsButton
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
