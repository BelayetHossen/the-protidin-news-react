import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SiteContext } from '../../../../context/ContextProvider';
import CustomButton from '../../../shared/CustomButton';
import Spinner from '../../../shared/Spinner';
import SubmitButton from '../../../shared/SubmitButton';
import { Helmet } from 'react-helmet';

const CategoryEdit = () => {
    const { MAIN_URL, loading, setLoading, identity } = useContext(SiteContext);
    const [categoryData, setCategoryData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const [nameCheck, setNameCheck] = useState(null);
    const [errors, setErrors] = useState({
        name: ''
    });

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

    // Fetch category data by ID
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/category/get/${id}`)
            .then(response => {
                setCategoryData(response.data.category);
                setImage(MAIN_URL + "/images/categories/" + response.data.category?.photo);
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
        formData.append('old_photo', old_photo);
        formData.append('photo', profilePhoto);
        axios.post(`${MAIN_URL}/api/category/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                if (response?.data?.code === 201) {
                    toast.success(response?.data?.message);
                    navigate("/dashboard/post/category", { replace: true });
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
                <title>Edit Category | Dashboard</title>
            </Helmet>

            {/* <link rel="icon" type="image/svg+xml" href={MAIN_URL + "/images/identity/" + identity?.site_icon} /> */}
            {/* <link rel="canonical" href={MAIN_URL + "/images/identity/" + identity?.site_icon} /> */}

            <div className="w-full max-w-md mx-auto bg-white shadow-md rounded px-4 pt-4 pb-4 mb-4">
                <div className="flex justify-between border-b-2 pb-4 mb-2">
                    <h3 className='h4'>Edit category</h3>

                    <div>
                        <CustomButton text="<< Back" path="/dashboard/post/category" />
                    </div>
                </div>
                <form onSubmit={updateCategory}>
                    <div className="mb-4">
                        <input
                            defaultValue={categoryData?.name}
                            name='name'
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            placeholder="Enter category name"
                        />
                        {errors.name !== '' && <p className='text-danger'>{errors.name}</p>}
                        {nameCheck && <p className='text-danger'>{nameCheck}</p>}
                    </div>
                    <input defaultValue={categoryData?.id} name='id' type="hidden" />
                    <input
                        name='old_photo'
                        type="text"
                        className="hidden"
                        defaultValue={categoryData?.photo}
                    />
                    <div className="mb-4">
                        <label>Photo</label>
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



export default CategoryEdit;
