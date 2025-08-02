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