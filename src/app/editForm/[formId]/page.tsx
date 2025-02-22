export function EditForm({ params }: { params: { formId: string } }) {
  const id = params.formId;
  console.log(id);
  return<div>
    form is {id}
  </div>
}
