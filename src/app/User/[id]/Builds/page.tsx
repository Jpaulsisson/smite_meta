"use client";

import { useDataContext } from '@/contexts/data.context';
import { useUserContext } from '@/contexts/user.context';
import { getAllUserBuilds, getUserRecentBuilds } from '@/database/supabase';
import React, { useEffect, useState } from 'react'

type Build = {
  created_at: string,
  god_id: number | null,
  id: number | null, 
  item_1_id: number | null, 
  item_2_id: number | null, 
  item_3_id: number | null, 
  item_4_id: number | null, 
  item_5_id: number | null, 
  item_6_id: number | null,
}

type Item = {
  id: number,
  name: string,
  pic_url: string,
  restricted: string,
  starter: boolean,
  glyph: boolean,
  tier: number,
  special: string,
  stat_1_desc: string | null,
  stat_1_val: string | null,
  stat_2_desc: string | null,
  stat_2_val: string | null,
  stat_3_desc: string | null,
  stat_3_val: string | null,
  stat_4_desc: string | null,
  stat_4_val: string | null,
  stat_5_desc: string | null,
  stat_5_val: string | null,
  stat_6_desc: string | null,
  stat_6_val: string | null,
  active_status: boolean,
  short_description: string,
  type: string,
  price: number
}

export default function SavedUserBuilds() {

  const { currentUsername, currentUserId } = useUserContext();
  const { gods, items } = useDataContext();

  const [recentBuilds, setRecentBuilds] = useState<Build[]>();

  useEffect(() => {
    async function getRecentBuilds(currentUserId: string) {
      const builds = await getUserRecentBuilds(currentUserId);
      if (builds!.length > 0) setRecentBuilds(builds as Build[]);
    }
    if (currentUserId) getRecentBuilds(currentUserId);
    
  }, [currentUserId])

  return (
    <div className='p-4 md:p-12'>
      {/* 
        Goals: 
        - 5 tagged "favorite" builds
        - user's builds in a list of ten most recent
        - maybe some links to other areas of the site?
      */}
      {currentUserId ?
        <div>
          <h2 className='text-neutral text-7xl'>Your builds</h2>
          <div>
            <button onClick={() => console.log(recentBuilds)}>Log Recent builds</button>
            {recentBuilds?.map((build) => {
              const { id, god_id, item_1_id, item_2_id, item_3_id, item_4_id, item_5_id, item_6_id } = build;
              const god = gods?.find(god => god.id === god_id);
              return (
                <div key={id}>
                  <p>{god?.pic_url}</p>
                  <p>{item_1_id}</p>
                  <p>{item_2_id}</p>
                  <p>{item_3_id}</p>
                  <p>{item_4_id}</p>
                  <p>{item_5_id}</p>
                  <p>{item_6_id}</p>
                </div>
              )
            })}
          </div>
        </div>
      :
        <div>
          <h2 className='text-neutral text-7xl' >Loading...</h2>
          <p className='text-neutral text-xl mt-12'>If this has been here longer than 10 seconds, you must not be logged in. Maybe try clicking that sign in thing at the top right. Or maybe hit refresh. Also, how did you get to this page without being logged in?</p>
        </div>
        }
    </div>
  )
}
