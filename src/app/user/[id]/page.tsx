import { redirect } from "next/navigation";

export default function User({ params }: { params: { id: string } }) {
  redirect(`/user/${params.id}/lists`);
}
