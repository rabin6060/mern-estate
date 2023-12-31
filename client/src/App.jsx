import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Profile from './pages/Profile'
import Signin from './pages/Signin'
import Signup from './pages/Signup'
import About from './pages/About'
import Header from './components/Header'
import PrivateRoute from './components/PrivateRoute'
import CreateListing from './pages/CreateListing'
import EditListing from './pages/EditListing'
import Listing from './pages/Listing'
import Search from './pages/Search'

export default function App() {
  return (
    <BrowserRouter>
      <Header/>
      <Routes>
        <Route path='/' element={<Home/>}/>
        <Route element={<PrivateRoute/>} >
          <Route path='/profile' element={<Profile/>}/>
          <Route path='/create-listing' element={<CreateListing/>}/>
          <Route path='/update-listing/:id' element={<EditListing/>} />
        </Route>
        <Route path='/listing/:id' element={<Listing/>}/>
        <Route path='/search' element={<Search/>} />
        <Route path='/sign-in' element={<Signin/>}/>
        <Route path='/sign-up' element={<Signup/>}/>
        <Route path='/about' element={<About/>}/>
      </Routes>
    </BrowserRouter>
  )
}
