import React, {useEffect, useState} from 'react'
import { useNavigate } from 'react-router-dom'
import Axios from "axios"
const CreatePost = (props) => {
    const [title, setTitle] = useState("")
    const [body, setBody] = useState("")
    const navigate = useNavigate()

    

    async function handleSubmit(e) {
  e.preventDefault()
  try {
    const response = await Axios.post("/create-post", {
      title,
      body,
      // 🔑 Make sure this key matches what your backend expects!
      token: localStorage.getItem("complexAppToken") 
    })
        // Redirect to homepage after successful post creation
        
    if (response.data) {
    
        props.addFlashMessage("Congrats, you created a new post!")
    
        
      console.log("Post created successfully!")

       navigate(`/post/${response.data._id}`)

    }
  } catch (e) {
    // 🔍 Print the ACTUAL error to the console
    console.log("Post request failed.")
    console.error(e.response.data) // This tells you exactly what the server disliked
  }
}
    
  return (
    <div>
      <form onSubmit={handleSubmit} className="create-post-form">
        <div className="form-group">
          <label htmlFor="post-title" className="text-muted mb-1">
            <small>Title</small>
          </label>
          <input onChange={e => setTitle(e.target.value)} autoFocus name="title" id="post-title" className="form-control form-control-lg form-control-title" type="text" placeholder="" autoComplete="off" />
        </div>

        <div className="form-group">
          <label htmlFor="post-body" className="text-muted mb-1 d-block">
            <small>Body Content</small>
          </label>
          <textarea onChange={e=>setBody(e.target.value)} name="body" id="post-body" className="body-content tall-textarea form-control" type="text"></textarea>
        </div>

        <button className="btn btn-primary">Save New Post</button>
      </form>
    </div>
  )
}

export default CreatePost
