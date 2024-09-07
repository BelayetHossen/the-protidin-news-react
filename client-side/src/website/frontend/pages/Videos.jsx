import React, { useContext, useEffect, useState } from 'react';
import { SiteContext } from '../../context/ContextProvider';
import ReactPlayer from 'react-player';
import { Helmet } from 'react-helmet';
import FrontLoader from '../parcials/FrontLoader';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Videos = () => {
    const { MAIN_URL, identity, loading, setLoading } = useContext(SiteContext);

    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);


    useEffect(() => {
        fetchItems(currentPage);
    }, [currentPage]);

    const fetchItems = async (page) => {
        try {
            const response = await axios.get(`${MAIN_URL}/api/video/post?page=${page}`);
            setItems(response.data.videoPost.data);
            setCurrentPage(response.data.videoPost.current_page);
            setLastPage(response.data.videoPost.last_page);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching items:', error);
        }
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    return (
        <>
            <Helmet>
                <title>{"ভিডিও"} | {identity?.site_title || ""}</title>
            </Helmet>
            <div className='container mx-auto'>

                {
                    loading ?
                        <FrontLoader />
                        :
                        <>
                            <section className=' px-3 pt-3 pb-8 my-2'>
                                <div>
                                    <div>
                                        <h4>{"ভিডিও >>"}</h4>
                                    </div>
                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 py-2">

                                        {
                                            items?.map((item, index) => (
                                                <div key={item.id} className='px-2 py-4 my-3 shadow hover:shadow-lg'>
                                                    <ReactPlayer
                                                        className='react-player'
                                                        url={item.link}
                                                        width='100%'
                                                        height='100%'
                                                        controls={true}
                                                    />
                                                    <h4 className='font-black text-md py-2'>{item.title}</h4>
                                                </div>

                                            ))
                                        }





                                    </div>
                                    <div className='flex justify-between my-10'>
                                        <div></div>
                                        <nav aria-label="Page navigation example">
                                            <ul className="inline-flex -space-x-px text-sm">
                                                {Array.from({ length: lastPage }, (_, index) => {
                                                    const isActive = currentPage === index + 1;
                                                    return (
                                                        <li key={index + 1}>
                                                            <Link
                                                                onClick={() => handlePageChange(index + 1)}
                                                                className={`flex items-center justify-center px-4 h-8 leading-tight text-gray-600 border border-gray-300 hover:bg-gray-100 hover:text-gray-700 
                ${isActive ? 'bg-white' : 'bg-red-500'}`}
                                                                disabled={isActive}
                                                            >
                                                                {index + 1}
                                                            </Link>
                                                        </li>
                                                    );
                                                })}

                                            </ul>
                                        </nav>

                                    </div>
                                </div>
                            </section>
                        </>
                }



            </div>
        </>
    );
};

export default Videos;