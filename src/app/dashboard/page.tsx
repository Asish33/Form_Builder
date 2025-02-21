"use client";

import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Dashboard() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading") return <div>Loading...</div>;

  return (
    <div>
      {session ? (
        <div>
          <div>{JSON.stringify(session, null, 2)}</div>
          <button onClick={()=>{
            signOut();
          }}>logout</button>
        </div>
      ) : (
        <div>You are not signed in</div>
      )}
    </div>
  );
}
