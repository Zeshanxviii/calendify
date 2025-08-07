import ScheduleForm from "@/components/form/ScheduleForm"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { getSchedule } from "@/server/actions/schedule"
import { auth } from "@clerk/nextjs/server"

export default async function SchedulePage()
{   
    const { userId, redirectToSignIn } = await auth()
    if(!userId)
        return redirectToSignIn

    const schedule = await getSchedule(userId)

    return(
        <Card className="max-w-md mx-auto ">
            <CardHeader>
                <CardTitle>Schedule</CardTitle>
            </CardHeader>
            <CardContent>
                <ScheduleForm schedule={schedule} />
            </CardContent>
        </Card>
    )
}