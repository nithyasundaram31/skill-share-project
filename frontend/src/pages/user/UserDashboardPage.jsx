import React, { useEffect, useState } from 'react'
import resourceServices from '../../services/resourceServices';
import bookmarkServices from '../../services/bookmarkServices';
import {  CheckCircle,  FileText,  Info, Link2, PlayCircle, Star, ThumbsUp } from 'lucide-react';
import { FaBookmark, FaRegBookmark } from 'react-icons/fa';
import { useNavigate } from 'react-router';



function UserDashboardPage({}) {
   const [resources, setResources] = useState([]); //this is also a parent page so we cannot pass as a prop from resource page // resources state
  const [bookmarkedMap, setBookmarkedMap] = useState({});
  const user=JSON.parse(localStorage.getItem('user'))
  const navigate=useNavigate()

  // const { id } = useParams(); // this is userId from params
  const[bookmark,setBookmarked]=useState([])
  
   const fetchAllBookmarks = async (userId) => {
      try {
        const response = await bookmarkServices.getUserBookmarks(userId);
        // setLoading(false)
        setBookmarked(response.data) //we want resource so we take resource from bookmark array
        console.log("fetch all bookmarks:", response.data);
      
      } catch (error) {
        // console.log("all bookmark error is:", error.response?.data);
         console.log("all bookmark error is:", error); 
      }
    }
  
  useEffect(() => {
    if (user.id) {
      fetchAllBookmarks(user.id)
    }; // argumentpass id to function
  }, []); 
  
  
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

     useEffect(()=>{
         const fetchAllResource = async () => {
      try {
        const response = await resourceServices.getResources();
        console.log("get all resources:",response.data)
        setResources(response.data);
      } catch (error) {
        console.log("error in fetch all resource", error);
      }
    };
    fetchAllResource();
      },[])

useEffect(()=>{

  const fetchBookmarks = async () => {
      try {
        const response = await bookmarkServices.getUserBookmarks(user.id);
        console.log("Fetched bookmarks in dashboard part:", response.data);

        const userBookmarks = response.data;
        const initBookmarkMap = {};

        // userBookmarks.forEach(b => {
        //   initBookmarkMap[b.resource._id] = true; // mark as bookmarked
        // });

        userBookmarks.forEach(b => {
  if (b.resource) {   // ✅ only add valid ones
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

       // Handle click on resource 
  const handleResourceClick = async (resource) => {
   
    if (resource.type === 'video') {
      navigate(`/video/${resource._id}`); // redirect to video page
    } else {
      window.open(resource.url, "_blank", "noopener noreferrer"); // open PDF/blog/link
    }
  };

  return (
   <>
   <div className='w-full md:max-w-[90%] md:ml-20 bg-white p-6'>
    <h1 className='text-xl font-bold '> Welcome back, {user?.name?.charAt(0).toUpperCase() + user?.name?.slice(1)} !</h1> 
    <hr className='mt-6'/>

    <div>
      <div className='flex  flex-row gap-2 items-center  mt-4 mb-4'>
      <span> <Info className="w-4 h-4" /></span> <span className='text-2xl font-semibold '>Quick Stats</span> 
      </div>
      <ul className='border border-l-blue-600  border-l-4  rounded p-4 list-disc list-inside'>
        <li>Resources:{resources?.length}</li>
        <li>Bookmarked:{Object.keys(bookmarkedMap).length}</li>
        <li>Likes</li>
            
      </ul>
    </div>

    <div  className='flex  flex-row gap-2 items-center mb-2  mt-4'> 
      <Star className="w-5 h-5 " />
      <span className='text-2xl font-semibold'>RecentBook Marks</span>
      </div>

      {/* recent bookmarks */}
     <div className=' flex flex-col gap-4 '>
  {bookmark?.filter((b) => b.resource) 
  .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
  .slice(0, 5).map((book) => (
    <>
    <div key={book?.id} className="  bg-white p-3 rounded shadow">
    <div className='flex flex-col'>
    <div className='md:flex  md:justify-between '>
    <div className='flex  text-xl font-semibold gap-2'>
        <div>{book?.resource?.title}</div> <span>({book?.resource?.type})</span>
      </div>

       <div className=' flex border rounded '>
        <div className='flex flex-row gap-2 justify-center items-center'>
           <button
                    onClick={() => handleResourceClick(book?.resource)}
                    className="mt-2  w-full  text-black px-3 py-1 rounded "
                  >
                    {book?.resource?.type==='video'?
                    <div className='flex gap-2 mb-2 '>
                        <span><PlayCircle size={20}  /></span> <span>Watch</span>
                    </div>
                   
                     :book?.resource?.type==='link'||book?.resource?.type==='blog'?
                     <div className='flex gap-2 mb-2'>
                        <span><Link2 size={20} /></span><span>Open</span>
                     </div>
                    
                     : book?.resource?.type==='pdf'?
                      <div className='flex gap-2 mb-2'>
                        <span > <FileText size={20} /></span><span>Open</span>
                     </div> 
                    :null
                    }
                  </button>
        
    {/* <button className=' bg-gray-100  border-r px-6 py-1'> Watch</button> */} 
    </div>
       
     
     <div className='flex flex-row  justify-center items-center gap-2 p-2'>
       <button onClick={() => handleBookmark(book?.resource?._id)}>
                           {bookmarkedMap[book?.resource?._id] ? (   
                             <FaBookmark className="text-blue-500 text-xl" />
                           ) : (
                             <FaRegBookmark className="text-gray-500 text-xl" />
                           )}
                         </button>
                         <div>Remove</div>
     </div>
    
    </div>
    </div>
    

      <div className='flex flex-row items-center gap-2'> 
         <span><CheckCircle size={14}   className="text-gray-600"/></span>
         <span className='text-semibold'>Term: {book?.resource?.term?.name}</span> 
          
          </div>
          <div className='flex flex-row items-center gap-2'>
             <ThumbsUp size={16} className="text-blue-500" />
             <span>{book?.resource?.likes.length}</span>
          </div>
      
    </div>
   
      
       
    </div>
  
    </>
    
  ))}
</div>

      

    </div>
   

   </>
  )
}

export default UserDashboardPage