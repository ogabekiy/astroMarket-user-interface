"use client"
import AuthForm from '@/components/login'
import Profile from '@/components/profile'
import React, { useState, useEffect } from 'react'

export default function Page() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    const token = localStorage.getItem('token')
    setIsAuthenticated(!!token) 
  }, [])

  return (
    <div className='mt-24'>
      {isAuthenticated ? <Profile /> : <AuthForm />}
    </div>
  )
}