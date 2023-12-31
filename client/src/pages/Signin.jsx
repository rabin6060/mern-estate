
import React,{useState} from 'react'
import {Link,useNavigate} from 'react-router-dom'
import { useDispatch,useSelector } from 'react-redux'
import { signInFailure, signInStart, signInSuccess } from '../redux/user/userSlice'
import OAuth from '../components/OAuth'


export default function Signin() {
  const [FormData,setHandleFormData] = useState({})
  const {error,loading} = useSelector((state)=>state.user)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const handleChange = (e) => {
    setHandleFormData(
      {...FormData,[e.target.id]:e.target.value}
    )
  }
  const handleSubmit =async (e) => {
    e.preventDefault()
    try {
      dispatch(signInStart())
      const res  = await fetch('/api/auth/signin',
      {
        method:'POST',
        headers:{
          'Content-Type':'application/json'
        },
        body:JSON.stringify(FormData)
      }
      )
      const data = await res.json()
      
      if (data.success === false) {
        dispatch(signInFailure(data.message))
        return
      }
      dispatch(signInSuccess(data))
      navigate('/')

    } catch (error) {
      dispatch(signInFailure(error.message))
    }
  }

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl text-center font-semibold my-7'>Sign In</h1>
      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input type="email" placeholder='email' className='signup-inputs' id='email'onChange={handleChange} />
        <input type="password" placeholder='password' className='signup-inputs' id='password' onChange={handleChange}/>
        <button disabled={loading} className=' buttons
          disabled:opacity-70'>
            {loading?'Loading...':"Sign In"}
        </button>
        <OAuth/>
      </form>
      <div className='flex gap-2 mt-5'>
        <p>Don't have a account?</p>
        <Link to={'/sign-up'}>
          <span className='text-blue-700'>Sign up</span>
        </Link>
      </div>
      {error && <p className='text-red-500'>{error}</p>}
      
    </div>
  )
}
