import { NavLink, Outlet } from 'react-router-dom'
import { useAppSelector } from '../Redux/store'
import { selectUser } from '../utils/selector'

const ProtectedRoute = ({ children }: any) => {
    const { userInfo } = useAppSelector(selectUser)
    if (userInfo?.role === "member") {
        return (
            <div className='unauthorized'>
                <h1>Unauthorized :(</h1>
                <span>
                    <NavLink to='/dashboard'>dashboard</NavLink>
                </span>
            </div>
        )
    }

    return children ? children : <Outlet />;
}
export default ProtectedRoute