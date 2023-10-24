"use client";

import React, { ChangeEvent, FormEvent, useState } from 'react';
import { Quicksand } from 'next/font/google';
import { supabase, signUpWithEmailAndPassword } from '@/database/supabase';
import { redirect } from 'next/dist/server/api-utils';
import OAuthButtons from '@/components/OAuthButtons/OAuthButtons.component';
import Link from 'next/link';
import SignInForm from '@/components/SignIn/SignIn.component';

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

    signUpWithEmailAndPassword(email, password);
    console.log('you did it')


  };

  return (
    <main
      className={`m-auto min-h-screen flex justify-center items-center max-w-max text-neutral ${font.className}`}
    >
      {/* 
        Goals:
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
      <div className="mb-8 p-4 h-full w-11/12 md:w-full bg-accentBg rounded-sm border-thin border-slate-300">

        {/* Header */}

        <h1 className="w-full text-center text-4xl md:text-6xl">New to Smite Meta?</h1>

        {/*  Sign up with email and password form */}

        <form 
          id='sign-up'
          name='sign-up'
          className="flex flex-col gap-2 md:gap-4 p-1 md:p-8"
          onSubmit={handleFormSubmit}
          >

          {/* Email input and label */}

          <label className="text-xl" htmlFor="email">
            Email *
          </label>
          <input
            onChange={handleFormChange}
            required
            autoComplete=''
            placeholder={`We won't be emailing you or selling this info`}
            className="w-full p-2 text-black text-lg rounded-sm border-2 border-black bg-slate-300 focus:outline-yellow-600 placeholder:text-black/40 placeholder:text-sm "
            name="email"
            id="email"
            type="email"
          />

          {/* Password input and label */}

          <label className="text-xl" htmlFor="password">
            Password *
          </label>
          <input
            onChange={handleFormChange}
            required
            minLength={6}
            placeholder="A password like all other sites"
            className="w-full p-2 text-black text-lg rounded-sm border-2 border-black bg-slate-300 focus:outline-yellow-600 placeholder:text-black/40 placeholder:text-sm "
            name="password"
            id='password'
            type="password"
          />

          {/* Confirm input and label */}

          <label className="text-xl" htmlFor="confirm">
            Confirm Password *
          </label>
          <input
            onChange={handleFormChange}
            required
            placeholder="The same thing you put in the last one"
            className="w-full p-2 text-black text-lg rounded-sm border-2 border-black bg-slate-300 focus:outline-yellow-600 placeholder:text-black/40 placeholder:text-sm "
            name="confirm"
            id='confirm'
            type="password"
          />

          {/* Submit button */}

          <button
            className="w-2/3 md:w-1/2 self-center mb-2 border-thin border-black p-1 md:p-3 rounded-md bg-slate-500 text-xl text-center"
            type="submit"
          >
            Sign Up
          </button>
        </form>

        {/* End of sign up form */}
        {/* OAuth buttons */}

        <OAuthButtons />

        {/* Already have an account? section */}
        <div className='flex gap-x-2 md:gap-x-4 justify-end w-full text-xs p-2'>
          <p className='text-slate-500 '>Already have an account?</p>
          <SignInForm />
        </div>
      </div>
    </main>
  );
}
