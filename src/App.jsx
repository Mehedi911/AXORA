import { useEffect, useState } from "react"

import {
  Routes,
  Route,
} from "react-router-dom"

import Navbar from "./components/Navbar"
import Hero from "./components/Hero"
import Services from "./components/Services"
import Portfolio from "./components/Portfolio"
import Contact from "./components/Contact"
import Admin from "./components/Admin"

function HomePage() {

  return (
    <>
      <Navbar />
      <Hero />
      <Services />
      <Portfolio />
      <Contact />
    </>
  )
}

function App() {

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    const timer = setTimeout(() => {

      setLoading(false)

    }, 2500)

    return () =>
      clearTimeout(timer)

  }, [])

  // LOADER
  if (loading) {

    return (

      <div className="h-screen bg-black flex items-center justify-center overflow-hidden">

        <div className="text-center">

          <h1 className="text-6xl md:text-8xl font-black tracking-[12px] text-white animate-pulse">
            AXORA
          </h1>

          <div className="w-48 h-[2px] bg-cyan-400 mx-auto mt-6"></div>

          <p className="text-slate-400 mt-6 tracking-[6px] uppercase text-sm">
            Premium Digital Experience
          </p>

        </div>

      </div>
    )
  }

  return (

    <Routes>

      <Route
        path="/"
        element={<HomePage />}
      />

      <Route
        path="/admin"
        element={<Admin />}
      />

    </Routes>
  )
}

export default App