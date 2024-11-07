import React from 'react'
import { Link } from 'react-router-dom'

export const NotFoundPage = () => {
  return (
    <div style={{marginLeft:'38%',marginTop:'15%'}}>
        <h1>404: Page Not Found</h1>
        <Link to="http://localhost:5173/home">
            <div style={{marginLeft:'10%'}}>
            <button>Go Back Home</button>
            </div>
          </Link>
        
    </div>
  )
}
