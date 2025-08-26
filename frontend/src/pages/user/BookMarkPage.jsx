import React, { useEffect, useState } from 'react'
import bookmarkServices from '../../services/bookmarkServices';
import { useParams } from 'react-router';
import ResourceCard from '../../components/ResourceCard';
import { FaSearch, FaSpinner } from 'react-icons/fa';

function BookMarkPage() {
 const [bookmarked, setBookmarked] = useState([]);
 const [bookmarkSearch,setBookmarkSearch]=useState("")
 const [loading,setLoading]=useState(true)
const { id } = useParams(); // this is userId from params


 const fetchAllBookmarks = async (userId) => {
    try {
      const response = await bookmarkServices.getUserBookmarks(userId);
      setLoading(false)
      setBookmarked(response.data.map(b => b.resource)) //we want resource so we take resource from bookmark array
      console.log("fetch all bookmarks:", response.data);
    
    } catch (error) {
      // console.log("all bookmark error is:", error.response?.data);
       console.log("all bookmark error is:", error); 
    }
  }

useEffect(() => {
  if (id) {
    fetchAllBookmarks(id)
  }; // argumentpass id to function
}, [id]); 


if(loading){
      return <div className='flex justify-center items-center  p-4' >
        <FaSpinner className="animate-spin text-gray-500" size={40} />
        </div>
  
}
//search method

const filteredBookmarks = bookmarked.filter(item =>
  item.title.toLowerCase().includes(bookmarkSearch.toLowerCase())
);


  return (
    <>
   <div className="flex justify-center items-center mt-6 mb-6">
  <div className="relative w-full md:w-[50%]">
    
    <FaSearch className="absolute left-3 top-3  text-gray-500" />

    <input
    value={bookmarkSearch}
    onChange={(e)=>setBookmarkSearch(e.target.value)}
      type="text"
      placeholder="Search..."
      className="w-full pl-10 pr-4 py-2 border rounded-full "
    />
  </div>
</div>

     <ResourceCard     resources={filteredBookmarks}   //filtered bookmarks for UI     
      onUpdate={() => fetchAllBookmarks(id)}
       pageType="bookmark" 
      />  
        
     
    
    </>
    
  );
}

                
  
                           
                  
export default BookMarkPage