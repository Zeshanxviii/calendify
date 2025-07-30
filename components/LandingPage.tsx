'use client'
import { SignIn } from "@clerk/nextjs"
import { neobrutalism } from "@clerk/themes"
import Image from "next/image"

export default function LandingPage() {
    return(
        <main>
            <section className="flex flex-col text-center">
                <Image 
                src="/logo.svg"
                alt="Event"/>
                <h1 className="text-center">Your time, Perfectly Planned</h1>
                <p>Join millions of professionals who easily book meeting with the #1 scheduling tool</p>
                <Image 
                src={"/planing.svg"}
                alt="planing svg"/>
            </section>
            <div>
                <SignIn 
                routing="hash"
                appearance={{
                    baseTheme: neobrutalism as any,
                }}/>
            </div>
        </main>
    )
}