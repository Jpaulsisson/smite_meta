'use client';

import './GodsItemsDropdown.styles.css';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Quicksand } from 'next/font/google';

import DropdownArrow from '../../resources/arrow-down.svg';

const quicksandFont = Quicksand({
  weight: ['300', '400', '500'],
  subsets: ['latin'],
});

export default function GodsItemsDropdown() {
  const [isActive, setIsActive] = useState('');

  const handleToggle = () => {
    isActive === '' ? setIsActive('active') : setIsActive('');
  };

  return (
    <>
      <div
        className={`${isActive} ${quicksandFont.className} dropdown bg-slate-800 max-w-[700px] w-5/6 aspect-[3.75] md:aspect-[4.25] rounded-md border-[1px] border-slate-950 z-40`}
      >
        <button
          onClick={handleToggle}
          className="link w-full h-full text-3xl flex items-center justify-start p-4 gap-x-4"
        >
          Gods & Items
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
          {/* Gods link */}
          <Link
            href="/Gods"
            className={`${isActive} dropdown-item w-full h-full min-h-[60px] flex items-center p-2 bg-slate-100/95 border-2 border-yellow-600/70 rounded-md`}
          >
            Gods
          </Link>

          {/* Items link */}
          <Link
            href="/Items"
            className={`${isActive} dropdown-item w-full h-full min-h-[60px] flex items-center p-2 bg-slate-200/95 border-2 border-yellow-600/70 rounded-md`}
          >
            Items
          </Link>
          {/* <Link
            href="/RecommendedItems"
            className={`${isActive} dropdown-item w-full h-full min-h-[60px] flex items-center p-2 bg-slate-300/95 border-2 border-yellow-600/70 rounded-md`}
          >
            Tier Lists
          </Link> */}
        </div>
      </div>
    </>
  );
}
