"use client"
import { RecoilRoot } from "recoil";
import { SessionProvider } from "next-auth/react";
import { signIn, signOut, useSession } from "next-auth/react";
import { Appbar } from "@repo/ui/Appbar";



export const Providers = ({children}: {children: React.ReactNode}) => {
    return <RecoilRoot>
          <SessionProvider>
            {children}
        </SessionProvider>
    </RecoilRoot>
}

export default function Nav() {
  const session = useSession();
  return (<div>
    <Appbar onSignin={signIn} onSignout={signOut} user={session.data?.user}></Appbar>
     </div>
  );
}
