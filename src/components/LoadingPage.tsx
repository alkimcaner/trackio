import { Loader2 } from "lucide-react";

export default function LoadingPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-col items-center gap-8 p-8">
      <Loader2 className="mt-32 h-8 w-8 animate-spin" />
    </main>
  );
}
