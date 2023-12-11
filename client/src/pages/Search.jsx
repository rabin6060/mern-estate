import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row'>
        <div className="p-7 border-b-2 md:border-r-2 md:min-h-screen">
            <form className='flex flex-col
            gap-5'>
                <div className="flex items-center gap-3">
                    <label className='whitespace-nowrap'>Search Term: </label>
                    <input type="text" name="search" id="search"
                        className='border rounded-lg p-3 w-full'
                    />
                </div> 
                <div className="flex items-center gap-2 flex-wrap">
                    <label> Types:</label>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="all" />
                        <span>Rent & Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="rent" />
                        <span>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="sale" />
                        <span>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="offer" />
                        <span>Offer</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                    <label> Amentities:</label>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="parking" />
                        <span>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                        <input className='w-5' type="checkbox" id="furnished" />
                        <span>Furnished</span>
                    </div>
                </div>
                <div className='flex items-center gap-2'>
                    <label>Sort</label>
                    <select id="sort_order" className='border rounded-lg p-3 bg-white'>
                        <option value="">Price High To Low</option>
                        <option value="">Price Low To High</option>
                        <option value="">Latest</option>
                        <option value="">Oldest</option>
                    </select>
                </div>
                <button className='bg-slate-700 text-white uppercase p-3 rounded-lg hover:opacity-95'>Search</button>
            </form>
        </div>
        <div className="p-7">
            <h1 className='text-3xl font-semibold text-slate-500 mt-2'>Listing Result</h1>
        </div>
    </div>
  )
}
