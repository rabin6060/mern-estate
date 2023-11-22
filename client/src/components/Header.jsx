import {FaSearch} from 'react-icons/fa'
import { Link } from 'react-router-dom'
import {useSelector} from 'react-redux'

export default function Header() {
  const {currentUser} = useSelector(state=>state.user)
  return (
    <header className=' bg-slate-200 shadow-md '>
        <div className='flex items-center justify-between max-w-6xl mx-auto p-3'>
            <Link to='/'>
            <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
                <span className='text-slate-500'>Rabin</span>
                <span className='text-slate-700'>Estate</span>
            </h1>
            </Link>
            <form className='bg-slate-100 p-3 rounded-lg flex items-center'>
                <input type="text" placeholder='Search...' className='bg-transparent 
                focus:outline-none w-24 sm:w-64'/>
                <FaSearch className='text-slate-700'/>
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
