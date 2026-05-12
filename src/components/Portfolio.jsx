import { useEffect, useState } from "react"

import {
  collection,
  getDocs,
} from "firebase/firestore"

import { db } from "../firebase"

export default function Portfolio() {

  const [projects, setProjects] =
    useState([])

  // FETCH PROJECTS
  useEffect(() => {

    const fetchProjects =
      async () => {

        try {

          const querySnapshot =
            await getDocs(
              collection(
                db,
                "projects"
              )
            )

          const data =
            querySnapshot.docs.map(
              (doc) => ({
                id: doc.id,
                ...doc.data(),
              })
            )

          setProjects(data)

        } catch (error) {

          console.log(error)

        }
      }

    fetchProjects()

  }, [])

  return (

    <section
      id="portfolio"
      className="relative py-32 px-6 bg-black text-white overflow-hidden"
    >

      {/* GLOW */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[900px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto">

        {/* TOP */}
        <div className="text-center mb-20">

          <p className="uppercase tracking-[10px] text-cyan-400 text-sm mb-5">
            Our Portfolio
          </p>

          <h2 className="text-5xl md:text-7xl font-black">
            Featured
            <span className="italic text-cyan-400">
              {" "}Projects
            </span>
          </h2>

          <p className="mt-8 text-slate-300 text-lg leading-9 max-w-3xl mx-auto">
            Explore premium digital experiences crafted by AXORA.
          </p>

        </div>

        {/* GRID */}
        <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">

          {projects.map((project) => (

            <div
              key={project.id}
              className="group relative rounded-[35px] overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md hover:border-cyan-400/40 transition duration-500"
            >

              {/* IMAGE */}
              <div className="overflow-hidden">

                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[280px] object-cover group-hover:scale-110 transition duration-700"
                />

              </div>

              {/* OVERLAY */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent opacity-80 pointer-events-none"></div>

              {/* CONTENT */}
              <div className="relative p-7">

                <h4 className="text-3xl font-black italic mb-6 text-white">
                  {project.title}
                </h4>

                <div className="flex items-center justify-between gap-4 flex-wrap">

                  {/* VIEW PROJECT */}
                  {project.link && (

                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-3 rounded-full bg-cyan-400 text-black font-bold hover:scale-105 hover:bg-cyan-300 transition duration-300"
                    >
                      View Project
                    </a>

                  )}

                  {/* STATUS */}
                  <span className="text-cyan-400 text-sm tracking-[4px] uppercase">
                    Live Project
                  </span>

                </div>

              </div>

              {/* GLOW */}
              <div className="absolute -inset-[1px] rounded-[35px] bg-cyan-400/0 group-hover:bg-cyan-400/10 blur-2xl transition duration-500 pointer-events-none"></div>

            </div>

          ))}

        </div>

      </div>

    </section>
  )
}