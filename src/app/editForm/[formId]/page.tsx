import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export default async function EditForm({
  params,
}: {
  params: { formId: string };
}) {
  const {formId} = await params;
  const id = Number(formId);

  const result = await prisma.form.findUnique({
    where: {
      id: id,
    },
  });
  const ans = JSON.parse(result?.content as string);
  console.log(ans)
  console.log(ans.formTitle);
  console.log(ans.formSubHeading);
  console.log(ans.formFields);
  return <div>form is </div>;
}
