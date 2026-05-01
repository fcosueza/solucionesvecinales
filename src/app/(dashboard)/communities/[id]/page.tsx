import { redirect } from "next/navigation";

interface Props {
  params: Promise<{ id: string }>;
}

const CommunityPage = async ({ params }: Props): Promise<never> => {
  const { id } = await params;
  redirect(`/communities/${id}/overview`);
};

export default CommunityPage;
