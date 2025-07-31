import z from "zod";

export const EventFormSchema = z.object({
    name: z.string().min(1,"Required"),
    description: z.string().optional(),
    isActive: z.boolean(),
    durationInMinutes: z.coerce.number().int().positive("Duration must be greater than 0").max(60*12,`Duration must be less than 12hours (${60*12} minutes)`)
})