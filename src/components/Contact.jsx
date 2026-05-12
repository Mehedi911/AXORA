import { useEffect, useState } from "react"

import {
  doc,
  getDoc,
  addDoc,
  collection,
} from "firebase/firestore"

import { db } from "../firebase"

export default function Contact() {

  const [settings, setSettings] =
    useState({})

  const [formData, setFormData] =
    useState({
      name: "",
      email: "",
      message: "",
    })

  // FETCH CONTACT SETTINGS
  useEffect(() => {

    const fetchSettings =
      async () => {

        try {

          const docRef =
            doc(
              db,
              "settings",
              "contact"
            )

          const docSnap =
            await getDoc(docRef)

          if (docSnap.exists()) {

            setSettings(
              docSnap.data()
            )
          }

        } catch (error) {

          console.log(error)

        }
      }

    fetchSettings()

  }, [])

  // HANDLE INPUT
  const handleChange = (e) => {

    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    })
  }

  // SEND MESSAGE
  const handleSubmit =
    async (e) => {

      e.preventDefault()

      try {

        await addDoc(
          collection(
            db,
            "messages"
          ),
          formData
        )

        alert(
          "Message Sent Successfully 😎"
        )

        setFormData({
          name: "",
          email: "",
          message: "",
        })

      } catch (error) {

        console.log(error)

      }
    }

  return (

    <section
      id="contact"
      className="relative py-32 px-6 bg-black text-white overflow-hidden"
    >

      {/* BACKGROUND GLOW */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none"></div>

      <div className="relative max-w-7xl mx-auto">

        {/* TOP */}
        <div className="text-center mb-20">

          <p className="uppercase tracking-[10px] text-cyan-400 text-sm mb-6">
            Contact AXORA
          </p>

          <h2 className="text-5xl md:text-7xl font-black leading-tight text-white">

            Let’s Build{" "}

            <span className="italic text-cyan-400">
              Something Great
            </span>

          </h2>

        </div>

        {/* GRID */}
        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT */}
          <div className="rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-md p-10">

            <h3 className="text-4xl font-black mb-10">
              Contact Information
            </h3>

            <div className="space-y-6">

              {/* EMAIL */}
              <div className="bg-black/40 border border-white/10 rounded-[25px] p-6">

                <p className="text-cyan-400 uppercase tracking-[5px] text-sm mb-3">
                  Email
                </p>

                <p className="text-xl font-semibold break-all">
                  {settings.email ||
                    "No Email Added"}
                </p>

              </div>

              {/* WHATSAPP */}
              <div className="bg-black/40 border border-white/10 rounded-[25px] p-6">

                <p className="text-cyan-400 uppercase tracking-[5px] text-sm mb-3">
                  WhatsApp
                </p>

                <p className="text-xl font-semibold">
                  {settings.whatsapp ||
                    "No WhatsApp Added"}
                </p>

              </div>

              {/* FACEBOOK */}
              <div className="bg-black/40 border border-white/10 rounded-[25px] p-6">

                <p className="text-cyan-400 uppercase tracking-[5px] text-sm mb-3">
                  Facebook
                </p>

                <a
                  href={
                    settings.facebook
                  }
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-xl font-semibold hover:text-cyan-400 transition break-all"
                >
                  {settings.facebook ||
                    "No Facebook Added"}
                </a>

              </div>

            </div>

          </div>

          {/* RIGHT */}
          <form
            onSubmit={handleSubmit}
            className="rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-md p-10"
          >

            <h3 className="text-4xl font-black mb-10">
              Send Message
            </h3>

            <div className="space-y-6">

              <input
                type="text"
                name="name"
                placeholder="Your Name"
                value={formData.name}
                onChange={
                  handleChange
                }
                required
                className="w-full bg-black/40 border border-white/10 rounded-[20px] px-6 py-5 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 transition"
              />

              <input
                type="email"
                name="email"
                placeholder="Your Email"
                value={formData.email}
                onChange={
                  handleChange
                }
                required
                className="w-full bg-black/40 border border-white/10 rounded-[20px] px-6 py-5 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 transition"
              />

              <textarea
                name="message"
                placeholder="Your Message"
                rows="6"
                value={formData.message}
                onChange={
                  handleChange
                }
                required
                className="w-full bg-black/40 border border-white/10 rounded-[20px] px-6 py-5 outline-none text-white placeholder:text-slate-500 focus:border-cyan-400 transition resize-none"
              ></textarea>

              <button
                type="submit"
                className="w-full py-5 rounded-full bg-cyan-400 text-black font-black text-lg hover:scale-[1.02] hover:bg-cyan-300 transition duration-300"
              >
                Send Message
              </button>

            </div>

          </form>

        </div>

      </div>

    </section>
  )
}