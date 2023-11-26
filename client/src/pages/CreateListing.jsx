
import { useState } from 'react'
import {app} from '../firebase'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'
import {useSelector} from 'react-redux'
import {useNavigate} from 'react-router-dom'

const Listing = () => {
    const [files,setFiles] = useState([])
    const [formData,setFormData] = useState({
        imageUrl:[],
        name:'',
        description:'',
        address:'',
        type:"rent",
        regularPrice:50,
        discountedPrice:50,
        bedrooms:1,
        bathrooms:1,
        offer:false,
        furnished:false,
        parking:false,
    })
    const [imageUploadError,setImageUploadError] = useState(false)
    const [upload,setUpload] = useState(false)
    const [error,setError] = useState(null)
    const [loading,setLoading] = useState(false)
    const navigate = useNavigate()
    const {currentUser} = useSelector(state=>state.user)
    const handleImageSubmit =(e) =>{
        if(files.length>0 && (files.length + formData.imageUrl.length) <7){
            setUpload(true)
            const promises = []

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]))
            }
            Promise.all(promises).then((urls)=>{
                setFormData({...formData,imageUrl:formData.imageUrl.concat(urls)})
                setUpload(false)
            }).catch((error)=>{
                setImageUploadError("image upload failed(image should be less than 2mb).")
                setUpload(false)
            })
        }
        else{
            setImageUploadError('no images choosen or image is greater than 6.');
            setUpload(false)
        }
    }
    const storeImage = async (file) => {
        return new Promise((resolve, reject) => {
          const storage = getStorage(app);
          const fileName = new Date().getTime() + file.name;
          const storageRef = ref(storage, fileName);
          const uploadTask = uploadBytesResumable(storageRef, file);
          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const progress =
                (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              console.log(`Upload is ${progress}% done`);
            },
            (error) => {
              reject(error);
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                resolve(downloadURL);
              });
            }
          );
        });
      };
    const handleDelete = (img)=>{
        setFormData({
            ...formData,imageUrl:formData.imageUrl.filter((url)=>url!==img)
        })
    }
    const handleChange = (e)=>{
        if(e.target.id==="sale"||e.target.id==="rent"){
            setFormData({
                ...formData,type:e.target.id
            })
        }
        if (e.target.id==='parking'||e.target.id==='furnished'||e.target.id==='offer') {
            setFormData({
                ...formData,[e.target.id]:e.target.checked
            })
        }
        if (e.target.type==='number'||e.target.type==="text"||e.target.type==="textarea") {
            setFormData({
                ...formData,[e.target.id]:e.target.value
            })
        }
    }
    const handleSubmit = async(e)=>{
        e.preventDefault()
        if(formData.imageUrl.length<1) return setError("upload at least one image")
        if(+formData.regularPrice<+formData.discountedPrice) return setError("discounted price should be less than regular price")
        setLoading(true)
        try {
            const res =await fetch('/api/listing/create',{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({...formData,useRef:currentUser._id})
            })
            const data = await res.json()
            if(data.success=='false') return setError("listing failed.")
            setLoading(false)
            setError(null)
            navigate(`/listing/${data._id}`)
        } catch (error) {
            setLoading(false)
            setError(error.message)
        }
        
    }
  return (
    <main className='p-3 max-w-4xl mx-auto '>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-3' onSubmit={handleSubmit}>
            <div className='flex flex-col gap-4 flex-1 '>
                <input type="text" placeholder='name' id="name" className='border p-3 rounded-lg' minLength='5'maxLength={'62'} required onChange={handleChange} value={formData.name}/>
                <textarea type="text" placeholder='description' id="description" className='border p-3 rounded-lg' minLength='5'maxLength={'62'} required onChange={handleChange} value={formData.description} />
                <input type="text" placeholder='address' id="address" className='border p-3 rounded-lg' minLength='5'maxLength={'62'} required onChange={handleChange} value={formData.address} />
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='sale' className='w-5' onChange={handleChange} checked={formData.type=="sale"} />
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='rent' className='w-5' onChange={handleChange} checked={formData.type=="rent"} />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='parking' className='w-5' onChange={handleChange} value={formData.parking} />
                        <span>Parking Spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='furnished' className='w-5' onChange={handleChange} value={formData.furnished} />
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='offer' className='w-5' onChange={handleChange} value={formData.offer} />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-5 '>
                    <div className='flex items-center gap-2'>
                        <input type="number" id='bedrooms' min={1} max={10} required className='p-3 border border-slate-300 rounded-lg' onChange={handleChange} value={formData.bedrooms} />
                        <p>Beds</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="number" id='bathrooms' min={1} max={10} required className='p-3 border border-slate-300 rounded-lg' onChange={handleChange} value={formData.bathrooms}/>
                        <p>Baths</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="number" id='regularPrice' required className='p-3 border border-slate-300 rounded-lg' onChange={handleChange} value={formData.regularPrice} />
                        <div className='flex flex-col items-center'>
                         <p>Regular Prices</p>
                         <span className='text-sm text-gray-500'>{formData.type==="sale"?'':'$/month'}</span>
                        </div>
                        
                    </div>
                    {
                        formData.offer && (
                    <div className='flex items-center gap-2'>
                        <input type="number" id='discountedPrice'required className='p-3 border border-slate-300 rounded-lg' onChange={handleChange} value={formData.discountedPrice} />
                        <div className='flex flex-col items-center'>
                         <p>Discounted Prices</p>
                         <span className='text-sm text-gray-500'>$/month</span>
                        </div>
                    </div>
                        )
                    }
                    
                </div>
            </div>
            <div className='flex flex-col flex-1 gap-3'>
                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600 ml-2'>The first image will be the cover photo.(max 6)</span></p>
                <div className='flex gap-2'>
                    <input className='border border-slate-300 p-3 rounded w-full' type="file" id='images' accept='image/*' multiple onChange={e=>setFiles(e.target.files)}/>
                    <button type='button' disabled={upload} onClick={handleImageSubmit} className='text-green-700 border border-green-700 p-3 rounded uppercase hover:shadow-lg disabled:opacity-80'>{upload?"uploading...":"upload"}</button>
                </div>
                <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
                {
                    formData.imageUrl.length>0 && formData.imageUrl.map((img)=>(
                        <div className='flex justify-between items-center border p-2' key={img}>
                            <img src={img} alt="listing images." className='w-20 h-20 object-contain' />
                            <button type='button' onClick={()=>handleDelete(img)}  className='p-3 text-red-700 uppercase hover:opacity-95
                            rounded-lg'>Delete</button>
                        </div>
                    ))
                }
                <button disabled={loading || upload} className='buttons '>{loading?'loading':'Create Listing'}</button>
                <p className='text-red-700 text-sm'>{error && error}</p>
                
            </div>
            
        </form>
    </main>
  )
}

export default Listing