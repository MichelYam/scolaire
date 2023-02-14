import { NavLink, Outlet } from 'react-router-dom'
import { useAppSelector } from '../Redux/store'
import { selectUser } from '../utils/selector'

const ProtectedRoute = ({children}: any) => {
    const { userToken } = useAppSelector(selectUser)
    if (!userToken) {
        return (
            <div className='unauthorized'>
                <h1>Unauthorized :(</h1>
                <span>
                    <NavLink to='/'>Login</NavLink> to gain access
                </span>
            </div>
        )
    }

    return children ? children : <Outlet />;
}
export default ProtectedRoute