"use client"

import './BuildsDropdown.styles.css';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Quicksand } from 'next/font/google';

import DropdownArrow from '../../resources/arrow-down.svg';
import { useUserContext } from '@/contexts/user.context';


const quicksandFont = Quicksand({
  weight: ['300', '400', '500'],
  subsets: ['latin']
});



export default function BuildsDropdown() {
  
  const { hashedId } = useUserContext();
  const [isActive, setIsActive] = useState('');

  const handleToggle = () => {
    isActive === '' ? setIsActive('active') : setIsActive('');
  };

  return (
    <>
      <div
        className={`${isActive} ${quicksandFont.className} dropdown bg-slate-800 max-w-[700px] w-5/6 aspect-[3.75] md:aspect-[4.25] rounded-md border-[1px] border-slate-950 z-50`}
      >
        <button
          onClick={handleToggle}
          className={`link w-full h-full text-3xl flex items-center justify-start p-4 gap-x-4`}
        >
          Builds
          <Image
            src={DropdownArrow}
            alt="dropdown arrow"
            width={15}
            className={`${
              isActive === 'active'
                ? 'rotate-0 mix-blend-difference'
                : '-rotate-90 '
            }`}
          />
        </button>
        <div
          className={`${isActive} dropdown-content w-full h-full grid grid-rows-3 gap-16 text-2xl`}
        >
          {/* Create builds page link */}
          <Link
            href="/CreateBuild"
            className={`${isActive} dropdown-item w-full h-full min-h-[60px] flex items-center justify-start p-2 border-2 border-yellow-600/70 rounded-md bg-slate-100/95 text-slate-800`}
          >
            Create a Build +
          </Link>

          {/* User's saved builds page link */}
          <Link
            href={`/User/${hashedId}/Builds`}
            className={`${isActive} dropdown-item w-full h-full min-h-[60px] flex items-center justify-start p-2 border-2 border-yellow-600/70 rounded-md bg-slate-200/95 text-slate-800`}
          >
            My Saved Builds
          </Link>

          {/* Recommended builds page link */}
          <Link
            href="/RecommendedBuilds"
            className={`${isActive} dropdown-item w-full h-full min-h-[60px] flex items-center justify-start p-2 border-2 border-yellow-600/70 rounded-md bg-slate-300/95 text-slate-800`}
          >
            Recommended Builds
          </Link>
        </div>
      </div>
    </>
  );
};
