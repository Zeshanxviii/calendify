"use server"

import { db } from "@/drizzle/db";
import { EventTable } from "@/drizzle/schema";
import { EventFormSchema } from "@/schema/event";
import { auth } from "@clerk/nextjs/server"; 
import { eq, and } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";

export async function createEvent(
    unsafeData: z.infer<typeof EventFormSchema>
): Promise<void> {
    try {
        const { userId } = await auth();
        const { success ,data } = EventFormSchema.safeParse(unsafeData)
        if( !success || !userId){
            throw new Error("Invalid event data or user not authenticated")
        }

        await db.insert(EventTable).values({
            ...data,
            descriptionInMinutes: data.durationInMinutes,
            clerkUserId: userId
        })
        revalidatePath('/events')
    } catch (error:any) {
        console.log(error.message)
        throw new Error(`Failed to create event: ${error.message || error}`)
    } 
}

export async function updateEvent(
    id: string,
    unsafeData: z.infer<typeof EventFormSchema>
): Promise<void> {
    try {
        const { userId } = await auth();
        const { success ,data } = EventFormSchema.safeParse(unsafeData)
        if( !success || !userId){
            throw new Error("Invalid event data or user not authenticated")
        }

    const { rowCount} = await db
    .update(EventTable)
    .set({...data})
    .where(and(eq(EventTable.id, id),eq(EventTable.clerkUserId,userId)))

    if( rowCount === 0 )
    {
        throw new Error("Event not found or User not autherized to update this event.")
    }
        
    } catch (error:any) {
        throw new Error(`Failed to update event: ${error.message || error}`)
    } finally {
        revalidatePath('/events')
    }

}

export async function deleteEvent(
    id: string,
): Promise<void> {
    try {
        const { userId } = await auth();
        if(!userId){
            throw new Error("Invalid event data or user not authenticated")
        }

    const { rowCount} = await db
    .delete(EventTable)
    .where(and(eq(EventTable.id, id),eq(EventTable.clerkUserId,userId)))

    if( rowCount === 0 )
    {
        throw new Error("Event not found or User not autherized to update this event.")
    }
        
    } catch (error:any) {
        throw new Error(`Failed to delete event: ${error.message || error}`)
    } finally {
        revalidatePath('/events')
    }

}
