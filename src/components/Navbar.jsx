import { useState } from "react"

export default function Navbar() {

  const [menuOpen, setMenuOpen] =
    useState(false)

  return (

    <nav className="fixed top-0 left-0 w-full z-50 bg-black/70 backdrop-blur-xl border-b border-white/10">

      <div className="max-w-7xl mx-auto px-6 py-5 flex items-center justify-between">

        {/* LOGO */}
        <a
          href="/"
          className="text-3xl md:text-4xl font-black tracking-[10px] text-white hover:text-cyan-400 transition duration-300"
        >
          AXORA
        </a>

        {/* DESKTOP MENU */}
        <div className="hidden md:flex items-center gap-10 text-white font-semibold">

          <a
            href="#home"
            className="hover:text-cyan-400 transition duration-300"
          >
            Home
          </a>

          <a
            href="#services"
            className="hover:text-cyan-400 transition duration-300"
          >
            Services
          </a>

          <a
            href="#portfolio"
            className="hover:text-cyan-400 transition duration-300"
          >
            Portfolio
          </a>

          <a
            href="#about"
            className="hover:text-cyan-400 transition duration-300"
          >
            About
          </a>

          <a
            href="#contact"
            className="hover:text-cyan-400 transition duration-300"
          >
            Contact
          </a>

        </div>

        {/* MOBILE BUTTON */}
        <button
          onClick={() =>
            setMenuOpen(!menuOpen)
          }
          className="md:hidden text-white text-4xl"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

      </div>

      {/* MOBILE MENU */}
      {menuOpen && (

        <div className="md:hidden bg-black border-t border-white/10 px-6 py-8 flex flex-col gap-8 text-white font-semibold text-lg">

          <a
            href="#home"
            onClick={() =>
              setMenuOpen(false)
            }
            className="hover:text-cyan-400 transition"
          >
            Home
          </a>

          <a
            href="#services"
            onClick={() =>
              setMenuOpen(false)
            }
            className="hover:text-cyan-400 transition"
          >
            Services
          </a>

          <a
            href="#portfolio"
            onClick={() =>
              setMenuOpen(false)
            }
            className="hover:text-cyan-400 transition"
          >
            Portfolio
          </a>

          <a
            href="#about"
            onClick={() =>
              setMenuOpen(false)
            }
            className="hover:text-cyan-400 transition"
          >
            About
          </a>

          <a
            href="#contact"
            onClick={() =>
              setMenuOpen(false)
            }
            className="hover:text-cyan-400 transition"
          >
            Contact
          </a>

        </div>

      )}

    </nav>
  )
}