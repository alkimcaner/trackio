"use client";

import Image from "next/image";
import Link from "next/link";
import SearchBar from "./SearchBar";
import ProfileDropDown from "./ProfileDropdown";
import { useState } from "react";
import { Button } from "./ui/button";
import {
  ArrowLeftIcon,
  MagnifyingGlassIcon,
  CameraIcon,
  VideoIcon,
  RocketIcon,
  ListBulletIcon,
  ClockIcon,
  BarChartIcon,
  StarFilledIcon,
} from "@radix-ui/react-icons";
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
      <nav className="bg-background sticky top-0 z-20 w-full border-b">
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
    <nav className="bg-background sticky top-0 z-20 w-full border-b">
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
              <NavigationMenuTrigger className="flex items-center gap-2">
                <CameraIcon className="h-4 w-4" />
                Movies
              </NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col">
                <NavigationMenuLink asChild>
                  <Link
                    href="/movie/new"
                    className="flex flex-row items-center gap-2 px-4 py-2"
                  >
                    <ClockIcon className="h-4 w-4" />
                    New
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    href="/movie/popular"
                    className="flex flex-row items-center gap-2 px-4 py-2"
                  >
                    <BarChartIcon className="h-4 w-4" />
                    Popular
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    href="/movie/top"
                    className="flex flex-row items-center gap-2 px-4 py-2 whitespace-nowrap"
                  >
                    <StarFilledIcon className="h-4 w-4" />
                    Top Rated
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2">
                <VideoIcon className="h-4 w-4" />
                TV Shows
              </NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col">
                <NavigationMenuLink asChild>
                  <Link
                    href="/tv/new"
                    className="flex flex-row items-center gap-2 px-4 py-2"
                  >
                    <ClockIcon className="h-4 w-4" />
                    New
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    href="/tv/popular"
                    className="flex flex-row items-center gap-2 px-4 py-2"
                  >
                    <BarChartIcon className="h-4 w-4" />
                    Popular
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    href="/tv/top"
                    className="flex flex-row items-center gap-2 px-4 py-2 whitespace-nowrap"
                  >
                    <StarFilledIcon className="h-4 w-4" />
                    Top Rated
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2">
                <RocketIcon className="h-4 w-4" />
                Games
              </NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col">
                <NavigationMenuLink asChild>
                  <Link
                    href="/game/new"
                    className="flex flex-row items-center gap-2 px-4 py-2"
                  >
                    <ClockIcon className="h-4 w-4" />
                    New
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    href="/game/popular"
                    className="flex flex-row items-center gap-2 px-4 py-2"
                  >
                    <BarChartIcon className="h-4 w-4" />
                    Popular
                  </Link>
                </NavigationMenuLink>
                <NavigationMenuLink asChild>
                  <Link
                    href="/game/top"
                    className="flex flex-row items-center gap-2 px-4 py-2 whitespace-nowrap"
                  >
                    <StarFilledIcon className="h-4 w-4" />
                    Top Rated
                  </Link>
                </NavigationMenuLink>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuTrigger className="flex items-center gap-2">
                <ListBulletIcon className="h-4 w-4" />
                Lists
              </NavigationMenuTrigger>
              <NavigationMenuContent className="flex flex-col">
                <NavigationMenuLink asChild>
                  <Link
                    href="/list/popular"
                    className="flex flex-row items-center gap-2 px-4 py-2"
                  >
                    <BarChartIcon className="h-4 w-4" />
                    Popular
                  </Link>
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
