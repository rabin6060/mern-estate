import {FaSearch} from 'react-icons/fa'
import { Link,useNavigate } from 'react-router-dom'
import {useSelector} from 'react-redux'
import { useEffect, useState } from 'react'

export default function Header() {
    const [searchTerm,setSearchTerm] = useState('')
  const {currentUser} = useSelector(state=>state.user)
  const navigate = useNavigate()
  const handleSubmit = (e) => {
    e.preventDefault()
    const urlParams = new URLSearchParams(window.location.search)
    urlParams.set('searchTerm',searchTerm)
    const searchQuery = urlParams.toString()
    navigate(`/search?${searchQuery}`)
  }
  useEffect(()=>{
    const urlParams = new URLSearchParams(location.search)
    const searchTermFromUrl = urlParams.get('searchTerm')
    if (searchTermFromUrl) {
        setSearchTerm(searchTermFromUrl)
    }
  },[location.search])
  return (
    <header className=' bg-slate-200 shadow-md '>
        <div className='flex items-center justify-between max-w-6xl mx-auto p-3'>
            <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>Rabin</span>
                <span className='text-slate-700'>Estate</span>
            </h1>
            </Link>
            <form onSubmit={handleSubmit} className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input type="text" placeholder='Search...' className='bg-transparent 
                focus:outline-none w-24 sm:w-64' value={searchTerm} onChange={(e)=>setSearchTerm(e.target.value)}/>
                <button>
                <FaSearch className='text-slate-700'/>
                </button>
            </form>
            <ul className='flex gap-5 text-slate-700'>
                <Link to='/'><li className='menu-items'>Home</li></Link>
                <Link to='/about'><li className='menu-items'>About</li></Link>
                <Link to='/profile'>
                    {currentUser? <img src={currentUser.avatar} alt="profile" className='rounded-full h-8 w-8 object-cover' />:<li className='hover:underline'>Signin</li>}
                </Link>
            </ul>
        </div>
        
    </header>
  )
}
