import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SiteContext } from '../../../../context/ContextProvider';
import CustomButton from '../../../shared/CustomButton';
import Spinner from '../../../shared/Spinner';
import SubmitButton from '../../../shared/SubmitButton';
import { Helmet } from 'react-helmet';

const SubSubCategoryEdit = () => {
    const { MAIN_URL, loading, setLoading } = useContext(SiteContext);
    const [categoryData, setCategoryData] = useState(null);
    const [categories, setCategories] = useState(null);
    const [subCategories, setSubCategories] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const [nameCheck, setNameCheck] = useState(null);
    const [errors, setErrors] = useState({
        name: '',
        category_id: '',
        sub_category_id: '',
    });




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
    // Fetch Categories all data
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

    // Fetch sub sub category data by ID
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/subsubcategory/get/${id}`)
            .then(response => {
                setCategoryData(response.data.subSubCategory);
                setImage(MAIN_URL + "/images/categories/" + response.data.subSubCategory?.photo);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching category data:', error);
                setLoading(false);
            });
    }, [id]);



    // update system
    const updateCategory = (e) => {
        e.preventDefault();
        const id = e.target.id.value;
        const name = e.target.name.value;
        const category_id = e.target.category_id.value;
        const sub_category_id = e.target.sub_category_id.value;
        const old_photo = e.target.old_photo.value;

        // Validation
        let formIsValid = true;
        const errorsCopy = { ...errors };

        if (name.trim() === '') {
            errorsCopy.name = 'The name is required!';
            formIsValid = false;
        } else {
            errorsCopy.name = '';
        }
        if (category_id.trim() === '') {
            errorsCopy.category_id = 'The main category is required!';
            formIsValid = false;
        } else {
            errorsCopy.category_id = '';
        }
        if (sub_category_id.trim() === '') {
            errorsCopy.sub_category_id = 'The sub category is required!';
            formIsValid = false;
        } else {
            errorsCopy.sub_category_id = '';
        }
        setErrors(errorsCopy);

        // Proceed with form submission only if form is valid
        if (!formIsValid) {
            setLoading(false);
            return;
        }
        // Create FormData object
        const formData = new FormData();
        formData.append('id', id);
        formData.append('name', name);
        formData.append('category_id', category_id);
        formData.append('sub_category_id', sub_category_id);
        formData.append('old_photo', old_photo);
        formData.append('photo', profilePhoto);
        axios.post(`${MAIN_URL}/api/subsubcategory/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                if (response?.data?.code === 201) {
                    toast.success(response?.data?.message);
                    navigate("/dashboard/post/subsubcategory", { replace: true });
                } else {
                    setNameCheck(response?.data?.message);
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
                <title>Edit sub sub Category | Dashboard</title>
            </Helmet>
            <div className="w-full max-w-md mx-auto bg-white shadow-md rounded px-4 pt-4 pb-4 mb-4">
                <div className="flex justify-between border-b-2 pb-4 mb-2">
                    <h3 className='h4'>New sub category</h3>

                    <div>
                        <CustomButton text="<< Back" path="/dashboard/post/subsubcategory" />
                    </div>
                </div>
                <form onSubmit={updateCategory}>
                    <div className="mb-4">
                        <label htmlFor="name">Sub Sub Category name</label>
                        <input
                            defaultValue={categoryData?.name}
                            name='name'
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            placeholder="Sub category name"
                        />
                        {errors.name !== '' && <p className='text-red-600'>{errors.name}</p>}
                        {nameCheck && <p className='text-red-600'>{nameCheck}</p>}
                    </div>
                    <input defaultValue={categoryData?.id} name='id' type="hidden" />
                    <input
                        name='old_photo'
                        type="hidden"
                        defaultValue={categoryData?.photo}
                    />
                    <div className="mb-4">
                        <label>Main category name</label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name='category_id'
                            onChange={(e) => categoryChange(e.target.value)}
                        >
                            <option value="">-Select-</option>
                            {categories?.map((item, index) => (
                                <option key={index} value={item.id} selected={categoryData?.category_id === item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {errors.category_id !== '' && <p className='text-danger'>{errors.category_id}</p>}

                    </div>
                    <div className="mb-4">
                        <label>Sub category name</label>
                        <select
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            name='sub_category_id'
                        >
                            <option value="">-Select-</option>
                            {subCategories?.map((item, index) => (
                                <option key={index} value={item.id} selected={categoryData?.sub_category_id == item.id}>
                                    {item.name}
                                </option>
                            ))}
                        </select>
                        {errors.sub_category_id !== '' && <p className='text-danger'>{errors.sub_category_id}</p>}
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
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 200x200px)</p>
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
                            <div className="row">
                                {image &&
                                    <div className="mb-3">
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



export default SubSubCategoryEdit;
