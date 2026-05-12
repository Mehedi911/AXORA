export default function Services() {
  const services = [
    {
      title: "Web Design",
      desc: "Professional quality service with modern workflow.",
    },
    {
      title: "React Development",
      desc: "Premium responsive frontend development experience.",
    },
    {
      title: "UI/UX Design",
      desc: "Clean futuristic interface design for modern brands.",
    },
    {
      title: "Data Entry",
      desc: "Accurate and efficient professional data management.",
    },
  ]

  return (
    <section
      id="services"
      className="relative bg-black text-white py-28 overflow-hidden"
    >
      {/* BACKGROUND GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0f3b82_0%,#000814_35%,#000000_75%)] opacity-70"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">

        {/* TOP TEXT */}
        <div className="text-center mb-16">
          <p className="uppercase tracking-[10px] text-cyan-400 text-sm mb-5">
            Premium Services
          </p>

          <h2 className="text-5xl md:text-6xl font-black text-white">
            Our <span className="italic text-cyan-400">Services</span>
          </h2>

          <p className="mt-6 text-slate-300 max-w-2xl mx-auto text-lg leading-8">
            We provide modern digital solutions with premium quality,
            futuristic aesthetics and smooth user experiences.
          </p>
        </div>

        {/* SERVICE CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-8">

          {services.map((service, index) => (
            <div
              key={index}
              className="group relative p-8 rounded-[28px] border border-white/10 bg-white/5 backdrop-blur-md hover:border-cyan-400/50 transition duration-500 hover:-translate-y-2"
            >
              {/* GLOW */}
              <div className="absolute inset-0 rounded-[28px] bg-cyan-400/0 group-hover:bg-cyan-400/5 transition"></div>

              {/* NUMBER */}
              <p className="text-cyan-400 text-sm tracking-[6px] mb-6">
                0{index + 1}
              </p>

              {/* TITLE */}
              <h3 className="text-2xl font-bold mb-4">
                {service.title}
              </h3>

              {/* DESCRIPTION */}
              <p className="text-slate-300 leading-7">
                {service.desc}
              </p>

              {/* LINE */}
              <div className="mt-8 h-[1px] w-full bg-white/10"></div>

              {/* BUTTON */}
              <button className="mt-6 text-cyan-400 font-semibold hover:translate-x-1 transition">
                Learn More →
              </button>
            </div>
          ))}

        </div>
      </div>
    </section>
  )
}