import { useContext, useState, useEffect } from 'react';
import { SiteContext } from '../../context/ContextProvider';
import BackTop from '../parcials/BackTop';
import { Link } from 'react-router-dom';

const Footer = () => {
    const { MAIN_URL, loading, setLoading, identity, information } = useContext(SiteContext);
    return (
        <>
            <div className='container mx-auto'>
                <div className='flex flex-col md:flex-row gap-4 py-5 mb-10 p-1 border-2'>
                    <div className='w-full md:w-1/2 border-e'>

                        <div className='w-2/3 mx-auto flex flex-col gap-2 text-md'>
                            <div className=''>
                                <Link to={'/'} className="my-1 flex items-center lg:mb-0 lg:mt-0" href="#">
                                    <img className="me-2" src={`${MAIN_URL}/images/identity/${identity?.site_logo}`} style={{ height: '40px' }} alt="Logo" loading="lazy" />
                                </Link>
                            </div>
                            <p>সম্পাদক : <span className='font-black'>{information?.editor}</span></p>
                            <p>উপদেষ্টা সম্পাদক : <span className='font-black'>{information?.advisory_editor}</span></p>
                            <p>প্রকাশক : <span className='font-black'>{information?.publisher}</span></p>
                            <div className="block md:block lg:block xl:block flex items-center py-4">
                                {
                                    information?.facebook &&
                                    <Link to={information?.facebook} target='_blank'>
                                        <i className="fa-brands fa-facebook text-2xl text-blue-600 me-2"></i>
                                    </Link>
                                }
                                {
                                    information?.instagram &&
                                    <Link to={information?.instagram} target='_blank'>
                                        <i className="fa-brands fa-instagram text-2xl text-red-600 me-2"></i>
                                    </Link>
                                }
                                {
                                    information?.youtube &&
                                    <Link to={information?.youtube} target='_blank'>
                                        <i className="fa-brands fa-youtube text-2xl text-red-600 me-2"></i>
                                    </Link>
                                }
                            </div>
                        </div>

                    </div>
                    <div className='w-full md:w-1/2'>
                        <div className='w-2/3 mx-auto text-md font-bold flex flex-col items-center'>
                            <p className='h4'>যোগাযোগ: </p>
                            <p className=''>
                                {information?.address}
                            </p>
                        </div>

                    </div>
                </div>
            </div>
            <div className='container mx-auto pt-1 my-2 border-t-2'>
                <div className="flex flex-col-reverse lg:flex-row items-center w-full md:w-7/12 gap-3 lg:gap-5 mx-auto text-sm px-8 md:px-1">
                    <p>কপিরাইট © সর্বসত্ব স্বত্বাধিকার সংরক্ষিত ২০২৪</p>
                    <ul className="list-style-none flex flex-col md:flex-row gap-3 lg:gap-5 font-bold">
                        <li className="hover:text-red-500">
                            <Link to={'/privacy'} className="" href="#">গোপনীয়তা নীতি</Link>
                        </li>
                        <li className="hover:text-red-500">
                            <Link to={'/terms'} className="" href="#">শর্তাবলি ও নীতিমালা</Link>
                        </li>
                        <li className="hover:text-red-500">
                            <Link to={'/contact'} className="" href="#">যোগাযোগ</Link>
                        </li>
                        <li className="hover:text-red-500">
                            <Link to={'/contact'} className="" href="#">বিজ্ঞাপন</Link>
                        </li>

                    </ul>
                </div>
            </div>
            <BackTop />
        </>
    );
};

export default Footer;