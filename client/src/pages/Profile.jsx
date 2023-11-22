import {useSelector} from 'react-redux'

const Profile = () => {
  const {currentUser} = useSelector(state=>state.user)
  return (
    <div className='p-2 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>
      <form className='flex flex-col gap-4'>
        <img className='rounded-full w-24 h-24 object-cover cursor-pointer self-center mt-2 ' src={currentUser.avatar} alt="profile" />
        <input className='p-3 border rounded-lg ' type="text" placeholder='username' id='username' />
        <input className='p-3 border rounded-lg ' type="email" placeholder='email' id='email' />
        <input className='p-3 border rounded-lg ' type="text" placeholder='password' id='password' />
        <button className='buttons'>update</button>
      </form>
      <div className='flex justify-between mt-3'>
        <span className='text-red-700 cursor-pointer'>Delete Account</span>
        <span className='text-red-700 cursor-pointer'>Sign Out</span>
      </div>
    </div>
  )
}

export default Profile