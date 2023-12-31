import {useDispatch, useSelector} from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'
import { deleteUserFailure, deleteUserStart, deleteUserSuccess, SignOutUserFailure, SignOutUserStart, SignOutUserSuccess, updateUserFailure, updateUserStart, updateUserSuccess} from '../redux/user/userSlice'
import { Link } from 'react-router-dom'

const Profile = () => {
  const {currentUser,loading,error} = useSelector(state=>state.user)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [errors, setError] = useState(null)
  const [formData,setFormData] = useState({})
  const [updateSuccess,setUpdateSuccess] = useState(false)
  const [showListingError,setShowListingError] = useState(false)
  const [userListings,setUserListings] = useState([])
  const dispatch = useDispatch()

  const handleChange = (e) => {
    setFormData({...formData,[e.target.id]:e.target.value})
  }
  const handleUpdate = async (e)=>{
    e.preventDefault()
    try {
      dispatch(updateUserStart())
      const res =await fetch(`/api/user/update/${currentUser._id}`,{
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(formData)
      })
      const data = await res.json()
      if (data.success == false) {
        dispatch(updateUserFailure(data.message))
        return
      }
      dispatch(updateUserSuccess(data))
      setUpdateSuccess(true)
    } catch (error) {
      dispatch(updateUserFailure(error.message))
    }
  }
  useEffect(() => {
    if(file){
      handleFileUpload(file)
    }
    
  }, [file])
  const handleFileUpload = (file)=>{
    const storage = getStorage(app)
    const fileName = new Date().getTime() + file.name
    const storageRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef,file)
    uploadTask.on('state_changed', 
    (snapshot) => {
    // Observe state change events such as progress, pause, and resume
    // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
    const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
    setFilePerc(Math.round(progress))
  }, 
    (error) => {
    // Handle unsuccessful uploads
    setError(error)
  }, 
    () => {
    // Handle successful uploads on complete
    // For instance, get the download URL: https://firebasestorage.googleapis.com/...
     getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
        setFormData({...formData,avatar:downloadURL})
    });
  }
);
  }
  const handleDelete = async ()=>{
    try {
      dispatch(deleteUserStart())
      const res =await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'delete'})
      const data = await res.json()
      if(data.success===false) {
        dispatch(deleteUserFailure(data.message))
        return
      }
      dispatch(deleteUserSuccess(data))
    } catch (error) {
      dispatch(deleteUserFailure(error.message))
    }
  }
  const handleSignOut = async ()=>{
    try {
      dispatch(SignOutUserStart())
      const res =await fetch(`/api/user/signout`)
      const data = await res.json()
      if(data.success===false) {
        dispatch(SignOutUserFailure(data.message))
        return
      }
      dispatch(SignOutUserSuccess(data))
      
    } catch (error) {
      dispatch(SignOutUserFailure(error.message))
    }
  }
  const handleShowListings = async() =>{
    try {
      setShowListingError(false)
      const response = await fetch(`/api/user/listings/${currentUser._id}`)
      const data  =await response.json()
      if (data.success===false) {
        setShowListingError(true)
      }
      setUserListings(data)
    } catch (error) {
      setShowListingError(true)
    }
  }
  const handleDeleteListing =async (ListingId)=>{
    try {
      const res = await fetch(`api/listing/delete/${ListingId}`,{method:'DELETE'})
      const data = await res.json()
      if (data.success===false) {
        return
      }
      setUserListings((prev)=>prev.filter(listing=>listing._id!==ListingId))
    } catch (error) {
      console.log(error.message);
    }
  }
  return (
    <div className='p-2 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4' onSubmit={handleUpdate}>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={()=>fileRef.current.click()} className='rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2 ' src={formData.avatar || currentUser.avatar} alt="profile" />
        <p className='text-sm self-center'>
          {
            errors ? <span className='text-red-700'>image upload error (image should be less than 2mb.)</span>:
            filePerc>0 && filePerc <100 ? <span className='text-slate-700'>{`Uploading ${filePerc}% ` }</span> :
            filePerc === 100 ? <span className='text-green-700'>uploaded successfully</span>:""
          }
        </p>
        <input className='p-3 border rounded-lg ' onChange={handleChange} defaultValue={currentUser.username} type="text" placeholder='username' id='username' />
        <input className='p-3 border rounded-lg ' onChange={handleChange} defaultValue={currentUser.email} type="email" placeholder='email' id='email' />
        <input className='p-3 border rounded-lg ' onChange={handleChange}  type="text" placeholder='password' id='password' />
        <button disabled={loading} className='buttons'>
          {
            loading ? "loading...":"update"
          }
        </button>
        <Link to={'/create-listing'} className='buttons bg-green-700 text-center'>
           Create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-3'>
        <span onClick={()=>handleDelete(listing._id)} className='text-red-700 cursor-pointer'>Delete Account</span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
      <p className='text-red-700 mt-5'>{error?error:''}</p>
      <p className='text-green-700 mt-5'>{updateSuccess?"updated successfully!!":''}</p>
      <button onClick={handleShowListings} className='text-green-700 w-full'>Show Listing</button>
      {showListingError ? <p className='text-red-700 mt-5 text-center'>"error while showing listing"</p> :''}
      {
        (userListings && userListings.length>0) ?
        (<div className='flex flex-col gap-4 mt-5'>
          <h1 className='text-center text-4xl font-semibold '>User Listing</h1>
          { userListings.map(listing=>(
              <div key={listing._id} className='border rounded-lg flex gap-5 items-center justify-between p-2'>
                <Link to={`/listing/${listing._id}`}>
                  <img src={listing.imageUrl[0]} alt="photo" className='w-16 h-16 object-contain'/>
                </Link>
                <Link to={`/listing/${listing._id}`} className='text-slate-700 font-semibold flex-1 hover:underline truncate'>
                  <p >{listing.name}</p>
                </Link>
                <div className='flex flex-col items-center'>
                  <button onClick={()=>handleDeleteListing(listing._id)} className='text-red-700 uppercase'>Delete</button>
                  <Link to={`/update-listing/${listing._id}`} className='text-green-700 uppercase'>Edit</Link>
                </div>
              </div>
            ))}
        </div>)
        :
        <p className='text-center text-slate-400 text-lg'>No Listing at all.</p>
       
      }
    </div>
  )
}

export default Profile