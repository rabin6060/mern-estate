import React from 'react'
import { Link } from 'react-router-dom'
import { MdLocationOn } from 'react-icons/md'

export default function ListingCard({listing}) {

  return (
    <div className='bg-white shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden rounded-lg w-full sm:w-[330px]'>
        <Link to={`/listing/${listing._id}`}>
            <img src={listing.imageUrl[0]} alt="img" 
            className='h-[320px] sm:h-[220px] w-full object-cover hover:scale-105 transition-scale duration-300'/>
            <div className='p-4 flex flex-col gap-2 w-full'>
                <p className='text-lg font-semibold truncate'>{listing?.name}</p>
                <div className='flex items-center gap-1'>
                    <MdLocationOn size={20} className='text-green-700'/>
                    <p className='truncate text-slate-500 text-sm'>{listing.address}</p>
                </div>
                <div className='flex flex-col gap-2'>
                    <p className='line-clamp-2 text-sm text-slate-600'>{listing.description}</p>
                    <p className='text-slate-500 font-semibold mt-2'>$
                        {
                            listing.offer ? listing.discountedPrice.toLocaleString('en-US') : listing.regularPrice.toLocaleString('en-US')
                        }
                        {
                            listing.type==="rent" && ' / month'
                        }
                    </p>
                    <div className='flex items-center gap-2 text-slate-600'>
                        <div className='font-bold text-xs'>
                            {listing.bedrooms>1?`${listing.bedrooms} beds`:`${listing.bedrooms} beds`}
                        </div>
                        <div className='font-bold text-xs'>
                            {listing.bathrooms>1?`${listing.bathrooms} baths`:`${listing.bathrooms} baths`}
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    </div>
  )
}
