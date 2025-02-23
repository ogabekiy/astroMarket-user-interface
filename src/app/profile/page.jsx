"use client"
import AuthForm from '@/components/login'
import Profile from '@/components/profile'
import React, { useState, useEffect } from 'react'

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Check if token exists in localStorage when component mounts
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token) // Convert to boolean - true if token exists, false if not
  }, [])

  return (
    <div className='mt-24'>
      {isAuthenticated ? <Profile /> : <AuthForm />}
    </div>
  )
}