
import React, { useEffect, useState } from 'react'
import { FaPlus, FaSearch, FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify';
import termServices from '../../services/termServices';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, selectDescription, selectLikes, selectTerm, selectTitle, selectType, selectUrl, setCategory, setDescription, setTerm, setTitle, setType, setUrl } from '../../redux/features/admin/resourceSlice';
import categoryServices from '../../services/categoryServices';
import resourceServices from '../../services/resourceServices';
import ResourceCard from '../../components/ResourceCard';
import { SiPandora } from 'react-icons/si';

function ResourcePage() {
  const [showToggle, setShowToggle] = useState(false);
  const [terms, setTerms] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [editId, setEditId] = useState(null); // tract editid 
  const [resources, setResources] = useState([]); // resources state
  const [filterType, setFilterType] = useState("all"); //initial state all in filtered dropdowns
  
  const title = useSelector(selectTitle) //useSelector is read the redux store
  const term = useSelector(selectTerm)
  const category = useSelector(selectCategory)
  const type = useSelector(selectType)
  const url = useSelector(selectUrl)
  const description=useSelector(selectDescription)
  const [pdfFile, setPdfFile] = useState(null);
  const likes = useSelector(selectLikes)
  const dispatch = useDispatch() //dispatch is update 
  const [refreshFlag, setRefreshFlag] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");  //search

  // Resource fetch function 
  const fetchAllResource = async () => {
    try {
      const response = await resourceServices.getResources();
      setResources(response.data);
    } catch (error) {
      console.log("error in fetch all resource", error);
    }
  };

  const handleButton = () => {
    setShowToggle(!showToggle);
    console.log("toggle open")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if(editId){
        const response = await resourceServices.updateResource(editId,{title,description,term,category,type,url})
        console.log("resource updating response is:",response)
        toast.success("Resource updated successfully");
      } else {
        let fileUrl = url; // default to whatever is in state

        if (type === "pdf" && pdfFile) {
          // Create FormData for file upload
          const formData = new FormData();
          formData.append("file", pdfFile); //user Selectedfile

          const uploadResponse = await resourceServices.uploadSingleFile(formData);
          console.log("upload responseIs:",uploadResponse)

          // Assuming backend returns the file path like "http://127.0.0.1:5001/uploads/file-xxx.pdf"
          fileUrl = uploadResponse.data.file?.path || uploadResponse.data.path;

          if (!fileUrl) {
            throw new Error("File upload did not return a valid path");
          }
        }

        // Create resource with either uploaded file path or entered URL
      const response=  await resourceServices.createResource({
          title,
          description,
          term,
          category,
          type,
          url: fileUrl
        });
console.log("resource response is:",response.data)
        toast.success("Resource created successfully");
      }
      
      setRefreshFlag(prev => !prev);
      fetchAllResource(); // refresh resources after create/update

      // Reset form state
      dispatch(setTitle(""));
        dispatch(setDescription(""));
      dispatch(setTerm(""));
      dispatch(setCategory(""));
      dispatch(setType(""));
      dispatch(setUrl(""));
      setPdfFile(null);
      setShowToggle(false);
      setEditId(null); // reset edit id

    } catch (error) {
      console.error("Error creating resource:", error);
      toast.error("Failed to create resource");
    }
  };

  const handleFileChange = (e) => {
    if (e.target.files.length > 0) {
      setPdfFile(e.target.files[0]);  // First file user selected
    }
  };

  // Delete function 
  const handleDelete = async(id) => {
    try{
      const response = await resourceServices.deleteResource(id)
      console.log("resource card deleted",response.data)
      fetchAllResource(); // refresh resources after delete
      toast.success("resource deleted successfully")
    } catch(error){
      toast.error("Failed to resource delete")
      console.log("resource card deleting error is:",error)
    }
  }

  // Update function
  const handleUpdate = (id) => {
    const editResource = resources.find((edit) => edit._id === id)
    if(editResource){
      dispatch(setTerm(editResource.term?._id || editResource.term)) //prefill in the form
           dispatch(setDescription(editResource.description))
      dispatch(setCategory(editResource.category?._id || editResource.category))
      dispatch(setType(editResource.type))
      dispatch(setTitle(editResource.title))
      dispatch(setUrl(editResource.url))
      setEditId(id)
      setShowToggle(true); // open form
    }
  }

  //fetch the terms for dropdown purpose
  const fetchAllTerms = async () => {
    try {
      const response = await termServices.getTerms();
      setTerms(response.data.terms);
      console.log("get all terms is :", response.data.terms)
    } catch (error) {
      console.log("Failed to fetch terms");
    } finally {
      setLoading(false);
    } 
  };  

  useEffect(() => {
    fetchAllTerms();
    fetchAllResource(); //all resources
  }, []) 

  //get all categories
  const fetchCategories = async () => {
    try {
      const response = await categoryServices.getCategories();
      console.log("fetch all categories:", response.data)
      setCategories(response.data)
      setLoading(false)
    } catch (error) {
      console.log("fetch categories error:", error)
    }
  }  
    
  useEffect(() => {
    fetchCategories()
  }, [])

  if (loading) {
    return <div className='text-center p-4' ><FaSpinner className="animate-spin text-gray-500" size={40} /></div>
  }
//Filtered list based on dropdown value
//   const filteredResources = resources.filter(resource => {
//   if (filterType === "all") return true;
//   return resource.type === filterType;
// });

const filteredResources = resources.filter(res => {
  const matchesType = filterType === "all" || res.type === filterType;
  const matchesSearch = res.title.toLowerCase().includes(searchQuery.toLowerCase());
  return matchesType && matchesSearch;
});

//search types 


  return (
    <>
      <div className=' mx-auto  w-full  '>
        <h1 className='text-violet-500 text-center text-2xl mb-2 font-semibold '>Resource Management</h1>
      
         {/* Desktop - same line */}
<div className='mb-6  hidden w-[80%] mx-auto mr-14 lg:flex justify-between items-center mb-4 gap-4'>
  <div className=' flex gap-2 flex-1  '>
 <div className="flex  flex-1 items-center border-2 rounded-full px-3 py-2 w-64">
      <input
       value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 outline-none"
        placeholder="Search"
      />
      <FaSearch size={20} color="gray" />
    </div>  
      <select value={filterType}
      onChange={(e) => setFilterType(e.target.value)} className='border px-3  py-2 min-w-[100px]'>
      <option value="all">All</option>
      <option value="video">vedio</option>
      <option value="link">link</option>
      <option value="pdf">pdf</option>
       <option value="blog">blog</option>
    </select>
  </div>
  <button onClick={handleButton}
    className='  flex gap-2 justify-center text-sm whitespace-nowrap items-center py-3 px-4 rounded font-semibold transform transition active:scale-90 hover:bg-green-600 text-white bg-green-500'>
    <FaPlus className='w-4 h-4'/>create resource
  </button>
</div>

{/* Mobile/Tablet - stacked */}
<div className='lg:hidden'>
  <span className='flex justify-end items-end'>
    <button onClick={handleButton}
      className='flex gap-2 mb-2 mr-2 lg:mr-8 justify-center text-sm whitespace-nowrap items-center py-3 px-2 w-[100%] md:w-[25%] lg:w-[15%] rounded font-semibold transform transition active:scale-90 p-4 hover:bg-green-600 text-white bg-green-500 text-base mb-6'>
      <FaPlus className='w-4 h-4'/>create resource
    </button>
  </span>
  <div className='flex mb-2 gap-2'>
     <div className="flex  flex-1 items-center border-2 rounded-full px-3 py-2 w-64">
      <input
       value={searchQuery}
  onChange={(e) => setSearchQuery(e.target.value)}
        className="flex-1 outline-none"
        placeholder="Search"
      />
      <FaSearch size={16} color="gray" />
    </div> 
   
    <select  onChange={(e) => setFilterType(e.target.value)}  value={filterType} className='w-[20%] border'>
      <option value="all">All</option>
      <option value="video">vedio</option>
      <option value="link">link</option>
      <option value="pdf">pdf</option>
       <option value="blog">blog</option>
    </select>
  </div>
</div>
        
          
        <div className='max-w-[600px] mx-auto '>
          {showToggle && (
            <>
              <div className='border shadow rounded p-6 w-[100%] mb-4 md:ml-10'>
                <form onSubmit={handleSubmit}>
                  <div className=' flex  flex-col'>
                    <label className='text-base  font-bold mb-2'>Resource Title</label>
                    <input
                      value={title}
                      onChange={(e) => dispatch(setTitle(e.target.value))}
                      className='w-full  border py-2 px-4 mb-4  ' placeholder="Eg:Responsive Web Design with Tailwind CSS" />
                  </div>

                    <div className=' flex  flex-col'>
                    <label className='text-base  font-bold mb-2'>Description</label>
                    <textarea
                      value={description}
                      onChange={(e) => dispatch(setDescription(e.target.value))}
                      className='w-full  border py-2 px-4 mb-4  ' placeholder="" />
                  </div>

                  <div className=' flex  flex-col'>
                    <label className='text-base  font-bold mb-2'>Associated Term</label>
                    <select value={term} onChange={(e) => dispatch(setTerm(e.target.value))} className='w-full  border py-2 px-4 mb-4  '>
                      <option value="">-Select Term-</option>
                      {terms?.map((term) => (
                        <option key={term._id} value={term._id}>{term.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className=' flex  flex-col'>
                    <label className='text-base  font-bold mb-2'>Category</label>
                    <select
                      value={category}
                      onChange={(e) => dispatch(setCategory(e.target.value))}
                      className='w-full border py-2 px-4 mb-4  ' placeholder="--select category--" >
                      <option value="">-Select Category-</option>
                      {categories.map((category) =>
                        <option key={category._id} value={category._id}>{category.name}</option>
                      )}
                    </select>
                  </div>

                  <div className=' flex  flex-col'>
                    <label className='text-base  font-bold mb-2'>Resource Type</label>
                    <select
                      value={type}
                      onChange={(e) => dispatch(setType(e.target.value))}
                      className='w-full border py-2 px-4 mb-4  ' placeholder="Eg:frontend developer" >
                      <option value="">-select type-</option>
                      <option>video</option>
                      <option>pdf</option>
                      <option>link</option>
                      <option>blog</option>
                    </select>
                  </div>

                  {type === "pdf" ? (
                    <div className="flex flex-col">
                      <label className="text-base font-bold mb-2">Upload PDF File</label>
                      <input
                        type="file"
                        accept="application/pdf"
                        onChange={(e) => handleFileChange(e)}
                        className="w-full border py-2 px-4 mb-4"
                      />
                    </div>
                  ) : (
                    <div className="flex flex-col">
                      <label className="text-base font-bold mb-2">Resource URL</label>
                      <input
                        value={url}
                        onChange={(e) => dispatch(setUrl(e.target.value))}
                        type="url"
                        className="w-full border py-2 px-4 mb-4"
                        placeholder="Eg: https://example.com"
                      />
                    </div>
                  )}

                  <div className='flex justify-center items-center'>
                    <button className='px-4 py-3 w-full md:w-[50%] text-center text-base rounded  bg-blue-500 text-white  font-semibold transform transition active:scale-90 hover:bg-blue-600 '>
                      {editId ? "Update Resource" : "Create Resource"}
                    </button>
                  </div>
                </form>
              </div>
            </>
          )}
        </div>

        {/* pass the props as a cild component */}
        <ResourceCard 
          resources={filteredResources}
          onUpdate={handleUpdate}
          onDelete={handleDelete}
          refreshFlag={refreshFlag}
        />
      </div>
    </>
  )
}

export default ResourcePage