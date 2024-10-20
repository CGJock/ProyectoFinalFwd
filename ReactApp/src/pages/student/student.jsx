import React from 'react'
import { Outlet } from 'react-router-dom'
import { ProfileStudent } from './student-profile'
import SideModal from '../../components/student-components/SideModal'



export const Student = () => {
  return (
    <>
      <ProfileStudent />
      <main>
      <Outlet />
      </main>
  
    

    </>
  )
}
