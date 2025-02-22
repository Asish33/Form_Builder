import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
export default async function EditForm({ params }: { params: { formId: string } }) {
  const id = Number(params.formId);

  if (isNaN(id)) {
    console.log(params.formId)
    return <div>Invalid form ID</div>;
  }

  const response = await prisma.form.findUnique({
    where: {
      id: id,
    },
  });

  if (!response) {
    return <div>Form not found</div>;
  }

  return <div>{JSON.stringify(response, null, 2)}</div>;
}
