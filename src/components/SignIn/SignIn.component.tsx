"use client";

import React, { useState } from 'react';
import { signInWithThirdParty } from '@/database/supabase';
import ReactModal from "react-modal";
import { useUserContext } from '@/contexts/user.context';
import { Exo_2 } from 'next/font/google';
import Link from 'next/link';
import GoogleIcon from '@/resources/google.svg';
import FacebookIcon from '@/resources/facebook.svg';
import DiscordIcon from '@/resources/discord.svg';
import Image from 'next/image';

const font = Exo_2({
  weight: ['200', '400'],
  subsets: ["latin"]
});

export default function SignInForm() {

  const { appElement } = useUserContext();
  const [isOpen, setIsOpen] = useState(false);

  const handleModalToggle = () => {
    setIsOpen(prev => !prev);
  }

  return (
    <div className={`${font.className}`}>
      <button onClick={handleModalToggle} className='uppercase text-primaryFontColor'>Sign In</button>
      <ReactModal
      isOpen={isOpen}
      contentLabel='sign in form'
      onRequestClose={handleModalToggle}
      appElement={appElement}
      style={{
        content: {
          zIndex: '999',
          backgroundColor: 'var(--secondaryBgColor)',
          color: 'var(--neutralFontColor)',
          width: '80%',
          margin: 'auto',
          textTransform: 'uppercase',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column',
          gap: '2rem',
          overflowY: 'scroll'
        },
        overlay: {
          zIndex: '998',
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
        }
      }}
      >
        <div className='flex gap-x-2 md:gap-x-4 justify-end w-full text-xs'>
          <p className='text-slate-500 '>Don&apos;t have an account yet?</p>
          <Link onClick={handleModalToggle} href='/SignUp'>Sign up</Link>
        </div>
        <div className='w-full md:w-4/5 m-auto flex flex-col items-center justify-center gap-4'>
          <h2 className='text-xl md:text-5xl w-5/6 md:w-1/2'>Sign in</h2>
          <div className='w-full md:w-1/2 flex flex-col gap-1 md:gap-4'>
            <input type="text" placeholder='Email' className='p-2 md:p-4 placeholder:text-slate-600 placeholder:text-xl rounded-md focus:outline-2 focus:outline-amber-400' />
            <input type="text" placeholder='Password' className='p-2 md:p-4 placeholder:text-slate-600 placeholder:text-xl rounded-md focus:outline-2 focus:outline-amber-400' />
          </div>
          <button className='bg-slate-700 p-2 md:p-4 w-1/2 rounded-md text-xl border-thin border-black'>Sign In</button>
          <div className="p-2 md:p-4 flex flex-col items-center w-full gap-3 font-normal text-center border-white border-t-2">
          <h2 className='text-xs md:text-base'>Or use one of these easy mode sign in options</h2>
          <button
            onClick={() => signInWithThirdParty('google')}
            className="w-11/12 md:w-1/2 border-2 border-l-yellow-500 border-t-red-500 border-b-green-500 border-r-blue-500 p-0 md:p-2 rounded-md bg-stone-200 text-black  flex gap-2 items-center justify-center">
            Sign in with Google
            <Image src={GoogleIcon} alt="google logo" width={40} height={40} />
          </button>
          <button 
            onClick={() => signInWithThirdParty('facebook')}
            className="w-11/12 md:w-1/2 border-2 border-sky-500 bg-blue-500 p-0 md:p-2 rounded-md text-white flex gap-2 items-center justify-center">
            Sign in with Facebook
            <Image src={FacebookIcon} alt="facebook logo" width={40} height={40} />
          </button>
          <button 
            onClick={() => signInWithThirdParty('discord')}
            className="w-11/12 md:w-1/2 border-2 border-indigo-900 bg-indigo-500 p-0 md:p-2 rounded-md text-white flex gap-2 items-center justify-center">
            Sign in with Discord
            <Image src={DiscordIcon} alt="discord logo" width={40} height={40} />
          </button>
        </div>
          <button onClick={handleModalToggle} className='text-xl bg-slate-950 p-1 md:p-3 w-1/2 rounded-md'>Close</button>
        </div>
      </ReactModal>
    </div>
    
  )
}
