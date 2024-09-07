import React, { useContext, useEffect, useState } from 'react';
import { SiteContext } from '../../context/ContextProvider';
import FrontLoader from '../parcials/FrontLoader';
import HeadlineScroll from '../parcials/HeadlineScroll';
import { Link, useParams } from 'react-router-dom';
import RightSideBar1 from '../parcials/RightSideBar1';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const Category = () => {
    const { MAIN_URL, loading, setLoading, handlePopulerClick, identity } = useContext(SiteContext);
    const { slug } = useParams();

    const [latestOne, setLatestOne] = useState(null);
    const [nextFourPost, setNextFourPost] = useState([]);
    const [nextSixPost, setNextSixPost] = useState([]);
    const [findCategory, setFindCategory] = useState(null);

    const [items, setItems] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);


    useEffect(() => {
        fetchItems(currentPage);
    }, [currentPage, slug]);

    const fetchItems = async (page) => {
        try {
            const response = await axios.get(`${MAIN_URL}/api/category/post/${slug}?page=${page}`);
            setItems(response.data.posts.data);
            setLatestOne(response.data.latestOne);
            setNextFourPost(response.data.nextFourPosts);
            setNextSixPost(response.data.nextSixPosts);
            setFindCategory(response.data.category);
            setCurrentPage(response.data.posts.current_page);
            setLastPage(response.data.posts.last_page);

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
                <title>{findCategory?.name || "খবর"} | {identity?.site_title || ""}</title>
            </Helmet>
            <div className='container mx-auto'>

                {
                    loading ?
                        <FrontLoader />
                        :
                        <>
                            {
                                latestOne ?
                                    <>
                                        <section className='flex flex-col md:flex-row justify-between my-4 gap-4 md:gap-3 px-2'>

                                            <div className='w-full md:w-9/12 lg:w-9/12'>
                                                {/* <div className='flex flex-col md:flex-row gap-3 '>

                                                    <div className='w-full md:w-8/12'>
                                                        <div onClick={() => handlePopulerClick(latestOne?.id)}>
                                                            <Link to={`/details/${latestOne?.slug}`} >
                                                                <div className='p-1' >
                                                                    <img className="w-full" src={`${MAIN_URL}/images/posts/${latestOne?.photo}`} alt="Photo" loading="lazy" />
                                                                    <h3 className='font-extrabold text-3xl text-gray-700 hover:text-red-500 py-1'>{latestOne?.title}</h3>
                                                                    <p className='text-gray-700 text-justify hover:text-red-500 text-lg'>‘{removeHtmlTags(latestOne?.description).substring(0, 200) + "..."}<span className='text-blue-600'>আরও</span></p>
                                                                </div>
                                                            </Link>
                                                        </div>
                                                    </div>

                                                    <div className='flex flex-col gap-3 w-full md:w-4/12'>

                                                        {
                                                            nextFourPost?.map((item, index) => (
                                                                <Link key={item.id} to={`/details/${item.slug}`} >
                                                                    <div className='flex items-center gap-2 border-b-2 py-3 hover:shadow' onClick={() => handlePopulerClick(item.id)}>
                                                                        <img className="w-1/2" src={`${MAIN_URL}/images/posts/${item.photo}`} alt="Logo" loading="lazy" />
                                                                        <h4 className='font-black text-md text-gray-700 hover:text-red-500 py-1'>{item.title}</h4>
                                                                    </div>
                                                                </Link>

                                                            ))
                                                        }



                                                    </div>
                                                </div> */}
                                                <div>
                                                    <h4>{findCategory?.name + ">>"}</h4>
                                                </div>
                                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-t-2 my-4">
                                                    {
                                                        items?.map((item, index) => (
                                                            <Link key={item.id} to={`/details/${item.slug}`} >
                                                                <div className='p-2 shadow hover:shadow-lg' onClick={() => handlePopulerClick(item.id)}>
                                                                    <img className="w-full" src={`${MAIN_URL}/images/posts/${item.photo}`} alt="Logo" loading="lazy" />
                                                                    <h4 className='font-black text-md text-gray-700 py-2'>{item.title}</h4>
                                                                </div>
                                                            </Link>
                                                        ))
                                                    }



                                                </div>


                                                <div className='flex justify-between'>
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

                                            {/* Right side bar */}
                                            <RightSideBar1 />
                                        </section>
                                    </> :
                                    <>
                                        <div className="p-4 my-8 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
                                            <span className="text-lg">এই ক্যাটাগরিতে কোন নিউজ পাওয়া যায়নি</span>
                                        </div>
                                    </>
                            }





                        </>
                }



            </div>
        </>
    );
};

export default Category;