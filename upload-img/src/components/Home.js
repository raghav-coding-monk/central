import React from 'react'

const Home = () => {
  return (
    <div>
      <h2 className="text-center">Hello <strong>{localStorage.getItem("complexAppUsername")}</strong>, your feed is empty.</h2>
      <p className="lead text-muted text-center">TOU ARE IN SIDE LOGIN PAGE</p>
    
      <p className="lead text-muted text-center">Your feed displays the latest posts from the people you follow. If you don&rsquo;t have any friends to follow that&rsquo;s okay; you can use the &ldquo;Search&rdquo; feature in the top menu bar to find content written by people with similar interests and then follow them.</p>
    
    </div>
  )
}

export default Home
