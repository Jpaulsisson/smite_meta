"use client"

import { getGods, getItems, getAbilities } from '@/database/supabase';
import React, { createContext, ReactNode, useContext, useState, useEffect } from 'react';


type DataContextProviderProps = {
  children: ReactNode;
}

export type God = {
  id: number,
  name: string,
  attack_speed: number,
  attack_speed_per_level: number,
  health: number,
  health_per_level: number,
  magical_power: number,
  magical_power_per_level: number,
  magical_protection: number,
  magical_protection_per_level: number,
  mana: number,
  mana_per_level: number,
  physical_power: number,
  physical_power_per_level: number,
  physical_protection: number,
  physical_protection_per_level: number,
  speed: number,
  role: string,
  pic_url: string,
  ability_id_1: number,
  ability_id_2: number,
  ability_id_3: number,
  ability_id_4: number,
  ability_id_5: number,
  type: string,
}

export type Item = {
  id: number,
  child_item_id: number,
  name: string,
  pic_url: string,
  restricted: string,
  starter: boolean,
  glyph: boolean,
  tier: number,
  special: string,
  stat_1_desc: string | null,
  stat_1_val: string | null,
  stat_2_desc: string | null,
  stat_2_val: string | null,
  stat_3_desc: string | null,
  stat_3_val: string | null,
  stat_4_desc: string | null,
  stat_4_val: string | null,
  stat_5_desc: string | null,
  stat_5_val: string | null,
  stat_6_desc: string | null,
  stat_6_val: string | null,
  active_status: boolean,
  short_description: string,
  type: string,
  price: number
}

export type Ability = {
  id: number,
  name: string,
  description: string,
  cooldown: string,
  mana_cost: string,
  ability_type: string,
  effect_1: string | null,
  effect_1_value: string | null,
  effect_2: string | null,
  effect_2_value: string | null,
  effect_3: string | null,
  effect_3_value: string | null,
  effect_4: string | null,
  effect_4_value: string | null,
  effect_5: string | null,
  effect_5_value: string | null,
  pic_url: string
}

type DataContext = {
  gods: God[] | undefined,
  items: Item[] | undefined,
  abilities: Ability[] | undefined,
}

const DataContext = createContext<DataContext | null>(null);

export default function DataContextProvider({ children }: DataContextProviderProps) {

  const [gods, setGods] = useState<God[] | undefined>(undefined);
  const [items, setItems] = useState<Item[] | undefined>([]);
  const [abilities, setAbilities] = useState<Ability[] | undefined>(undefined);

  useEffect(() => {
    const dataFetch = async () => {
      const godsData = await getGods();
      const itemsData = await getItems();
      const abilitiesData = await getAbilities();

      const organizedGodsData = godsData?.sort((a, b) => a.name.localeCompare(b.name))
      const organizedItemsData = itemsData?.sort((a, b) => a.name.localeCompare(b.name))

      setGods(organizedGodsData);
      setItems(organizedItemsData);
      setAbilities(abilitiesData);
    }

    dataFetch();
  }, [])



  return (
    <DataContext.Provider
      value={{
        gods,
        items,
        abilities
      }}
    >
      {children}
    </DataContext.Provider>
  );
}


export function useDataContext() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error(
      "useDataContext must be used within a DataContextProvider"
    );
  }
  return context;
}