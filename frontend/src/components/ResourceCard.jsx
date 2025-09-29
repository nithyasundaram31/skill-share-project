import React, { useEffect, useState } from 'react';
import { FaBookmark, FaFileAlt, FaFilePdf, FaLink, FaPlay, FaRegBookmark, FaThumbsUp } from 'react-icons/fa';
import resourceServices from '../services/resourceServices';
import { useNavigate } from 'react-router';
import bookmarkServices from '../services/bookmarkServices';

function ResourceCard({ pageType, onViewsUpdate, resources, onUpdate, onDelete }) {
  const user = JSON.parse(localStorage.getItem("user"));
  const navigate = useNavigate();  
  
  const [likedMap, setLikedMap] = useState({}); // Track likes for each resource individually
  const [bookmarkedMap, setBookmarkedMap] = useState({}); // Track bookmarks for each resource
  const [currentPage, setCurrentPage] = useState(1) //all the pages start from 1 

  // Initialize likedMap and bookmarkedMap when resources or user.id change
  useEffect(() => {
    const initLikeMap = {};
    resources.forEach(res => {
      initLikeMap[res._id] = {
        liked: res.likes?.some(u => u.toString() === user.id.toString()),
        likesCount: res.likes?.length || 0,
      };
    });
    setLikedMap(initLikeMap);

    // Fetch user bookmarks from backend
    const fetchBookmarks = async () => {
      try {
        const response = await bookmarkServices.getUserBookmarks(user.id);
        console.log("Fetched bookmarks:", response.data);

        const userBookmarks = response.data;
        const initBookmarkMap = {};

       
userBookmarks.forEach(b => {
  if (b.resource) {            
    initBookmarkMap[b.resource._id] = true;
  }
});

        setBookmarkedMap(initBookmarkMap);
      
      } catch (err) {
        console.error("Error fetching bookmarks:", err);
      }
    };

    fetchBookmarks();
  }, [resources, user.id]);

  // Function to handle like button click
  const likeButton = async (id) => {
    try {
      const response = await resourceServices.toggleLike(id, user.id);
      console.log("like response is:", response.data);

      // Update the likedMap state
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
  };

  // Function to handle bookmark toggle
  const handleBookmark = async (id) => {
    try {
      console.log("User ID:", user.id);
      console.log("Bookmarking resource:", id);
      
      const response = await bookmarkServices.toggleBookmark(id, user.id);
      console.log("Bookmark response:", response.data);

      // Use the reliable isBookmarked flag from backend
      const newBookmarkStatus = response.data.isBookmarked;

      setBookmarkedMap(prev => ({
        ...prev,
        [id]: response.data.isBookmarked,
      }));

      console.log(`Resource ${id} bookmark status: ${newBookmarkStatus}`);
    } catch (error) {
      console.error("Bookmark error:", error);
      console.log("Error response:", error.response?.data);
    }
  };

   if( onUpdate){
     onUpdate()   //after remove bookmark it refresh
  }


  // PostTime function
  const PostTime = ({ createdAt }) => {
    const now = new Date();
    const created = new Date(createdAt);
    const diffMs = now - created;

    const diffMinutes = Math.floor(diffMs / (1000 * 60));
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

    if (diffDays >= 1) return <p className="text-xs text-gray-500">Posted {diffDays} days ago</p>;
    else if (diffHours >= 1) return <p className="text-xs text-gray-500">Posted {diffHours} hours ago</p>;
    else return <p className="text-xs text-gray-500">Posted {diffMinutes} minutes ago</p>;
  };

  // YouTube ID from URL
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

  // Handle click on resource 
  const handleResourceClick = async (resource) => {
    await handleView(resource._id); // Increment view count

    if (resource.type === 'video') {
      navigate(`/video/${resource._id}`); // redirect to video page
    } else {
      window.open(resource.url, "_blank", "noopener noreferrer"); // open PDF/blog/link
    }
  };

  // Call parent delete function
  const handleDeleteClick = (id) => onDelete(id);

  // Call parent update function
  const handleUpdateClick = (id) => onUpdate(id);

  // Increment views count and update state
  const handleView = async (id) => {
    try {
      if (!user || !user.id) return;
      const response = await resourceServices.incrementViews(id, user.id);
      console.log("view response:", response.data);
        // Tell parent to update state
    if (onViewsUpdate) {
      onViewsUpdate(id, response.data.views);  //resource id  and for that views 
    }
    } catch (error) {
      console.log("Error incrementing views:", error);
    }
  };

  //pagination
  const itemsPerPage = 12;
  const startIndex = (currentPage - 1) * itemsPerPage; //0
  const endIndex = startIndex + itemsPerPage;     //0+12=12
  const currentItems = resources.slice(startIndex, endIndex); //(0,12) it will slice to 0 to untill 11
  const totalPages = Math.ceil(resources.length / itemsPerPage);

  const prevButton = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const nextButton = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  return (
    <>
      <div className="w-full h-full max-w-[1100px] md:ml-16  grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {currentItems.map((resource) => {
          const videoId = getYouTubeId(resource.url);
          const thumbnailUrl = videoId ? `https://img.youtube.com/vi/${videoId}/hqdefault.jpg` : null;

          return (
            <div
              key={resource._id}
              className="bg-white rounded-lg shadow-lg text-black cursor-pointer overflow-hidden flex flex-col"
            >
              {/* Preview area */}
              <div className="h-44 w-full flex items-center justify-center bg-gray-200 overflow-hidden">
                {resource.type === 'video' && thumbnailUrl && (
                  <div onClick={() => handleResourceClick(resource)} className="relative w-full h-full transform transition-all duration-200 hover:scale-105 hover:shadow-xl">
                    <img src={thumbnailUrl} alt={resource.title} className="w-full h-full object-cover" />
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

                <div className='flex justify-between  space-y-2  items-center'>
                  <div>
                    <div className='mb-2'>
                      {resource.createdAt && <PostTime createdAt={resource.createdAt} />} 
                    </div>

                    <button onClick={() => likeButton(resource._id)}>
                      <FaThumbsUp
                        className={likedMap[resource._id]?.liked ? "text-blue-500" : "text-gray-500"}
                        size={20}
                      />
                    </button>
                    {likedMap[resource._id]?.likesCount > 0 && (
                      <span className="ml-2 text-sm text-gray-700">{likedMap[resource._id]?.likesCount}</span>
                    )}
                  </div>
                  {/* //views */}
                  <div className='mt-2'>
                    {resource.views > 0 && ( 
                      <span className="ml-2">{resource.views} </span>
                    )}
                    <span>views</span>
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

                {/* Bottom buttons */}
               {/* Bottom buttons */}
<div className="mt-auto flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-2">
  {user.role === 'admin' ? (
    <div className="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full sm:w-auto">
      <button
        onClick={() => handleUpdateClick(resource._id)}
        className="bg-blue-500 text-white font-semibold rounded text-sm px-3 py-1 w-full sm:w-auto"
      >
        Update
      </button>
      <button
        onClick={() => handleDeleteClick(resource._id)}
        className="bg-red-600 text-white font-semibold rounded text-sm px-3 py-1 w-full sm:w-auto"
      >
        Delete
      </button>
    </div>
  ) : (
    <button onClick={() => handleBookmark(resource._id)} className="w-fit">
      {bookmarkedMap[resource._id] ? (   
        <FaBookmark className="text-blue-500 text-xl" />
      ) : (
        <FaRegBookmark className="text-gray-500 text-xl" />
      )}
    </button>
  )}

  {resource.type && (
    <div
      className={`rounded-full px-3 py-1 text-white text-center text-xs font-semibold w-fit ${
        resource.type === 'video'
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

      {currentItems.length === 0 ? (
        pageType === "bookmark" && (
          <div className='text-center  mt-6 font-semibold text-base '>Bookmarked not found</div>
        )
      ) : (
        <div className='flex justify-center gap-4 items-center mt-6 '>
          <button onClick={prevButton} className='px-4 py-2 font-semibold bg-gray-100 border rounded  transition transform hover:bg-gray-200 active:scale-90'>Prev</button>
          <span>Page {currentPage} of {totalPages}</span>
          <button onClick={nextButton} className='px-4 py-2 font-semibold  bg-gray-100 border transition transform hover:bg-gray-200 active:scale-90'>Next</button>
        </div>
      )}
     
    </>
  );
}

export default ResourceCard;
