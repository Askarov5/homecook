"use client"

import { useState, useEffect } from 'react'
import { ChefProfile } from '../components/ChefProfile'
import { UserProfile } from '../components/UserProfile'

// This would come from your authentication context
const getUserRole = (): 'chef' | 'user' => {
  // For now, we'll just return 'chef'
  return 'chef'
}

export default function ProfilePage() {
  const [userRole, setUserRole] = useState<'chef' | 'user' | null>(null)

  useEffect(() => {
    setUserRole(getUserRole())
  }, [])

  if (!userRole) {
    return <div>Loading...</div>
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Profile</h1>
      {userRole === 'chef' ? <ChefProfile /> : <UserProfile />}
    </div>
  )
}

