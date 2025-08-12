import React, { useState } from 'react'
import { useParams } from 'react-router-dom'

function VideoPage() {
  const { videoId } = useParams()

  const videoUrl = `https://www.youtube.com/embed/${videoId}`

  

  return (
    <div>
      <h2>My Custom Video Page</h2>
      <iframe
        width="560"
        height="315"
        src={videoUrl}
        title="YouTube video"
         allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        frameBorder="0"
        allowFullScreen
      ></iframe>

    

        
    </div>
  )
}

export default VideoPage
