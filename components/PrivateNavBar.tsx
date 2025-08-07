"use client"
import { PrivateNavLinks } from "@/constants";
import { cn } from "@/lib/utils";
import { SignedIn, UserButton } from "@clerk/nextjs";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ModeToggle } from "./modeToggle";
import { NavigationMenu, NavigationMenuItem, NavigationMenuLink, NavigationMenuList } from "./ui/navigation-menu";

export default function PrivateNavBar(){
    const pathname = usePathname()
    return (
        <nav className="flex justify-between items-center fixed z-50 w-full h-20 dark:bg-slate-900 bg-gray-200 px-10 gap-4 shadow-2xl mb-28">
            <Link  href={"/events"} className="flex items-center gap-1 hover:scale-110 hover:rotate-45 duration-500">
                <Image 
                src={"/logo.png"}
                alt="Calendify Logo"
                width={40}
                height={40}
                />
            </Link>
            <NavigationMenu>
            <NavigationMenuList>
                {PrivateNavLinks.map((item) => {
                const isActive =
                    pathname === item.route || pathname.startsWith(`${item.route}/`);
                return (
                    <NavigationMenuItem key={item.label} className="py-5">
                    <NavigationMenuLink asChild>
                        <Link href={item.route} className={cn("",
                        isActive && "bg-blue-300 rounded-3xl"
                        )}>
                        {item.title}
                        </Link>
                    </NavigationMenuLink>
                    </NavigationMenuItem>
                );
                })}
            </NavigationMenuList>
            </NavigationMenu>

            <div className="absolute right-30">
                <ModeToggle />
            </div>
            <div className="hover:scale-110 size-5 duration-500">
                    <SignedIn>
                        <UserButton />
                    </SignedIn>
            </div>
        </nav>
    )
}