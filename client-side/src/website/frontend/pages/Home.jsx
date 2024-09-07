import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiteContext } from '../../context/ContextProvider';
import FrontLoader from '../parcials/FrontLoader';
import RightSideBar1 from '../parcials/RightSideBar1';
import VideoSection from '../parcials/VideoSection';
import CategorySection from '../parcials/CategorySection';
import HeadlineScroll from '../parcials/HeadlineScroll';
import { Helmet } from 'react-helmet';


const Home = () => {
    const { MAIN_URL, removeHtmlTags, loading, setLoading, handlePopulerClick, latestOne, nextFourPost, nextSixPost, identity, adbannerData } = useContext(SiteContext);



    return (
        <>
            <Helmet>
                <title>মূলপাতা | {identity?.site_title || ""}</title>
            </Helmet>
            <div className='container mx-auto'>
                {
                    loading ?
                        <FrontLoader />
                        :
                        <>
                            <HeadlineScroll />
                            {
                                adbannerData?.homead1 &&
                                <div className='my-2'>
                                    <Link to={JSON.parse(adbannerData?.homead1)?.link} target='_blank' className="my-1 flex items-center lg:mb-0 lg:mt-0">
                                        <img className="w-8/12" src={`${MAIN_URL + "/images/adbanner/" + JSON.parse(adbannerData?.homead1)?.photo}`} alt="Logo" loading="lazy" />
                                    </Link>
                                </div>
                            }






                            {/* Hero section  */}
                            <section className='flex flex-col md:flex-row justify-between my-4 gap-4 md:gap-3 mx-2 md:mx-0'>

                                <div className='w-full md:w-9/12 lg:w-9/12'>
                                    <div className='flex flex-col-reverse md:flex-row gap-3 '>
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
                                        <div className='w-full md:w-8/12'>
                                            <div onClick={() => handlePopulerClick(latestOne?.id)}>
                                                <Link to={`/details/${latestOne?.slug}`} >
                                                    <div className='p-1' >
                                                        <img className="w-full" src={`${MAIN_URL}/images/posts/${latestOne?.photo}`} alt="Logo" loading="lazy" />
                                                        <h3 className='font-extrabold text-3xl text-gray-700 hover:text-red-500 py-1'>{latestOne?.title}</h3>
                                                        <p className='text-gray-700 text-justify hover:text-red-500 text-lg'>‘{removeHtmlTags(latestOne?.description).substring(0, 200) + "........."}<span className='text-blue-600'>আরও</span></p>
                                                    </div>
                                                </Link>
                                            </div>
                                        </div>
                                    </div>

                                    <div className="grid grid-cols-1 md:grid-cols-3 gap-2 border-t-2 py-4 my-8">
                                        {
                                            nextSixPost?.map((item, index) => (
                                                <Link key={item.id} to={`/details/${item.slug}`} >
                                                    <div className='p-2 shadow hover:shadow-lg' onClick={() => handlePopulerClick(item.id)}>
                                                        <img className="w-full" src={`${MAIN_URL}/images/posts/${item.photo}`} alt="Logo" loading="lazy" />
                                                        <h4 className='font-black text-md text-gray-700 py-2'>{item.title}</h4>
                                                    </div>
                                                </Link>
                                            ))
                                        }



                                    </div>

                                </div>

                                {/* Right side bar */}
                                <RightSideBar1 />
                            </section>

                            {
                                adbannerData?.homead2 &&
                                <div className='my-2'>
                                    <Link to={JSON.parse(adbannerData?.homead2)?.link} target='_blank' className="my-1 flex items-center lg:mb-0 lg:mt-0">
                                        <img className="w-8/12" src={`${MAIN_URL + "/images/adbanner/" + JSON.parse(adbannerData?.homead2)?.photo}`} alt="Logo" loading="lazy" />
                                    </Link>
                                </div>
                            }

                            {/* Video section  */}
                            <VideoSection />

                            {
                                adbannerData?.homead3 &&
                                <div className='my-2'>
                                    <Link to={JSON.parse(adbannerData?.homead3)?.link} target='_blank' className="my-1 flex items-center lg:mb-0 lg:mt-0">
                                        <img className="w-8/12" src={`${MAIN_URL + "/images/adbanner/" + JSON.parse(adbannerData?.homead3)?.photo}`} alt="Logo" loading="lazy" />
                                    </Link>
                                </div>
                            }


                            {/* Category section  */}
                            <CategorySection />
                        </>
                }








            </div>


        </>
    );
};

export default Home;


{/* <div className="border border-gray-300 shadow rounded-md p-4 max-w-sm w-full mx-auto">
    <div className="animate-pulse flex space-x-4">
        <div className="rounded-full bg-gray-400 h-12 w-12"></div>
        <div className="flex-1 space-y-4 py-1">
            <div className="h-4 bg-gray-400 rounded w-3/4"></div>
            <div className="space-y-2">
                <div className="h-4 bg-gray-400 rounded"></div>
                <div className="h-4 bg-gray-400 rounded w-5/6"></div>
            </div>
        </div>
    </div>
</div> */}