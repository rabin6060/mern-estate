import {useSelector} from 'react-redux'
import { useEffect, useRef, useState } from 'react'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {app} from '../firebase'

const Profile = () => {
  const {currentUser} = useSelector(state=>state.user)
  const fileRef = useRef(null)
  const [file, setFile] = useState(undefined)
  const [filePerc, setFilePerc] = useState(0)
  const [error, setError] = useState(null)
  const [formData,setFormData] = useState({})
  
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
  
  return (
    <div className='p-2 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <input onChange={(e)=>setFile(e.target.files[0])} type="file" ref={fileRef} hidden accept='image/*' />
        <img onClick={()=>fileRef.current.click()} className='rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2 ' src={formData.avatar || currentUser.avatar} alt="profile" />
        <p className='text-sm self-center'>
          {
            error ? <span className='text-red-700'>image upload error (image should be less than 2mb.)</span>:
            filePerc>0 && filePerc <100 ? <span className='text-slate-700'>{`Uploading ${filePerc}% ` }</span> :
            filePerc === 100 ? <span className='text-green-700'>uploaded successfully</span>:""
          }
        </p>
        <input className='p-3 border rounded-lg ' type="text" placeholder='username' id='username' />
        <input className='p-3 border rounded-lg ' type="email" placeholder='email' id='email' />
        <input className='p-3 border rounded-lg ' type="text" placeholder='password' id='password' />
        <button className='buttons'>update</button>
      </form>
      <div className='flex justify-between mt-3'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile