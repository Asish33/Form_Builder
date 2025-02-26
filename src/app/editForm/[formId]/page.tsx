"use client"

import { Formui } from "@/components/ui/formui";

import { useState, useEffect } from "react";


export default function EditForm({
  params,
}: {
  params: Promise<{ formId: string }>;
}) {
  const [form, setForm] = useState<any>(null);
  const [updateTrigger , setUpdateTrigger]= useState<any>();
  const [record,setRecord] = useState<number|undefined>(undefined)
  useEffect(() => {
    async function fetchForm() {
      const { formId } = await params; 
      const response = await fetch(`/api/forms/${formId}`);
      const data = await response.json();
      setRecord(data.id)
      setForm(data.content);
    }

    fetchForm();
  }, [params]);

  useEffect(()=>{
    if(updateTrigger){
      setForm(form);
      updateDb();
    }
  },[updateTrigger])
  const update=(value,index)=>{
    form.fields[index].label=value.label;
    form.fields[index].placeholder=value.placeholder;
    setUpdateTrigger(Date.now())
  }
 const updateDb = async () => {
   await fetch("/api/forms/update", {
     method: "PUT",
     headers: { "Content-Type": "application/json" },
     body: JSON.stringify({
       id: record,
       fields: form.fields,
     }),
   });
 };

  if (!form) return <div>Loading...</div>;
return (
  <div className="flex h-screen p-4 gap-3">
    <div className="bg-pink-200 rounded-md w-[30%] border-2 border-black flex justify-center items-center">
      Control
    </div>

    <div className="w-[70%] border-2 border-black rounded-md bg-rice  flex justify-center items-center">
      <Formui json={form} update={update}/>
    </div>
  </div>
);


}
