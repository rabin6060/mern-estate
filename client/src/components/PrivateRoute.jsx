import { useSelector } from "react-redux"
import { Outlet } from "react-router-dom"
import Signin from "../pages/Signin"

export default function PrivateRoute() {
    const {currentUser} = useSelector(state=>state.user)

    return currentUser?<Outlet/>:<Signin/>
}
