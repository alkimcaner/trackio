import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import { ThemeToggle } from "./ThemeToggle";
import AuthNav from "./AuthNav";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-20 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-8 py-2">
        <Link href="/" className="flex min-w-fit items-center gap-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={48}
            height={48}
            className="h-6 w-6"
          />
          <span className="mr-4 hidden sm:inline">Trackio</span>
        </Link>

        <SearchBar />
        <AuthNav />
        <ThemeToggle />
      </div>
    </nav>
  );
}
