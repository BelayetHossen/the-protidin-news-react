import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../frontend/shared/Header';
import Footer from '../frontend/shared/Footer';
import { Helmet } from 'react-helmet';
import { SiteContext } from '../context/ContextProvider';

const FrontMain = () => {
    const { MAIN_URL, loading, identity } = useContext(SiteContext);
    return (
        <>

            <Header />
            <Outlet />
            <Footer />
        </>
    );
};

export default FrontMain;
