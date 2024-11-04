import React from 'react'
import { SocialNav } from '../../components/utilities/SocialNav'
import { Outlet } from 'react-router-dom'

export const ProfilePsychologist = () => {
  return (
    <>
    <SocialNav />
    
    <main>
      <Outlet/>
    </main>
    </>
  )
}
