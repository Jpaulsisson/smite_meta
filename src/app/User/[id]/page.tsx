"use client"

import React from 'react'
import { useUserContext } from '@/contexts/user.context'

export default function UserProfile() {

  const { currentUserId } = useUserContext();
  return (
    <div>
      <h1 className='text-4xl text-white'>User profile page for {currentUserId}!</h1>
    </div>
  )
}
