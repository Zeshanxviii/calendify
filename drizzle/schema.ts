import { DAYS_OF_WEEK_IN_ORDER } from "@/constants";
import { relations } from "drizzle-orm";
import { pgTable, uuid, text, integer, boolean, timestamp, index, pgEnum } from "drizzle-orm/pg-core";

// Event Table
export const EventTable = pgTable("events", {
  id: uuid("id").primaryKey().defaultRandom(),
  name: text("name").notNull(),
  description: text("description"),
  descriptionInMinutes: integer("durationInMinutes").notNull(),
  clerkUserId: text("clerkUserId").notNull(),
  isActive: boolean("isActive").notNull().default(true),
  createdAt: timestamp("createdAt").notNull().defaultNow(),
  updatedAt: timestamp("updatedAt").notNull().defaultNow().$onUpdate(() => new Date()),
},
table => ([
    index("clerkUserIdIndex").on(table.clerkUserId),
]));

//schedule Table

export const ScheduleTable = pgTable("schedules",{
    id: uuid("id").primaryKey().defaultRandom(),
    timezone: text("timezone").notNull(),
    clerkUserId: text("clerkUserId").notNull().unique(),
    createdAt: timestamp("createdAt").notNull().defaultNow(),
    updatedAt: timestamp("updatedAt").notNull().defaultNow().$onUpdate(() => new Date()),
})

//relation
export const scheduleRelations = relations(ScheduleTable, ({many}) => ({
    availabilities: many(ScheduleAvailabilityTable), //one to many relationship
}))

//ScheduleAvailability  
export const scheduleDayOfWeekEnum = pgEnum("day", DAYS_OF_WEEK_IN_ORDER)

export const ScheduleAvailabilityTable = pgTable("scheduleAvailabities",{
    id: uuid("id").primaryKey().defaultRandom(),
    scheduleId: uuid("scheduleId").notNull().references(() => ScheduleTable.id, { onDelete: "cascade" }),
    startTime: text("startTime").notNull(),
    endTime: text("endTime").notNull(),
    dayofWeek: scheduleDayOfWeekEnum("dayOfWeek").notNull(),
},
table => ([
    index("scheduleIdIndex").on(table.scheduleId),

]))

// reverse relationship where each availability belongs to a schedule
export const ScheduleAvailabilityRelations = relations(
    ScheduleAvailabilityTable,
    ({one}) => ({
        schedule: one(ScheduleTable, {
            fields: [ScheduleAvailabilityTable.scheduleId],
            references: [ScheduleTable.id],
        })
    })
)