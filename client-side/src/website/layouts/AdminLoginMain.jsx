import React from 'react';
import { Outlet } from 'react-router-dom';

const AdminLoginMain = () => {



    const sectionStyle = {
        position: 'relative',
        backgroundImage: 'url(https://flowbite.s3.amazonaws.com/blocks/marketing-ui/authentication/background.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '100vh',
        overflow: 'hidden',
    };

    const overlayStyle = {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
    };

    const contentStyle = {
        position: 'relative',
        zIndex: 1,
        color: 'white',
        padding: '20px',
    };
    return (
        <>
            <section className="" style={sectionStyle}>
                <div style={overlayStyle}></div>
                <div style={contentStyle} className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                    <h3 className="text-2xl font-bold leading-tight tracking-tight text-white md:text-3xl py-3">
                        Welcome to system-admin
                    </h3>
                    <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                        <Outlet />

                    </div>
                </div>
            </section>
        </>
    );
};

export default AdminLoginMain;