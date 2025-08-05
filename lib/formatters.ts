export function formatEventDescription(durationInMinutes:number):string
{
    const hour = Math.floor(durationInMinutes/60)
    const minutes = durationInMinutes % 60

    const minuteString = `${minutes} ${minutes > 1 ? "mins" : "min"}`
    const hourString = `${hour} ${hour > 1 ? "hrs" : "hr"}`

    if(hour===0) return minuteString
    if(minutes === 0 ) return hourString

    return `${hourString} ${minuteString}`
}

export function formatTimezoneOffset(timezone: string) {
    return new Intl.DateTimeFormat(undefined, {
      timeZone: timezone,
      timeZoneName: "shortOffset", // Request the short offset string
    })
      .formatToParts(new Date()) // Format the current date into parts
      .find(part => part.type == "timeZoneName")?.value // Extract the timezone offset part
  }

  const timeFormatter = new Intl.DateTimeFormat(undefined, {
    timeStyle: "short",
  })
  
  // Format a Date object into a short-style time string
  export function formatTimeString(date: Date) {
    return timeFormatter.format(date)
  }

    // Create a date formatter for displaying only the date (e.g., "Apr 10, 2025")
    const dateFormatter = new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
    })
    
  
    // Format a Date object into a medium-style date string
    export function formatDate(date: Date) {
      return dateFormatter.format(date)
    }

    // Create a formatter that includes both date and time (e.g., "Apr 10, 2025, 9:45 AM")
    const dateTimeFormatter = new Intl.DateTimeFormat(undefined, {
      dateStyle: "medium",
      timeStyle: "short",
    })
    
    // Format a Date object into a readable date + time string
    export function formatDateTime(date: Date) {
      return dateTimeFormatter.format(date)
    }