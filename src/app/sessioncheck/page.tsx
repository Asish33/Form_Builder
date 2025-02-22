import { authOptions } from "@/lib/authoptions";
import { getServerSession } from "next-auth";

export default async function Check() {
  const session = await getServerSession(authOptions);

  return (
    <div>
      <h1>Hi there</h1>
      <pre>{JSON.stringify(session, null, 2)}</pre> {/* Display session info */}
    </div>
  );
}
