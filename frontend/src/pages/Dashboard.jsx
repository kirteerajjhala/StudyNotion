import React, { useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Outlet } from "react-router-dom"
import Sidebar from '../components/core/Dashboard/Sidebar'
import Loading from '../components/common/Loading'

const Dashboard = () => {
    const { loading: authLoading } = useSelector((state) => state.auth);
    const { loading: profileLoading } = useSelector((state) => state.profile);

    if (profileLoading || authLoading) {
        return (
            <div className='mt-10'>
                <Loading />
            </div>
        )
    }

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className='relative flex h-full  w-full hide-scrollbar overflow-y-hidden '>
            <Sidebar />
            <div className='overflow-y-auto py-10 px-4 sm:px-6 lg:px-10 hide-scrollbar w-full'>
                <Outlet />
            </div>
        </div>
    )
}

export default Dashboard
