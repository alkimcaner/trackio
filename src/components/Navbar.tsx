"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import ProfileDropDown from "./ProfileDropdown";
import { useState } from "react";
import { Button } from "./ui/button";
import { ArrowLeftIcon, MagnifyingGlassIcon } from "@radix-ui/react-icons";
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
} from "./ui/navigation-menu";

export default function Navbar() {
  const [isMobileSearchActive, setIsMobileSearchActive] = useState(false);

  if (isMobileSearchActive) {
    return (
      <nav className="sticky top-0 z-20 w-full border-b bg-background">
        <div className="mx-auto flex h-16 max-w-7xl items-center gap-2 px-4 py-2">
          <Button
            variant="ghost"
            size="icon"
            onClick={() => setIsMobileSearchActive(false)}
            className="w-12"
          >
            <ArrowLeftIcon />
          </Button>

          <SearchBar isMobileSearchActive={isMobileSearchActive} />
        </div>
      </nav>
    );
  }

  return (
    <nav className="sticky top-0 z-20 w-full border-b bg-background">
      <div className="mx-auto flex h-16 max-w-7xl items-center gap-4 px-4 py-2">
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

        <NavigationMenu className="hidden sm:flex" viewport={false}>
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuTrigger>Movies</NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col">
                <NavigationMenuLink asChild>
                  <Link href="/movie/new">New</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/movie/popular">Popular</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/movie/top">Top Rated</Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>TV Shows</NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col">
                <NavigationMenuLink asChild>
                  <Link href="/tv/new">New</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/tv/popular">Popular</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/tv/top">Top Rated</Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Games</NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col">
                <NavigationMenuLink asChild>
                  <Link href="/game/new">New</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/game/popular">Popular</Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link href="/game/top">Top Rated</Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger>Lists</NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col">
                <NavigationMenuLink asChild>
                  <Link href="/list/popular">Popular</Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <Button
          variant="ghost"
          size="icon"
          className="ml-auto inline-flex lg:hidden"
          onClick={() => setIsMobileSearchActive(true)}
        >
          <MagnifyingGlassIcon />
        </Button>

        <SearchBar isMobileSearchActive={isMobileSearchActive} />

        <ProfileDropDown />
      </div>
    </nav>
  );
}
