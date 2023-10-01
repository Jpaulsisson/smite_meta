"use client";

import React, { useEffect, useState } from 'react';
import { useDataContext } from '@/contexts/data.context';
import Image from 'next/image';


export default function Items() {

  // Bring in the item info
  const { items } = useDataContext();

  // Sort the items (they are already alphabetical)
  // First only allow active items in
  const activeItems = items?.filter((item) => item.active_status && item.tier > 2);

  return (
    <div className='w-full grid grid-cols-4 gap-2'>
      {activeItems?.map((item) => {
        return <Image key={item.id} src={item.pic_url} alt={item.name} width={50} height={50} />
      })}
    </div>
  )
}
