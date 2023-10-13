"use client";

import { Exo_2 } from "next/font/google";
import Image from "next/image";
import Link from "next/link";
import LinkArrow from "../../resources/arrow-up-right.svg";
import SmiteLogo from '../../resources/smite_logo.png';
import { useUserContext } from "@/contexts/user.context";
import SignInForm from "../SignIn/SignIn.component";
import { signOut } from '@/database/supabase';

const exoFont = Exo_2({
  weight: '200',
  subsets: ["latin"]
});


export default function Navbar() {

  const { currentSession, hashedId } = useUserContext();

  return (
    <nav className={`p-6 grid grid-cols-10 items-center ${exoFont.className} text-center`}>

      {/* Logo and link to home page */}

      <Link href='/' className={`col-start-4 col-end-8 md:col-start-1 md:col-end-2 md:row-span-2 text-primaryFontColor text-3xl flex flex-col items-center`}>
        <h1 className='w-full h-full flex items-center justify-center flex-col'>
          <Image src={SmiteLogo} alt='Smite logo' />
          META
        </h1>
      </Link>

      {/* Welcome header for desktop */}

      <h2 className="text-neutral text-6xl row-span-full hidden md:block col-start-3 col-end-9">Welcome, You Rock!</h2>

      {/* Sign in or Log out */}

      {!currentSession ? 

        // No Session ? Sign in or Sign up
      <div className="w-full col-start-9 col-span-2 p-2">
        <SignInForm />
      </div>
      :

      // Session is active ? Link to profile page and log out button
      <div className="col-start-10 md:row-start-2 col-span-1 flex flex-col gap-2 md:w-1/2">
        <button className="text-neutral text-sm md:text-lg" onClick={signOut}>Log Out</button>
      </div>
      }

      {!currentSession ?
        null
        :
        <Link href={`/User/${hashedId}`} className="col-start-1 md:col-start-10 row-start-1 text-sm md:text-xl text-neutral p-2 flex">
        My META
      </Link>}
    </nav>
  )
}
