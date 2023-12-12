import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react'
import 'swiper/css/bundle'
import { Navigation } from 'swiper/modules'
import ListingCard from '../components/ListingCard'

export default function Home() {
  const [offerListings,setOfferListings] = useState([])
  const [rentListings,setRentListings] = useState([])
  const [saleListings,setSaleListiings] = useState([])

  useEffect(() => {
    async function fetchOffers(){
      try {
        const res = await fetch(`/api/listing/get?offer=true&limit=4`)
        const data = await res.json()
        setOfferListings(data)
        fetchRent()
      } catch (error) {
        console.log(error);
      }
    }
  fetchOffers()
  async function fetchRent(){
    try {
      const res = await fetch('/api/listing/get?type=rent&limit=4')
      const rents = await res.json()
      setRentListings(rents)
      fetchSale()
    } catch (error) {
      console.log(error);
    }
  }
  async function fetchSale(){
    try {
      const res = await fetch('/api/listing/get?type=sale&limit=4')
      const data = await res.json()
      setSaleListiings(data)
    } catch (error) {
      console.log(error);
    }
  }
    
  }, [])
  
  

  return (
    <div>
      <div className="flex flex-col gap-6 py-20 sm:py-28 px-3 max-w-6xl mx-auto">
        <div>
          <h1 className='text-slate-700 font-bold text-3xl lg:text-6xl'>Find your next <span className='text-slate-500'>perfect</span> <br />
          place with ease
          </h1>
        </div>
        <div className='text-slate-500 text-xs sm:text-sm'>
          RabinEstate is the best place to find your dream place to live <br />
          We have a wide range of properties to begin with...
        </div>
        <Link to={`/search`} className='text-xs sm:text-sm font-bold text-blue-800 hover:underline'>
          Let's get started...
        </Link>
      </div>
      <Swiper navigation modules={[Navigation]}>
        {
          offerListings && offerListings.length>0 &&
          offerListings.map(listing=>(
            <SwiperSlide key={listing._id}>
              <div
                  className='h-[550px]'
                  style={{
                    background: `url(${listing.imageUrl[0]}) center no-repeat`,
                    backgroundSize: 'cover',
                  }}
                ></div>
            </SwiperSlide>
          ))
        }
      </Swiper>
      <div className='max-w-6xl mx-auto p-3 flex flex-col gap-8 my-10'>
        {
          offerListings?.length>0 &&
          <div className='flex flex-col gap-5'>
            <div>
              <h1 className='text-slate-700 text-2xl font-semibold'>Recent Offers</h1>
              <Link className='text-sm text-blue-800 hover:underline' to={`/search?offer=true`}>
                Show More Offers ..
              </Link>
            </div>
            <div className='flex flex-col sm:flex-row flex-wrap gap-5'>
              {
                offerListings?.map(listing=><ListingCard key={listing._id} listing={listing}/>)
              }
            </div>
          </div>
        }
        {
          rentListings?.length>0 &&
          <div className='flex flex-col gap-5'>
            <div>
              <h1 className='text-slate-700 text-2xl font-semibold capitalize'>Recent Places for rent</h1>
              <Link className='text-sm text-blue-800 hover:underline' to={`/search?type=rent`}>
                Show More Rents ..
              </Link>
            </div>
            <div className='flex flex-col sm:flex-row flex-wrap gap-5'>
              {
                rentListings?.map(listing=><ListingCard key={listing._id} listing={listing}/>)
              }
            </div>
          </div>
        }
        {
          saleListings?.length>0 &&
          <div className='flex flex-col gap-5'>
            <div>
              <h1 className='text-slate-700 text-2xl font-semibold capitalize'>Recent place for sale</h1>
              <Link className='text-sm text-blue-800 hover:underline' to={`/search?type=sale`}>
                Show More Sales ..
              </Link>
            </div>
            <div className='flex flex-col sm:flex-row flex-wrap gap-5'>
              {
                saleListings?.map(listing=><ListingCard key={listing._id} listing={listing}/>)
              }
            </div>
          </div>
        }
      </div>
    </div>
  )
}
