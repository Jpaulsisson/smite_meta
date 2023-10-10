"use client";

import React, { useState, useEffect } from 'react';
import { useUserContext } from '@/contexts/user.context';
import { getUserBuildsPreview } from '@/database/supabase';
import Link from 'next/link';

type Build = {
  created_at: string,
  god_id: number | null,
  id: number, 
  item_1_id: number | null, 
  item_2_id: number | null, 
  item_3_id: number | null, 
  item_4_id: number | null, 
  item_5_id: number | null, 
  item_6_id: number | null,
}

export default function UserProfile() {

  const { currentUserId, currentUsername } = useUserContext();

  const [buildsPreview, setBuildsPreview] = useState<Build[]>()

  useEffect(() => {
    async function getRecentBuilds(currentUserId: string) {
      const builds = await getUserBuildsPreview(currentUserId);
      if (builds!.length > 0) setBuildsPreview(builds as Build[]);
    }
    if (currentUserId) getRecentBuilds(currentUserId);
    
  }, [currentUserId]);


  return (
    <div className='p-4 md:p-12'>
      {/* Goals:
            - Button to link your smite gamertag to your profile
            - Link to see your match history
            - Saved builds preview
            */}
          
          {/* Link to account link form */}

      {!currentUsername ?
        <Link href={'/LinkAccount'} className='text-2xl text-primaryFontColor underline underline-offset-4 tracking-wide'>Link your Smite Username to your Smite Meta profile</Link> : null}


      
    </div>
  )
}
