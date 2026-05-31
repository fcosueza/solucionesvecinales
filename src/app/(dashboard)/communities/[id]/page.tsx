import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

/**
 * Index page for a specific community.
 * Automatically redirects to the community overview page.
 *
 * @component
 * @param params Route parameters including community ID
 * @returns No returns content, only redirects
 */
const CommunityPage = async ({ params }: Props): Promise<never> => {
  const { id } = await params;
  redirect(`/communities/${id}/overview`);
};

export default CommunityPage;
