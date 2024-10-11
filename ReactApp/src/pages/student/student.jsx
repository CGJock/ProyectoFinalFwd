import React from 'react'
import { Outlet } from 'react-router-dom'
import ProfileStudent from '../../components/student-components/ProfileStudent'
import SideModal from '../../components/student-components/SideModal'

export const Student = () => {
  return (
    <>
    <ProfileStudent />
        <Outlet />
    </>
  )
}