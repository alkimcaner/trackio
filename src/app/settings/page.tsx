import { redirect } from "next/navigation";
import { auth } from "@/lib/auth";

export default async function Settings() {
  const session = await auth();

  if (!session) {
    redirect("/");
  }

  return <div>Settings page</div>;
}
