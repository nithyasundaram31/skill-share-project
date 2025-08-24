import React, { useState } from 'react'
import { FaBookmark } from "react-icons/fa";  
import { FaRegBookmark } from "react-icons/fa";  
 

function BookMarkPage() {
 const [bookmarked, setBookmarked] = useState(false);

  return (
    <div className="flex items-center gap-2">
      <h3 className="font-semibold">Resource Title</h3>
      <button onClick={() => setBookmarked(!bookmarked)}>
        {bookmarked ? (
          <FaBookmark className="text-blue-500 text-xl" />
        ) : (
          <FaRegBookmark className="text-gray-500 text-xl" />
        )}
      </button>
    </div>
  );
}

                
  
                           
                  
export default BookMarkPage