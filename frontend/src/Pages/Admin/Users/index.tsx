import React, { useEffect, useMemo } from 'react'
import Table from "../../../Components/Table/Table"
import { getAllUsers } from '../../../Redux/features/user/userAction'
import { useAppDispatch, useAppSelector } from '../../../Redux/store'
import { selectUser } from '../../../utils/selector'
import { redirect } from "react-router-dom";
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
        if (userInfo?.role !== "admin") redirect("./dashboard");
        dispatch(getAllUsers())
    }, [])

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
            <Table columns={Tablecolumns} data={allUsers}></Table>
        </>
    )
}

export default Index