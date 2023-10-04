"use client";

import React, { useEffect, useState } from 'react';
import { useDataContext } from '@/contexts/data.context';
import { useParams } from 'next/navigation';
import Image from 'next/image';

// This is the page for ONE SINGULAR ITEM //

type Stat = {
  desc: string | null,
  val: string | null
}

export default function Item() {
  
  const { items } = useDataContext();

  const itemId = useParams();

  const target = parseInt(itemId.id as string);

  const item = items?.find(item => item.id === target);  

  const [stats, setStats] = useState<Stat[]>([])

  useEffect(() => {
    if (item) setStats([
      { desc: item.stat_1_desc, val: item.stat_1_val},
      { desc: item.stat_2_desc, val: item.stat_2_val},
      { desc: item.stat_3_desc, val: item.stat_3_val},
      { desc: item.stat_4_desc, val: item.stat_4_val},
      { desc: item.stat_5_desc, val: item.stat_5_val},
      { desc: item.stat_6_desc, val: item.stat_6_val},
    ])
  }, [item])

  return (
    <div className='p-4 md:p-20'>
      {item ?
        <div className=''>
          <h2 className='text-5xl md:text-7xl text-neutral'>{item.name}</h2>
          <Image priority src={item.pic_url} alt={item.name} width={100} height={100} className='w-44 mt-4 border-thin border-neutral rounded-sm' />

        {/* Starter status */}

        {item.starter === true && 
          <p className='text-primaryFontColor text-sm'>&#10026; Starter Item</p>}
        
        {/* Glyph status */}

        {item.glyph === true && 
          <p className='text-primaryFontColor text-sm'>&#10026; Glyph</p>}

        {/* Restrictions */}

        {item.restricted !== "no restrictions" &&
          <p className=' text-primaryFontColor text-sm'>&#10026; Restricted to: {item.restricted}</p>}

        {/* Stats */}

        {stats ? 
          <div className='mt-4 p-3 grid grid-cols-auto bg-secondaryBgColor text-sm md:text-base text-neutral rounded-md md:w-1/4'>
            {stats.map((stat, index) => {
              return (
                <div key={Math.floor(Math.random() * 513251)} className='w-2/3 flex gap-2 items-end'>
                  <h3>{stat.desc}</h3>
                  <p>{stat.val}</p>
                </div>
              )
            })}
          </div>
          :
          <>
          </>
        }

        {/* Passive/Special */}

        <div className='mt-4 p-3 bg-secondaryBgColor text-neutral rounded-md tracking-wide md:w-1/3'>
          <p>{item.special}</p>
        </div>

        </div>
        :
        <h2 className='text-5xl text-neutral'>Loading...</h2>
      }
      
    </div>
  )
}
