import React from 'react'

function UserProfile({params}:any) {
  return (
    <div>
      <h1>Profile</h1>
      <hr />
      <p className='text-4xl mt-10'>This is the profile LoginPage
        <span className='bg-orange-500 text-white p-2 ml-2'>{params.id}</span>
      </p>
    </div>
  )
}

export default UserProfile
