import React, { useEffect, useState } from 'react'
import profile from '../assets/profile.png';
import authServices from '../services/authServices';
import { useParams } from 'react-router';
import { useDispatch, useSelector } from 'react-redux';
import { selectName, setName } from '../redux/features/auth/registerSlice';
import { selectEmail, setEmail } from '../redux/features/auth/loginSlice';
import { toast } from 'react-toastify';

function Profile() {
    const { id } = useParams()
    console.log("Profile id from URL:", id);
    
    const name = useSelector(selectName)
    const email = useSelector(selectEmail)
    const [editing, setEditing] = useState(false)
    const [contact, setContact] = useState("")
    const dispatch = useDispatch()

    useEffect(() => {
        const fetchAllProfile = async () => {
            try {
                const response = await authServices.getProfile(id)
                console.log("get profile response is:", response.data)
                
                // update redux store
                dispatch(setName(response.data.name));
                dispatch(setEmail(response.data.email));
                setContact(response.data.profile?.contact || "");
            } catch (error) {
                console.log("profile fetch error is:", error)
            }
        }
        
        fetchAllProfile()
    }, [id, dispatch])

    const updateProfile = async (e) => {
        e.preventDefault()
        console.log("UPDATE PROFILE CALLED!");
        try {
            const response = await authServices.updateProfile(id, { name, contact })
            console.log("update response:", response)
            
            dispatch(setName(response.data.name));
            setContact(response.data.profile?.contact);
            toast.success("Profile updated successfully")
            setEditing(false); // go back to read-only mode
        } catch (error) {
            console.log("update error:", error.response?.data || error.message);
            toast.error("Failed to update profile");
        }
    }

    const handleEditClick = () => {
        setEditing(true);
    }

    return (
        <>
            <div className='flex flex-col justify-center items-center'>
                <h1 className='mx-auto text-blue-500 text-xl p-6'>Profile</h1>
                
                <div className='w-full max-w-[600px] bg-white p-4 mb-8 border'>
                    <div className='flex justify-center items-center'>
                        <img className='rounded-full w-32 h-32 object-cover overflow-hidden' src={profile} alt="Profile" />
                    </div>

                    <div className='mb-4'>
                        <label className='text-gray-800 mb-2 font-semibold'>Name:</label>
                        <input
                            readOnly={!editing}
                            value={name}
                            onChange={(e) => dispatch(setName(e.target.value))}
                            className='w-full px-4 py-2 mt-2 border outline-none'
                        />
                    </div>

                    <div className='mb-4'>
                        <label className='text-gray-800   font-semibold'>Email:</label>
                        <input
                            value={email}
                            onChange={(e) => dispatch(setEmail(e.target.value))}
                            readOnly
                            className='w-full px-4 py-2 border mt-2 outline-none'
                        />
                    </div>

                    <div className='mb-6'>
                        <label className='text-gray-800 font-semibold'>Contact:</label>
                        <input
                            readOnly={!editing}
                            value={contact}
                            onChange={(e) => setContact(e.target.value)}
                            className='w-full px-4 py-2 mt-2  border outline-none'
                        />
                    </div>

                    {!editing ? (
                        <button 
                            onClick={handleEditClick}
                            className="bg-blue-600 p-2 w-full mb-2 rounded text-white text-xl font-semibold hover:bg-blue-700 transform transition active:scale-90"
                        >
                            Edit
                        </button>
                    ) : (
                        <form onSubmit={updateProfile}>
                            <button 
                                type="submit" 
                                className="bg-green-600 p-2 w-full mb-2 rounded text-white text-xl font-semibold hover:bg-green-700 transform transition active:scale-90"
                            >
                                Save
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </>
    )
}

export default Profile