import { useEffect, useState } from "react";
import termServices from "../../services/termServices";
import { toast } from "react-toastify";
import { FaEdit, FaTrash } from "react-icons/fa";

function TermPage() {

  const [showTerm, setShowTerm] = useState(false);
  const  [addTerm,setAddTerm]=useState('')  // this is a add term
  const [terms,setTerms]=useState([]) //this is a all gets to fetch
  const [loading,setLoading]=useState(true)

  const handleButton=()=>{
setShowTerm(!showTerm)
  }
  const  termSubmit= async(e)=>{
    e.preventDefault();
 
    try{
  const response=  await termServices.createTerm({name:addTerm})
  console.log(" ther create term is:",response.data )
setAddTerm('')
setShowTerm(false)
fetchAllTerms();
toast.success("term creation successfully")
    }catch(error){
        console.log("Term creation error is:", error)
        toast.error(error.response.data?.message)
    }

  }

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

    return <div className="text-center p-6 "> Loading </div>
  } 
  
  const handleDelete=async(id)=>{
    try{
       const response= await termServices.deleteTerm(id);
     console.log(response.data)
     toast.success("term deleted successfully")
     setTerms((prevTerms) => prevTerms.filter(term => term._id !== id)); //after deleting it filter the deleted item 

    }catch(error){
      console.log("term deleting error:",error)
    }
    
  }

  const handleUpdate=()=>{
    
  }


  return (
    <div className="w-full max-w-[600px] flex flex-col items-center">
      <h1 className="text-3xl text-violet-500 font-bold mb-4 text-center">
        Terms Management
      </h1>

      <button
        onClick={handleButton}
        className="mb-4 w-[90%] md:w-[40%] px-4 py-4 bg-green-500 text-white text-xl font-semibold transition hover:bg-green-600 transform active:scale-90"
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
            Save Term
          </button>
        </form>

      )}

  <table className="  w-full border p-4">
  <thead className="border p-6">
    <tr >
      <th className="border-l p-2">SI NO</th>
      <th className="border-l p-6 ">Name</th>
      <th className="border-l p-6 ">Actions</th>
    </tr>
  </thead>
 <tbody className="border text-center">
 {terms.map((term, index) => (
      <tr key={index}>
        <td className="border-l border-b p-6">{index + 1}</td>
        <td className="border-l  border-b p-6">{term.name}</td>
        <td className="border-l  border-b space-x-2 p-6">
           <button className="text-blue-500 "> <FaEdit  onClick={()=>handleUpdate(term._id)} className="w-4  h-4"/></button>
             <button   onClick={()=>handleDelete(term._id)}  className="text-red-500"><FaTrash className="w-4  h-4"/></button>
        </td>
      </tr>
    ))}
    
     
  </tbody>
</table>
    

    </div>
  );
}

export default TermPage