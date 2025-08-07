"use client";
import { TypewriterEffect } from "@/components/ui/typewriter-effect";
import React from "react";
import { FloatingDock } from "@/components/ui/floating-dock";
import {
  IconBrandGithub,
  IconBrandX,
  IconHome,
  IconNewSection,
  IconTerminal2,
} from "@tabler/icons-react";
import { Moon } from "lucide-react";
import { ModeToggle } from "./modeToggle";

export function FrontPage() {
  const links = [
    {
      title: "Home",
      icon: (
        <IconHome className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Products",
      icon: (
        <IconTerminal2 className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "Twitter",
      icon: (
        <IconBrandX className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "#",
    },
    {
      title: "GitHub",
      icon: (
        <IconBrandGithub className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/Zeshanxviii/calendify",
    },
    {
      title: "Theme",
      icon: (
        <Moon className="h-full w-full text-neutral-500 dark:text-neutral-300" />
      ),
      href: "https://github.com/Zeshanxviii/calendify",
    },
  ];

  const words = [
    {
      text: "Think",
    },
    {
      text: "Plan",
    },
    {
      text: "and",
    },
    {
      text: "Track",
    },
    {
      text: "All",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "one",
      className: "text-blue-500 dark:text-blue-500",
    },
    {
      text: "Place",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <div className="relative flex flex-col items-center h-[40rem]">
        <div className="absolute top-15 right-15 z-20">
          <ModeToggle />
        </div>
      {/* FloatingDock positioned absolutely at the top */}
      <div className="absolute bottom-15 w-full flex justify-center z-10">
        <FloatingDock
          desktopClassName=""
          mobileClassName="translate-y-20"
          items={links}
        />
      </div>

      {/* Centered content */}
      <div className="flex flex-col items-center justify-center h-full w-full">
        <div className="flex flex-col items-center text-center">
          <p className="text-neutral-600 dark:text-neutral-200 text-base mb-10">
            Efficiently manage your tasks and boost your productivity
          </p>
          <TypewriterEffect words={words} />
          <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4 mt-10">
            <button className="w-40 h-10 rounded-xl bg-black border dark:border-white border-transparent text-white text-sm">
              Get started
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}