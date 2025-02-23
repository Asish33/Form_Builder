"use client"

import { Formui } from "@/components/ui/formui";
import { useState, useEffect } from "react";

export default function EditForm({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const [form, setForm] = useState<any>(null);

  useEffect(() => {
    async function fetchForm() {
      const { formId } = await params; 
      const response = await fetch(`/api/forms/${formId}`);
      const data = await response.json();
      console.log(data);
      setForm(data);
    }

    fetchForm();
  }, [params]);

  if (!form) return <div>Loading...</div>;
return (
  <div className="flex h-screen p-4 gap-3">
    <div className="bg-pink-200 rounded-md w-[30%] border-2 border-black flex justify-center items-center">
      Control
    </div>

    <div className="w-[70%] border-2 border-black rounded-md  flex justify-center items-center">
      <Formui json={form} />
    </div>
  </div>
);


}
