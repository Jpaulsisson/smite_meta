"use client";

import React, { useEffect, useState } from 'react';
import { useDataContext, Item } from '@/contexts/data.context';
import { useUserContext } from '@/contexts/user.context';
import Items from '@/components/Items/Items.component';

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
  const [values, setValues] = useState({
    user_id: currentUserId,
    item_1_id: null,
    item_2_id: null,
    item_3_id: null,
    item_4_id: null,
    item_5_id: null,
    item_6_id: null,
    god_id: null
  });

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

    const removeBuildItem = (item: Item) => {
      const target = buildItems.find(target => target.id === item.id);
      const newBuildItems = buildItems.filter(item => item.id !== target!.id);
      setBuildItems(newBuildItems)
    }

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

      */}
      {/* Ideas:
          - maybe have a conditionally rendered header at the top if a god is selected and have the backgournd behind the build be the god card if one is selected or just transparent if no god is selected
      */}
      
      {/* Build items containers + optional god name header */}

      <div className='flex flex-col'>

        {/* optional god header */}

        {values.god_id ? 
          <h2 className='text-neutral text-4xl'>{}</h2>
        :
          <h2 className='hidden'></h2>
        }

        {/* build item containers */}

        <div className='text-xl text-white grid grid-cols-3 gap-4'>
                {buildItems[0] ? 
                  <button
                    onClick={() => removeBuildItem(buildItems[0])}
                    className="aspect-square w-full max-w-[40px]"
                    style={{ backgroundImage: `url(${buildItems[0].pic_url})` }}
                  >
                    {buildItems[0].name}
                  </button>
                : 
                  <p className="aspect-square w-full min-w-[40px] flex items-center justify-center bg-white/50 border-thin border-white">+</p>
                }
                {buildItems[1] ? 
                  <button
                    onClick={() => removeBuildItem(buildItems[1])}
                    className="aspect-square w-full max-w-[40px]"
                    style={{ backgroundImage: `url(${buildItems[1].pic_url})` }}
                  >
                    {buildItems[1].name}
                  </button>
                : 
                  <p className="aspect-square w-full min-w-[40px] flex items-center justify-center bg-white/50 border-thin border-white">+</p>
                }
                {buildItems[2] ? 
                  <button
                    onClick={() => removeBuildItem(buildItems[2])}
                    className="aspect-square w-full max-w-[40px]"
                    style={{ backgroundImage: `url(${buildItems[2].pic_url})` }}
                  >
                    {buildItems[2].name}
                  </button>
                : 
                  <p className="aspect-square w-full min-w-[40px] flex items-center justify-center bg-white/50 border-thin border-white">+</p>
                }
                {buildItems[3] ? 
                  <button
                    onClick={() => removeBuildItem(buildItems[3])}
                    className="aspect-square w-full max-w-[40px]"
                    style={{ backgroundImage: `url(${buildItems[3].pic_url})` }}
                  >
                    {buildItems[3].name}
                  </button>
                : 
                  <p className="aspect-square w-full min-w-[40px] flex items-center justify-center bg-white/50 border-thin border-white">+</p>
                }
                {buildItems[4] ? 
                  <button
                    onClick={() => removeBuildItem(buildItems[4])}
                    className="aspect-square w-full max-w-[40px]"
                    style={{ backgroundImage: `url(${buildItems[4].pic_url})` }}
                  >
                    {buildItems[4].name}
                  </button>
                : 
                  <p className="aspect-square w-full min-w-[40px] flex items-center justify-center bg-white/50 border-thin border-white">+</p>
                }
                {buildItems[5] ? 
                  <button
                    onClick={() => removeBuildItem(buildItems[5])}
                    className="aspect-square w-full max-w-[40px]"
                    style={{ backgroundImage: `url(${buildItems[5].pic_url})` }}
                  >
                    {buildItems[5].name}
                  </button>
                : 
                  <p className="aspect-square w-full min-w-[40px] flex items-center justify-center bg-white/50 border-thin border-white">+</p>
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
            <div className='w-4/5 grid grid-cols-10 gap-2'>
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
          }
      
    </div>
  )
}
