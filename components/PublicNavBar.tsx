import { SignInButton, SignOutButton } from "@clerk/nextjs"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

export default function PublicNavBar()
{
    return (
        <nav className="flex justify-between items-center fixed z-50 w-full h-28 bg-gray-300 px-10 gap-4 shadow-2xl">
            <Link href={"/login"} className="flex items-center gap-1 hover:scale-150 duration-500">
            <Image src={"/logo.svg"} alt="calendify logo" width={60} height={60}/>
            </Link>
            <section>
                <SignInButton>
                    <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 cursor-pointer hover:scale-150 duration-500 rounded-2xl shadow-2xl">
                        Login
                    </Button>
                </SignInButton>
                <SignOutButton>
                    <Button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 border border-blue-700 cursor-pointer hover:scale-150 duration-500 rounded-2xl shadow-2xl">
                        Register
                    </Button>
                </SignOutButton>
            </section>
        </nav>
    )
}