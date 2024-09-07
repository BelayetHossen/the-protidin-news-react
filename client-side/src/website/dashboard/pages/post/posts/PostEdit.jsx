import { useContext, useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import { SiteContext } from '../../../../context/ContextProvider';
import Spinner from '../../../shared/Spinner';
import SubmitButton from '../../../shared/SubmitButton';
import CustomButton from '../../../shared/CustomButton';
import { Helmet } from 'react-helmet';




const PostEdit = () => {
    const { MAIN_URL, loading, setLoading } = useContext(SiteContext);
    const [postData, setPostData] = useState(null);
    const [tags, setTags] = useState(null);
    const [categories, setCategories] = useState(null);
    const [subCategories, setSubCategories] = useState(null);
    const [subSubCategories, setSubSubCategories] = useState(null);
    const [selectedTags, setSelectedTags] = useState([]);
    const { id } = useParams();
    const navigate = useNavigate();


    const editor = useRef(null);
    const [content, setContent] = useState("");




    // get sub category by change category
    const categoryChange = (id) => {
        axios.get(`${MAIN_URL}/api/subcategory-by-category/get/${id}`)
            .then(response => {
                setSubCategories(response.data.data.sub_category);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching permission data:', error);
                setLoading(false);
            });
    }
    // get sub-sub category by change sub-category
    const subCategoryChange = (id) => {
        axios.get(`${MAIN_URL}/api/subsubcategory-by-subcategory/get/${id}`)
            .then(response => {
                setSubSubCategories(response.data.data.sub_sub_category);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching permission data:', error);
                setLoading(false);
            });
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
    // Fetch  sub-Categories all data
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/subcategory/all`)
            .then(response => {
                setSubCategories(response.data.subCategories);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching permission data:', error);
                setLoading(false);
            });
    }, []);
    // Fetch sub-sub-Categories all data
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/subsubcategory/all`)
            .then(response => {
                setSubSubCategories(response.data.subSubCategories);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching permission data:', error);
                setLoading(false);
            });
    }, []);
    // Fetch tags all data
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/tag/all`)
            .then(response => {
                setTags(response.data.tags);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching permission data:', error);
                setLoading(false);
            });
    }, []);

    // image preview system
    const [image, setImage] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);

    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setImage(URL.createObjectURL(selectedImage));
            setProfilePhoto(selectedImage);
        }
    };
    const handleRemoveImage = () => {
        setImage(null);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const handleDrop = (e) => {
        e.preventDefault();
        const selectedImage = e.dataTransfer.files[0];
        if (selectedImage) {
            setImage(URL.createObjectURL(selectedImage));
            setProfilePhoto(selectedImage);
        }
    };

    // Fetch post data by ID
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/post/get/${id}`)
            .then(response => {
                setPostData(response.data.post);
                setSelectedTags(response.data.post.tags);
                setImage(MAIN_URL + "/images/posts/" + response.data.post?.photo);
                setContent(response.data.post?.description);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching category data:', error);
                setLoading(false);
            });
    }, []);



    // Event handler to update selected values
    const handleTagChange = (e) => {
        const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
        setSelectedTags(selectedOptions);
    };


    // is_headline checkbox
    const [isChecked, setIsChecked] = useState(postData?.is_headline);
    const handleCheckboxChange = (e) => {
        setIsChecked(e.target.checked);
    };

    const [errors, setErrors] = useState({
        title: '',
        category_id: '',
        description: '',
    });

    // update system
    const submitPost = (e) => {
        e.preventDefault();
        setLoading(true);
        const id = e.target.id.value;
        const title = e.target.title.value;
        const category_id = e.target.category_id.value;
        const sub_category_id = e.target.sub_category_id.value;
        const sub_sub_category_id = e.target.sub_sub_category_id.value;
        const meta_title = e.target.meta_title.value;
        const meta_description = e.target.meta_description.value;
        const old_photo = e.target.old_photo.value;

        // Validation
        let formIsValid = true;
        const errorsCopy = { ...errors };

        if (title.trim() === '') {
            errorsCopy.title = 'The title is required!';
            formIsValid = false;
        } else {
            errorsCopy.title = '';
        }
        if (category_id.trim() === '') {
            errorsCopy.category_id = 'The main category is required!';
            formIsValid = false;
        } else {
            errorsCopy.category_id = '';
        }



        setErrors(errorsCopy);

        // Create FormData object
        const formData = new FormData();
        formData.append('id', id);
        formData.append('title', title);
        formData.append('description', content);
        formData.append('category_id', category_id);
        formData.append('sub_category_id', sub_category_id);
        formData.append('sub_sub_category_id', sub_sub_category_id);
        formData.append('tags', selectedTags);
        formData.append('photo', profilePhoto);
        formData.append('is_headline', isChecked);
        formData.append('meta_title', meta_title);
        formData.append('meta_description', meta_description);
        formData.append('old_photo', old_photo);

        // Proceed with form submission only if form is valid
        if (!formIsValid) {
            setLoading(false);
            return;
        }



        axios.post(`${MAIN_URL}/api/post/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                if (response?.data?.code === 201) {
                    toast.success(response?.data?.message);
                    navigate("/dashboard/post", { replace: true });
                }
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };

    return (
        <>
            <Helmet>
                <title>Edit Posts | Dashboard</title>
            </Helmet>
            <div className="w-full mx-auto bg-white shadow-md rounded px-4 pt-4 pb-4 mb-4">
                <div className="flex justify-between border-b-2 pb-4 mb-2">
                    <h3 className='h4'>New sub category</h3>

                    <div>
                        <CustomButton text="<< Back" path="/dashboard/post" />
                    </div>
                </div>


                <form onSubmit={submitPost}>
                    <div className="mb-4">
                        <label htmlFor="title">Title</label>
                        <input
                            defaultValue={postData?.title}
                            name='title'
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                        />
                        {errors.title !== '' && <p className='text-red-600'>{errors.title}</p>}
                    </div>
                    <input defaultValue={postData?.id} name='id' type="hidden" />
                    <input
                        name='old_photo'
                        type="hidden"
                        defaultValue={postData?.photo}
                    />
                    <div className="mb-4">
                        <label htmlFor="name">Description</label>
                        <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={newContent => setContent(newContent)}
                        />
                        {errors.description !== '' && <p className='text-red-600'>{errors.description}</p>}
                    </div>
                    <div className="mb-4">
                        <label>Main category name</label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name='category_id'
                            onChange={(e) => categoryChange(e.target.value)}
                        >
                            <option value="">-Select-</option>
                            {categories?.map((item, index) => (
                                <option key={index} value={item.id} selected={postData?.main_category?.id === item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id !== '' && <p className='text-red-600'>{errors.category_id}</p>}
                    </div>
                    <div className="mb-4">
                        <label>Sub category name</label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name='sub_category_id'
                            onChange={(e) => subCategoryChange(e.target.value)}
                        >
                            <option value="">-Select-</option>
                            {subCategories?.map((item, index) => (
                                <option key={index} value={item.id} selected={postData?.sub_category?.id === item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label>Sub-Sub category name</label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name='sub_sub_category_id'
                        >
                            <option value="">-Select-</option>
                            {subSubCategories?.map((item, index) => (
                                <option key={index} value={item.id} selected={postData?.main_category?.id === item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-4">
                        <label>Photo <small>(optional)</small></label>
                        {
                            !image && <>
                                <div className="flex items-center justify-center w-full">
                                    <label onDrop={handleDrop}
                                        onDragOver={handleDragOver}
                                        htmlFor="fileInput" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (1000x525px)</p>
                                        </div>
                                        <input name='photo'
                                            id="fileInput"
                                            type="file"
                                            accept="image/*"
                                            onChange={handleImageChange} className="hidden" />
                                    </label>
                                </div>
                            </>
                        }

                        <div className="mt-3 relative">
                            <div className="">
                                {image &&
                                    <div className="mb-3 w-48 mx-auto">
                                        <img src={image} alt={`Preview `} className="w-100" />
                                        <button
                                            style={{ top: '0', right: '0' }}
                                            className="mt-2 absolute mr-4"
                                            onClick={handleRemoveImage}
                                        >
                                            <i className="fas fa-times-circle text-red-600"></i>
                                        </button>
                                    </div>
                                }
                            </div>

                        </div>
                    </div>

                    <div className="mb-4 flex item-center gap-5">
                        <label htmlFor="is_headline">Show headline<small> (optional)</small></label>
                        <label className="inline-flex items-center me-5 cursor-pointer">
                            <input
                                name='is_headline'
                                id="is_headline"
                                type="checkbox"
                                checked={isChecked}
                                onChange={handleCheckboxChange}
                                className="sr-only peer"
                            />
                            <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                        </label>
                    </div>

                    <div>
                        <h5 className='h5'>SEO option<small> (optional)</small></h5>
                    </div>
                    <div className="mb-4">
                        <label>Tags<small> (optional)</small></label>
                        <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='tags' multiple onChange={handleTagChange} defaultValue={selectedTags}>
                            {tags?.map((item, index) => (
                                <option key={index} value={item.name} selected={postData?.tags.includes(item.name)}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="mb-4">
                        <label htmlFor="meta_title">Meta title </label>
                        <input
                            defaultValue={postData?.meta_title}
                            name='meta_title'
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="meta_title"
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="meta_description">Meta description</label>
                        <textarea defaultValue={postData?.meta_description} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name="meta_description" id="meta_description" rows="3"></textarea>
                    </div>


                    <div className="flex justify-between">
                        <div></div>

                        <div>
                            {loading ? (
                                <Spinner />
                            ) : (
                                <SubmitButton />
                            )}
                        </div>
                    </div>


                </form>
            </div>


        </>
    );
};




export default PostEdit;
