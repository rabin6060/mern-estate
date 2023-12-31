import React, { useState ,useEffect} from 'react'
import { useParams } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'
import { useSelector } from 'react-redux'
import {Navigation} from 'swiper/modules'
import 'swiper/css/bundle'
import {
    FaBath,
    FaBed,
    FaChair,
    FaMapMarkerAlt,
    FaParking,
  } from 'react-icons/fa';
import Contact from '../components/Contact'


export default function Listing() {
    const {currentUser} = useSelector(state=>state.user)
    const [listing,setListing] = useState(null)
    const [loading,setLoading] = useState(false)
    const [error,setError] = useState(false)
    const [contact,setContact] = useState(false)
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
            <div>
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
          
          <div className='flex flex-col max-w-4xl mx-auto p-3 my-7 gap-4'>
            <p className='text-2xl font-semibold'>
              {listing.name} - ${' '}
              {listing.offer
                ? listing.discountedPrice?.toLocaleString('en-US')
                : listing.regularPrice?.toLocaleString('en-US')}
              {listing.type === 'rent' && ' / month'}
            </p>
            <p className='flex items-center mt-6 gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className='flex gap-4'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${(+listing.regularPrice) - (+listing.discountedPrice)} OFF
                </p>
              )}
            </div>
            <p className='text-slate-800'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <ul className='text-green-900 font-semibold text-sm flex flex-wrap items-center gap-4 sm:gap-6'>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
              </li>
              <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
              </li>
            </ul>
            {
              currentUser &&  listing.userRef !== currentUser._id && !contact &&
              <button onClick={()=>setContact(!contact)} className='bg-slate-700 text-white px-4 py-2 rounded-lg text-lg hover:opacity-95 uppercase'>Contact LandLord</button>
            }
            {contact && <Contact listing={listing}/>}

          </div>
            </div>
        }
    </main>
  )
}
