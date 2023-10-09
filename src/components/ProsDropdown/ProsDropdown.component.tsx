"use client"

import './ProsDropdown.styles.css';
import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Quicksand } from 'next/font/google';

import DropdownArrow from '../../resources/arrow-down.svg';

const quicksandFont = Quicksand({
  weight: ['300', '400', '500'],
  subsets: ['latin']
});



export default function ProsDropdown() {
  
  const [isActive, setIsActive] = useState('')

  const handleToggle = () => {
    isActive === '' ? setIsActive('active') : setIsActive('');
  }

  return (
    <>
      <div className={`${isActive} ${quicksandFont.className} dropdown max-w-[700px] bg-slate-800 w-5/6 aspect-[3.75] md:aspect-[4.25] rounded-md border-[1px] border-slate-950 z-30 mb-32 md:mb-0`}>
        <button onClick={handleToggle} className="link w-full h-full text-3xl flex items-center justify-start p-4 gap-x-4">Learn from Pros
          <Image src={DropdownArrow} alt='dropdown arrow' width={15} className={`${isActive === 'active' ? 'rotate-0 mix-blend-difference' : '-rotate-90 '}`} />
        </button>
        <div className={`${isActive} dropdown-content w-full h-full grid grid-cols-2 gap-1 text-2xl`}>
          <Link href="/General" className={`${isActive} dropdown-item w-full h-full min-h-[60px] flex items-center p-2 bg-slate-100/95 border-2 border-yellow-600/70 rounded-md`}>General</Link>
          <Link href="/Mid" className={`${isActive} dropdown-item w-full h-full min-h-[60px] flex items-center p-2 bg-slate-100/95 border-2 border-yellow-600/70 rounded-md`}>Mid</Link>
          <Link href="/Carry" className={`${isActive} dropdown-item w-full h-full min-h-[60px] flex items-center p-2 bg-slate-200/95 border-2 border-yellow-600/70 rounded-md`}>Carry</Link>
          <Link href="/Jungle" className={`${isActive} dropdown-item w-full h-full min-h-[60px] flex items-center p-2 bg-slate-200/95 border-2 border-yellow-600/70 rounded-md`}>Jungle</Link>
          <Link href="/Solo" className={`${isActive} dropdown-item w-full h-full min-h-[60px] flex items-center p-2 bg-slate-300/95 border-2 border-yellow-600/70 rounded-md`}>Solo</Link>
          <Link href="/Support" className={`${isActive} dropdown-item w-full h-full min-h-[60px] flex items-center p-2 bg-slate-300/95 border-2 border-yellow-600/70 rounded-md`}>Support</Link>
          <Link href="/Joust" className={`${isActive} dropdown-item w-full h-full min-h-[60px] flex items-center p-2 bg-slate-400/95 border-2 border-yellow-600/70 rounded-md`}>Joust</Link>
          <Link href="/Duel" className={`${isActive} dropdown-item w-full h-full min-h-[60px] flex items-center p-2 bg-slate-400/95 border-2 border-yellow-600/70 rounded-md`}>Duel</Link>

        </div>
      </div>
    </>
  )
};
