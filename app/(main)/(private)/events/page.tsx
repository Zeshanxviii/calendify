import { Button } from "@/components/ui/button" 
import { CalendarPlus } from 'lucide-react';
import Link from "next/link"

export default function EventPage(){
    return(
    <section className="flex flex-col items-center gap-16 animate-fade-in">
        <div className="flex gap-4 items-baseline ">
            <h1 className="text-4xl xl:text-5xl font-black mb-6 ">
                Events
            </h1>
            <Button className="bg-blue-500 hover:bg-blue-400 text-white py-6 hover:scale-110 duration-500 border-b-4 border-blue-700 hover:border-blue-400 rounded-2xl shadow-accent-foreground text-2xl font-black" asChild>
                <Link
                href={"/events/new"}
                className="">
                    <CalendarPlus className="mr-1 size-max" />
                    Create Event
                </Link>
            </Button>
        </div>
    </section>)
}