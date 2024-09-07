import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { SiteContext } from '../../context/ContextProvider';

const Dashboard = () => {
    const { activePosts, inactivePosts, categories, admins, loggedinAdmin } = useContext(SiteContext);


    return (
        <>
            <Helmet>
                <title>Dashboard | Dashboard</title>
            </Helmet>
            <div className='md:grid md:grid-cols-2 lg:grid-cols-3 gap-4'>

                {
                    loggedinAdmin?.get_role?.permissions?.includes("Posts") &&
                    <>
                        <div className="bg-green-200 shadow-md rounded px-6 pt-4 pb-4 mb-4 flex flex-col justify-between gap-5">
                            <div className='flex justify-between text-4xl font-bold tracking-tight text-gray-900'>
                                <h5 className="">All posts</h5>
                                <h5 className="">{activePosts?.length}</h5>
                            </div>
                            <Link to={'/dashboard/post'} className='flex justify-between items-center text-xl font-bold tracking-tight text-gray-900 bg-green-400 rounded p-3'>
                                <button className="font-normal text-gray-700 dark:text-gray-400">Manage posts</button>
                                <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                        </div>

                        <div className="bg-red-200 shadow-md rounded px-6 pt-4 pb-4 mb-4 flex flex-col justify-between gap-5">
                            <div className='flex justify-between text-4xl font-bold tracking-tight text-gray-900'>
                                <h5 className="">Active posts</h5>
                                <h5 className="">{activePosts?.length}</h5>
                            </div>
                            <Link to={'/dashboard/post'} className='flex justify-between items-center text-xl font-bold tracking-tight text-gray-900 bg-red-400 rounded p-3'>
                                <button className="font-normal text-gray-700 dark:text-gray-400">Manage posts</button>
                                <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                        </div>

                        <div className="bg-orange-200 shadow-md rounded px-6 pt-4 pb-4 mb-4 flex flex-col justify-between gap-5">
                            <div className='flex justify-between text-4xl font-bold tracking-tight text-gray-900'>
                                <h5 className="">Inactive posts</h5>
                                <h5 className="">{inactivePosts?.length}</h5>
                            </div>
                            <Link to={'/dashboard/post'} className='flex justify-between items-center text-xl font-bold tracking-tight text-gray-900 bg-orange-400 rounded p-3'>
                                <button className="font-normal text-gray-700 dark:text-gray-400">Manage posts</button>
                                <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                        </div>

                        <div className="bg-violet-200 shadow-md rounded px-6 pt-4 pb-4 mb-4 flex flex-col justify-between gap-5">
                            <div className='flex justify-between text-4xl font-bold tracking-tight text-gray-900'>
                                <h5 className="">All categories</h5>
                                <h5 className="">{categories?.length}</h5>
                            </div>
                            <Link to={'/dashboard/post/category'} className='flex justify-between items-center text-xl font-bold tracking-tight text-gray-900 bg-violet-400 rounded p-3'>
                                <button className="font-normal text-gray-700 dark:text-gray-400">Manage categories</button>
                                <i className="fa-solid fa-arrow-right"></i>
                            </Link>
                        </div>
                    </>
                }


                {
                    loggedinAdmin?.get_role?.permissions?.includes("Admins") &&
                    <div className="bg-cyan-200 shadow-md rounded px-6 pt-4 pb-4 mb-4 flex flex-col justify-between gap-5">
                        <div className='flex justify-between text-4xl font-bold tracking-tight text-gray-900'>
                            <h5 className="">All admins</h5>
                            <h5 className="">{admins?.length}</h5>
                        </div>
                        <Link to={'/dashboard/admin'} className='flex justify-between items-center text-xl font-bold tracking-tight text-gray-900 bg-cyan-400 rounded p-3'>
                            <button className="font-normal text-gray-700 dark:text-gray-400">Manage admins</button>
                            <i className="fa-solid fa-arrow-right"></i>
                        </Link>
                    </div>
                }


            </div>

        </>
    );
};

export default Dashboard;