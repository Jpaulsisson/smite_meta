"use client";

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Quicksand } from 'next/font/google';
import { supabase } from '@/database/supabase';
import Image from 'next/image';
import GoogleIcon from '@/resources/google.svg';
import FacebookIcon from '@/resources/facebook.svg';
import DiscordIcon from '@/resources/discord.svg';
import { redirect } from 'next/dist/server/api-utils/index';

const font = Quicksand({
  weight: ['300', '400'],
  subsets: ['latin'],
});

export default function SignUp() {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    confirm: ''
  });

  // Keeping form data up to date as user types into inputs //
  const handleFormChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }))
  }

  const handleFormSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const { email, password, confirm } = formData;

    if (password !== confirm) {
      alert('You rock! Cancel That! JK, your password and confirm password are different. Try again');
      return;
    }

    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    console.log(data);
  };

  const getSession = async () => {
const { data: { user } } = await supabase.auth.getUser()
    return user;
  }

  return (
    <main
      className={`m-auto min-h-screen flex justify-center items-center max-w-max text-primaryFontColor ${font.className}`}
    >
      {/* 
        Goals:
        - Submit button
        - OR choose one of Google, Facebook, or Discord maybe?? <--- buttons
        - already have an account? click here to log in <--- redirect to sign IN page
        - redirect to your profile page or previous page after completion

        Table of Contents:
          - Header
          - Sign up with email and password form
            - Email
            - Password
            - Confirm
            - Submit button
          - OAuth buttons
            - Sub-header
            - Google button
            - Facebook button
            -Discord button
      */}
      <div className="mb-8 p-4 h-full w-11/12 md:w-full bg-secondaryBgColor rounded-sm border-thin border-slate-300">

      <button onClick={() => console.log(getSession())}>Delete Me</button>


        {/* Header */}

        <h1 className="w-full text-center text-4xl md:text-6xl">New to Smite Meta?</h1>

        {/*  Sign up with email and password form */}

        <form 
          name='sign-up'
          className="flex flex-col gap-2 md:gap-4 p-4"
          onSubmit={handleFormSubmit}
          >

          {/* Email input and label */}

          <label className="text-xl" htmlFor="email">
            Email *
          </label>
          <input
            onChange={handleFormChange}
            required
            placeholder={`We won't be emailing you or selling this info`}
            className="w-full p-2 text-black text-lg rounded-sm border-2 border-black bg-slate-300 focus:outline-yellow-600 placeholder:text-black/40 placeholder:text-sm md:w-3/4"
            name="email"
            type="email"
          />

          {/* Password input and label */}

          <label className="text-xl" htmlFor="password">
            Password *
          </label>
          <input
            onChange={handleFormChange}
            required
            placeholder="A password like all other sites"
            className="w-full p-2 text-black text-lg rounded-sm border-2 border-black bg-slate-300 focus:outline-yellow-600 placeholder:text-black/40 placeholder:text-sm md:w-3/4"
            name="password"
            type="password"
          />

          {/* Confirm input and label */}

          <label className="text-xl" htmlFor="confirm-password">
            Confirm Password *
          </label>
          <input
            onChange={handleFormChange}
            required
            placeholder="The same thing you put in the last one"
            className="w-full p-2 text-black text-lg rounded-sm border-2 border-black bg-slate-300 focus:outline-yellow-600 placeholder:text-black/40 placeholder:text-sm md:w-3/4"
            name="confirm"
            type="password"
          />

          {/* Submit button */}

          <button
            className="w-2/3 md:w-1/3 self-center border-2 border-primaryFontColor p-3 rounded-md bg-slate-400 text-black text-xl "
            type="submit"
          >
            Sign Up
          </button>
        </form>

        {/* End of sign up form */}
        {/* Start of OAuth buttons */}

        <div className="p-2 md:p-4 flex flex-col items-center w-full gap-3 font-normal text-center border-white border-t-2">
          <h2>Or use one of these easy mode sign up options</h2>
          <button
            className="w-11/12 md:w-1/2 border-2 border-l-yellow-500 border-t-red-500 border-b-green-500 border-r-blue-500 p-2 rounded-md bg-stone-200 text-black flex gap-2 items-center justify-center">
            Sign Up with Google
            <Image src={GoogleIcon} alt="google logo" width={40} height={40} />
          </button>
          <button className="w-11/12 md:w-1/2 border-2 border-sky-500 bg-blue-500 p-2 rounded-md text-white flex gap-2 items-center justify-center">
            Sign Up with Facebook
            <Image src={FacebookIcon} alt="facebook logo" width={40} height={40} />
          </button>
          <button className="w-11/12 md:w-1/2 border-2 border-indigo-900 bg-indigo-500 p-2 rounded-md text-white flex gap-2 items-center justify-center">
            Sign Up with Discord
            <Image src={DiscordIcon} alt="discord logo" width={40} height={40} />
          </button>
        </div>
      </div>
    </main>
  );
}
