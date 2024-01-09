import Image from "next/image";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { buttonVariants } from "./ui/button";
import SearchBar from "./SearchBar";
import {
  GearIcon,
  PersonIcon,
  ExitIcon,
  ListBulletIcon,
} from "@radix-ui/react-icons";
import { ThemeToggle } from "./ThemeToggle";
import { auth } from "@/lib/auth";

export default async function Navbar() {
  const session = await auth();
  const name = session?.user?.name?.split(" ")[0];

  return (
    <nav className="sticky top-0 z-20 w-full bg-background">
      <div className="mx-auto flex max-w-5xl items-center gap-2 px-8 py-2">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/logo.png"
            alt="logo"
            width={100}
            height={100}
            className="h-4 w-4"
          />
          <span className="mr-4 hidden sm:inline">Trackio</span>
        </Link>

        <SearchBar />

        {session ? (
          <>
            <DropdownMenu>
              <DropdownMenuTrigger
                className={buttonVariants({ variant: "ghost" })}
              >
                <Image
                  priority
                  src={session.user?.image || ""}
                  alt="Profile image"
                  width={24}
                  height={24}
                  className="rounded-full sm:mr-2"
                />
                <span className="hidden text-sm sm:inline">{name}</span>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem asChild>
                  <Link href={`/user/${session.user.id}`}>
                    <PersonIcon className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href={`/user/${session.user.id}/lists`}>
                    <ListBulletIcon className="mr-2 h-4 w-4" />
                    Lists
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/settings">
                    <GearIcon className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>

                <DropdownMenuItem asChild>
                  <Link href="/api/auth/signout">
                    <ExitIcon className="mr-2 h-4 w-4" />
                    Sign Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <Link className={buttonVariants()} href="/api/auth/signin">
            Sign In
          </Link>
        )}
        <ThemeToggle />
      </div>
    </nav>
  );
}
