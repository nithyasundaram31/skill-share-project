import { useEffect, useState } from "react";
import termServices from "../../services/termServices";
import { toast } from "react-toastify";
import { FaEdit, FaSpinner, FaTrash } from "react-icons/fa";
import ResourcePage from "./ResourcePage";


function TermPage() {

  const [showTerm, setShowTerm] = useState(false);
  const  [addTerm,setAddTerm]=useState('')  // this is a add term
    const [terms,setTerms]=useState([])
  const [loading,setLoading]=useState(true)
  const [editId, setEditId] = useState(null);


  const handleButton=()=>{
setShowTerm(!showTerm)
  }
  const  termSubmit= async(e)=>{
    e.preventDefault();
 try {
    if (editId) {
      // Update Mode
      const response = await termServices.updateTerm(editId, { name: addTerm });
      console.log(response.data)
      toast.success("Term updated successfully");
      fetchAllTerms()
      setEditId(null); // Reset edit mode
    } else {
      // Create Mode
      const response = await termServices.createTerm({ name: addTerm });
      setTerms(prev => [...prev, response.data.term]); //[...prev, newItem]
      toast.success("Term created successfully");
    }
    
    setAddTerm("");
    setShowTerm(false);
    
  } catch (error) {
    console.log("the edit error is:",error)
    toast.error(error.response?.data?.message || "Something went wrong");
  }  
}; 


  const fetchAllTerms = async () => {
  try {
    const response = await termServices.getTerms();
    setTerms(response.data.terms);
    console.log("get all terms is :", response.data.terms)
  } catch (error) {
    toast.error("Failed to fetch terms");
  } finally {
    setLoading(false);
  }
};

  useEffect(()=>{
fetchAllTerms();
  },[])


  if(loading){
   return <div className="flex justify-center items-center  text-xl p-6 "> 
   <div> <FaSpinner className="animate-spin text-gray-500" size={40}/></div>
   
   </div>
  }

   
  
  
  const handleDelete=async(id)=>{
    try{
       const response= await termServices.deleteTerm(id);
     console.log(response.data)
     toast.success("Term deleted successfully")
     setTerms((prevTerms) => prevTerms.filter(term => term._id !== id)); //after deleting it filter the deleted item 

    }catch(error){
     toast.error(error.response.data?.message ||"failed to delete term")
      console.log("term deleting error:",error)
    }
      
  }

const handleEdit = (id) => {
  const termToEdit = terms.find(term => term._id === id);
  if (termToEdit) {
    setAddTerm(termToEdit.name); // Prefill form
    setEditId(id); // Store the id of the term being edited
    setShowTerm(true); // Show form
  }
};



  return (
     <>
    <div className="w-full max-w-[600px]  mx-auto flex justify-center  flex-col items-center">
      <h1 className="text-3xl text-violet-500 font-bold mb-4 text-center">
        Terms Management
      </h1>

      <button
        onClick={handleButton}
        className="mb-4 w-[90%] md:w-[40%] rounded px-4 py-3 bg-green-500 text-white text-xl font-semibold transition hover:bg-green-600 transform active:scale-90"
      >
        Add New Term
      </button>

      {showTerm && (
        <form onSubmit={termSubmit} className="border p-4 py-6  w-full flex flex-col items-center shadow mb-4 ">
          <label className="text-xl font-semibold mb-2">Name</label>
          <input 
           value={addTerm}
  onChange={(e) => setAddTerm(e.target.value)}
            className="border  w-[90%] md:w-[50%] p-3 border-black border-2 rounded mb-4" placeholder="Ex: Web Developer"
          />
          <button
           type="submit" 
           className="bg-blue-500 text-base font-bold  w-[90%] md:w-[50%] px-2 py-3 rounded  text-white font-semibold transition transform active:scale-90">
            {editId ? "Update Term" : "Save Term"}
          </button>
        </form>

      )}

{terms.length===0?<div className='text-gray-700'>No data found</div> :(
<table className="  w-full border p-4">
  <thead className="border ">
    <tr  className="text-base bg-gray-100">
      <th className="border-l p-2">SI NO</th>
      <th className="border-l  ">Name</th>
      <th className="border-l  ">Actions</th>
    </tr>
  </thead>
 <tbody className="border text-center">
 {terms.map((term,index) => (
      <tr key={term._id}>
        <td className="border-l border-b p-4">{index + 1}</td>
        <td className="border-l  border-b p-4">{term.name}</td>
        <td className="border-l  border-b space-x-2 p-4">
           <button onClick={()=>handleEdit(term._id)} className="text-blue-500 "> <FaEdit  

            className="w-4  h-4"/>
            </button>
             <button   onClick={()=>handleDelete(term._id)}  className="text-red-500"><FaTrash className="w-4  h-4"/></button>
        </td>
      </tr>
    ))}
    
     
  </tbody>
</table>
    


)
  }
  
    </div>
  
     </>
       
  );

}
 
export default TermPage