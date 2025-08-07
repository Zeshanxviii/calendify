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
        title: "Event",
        route: "/events",
        label: "My Events"
    },
    {
        title: "Schedule",
        route: "/schedule",
        label: "My Schedule"
    },
    {
        title: "Books",
        route: "/book",
        label: "My Public, Profile"
    },
] as const 