"use client";

import { supabase } from '../database/supabase.js'
import { addAllItemsToSupabase, addItemToSupabase } from '../database/hirez-calls'

export default function Home() {

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
      <button onClick={() => addAllItemsToSupabase()}>Log from supabase</button>

    </main>
  )
}
