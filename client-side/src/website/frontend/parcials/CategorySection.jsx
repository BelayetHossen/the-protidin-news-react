import { useContext, useState, useEffect } from 'react';
import { SiteContext } from '../../context/ContextProvider';
import RightSideBar2 from './RightSideBar2';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CategorySection = () => {
    const { MAIN_URL, loading, setLoading, handlePopulerClick, removeHtmlTags } = useContext(SiteContext);

    const [homeCategories, setHomeCategories] = useState([]);
    const [categoryPosts, setCategoryPosts] = useState({});

    useEffect(() => {
        // Function to fetch home categories from backend
        const fetchHomeCategories = async () => {
            try {
                const response = await axios.get(`${MAIN_URL}/api/home/categories`);
                setHomeCategories(response.data.homeCategories);
            } catch (error) {
                console.error('Error fetching home categories:', error);
            }
        };

        fetchHomeCategories();
    }, []);

    // Function to fetch posts for a specific category from backend
    const fetchCategoryPosts = async (categoryId) => {
        try {
            const response = await axios.get(`${MAIN_URL}/api/home/category/post/${categoryId}`);
            return response.data;
        } catch (error) {
            console.error(`Error fetching posts for category ${categoryId}:`, error);
            return { homeCategoryFirstPost: null, homeCategory4Post: [] };
        }
    };

    useEffect(() => {
        // Function to fetch posts for all home categories
        const fetchAllCategoryPosts = async () => {
            const postsData = {};
            for (const category of homeCategories) {
                const { homeCategoryFirstPost, homeCategory4Post } = await fetchCategoryPosts(category.id);
                postsData[category.id] = { homeCategoryFirstPost, homeCategory4Post };
            }
            setCategoryPosts(postsData);
        };

        if (homeCategories.length > 0) {
            fetchAllCategoryPosts();
        }
    }, [homeCategories]);






    return (
        <>
            <section className='my-12'>
                <div className='flex flex-col md:flex-row justify-between px-2 my-4 gap-4 md:gap-3'>
                    <div className='w-full md:w-9/12 lg:w-9/12'>

                        {homeCategories.map(category => (
                            <div key={category.id} className='mb-10'>
                                <div className='mb-4 border-b-4 border-red-600 flex items-center justify-between'>
                                    <div className='flex items-center gap-2 py-1'>
                                        <h3 className='font-black text-xl'>{category.name}</h3>
                                        <i className="fa-solid fa-play text-red-600 text-2xl"></i>
                                    </div>
                                    <div className='hover:text-green-600'>
                                        <Link to={`/category/news/${category.slug}`}>
                                            আরও {">>"}
                                        </Link>
                                    </div>
                                </div>
                                <div className='flex flex-col md:flex-row gap-3 '>
                                    <div className='w-full md:w-8/12'>
                                        {categoryPosts[category.id] && categoryPosts[category.id].homeCategoryFirstPost && (
                                            <Link to={`/details/${categoryPosts[category.id].homeCategoryFirstPost.slug}`} >
                                                <div onClick={() => handlePopulerClick(categoryPosts[category.id].homeCategoryFirstPost.id)} className='p-1'>
                                                    <img className="w-full" src={`${MAIN_URL}/images/posts/${categoryPosts[category.id].homeCategoryFirstPost.photo}`} alt="Logo" loading="lazy" />
                                                    <h3 className='font-extrabold text-3xl text-red-500 py-1'>{categoryPosts[category.id].homeCategoryFirstPost.title}</h3>
                                                    <p className='text-gray-600 text-lg'>‘{removeHtmlTags(categoryPosts[category.id].homeCategoryFirstPost?.description).substring(0, 200) + "..."}</p>
                                                </div>
                                            </Link>
                                        )}

                                    </div>
                                    <div className='flex flex-col gap-3 w-full md:w-4/12'>
                                        {categoryPosts[category.id] && categoryPosts[category.id].homeCategory4Post.length > 0 && (
                                            <div>
                                                {categoryPosts[category.id].homeCategory4Post.map(post => (
                                                    <Link key={post.id} to={`/details/${post.slug}`} >
                                                        <div onClick={() => handlePopulerClick(post.id)} className='flex items-center gap-2 border-b-2 py-3'>
                                                            <img className="w-1/2" src={`${MAIN_URL}/images/posts/${post.photo}`} alt="Logo" loading="lazy" />
                                                            <h4 className='font-black text-md text-gray-700 py-1'>{post.title}</h4>
                                                        </div>
                                                    </Link>
                                                ))}

                                            </div>
                                        )}


                                    </div>
                                </div>

                            </div>
                        ))}



                    </div>


                    {/* Right side bar */}
                    <RightSideBar2 />
                </div>
            </section >
        </>
    );
};

export default CategorySection;