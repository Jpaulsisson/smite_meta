"use client";

import React, { useState } from 'react';
import { addBuild } from '@/database/supabase';


export default function CreateBuild() {

  const [values, setValues] = useState({
    user_id: '',
    item_1_id: 0,
    item_2_id: 0,
    item_3_id: 0,
    item_4_id: 0,
    item_5_id: 0,
    item_6_id: 0,
    god_id: null
  })

  return (
    <div>
      {/* Goals: (possibly in this order)
          - six matching empty containers at the top to be filled with items
          - one ghost box to be filled with an optional god
          - save build button / sign up & login to save builds button
          - compiled stats table updating live underneath
          - item passive list in some form of dropdown option
          - items/gods search bar
          - item filter checkboxes
          - switch for viewing items or gods
          - items or gods conditionally on the switch
      */}
      {/* Ideas:
          - maybe have a conditionally rendered header at the top if a god is selected and have the backgournd behind the build be the god card if one is selected or just transparent if no god is selected
      */}
    </div>
  )
}
