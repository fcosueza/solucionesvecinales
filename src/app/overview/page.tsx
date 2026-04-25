import Header from "@/components/layouts/Header";
import Footer from "@/components/layouts/Footer";
import Gallery from "@/components/layouts/Gallery";
import Card from "@/components/ui/Card";
import OverviewActions from "@/components/layouts/OverviewActions";
import verifySession from "@/lib/dal";
import prisma from "@/lib/prisma";
import { NavItem, UserRole } from "@/types";
import Link from "next/link";
import { redirect } from "next/navigation";
import style from "./style.module.css";

const enlacesCabecera: NavItem[] = [{ text: "Cerrar sesión", href: "/logout" }];

const tituloComunidades = "Mis comunidades";
const mensajeSinComunidades =
  "Aún no estás suscrito a ninguna comunidad. Usa el botón de búsqueda para unirte a una.";

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

  const comunidadesSuscritas = [usuario.adminComm, ...usuario.inquilinoComm].filter(
    comunidad => comunidad !== null
  );
  const comunidadesUnicas = Array.from(new Map(comunidadesSuscritas.map(c => [c.id, c])).values());

  return (
    <>
      <Header links={enlacesCabecera} />

      <main className={style.main}>
        <section>
          <Gallery title={tituloComunidades} className={style.overviewGallery}>
            {comunidadesUnicas.length > 0 ? (
              comunidadesUnicas.map(comunidad => {
                return (
                  <Link
                    href={`/overview/comunidades/${comunidad.id}`}
                    key={comunidad.id}
                    className={style.cardLink}
                    aria-label={`Ir al detalle de la comunidad ${comunidad.nombre}`}
                  >
                    <Card
                      imageURL="/assets/images/devices.svg"
                      imageAltText={`Imagen de la comunidad ${comunidad.nombre}`}
                      imageWidth={120}
                      imageHeight={120}
                      cardTitle={comunidad.nombre}
                      cardPara={`Dirección: ${comunidad.calle}, ${comunidad.numero}. ${comunidad.ciudad}.
                  
                          Rol: ${usuario.adminComm?.id === comunidad.id ? "Administrador" : "Inquilino"}`}
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

      <Footer />
    </>
  );
};

export default Overview;