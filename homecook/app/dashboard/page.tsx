"use client"

import { useState, useEffect } from 'react'
import { ChefDashboard } from './components/ChefDashboard'
import { CustomerDashboard } from './components/CustomerDashboard'
import { AdminDashboard } from './components/AdminDashboard'

// This would come from your authentication context
const getUserRole = (): 'chef' | 'customer' | 'admin' => {
  // For now, we'll just return 'chef'
  return 'chef'
}

export default function DashboardPage() {
  const [userRole, setUserRole] = useState<'chef' | 'customer' | 'admin' | null>(null)

  useEffect(() => {
    setUserRole(getUserRole())
  }, [])

  if (!userRole) {
    return <div>Loading...</div>
  }

  switch (userRole) {
    case 'chef':
      return <ChefDashboard />
    case 'customer':
      return <CustomerDashboard />
    case 'admin':
      return <AdminDashboard />
    default:
      return <div>Invalid user role</div>
  }
}

