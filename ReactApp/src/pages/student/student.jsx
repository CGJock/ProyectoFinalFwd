import React from 'react'
import { Outlet } from 'react-router-dom'
import SideModal from '../../components/student-components/SideModal'
import { SocialNav } from '../../components/utilities/SocialNav'
import StartChat from '../../components/utilities/StartChat'
StartChat



export const Student = () => {
  return (
    <>
      <SocialNav />
      <StartChat/>
      
      <main>
      <Outlet />
      </main>
  
    

    </>
  )
}
