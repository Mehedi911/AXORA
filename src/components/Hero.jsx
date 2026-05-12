export default function Hero() {
  return (
    <section
      id="home"
      className="min-h-screen flex items-center justify-center relative overflow-hidden bg-black"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0f3b82_0%,#000814_45%,#000000_80%)] opacity-90"></div>

      {/* BLUR EFFECT */}
      <div className="absolute w-[700px] h-[700px] bg-cyan-500/10 blur-3xl rounded-full"></div>

      {/* CONTENT */}
      <div className="relative z-10 text-center px-6 max-w-5xl">

        {/* TOP SMALL TEXT */}
        <p className="uppercase tracking-[12px] text-cyan-400 text-sm mb-8 font-medium">
          AXORA DIGITAL AGENCY
        </p>

        {/* MAIN HEADING */}
        <h1 className="text-6xl md:text-8xl font-black leading-[0.95] text-white">
          Modern Web
          <br />
          <span className="italic text-cyan-400">
            Design & Services
          </span>
        </h1>

        {/* DESCRIPTION */}
        <p className="mt-10 text-slate-300 text-lg md:text-xl leading-9 max-w-3xl mx-auto">
          We craft futuristic websites, premium dashboards,
          responsive interfaces and high-end digital experiences
          for modern brands.
        </p>

        {/* BUTTONS */}
        <div className="mt-12 flex items-center justify-center gap-6 flex-wrap">

          <a
            href="#services"
            className="px-8 py-4 rounded-full bg-cyan-400 text-black font-bold hover:scale-105 transition"
          >
            Explore Services
          </a>

          <a
            href="#contact"
            className="px-8 py-4 rounded-full border border-white/20 text-white hover:bg-white/10 transition"
          >
            Contact Us
          </a>

        </div>
      </div>
    </section>
  )
}