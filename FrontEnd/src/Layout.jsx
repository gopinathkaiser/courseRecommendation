import React from 'react'
import SideBar from './Components/Side Bar/SideBar';

const Layout = ({children}) => {
  return (
    <div className='w-full flex'>
      <div className='w-[18%]'>
        <SideBar/>
      </div>
      <div className='w-[84%] bg-[#EAEAEA]'>
        {children}
      </div>
    </div>
  )
}

export default Layout
