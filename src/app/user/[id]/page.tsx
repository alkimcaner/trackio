import { redirect } from "next/navigation";

export default async function User(props: { params: Promise<{ id: string }> }) {
  const params = await props.params;
  redirect(`/user/${params.id}/lists`);
}
