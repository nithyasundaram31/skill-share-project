import React, { useEffect } from 'react';
import { FaFileAlt, FaFilePdf, FaLink, FaPlay } from 'react-icons/fa';

function ResourceCard({ resources, onUpdate, onDelete, refreshFlag }) {

  const PostTime = ({ createdAt }) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now - created; // milliseconds difference

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays >= 1) {
      return <p className="text-xs text-gray-500">Posted {diffDays} days ago</p>;
    } else if (diffHours >= 1) {
      return <p className="text-xs text-gray-500">Posted {diffHours} hours ago</p>;
    } else {
      return <p className="text-xs text-gray-500">Posted {diffMinutes} minutes ago</p>;
    }
  }

  const getYouTubeId = (url) => {
    try {
      if (url.includes("/shorts/")) return null;
      const urlObj = new URL(url);
      return urlObj.searchParams.get("v");
    } catch (err) {
      console.error("Invalid YouTube URL:", url);
      return null;
    }
  };

  const openVideoPage = (resource) => {
    const videoId = getYouTubeId(resource.url);
    if (videoId) {
      window.open(`/video/${videoId}?title=${encodeURIComponent(resource.title)}`, "_blank");
    }
  };

  const handleResourceClick = (resource) => {
    if (resource.type === 'video') {
      openVideoPage(resource);
    } else {
      window.open(resource.url, "_blank", "noopener noreferrer");
    }
  };

  // call the function come from parent
  const handleDeleteClick = (id) => {
    onDelete(id); // call parent function
  }

  const handleUpdateClick = (id) => {
    onUpdate(id); // Parent function
  }

  return (
    <div className="w-full max-w-[1100px] lg:ml-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {resources.map((resource) => {
        const videoId = getYouTubeId(resource.url);
        const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;

        return (
          <div
            key={resource._id}
            className="bg-white rounded-lg shadow-lg text-black cursor-pointer overflow-hidden flex flex-col"
          >
            {/* Preview area - fixed height for all types */}
            <div className="h-44 w-full flex items-center justify-center bg-gray-200 overflow-hidden">
              {resource.type === 'video' && thumbnailUrl && (
                <div
                  onClick={() => handleResourceClick(resource)}
                  className="relative w-full h-full transform transition-all duration-200 hover:scale-105 hover:shadow-xl"
                >
                  <img
                    src={thumbnailUrl}
                    alt={resource.title}
                    className="w-full h-full object-cover"
                  />
                  {/* playbutton overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                    <div className="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
                      <FaPlay className="text-white text-xl ml-1" />
                    </div>
                  </div>
                </div>
              )}

              {resource.type === 'pdf' && (
                <div className="w-20 h-20 bg-red-500 bg-opacity-20 rounded-full flex items-center justify-center">
                  <FaFilePdf size={40} className="text-red-600" />
                </div>
              )}

              {resource.type === 'article' && (
                <div className="w-20 h-20 bg-green-500 bg-opacity-20 rounded-full flex items-center justify-center">
                  <FaFileAlt size={40} className="text-green-600" />
                </div>
              )}

              {resource.type === 'link' && (
                <div className="w-20 h-20 bg-blue-500 bg-opacity-20 rounded-full flex items-center justify-center">
                  <FaLink size={35} className="text-blue-600" />
                </div>
              )}
            </div>

            {/* Text content */} 
            <div className="p-4 flex flex-col flex-grow">     
              {resource.type === 'link' && (          //flex grow is it will occupy the leftover space 
                <a
                  className="underline font-bold text-blue-700 mb-2"
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Link
                </a>
              )}
              {resource.type === 'pdf' && (
                <a
                  className="underline font-bold text-blue-700 mb-2"
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Pdf
                </a>
              )}
              {resource.type === 'article' && (
                <a
                  className="underline font-bold text-blue-700 mb-2"
                  href={resource.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  View Article
                </a>
              )}

              <h1 className="font-semibold text-gray-800 mb-2">
                <span className="text-black font-bold">Title: </span>
                {resource.title}
              </h1>
              <p className="font-semi text-gray-800 mb-2">
                <span className="text-black  font-bold">Term: </span>
                {resource.term?.name}
              </p>
              <div className="font-semibold  text-gray-800 mb-4">
                <span className="text-black font-bold">Category: </span>
                {resource.category?.name}
              </div>

              {/* Buttons at bottom */}
              <div className="mt-auto flex items-center justify-between mb-2">
                <button 
                  onClick={() => handleUpdateClick(resource._id)} 
                  className="bg-blue-500 text-white font-semibold rounded text-sm px-2 py-1"
                >
                  Update
                </button>
                <button 
                  onClick={() => handleDeleteClick(resource._id)} 
                  className="bg-red-600 text-white font-semibold rounded text-sm px-2 py-1"
                >
                  Delete
                </button>
                {resource.type && (
                  <div
                    className={`rounded-full px-3 py-1 text-white text-center text-xs font-semibold ${
                      resource.type === 'video'
                        ? 'bg-red-500'
                        : resource.type === 'link'
                        ? 'bg-blue-500'
                        : resource.type === 'article'
                        ? 'bg-green-500'
                        : 'bg-gray-500'
                    }`}
                  >
                    {resource.type}
                  </div>
                )}
              </div>
              {resource.createdAt && <PostTime createdAt={resource.createdAt} />}
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ResourceCard;

