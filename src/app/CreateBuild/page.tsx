"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { supabase } from '@/database/supabase';
import { useDataContext } from '@/contexts/data.context';
import Items from '@/components/Items/Items.component';

export default function CreateBuild() {

  const [isChecked, setIsChecked] = useState(true);
  const [values, setValues] = useState({
    user_id: '',
    item_1_id: 0,
    item_2_id: 0,
    item_3_id: 0,
    item_4_id: 0,
    item_5_id: 0,
    item_6_id: 0,
    god_id: 1789
  })
  const { gods, items } = useDataContext();

  function handleChange() {
    setIsChecked((prev) => !prev);
  }

  return (
    <div className='flex flex-col items-center justify-center'>
      {/* Goals: (possibly in this order)
          - six matching empty containers at the top to be filled with items
          - one ghost box to be filled with an optional god
          - save build button / sign up & login to save builds button
          - compiled stats table updating live underneath
          - item passive list in some form of dropdown option
          - items/gods search bar
          - item filter checkboxes
          - switch for viewing items or gods
          - items or gods conditionally on the switch
      */}
      {/* Ideas:
          - maybe have a conditionally rendered header at the top if a god is selected and have the backgournd behind the build be the god card if one is selected or just transparent if no god is selected
      */}

      {values.god_id ? 
        <h2 className='text-neutral text-4xl'>{}</h2>
      :
        <h2 className='hidden'></h2>
      }

      <div className='w-4/5 flex gap-4 text-neutral my-3'>
        <h4 className='w-1/2'>Currently showing:</h4>
        <div>
          <label>Items</label>
          <input type='checkbox' checked={isChecked} onChange={handleChange} />
        </div>
        <div>
          <label>Gods</label>
          <input type='checkbox' checked={!isChecked} onChange={handleChange}/>
        </div>
      </div>
      <div className='w-4/5 flex flex-col items-center'> 
        {isChecked ?
        
          <Items />
        
          :
          <div className='w-4/5 grid grid-cols-3 gap-2'>
          {gods &&
            gods.map((god) => {
            return (
              <div key={god.id} style={{backgroundImage: `url(${god.pic_url})`, backgroundSize: 'cover'}} className='aspect-square'>
                <h3 className='bg-stone-200/80 text-center'>{god.name}</h3>
              </div>
              )
          })
          }
          </div>
          }
      </div>
    </div>
  )
}
