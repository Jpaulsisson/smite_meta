import React from 'react'

export default function RecommendedBuilds() {
  return (
    <div>
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
    </div>
  )
}
