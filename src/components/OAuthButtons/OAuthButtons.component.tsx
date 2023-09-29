import React from 'react'
import GoogleIcon from '@/resources/google.svg';
import FacebookIcon from '@/resources/facebook.svg';
import DiscordIcon from '@/resources/discord.svg';
import Image from 'next/image';
import { signInWithThirdParty } from '@/database/supabase';


export default function OAuthButtons() {
  return (
    <div className="p-2 md:p-4 flex flex-col items-center w-full gap-3 font-normal text-center border-white border-t-2">
          <h2>Or use one of these easy mode sign in options</h2>
          <button
            onClick={() => signInWithThirdParty('google')}
            className="w-11/12 md:w-1/2 border-2 border-l-yellow-500 border-t-red-500 border-b-green-500 border-r-blue-500 p-2 rounded-md bg-stone-200 text-black flex gap-2 items-center justify-center">
            Sign in with Google
            <Image src={GoogleIcon} alt="google logo" width={40} height={40} />
          </button>
          <button 
            onClick={() => signInWithThirdParty('facebook')}
            className="w-11/12 md:w-1/2 border-2 border-sky-500 bg-blue-500 p-2 rounded-md text-white flex gap-2 items-center justify-center">
            Sign in with Facebook
            <Image src={FacebookIcon} alt="facebook logo" width={40} height={40} />
          </button>
          <button 
            onClick={() => signInWithThirdParty('discord')}
            className="w-11/12 md:w-1/2 border-2 border-indigo-900 bg-indigo-500 p-2 rounded-md text-white flex gap-2 items-center justify-center">
            Sign in with Discord
            <Image src={DiscordIcon} alt="discord logo" width={40} height={40} />
          </button>
        </div>
  )
}
