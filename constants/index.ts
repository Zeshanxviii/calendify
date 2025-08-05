export const DAYS_OF_WEEK_IN_ORDER = [
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "saturday",
    "sunday"
] as const

export const PrivateNavLinks = [
    {
        imageURL: "/events.svg",
        route: "/events",
        label: "My Events"
    },
    {
        imageURL: "/schedule.svg",
        route: "/schedule",
        label: "My Schedule"
    },
    {
        imageURL: "/public.svg",
        route: "/book",
        label: "My Public, Profile"
    },
] as const 