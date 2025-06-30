import React from 'react'
import { useRouteError } from 'react-router-dom' 

const Error = () => {
  return (
    <div>
        <h1>Oops!</h1>
        <h2>Something went wrong.</h2>
        <p>Please try again later.</p>
    </div>
  )
}

export default Error