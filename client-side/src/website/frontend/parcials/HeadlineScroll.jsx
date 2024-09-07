import React, { useContext } from 'react';
import { SiteContext } from '../../context/ContextProvider';
import { Link } from 'react-router-dom';

const HeadlineScroll = () => {
    const { MAIN_URL, isHeadline } = useContext(SiteContext);
    return (
        <>
            <div className={`rounded border mt-1`}>
                <div className="relative rounded-md py-1">
                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center px-2 bg-green-600 rounded-l z-10">
                        <span className="relative flex h-5 w-5 me-1">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-white opacity-100"></span>
                            <span className="relative inline-flex rounded-full h-5 w-5 bg-red-600"></span>
                        </span>
                        <span className="text-gray-100 sm:text-xl font-bold">শিরোনাম</span>
                    </div>
                    <div className="ticker-container">
                        <div className="ticker-wrapper">
                            <div className="ticker-transition text-red-800 text-lg">
                                {
                                    isHeadline?.map((item, index) => (
                                        <Link key={item.id} to={`/details/${item.slug}`}>
                                            <div className="ticker-item">{item.title}</div>
                                        </Link>
                                    ))
                                }

                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default HeadlineScroll;