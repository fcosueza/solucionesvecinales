import "server-only";

import { cookies } from "next/headers";

async function deleteSession(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.delete("session");
}

export default deleteSession;
