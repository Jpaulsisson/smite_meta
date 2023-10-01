"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDataContext } from '@/contexts/data.context';
import Image from 'next/image';


export default function Items() {

  // Bring in the item info
  const { items } = useDataContext();
  const [itemSearch, setItemSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState(items);
  const [filterOptions, setFilterOptions] = useState({
    physical_power: false,
    physical_protection: true,
    magic: true,
    speed: true,
    damage: false
  })

  const currentOptions = Object.entries(filterOptions).filter((pair) => pair[1] === true);

  const selectedOptions = currentOptions.map((option) => option[0])

  /// checkboxes will set the filter options to true or false. (default to false)

  /// step one: filter initial items array
  /// step two: check stat_1_desc value
  useEffect(() => {
    activeItems?.filter((item) => {
      const currentOptions = Object.values(filterOptions).filter((value) => value === true);
      const { stat_1_desc, stat_2_desc, stat_3_desc, stat_4_desc, stat_5_desc, stat_6_desc } = item;
      switch (stat_1_desc || stat_2_desc || stat_3_desc || stat_4_desc || stat_5_desc || stat_6_desc) {
        
          
      }
    })
  })

  const handleItemSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setItemSearch(input);
  }

  //create a switch statement to run in an array.filter, in a useEffect hook so that the filter itself updates based on the state of "options"
  

  // Sort the items (they are already alphabetical)
  // First only allow active items in
  const activeItems = items?.filter((item) => item.active_status && item.tier >= 3 && item.type === 'Item' && !item.name.includes('Acorn'));
  const currentItems = activeItems?.filter((item) => item.name.toLowerCase().includes(itemSearch))

  const physicalItems = currentItems?.filter((item) => item.stat_1_desc === 'Physical Power' || item.stat_2_desc === 'Physical Power')

  return (
    <div className='w-full grid grid-cols-4 gap-2'>
      <button className='text-xl text-white' onClick={() => console.log(options)}> console log your work </button>
      <input className='col-span-full p-2 mb-2 rounded-sm bg-neutral' type='text' value={itemSearch} onChange={handleItemSearch} placeholder='Search Items' />
      {physicalItems?.map((item) => {
        const { id, pic_url, name, special } = item;
        return (
        <button key={id} className='flex flex-col items-center' >
          <Image src={pic_url} alt={name} width={75} height={75} className='border-thin border-neutral rounded-sm' />
          <h3 className='text-neutral text-sm'>{name}</h3>
        </button>
        )
      })}
    </div>
  )
}
