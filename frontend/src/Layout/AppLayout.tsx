import { useEffect, useState } from "react";
import { Outlet } from "react-router-dom";
import SideBar from "../Components/SideBar/index";
import { getUserDetails } from "../Redux/features/user/userAction";
import { logout } from "../Redux/features/user/userSlice";
import { useAppDispatch, useAppSelector } from "../Redux/store";
import { selectUser } from "../utils/selector";
import appRoutes from '../routes/appRoutes'

import Header from "./Header";
import "./style.css";
const AppLayout = () => {
    const dispatch = useAppDispatch()
    const [sidebarOpen, setSidebarOpen] = useState(false)
    const logOut = () => { dispatch(logout()) }
    const { userInfo } = useAppSelector(selectUser)
    const { userToken } = useAppSelector(selectUser)

    useEffect(() => {
        if (userToken) {
            dispatch(getUserDetails())
        }
    }, [userToken, dispatch])

    return (
        <>
            <SideBar logout={logOut} sidebarOpen={sidebarOpen} appRoutes={appRoutes} />
            <div className="content">
                <Header firstName={userInfo?.firstName} sidebarOnClose={() => setSidebarOpen(!sidebarOpen)} />
                <div className="test">
                    <Outlet />
                </div>
            </div>
        </>
    )
};

export default AppLayout;