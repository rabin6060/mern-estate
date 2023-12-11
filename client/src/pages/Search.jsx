import React, { useState,useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import ListingCard from '../components/ListingCard'

export default function Search() {
    const [sideBarData,setSideBarData] = useState({
        searchTerm:'',
        type:'all',
        parking:false,
        offer:false,
        furnished:false,
        sort:'createdAt',
        order:'desc'
    })
    const [loading,setLoading] = useState(false)
    const [listings,setListings] = useState([])

    const navigate = useNavigate()
    const handleChange = (e) =>{
        if (e.target.id==='all' || e.target.id==="rent" || e.target.id==='sale') {
            setSideBarData({
                ...sideBarData,type:e.target.id
            })
        }
        if (e.target.id==='searchTerm') {
            setSideBarData({
                ...sideBarData,searchTerm:e.target.value
            })
        }
        if(e.target.id==='offer' || e.target.id==='parking'||e.target.id==='furnished'){
            setSideBarData({
                ...sideBarData,[e.target.id]:e.target.checked || e.target.checked==='true'?true:false
            })
        }
        if (e.target.id==='sort_order') {
            const sort = e.target.value.split('_')[0]
            const order = e.target.value.split('_')[1]
            setSideBarData({
                ...sideBarData,sort,order
            })
        }
    }
    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromUrl= urlParams.get('searchTerm')
        const typeFromUrl=urlParams.get('type')
        const offerFromUrl= urlParams.get('offer')
        const parkingFromUrl= urlParams.get('parking')
        const furnishedFromUrl= urlParams.get('furnished')
        const sortFromUrl= urlParams.get('sort')
       const orderFromUrl= urlParams.get('order')

        if (
            searchTermFromUrl || typeFromUrl||offerFromUrl||parkingFromUrl||
            furnishedFromUrl||sortFromUrl||orderFromUrl)
            
            {
                setSideBarData({
                    searchTerm:searchTermFromUrl || '',
                    type:typeFromUrl||'all',
                    offer:offerFromUrl==='true'? true:false,
                    parking:parkingFromUrl==='true'?true:false,
                    furnished:furnishedFromUrl==='true'?true:false,
                    sort:sortFromUrl||'createdAt',
                    order:orderFromUrl||'desc'
                })
            }
            async function fetchListings(){
                try {
                    setLoading(true)
                    const searchQuery = urlParams.toString()
                    const res = await fetch(`api/listing/get?${searchQuery}`)
                    const data = await res.json()
                    if (data.success===false) {
                        setLoading(false)
                        return
                    }
                    setLoading(false)
                    setListings(data)
                    
                } catch (error) {
                    console.log(error);
                }
            }
            fetchListings()

    },[location.search])
    
   
    const handleSubmit = (e) => {
        e.preventDefault()
        const urlParams = new URLSearchParams()
        urlParams.set('searchTerm',sideBarData.searchTerm)
        urlParams.set('type',sideBarData.type)
        urlParams.set('offer',sideBarData.offer)
        urlParams.set('parking',sideBarData.parking)
        urlParams.set('furnished',sideBarData.furnished)
        urlParams.set('sort',sideBarData.sort)
        urlParams.set('order',sideBarData.order)
        const searchQuery = urlParams.toString()
        navigate(`/search?${searchQuery}`)
    }

  return (
    <div className='flex flex-col md:flex-row'>
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form onSubmit={handleSubmit} className='flex flex-col
            gap-5'>
                <div className="flex items-center gap-3">
                    <label className='whitespace-nowrap'>Search Term: </label>
                    <input type="text" name="search" id="searchTerm"
                        className='border rounded-lg p-3 w-full'
                        value={sideBarData.searchTerm}
                        onChange={handleChange}
                    />
                </div> 
                <div className="flex items-center gap-2 flex-wrap">
                    <label> Types:</label>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="all" checked={sideBarData.type==='all'} onChange={handleChange} />
                        <span>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="rent" checked={sideBarData.type==='rent'} onChange={handleChange}/>
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="sale" checked={sideBarData.type==='sale'} onChange={handleChange} />
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="offer" checked={sideBarData.offer} onChange={handleChange} />
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <label> Amentities:</label>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="parking" checked={sideBarData.parking} onChange={handleChange}/>
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="furnished" checked={sideBarData.furnished}  onChange={handleChange} />
                        <span>Furnished</span>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <label>Sort</label>
                    <select id="sort_order" className='border rounded-lg p-3 bg-white'
                        onChange={handleChange} defaultValue='createdAt_desc'>
                        <option value="regularPrice_desc">Price High To Low</option>
                        <option value="regularPrice_asc">Price Low To High</option>
                        <option value="createdAt_desc">Latest</option>
                        <option value="createdAt_asc">Oldest</option>
                    </select>
                </div>
                <button className='bg-slate-700 text-white uppercase p-3 rounded-lg hover:opacity-95'>Search</button>
            </form>
        </div>
        <div className="p-7 flex-1">
            <h1 className='text-3xl font-semibold text-slate-500 mt-2'>Listing Result</h1>
            <div className='flex flex-col sm:flex-row gap-5 p-7'>
                {loading && 
                    <p className='text-center text-xl '>Loading.....</p>
                }
                {
                    !loading && listings.length==0 &&
                    <p >No Listing Items.</p>
                }
                {
                    listings?.length>0 &&
                    listings.map(listing=><ListingCard key={listing._id} listing={listing}/>)
                }
            </div>
        </div>
    </div>
  )
}
