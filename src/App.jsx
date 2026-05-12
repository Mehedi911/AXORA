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

    <div className="bg-black text-white overflow-x-hidden">

      {/* NAVBAR */}
      <Navbar />

      {/* HERO */}
      <Hero />

      {/* SERVICES */}
      <Services />

      {/* PORTFOLIO */}
      <Portfolio />

      {/* ABOUT */}
      <section
        id="about"
        className="relative py-32 px-6"
      >

        <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-20 items-center">

          {/* LEFT */}
          <div>

            <p className="uppercase tracking-[10px] text-cyan-400 text-sm mb-5">
              About AXORA
            </p>

            <h2 className="text-5xl md:text-6xl font-black leading-tight">
              We Build
              <span className="italic text-cyan-400">
                {" "}Premium Digital
              </span>

              <br />

              Experiences
            </h2>

            <p className="mt-8 text-slate-300 text-lg leading-9">
              AXORA is a modern digital agency focused on futuristic
              web experiences and premium frontend systems.
            </p>

          </div>

          {/* RIGHT */}
          <div className="grid gap-8">

            <div className="p-8 rounded-[30px] bg-white/5 border border-white/10">

              <h3 className="text-2xl font-bold mb-4">
                Modern UI Design
              </h3>

              <p className="text-slate-300 leading-8">
                Beautiful interfaces with smooth experiences.
              </p>

            </div>

            <div className="p-8 rounded-[30px] bg-white/5 border border-white/10">

              <h3 className="text-2xl font-bold mb-4">
                Fast Performance
              </h3>

              <p className="text-slate-300 leading-8">
                Optimized websites with premium responsiveness.
              </p>

            </div>

          </div>

        </div>

      </section>

      {/* CONTACT */}
      <Contact />

    </div>

  )
}

function App() {

  const [loading, setLoading] =
    useState(true)

  useEffect(() => {

    window.history.scrollRestoration =
      "manual"

    window.scrollTo({
      top: 0,
      behavior: "instant",
    })

    const timer = setTimeout(() => {

      setLoading(false)

    }, 2500)

    return () => clearTimeout(timer)

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

      {/* PUBLIC WEBSITE */}
      <Route
        path="/"
        element={<HomePage />}
      />

      {/* SECRET ADMIN */}
      <Route
        path="/admin"
        element={<Admin />}
      />

    </Routes>

  )
}

export default App