import React from 'react'
import PostForm from './PostForm'
import PostList from './PostList'

export const UserSelfPosts = () => {
  return (
    <div style={{display:"flex",flexDirection:"column"}}>
       
        <PostList />
    </div>
  )
}
