import { SignIn } from "@clerk/nextjs";
import { neobrutalism } from "@clerk/themes";
import Image from "next/image";

export default function LoginPage(){
  return (
    <main className="flex flex-col items-center p-5 gap-10 animate-fade-in">
        <Image
          src="/logo.svg"
          width={100}
          height={100}
          alt="logo"
        />
      <div className="mt-3">
        <SignIn 
        appearance={{
          baseTheme: neobrutalism as any
        }}/>
      </div>
    </main>
  );
};  
