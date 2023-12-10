import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'


export default function Listing() {
   
    const [listing,setListing] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const params = useParams()
    useEffect(()=>{
        async function fetchData() {
            try {
                setLoading(true)
                const res = await fetch(`/api/listing/get/${params.id}`)
                const data = await res.json()
                if (data.success===false) {
                    setError(true)
                    setLoading(false)
                    
                    return
                }
                setListing(data)
                setLoading(false)
                setError(false)
                
            } catch (error) {
                setError(true)
            }
        }
        fetchData()
    },[params.id])

  return (
    <main>
        {loading && <p className='text-3xl text-center mt-5'>Loading....</p>}
        {error && <p className='text-3xl text-center mt-5'>Something Went Wrong....</p>}
        {!loading && !error && listing &&
            <>
            <Swiper navigation modules={[Navigation]}>
            {listing.imageUrl.map((url) => (
              <SwiperSlide key={url}>
                <div
                  className='h-[550px]'
                  style={{
                    background: `url(${url}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
              </SwiperSlide>
            ))}
          </Swiper>
            </>
        }
    </main>
  )
}
