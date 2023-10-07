'use client';

import React, { useState, useEffect } from 'react';
import { getGodSkins } from '@/database/supabase';
import { useParams } from 'next/navigation';
import Favor from '@/resources/favor.webp';
import Gems from '@/resources/gems.webp';
import Image from 'next/image';
import Link from 'next/link';

type Skin = {
  god_id: number;
  id: number;
  pic_url: string;
  price_favor: number;
  price_gems: number;
  tier: string;
};

export default function GodSkins() {
  // Come back after production and re-write initial API call to include skin name

  const target = useParams();

  const [skins, setSkins] = useState<Skin[]>([]);

  useEffect(() => {
    async function getSkins() {
      const skinsResponse = await getGodSkins(target.id);
      if (skinsResponse) {
        const skinsToUse = skinsResponse.filter((skin) => skin.pic_url !== '');
        setSkins(skinsToUse);
      }
    }

    getSkins();
  }, [target]);

  return (
    <div className="grid grid-cols-3 gap-y-6 p-4">
      <Link
        href={`https://www.nexus.gg/smite-store`}
        target="_blank"
        className="underline underline-offset-2 text-lg text-primaryFontColor text-center col-span-full "
      >
        Go to Official Smite Store
      </Link>
      {skins?.map((skin) => {
        const { id, pic_url, tier, price_favor, price_gems } = skin;
        return (
          <div key={id} className="w-full md:w-5/6 text-neutral">
            <Image
              src={pic_url}
              alt={`Different god skin images`}
              width={500}
              height={500}
              className="rounded-md"
            />
            <aside className=" text-lg">{tier}</aside>
            <aside className="flex gap-1 text-base">
              <Image src={Favor} alt="smite favor" width={18} height={10} />{' '}
              {price_favor}
            </aside>
            <aside className="flex gap-1 text-base">
              <Image
                src={Gems}
                alt="smite favor"
                width={18}
                height={10}
                className="aspect-square"
              />{' '}
              {price_gems}
            </aside>
          </div>
        );
      })}
    </div>
  );
}
