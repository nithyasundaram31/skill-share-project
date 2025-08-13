import React, { useEffect, useState } from 'react';
import resourceServices from '../services/resourceServices';

function ResourceCard( {refreshFlag}) {
  const [resources, setResources] = useState([]);

  const fetchAllResource = async () => {
    try {
      const response = await resourceServices.getResources();
      setResources(response.data);
    } catch (error) {
      console.log("error in fetch all resource", error);
    }
  };

  useEffect(() => {
  fetchAllResource() 

  }, [refreshFlag]);

  // Extract video ID from YouTube URL
  const getYouTubeId = (url) => {
    try {
      if (url.includes("/shorts/")) return null; // skip shorts
      const urlObj = new URL(url);
      return urlObj.searchParams.get("v");
    } catch (err) {
      console.error("Invalid YouTube URL:", url);
      return null;
    }
  };

  // Open video in a new tab
  const openVideoPage = (resource) => {
    const videoId = getYouTubeId(resource.url);
    if (videoId) {
      window.open(`/video/${videoId}?title=${encodeURIComponent(resource.title)}`, "_blank"); //it will open new tab and take the url param
    }
  };

  
      return (
  <div className="w-full max-w-[980px] mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
    {resources.map((resource) => {
      const videoId = getYouTubeId(resource.url);
      const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;

      return (
  <div
    key={resource._id}
    className="bg-gray-200 text-black p-4 rounded shadow cursor-pointer"
    onClick={() => resource.type === 'video' && openVideoPage(resource)}
  >
    {resource.type === 'video' && thumbnailUrl && (
      <img
        src={thumbnailUrl}
        alt={resource.title}
        className="w-full h-auto rounded mb-2"
      />
    )}

   {resource.type === 'pdf' && (
  <div className="p-4 mb-2 font-bold">
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: 'blue', textDecoration: 'underline' }}
    >
      Open PDF
    </a>
  </div>
)}



   {resource.type === 'article' && (
  <div className="p-4 mb-2 font-bold">
    <a
      href={resource.url}
      target="_blank"
      
      style={{ color: 'blue', textDecoration: 'underline' }}
    >
      {resource.title}
    </a>
  </div>
)}

{resource.type === 'link' && (
  <div className="p-4 mb-2 font-bold">
    <a
      href={resource.url}
      target="_blank"
      rel="noopener noreferrer"
      style={{ color: 'blue', textDecoration: 'underline' }}
    >
      {resource.title}
    </a>
  </div>
)}

      
        <h1 className="font-bold">{resource.title}</h1>
        <p>{resource.term?.name}</p>
        <div>{resource.category?.name}</div>
        <div>{resource.type}</div>
      
    
  </div>
);
   })}
  </div>
);

}

export default ResourceCard;
