import React, { useState ,useEffect} from 'react'
import { Link } from 'react-router-dom'


export default function Contact({listing}) {
    const {userRef:userId} = listing
    const [landLord,setLandLord] = useState(null)
    const [message,setMessage] = useState('')
    const onChange = (e)=>{
        setMessage(e.target.value)
    }
    useEffect(()=>{
        async function fetchLandLord(){
            const res = await fetch(`/api/user/${userId}`)
            const data = await res.json()
            if (data.success===false) {
                return
            }
            setLandLord(data)
        }
        fetchLandLord()
    },[userId])
  return (
    <>
    {
        landLord && 
        <div className='flex flex-col gap-5'>
            <p className='text-lg'>Contact <span className='font-semibold'>{landLord.username}</span> for <span className='font-semibold'>{listing.name}</span></p>
            <textarea name="message" id="message" rows="2"
                placeholder='enter your message here'
                value={message}
                onChange={onChange}
                className='w-full p-2 rounded-lg'
                />
            <Link to={`mailto:${landLord.email}?subject=Regarding ${listing.name}&body=${message}`}
                className='bg-slate-700 text-white text-center p-3 rounded-lg uppercase hover:opacity-95'>
                Send Message
            </Link>
        </div>
    }
    </>
  )
}
