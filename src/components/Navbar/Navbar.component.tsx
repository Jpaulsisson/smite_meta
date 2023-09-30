"use client";

import { Exo_2 } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import AvatarPlaceHolder from "../../resources/avatar.svg";
import SmiteLogo from '../../resources/smite_logo.png';
import { useUserContext } from "@/contexts/user.context";
import SignInForm from "../SignIn/SignIn.component";
import { signOut, getUser } from '@/database/supabase';

const exoFont = Exo_2({
  weight: '200',
  subsets: ["latin"]
});


export default function Navbar() {

  const { currentSession, currentUsername, currentUserId } = useUserContext();

  return (
    <nav className={`p-8 grid grid-cols-10 items-center ${exoFont.className} text-center bg-slate-900/40`}>
      <h1 className={`col-start-4 col-end-8 md:col-start-1 md:col-end-2 text-primaryFontColor text-3xl flex flex-col items-center`}>
        <Link href={`/${currentUserId}`} className="w-full h-full">
          <Image src={SmiteLogo} alt='Smite logo' />
        </Link>
        META
      </h1>
      <button onClick={() => console.log(getUser())} className="bg-orange-300 p-6"> log User info </button>
      {currentUsername ?
        <h2 className="text-neutral text-6xl hidden md:block md:col-start-3 md:col-end-9">Welcome, Logged in user!</h2>
        :
        <h2 className="text-neutral text-6xl hidden md:block md:col-start-3 md:col-end-9">Welcome, NOT logged in user!</h2>
        }
      {!currentSession ?
        <div className="w-full col-start-9 col-span-2 p-2">
          <SignInForm />
        </div>
        :
        <div className="col-start-9 md:col-start-10 md:col-span-1 col-span-2 flex flex-col gap-2 md:w-1/2">
          <Link href='#' className="border-thin border-primaryFontColor rounded-sm p-2">
            <Image src={AvatarPlaceHolder} alt='avatar placeholder'  className='max-h-[40px]' />
          </Link>
          <button className="text-neutral text-sm border-thin border-primaryFontColor rounded-sm" onClick={signOut}>Log Out</button>
        </div>
        }
      
    </nav>
  )
}
