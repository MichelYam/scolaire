import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom"
import './App.css';

//Page
import Login from './Pages/Auth/Login/index';
import Register from './Pages/Auth/Register/index';
import DashBoard from "./Pages/DashBoard/Index";
import Chat from "./Pages/Chat/Index";
import Tasks from "./Pages/Tasks/index";
import Events from "./Pages/Events/Index";
import Settings from "./Pages/Settings/Index";
import Users from "./Pages/Admin/Users/index";
import Error from './Pages/NotFound';
import { useAppDispatch, useAppSelector } from './Redux/store';
import { selectUser } from './utils/selector';
import { getUserDetails } from './Redux/features/user/userAction';
import AppLayout from './Layout/AppLayout';
// import { routes } from './routes';
import { AbilityContext } from "./Components/Can";
import { buildAbilityFor } from "./config/ability";
import ProtectedRoute from './Pages/PrivateRoute';
import AdminRoute from './Pages/AdminRoute';

function App() {
  const { userInfo } = useAppSelector(selectUser)
  const role = userInfo?.role || "member"
  return (
    <AbilityContext.Provider value={buildAbilityFor(role)}>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route element={<ProtectedRoute />}>
            <Route element={<AppLayout />}>
              <Route index path='/dashboard' element={<DashBoard />} />
              <Route path='/chat' element={<Chat />} />
              <Route path='/events' element={<Events />} />
              <Route path='/tasks' element={<Tasks />} />
              <Route path='/settings' element={<Settings />} />
              <Route element={<AdminRoute />}>
                <Route path='/users' element={<Users />} />
              </Route>
            </Route>
          </Route>
          <Route path="*" element={<Error />} />
        </Routes>
      </BrowserRouter>
    </AbilityContext.Provider >
  );
}

export default App;
