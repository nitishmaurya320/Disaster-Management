import React from 'react'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'
import { Outlet } from 'react-router-dom'
import Home from '../Pages/Home'
const UserLayout = () => {
  return (
    <>
    <Navbar/>
    <main>
      <Outlet>
        <Home/>
      </Outlet>

    </main>
    <Footer/>
    </>
  )
}

export default UserLayout