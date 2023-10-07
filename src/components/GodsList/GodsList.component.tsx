"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDataContext } from '@/contexts/data.context';
import Image from 'next/image';
import DropdownArrow from '@/resources/arrow-down.svg';
import { God } from '@/contexts/data.context';

const radioButtons = [
  { role: 'Mage', label: 'Mages'},
  { role: 'Hunter', label: 'Hunters'},
  { role: 'Assassin', label: 'Assassins'},
  { role: 'Warrior', label: 'Warriors'},
  { role: 'Guardian', label: 'Guardians'},
]

export default function GodsList({ selectGod }: any) {

  const { gods } = useDataContext();

  const [godSearch, setGodSearch] = useState('');
  const [godFilter, setGodFilter] = useState('all');
  const [currentlyViewedGods, setCurrentlyViewedGods] = useState(gods);

  // Filter by search bar
  useEffect(() => {
    const filteredGods = gods?.filter((god) => god.role === godFilter);
    const result = filteredGods?.filter((god) => god.name.toLowerCase().includes(godSearch))
    setCurrentlyViewedGods(result);
  }, [godFilter, gods, godSearch])

  const searchAllGods = gods?.filter((god) => god.name.toLowerCase().includes(godSearch))


  const handleGodSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setGodSearch(input);
  }

  return (
    <div className="w-full flex flex-col items-center justify-center">

      {/* search bar */}

      <input
        className="w-full md:w-1/2 p-2 mb-3 rounded-sm bg-neutral"
        type="text"
        value={godSearch}
        onChange={handleGodSearch}
        placeholder="Search Gods"
      />

      {/* filter inputs */}

      <fieldset className='w-full md:w-1/2 grid grid-cols-3 md:grid-cols-6 border-thin border-white text-white p-2 mb-4 bg-secondaryBgColor rounded-sm'>
        <legend className='ml-4 p-1 text-xl'>Filter Gods:</legend>
        <div className='text-neutral flex flex-col items-center gap-1' >
          <input type="radio" id='all' value='all' name="god-type" defaultChecked onChange={() => setGodFilter('all')}/>
          <label htmlFor='all'>All Gods</label>
        </div>
        {radioButtons.map((button) => {
          return (
            <div key={button.role} className='text-neutral flex flex-col items-center gap-1' >
              <input type="radio" id={button.role} name="god-type" value={button.role} onChange={() => setGodFilter(button.role)}/>
              <label htmlFor={button.role}>{button.label}</label>
            </div>
          )
        })
          }
      </fieldset>

      {/* gods */}
      
      <div className="w-full grid grid-cols-4 md:grid-cols-10 gap-2">
        {godFilter === 'all' ?
          <>
            {searchAllGods?.map((god) => {
              const { id, pic_url, name } = god;
              return (
                <div key={id} className="text-neutral text-sm md:text-base active:brightness-50">
                  <button
                    onClick={() => selectGod(id)}
                    style={{ backgroundImage: `url(${pic_url})` }}
                    className="flex flex-col items-center w-full aspect-square border-thin border-neutral rounded-sm bg-cover bg-top"
                  ></button>
                  <h2>{name}</h2>
                </div>
              );
              })} 
          </>
          :
          <>
            {currentlyViewedGods?.map((god) => {
              const { id, pic_url, name } = god;
              return (
                <div key={id} className="text-neutral text-sm md:text-base active:brightness-50" >
                  <button
                    onClick={() => selectGod(id)}
                    style={{ backgroundImage: `url(${pic_url})`}}
                    className="flex flex-col items-center w-full aspect-square border-thin border-neutral rounded-sm bg-cover bg-top"
                  >
                  </button>
                  <h2>{name}</h2>
                </div>
                );
              })} 
          </>
        }
      </div>

    </div>
  );
}
