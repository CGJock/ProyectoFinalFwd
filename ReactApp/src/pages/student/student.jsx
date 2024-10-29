import React from 'react'
import { Outlet } from 'react-router-dom'
import { ProfileStudent } from './student-profile'
import SideModal from '../../components/student-components/SideModal'
import { SocialNav } from '../../components/utilities/SocialNav'



export const Student = () => {
  return (
    <>
      <SocialNav />
      <ProfileStudent />
      <main>
      <Outlet />
      </main>
  
    

    </>
  )
}
