"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Form } from "@/components/ui/Form";

export default function Dashboard() {
  const session = useSession();
  const router = useRouter();
  const status = session.status
  useEffect(() => {
    if (status === "unauthenticated") {
      router.push("/login");
    }
  }, [status, router]);

  if (status === "loading")
    return <div className="text-center mt-10">Loading...</div>;

  return (
    <div className="p-4 space-y-4">
      <pre className="bg-gray-100 p-4 rounded-md overflow-auto">
        {JSON.stringify(session, null, 2)}
      </pre>
      <Form></Form>
      <button onClick={()=>{
        signOut({
          callbackUrl: "/login", 
        });
      }}>signout</button>
    </div>
  );
}
