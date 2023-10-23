"use client";

import React, { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useUserContext } from '@/contexts/user.context';
import { getUserBuildsPreview } from '@/database/supabase';
import Image from 'next/image';
import Link from 'next/link';
import { useDataContext } from '@/contexts/data.context';


export type Build = {
  id: number, 
  created_at: string,
  user_id: string,
  item_1_id: number | null, 
  item_2_id: number | null, 
  item_3_id: number | null, 
  item_4_id: number | null, 
  item_5_id: number | null, 
  item_6_id: number | null,
  god_id: number | null,
}

export const createBuildHref = (build: Build) => {
    const buildQueryString = {
      item1Id: typeof build.item_1_id === 'number' ? String(build.item_1_id) + ',' : '',
      item2Id: typeof build.item_2_id === 'number' ? String(build.item_2_id) + ',' : '',
      item3Id: typeof build.item_3_id === 'number' ? String(build.item_3_id) + ',' : '',
      item4Id: typeof build.item_4_id === 'number' ? String(build.item_4_id) + ',' : '',
      item5Id: typeof build.item_5_id === 'number' ? String(build.item_5_id) + ',' : '',
      item6Id: typeof build.item_6_id === 'number' ? String(build.item_6_id) : '',
      godId: typeof build.god_id === 'number' ? String(build.god_id) : 'null',
    }
    return buildQueryString;
}

export default function UserProfile() {

  const { currentUserId, hashedId } = useUserContext();
  const { findGod, findItem, formatTimestamp } = useDataContext();
  const pathname = usePathname();

  const [buildsPreview, setBuildsPreview] = useState<Build[]>()

  useEffect(() => {
    async function getRecentBuilds(currentUserId: string) {
      const builds = await getUserBuildsPreview(currentUserId);
      if (builds!.length > 0) setBuildsPreview(builds as Build[]);
    }
    if (currentUserId) getRecentBuilds(currentUserId);
    
  }, [currentUserId]);

  const updateItems = async() => {
    const response = await fetch('/api/db-updates/skins');
    console.log(response);
  }


  return (
    <div className='p-4 md:p-12 text-neutral'>

        {/* <button onClick={updateItems} className='text-white text-2xl'>Update items</button> */}
        <h2 className='text-4xl'>Recent</h2>
        <Link href={`${pathname}/Builds`} className='text-primaryFontColor text-lg
        focus:underline hover:underline'>See all builds</Link>
        <div className='flex flex-col gap-2'>
        {
          buildsPreview?.map((build) => {
            const { id, created_at, item_1_id, item_2_id, item_3_id, item_4_id, item_5_id, item_6_id, god_id } = build; 
            const item1 = typeof item_1_id === 'number' ? findItem(item_1_id) : null;
            const item2 = typeof item_2_id === 'number' ? findItem(item_2_id) : null;
            const item3 = typeof item_3_id === 'number' ? findItem(item_3_id) : null;
            const item4 = typeof item_4_id === 'number' ? findItem(item_4_id) : null;
            const item5 = typeof item_5_id === 'number' ? findItem(item_5_id) : null;
            const item6 = typeof item_6_id === 'number' ? findItem(item_6_id) : null;
            const god =  typeof god_id === 'number' ? findGod(god_id) : null;
            const timestamp = formatTimestamp(created_at);
            const buildQueryString = createBuildHref(build);
            return (
              <Link 
                key={id} 
                href={`/CreateBuild?build=${buildQueryString.item1Id}${buildQueryString.item2Id}${buildQueryString.item3Id}${buildQueryString.item4Id}${buildQueryString.item5Id}${buildQueryString.item6Id}&god=${buildQueryString.godId}`}
                className='grid grid-cols-7 gap-1 md:w-1/2 md:gap-4'>
                {god ? 
                <div className='col-span-full'>
                  <h2>{god.name}</h2>
                </div>
                :
                <div className='col-span-full'>
                  <h2>no god selected</h2>  
                </div>}
                {god ? 
                <div>
                  <Image src={god.pic_url} alt={god.name} width={100} height={100} className='aspect-square object-cover object-top' />
                </div>
                :
                <div className='border-slate-700 border-thin text-sm text-center my-auto h-full'></div> }
                {item1 ? 
                <div>
                  <Image src={item1.pic_url} alt={item1.name} width={100} height={100}/>
                </div> : null}
                {item2 ? 
                <div>
                  <Image src={item2.pic_url} alt={item2.name} width={100} height={100}/>
                </div> : null}
                {item3 ? 
                <div>
                  <Image src={item3.pic_url} alt={item3.name} width={100} height={100}/>
                </div> : null}
                {item4 ? 
                <div>
                  <Image src={item4.pic_url} alt={item4.name} width={100} height={100}/>
                </div> : null}
                {item5 ? 
                <div>
                  <Image src={item5.pic_url} alt={item5.name} width={100} height={100}/>
                </div> : null}
                {item6 ? 
                <div>
                  <Image src={item6.pic_url} alt={item6.name} width={100} height={100}/>
                </div> : null}
                <div className='col-span-full row-start-3'>
                  <h2 className='text-xs tracking-wider'>{timestamp.formattedDate} {timestamp.formattedTime}</h2>
                </div>
              </Link>
            )
          })
        }
        </div>
        <div className='mt-6'>
          <p className='text-neutral text-xl'>Click on a build to edit it on the Create Builds page</p>
        </div>
        
    </div>
  )
}
