"use client";

import BuildsDropdown from '../components/BuildsDropdown/BuildsDropdown.component';
import GodsItemsDropdown from '../components/GodsItemsDropdown/GodsItemsDropdown.component';
import ProsDropdown from '../components/ProsDropdown/ProsDropdown.component';

export default function Home() {
  return (
    <main className='mx-auto w-full'>
        <section className='flex flex-col md:flex-row md:max-w-[80%] md:mx-auto items-center justify-evenly min-h-[70vh] gap-8'>
          <BuildsDropdown />
          <GodsItemsDropdown />
          <ProsDropdown />
        </section>
    </main>
  )
}
