import React, { useEffect, useState } from 'react'
import resourceServices from '../../services/resourceServices';
import termServices from '../../services/termServices';
import { Bar, BarChart, CartesianGrid, Legend, Tooltip, XAxis, YAxis } from 'recharts';
import { selectUser, setUser } from '../../redux/features/auth/userSlice';
import { useDispatch, useSelector } from 'react-redux';
import authServices from '../../services/authServices';

function AdminDashboardPage() {
    const [resources, setResources] = useState([]); //this is also a parent page so we cannot pass as a prop from resource page // resources state
     const [terms,setTerms]=useState([])
     const users=useSelector(selectUser)
     const dispatch=useDispatch()
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
   
    //total terms
     useEffect(()=>{ 
      const fetchAllTerms = async () => {
      try {
        const response = await termServices.getTerms();
        setTerms(response.data.terms);
        console.log("get all terms is :", response.data.terms)
      } catch (error) {
        console.log("Failed to fetch terms");
      } 
    };
    fetchAllTerms();
      },[])
      
      // user count 
      useEffect(()=>{
        const fetchAllUsers=async()=>{
         try{
          const response=await authServices.getAllUsers();
          console.log("the user count response is :response",response.data)

          dispatch(setUser(response.data))

        }catch(error){
          console.log("the user count:",error)
        }
        }
       fetchAllUsers()

      },[])
    
       // data for chart
  const chartData = resources.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,5).map((r) => ({
    title: r.title,
    views: r.views,
    likes: r.likes.length, // convert array to count
  }));

 const truncate = (text) => {
    return text.length > 10 ? text.substring(0, 10) + "..." : text;
  };

  return (
  <>
  <div className='mx-auto  max-w-[500px]  md:max-w-[1100px] p-4 md:mr-6 '>
      

  <div className='mb-4 w-full  grid  grid-cols-1 md:grid-cols-3 gap-6'>
    <div className='bg-amber-500 text-center font-semibold  text-black text-xl p-4 rounded-lg'>
      <h1 className=' '>
       Resources </h1>
       <h1 className='text-2xl'>{resources.length}</h1>
    </div>
    <div className='bg-blue-500 text-black font-semibold   text-center text-xl  p-4 rounded-lg'>
       <h1  >Users</h1>
        <h1 className='text-2xl'>{users.filter(user=>user.role==="user").length}</h1> 
        
        
    
     
    </div>
    <div className='bg-green-500  font-semibold text-black text-center text-xl  p-4 rounded-lg'>
      <h1> Terms  </h1>
      <h1 className='text-2xl'>{terms?.length}</h1>
    </div>
  </div>
<h2 className="text-xl font-semibold mb-6">Recent Activity Chart</h2>

  <div className="flex justify-center mt-10 mr-2">
      <BarChart width={500} height={350} data={chartData}>
        <CartesianGrid strokeDasharray="3 3" />
        
        {/* XAxis  truncate*/}
        <XAxis 
          dataKey="title" 
          interval={0} 
          tickFormatter={(value) => truncate(value)} 
        />

        <YAxis />
        {/* Tooltip  when user hover the full title will auto show*/}
        <Tooltip />
        <Legend />
        <Bar dataKey="views" fill="#968ce2ff" />
        <Bar dataKey="likes" fill="#6de99dff" />
      </BarChart>
    </div>


  <div className="text-xl font-semibold mb-6" >Recent Activity</div>
 <table className='mx-auto w-full max-w-[900px] border p-4'>
  <thead >
    <tr className='text-center bg-gray-100'>
       <th className='border'>SI No</th>
      <th className='border p-4'>Title</th>
      <th className='border p-4'>Type</th>
      <th className='border p-4'>Likes</th>
      <th className='border p-4'>Views</th>
     <th className="border px-4 ">Date</th>
     
    </tr>
  </thead>
  <tbody>
    {resources.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)).slice(0,5).map((resource,index)=>(
      <tr key={resource._id}>
      <td className='border p-4 text-center  text-gray-700 font-semibold'>{index+1}</td>
      <td className='border p-4 font-semibold text-gray-700'>{resource?.title}</td>
      <td className='border p-4 font-semibold text-gray-700'>{resource?.type}</td>
      <td className='border p-4 text-center font-semibold text-gray-700'>{resource?.likes.length}</td>
      <td className='border p-4 text-center font-semibold text-gray-700'>{resource?.viewers?.length}</td>
       <td className='border p-4 text-center font-semibold  text-gray-700 '>{new Date(resource?.createdAt).toLocaleDateString()}</td>
    </tr>
    ))}
    
    
  </tbody>
</table>


  </div>

</>

  )
}

export default AdminDashboardPage