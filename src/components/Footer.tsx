import Image from "next/image";
import { ThemeToggle } from "./ThemeToggle";

export default function Footer() {
  return (
    <footer className="sticky z-20 mt-auto w-full border-t bg-background text-xs">
      <div className="mx-auto flex max-w-7xl flex-col justify-center gap-2 px-8 py-8 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex flex-col gap-2 text-muted-foreground">
          <div>
            Copyright © {new Date().getFullYear()} Alkım Caner Soydan. All
            rights reserved.
          </div>
          <div className="flex gap-1">
            <Image src={"/tmdb_logo.svg"} alt="" width={64} height={32} />
            This product uses the TMDB API but is not endorsed or certified by
            TMDB.
          </div>
        </div>

        <ThemeToggle />
      </div>
    </footer>
  );
}
