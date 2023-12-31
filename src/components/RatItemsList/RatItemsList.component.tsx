"use client";

import React, { ChangeEvent, useEffect, useState } from 'react';
import { God, useDataContext } from '@/contexts/data.context';
import Image from 'next/image';
import DropdownArrow from '@/resources/arrow-down.svg';
import { Item } from '@/contexts/data.context';

// checkbox info
const checkboxes = [
  { name: "Physical Power", label: "Physical Power" },
  { name: "Physical Penetration", label: "Physical Penetration" },
  { name: "Magical Power", label: "Magical Power" },
  { name: "Magical Penetration", label: "Magical Penetration" },
  { name: "Attack Speed", label: "Attack Speed" },
  { name: "Critical Strike Chance", label: "Crit Chance" },
  { name: "Physical Lifesteal", label: "Physical Lifesteal" },
  { name: "Magical Lifesteal", label: "Magical Lifesteal" },
  { name: "Physical Protection", label: "Physical Protection" },
  { name: "Magical Protection", label: "Magical Protection" },
  { name: "Health", label: "Health" },
  { name: "Mana", label: "Mana" },
  { name: "Cooldown Reduction", label: "CDR" },
  { name: "Crowd Control Reduction", label: "CCR" },
  { name: "Movement Speed", label: "Movement Speed" }
]

type ItemsListProps = {
  addToBuild: (item_id: number) => void;
  selectedGod?: God | null;
}

export default function ItemsList({ addToBuild, selectedGod }: ItemsListProps) {

  // Bring in the item info
  const { items } = useDataContext();

  // Filter out inactive items and Ratatoskr special items
  const activeItems = items?.filter((item) => item.active_status && (item.tier >= 3 || (item.tier === 2 && item.starter === true)) && item.type === 'Item');

  const [currentlyViewedItems, setCurrentlyViewedItems] = useState<Item[] | undefined>([]);
  const [itemSearch, setItemSearch] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [currentFilters, setCurrentFilters] = useState<string[]>([]);
  const [filterOptions, setFilterOptions] = useState({
    'Physical Power': false,
    'Magical Power': false,
    'Attack Speed': false,
    'Critical Strike Chance': false,
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
  
  // Filter by search bar
  const searchAllItems = activeItems?.filter((item) => item.name.toLowerCase().includes(itemSearch))

  // Keeping track of the current filters to use
  useEffect(() => {
    const currentOptions = Object.entries(filterOptions).filter((pair) => pair[1] === true);
    const selectedOptions = currentOptions.map((option) => option[0]);
    setCurrentFilters(selectedOptions);
  }, [filterOptions]);

  //  Update currentlyViewedItems based on current filters
  useEffect(() => {
    function matchesAllFilters(item: Item) {
      const statDescriptions = [
        item.stat_1_desc?.toLowerCase(),
        item.stat_2_desc?.toLowerCase(),
        item.stat_3_desc?.toLowerCase(),
        item.stat_4_desc?.toLowerCase(),
        item.stat_5_desc?.toLowerCase(),
        item.stat_6_desc?.toLowerCase()
      ];
      return currentFilters.every(filter => statDescriptions.includes(filter?.toLowerCase()));
  }

  const allItems = items?.filter((item) => item.active_status && (item.tier >= 3 || (item.tier === 2 && item.starter === true)) && item.type === 'Item');

  let godFilteredItems: Item[] | undefined;

  if (selectedGod) {

    selectedGod.role?.toLowerCase() === 'guardian' || selectedGod.role?.toLowerCase() === 'mage' ?
      
      godFilteredItems = allItems?.filter(item => {
        switch (true) {
          case item.restricted.toLowerCase().includes(selectedGod.role?.toLowerCase()):
            return false;
          case item.stat_1_desc?.toLowerCase() === 'attack speed':
            return false;
          case item.stat_1_desc?.toLowerCase() === 'magical power':
            return true;
          case item.stat_2_desc?.toLowerCase() === 'magical power':
            return true;
          case item.stat_1_desc?.toLowerCase() === 'physical power' && item.stat_2_desc?.toLowerCase() !== 'magical power':
            return false;
            default:
              return true;
        }
      })
      :
      godFilteredItems = allItems?.filter(item => {
        switch (true) {
          case item.restricted.toLowerCase().includes(selectedGod.role?.toLowerCase()):
            return false;
          case item.stat_1_desc?.toLowerCase() === 'physical power':
            return true;
          case item.stat_2_desc?.toLowerCase() === 'physical power':
            return true;
          case item.stat_1_desc?.toLowerCase() === 'magical power' && item.stat_2_desc?.toLowerCase() !== 'physical power':
            return false;
            default:
              return true;
        }
      })
  }
  if (!selectedGod) {
    godFilteredItems = allItems;
  }

  const filteredItems = godFilteredItems?.filter(item => matchesAllFilters(item));

  const searchBarFilteredItems = filteredItems?.filter((item) => item.name.toLowerCase().includes(itemSearch));

  setCurrentlyViewedItems(searchBarFilteredItems);
  }, [currentFilters, items, itemSearch, selectedGod]);

  // Search bar functionality
  const handleItemSearch = (e: ChangeEvent<HTMLInputElement>) => {
    const input = e.target.value.toLowerCase();
    setItemSearch(input);
  }

  // Toggle filters 
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

      <div className='w-full flex flex-col items-center'>

        {/* search bar */}

        <input
          className="w-full md:w-1/2 p-2 mb-3 rounded-sm bg-neutral"
          type="text"
          value={itemSearch}
          onChange={handleItemSearch}
          placeholder="Search Items"
        />

        {/* checkboxes */}

          <div className='w-full md:w-1/2 grid grid-cols-5 grid-rows-3 text-xs md:text-base text-neutral gap-2 mb-4'>
          
          {!showFilters ?
            <button className='col-span-full row-span-2 w-full flex items-center justify-center gap-3 text-lg bg-accentBg rounded-sm p-2' onClick={() => setShowFilters(prev => !prev)}>
              Item Filters
              <Image src={DropdownArrow} alt='dropdown arrow' width={15} />
            </button>
          :
          <>
          {checkboxes.map((checkbox) => {
            const { name, label } = checkbox;
            return (
              <div key={name} className='w-full flex flex-col items-center text-center gap-1'>
                <input
                  name={name}
                  checked={filterOptions[name as keyof typeof filterOptions]}
                  onChange={handleItemFilterToggle}
                  type="checkbox"
                />
                <label htmlFor={name}>{label}</label>
              </div>
            )
          })}
          <button className='col-span-full row-span-2 w-full flex items-center justify-center gap-3 text-lg bg-accentBg rounded-sm p-2' onClick={() => setShowFilters(prev => !prev)}>
              Hide filters
              <Image src={DropdownArrow} className='rotate-180' alt='dropdown arrow' width={15} />
            </button>
          </>
          }
          
        </div>
      </div>

        {/* The items */}

      <div className="w-full grid grid-cols-4 md:grid-cols-10 gap-2">
        
        {currentFilters.length === 0 && !selectedGod ?
        <>
        {/* if no filters are applied, use just the search bar on all items */}

          {searchAllItems?.map((item) => {
          const { id, pic_url, name, special } = item;
          return (
            <button key={id} onClick={() => addToBuild(id)} className="flex flex-col items-center">
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

        {/* if filters are applied, use them + the search bar on all items */}

          {currentlyViewedItems?.map((item) => {
          const { id, pic_url, name } = item;
          return (
            <button key={id} onClick={() => addToBuild(id)} className="flex flex-col items-center">
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
