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
        const videoId = getYouTubeId(resource.url); //vedio url pass as a argument
        const thumbnailUrl = videoId   
          ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`
          : null;

        return (
          <div
            key={resource._id}
            className="bg-gray-200 text-black p-4 rounded shadow cursor-pointer"
            onClick={() => openVideoPage(resource)}
          >
            {/* without thumbnail vedio image src  will blank    */}
            {thumbnailUrl && (   
              <img
                src={thumbnailUrl}
                alt={resource.title}
                className="w-full h-auto rounded mb-2 hover:opacity-90 transition"
              />
            )}

            {/* Video Info */}
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
