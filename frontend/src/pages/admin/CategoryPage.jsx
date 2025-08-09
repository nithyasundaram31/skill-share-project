import React, { useState } from 'react'

function CategoryPage() {
 const [showToggle,setShowToggle]=useState(false)
    const handleButton=()=>{

setShowToggle(!showToggle)
console.log("add new category open toggle" )
    }
  return (
    <>
    <div className='w-full max-w-[600px] flex flex-col justify-center items-center p-2'>
         <h1 className='text-3xl  text-violet-500 font-bold  mb-4 '>Category Management</h1>
     <button onClick={handleButton} className='px-4 py-3 w-[90%] md:w-[40%]   rounded font-semibold transform transition active:scale-90 p-4 hover:bg-green-600 text-white bg-green-500 text-xl mb-4'>Add New Category</button>
   
{showToggle && (
     <>
    <div className='border shadow rounded p-4 w-[100%] mb-4 md:ml-10'>
        <form className=' flex flex-col justify-center  items-center'>
<label className='text-xl text-center font-bold mb-2'>Name</label>
<input className='w-[90%] md:w-[50%] border p-4 mb-4  ' placeholder="Eg:frontend developer" />
<button className='px-4 py-3 w-[90%] md:w-[50%] rounded  bg-blue-500 text-white  font-semibold transform transition active:scale-90 hover:bg-blue-600 '>save category</button>

        </form>

    </div>
    </>)}

      


    </div>
    
    </>
   
  )
}

export default CategoryPage