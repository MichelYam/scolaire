import React, { useEffect, useMemo } from 'react'
import Table from "../../../Components/Table/Table"
import { getAllUsers, userDelete } from '../../../Redux/features/user/userAction'
import { useAppDispatch, useAppSelector } from '../../../Redux/store'
import { selectUser } from '../../../utils/selector'
import { redirect } from "react-router-dom";
import { IUser } from '../../../Interfaces'
const columns = [
    {
        title: 'First Name',
        data: 'firstName'
    },
    {
        title: 'Last Name',
        data: 'lastName'
    },
    {
        title: 'Email',
        data: 'email'
    },
    {
        title: 'Role',
        data: 'role'
    },
]
const Index = () => {
    const dispatch = useAppDispatch()
    const { allUsers, userInfo } = useAppSelector(selectUser)
    
    useEffect(() => {
        if (userInfo?.role !== "Admin") redirect("./dashboard");
        dispatch(getAllUsers())
    }, [])
    const removeUser = (user: IUser) => {
        console.log(user)
        dispatch(userDelete(user))
    }
    const Tablecolumns = useMemo(() => {
        const newColumns: any[] = []
        for (let column of columns) {
            newColumns.push({
                Header: column.title,
                accessor: column.data
            })
        }
        return newColumns
    }, [])
    return (
        <>
            <Table columns={Tablecolumns} data={allUsers} removeUser={removeUser} />
        </>
    )
}

export default Index