"use client";

import React, { useEffect, useState } from 'react';
import { useDataContext } from '@/contexts/data.context';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';

// This is the page for ONE SINGULAR ITEM //

export default function God() {
  
  const { gods, abilities } = useDataContext();

  const godId = useParams();

  const target = parseInt(godId.id as string);

  const god = gods?.find(god => god.id === target);  

  const godAbilities = {
    ability_1: abilities?.find(ability => ability.id === god?.ability_id_1),
    ability_2: abilities?.find(ability => ability.id === god?.ability_id_2),
    ability_3: abilities?.find(ability => ability.id === god?.ability_id_3),
    ability_4: abilities?.find(ability => ability.id === god?.ability_id_4),
    passive: abilities?.find(ability => ability.id === god?.ability_id_5),
  }

  return (
    <div className='p-4 md:p-20'>
      {god ?
        <div className=''>
          <h2 className='text-5xl md:text-7xl text-neutral'>{god.name}</h2>
          
          <div style={{ backgroundImage: `url(${god.pic_url}`}} className='mt-4 bg-cover bg-no-repeat bg-top h-52 w-1/2 md:w-1/6 flex items-end justify-end rounded-sm border-neutral border-thin'>
            <aside className='text-lg text-neutral bg-slate-800/90 p-3 rounded-tl-3xl'>{god.role}</aside>
          </div>
          
          <Link href={`/Gods/${god.id}/Skins`} className='text-lg text-primaryFontColor underline w-24 text-end' >Go to {god.name}&apos;s skins</Link>

          <h3 className='mt-4 text-xl text-neutral'>Abilities:</h3>
          <div className='flex flex-col mt-4 gap-4 md:w-1/2'>
            {Object.values(godAbilities).map((ability, index) => {
              const { name, pic_url, ability_type, mana_cost, description, effect_1, effect_1_value, effect_2, effect_2_value, effect_3,effect_3_value, effect_4, effect_4_value, effect_5, effect_5_value } = ability!;
              return (
                <div key={name} className='grid gap-2 text-neutral'>
                  <Image src={pic_url} alt={name} width={75} height={75} />
                  {index === 4 && <aside className='text-primaryFontColor'>Passive</aside>}
                  <h4 className='text-primaryFontColor'>{name}</h4>
                  <aside>{ability_type}</aside>
                  {mana_cost && <aside>Mana: {mana_cost}</aside>}
                  <p className='text-sm'>{description}</p>
                  <p>{effect_1} {effect_1_value}</p>
                  <p>{effect_2} {effect_2_value}</p>
                  <p>{effect_3} {effect_3_value}</p>
                  <p>{effect_4} {effect_4_value}</p>
                  <p>{effect_5} {effect_5_value}</p>
                </div>
              )
            })}
          </div>
        </div>
        :
        <h2 className='text-5xl text-neutral'>Loading...</h2>
      }
      
    </div>
  )
}
