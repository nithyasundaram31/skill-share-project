// VideoPage.jsx
import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import { useParams } from 'react-router-dom';
import resourceServices from '../../services/resourceServices'; // backend service import
import commentServices from '../../services/commentServices';
import { MdAccountCircle } from 'react-icons/md';
import { toast } from 'react-toastify';

function VideoPage() {
  const { id } = useParams(); // it will take the videoId by useParams

  const [video, setVideo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [views, setViews] = useState(0)
  const [text, setText] = useState("");
  const [comments, setComments] = useState([]);

  const currentUser = JSON.parse(localStorage.getItem("user")); // example

  useEffect(() => {
    const fetchVideo = async () => {
      try {
        const res = await resourceServices.getResourceById(id);
        setVideo(res.data);               // Set video data
        setViews(res.data.views);         // Set initial views without incrementing yet
      } catch (err) {
        console.log("Error fetching video:", err);
      } finally {
        setLoading(false);
      }
    };
    if (id) fetchVideo();
  }, [id]);


  // Increment views only once

  useEffect(() => {
    const incrementViews = async () => {
      try {
        const res = await resourceServices.incrementViews(id);
        setViews(res.data.views);
      } catch (err) {
        console.log("Error incrementing views:", err);
      }
    };
    if (id) incrementViews();
  }, []); // empty dependency runs only once when component mounts


  //handleComments

  const handleComments = async (e) => {
    e.preventDefault()
    const currentUser = JSON.parse(localStorage.getItem("user")); // example
    const userId = currentUser?.id;
    console.log("current userId is", currentUser)
    try {
      const response = await commentServices.createComment({
        resource: id,   // video id from useParams
        user: userId,
        text: text
      })
      setComments((prev) => [...prev, response.data]);
      setText("")
      console.log("comment response is", response.data)

    } catch (error) {
      console.log("comments create error", error)
    }

  }


  const fetchComments = async () => {
    try {
      const response = await commentServices.getComments(id)
      console.log("the all fetch comments response is:", response.data)
      setComments(response.data)
    } catch (error) {
      console.log("the error comment fetch is:", error)
    }


  }
  useEffect(() => {
    fetchComments()
  }, [])


  //delete command 
  const deleteComment = async (id) => {
    try {
      const response = await commentServices.deleteComment(id)
      fetchComments();
      toast.success("comment deleted successfully")
      console.log("comment deleted:", response)
    } catch (error) {
      console.log("comment deleted error", error)
    }
  }



  if (loading) return <p className="p-6">Loading...</p>;
  if (!video) return <p className="p-6">Video not found</p>;

  // YouTube embed URL
  const embedUrl = video.url?.replace("watch?v=", "embed/");  //it open only vedio not actual coments likes 

  return (
    <>
      <div className='p-6'>
        {/* Search bar */}
        <div className='mb-6 w-full md:w-[60%] rounded-l-full rounded-r-full p-2 mx-auto border'>
          <div className='flex items-center'>
            <input
              className="flex-1 outline-none"
              placeholder="   Search"
            />
            <FaSearch size={20} color="gray" />
          </div>
        </div>
        <div className='md:flex gap-8'>
          <div className='w-full md:max-w-[67%]'>
            {/* YouTube Video Embed */}
            <iframe
              className="rounded-lg mb-4  w-[450px] md:w-[870px] h-[315px] md:h-[400px]"
              height="400"
              src={embedUrl}
              title={video.title}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              frameBorder="0"
              allowFullScreen
            ></iframe>

            {/* Video title */}
            <h1 className="text-2xl font-bold mb-2">{video.title}</h1>

            {/* Video description */}
            <div className="mb-4 bg-gray-200 p-4 rounded">
              <div className='flex mb-2'>
                <h1 className='mr-4'>
                  {video?.createdAt
                    ? new Date(video.createdAt).toLocaleDateString('en-GB', {
                      day: '2-digit',
                      month: 'long',
                      year: 'numeric'
                    })
                    : ''}
                </h1>
                <h1>{views} Views </h1>
              </div>
              <p>{video.description}</p>
            </div>

            {/* //coments-section */}
            <div>
              <h1 className='font-bold text-xl mb-2 '> Comments</h1>
              <form onSubmit={handleComments}>
                <input value={text} onChange={(e) => setText(e.target.value)} className='w-full p-2 border rounded mb-2 ' placeholder='Add a comment...' />
                <div className="flex justify-end mb-2 ">
                  <button type="submit" className='bg-black rounded-full px-3 py-1 text-white'>
                    Submit
                  </button>
                </div>  </form>

            </div>

            {comments.length === 0 ? <div className='text-base font-semibold'>No comments Yet</div> 
            : (comments.map((comment) => (
              <div className="bg-white shadow mb-2 p-2 " key={comment?._id}>
                <div className=''>

                  <div className='flex text-center gap-4 mb-2'>
                    <span><MdAccountCircle className='text-blue-600 w-8 h-8' /></span>
                    <p className='text-semibold'>{comment?.user?.name}</p>
                  </div>

                  <div className='flex justify-between items-center'>
                    <div className='ml-12'>
                      <p>{comment?.text}</p>
                    </div>



                    {currentUser?.role === "admin" && (
                      <button onClick={() => deleteComment(comment?._id)} className='px-2 py-1  rounded text-white   bg-red-500'> Delete</button>
                    )}
                  </div>
                </div>

              </div>

            )
            ))}


          </div>
          <div >
            <h1 className='hidden md:block ml-12 text-center text-blue-600' > No Recommentation available</h1>
          </div>

        </div>
      </div>
    </>
  );
}

export default VideoPage;
