import React, { useEffect, useState } from "react"
import Axios from "axios"
//import { useNavigate } from "react-router-dom"

function HeaderLoggedOut(props) {
  const [username, setUsername] = useState()
  const [password, setPassword] = useState()

 // const navigate = useNavigate();

  // frontend/components/HeaderLoggedOut.js

// Look for this function in HeaderLoggedOut.js
// frontend/src/components/HeaderLoggedOut.js

async function handleSubmit(e) {
  e.preventDefault()
  try {
    // UPDATED: Added the full URL and /api prefix
    const response = await Axios.post("http://localhost:5005/api/login", { 
      username, 
      password 
    })
    
    if (response.data && response.data.token) {
      localStorage.setItem("complexAppToken", response.data.token)
      localStorage.setItem("complexAppUsername", response.data.username)
      localStorage.setItem("complexAppAvatar", response.data.avatar) // Good to save this too!

      props.setLoggedIn(true)
      console.log("Success: State updated.")
    } else {
      console.log("Invalid username / password.")
      alert("Invalid username / password.")
    }
  } catch (e) {
    console.log("There was a problem.")
    if (e.response) {
      // If the server responded with JSON, we can see the error message
      console.log(e.response.data)
    }
  }
}

  return (
    <form onSubmit={handleSubmit} className="mb-0 pt-2 pt-md-0">
      <div className="row align-items-center">
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input onChange={e => setUsername(e.target.value)} name="username" className="form-control form-control-sm input-dark" type="text" placeholder="Username" autoComplete="off" />
        </div>
        <div className="col-md mr-0 pr-md-0 mb-3 mb-md-0">
          <input onChange={e => setPassword(e.target.value)} name="password" className="form-control form-control-sm input-dark" type="password" placeholder="Password" />
        </div>
        <div className="col-md-auto">
          <button className="btn btn-success btn-sm">Sign In</button>
        </div>
      </div>
    </form>
  )
}

export default HeaderLoggedOut
