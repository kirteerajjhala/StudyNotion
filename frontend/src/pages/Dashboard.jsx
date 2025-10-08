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
    // Scroll to the top of the page when the component mounts
    useEffect(() => {
        window.scrollTo(0, 0);
    }, [])

    return (
        <div className='relative flex h-[calc(100vh-3.8rem)]w-full   hide-scrollbar  overflow-y-hidden mt-15 '>
            <Sidebar />

            <div className=' overflow-y-auto  py-10 px-10  hide-scrollbar w-full'>
             
                    <Outlet />
                
            </div>
        </div>
    )
}

export default Dashboard