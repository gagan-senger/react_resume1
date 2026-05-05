import React from 'react'
import { Header } from '../UI/Header'
import { Outlet, useLocation } from 'react-router-dom'
import { Footer } from '../UI/Footer'
import { CartSidebar } from '../UI/CartSidebar'

const AppLayout = () => {
  const location = useLocation();
  const isHome = location.pathname === "/";
  return (
    <>
      <Header />
      <CartSidebar />
      <main className={!isHome ? "pt-[100px]" : ""}>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

export default AppLayout