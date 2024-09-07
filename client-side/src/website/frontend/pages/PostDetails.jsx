import { useContext, useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import { SiteContext } from '../../context/ContextProvider';
import HeadlineScroll from '../parcials/HeadlineScroll';
import DetailsRightBar from '../parcials/DetailsRightBar';
import axios from 'axios';
import FrontLoader from '../parcials/FrontLoader';
import { Helmet } from 'react-helmet';

const PostDetails = ({ url }) => {
    const { MAIN_URL, loading, setLoading, identity, removeHtmlTags } = useContext(SiteContext);
    const [postData, setPostData] = useState(null);
    const [moreSixPosts, setMoreSixPosts] = useState(null);
    const { slug } = useParams();


    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });


    const formatDate = (dateString) => {
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: 'numeric',
            minute: '2-digit',
            hourCycle: 'h12',
        };
        const date = new Date(dateString);
        const formattedDate = new Intl.DateTimeFormat('bn-BD', options).format(date);
        return formattedDate;
    };



    // Fetch post data by slug
    useEffect(() => {
        setLoading(true);
        axios.get(`${MAIN_URL}/api/post/${slug}`)
            .then(response => {
                setPostData(response.data.post);
                setMoreSixPosts(response.data.moreSixPosts);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching category data:', error);
                setLoading(false);
            });
    }, [slug]);
    return (
        <>
            <Helmet>
                <title>{postData?.title || "বিস্তারিত"} | {identity?.site_title || ""}</title>
            </Helmet>
            <div className='container mx-auto'>
                {
                    loading ?
                        <FrontLoader />
                        :
                        <>
                            <HeadlineScroll />
                            <section className='flex flex-col md:flex-row justify-between px-2 my-4 gap-4 md:gap-3'>

                                <div className='w-full md:w-9/12 lg:w-9/12'>
                                    <div className=''>
                                        <h4 className='font-black text-md text-gray-700 my-2 py-1 px-2 shadow w-28 border'>{postData?.main_category?.name}</h4>
                                        <div className=''>
                                            <h4 className='font-black text-3xl text-gray-700 py-2'>{postData?.title}</h4>
                                            <div className='flex items-center justify-between'>
                                                <div className=' py-2'>
                                                    <p className='text-sm'>{postData?.created_at && formatDate(postData?.created_at)}</p>
                                                </div>
                                                <div>
                                                    <div className='flex items-center gap-3'>
                                                        <div className="hidden md:block lg:block xl:block flex items-center">
                                                            <i className="fa-brands fa-facebook text-2xl text-blue-600 me-2"></i>
                                                            <i className="fa-brands fa-instagram text-2xl text-red-600 me-2"></i>
                                                            <i className="fa-brands fa-youtube text-2xl text-red-600 me-2"></i>

                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <img className="w-full" src={`${MAIN_URL}/images/posts/${postData?.photo}`} alt="Logo" loading="lazy" />
                                            <p className='py-2 font-black'>ছবি: সংগৃহীত</p>
                                        </div>
                                        <div className='my-4 border-t'>
                                            <p className='text-md leading-8 p-1 text-justify'>{removeHtmlTags(postData?.description)}</p>
                                        </div>

                                    </div>


                                </div>

                                {/* Right side bar */}
                                <DetailsRightBar />
                            </section>

                            <section className='border-t-2'>
                                <h4 className='my-2 px-2 font-black text-2xl'>সেইম আরও খবর পড়ুন:</h4>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-2  py-4 my-2">
                                    {
                                        moreSixPosts?.map((item, index) => (
                                            <Link key={item.id} to={`/details/${item.slug}`} >
                                                <div className='p-2 shadow hover:shadow-lg' onClick={() => handlePopulerClick(item.id)}>
                                                    <img className="w-full" src={`${MAIN_URL}/images/posts/${item.photo}`} alt="Logo" loading="lazy" />
                                                    <h4 className='font-black text-md text-gray-700 py-2'>{item.title}</h4>
                                                </div>

                                            </Link>
                                        ))
                                    }



                                </div>
                            </section>
                        </>
                }

            </div>
        </>
    );
};

export default PostDetails;