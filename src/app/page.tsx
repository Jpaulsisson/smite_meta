"use client";

import Image from 'next/image'
import { supabase } from '../database/supabase'

export default function Home() {

  const thisThing = process.env.NEXT_PUBLIC_THIS_THING;
  const thatThing = process.env.NEXT_PUBLIC_THAT_THING;

  const getAllItemsFromSupabase = async() => {
    try {
      let { data: items, error } = await supabase.from('abilities').select('*');
      const allItems = items;
      return allItems;
    } catch (error) {
      console.error(error);
    }
  }
  
  return (
    <main>
      <button onClick={() => console.log(getAllItemsFromSupabase())}>Log from supabase</button>
      <button onClick={() => console.log(thisThing)}>Log this thing</button>
      <button onClick={() => console.log(thatThing)}>Log that thing</button>

    </main>
  )
}
