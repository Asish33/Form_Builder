"use client";
import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Form } from "@/components/ui/Form";



export default function Dashboard() {
  const [forms , setForms ] = useState([]);
  const session = useSession();

  async function getForms() {
    const id = session.data?.user.id;
    if (!id) return; 

    try {
      const response = await fetch(`/api/getForms/${id}`);
      const data = await response.json(); 
      console.log(data)
      setForms(data.forms); 
    } catch (error) {
      console.error("Error fetching forms:", error); 
    }
  }
  const router = useRouter();
  const status = session.status
  const list = forms;
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
      <button
        onClick={() => {
          signOut({
            callbackUrl: "/login",
          });
        }}
      >
        signout
      </button>
      <div>
        <button
          onClick={() => {
            getForms();
          }}
        >
          get forms
        </button>
      </div>
      {forms ? (
        <div>
          You have{" "}
          {list.map((item, index) => (
            <a href={`/editForm/${item.id}`} key={index}>Hi there</a>
          ))}{" "}
          forms
        </div>
      ) : (
        "You don't have any forms"
      )}
    </div>
  );
}
