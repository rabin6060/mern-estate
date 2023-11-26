
import { useState } from 'react'
import {app} from '../firebase'
import {getDownloadURL, getStorage, ref, uploadBytesResumable} from 'firebase/storage'

const Listing = () => {
    const [files,setFiles] = useState([])
    const [formData,setFormData] = useState({
        imageUrls:[],
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
        parking:false
    })
    const [imageUploadError,setImageUploadError] = useState(false)
    const [upload,setUpload] = useState(false)
    
    const handleImageSubmit =(e) =>{
        if(files.length>0 && (files.length + formData.imageUrls.length) <7){
            setUpload(true)
            const promises = []

            for (let i = 0; i < files.length; i++) {
                promises.push(storeImage(files[i]))
            }
            Promise.all(promises).then((urls)=>{
                setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)})
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
            ...formData,imageUrls:formData.imageUrls.filter((url)=>url!==img)
        })
    }
    const handleChange = ()=>{}
  return (
    <main className='p-3 max-w-4xl mx-auto '>
        <h1 className='text-3xl font-semibold text-center my-7'>Create a Listing</h1>
        <form className='flex flex-col sm:flex-row gap-3'>
            <div className='flex flex-col gap-4 flex-1 '>
                <input type="text" placeholder='name' id="name" className='border p-3 rounded-lg' minLength='10'maxLength={'62'} required onChange={handleChange} value={formData.name}/>
                <textarea type="text" placeholder='description' id="description" className='border p-3 rounded-lg' minLength='10'maxLength={'62'} required onChange={handleChange} value={formData.description} />
                <input type="text" placeholder='address' id="address" className='border p-3 rounded-lg' minLength='10'maxLength={'62'} required onChange={handleChange} value={formData.address} />
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='sale' className='w-5' onChange={handleChange} checked={formData.type=="sale"} />
                        <span>Sell</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='rent' className='w-5' />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='parking' className='w-5' />
                        <span>Parking Spot</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='furnish' className='w-5' />
                        <span>Furnished</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" id='offer' className='w-5' />
                        <span>Offer</span>
                    </div>
                </div>
                <div className='flex flex-wrap gap-5 '>
                    <div className='flex items-center gap-2'>
                        <input type="number" id='bedrooms' min={1} max={10} required className='p-3 border border-slate-300 rounded-lg' />
                        <p>Beds</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="number" id='bathrooms' min={1} max={10} required className='p-3 border border-slate-300 rounded-lg' />
                        <p>Baths</p>
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="number" id='regular' required className='p-3 border border-slate-300 rounded-lg' />
                        <div className='flex flex-col items-center'>
                         <p>Regular Prices</p>
                         <span className='text-sm text-gray-500'>$/month</span>
                        </div>
                        
                    </div>
                    <div className='flex items-center gap-2'>
                        <input type="number" id='discount'required className='p-3 border border-slate-300 rounded-lg' />
                        <div className='flex flex-col items-center'>
                         <p>Discounted Prices</p>
                         <span className='text-sm text-gray-500'>$/month</span>
                        </div>
                    </div>
                </div>
            </div>
            <div className='flex flex-col flex-1 gap-3'>
                <p className='font-semibold'>Images:
                <span className='font-normal text-gray-600 ml-2'>The first image will be the cover photo.(max 6)</span></p>
                <div className='flex gap-2'>
                    <input className='border border-slate-300 p-3 rounded w-full' type="file" id='images' accept='image/*' multiple onChange={e=>setFiles(e.target.files)}/>
                    <button type='button' onClick={handleImageSubmit} className='text-green-700 border border-green-700 p-3 rounded uppercase hover:shadow-lg disabled:opacity-80'>{upload?"uploading...":"upload"}</button>
                </div>
                <p className='text-red-700 text-sm'>{imageUploadError && imageUploadError}</p>
                {
                    formData.imageUrls.length>0 && formData.imageUrls.map((img)=>(
                        <div className='flex justify-between items-center border p-2' key={img}>
                            <img src={img} alt="listing images." className='w-20 h-20 object-contain' />
                            <button type='button' onClick={()=>handleDelete(img)}  className='p-3 text-red-700 uppercase hover:opacity-95
                            rounded-lg'>Delete</button>
                        </div>
                    ))
                }
                <button className='buttons'>Create Listing</button>
            </div>
            
        </form>
    </main>
  )
}

export default Listing