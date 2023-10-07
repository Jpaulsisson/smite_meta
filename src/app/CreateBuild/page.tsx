"use client";

import React, { useEffect, useState } from 'react';
import { useDataContext, Item, God } from '@/contexts/data.context';
import { useUserContext } from '@/contexts/user.context';
import ItemsList from '@/components/ItemsList/ItemsList.component';
import RatItemsList from '@/components/RatItemsList/RatItemsList.component';
import GodsList from '@/components/GodsList/GodsList.component';
import { buildStatsCalculator, godStatsCalculator, combineStats, itemWarningHelper } from './buildCalculator';
import Image from 'next/image';
import DropdownArrow from '@/resources/arrow-down.svg';
import { addBuild } from '@/database/supabase';
import SignIn from '@/components/SignIn/SignIn.component';

export default function CreateBuild() {

  // Context variable declarations
  const { gods, items } = useDataContext();
  const { currentUserId } = useUserContext();

  // Loading state
  useEffect(() => {
    if (items) {
      setIsLoading(false);
    }
  }, [items])

  // State variable declarations
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(true);
  const [buildItems, setBuildItems] = useState<Item[]>([]);
  const [selectedGod, setSelectedGod] = useState<God | null>(null);
  const [buildStats, setBuildStats] = useState({
      physical_power:  0,
      magical_power:  0,
      critical_strike_chance: 0,
      physical_lifesteal: 0,
      magical_lifesteal:  0,
      physical_percent_penetration:  0,
      magical_percent_penetration:  0,
      physical_flat_penetration:  0,
      magical_flat_penetration:  0,
      attack_speed:  0,
      basic_attack_damage:  0,
      hp5:  0,
      mp5:  0,
      health:  0,
      mana:  0,
      speed:  0,
      physical_protection:  0,
      magical_protection:  0,
      damage_reduction:  0,
      cooldown_reduction:  0,
      crowd_control_reduction:  0,
    })
  const [buildStatsDropdown, setBuildStatsDropdown] = useState('active');
  const [buildPassivesDropdown, setBuildPassivesDropdown] = useState('active');
  const [itemWarning, setItemWarning] = useState(false);
  const [starterWarning, setStarterWarning] = useState(false);

  // Set item type warning
  useEffect(() => {
    const { physical_power_base, magical_power_base } = itemWarningHelper(items as Item[], buildItems as Item[]);
    const { physical_power, magical_power } = buildStats;

    if (physical_power > physical_power_base && magical_power > magical_power_base) setItemWarning(true);
    else setItemWarning(false);
    
  }, [buildStats, buildItems, items]);
  
  // Set starter warning
  useEffect(() => {
    let count = 0;
    buildItems.forEach((item) => {
      if (item.starter === true) count += 1;
    })
    if (count > 1) setStarterWarning(true);
    if (count < 1) setStarterWarning(false);
    
  }, [buildItems]);

  // Keep build stats up-to-date with state changes
  useEffect(() => {
    const currentBuildStats = buildStatsCalculator(buildItems);
    const currentGodStats = selectedGod ? godStatsCalculator(selectedGod) : null;
    if (!currentGodStats) setBuildStats(currentBuildStats);
    if (currentGodStats) {
      const combinedStats = combineStats(currentBuildStats, currentGodStats);
      setBuildStats(combinedStats);
    }
  }, [buildItems, selectedGod]);

  // Add build to database
  const addUserBuildToDatabase = async () => {
    const values = {
      user_id: currentUserId,
      item_1_id: buildItems[0]?.id || null,
      item_2_id: buildItems[1]?.id || null,
      item_3_id: buildItems[2]?.id || null,
      item_4_id: buildItems[3]?.id || null,
      item_5_id: buildItems[4]?.id || null,
      item_6_id: buildItems[5]?.id || null,
      god_id: selectedGod?.id || null,
    };

    console.log(values);
    await addBuild(values);

// add setTimeout() to flash a saved icon up after this is clicked and returns a response
// will need state to store variable 

    console.log('added')
  }

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
    };

  // Remove an item from the buildItems state array
  const removeBuildItem = (item: Item) => {
    const target = buildItems.find(target => target.id === item.id);
    const newBuildItems = buildItems.filter(item => item.id !== target!.id);
    setBuildItems(newBuildItems)
  };

  // Select a god
  const selectGod = (god_id: number) => {
    const target = gods?.find(god => god.id === god_id);
    if (target) setSelectedGod(target);
  };

  // Toggle stats dropdown
  const handleToggleBuildStatsDropdown = () => {
    buildStatsDropdown === '' ? setBuildStatsDropdown('active') : setBuildStatsDropdown('');
  };

  // Toggle passives dropdown
  const handleToggleBuildPassivesDropdown = () => {
    buildPassivesDropdown === '' ? setBuildPassivesDropdown('active') : setBuildPassivesDropdown('');
  }

  // Switch between viewing items or gods
  function handleViewChange() {
    setIsChecked((prev) => !prev);
  }


  return (
    <div className='w-full flex flex-col items-center justify-center mt-4'>
      {/* Goals: 
          - save build button / sign up & login to save builds button
      */}
    <button onClick={() => console.log(itemWarningSetter(items, buildItems))}>Log what you need</button>
      {/* Build items containers + optional god name header */}

      <div className='flex flex-col w-full items-center'>

        {/* God name header */}

        {selectedGod && 
          <h2 className='text-neutral'>{selectedGod.name} build (level 20)</h2>
        }

        {/* Item warning */}

        {itemWarning &&
          <p className='text-red-500 text-xs'>* Warning: Gods must use items of same type</p>}
        
        {/* Starter warning */}

        {starterWarning &&
          <p className='text-red-500 text-xs'>* Warning: Only one starter item is allowed</p>}
          
          {/* Build item containers */}

        <div className=' w-11/12 md:w-1/2 text-neutral grid grid-cols-4 md:flex gap-4 p-2'>

          {/* First item */}

          {buildItems[0] ? 
            <button
              onClick={() => removeBuildItem(buildItems[0])}
              className="aspect-square w-full bg-cover bg-center flex items-center border-thin border-neutral rounded-sm"
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
              className="aspect-square w-full bg-cover bg-center flex items-center border-thin border-neutral rounded-sm"
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
              className="aspect-square w-full bg-cover bg-center flex items-center border-thin border-neutral rounded-sm"
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
              className="aspect-square w-full bg-cover bg-center flex items-center border-thin border-neutral rounded-sm"
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
              className="aspect-square w-full bg-cover bg-center flex items-center border-thin border-neutral rounded-sm"
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
              className="aspect-square w-full bg-cover bg-center flex items-center border-thin border-neutral rounded-sm"
              style={{ backgroundImage: `url(${buildItems[5].pic_url})` }}
            >
            </button>
          : 
            <p className="aspect-square w-full min-w-[40px] flex items-center justify-center bg-white/50 border-thin border-white">+</p>
          }

          {/* Selected god */}

          {selectedGod ?
            <button 
              onClick={() => setSelectedGod(null)}
              style={{ backgroundImage: `url(${selectedGod.pic_url})` }}
              className="aspect-square w-full bg-cover bg-top border-2 p-2 border-primaryFontColor rounded-sm self-start col-start-4 row-start-1"
              >
            </button>
          :
            <button 
              className="aspect-square w-full border-2 p-2 border-primaryFontColor rounded-sm self-start col-start-4 row-start-1 text-sm"
              >
                no god selected
            </button>
          }
            {currentUserId ?
              <button 
              onClick={addUserBuildToDatabase}
              className="w-full border-thin border-primaryFontColor rounded-full col-start-4 row-start-2 p-2 bg-secondaryBgColor text-sm"
              >
                Save
              </button>
            :
            <div className='border-thin border-primaryFontColor flex flex-col items-center justify-center w-full'>
              <SignIn />
              to save
            </div>
            }
            </div>
        </div>     

        {/* Build stats dropdown */}

        <div className='w-11/12 md:w-1/2 text-neutral bg-secondaryBgColor rounded-sm mt-2 p-2'>
          <button 
            onClick={handleToggleBuildStatsDropdown}
            className='text-center text-lg w-full flex items-center justify-center gap-2'>
            Build Stats
            <Image
              src={DropdownArrow}
              alt="dropdown arrow"
              width={15}
              className={`
              transition-all duration-300
              ${
                buildStatsDropdown === 'active'
                  ? 'rotate-0 mix-blend-difference'
                  : '-rotate-90 '
              }`}
          />
          </button>
          <div className={`${buildStatsDropdown === 'active' ? ' grid' : 'hidden'} text-xs grid-cols-5 p-1 transition-all ease duration-500`}>
            <h3 className='border-l-primaryFontColor border-l-thin bg-slate-700 p-1'>Physical Power</h3>
            <h3 className='border-l-primaryFontColor border-l-thin bg-slate-700 p-1'>Physical Pen (Flat)</h3>
            <h3 className='border-l-primaryFontColor border-l-thin bg-slate-700 p-1'>Physical Pen (%)</h3>
            <h3 className='border-l-primaryFontColor border-l-thin bg-slate-700 p-1'>Physical Lifesteal</h3>
            <h3 className='border-l-primaryFontColor border-l-thin bg-slate-700 p-1'>Crit Chance</h3>
            <p className='border-primaryFontColor border-l-thin bg-slate-700 p-1' >
              {buildStats.physical_power} 
            </p>
            <p className='border-primaryFontColor border-l-thin bg-slate-700 p-1' >
              {buildStats.physical_flat_penetration} 
            </p>
            <p className='border-primaryFontColor border-l-thin bg-slate-700 p-1' >
              {buildStats.physical_percent_penetration} 
            </p>
            <p className='border-primaryFontColor border-l-thin bg-slate-700 p-1' >
              {buildStats.physical_lifesteal} 
            </p>
            <p className='border-primaryFontColor border-l-thin bg-slate-700 p-1' >
              {buildStats.critical_strike_chance} 
            </p>
            <h3 className='border-l-primaryFontColor border-l-thin p-1 bg-slate-900'>Magical Power</h3>
            <h3 className='border-l-primaryFontColor border-l-thin p-1 bg-slate-900'>Magical Pen (Flat)</h3>
            <h3 className='border-l-primaryFontColor border-l-thin p-1 bg-slate-900'>Magical Pen (%)</h3>
            <h3 className='border-l-primaryFontColor border-l-thin p-1 bg-slate-900'>Magical Lifesteal</h3>
            <h3 className='border-l-primaryFontColor border-l-thin p-1 bg-slate-900'>Attack Speed</h3>
            <p className='border-primaryFontColor border-l-thin bg-slate-900 p-1' >
              {buildStats.magical_power} 
            </p>
            <p className='border-primaryFontColor border-l-thin bg-slate-900 p-1' >
              {buildStats.magical_flat_penetration} 
            </p>
            <p className='border-primaryFontColor border-l-thin bg-slate-900 p-1' >
              {buildStats.magical_percent_penetration} 
            </p>
            <p className='border-primaryFontColor border-l-thin bg-slate-900 p-1' >
              {buildStats.magical_lifesteal} 
            </p>
            <p className='border-primaryFontColor border-l-thin bg-slate-900 p-1' >
              {buildStats.attack_speed.toFixed(2)} 
            </p>
            <h3 className='border-l-primaryFontColor border-l-thin bg-slate-700 p-1'>Health</h3>
            <h3 className='border-l-primaryFontColor border-l-thin bg-slate-700 p-1'>Mana</h3>
            <h3 className='border-l-primaryFontColor border-l-thin bg-slate-700 p-1'>HP5</h3>
            <h3 className='border-l-primaryFontColor border-l-thin bg-slate-700 p-1'>MP5</h3>
            <h3 className='border-l-primaryFontColor border-l-thin bg-slate-700 p-1'>Basic Damage</h3>
            <p className='border-primaryFontColor border-l-thin bg-slate-700 p-1' >
              {buildStats.health} 
            </p>
            <p className='border-primaryFontColor border-l-thin bg-slate-700 p-1' >
              {buildStats.mana} 
            </p>
            <p className='border-primaryFontColor border-l-thin bg-slate-700 p-1' >
              {buildStats.hp5} 
            </p>
            <p className='border-primaryFontColor border-l-thin bg-slate-700 p-1' >
              {buildStats.mp5} 
            </p>
            <p className='border-primaryFontColor border-l-thin bg-slate-700 p-1' >
              {buildStats.basic_attack_damage} 
            </p>
            <h3 className='border-l-primaryFontColor border-l-thin bg-slate-900 p-1'>Physical Protection</h3>
            <h3 className='border-l-primaryFontColor border-l-thin bg-slate-900 p-1'>Magical Protection</h3>
            <h3 className='border-l-primaryFontColor border-l-thin bg-slate-900 p-1'>Cooldown (%)</h3>
            <h3 className='border-l-primaryFontColor border-l-thin bg-slate-900 p-1'>CCR</h3>
            <h3 className='border-l-primaryFontColor border-l-thin bg-slate-900 p-1'>Movement Speed</h3>
            <p className='border-primaryFontColor border-l-thin bg-slate-900 p-1' >
              {buildStats.physical_protection} 
            </p>
            <p className='border-primaryFontColor border-l-thin bg-slate-900 p-1' >
              {buildStats.magical_protection} 
            </p>
            <p className='border-primaryFontColor border-l-thin bg-slate-900 p-1' >
              {buildStats.cooldown_reduction} 
            </p>
            <p className='border-primaryFontColor border-l-thin bg-slate-900 p-1' >
              {buildStats.crowd_control_reduction} 
            </p>
            <p className='border-primaryFontColor border-l-thin bg-slate-900 p-1' >
              {buildStats.speed} 
            </p>
            
          </div>
        </div>
      
        {/* Build passives dropdown */}

        {buildItems.length > 0 &&
          <div className='w-11/12 md:w-1/2 text-neutral bg-secondaryBgColor rounded-sm mt-2 p-2'>
            <button 
              onClick={handleToggleBuildPassivesDropdown}
              className='text-center text-lg w-full flex items-center justify-center gap-2'>
              Build Passives
              <Image
                src={DropdownArrow}
                alt="dropdown arrow"
                width={15}
                className={`
                transition-all duration-300
                ${
                  buildPassivesDropdown === 'active'
                    ? 'rotate-0 mix-blend-difference'
                    : '-rotate-90 '
                }`}
            />
            </button>
            <div className={`${buildPassivesDropdown === 'active' ? 'grid' : 'hidden'} text-xs md:text-sm p-1 transition-all ease duration-500`}>
              {buildItems.map((item) => {
                return <p key={item.id} className='mb-4' >{item.special}</p>
              })}
            </div>
          </div>
        }

        {/* Gods or items switch */}

      <div className='w-4/5 flex items-center justify-center gap-4 text-lg md:text-xl text-neutral my-3'>
        <h4>Select:</h4>
        <div className='flex gap-2'>
          <label>Items</label>
          <input type='checkbox' checked={isChecked} onChange={handleViewChange} />
        </div>
        <div className='flex gap-2'>
          <label>Gods</label>
          <input type='checkbox' checked={!isChecked} onChange={handleViewChange}/>
        </div>
      </div>
      
        {isLoading ?
          <h2 className='text-neutral text-3xl m-auto'>Loading items...</h2>
          :
          <div className='w-11/12 flex flex-col items-center mb-12'> 
          {isChecked ?
            <>
            {selectedGod?.name === "Ratatoskr" ?

              <RatItemsList addToBuild={addBuildItem} />
              :
              <ItemsList addToBuild={addBuildItem} />
            }
            </>
            :
            <GodsList selectGod={selectGod} />
            }
            
          </div>
          }
      
    </div>
  )
}
