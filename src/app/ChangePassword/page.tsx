"use client";

import { supabase } from "@/database/supabase";
import { useState } from "react";

const updatePassword = async (email: string, password: string, confirm: string)=> {

  if (password != confirm) return alert('Passwords do not match');

  const { data, error } = await supabase.auth.updateUser({
    email: email,
    password: password,
    data: {'this is working': 'see'}
  })

  console.log('it ran');
  console.log(data);
  if (data) return data;
  if (error) return error;
}

export default function ChangePassword() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');

  return (
    <form className="flex flex-col gap-4 items-center text-neutral" onSubmit={() => updatePassword(email, password, confirm)}>
      <label htmlFor="email" className="w-1/2 md:w-1/4 text-xl text-start flex flex-col">
        Email
        <input className="text-black text-base p-2" id="email" type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
      </label>
      <label htmlFor="password" className="w-1/2 md:w-1/4 text-xl text-start flex flex-col">
        Password
        <input className="text-black text-base p-2" id="password" type='password' value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <label htmlFor="confirm" className="w-1/2 md:w-1/4 text-xl text-start flex flex-col">
        Confirm Password
        <input className="text-black text-base p-2" id="confirm" type='password' value={confirm} onChange={(e) => setConfirm(e.target.value)} />
      </label>
      <button className="border-thin border-neutral py-4 px-8 rounded-md" type="submit">Change</button>
    </form>
  )
}
