import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * Página índice de una comunidad específica.
 * Redirige automáticamente a la página de overview de la comunidad.
 *
 * @component
 * @param params Parámetros de la ruta que incluyen el ID de la comunidad
 * @returns No devuelve contenido, solo redirige
 */
const CommunityPage = async ({ params }: Props): Promise<never> => {
  const { id } = await params;
  redirect(`/communities/${id}/overview`);
};

export default CommunityPage;
