"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { useDataContext } from '@/contexts/data.context';
import Image from 'next/image';
import { Item } from '@/contexts/data.context';


export default function Items() {
  // Bring in the item info
  const { items } = useDataContext();

  // Sort the items (they are already alphabetical)
  // Only allow active items
  const activeItems = items?.filter((item) => item.active_status && item.tier >= 3 && item.type === 'Item' && !item.name.includes('Acorn'));

  const [currentlyViewedItems, setCurrentlyViewedItems] = useState<Item[] | undefined>([]);
  const [itemSearch, setItemSearch] = useState('');
  const [currentFilters, setCurrentFilters] = useState<string[]>([]);
  const [filterOptions, setFilterOptions] = useState({
    'Physical Power': false,
    'Magical Power': false,
    'Attack Speed': false,
    'Physical Lifesteal': false,
    'Magical Lifesteal': false,
    'Physical Protection': false,
    'Magical Protection': false,
    'Health': false,
    'Mana': false,
    'Cooldown Reduction': false,
    'Crowd Control Reduction': false,
    'Movement Speed': false,
  });
  
  // // Filter by search bar
  const searchAllItems = activeItems?.filter((item) => item.name.toLowerCase().includes(itemSearch))
  

  const arrayOfItems = []

  // Keeping track of the current filters to use
  useEffect(() => {
    const currentOptions = Object.entries(filterOptions).filter((pair) => pair[1] === true);
    const selectedOptions = currentOptions.map((option) => option[0]);
    setCurrentFilters(selectedOptions);
  }, [filterOptions]);

  // Update shown items based on current filters
  useEffect(() => {
    function matchesAllFilters(item: Item) {
      const statDescriptions = [
          item.stat_1_desc,
          item.stat_2_desc,
          item.stat_3_desc,
          item.stat_4_desc,
          item.stat_5_desc,
          item.stat_6_desc
      ];
      return currentFilters.every(filter => statDescriptions.includes(filter));
  }
  const allItems = items?.filter((item) => item.active_status && item.tier >= 3 && item.type === 'Item' && !item.name.includes('Acorn'));
  const filteredItems = allItems?.filter(item => matchesAllFilters(item));
  const searchBarFilteredItems = filteredItems?.filter((item) => item.name.toLowerCase().includes(itemSearch))
  setCurrentlyViewedItems(searchBarFilteredItems);
  }, [currentFilters, items, itemSearch]);


  const handleItemSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setItemSearch(input);
  }

  const handleItemFilterToggle = (e: ChangeEvent<HTMLInputElement>) => {

    const { name, checked } = e.target

    setFilterOptions((prev) => (
      {
        ...prev,
        [name]: checked,
      }
    ))
  }

  return (
    <>

      {/* Search bar and checkboxes */}

      <div className='w-full'>

        {/* search bar */}

        <input
          className="w-full p-2 mb-2 rounded-sm bg-neutral"
          type="text"
          value={itemSearch}
          onChange={handleItemSearch}
          placeholder="Search Items"
        />

        {/* checkboxes */}

        <div className='grid grid-cols-6 grid-rows-3 text-xs text-neutral gap-2'>
          <div className='w-full flex flex-col items-center text-center gap-1'>
            <input
              name="Physical Power"
              checked={filterOptions['Physical Power']}
              onChange={handleItemFilterToggle}
              type="checkbox"
            />
            <label htmlFor='Physical Power'>Physical Power</label>
          </div>
          <div className='w-full flex flex-col items-center text-center gap-1'>
            <input
              name="Magical Power"
              checked={filterOptions['Magical Power']}
              onChange={handleItemFilterToggle}
              type="checkbox"
            />
            <label htmlFor='Magical Power'>Magical Power</label>
          </div>
          <div className='w-full flex flex-col items-center text-center gap-1'>
            <input
              name="Attack Speed"
              checked={filterOptions['Attack Speed']}
              onChange={handleItemFilterToggle}
              type="checkbox"
            />
            <label htmlFor='Attack Speed'>Attack Speed</label>
          </div>
          <div className='w-full flex flex-col items-center text-center gap-1'>
            <input
              name="Physical Lifesteal"
              checked={filterOptions['Physical Lifesteal']}
              onChange={handleItemFilterToggle}
              type="checkbox"
            />
            <label htmlFor='Physical Lifesteal'>Physical Lifesteal</label>
          </div>
          <div className='w-full flex flex-col items-center text-center gap-1'>
            <input
              name="Magical Lifesteal"
              checked={filterOptions['Magical Lifesteal']}
              onChange={handleItemFilterToggle}
              type="checkbox"
            />
            <label htmlFor='Magical Lifesteal'>Magical Lifesteal</label>
          </div>
          <div className='w-full flex flex-col items-center text-center gap-1'>
            <input
              name="Physical Protection"
              checked={filterOptions['Physical Protection']}
              onChange={handleItemFilterToggle}
              type="checkbox"
            />
            <label htmlFor='Physical Protection'>Physical Protection</label>
          </div>
          <div className='w-full flex flex-col items-center text-center gap-1'>
            <input
              name="Magical Protection"
              checked={filterOptions['Magical Protection']}
              onChange={handleItemFilterToggle}
              type="checkbox"
            />
            <label htmlFor='Magical Protection'>Magical Protection</label>
          </div>
          <div className='w-full flex flex-col items-center text-center gap-1'>
            <input
              name="Health"
              checked={filterOptions['Health']}
              onChange={handleItemFilterToggle}
              type="checkbox"
            />
            <label htmlFor='Health'>Health</label>
          </div>
          <div className='w-full flex flex-col items-center text-center gap-1'>
            <input
              name="Mana"
              checked={filterOptions['Mana']}
              onChange={handleItemFilterToggle}
              type="checkbox"
            />
            <label htmlFor='Mana'>Mana</label>
          </div>
          <div className='w-full flex flex-col items-center text-center gap-1'>
            <input
              name="Cooldown Reduction"
              checked={filterOptions['Cooldown Reduction']}
              onChange={handleItemFilterToggle}
              type="checkbox"
            />
            <label htmlFor='Cooldown Reduction'>CDR</label>
          </div>
          <div className='w-full flex flex-col items-center text-center gap-1'>
            <input
              name="Crowd Control Reduction"
              checked={filterOptions['Crowd Control Reduction']}
              onChange={handleItemFilterToggle}
              type="checkbox"
            />
            <label htmlFor='Crowd Control Reduction'>CCR</label>
          </div>
          <div className='w-full flex flex-col items-center text-center gap-1'>
            <input
              name="Movement Speed"
              checked={filterOptions['Movement Speed']}
              onChange={handleItemFilterToggle}
              type="checkbox"
            />
            <label htmlFor='Movement Speed'>Movement Speed</label>
          </div>
        </div>
      </div>



      <div className="w-full grid grid-cols-4 md:grid-cols-10 gap-2">
        {currentFilters.length === 0 ?
        <>
          {searchAllItems?.map((item) => {
          const { id, pic_url, name, special } = item;
          return (
            <button key={id} className="flex flex-col items-center">
              <Image
                src={pic_url}
                alt={name}
                width={75}
                height={75}
                className="border-thin border-neutral rounded-sm"
              />
              <h3 className="text-neutral text-sm">{name}</h3>
            </button>
          );
        })}
        </>
        :
        <>
          {currentlyViewedItems?.map((item) => {
          const { id, pic_url, name, special } = item;
          return (
            <button key={id} className="flex flex-col items-center">
              <Image
                src={pic_url}
                alt={name}
                width={75}
                height={75}
                className="border-thin border-neutral rounded-sm"
              />
              <h3 className="text-neutral text-sm">{name}</h3>
            </button>
          );
        })}
        </>
        }
      </div>
    </>
  );
}
