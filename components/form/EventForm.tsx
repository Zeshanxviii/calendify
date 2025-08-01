"use client"

import { EventFormSchema } from "@/schema/event"
import { useForm } from "react-hook-form"
import z from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "../ui/form"
import { Input } from "../ui/input"
import { Textarea } from "../ui/textarea"
import { Switch } from "../ui/switch"
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from "../ui/alert-dialog"
import { Button } from "../ui/button"
import { AlertDialogDescription } from "@radix-ui/react-alert-dialog"
import Link from "next/link"
import { useTransition } from "react"
import { createEvent, deleteEvent, updateEvent } from "@/server/actions/event"
import { useRouter } from "next/navigation"

//this component will handle creating updating and deleting event
export default function EventForm({ event }: {
    event?: {
        id: string
        name: string
        description?: string
        isActive: boolean

    }
}) {
    const router = useRouter();
    const [isDeletePending, startDeleteTransition] = useTransition()
    const A = z.coerce.number();
    type EventFormSchema = z.infer<typeof A>;
    const form = useForm<z.infer<typeof EventFormSchema>>({
        resolver: zodResolver(EventFormSchema),
        defaultValues: event ? {
            ...event,
        } : {
            isActive: true,
            durationInMinutes: 30,
            description: '',
            name: ''
        },
    });

    //onsubmit function
    async function onSubmit(values: z.infer<typeof EventFormSchema>) {
        const action = event == null ? createEvent : updateEvent.bind(null, event.id)
        try {
            await action(values)
            router.push("/events");
        } catch (error:any) {
            form.setError("root",{
                message: `There was an error saving your event${error.message}`,
            })
        }
    }

    return (
    <Form {...form}>
        <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col gap-6">
            {form.formState.errors.root && (
                <div className="text-destructive text-sm">
                    {form.formState.errors.root.message}
                </div>
            )}
            {/* Name */}
            <FormField
                control={form.control}
                name="name"
                render={
                    ({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Event Name
                            </FormLabel>
                            <FormControl>
                                <Input  {...field} />
                            </FormControl>
                            <FormDescription>
                                The name users will see when booking
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )
                }>

            </FormField>
            {/* Duration In Minutes */}
            <FormField
                control={form.control}
                name="durationInMinutes"
                render={
                    ({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Duration
                            </FormLabel>
                            <FormControl>
                                <Textarea className="resize-none h-32" {...field} />
                            </FormControl>
                            <FormDescription>
                                In Minutes
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )
                }>

            </FormField>
            {/* Description Field */}
            <FormField
                control={form.control}
                name="description"
                render={
                    ({ field }) => (
                        <FormItem>
                            <FormLabel>
                                Description
                            </FormLabel>
                            <FormControl>
                                <Textarea className="resize-none h-32" {...field} />
                            </FormControl>
                            <FormDescription>
                                Optional Description for the event
                            </FormDescription>
                            <FormMessage />
                        </FormItem>
                    )
                }>

            </FormField>
            {/* IsActive Field */}
            <FormField
                control={form.control}
                name="isActive"
                render={
                    ({ field }) => (
                        <FormItem>
                            <div className="flex items-center gap-2">
                                <FormControl>
                                    <Switch
                                        checked={field.value}
                                        onChange={field.onChange} />
                                </FormControl>
                                <FormLabel>
                                    Active
                                </FormLabel>
                            </div>
                            <FormDescription>
                                Inactive Event will not be visible for user to book
                            </FormDescription>
                        </FormItem>
                    )
                }>

            </FormField>
            {/* Button Section: delete cancel save */}
            <div className="flex gap-2 justify-end">
                {event && (
                    <AlertDialog>
                        <AlertDialogTrigger asChild>
                            <Button
                                className=""
                                variant="destructive"
                                disabled={isDeletePending || form.formState.isSubmitting}>

                            </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                            <AlertDialogHeader>
                                <AlertDialogTitle>Are you sure ?</AlertDialogTitle>
                                <AlertDialogDescription>This action cannot not be undone. This will permanently delete this event</AlertDialogDescription>
                            </AlertDialogHeader>
                            <AlertDialogFooter>
                                <AlertDialogCancel>Cancel</AlertDialogCancel>
                                <AlertDialogAction
                                    className="bg-red-500 hover:bg-red-700 cursor pointer"
                                    disabled={isDeletePending || form.formState.isSubmitting}
                                    onClick={() => {
                                        startDeleteTransition(async () => {
                                            try {
                                                await deleteEvent(event.id)
                                            } catch (error: any) {
                                                form.setError("root", {
                                                    message: `There was an error deleting your event:${error.message
                                                        }`
                                                })
                                            }
                                        })
                                    }}
                                >
                                    Delete
                                </AlertDialogAction>
                            </AlertDialogFooter>
                        </AlertDialogContent>
                    </AlertDialog>
                )}

                <Button
                    disabled={isDeletePending || form.formState.isSubmitting}
                    type="button"
                    asChild
                    variant={"outline"}>
                    <Link href={"/events"}>Cancel</Link>
                </Button>
                <Button
                    className="cursor-pointer hover:scale-150 bg-blue-400 hover:bg-blue-700"
                    disabled={isDeletePending || form.formState.isSubmitting}
                    type="submit">
                    Save
                </Button>
            </div>
        </form>
    </Form>
    )
}