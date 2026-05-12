import { useEffect, useState } from "react"

import {
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  setDoc,
  getDoc,
  updateDoc,
} from "firebase/firestore"

import { db } from "../firebase"

export default function Admin() {

  // LOGIN
  const [username, setUsername] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [isLoggedIn, setIsLoggedIn] =
    useState(
      localStorage.getItem(
        "axora_admin"
      ) === "true"
    )

  // PROJECT
  const [title, setTitle] =
    useState("")

  const [projectLink, setProjectLink] =
    useState("")

  const [image, setImage] =
    useState(null)

  const [loading, setLoading] =
    useState(false)

  const [projects, setProjects] =
    useState([])

  // MESSAGES
  const [messages, setMessages] =
    useState([])

  // EDIT
  const [editingId, setEditingId] =
    useState(null)

  const [editTitle, setEditTitle] =
    useState("")

  const [editLink, setEditLink] =
    useState("")

  const [editImage, setEditImage] =
    useState(null)

  // CONTACT SETTINGS
  const [email, setEmail] =
    useState("")

  const [whatsapp, setWhatsapp] =
    useState("")

  const [facebook, setFacebook] =
    useState("")

  // LOGIN INFO
  const ADMIN_ID = "axoraadmin"

  const ADMIN_PASSWORD =
    "axora123"

  // FETCH PROJECTS
  const fetchProjects = async () => {

    try {

      const querySnapshot =
        await getDocs(
          collection(db, "projects")
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

  // FETCH MESSAGES
  const fetchMessages =
    async () => {

      try {

        const querySnapshot =
          await getDocs(
            collection(
              db,
              "messages"
            )
          )

        const data =
          querySnapshot.docs.map(
            (doc) => ({
              id: doc.id,
              ...doc.data(),
            })
          )

        setMessages(data)

      } catch (error) {

        console.log(error)

      }
    }

  // FETCH SETTINGS
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

          const data =
            docSnap.data()

          setEmail(
            data.email || ""
          )

          setWhatsapp(
            data.whatsapp || ""
          )

          setFacebook(
            data.facebook || ""
          )

        }

      } catch (error) {

        console.log(error)

      }
    }

  // SAVE SETTINGS
  const saveSettings =
    async () => {

      try {

        await setDoc(
          doc(
            db,
            "site_settings",
            "main"
          ),
          {
            email,
            whatsapp,
            facebook,
          }
        )

        alert(
          "Contact Settings Saved 😎🔥"
        )

      } catch (error) {

        console.log(error)

      }
    }

  // AUTO LOAD
  useEffect(() => {

    if (isLoggedIn) {

      fetchProjects()

      fetchMessages()

      fetchSettings()

    }

  }, [isLoggedIn])

  // LOGIN
  const login = () => {

    if (
      username === ADMIN_ID &&
      password === ADMIN_PASSWORD
    ) {

      localStorage.setItem(
        "axora_admin",
        "true"
      )

      setIsLoggedIn(true)

      fetchProjects()

      fetchMessages()

      fetchSettings()

    } else {

      alert(
        "Wrong ID or Password ❌"
      )

    }
  }

  // LOGOUT
  const logout = () => {

    localStorage.removeItem(
      "axora_admin"
    )

    setIsLoggedIn(false)

  }

  // DELETE PROJECT
  const handleDelete =
    async (id) => {

      try {

        await deleteDoc(
          doc(db, "projects", id)
        )

        fetchProjects()

        alert("Project Deleted 😎")

      } catch (error) {

        console.log(error)

      }
    }

  // EDIT PROJECT
  const handleEdit =
    async (id) => {

      try {

        let updatedData = {
          title: editTitle,
          link: editLink,
        }

        // IMAGE REPLACE
        if (editImage) {

          const data =
            new FormData()

          data.append(
            "file",
            editImage
          )

          data.append(
            "upload_preset",
            "axora_upload"
          )

          const res =
            await fetch(
              "https://api.cloudinary.com/v1_1/dabeexgui/image/upload",
              {
                method: "POST",
                body: data,
              }
            )

          const uploadedImage =
            await res.json()

          updatedData.image =
            uploadedImage.secure_url
        }

        await updateDoc(
          doc(db, "projects", id),
          updatedData
        )

        alert(
          "Project Updated 😎🔥"
        )

        setEditingId(null)

        setEditTitle("")

        setEditLink("")

        setEditImage(null)

        fetchProjects()

      } catch (error) {

        console.log(error)

      }
    }

  // UPLOAD
  const handleUpload = async () => {

    if (
      !title ||
      !image
    ) {

      alert("Fill all fields")

      return
    }

    try {

      setLoading(true)

      const data =
        new FormData()

      data.append("file", image)

      data.append(
        "upload_preset",
        "axora_upload"
      )

      const res = await fetch(
        "https://api.cloudinary.com/v1_1/dabeexgui/image/upload",
        {
          method: "POST",
          body: data,
        }
      )

      const uploadedImage =
        await res.json()

      await addDoc(
        collection(db, "projects"),
        {
          title,
          image:
            uploadedImage.secure_url,
          link: projectLink,
        }
      )

      alert(
        "Project Uploaded Successfully 😎🔥"
      )

      setTitle("")

      setProjectLink("")

      setImage(null)

      fetchProjects()

    } catch (error) {

      console.log(error)

      alert("Upload Failed ❌")

    } finally {

      setLoading(false)

    }
  }

  // LOGIN SCREEN
  if (!isLoggedIn) {

    return (
      <section className="min-h-screen py-32 px-6 bg-black text-white flex items-center justify-center">

        <div className="max-w-xl w-full text-center">

          <p className="uppercase tracking-[10px] text-cyan-400 text-sm mb-5">
            AXORA SECURITY
          </p>

          <h2 className="text-5xl md:text-7xl font-black leading-none">
            Admin
            <span className="italic text-cyan-400">
              {" "}Login
            </span>
          </h2>

          <div className="mt-14 p-10 rounded-[35px] border border-white/10 bg-white/5 backdrop-blur-md">

            <input
              type="text"
              placeholder="Enter ID"
              value={username}
              onChange={(e) =>
                setUsername(
                  e.target.value
                )
              }
              className="w-full mb-6 bg-black border border-cyan-400/20 rounded-[20px] px-6 py-5 outline-none text-white"
            />

            <input
              type="password"
              placeholder="Enter Password"
              value={password}
              onChange={(e) =>
                setPassword(
                  e.target.value
                )
              }
              className="w-full mb-10 bg-black border border-cyan-400/20 rounded-[20px] px-6 py-5 outline-none text-white"
            />

            <button
              onClick={login}
              className="px-10 py-5 rounded-full bg-cyan-400 text-black font-bold"
            >
              Login
            </button>

          </div>

        </div>

      </section>
    )
  }

  // ADMIN PANEL
  return (
    <section className="min-h-screen py-32 px-6 bg-black text-white">

      <div className="max-w-7xl mx-auto">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-16">

          <div>

            <p className="uppercase tracking-[10px] text-cyan-400 text-sm mb-5">
              AXORA CONTROL PANEL
            </p>

            <h2 className="text-5xl md:text-7xl font-black">
              Premium Admin Dashboard
            </h2>

          </div>

          <button
            onClick={logout}
            className="px-7 py-4 rounded-full border border-red-500 text-red-400"
          >
            Logout
          </button>

        </div>

        {/* CONTACT SETTINGS */}
        <div className="p-10 rounded-[35px] border border-white/10 bg-white/5 mb-20">

          <h3 className="text-3xl font-black mb-10">
            Contact Settings
          </h3>

          <div className="space-y-6">

            <input
              type="text"
              placeholder="Email"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="w-full bg-black border border-cyan-400/20 rounded-[20px] px-6 py-5 outline-none text-white"
            />

            <input
              type="text"
              placeholder="WhatsApp"
              value={whatsapp}
              onChange={(e) =>
                setWhatsapp(
                  e.target.value
                )
              }
              className="w-full bg-black border border-cyan-400/20 rounded-[20px] px-6 py-5 outline-none text-white"
            />

            <input
              type="text"
              placeholder="Facebook Link"
              value={facebook}
              onChange={(e) =>
                setFacebook(
                  e.target.value
                )
              }
              className="w-full bg-black border border-cyan-400/20 rounded-[20px] px-6 py-5 outline-none text-white"
            />

            <button
              onClick={saveSettings}
              className="px-10 py-5 rounded-full bg-cyan-400 text-black font-bold"
            >
              Save Settings
            </button>

          </div>

        </div>

        {/* UPLOAD */}
        <div className="p-10 rounded-[35px] border border-white/10 bg-white/5 mb-24">

          <h3 className="text-3xl font-black mb-10">
            Upload Project
          </h3>

          <input
            type="text"
            placeholder="Project Title"
            value={title}
            onChange={(e) =>
              setTitle(e.target.value)
            }
            className="w-full mb-6 bg-black border border-cyan-400/20 rounded-[20px] px-6 py-5 outline-none text-white"
          />

          <input
            type="text"
            placeholder="Project Live Link"
            value={projectLink}
            onChange={(e) =>
              setProjectLink(
                e.target.value
              )
            }
            className="w-full mb-6 bg-black border border-cyan-400/20 rounded-[20px] px-6 py-5 outline-none text-white"
          />

          <input
            type="file"
            onChange={(e) =>
              setImage(
                e.target.files[0]
              )
            }
            className="mb-8"
          />

          <button
            onClick={handleUpload}
            disabled={loading}
            className="px-10 py-5 rounded-full bg-cyan-400 text-black font-bold"
          >
            {loading
              ? "Uploading..."
              : "Upload Project"}
          </button>

        </div>

        {/* PROJECTS */}
        <div>

          <h3 className="text-4xl font-black mb-14">
            Uploaded Projects
          </h3>

          <div className="grid md:grid-cols-2 xl:grid-cols-3 gap-10">

            {projects.map((project) => (

              <div
                key={project.id}
                className="rounded-[35px] overflow-hidden border border-white/10 bg-white/5"
              >

                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-[280px] object-cover"
                />

                <div className="p-7">

                  {editingId ===
                  project.id ? (

                    <>
                      <input
                        type="text"
                        value={editTitle}
                        onChange={(e) =>
                          setEditTitle(
                            e.target.value
                          )
                        }
                        className="w-full mb-4 bg-black border border-cyan-400/20 rounded-[15px] px-4 py-3 outline-none text-white"
                      />

                      <input
                        type="text"
                        value={editLink}
                        onChange={(e) =>
                          setEditLink(
                            e.target.value
                          )
                        }
                        placeholder="Project Link"
                        className="w-full mb-4 bg-black border border-cyan-400/20 rounded-[15px] px-4 py-3 outline-none text-white"
                      />

                      <input
                        type="file"
                        onChange={(e) =>
                          setEditImage(
                            e.target.files[0]
                          )
                        }
                        className="mb-5"
                      />

                      <button
                        onClick={() =>
                          handleEdit(
                            project.id
                          )
                        }
                        className="px-5 py-3 rounded-full bg-cyan-400 text-black font-bold mr-3"
                      >
                        Save
                      </button>

                      <button
                        onClick={() =>
                          setEditingId(
                            null
                          )
                        }
                        className="px-5 py-3 rounded-full border border-white/20"
                      >
                        Cancel
                      </button>
                    </>

                  ) : (

                    <>
                      <h4 className="text-3xl font-black mb-6">
                        {project.title}
                      </h4>

                      <div className="flex gap-4 flex-wrap">

                        <button
                          onClick={() => {

                            setEditingId(
                              project.id
                            )

                            setEditTitle(
                              project.title
                            )

                            setEditLink(
                              project.link || ""
                            )
                          }}
                          className="px-6 py-3 rounded-full bg-cyan-400 text-black font-bold"
                        >
                          Edit
                        </button>

                        <button
                          onClick={() =>
                            handleDelete(
                              project.id
                            )
                          }
                          className="px-6 py-3 rounded-full bg-red-500 text-white font-bold"
                        >
                          Delete
                        </button>

                      </div>
                    </>
                  )}

                </div>

              </div>

            ))}

          </div>

        </div>

        {/* MESSAGES */}
        <div className="mt-32">

          <h3 className="text-4xl font-black mb-14">
            Client Messages
          </h3>

          <div className="grid md:grid-cols-2 gap-10">

            {messages.map((msg) => (

              <div
                key={msg.id}
                className="p-8 rounded-[30px] border border-white/10 bg-white/5"
              >

                <h4 className="text-2xl font-black mb-4 text-cyan-400">
                  {msg.name}
                </h4>

                <p className="text-sm text-slate-400 mb-6">
                  {msg.email}
                </p>

                <p className="text-slate-300 leading-8">
                  {msg.message}
                </p>

              </div>

            ))}

          </div>

        </div>

      </div>

    </section>
  )
}