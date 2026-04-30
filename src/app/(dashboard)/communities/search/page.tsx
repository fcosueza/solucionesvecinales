import CommunitySearchForm from "@/components/layouts/Forms/CommunitySearchForm";
import Gallery from "@/components/layouts/Gallery";
import CardCommunity from "@/components/ui/CardCommunity";
import ScrollToTopOnMount from "@/components/ui/ScrollToTopOnMount";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { redirect } from "next/navigation";
import style from "./style.module.css";

interface SearchPageProps {
  searchParams: Promise<{ q?: string }>;
}

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
      adminComm: {
        select: {
          id: true
        }
      },
      inquilinoComm: {
        select: {
          id: true
        }
      }
    }
  });

  // Combinamos las comunidades administradas y las comunidades en las que el usuario es inquilino
  const enrolledCommunityIDs = new Set<number>([
    ...(userWithCommunities?.adminComm ? [userWithCommunities.adminComm.id] : []),
    ...(userWithCommunities?.inquilinoComm.map(community => community.id) ?? [])
  ]);

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

                return (
                  <CardCommunity
                    key={community.id}
                    className={style.cardCommunity}
                    imageURL="/assets/images/default-community.jpeg"
                    imageAltText={`Imagen de la comunidad ${community.nombre}`}
                    communityName={community.nombre}
                    communityAddress={`${community.calle}, ${community.numero}. ${community.ciudad}`}
                    ctaText={isAlreadyEnrolled ? "Ya inscrito" : "Inscribirme"}
                    ctaAsButton
                    ctaDisabled={isAlreadyEnrolled}
                  />
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
