import { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { SiteContext } from '../../context/ContextProvider';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const Header = () => {
    const { MAIN_URL, loading, setLoading, identity, information, allPosts } = useContext(SiteContext);
    const [dateTime, setDateTime] = useState({});
    const [searchShow, setSearchShow] = useState(false);
    const [isCollapsed, setIsCollapsed] = useState(true);
    const [categories, setCategories] = useState(null);
    const [first13Categories, setFirst13Categories] = useState(null);
    const [skip13NextCategories, setSkip13NextCategories] = useState(null);

    const toggleOffcanvas = () => {
        setIsCollapsed(!isCollapsed);
    }

    // Fetch Categories all data
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/category/all`)
            .then(response => {
                setCategories(response.data.categories);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching permission data:', error);
                setLoading(false);
            });
    }, []);
    //  Categories
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/home/header/categories`)
            .then(response => {
                setFirst13Categories(response.data.first13Categories);
                setSkip13NextCategories(response.data.skip13NextCategories);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching permission data:', error);
                setLoading(false);
            });
    }, []);




    // Date and time in header 
    useEffect(() => {
        const updateDateTime = () => {
            const date = new Date();
            const bengaliDays = ['রবিবার', 'সোমবার', 'মঙ্গলবার', 'বুধবার', 'বৃহস্পতিবার', 'শুক্রবার', 'শনিবার'];
            const bengaliMonths = ['বৈশাখ', 'জ্যৈষ্ঠ', 'আষাঢ়', 'শ্রাবণ', 'ভাদ্র', 'আশ্বিন', 'কার্তিক', 'অগ্রহায়ণ', 'পৌষ', 'মাঘ', 'ফাল্গুন', 'চৈত্র'];

            const englishDay = date.toLocaleString('en-US', { weekday: 'long' });
            const englishDate = date.getDate();
            const englishMonth = date.toLocaleString('en-US', { month: 'long' });
            const englishYear = date.getFullYear();

            const hours = date.getHours();
            const minutes = date.getMinutes();
            const seconds = date.getSeconds();
            const amPM = hours >= 12 ? 'am' : 'pm';

            // Function to convert English number to Bengali number
            const toBengaliNumber = (number) => {
                const bengaliNumbers = ['০', '১', '২', '৩', '৪', '৫', '৬', '৭', '৮', '৯'];
                return number.toString().replace(/\d/g, (match) => bengaliNumbers[parseInt(match)]);
            };

            const bengaliDay = bengaliDays[date.getDay()];
            const bengaliDate = toBengaliNumber(date.getDate());
            const bengaliMonth = bengaliMonths[date.getMonth()];
            const bengaliYear = toBengaliNumber(date.getFullYear() - 593); // Convert Gregorian year to Bengali year
            const hours12Format = hours % 12 || 12; // Convert 0 to 12

            const bengaliTime = `${toBengaliNumber(hours12Format)}:${toBengaliNumber(minutes)}:${toBengaliNumber(seconds)} ${amPM}`;

            const dateTimeInfo = {
                english: {
                    day: englishDay,
                    date: englishDate,
                    month: englishMonth,
                    year: englishYear
                },
                bengali: {
                    day: bengaliDay,
                    date: bengaliDate,
                    month: bengaliMonth,
                    year: bengaliYear,
                    time: bengaliTime
                }
            };

            setDateTime(dateTimeInfo);
        };
        const interval = setInterval(updateDateTime, 1000);
        return () => clearInterval(interval);
    }, []);

    // search system
    const [searchQuery, setSearchQuery] = useState('');
    const [results, setResults] = useState([]);
    const [showAlert, setShowAlert] = useState(false);
    const searchInput = () => {
        if (searchQuery.trim() === '') {
            setResults([]);
            return;
        }
        const filteredResults = allPosts
            ?.filter(item =>
                item.title.toLowerCase().includes(searchQuery.toLowerCase())
            )
            .slice(0, 5); // Limit to 5 results
        setResults(filteredResults);
        setShowAlert(filteredResults?.length === 0 && true);
    };
    useEffect(() => {
        searchInput();
    }, [searchQuery]);




    return (
        <>
            <Helmet>
                <link rel="icon" type="image/svg+xml" href={MAIN_URL + "/images/identity/" + identity?.site_icon} />
            </Helmet>

            <div className='container mx-auto'>


                <div className={`relative flex w-full items-center justify-between bg-zinc-50 py-2 shadow-dark-mild dark:bg-neutral-700 lg:py-6`} data-twe-navbar-ref>
                    <div className="flex w-full flex-wrap items-center justify-between px-4">

                        <div className="hidden md:block lg:block xl:block flex items-center">
                            <p className='text-sm text-gray-600'>{dateTime.english && `${dateTime.english.day}, ${dateTime.english.date} ${dateTime.english.month} ${dateTime.english.year}`}</p>
                            <p className='text-sm text-gray-600'>{dateTime.bengali && `${dateTime.bengali.day}, ${dateTime.bengali.date} ${dateTime.bengali.month} ${dateTime.bengali.year}`}</p>
                            <div >
                                <p className='w-36 px-2 py-1 rounded text-center'>{dateTime?.bengali?.time}</p>
                            </div>
                        </div>

                        <div className=''>
                            <Link to={'/'} className="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0" href="#">
                                <img className="me-2 w-56 md:w-96" src={`${MAIN_URL}/images/identity/${identity?.site_logo}`} alt="Logo" loading="lazy" />
                            </Link>
                        </div>

                        <div className='flex items-center justify-between gap-3'>
                            <div className="hidden md:block lg:block xl:block flex items-center">
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

                            <div onClick={() => setSearchShow(!searchShow)} className="block md:hidden flex items-center cursor-pointer">
                                {
                                    searchShow ? <i className="fa-solid fa-xmark text-xl"></i> : <i className="fas fa-search text-xl"></i>
                                }
                            </div>


                            <button onClick={toggleOffcanvas} className="block md:hidden border-0 bg-transparent px-2 text-black/50 hover:no-underline hover:shadow-none focus:no-underline focus:shadow-none focus:outline-none focus:ring-0 dark:text-neutral-200 lg:hidden" type="button" aria-controls="navbarSupportedContent4" aria-expanded={!isCollapsed} aria-label="Toggle navigation">
                                <span className="[&>svg]:w-7 [&>svg]:stroke-black/50 dark:[&>svg]:stroke-neutral-200">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor">
                                        <path fillRule="evenodd" d="M3 6.75A.75.75 0 013.75 6h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 6.75zM3 12a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75A.75.75 0 013 12zm0 5.25a.75.75 0 01.75-.75h16.5a.75.75 0 010 1.5H3.75a.75.75 0 01-.75-.75z" clipRule="evenodd" />
                                    </svg>
                                </span>
                            </button>

                        </div>

                    </div>
                </div>





                <div className={`flex-no-wrap relative flex w-full items-center justify-between bg-blue-50 shadow-dark-mild dark:bg-neutral-700 lg:flex-wrap lg:justify-start py-2 border-y-2`}>
                    <div className="flex w-full flex-wrap items-center justify-between px-3">

                        <div className="flex-grow items-center w-full md:w-10/12">
                            <ul className="list-none  me-auto flex flex-wrap md:flex-row justify-center md:justify-start ps-1 gap-4 overflow-x-auto whitespace-nowrap hide-scrollbar">
                                <li className="font-semibold text-gray-600 hover:text-black">
                                    <Link to={'/'} data-twe-nav-link-ref>হোম</Link>
                                </li>
                                <li className="font-semibold text-gray-600 hover:text-black">
                                    <Link to={`/videos`} data-twe-nav-link-ref>ভিডিও</Link>
                                </li>
                                {
                                    first13Categories &&
                                    first13Categories.map((item) => (
                                        <li key={item.id} className="font-semibold text-gray-600 hover:text-black">
                                            <Link to={`/category/news/${item.slug}`} className="" data-twe-nav-link-ref>{item.name}</Link>
                                        </li>
                                    ))
                                }
                                {
                                    skip13NextCategories &&
                                    <>
                                        <div className="group cursor-pointer">

                                            <div className="flex items-center justify-between space-x-2">
                                                <li className="font-semibold text-gray-600 hover:text-black">
                                                    <a href='#'>আরও</a>
                                                </li>
                                                <span>
                                                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5"
                                                        stroke="currentColor" className="h-5 w-5">
                                                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                                                    </svg>
                                                </span>
                                            </div>

                                            <div className="invisible absolute z-50 flex w-auto flex-col bg-gray-100 py-1 text-gray-800 shadow-xl group-hover:visible -ms-6">
                                                {
                                                    skip13NextCategories &&
                                                    skip13NextCategories.map((item) => (
                                                        <Link key={item.id} to={`/category/news/${item.slug}`} className="block border-b border-gray-300 py-2 font-semibold text-gray-700 hover:bg-gray-200 px-2 md:px-4">
                                                            {item.name}
                                                        </Link>
                                                    ))
                                                }
                                            </div>
                                        </div>
                                    </>

                                }
                            </ul>
                        </div>

                        <div onClick={() => setSearchShow(!searchShow)} className="hidden md:block relative flex items-center cursor-pointer shrink border-s ps-3">
                            {
                                searchShow ? <i className="fa-solid fa-xmark text-xl"></i> : <i className="fas fa-search text-xl"></i>
                            }
                        </div>
                    </div>
                </div>

                {
                    searchShow &&
                    <>
                        <div className={`bg-gray-200 rounded -mt-3 animate-navbar-collapse`}>
                            <div className="relative mt-2 rounded-md shadow-sm p-3">
                                <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-5">
                                    <span className="text-gray-800 sm:text-md font-bold">অনুসন্ধান</span>
                                </div>
                                <input
                                    type="text"
                                    name="price"
                                    id="price"
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="block w-full rounded-md border-0 py-2 pl-24 text-gray-900 placeholder:text-gray-600"
                                    placeholder="যা খুঁজতে চান"
                                />

                            </div>
                        </div>
                        {
                            results?.length > 0 &&
                            <div className={`absolute z-40 bg-gray-200 rounded -mt-1 animate-navbar-collapse container`}>
                                <div className="relative mt-2 rounded-md shadow-sm p-3">
                                    <ul>
                                        <li>
                                            <div className='flex flex-col items-center gap-3'>
                                                {results?.map((result) => (
                                                    <Link to={`/details/${result.slug}`} key={result.id}>
                                                        <div onClick={() => setSearchShow(false)}>
                                                            <div className='p-2 text-gray-700 hover:text-red-600 flex items-center gap-3 border-b-2 border-red-600' onClick={() => handlePopulerClick(5)}>
                                                                <img className='rounded w-14 my-1 mr-2' src={MAIN_URL + "/images/posts/" + result.photo} alt="" />
                                                                <h4 className='font-black text-md py-2'>{result.title}</h4>
                                                            </div>
                                                        </div>
                                                    </Link>
                                                ))}
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
                        }
                        {
                            showAlert &&
                            <div className={`absolute z-40 bg-gray-200 rounded -mt-1 animate-navbar-collapse container`}>
                                <div className="relative mt-2 rounded-md shadow-sm p-3">
                                    <div className="p-2 text-sm text-red-800 rounded-lg bg-red-50 dark:bg-gray-800 dark:text-red-400 text-center" role="alert">
                                        <span className="text-lg">নতুন কিছু লিখুন, এখানে কোন নিউজ পাওয়া যায়নি</span>
                                    </div>
                                </div>
                            </div>
                        }
                    </>
                }




                {/* Offcavas menu  */}
                <div id="drawer-example" className={`${isCollapsed && '-translate-x-full'} fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform bg-gray-200 w-full dark:bg-gray-800`} tabIndex="-1" aria-labelledby="drawer-label">
                    <div className='flex justify-between items-center'>
                        <div onClick={toggleOffcanvas}>
                            <Link to={'/'} className="mx-2 my-1 flex items-center lg:mb-0 lg:mt-0">
                                <img className="me-2" src={`${MAIN_URL}/images/identity/${identity?.site_logo}`} style={{ height: '40px' }} alt="Logo" loading="lazy" />
                            </Link>
                        </div>
                        <button onClick={toggleOffcanvas} type="button" className="text-gray-900 bg-transparent hover:bg-red-400 hover:text-gray-100 rounded-lg text-sm w-8 h-8 flex items-center justify-center float-right">
                            <svg className="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6" />
                            </svg>
                        </button>
                    </div>

                    <div className="mt-10">
                        <ul className="list-style-none grid gap-5 grid-cols-2">
                            {
                                categories &&
                                categories.map((item) => (
                                    <li onClick={toggleOffcanvas} key={item.id} className="border-b border-stone-300 pb-1">
                                        <Link to={`/category/news/${item.slug}`} className="text-sm font-bold">{item.name}</Link>
                                    </li>
                                ))
                            }



                        </ul>
                    </div>

                </div>





            </div>
        </>
    );
};

export default Header;