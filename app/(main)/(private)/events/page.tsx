import EventCard from "@/components/card/EventCard";
import { Button } from "@/components/ui/button" 
import { getEvents } from "@/server/actions/event";
import { RedirectToSignIn  } from "@clerk/nextjs";
import { auth } from "@clerk/nextjs/server";
import { CalendarPlus ,CalendarRange } from 'lucide-react';
import Link from "next/link"


export default async function EventPage(){
    const { userId } = await auth()
    if(!userId)
        return <RedirectToSignIn />

    const event = await getEvents(userId)

    return(
    <section className="flex flex-col items-center gap-16 animate-fade-in">
        <div className="flex gap-4 items-baseline ">
            <h1 className="text-3xl xl:text-4xl mb-2">
                Events
            </h1>
            <Button asChild
            variant={"outline"}
            className="">
                <Link
                href={"/events/new"}
                className="">
                    <CalendarPlus className="mr-1 size-max" />
                    Create Event
                </Link>
            </Button>
        </div>
        <div>
            {event.length > 0 ? (
                <div className="grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-4 p-10">
                    {event.map(event => (
                        <EventCard key={event.id} {...event}/>
                    ))}
                </div>
            ):(
                <div className="flex flex-col items-center gap-4">
                <CalendarRange className="size-16 mx-auto text-black" />
                You do not have any events yet. Create your first event to get
                started!
                <Button 
                className="bg-blue-500 p-4 dark:text-white dark:hover:bg-blue-400 "
                  asChild>
                  <Link href="/events/new">
                    <CalendarPlus className="mr-1 size-7" /> New Event
                  </Link>
                </Button>
              </div>
            )}
        </div>
    </section>)
}