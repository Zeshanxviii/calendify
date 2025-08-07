import { currentUser } from "@clerk/nextjs/server";
import { redirect } from "next/navigation";
import LandingPage from "@/components/LandingPage";
import { FrontPage } from "@/components/Frontpage";
 "@/components/Frontpage";

export default function Home() {
  // const user = currentUser();
  // if(!user)
  //   return <LandingPage />
  // return redirect('/events')
  return <FrontPage />
}
