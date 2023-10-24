"use client";

import { supabase } from "@/database/supabase";
import { useState } from "react";

export default function PasswordReset() {

  const [email, setEmail] = useState('');

  const resetPassword = async (email: string) => {
    let { data, error } = await supabase.auth.resetPasswordForEmail(email);
    if (data) return data;
    if (error) return error.message;
  }

  return (
    <div>
      <form className="flex flex-col items-center gap-4 text-neutral" onSubmit={() => resetPassword(email)}>
        <label htmlFor="email" className="w-1/2 md:w-1/4 text-xl text-start flex flex-col">Email
          <input id="email" className="w-full text-base text-black" type='email' value={email} onChange={(e) => setEmail(e.target.value)} />
        </label>
        <button type="submit" className="bg-secondaryBgColor border-thin border-neutral rounded-sm p-2">Send reset link</button>
      </form>
    </div>
  )
}
