'use client';

import './toastNotification.css';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect, useState } from 'react';
import { useDataContext, Item, God } from '@/contexts/data.context';
import { useUserContext } from '@/contexts/user.context';
import ItemsList from '@/components/ItemsList/ItemsList.component';
import RatItemsList from '@/components/RatItemsList/RatItemsList.component';
import GodsList from '@/components/GodsList/GodsList.component';
import {
  buildStatsCalculator,
  godStatsCalculator,
  combineStats,
  itemWarningHelper,
  starterWarningHelper,
  glyphWarningHelper,
  checkItemsForChildItemDupes
} from './buildLogicHelpers';
import Image from 'next/image';
import DropdownArrow from '@/resources/arrow-down.svg';
import FolderCheck from '@/resources/folder-check.svg';
import { addBuild } from '@/database/supabase';
import Link from 'next/link';



export default function CreateBuild() {

  // Context variable declarations
  const { gods, items } = useDataContext();
  const { currentUserId } = useUserContext();
  const router = useRouter();
  const searchParams = useSearchParams();

  // Loading state
  useEffect(() => {
    if (items) {
      setIsLoading(false);
    }
  }, [items]);

  // State variable declarations
  const [isLoading, setIsLoading] = useState(true);
  const [isChecked, setIsChecked] = useState(false);
  const [buildStatsDropdown, setBuildStatsDropdown] = useState('active');
  const [buildPassivesDropdown, setBuildPassivesDropdown] = useState('active');
  const [toast, setToast] = useState('');
  const [throttleBuildSave, setThrottleBuildSave] = useState(0);
  const [warnings, setWarnings] = useState({
    itemWarning: false,
    starterWarning: false,
    glyphWarning: false,
    childItemWarning: false,
  })

  // Current build from params and conversion to actual Item/God objects
  const currentGodId = searchParams.get('god');
  const currentGod = gods?.find(god => String(god.id) === currentGodId) || null;

  const currentBuildArray = searchParams.get('build')?.split(',');
  const currentBuild = currentBuildArray?.map((item_id) => {
    return items?.find((item) => String(item.id) === item_id);
  }) || [];
  ///////////////////////////////////////////////////////////////////

  const currentBuildStats = buildStatsCalculator(currentBuild as Item[]) || [];
  const currentGodStats = godStatsCalculator(currentGod as God) || null;
  const combinedStats = combineStats(currentBuildStats, currentGodStats);

  // Set item type warning
  const itemWarning = itemWarningHelper(items, currentBuild, combinedStats);

  // Set multiple starter item warning
  const starterWarning = starterWarningHelper(currentBuild);

  // Set multiple glyph item warning
  const glyphWarning = glyphWarningHelper(currentBuild);

  // Set dupe item/child item warning
  const childItemWarning = checkItemsForChildItemDupes(currentBuild);

  // Add build to database
  const addUserBuildToDatabase = async () => {
    // Throttling logic
    const current = Date.now();

    if (current - throttleBuildSave < 10000) {
      return alert('Build already saved');
    }

    setThrottleBuildSave(current);
    // End of throttling logic

    // Establish values to push to db
    const values = {
      user_id: currentUserId,
      item_1_id: currentBuild[0]?.id || null,
      item_2_id: currentBuild[1]?.id || null,
      item_3_id: currentBuild[2]?.id || null,
      item_4_id: currentBuild[3]?.id || null,
      item_5_id: currentBuild[4]?.id || null,
      item_6_id: currentBuild[5]?.id || null,
      god_id: currentGod?.id || null,
    };

    // Send the values and await response
    const response = await addBuild(values);

    setToast('active');
    setTimeout(() => setToast(''), 1000);

    return response;
  };

  // Add an item to the currentBuild array
  const addBuildItem = (item_id: number) => {
    const currentBuild = searchParams.get('build')?.split(',') || []; 

    const target = items?.find((item) => item.id === item_id);

    // error or manual user input guard
    if (!target) {
      return;
    }

    if (target !== undefined) {
      if (currentBuild.includes(String(target.id))) {
        return;
      }

      if (currentBuild.length < 6) {
        const godQuery = searchParams.get('god');
        const newBuild = currentBuild[0] === 'null' ? [String(target.id)] : [...currentBuild, String(target.id)]
        const newBuildQuery = newBuild.join(',');

        router.push(`?build=${newBuildQuery}&god=${godQuery}`, { scroll: false })
      }
    }
    return;
  };

  // Remove an item from the currentBuild array
  const removeBuildItem = (item: Item) => {
    
    // grab current query string information
    const godQuery = searchParams.get('god');
    const currentBuild = (searchParams.get('build') as string).split(',');

    // create new query string information
    const newCurrentBuild = currentBuild.filter((item_id) => item_id !== String(item.id));

    // convert new query string info into string
    const newBuildQuery = newCurrentBuild.length < 1 ? 'null' : newCurrentBuild.join(',');

    router.push(`?build=${newBuildQuery}&god=${godQuery}`, { scroll: false })
  };

  // Select a god and add to the build
  const selectGod = (god_id: number) => {
    // grab current query string
    const currentBuildQuery = searchParams.get('build');

    // add god_id to current query string
    router.push(`?build=${currentBuildQuery}&god=${String(god_id)}`, {scroll: false});
  };

  // Remove selected god
  const removeGod = () => {
    // grab current query string
    const currentBuildQuery = searchParams.get('build');

    // set god to null
    router.push(`?build=${currentBuildQuery}&god=null`, { scroll: false })
  }

  // Toggle build stats dropdown
  const handleToggleBuildStatsDropdown = () => {
    buildStatsDropdown === ''
      ? setBuildStatsDropdown('active')
      : setBuildStatsDropdown('');
  };

  // Toggle build passives dropdown
  const handleToggleBuildPassivesDropdown = () => {
    buildPassivesDropdown === ''
      ? setBuildPassivesDropdown('active')
      : setBuildPassivesDropdown('');
  };

  // Switch between viewing items or gods
  function handleViewChange() {
    setIsChecked((prev) => !prev);
  }

  const warningsCheck = [itemWarning, starterWarning, glyphWarning, childItemWarning].every(warning => warning === false);

  return (
    <div className="w-full flex flex-col items-center justify-center mt-4">

      {/* Build items containers + optional god name header */}

      <div className="flex flex-col w-full items-center">
        {/* God name header */}

        {currentGod && (
          <h2 className="text-neutral">{currentGod.name} build (level 20)</h2>
        )}

        {/* Item warning */}

        {itemWarning && (
          <>
            <p className="text-red-500 text-xs text-center">
              * Warning: Gods must use items of same type
            </p>
            <p className="text-red-500 text-xs text-center">
              * Select a god first to auto-filter items appropriately
            </p>
          </>
        )}

        {/* Starter warning */}

        {starterWarning && (
          <p className="text-red-500 text-xs text-center">
            * Warning: Only one starter item is allowed
          </p>
        )}

        {/* Glyph warning */}

        {glyphWarning && (
          <p className="text-red-500 text-xs text-center">
            * Warning: Only one glyph upgrade is allowed
          </p>
        )}
        
        {/* Child item warning */}

        {childItemWarning && (
          <>
            <p className="text-red-500 text-xs text-center">
              * Warning: You have a tier 4 item and it&apos;s child item in the build
            </p>
            <p className="text-red-500 text-xs text-center p-2">
              * This is MOST LIKELY due to an evolved item and it&apos;s unevolved form in the same build OR a glyph item and it&apos;s un-glyph form which is not allowed in Smite.
            </p>
          </>
          
        )}

        {/* Build item containers */}

        <div className=" w-11/12 md:w-1/2 text-neutral grid grid-cols-4 md:flex gap-4 p-2">
          {/* First item */}

          {currentBuild[0] ? (
            <button
              onClick={() => removeBuildItem(currentBuild[0] as Item)}
              className="aspect-square w-full bg-cover bg-center flex items-center border-thin border-neutral rounded-sm"
              style={{ backgroundImage: `url(${currentBuild[0].pic_url})` }}
            ></button>
          ) : (
            <p className="aspect-square w-full min-w-[40px] flex items-center justify-center bg-white/50 border-thin border-white">
              +
            </p>
          )}

          {/* Second item */}

          {currentBuild[1] ? (
            <button
              onClick={() => removeBuildItem(currentBuild[1] as Item)}
              className="aspect-square w-full bg-cover bg-center flex items-center border-thin border-neutral rounded-sm"
              style={{ backgroundImage: `url(${currentBuild[1].pic_url})` }}
            ></button>
          ) : (
            <p className="aspect-square w-full min-w-[40px] flex items-center justify-center bg-white/50 border-thin border-white">
              +
            </p>
          )}

          {/* Third item */}

          {currentBuild[2] ? (
            <button
              onClick={() => removeBuildItem(currentBuild[2] as Item)}
              className="aspect-square w-full bg-cover bg-center flex items-center border-thin border-neutral rounded-sm"
              style={{ backgroundImage: `url(${currentBuild[2].pic_url})` }}
            ></button>
          ) : (
            <p className="aspect-square w-full min-w-[40px] flex items-center justify-center bg-white/50 border-thin border-white">
              +
            </p>
          )}

          {/* Fourth item */}

          {currentBuild[3] ? (
            <button
              onClick={() => removeBuildItem(currentBuild[3] as Item)}
              className="aspect-square w-full bg-cover bg-center flex items-center border-thin border-neutral rounded-sm"
              style={{ backgroundImage: `url(${currentBuild[3].pic_url})` }}
            ></button>
          ) : (
            <p className="aspect-square w-full min-w-[40px] flex items-center justify-center bg-white/50 border-thin border-white">
              +
            </p>
          )}

          {/* Fifth item */}

          {currentBuild[4] ? (
            <button
              onClick={() => removeBuildItem(currentBuild[4] as Item)}
              className="aspect-square w-full bg-cover bg-center flex items-center border-thin border-neutral rounded-sm"
              style={{ backgroundImage: `url(${currentBuild[4].pic_url})` }}
            ></button>
          ) : (
            <p className="aspect-square w-full min-w-[40px] flex items-center justify-center bg-white/50 border-thin border-white">
              +
            </p>
          )}

          {/* Sixth item */}

          {currentBuild[5] ? (
            <button
              onClick={() => removeBuildItem(currentBuild[5] as Item)}
              className="aspect-square w-full bg-cover bg-center flex items-center border-thin border-neutral rounded-sm"
              style={{ backgroundImage: `url(${currentBuild[5].pic_url})` }}
            ></button>
          ) : (
            <p className="aspect-square w-full min-w-[40px] flex items-center justify-center bg-white/50 border-thin border-white">
              +
            </p>
          )}

          {/* Selected god */}

          {currentGod ? (
            <button
              onClick={removeGod}
              style={{ backgroundImage: `url(${currentGod.pic_url})` }}
              className="aspect-square w-full bg-cover bg-top border-2 p-2 border-primaryFontColor rounded-sm self-start col-start-4 row-start-1"
            ></button>
          ) : (
            <button className="aspect-square w-full border-2 p-2 border-primaryFontColor rounded-sm self-start col-start-4 row-start-1 text-sm">
              no god selected
            </button>
          )}

          {/* Save build button */}

          {currentUserId ? (
            <button
              disabled={!warningsCheck}
              onClick={addUserBuildToDatabase}
              className="relative w-full border-thin border-primaryFontColor rounded-full col-start-4 row-start-2 p-2 bg-accentBg text-sm flex items-center justify-center active:brightness-50 disabled:brightness-50 disabled:bg-stone-500 disabled:border-slate-600"
            >
              {warningsCheck ? 
              <span>Save build</span> : <span>Cancel That!</span>}

              <Image
                src={FolderCheck}
                alt="folder with check"
                width={35}
                height={35}
                id="toast"
                className={`${
                  toast === 'active' ? 'block' : 'hidden'
                } absolute inset-0 m-auto bg-green-200 border-thin border-primaryFontColor rounded-full w-full aspect-square p-4`}
              />
            </button>
          ) : (
            <Link href={'/SignUp'} className="border-thin border-primaryFontColor flex flex-col items-center justify-center w-full text-center p-2">
              Sign up to save
            </Link>
          )}
        </div>
      </div>

      {/* Build stats dropdown */}

      <div className="w-11/12 md:w-1/2 text-neutral bg-accentBg rounded-sm mt-2 p-2">
        
        {/* Dropdown toggler */}

        <button
          onClick={handleToggleBuildStatsDropdown}
          className="text-center text-lg w-full flex items-center justify-center gap-2"
        >
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

        {/* Build stats table */}

        <div
          className={`${
            buildStatsDropdown === 'active' ? ' grid' : 'hidden'
          } text-xs md:text-sm md:tracking-wide grid-cols-5 p-1 transition-all ease duration-500`}
        >
          <h3 className="border-l-primaryFontColor border-l-thin bg-slate-700 p-1">
            Physical Power
          </h3>
          <h3 className="border-l-primaryFontColor border-l-thin bg-slate-700 p-1">
            Physical Pen (Flat)
          </h3>
          <h3 className="border-l-primaryFontColor border-l-thin bg-slate-700 p-1">
            Physical Pen (%)
          </h3>
          <h3 className="border-l-primaryFontColor border-l-thin bg-slate-700 p-1">
            Physical Lifesteal
          </h3>
          <h3 className="border-l-primaryFontColor border-l-thin bg-slate-700 p-1">
            Crit Chance
          </h3>
          <p className="border-primaryFontColor border-l-thin bg-slate-700 p-1">
            {combinedStats.physical_power}
          </p>
          <p className="border-primaryFontColor border-l-thin bg-slate-700 p-1">
            {combinedStats.physical_flat_penetration}
          </p>
          <p className="border-primaryFontColor border-l-thin bg-slate-700 p-1">
            {combinedStats.physical_percent_penetration}%
          </p>
          <p className="border-primaryFontColor border-l-thin bg-slate-700 p-1">
            {combinedStats.physical_lifesteal}%
          </p>
          <p className="border-primaryFontColor border-l-thin bg-slate-700 p-1">
            {combinedStats.critical_strike_chance}%
          </p>
          <h3 className="border-l-primaryFontColor border-l-thin p-1 bg-slate-900">
            Magical Power
          </h3>
          <h3 className="border-l-primaryFontColor border-l-thin p-1 bg-slate-900">
            Magical Pen (Flat)
          </h3>
          <h3 className="border-l-primaryFontColor border-l-thin p-1 bg-slate-900">
            Magical Pen (%)
          </h3>
          <h3 className="border-l-primaryFontColor border-l-thin p-1 bg-slate-900">
            Magical Lifesteal
          </h3>
          <h3 className="border-l-primaryFontColor border-l-thin p-1 bg-slate-900">
            Attack Speed
          </h3>
          <p className="border-primaryFontColor border-l-thin bg-slate-900 p-1">
            {combinedStats.magical_power}
          </p>
          <p className="border-primaryFontColor border-l-thin bg-slate-900 p-1">
            {combinedStats.magical_flat_penetration}
          </p>
          <p className="border-primaryFontColor border-l-thin bg-slate-900 p-1">
            {combinedStats.magical_percent_penetration}%
          </p>
          <p className="border-primaryFontColor border-l-thin bg-slate-900 p-1">
            {combinedStats.magical_lifesteal}%
          </p>
          <p className="border-primaryFontColor border-l-thin bg-slate-900 p-1">
            {combinedStats.attack_speed.toFixed(2)}/sec
          </p>
          <h3 className="border-l-primaryFontColor border-l-thin bg-slate-700 p-1">
            Health
          </h3>
          <h3 className="border-l-primaryFontColor border-l-thin bg-slate-700 p-1">
            Mana
          </h3>
          <h3 className="border-l-primaryFontColor border-l-thin bg-slate-700 p-1">
            HP5
          </h3>
          <h3 className="border-l-primaryFontColor border-l-thin bg-slate-700 p-1">
            MP5
          </h3>
          <h3 className="border-l-primaryFontColor border-l-thin bg-slate-700 p-1">
            Basic Damage
          </h3>
          <p className="border-primaryFontColor border-l-thin bg-slate-700 p-1">
            {combinedStats.health}
          </p>
          <p className="border-primaryFontColor border-l-thin bg-slate-700 p-1">
            {combinedStats.mana}
          </p>
          <p className="border-primaryFontColor border-l-thin bg-slate-700 p-1">
            {combinedStats.hp5}
          </p>
          <p className="border-primaryFontColor border-l-thin bg-slate-700 p-1">
            {combinedStats.mp5}
          </p>
          <p className="border-primaryFontColor border-l-thin bg-slate-700 p-1">
            {combinedStats.basic_attack_damage}
          </p>
          <h3 className="border-l-primaryFontColor border-l-thin bg-slate-900 p-1">
            Physical Protection
          </h3>
          <h3 className="border-l-primaryFontColor border-l-thin bg-slate-900 p-1">
            Magical Protection
          </h3>
          <h3 className="border-l-primaryFontColor border-l-thin bg-slate-900 p-1">
            Cooldown (%)
          </h3>
          <h3 className="border-l-primaryFontColor border-l-thin bg-slate-900 p-1">
            CCR
          </h3>
          <h3 className="border-l-primaryFontColor border-l-thin bg-slate-900 p-1">
            Movement Speed
          </h3>
          <p className="border-primaryFontColor border-l-thin bg-slate-900 p-1">
            {combinedStats.physical_protection}
          </p>
          <p className="border-primaryFontColor border-l-thin bg-slate-900 p-1">
            {combinedStats.magical_protection}
          </p>
          <p className="border-primaryFontColor border-l-thin bg-slate-900 p-1">
            {combinedStats.cooldown_reduction}%
          </p>
          <p className="border-primaryFontColor border-l-thin bg-slate-900 p-1">
            {combinedStats.crowd_control_reduction}%
          </p>
          <p className="border-primaryFontColor border-l-thin bg-slate-900 p-1">
            +{combinedStats.speed}%
          </p>
        </div>
      </div>

      {/* Build passives dropdown */}

      {currentBuild.length > 0 && (
        <div className="w-11/12 md:w-1/2 text-neutral bg-accentBg rounded-sm mt-2 p-2">
          <button
            onClick={handleToggleBuildPassivesDropdown}
            className="text-center text-lg w-full flex items-center justify-center gap-2"
          >
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
          <div
            className={`${
              buildPassivesDropdown === 'active' ? 'grid' : 'hidden'
            } text-xs md:text-sm p-1 transition-all ease duration-500`}
          >
            {currentBuild.map((item, index) => {
              return (
                <p key={index} className="mb-4">
                  {item?.special}
                </p>
              );
            })}
          </div>
        </div>
      )}

      {/* Gods or items switch */}

      <div className="w-4/5 flex items-center justify-center gap-10 text-lg md:text-xl text-neutral my-3">
        <h4>Select:</h4>
        <div className="flex gap-2">
          <button onClick={handleViewChange} className={`${isChecked ? 'bg-neutral text-primaryBg' : null} px-4 py-1 rounded-md `}>Items</button>
        </div>
        <div className="flex gap-2">
          <button onClick={handleViewChange} className={`${!isChecked ? 'bg-neutral text-primaryBg' : null} px-4 py-1 rounded-md `}>Gods</button>
        </div>
      </div>

      {isLoading ? (
        <h2 className="text-neutral text-3xl m-auto">Loading items...</h2>
      ) : (
        <div className="w-11/12 flex flex-col items-center mb-12">
          {isChecked ? (
            <>
              {currentGod?.name === 'Ratatoskr' ? (
                <RatItemsList addToBuild={addBuildItem} selectedGod={currentGod} />
              ) : (
                <ItemsList addToBuild={addBuildItem} selectedGod={currentGod} />
              )}
            </>
          ) : (
              <GodsList selectGod={selectGod} />
          )}
        </div>
      )}
    </div>
  );
}
