import { useEffect, useState } from "react";
import termServices from "../../services/termServices";
import { toast } from "react-toastify";

function TermPage() {

  const [showTerm, setShowTerm] = useState(false);
  const  [term,setTerm]=useState('')

  const handleButton=()=>{
setShowTerm(true)
  }
  const  termSubmit= async(e)=>{
    e.preventDefault();
 
    try{
  const response=  await termServices.createTerm({name:term})
  console.log(" ther create term is:",response.data )
setTerm('')
setShowTerm(false)
toast.success("term creation successfully")
    }catch(error){
        console.log("Term creation error is:", error)
        toast.error(error.response.data?.message)
    }

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
        <form onSubmit={termSubmit} className="border p-4 py-6  w-full flex flex-col items-center shadow ">
          <label className="text-xl font-semibold mb-2">Name</label>
          <input 
           value={term}
  onChange={(e) => setTerm(e.target.value)}
            className="border  w-[90%] md:w-[50%] p-3 border-black border-2 rounded mb-4" placeholder="Ex: Web Developer"
          />
          <button
           type="submit"
           className="bg-blue-500 text-base font-bold  w-[90%] md:w-[50%] px-2 py-3 rounded  text-white font-semibold transition transform active:scale-90">
            Save Term
          </button>
        </form>

      )}

    </div>
  );
}

export default TermPage