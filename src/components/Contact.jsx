import { useEffect, useState } from "react"

import {
  doc,
  getDoc,
  collection,
  addDoc,
} from "firebase/firestore"

import { db } from "../firebase"

export default function Contact() {

  const [settings, setSettings] =
    useState(null)

  // FORM STATES
  const [name, setName] =
    useState("")

  const [emailInput, setEmailInput] =
    useState("")

  const [message, setMessage] =
    useState("")

  const [loading, setLoading] =
    useState(false)

  // FETCH SETTINGS
  useEffect(() => {

    const fetchSettings =
      async () => {

        try {

          const docRef = doc(
            db,
            "site_settings",
            "main"
          )

          const docSnap =
            await getDoc(docRef)

          if (docSnap.exists()) {

            setSettings(docSnap.data())

          }

        } catch (error) {

          console.log(error)

        }
      }

    fetchSettings()

  }, [])

  // SEND MESSAGE
  const handleSubmit =
    async (e) => {

      e.preventDefault()

      if (
        !name ||
        !emailInput ||
        !message
      ) {

        alert(
          "Fill all fields"
        )

        return
      }

      try {

        setLoading(true)

        await addDoc(
          collection(
            db,
            "messages"
          ),
          {
            name,
            email:
              emailInput,
            message,
            createdAt:
              new Date(),
          }
        )

        alert(
          "Message Sent 😎🔥"
        )

        setName("")
        setEmailInput("")
        setMessage("")

      } catch (error) {

        console.log(error)

        alert(
          "Failed ❌"
        )

      } finally {

        setLoading(false)

      }
    }

  return (

    <section
      id="contact"
      className="relative py-32 px-6 overflow-hidden"
    >

      {/* GLOW */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,#0f3b82_0%,#000814_35%,#000000_75%)] opacity-70"></div>

      <div className="relative z-10 max-w-6xl mx-auto">

        {/* TOP */}
        <div className="text-center mb-20">

          <p className="uppercase tracking-[10px] text-cyan-400 text-sm mb-5">
            Contact AXORA
          </p>

          <h2 className="text-5xl md:text-7xl font-black">
            Let’s Build
            <span className="italic text-cyan-400">
              {" "}Something Great
            </span>
          </h2>

        </div>

        <div className="grid lg:grid-cols-2 gap-10">

          {/* LEFT */}
          <div className="p-10 rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-md">

            <h3 className="text-3xl font-black mb-8">
              Contact Information
            </h3>

            <div className="space-y-6">

              {/* EMAIL */}
              <a
                href={`mailto:${settings?.email || ""}`}
                className="block p-6 rounded-[25px] bg-black/40 border border-white/10"
              >

                <p className="text-cyan-400 uppercase tracking-[4px] text-sm mb-2">
                  Email
                </p>

                <h4 className="text-xl font-bold">
                  {settings?.email ||
                    "No Email Added"}
                </h4>

              </a>

              {/* WHATSAPP */}
              <a
                href={`https://wa.me/${settings?.whatsapp || ""}`}
                target="_blank"
                className="block p-6 rounded-[25px] bg-black/40 border border-white/10"
              >

                <p className="text-cyan-400 uppercase tracking-[4px] text-sm mb-2">
                  WhatsApp
                </p>

                <h4 className="text-xl font-bold">
                  {settings?.whatsapp ||
                    "No WhatsApp Added"}
                </h4>

              </a>

              {/* FACEBOOK */}
              <a
                href={settings?.facebook || "#"}
                target="_blank"
                className="block p-6 rounded-[25px] bg-black/40 border border-white/10"
              >

                <p className="text-cyan-400 uppercase tracking-[4px] text-sm mb-2">
                  Facebook
                </p>

                <h4 className="text-xl font-bold">
                  AXORA Official
                </h4>

              </a>

            </div>

          </div>

          {/* RIGHT */}
          <div className="p-10 rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-md">

            <h3 className="text-3xl font-black mb-8">
              Send Message
            </h3>

            <form
              onSubmit={
                handleSubmit
              }
              className="space-y-6"
            >

              <input
                type="text"
                placeholder="Your Name"
                value={name}
                onChange={(e) =>
                  setName(
                    e.target.value
                  )
                }
                className="w-full bg-black/40 border border-white/10 rounded-[20px] px-6 py-5 outline-none text-white"
              />

              <input
                type="email"
                placeholder="Your Email"
                value={emailInput}
                onChange={(e) =>
                  setEmailInput(
                    e.target.value
                  )
                }
                className="w-full bg-black/40 border border-white/10 rounded-[20px] px-6 py-5 outline-none text-white"
              />

              <textarea
                rows="6"
                placeholder="Your Message"
                value={message}
                onChange={(e) =>
                  setMessage(
                    e.target.value
                  )
                }
                className="w-full bg-black/40 border border-white/10 rounded-[20px] px-6 py-5 outline-none text-white"
              ></textarea>

              <button
                type="submit"
                disabled={loading}
                className="px-10 py-5 rounded-full bg-cyan-400 text-black font-bold hover:scale-105 hover:bg-cyan-300 transition duration-300"
              >
                {loading
                  ? "Sending..."
                  : "Send Message"}
              </button>

            </form>

          </div>

        </div>

      </div>

    </section>
  )
}