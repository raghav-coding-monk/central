import React, { useState } from "react"
import ReactDOM from "react-dom/client"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Index from "./index"
import Axios from "axios"
// My Components
import Header from "./components/Header"
import HomeGuest from "./components/HomeGuest"
import CreatePost from "./components/createPost"
import Footer from "./components/Footer"
import About from "./components/About"
import Terms from "./components/Terms"
import Home from "./components/Home"
import ViewSinglePost from "./components/ViewSinglePost"
import ProfileUpload from "./components/ProfileUpload"
import ProfileDisplay from "./components/ProfileDisplay"
import FlashMsgs from "./FlashMsgs"

Axios.defaults.baseURL = "http://localhost:5005/api"

function Main() {
  // This looks at localStorage when the app first boots up
  const [loggedIn, setLoggedIn] = useState(Boolean(localStorage.getItem("complexAppToken")))
  
  const [flashMessage, setFlashMessage] = useState([])

  function addFlashMessage(msg) {
    setFlashMessage(prev => prev.concat(msg))
  }

  return (
    <BrowserRouter>
      {/* Passing setLoggedIn as a prop so Header can update it */}
      <FlashMsgs messages={flashMessage} />

      <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} />
      
      <Routes>
        <Route path="/" element={loggedIn ? <Home /> : <HomeGuest />} />
        <Route path="/post/:id" element={<ViewSinglePost />} />
        <Route path="/create-post" element={<CreatePost addFlashMessage={addFlashMessage} />} />
        <Route path="/about-us" element={<About />} />
        <Route path="/terms" element={<Terms />} />
        
       
        
      <Route path="/profile/:id" element={<ProfileUpload />} />
      <Route path="/profile-display/:id" element={<ProfileDisplay />} />
      </Routes>
      <Footer />
    </BrowserRouter>
  )
}

const root = ReactDOM.createRoot(document.querySelector("#app"))
root.render(<Main />)

if (module.hot) {
  module.hot.accept()
}