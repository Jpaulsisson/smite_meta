"use client";

import React from 'react'

export default function RecommendedBuilds() {
  return (
    <div className='p-4 md:p-12'>
      {/* 
        Goals: 
        - switch for view recommended builds by god/role
        - top 6 most popular items for each role
        - smite's recommended items for a god
        - with enough user input we could add most popular items on smite meta
          -- We'll have to add some kind of saved count column to each item row in the items table
          -- OR
          -- run SELECT COUNT(*) GROUP BY item_1_id >>>> item_6_id on the builds table and total up
              ..how many times each item_id is saved in a build. 
      */}
      <h2 className='text-7xl text-neutral'>Recommended Builds</h2>
      <div>
        <h3 className='text-3xl text-neutral'>Conquest Builds</h3>
        <h4 className='text-xl text-neutral indent-4'>Mid</h4>
        <p></p>
      </div>
    </div>
  )
}
