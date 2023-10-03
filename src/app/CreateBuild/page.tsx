"use client";

import React, { useEffect, useState } from 'react';
import { useDataContext, Item, God } from '@/contexts/data.context';
import { useUserContext } from '@/contexts/user.context';
import Items from '@/components/Items/Items.component';
import Gods from '@/components/Gods/Gods.component';
import Image from 'next/image';

export default function CreateBuild() {
  const { gods, items } = useDataContext();
  const { currentUserId } = useUserContext();

  useEffect(() => {
    if (items) {
      setIsLoading(false);
    }
  }, [items])

  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const [buildItems, setBuildItems] = useState<Item[]>([]);
  const [selectedGod, setSelectedGod] = useState<God | null>(null);

  // Add an item to the buildItems state array
  const addBuildItem = (item_id: number) => {
    const target = items?.find(item => item.id === item_id);

    if (target !== undefined){
      if (buildItems.includes(target)) {
      return;
      }
      if (buildItems.length < 6) {
        setBuildItems((prev) => [...prev, target])
      }
    }
      return;
    }

    // Remove an item from the buildItems state array
    const removeBuildItem = (item: Item) => {
      const target = buildItems.find(target => target.id === item.id);
      const newBuildItems = buildItems.filter(item => item.id !== target!.id);
      setBuildItems(newBuildItems)
    }

  // Select a god
  const selectGod = (god_id: number) => {
    const target = gods?.find(god => god.id === god_id);
    if (target) setSelectedGod(target);
  }

  function handleChange() {
    setIsChecked((prev) => !prev);
  }

  return (
    <div className='w-full flex flex-col items-center justify-center mt-4'>
      {/* Goals: (possibly in this order)
          - one ghost box to be filled with an optional god
          - save build button / sign up & login to save builds button
          - compiled stats table updating live underneath
          - item passive list in some form of dropdown option

      */}
      {/* Build items containers + optional god name header */}

      <div className='flex flex-col w-full items-center'>
        
        <div className=' w-5/6 md:w-1/2 text-neutral grid grid-cols-4 md:flex gap-4 p-2'>
        
        {/* build item containers */}
        
          {/* First item */}

          {buildItems[0] ? 
            <button
              onClick={() => removeBuildItem(buildItems[0])}
              className="aspect-square w-full bg-cover flex items-center border-thin border-neutral rounded-sm"
              style={{ backgroundImage: `url(${buildItems[0].pic_url})` }}
            >
            </button>
          : 
            <p className="aspect-square w-full min-w-[40px] flex items-center justify-center bg-white/50 border-thin border-white">+</p>
          }

          {/* Second item */}

          {buildItems[1] ? 
            <button
              onClick={() => removeBuildItem(buildItems[1])}
              className="aspect-square w-full bg-cover flex items-center border-thin border-neutral rounded-sm"
              style={{ backgroundImage: `url(${buildItems[1].pic_url})` }}
            >
            </button>
          : 
            <p className="aspect-square w-full min-w-[40px] flex items-center justify-center bg-white/50 border-thin border-white">+</p>
          }

          {/* Third item */}

          {buildItems[2] ? 
            <button
              onClick={() => removeBuildItem(buildItems[2])}
              className="aspect-square w-full bg-cover flex items-center border-thin border-neutral rounded-sm"
              style={{ backgroundImage: `url(${buildItems[2].pic_url})` }}
            >
            </button>
          : 
            <p className="aspect-square w-full min-w-[40px] flex items-center justify-center bg-white/50 border-thin border-white">+</p>
          }

          {/* Fourth item */}

          {buildItems[3] ? 
            <button
              onClick={() => removeBuildItem(buildItems[3])}
              className="aspect-square w-full bg-cover flex items-center border-thin border-neutral rounded-sm"
              style={{ backgroundImage: `url(${buildItems[3].pic_url})` }}
            >
            </button>
          : 
            <p className="aspect-square w-full min-w-[40px] flex items-center justify-center bg-white/50 border-thin border-white">+</p>
          }

          {/* Fifth item */}

          {buildItems[4] ? 
            <button
              onClick={() => removeBuildItem(buildItems[4])}
              className="aspect-square w-full bg-cover flex items-center border-thin border-neutral rounded-sm"
              style={{ backgroundImage: `url(${buildItems[4].pic_url})` }}
            >
            </button>
          : 
            <p className="aspect-square w-full min-w-[40px] flex items-center justify-center bg-white/50 border-thin border-white">+</p>
          }

          {/* Sixth item */}

          {buildItems[5] ? 
            <button
              onClick={() => removeBuildItem(buildItems[5])}
              className="aspect-square w-full bg-cover flex items-center border-thin border-neutral rounded-sm"
              style={{ backgroundImage: `url(${buildItems[5].pic_url})` }}
            >
            </button>
          : 
            <p className="aspect-square w-full min-w-[40px] flex items-center justify-center bg-white/50 border-thin border-white">+</p>
          }

          {/* selected god container */}

          {selectedGod ?
            <button 
              style={{ backgroundImage: `url(${selectedGod.pic_url})` }}
              className="aspect-square w-full bg-cover border-thin border-primaryFontColor rounded-sm self-start col-start-4 row-start-1"
              >
            </button>
          :
            <button 
              className="aspect-square w-full border-thin border-primaryFontColor rounded-sm self-start col-start-4 row-start-1 text-sm"
              >
                no god selected
            </button>
          }
            {currentUserId ?
              <button 
              className="w-full border-thin border-primaryFontColor rounded-full col-start-4 row-start-2 p-2 bg-secondaryBgColor text-sm "
              >
                Save
              </button>
            :
              <button 
                className="aspect-square w-full border-thin border-primaryFontColor rounded-sm col-start-1 row-start-2 md:col-start-auto"
                >
                  Login to save
              </button>
            }
            </div>
        </div>      
      
        {/* Gods or Items switch */}

      <div className='w-3/5 flex items-center justify-center gap-4 text-neutral my-3'>
        <h4>Viewing:</h4>
        <div className='flex gap-2'>
          <label>Items</label>
          <input type='checkbox' checked={isChecked} onChange={handleChange} />
        </div>
        <div className='flex gap-2'>
          <label>Gods</label>
          <input type='checkbox' checked={!isChecked} onChange={handleChange}/>
        </div>
      </div>
      
        {isLoading ?
          <h2 className='text-neutral text-3xl m-auto'>Loading items...</h2>
          :
          <div className='w-11/12 flex flex-col items-center'> 
          {isChecked ?
            <Items addToBuild={addBuildItem} />
            :
            <Gods selectGod={selectGod} />
            }
          </div>
          }
      
    </div>
  )
}
