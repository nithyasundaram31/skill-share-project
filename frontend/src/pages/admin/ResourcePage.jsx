import React, { useEffect, useState } from 'react'
import { FaPlus, FaSpinner } from 'react-icons/fa'
import { toast } from 'react-toastify';
import termServices from '../../services/termServices';
import { useDispatch, useSelector } from 'react-redux';
import { selectCategory, selectLikes, selectTerm, selectTitle, selectType, selectUrl, setCategory, setTerm, setTitle, setType, setUrl } from '../../redux/features/admin/resourceSlice';
import categoryServices from '../../services/categoryServices';
import resourceServices from '../../services/resourceServices';
import ResourceCard from '../../components/ResourceCard';

function ResourcePage() {
  const [showToggle, setShowToggle] = useState(false);
  const [terms, setTerms] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const title = useSelector(selectTitle) //useSelector is read the redux store
  const term = useSelector(selectTerm)
  const category = useSelector(selectCategory)
  const type = useSelector(selectType)
  const url = useSelector(selectUrl)
  const [pdfFile, setPdfFile] = useState(null);
  const likes = useSelector(selectLikes)
  const dispatch = useDispatch() //dispatch is update 
  const [refreshFlag, setRefreshFlag] = useState(false);

  const handleButton = () => {
    setShowToggle(!showToggle);
    console.log("toggle open")
  }

  const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    let fileUrl = url; // default to whatever is in state

    if (type === "pdf" && pdfFile) {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append("file", pdfFile);

      const uploadResponse = await resourceServices.uploadSingleFile(formData);

      // Assuming backend returns the file path like "http://127.0.0.1:5001/uploads/file-xxx.pdf"
      fileUrl = uploadResponse.data.file?.path || uploadResponse.data.path;

      if (!fileUrl) {
        throw new Error("File upload did not return a valid path");
      }
    }

    // Create resource with either uploaded file path or entered URL
    await resourceServices.createResource({
      title,
      term,
      category,
      type,
      url: fileUrl
    });

    toast.success("Resource created successfully");
    setRefreshFlag(prev => !prev);

    // Reset form state
    dispatch(setTitle(""));
    dispatch(setTerm(""));
    dispatch(setCategory(""));
    dispatch(setType(""));
    dispatch(setUrl(""));
    setPdfFile(null);
    setShowToggle(false);

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

  return (
    <>
      <div className=' mx-auto  w-full  '>

        <h1 className='text-violet-500 text-center text-3xl font-semibold '>Resource Management</h1>
        <div className='flex justify-end  items-end'>
          <button onClick={handleButton}
            className=' flex gap-2 mb-4 mr-8 justify-center px-3  items-center py-3 w-[90%] md:w-[20%] lg:w-[18%]  rounded font-semibold transform transition active:scale-90 p-4 hover:bg-green-600 text-white bg-green-500 text-base mb-6'>
            <FaPlus className=' ' />create resource</button>

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
                      className='w-full  border py-2 px-4 mb-4  ' placeholder="Eg:frontend developer" />
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
                      <option>article</option>
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
                      Submit</button>
                  </div>


                </form>

              </div>

          
            </>


          )}
          
        </div>
 <ResourceCard refreshFlag={refreshFlag}/>

      </div>


    </>

  )
}

export default ResourcePage