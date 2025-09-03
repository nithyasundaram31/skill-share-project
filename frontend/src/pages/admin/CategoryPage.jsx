import React, { useEffect, useState } from 'react'
import categoryServices from '../../services/categoryServices'
import { toast } from 'react-toastify'
import { FaEdit, FaSpinner, FaTrash } from 'react-icons/fa'

function CategoryPage() {
  const [showToggle, setShowToggle] = useState(false)
  const [category, setCategory] = useState('')  //add category    `
  const [categories,setCategories]=useState([])
  const [loading,setLoading]=useState(true);
  const[editId,setEditId]=useState(null); 
  const handleButton = () => {

    setShowToggle(!showToggle)
  }

  const addCategory = async (e) => {
    e.preventDefault()
try{ 
  
  if(editId){
const response =await categoryServices.updateCategory(editId,{name:category})
fetchCategories();
setEditId(null); //reset edit mode 
toast.success("category updated successfully")
console.log("category update is:",response.data)

    } else{
      const response = await categoryServices.createCategory({ name: category }); //the value post in category state update 
      console.log(" add category response is :", response.data)
      toast.success("category created successfully")
      fetchCategories()
      
    }
     setCategory("")
      setShowToggle(false) 

  }catch (error) {
    if (editId) {
    toast.error("Update failed! Please try again.");
  } else {
    toast.error("Create failed! Please try again.");
  }
//  toast.error(error.response.data?.message )
      console.log("the category error is:", error)
    }
   
    

  }
  
  //get all categories
const fetchCategories=async()=>{
  try{
const response=await categoryServices.getCategories();
console.log("fetch all categories:",response.data)
setCategories(response.data)
setLoading(false)
  }catch(error){
console.log("fetch categories error:",error)

  }

}

useEffect(()=>{
  fetchCategories()
},[])

if(loading){
   return <div className="flex justify-center items-center  text-xl p-6 "> 
   <div> <FaSpinner className="animate-spin text-gray-500" size={40}/></div>
   
   </div>
  }

//delete category
const handleDelete=async(id)=>{
try{
  const response= await categoryServices.deleteCategory(id);
  console.log("category deleted:",response.data)
   setCategories((prevCategory) => prevCategory.filter(category => category._id !== id)); //after deleting it filter the deleted item
toast.success("Category deleted successfully")

}catch(error){
  toast.error("failed to category delete")
console.log('delete category is:',error)
}
}

//category edit
 const handleEdit=(id)=>{
  const categoryFind=categories.find( category=>category._id===id)
  if(categoryFind){
setShowToggle(true);
setEditId(id) //id track to which user id have to upadte by api call . it update the sate in (editId)
setCategory(categoryFind.name)  //prefill in the form

  }

 }



  return (
    <>
      <div className='w-full max-w-[600px]  mx-auto flex flex-col justify-center items-center p-2'>
        <h1 className='text-3xl  text-violet-500 font-bold  mb-4 '>Category Management</h1>
        <button onClick={handleButton} className='px-4 py-3 w-[90%] md:w-[40%]   rounded font-semibold transform transition active:scale-90 p-4 hover:bg-green-600 text-white bg-green-500 text-xl mb-6'>Add New Category</button>

        {showToggle && (
          <>
            <div className='border shadow rounded p-4 w-[100%] mb-4 md:ml-10'>
              <form className=' flex flex-col justify-center  items-center'>
                <label className='text-xl text-center font-bold mb-2'>Name</label>
                <input
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className='w-[90%] md:w-[50%] border p-4 mb-4  ' placeholder="Eg:frontend developer" />
                <button onClick={addCategory} className='px-4 py-3 w-[90%] md:w-[50%] rounded  bg-blue-500 text-white  font-semibold transform transition active:scale-90 hover:bg-blue-600 '>
                {editId?"Update category":"Create category"}</button>

              </form>

            </div>
          </>)}
          
    {categories.length === 0 ? (
  <div className='text-gray-700'>No data found</div>
) : (
  <table className='w-full md:ml-10 border'>
    <thead>
      <tr className='bg-gray-100'>
        <th className='border-l-2 border-b'>SI NO</th>
        <th className='border-l border-b p-2'>NAME</th>
        <th className='border-l border-b p-2'>ACTIONS</th>
      </tr>
    </thead>
    <tbody className='text-center'>
      {categories.map((category, index) => (
        <tr key={category._id}>
          <td className='border-l border-b p-4'>{index + 1}</td>
          <td className='border-l border-b p-4'>{category.name}</td>
          <td className='border-l border-b p-4 space-x-2'>
            <button
              onClick={() => handleEdit(category._id)}
              className='text-blue-500'
            >
              <FaEdit className="w-4 h-4" />
            </button>
            <button
              onClick={() => handleDelete(category._id)}
              className='text-red-500'
            >
              <FaTrash className="w-4 h-4" />
            </button>
          </td>
        </tr>
      ))}
    </tbody>
  </table>
)}

      </div>

    </>

  )
}

export default CategoryPage