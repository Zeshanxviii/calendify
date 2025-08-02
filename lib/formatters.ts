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