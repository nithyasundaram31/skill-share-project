import React, { useEffect, useState } from 'react';
import { FaFileAlt, FaFilePdf, FaLink, FaPlay, FaThumbsUp } from 'react-icons/fa';
import resourceServices from '../services/resourceServices';

function ResourceCard({ resources, onUpdate, onDelete, refreshFlag }) {
  const user = JSON.parse(localStorage.getItem("user")); // example
  console.log("user received:", user);

  // Change from single boolean to object map for each resource
  const [likedMap, setLikedMap] = useState({});
  // Local copy of resources to manage views
  const [localResources, setLocalResources] = useState(resources);

  // Initialize likedMap and localResources on mount or when resources change
  useEffect(() => {
    const initMap = {};
    resources.forEach(res => {
      initMap[res._id] = {
        liked: res.likes?.some(u => u.toString() === user.id.toString()),
        likesCount: res.likes?.length || 0,  // count calculated by array.length
      };
    });
    setLikedMap(initMap);
    setLocalResources(resources);
  }, [resources, user.id]);

  // Like button handler
  const likeButton = async (id) => {
    try {
      const response = await resourceServices.toggleLike(id, user.id);
      console.log("like response is:", response.data);
      setLikedMap(prev => ({
        ...prev,
        [id]: {
          liked: response.data?.liked,
          likesCount: response.data?.likesCount
        }
      }));
    } catch (error) {
      console.log("like error is:", error);
    }
  }

  // Post time display
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

  // Get YouTube ID from URL
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

  // Open video page
  const openVideoPage = (resource) => {
    window.open(`/video/${resource._id}`, "_blank");
  };

  // Handle resource click (video or other types)
  const handleResourceClick = async (resource) => {
    await handleView(resource._id); // Increment view count

    if (resource.type === 'video') {
      openVideoPage(resource); // it pass the id
    } else {
      window.open(resource.url, "_blank", "noopener noreferrer");
    }
  };

  // Call the function come from parent
  const handleDeleteClick = (id) => {
    onDelete(id); // call parent function
  }

  const handleUpdateClick = (id) => {
    onUpdate(id);
  }

  // Increment views and update localResources
  const handleView = async (id) => {
    try {
      // check for user
      if (!user || !user.id) {
        console.log("User not found or no user ID");
        return;
      }

      console.log("Calling incrementViews with:", id, user.id);
      const response = await resourceServices.incrementViews(id, user.id);
      console.log("the increase views:", response.data);

      // Update views in local copy
      setLocalResources(prev =>
        prev.map(r => r._id === id ? { ...r, views: response.data.views } : r)
      );
    } catch (error) {
      console.log("Error incrementing views:", error);
    }
  };


  return (
    <div className="w-full h-full max-w-[1100px] lg:ml-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {localResources.map((resource) => {
        const videoId = getYouTubeId(resource.url); // it will take the youtube video id
        const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null; // take the video thumbnail

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
                  {/* play button overlay */}
                  <div className="absolute inset-0 bg-black bg-opacity-10 flex items-center justify-center">
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

              {resource.type === 'blog' && (
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
            <div className="p-4 flex flex-col flex-1">


              <h1 className="font-semibold text-gray-800 mb-2">
                <span className="text-black font-bold">Title: </span>
                {resource.title}
              </h1>
              <p className="font-semi text-gray-800 mb-2">
                <span className="text-black font-bold">Term: </span>
                {resource.term?.name}
              </p>
              <div className="font-semibold text-gray-800 mb-4">
                <span className="text-black font-bold">Category: </span>
                {resource.category?.name}
              </div>



              <div className='flex justify-between items-center'>
                <div>
                  {resource.createdAt && <PostTime createdAt={resource.createdAt} />}
                  <button onClick={() => likeButton(resource?._id)}>
                    <FaThumbsUp
                      className={likedMap[resource._id]?.liked ? "text-blue-500" : "text-gray-500"}
                      size={20}
                    />
                  </button>

                  {/* Likes count */}
                  {likedMap[resource._id]?.likesCount > 0 && (
                    <span className="ml-2 text-sm text-gray-700">
                      {likedMap[resource._id]?.likesCount}
                    </span>
                  )}
                </div>

                <div className='mt-2'>
                  {/* Views display */}
                  <span className="ml-2">{resource.views} views</span>

                </div>



              </div>


              <div className='mb-4'>
                <button
                  onClick={() => handleResourceClick(resource)}
                  className="mt-2  w-full bg-blue-500 text-white px-3 py-1 rounded "
                >
                  Open {resource.type}
                </button>
              </div>
              {/* Buttons at bottom */}
              <div className="mt-auto flex items-center justify-between mb-2 ">
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
                    className={`rounded-full px-3 py-1 text-white text-center text-xs font-semibold ${resource.type === 'video'
                        ? 'bg-red-500'
                        : resource.type === 'link'
                          ? 'bg-blue-500'
                          : resource.type === 'blog'
                            ? 'bg-green-500'
                            : 'bg-gray-500'
                      }`}
                  >
                    {resource.type}
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default ResourceCard;
