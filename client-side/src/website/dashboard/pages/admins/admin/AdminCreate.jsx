import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SiteContext } from '../../../../context/ContextProvider';
import Spinner from '../../../shared/Spinner';
import SubmitButton from '../../../shared/SubmitButton';
import CustomButton from '../../../shared/CustomButton';
import { Helmet } from 'react-helmet';





const AdminCreate = () => {
    const { MAIN_URL, loading, setLoading } = useContext(SiteContext);
    const [roleData, setRoleData] = useState(null);
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();


    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    // Fetch role all data
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/roles/all`)
            .then(response => {
                setRoleData(response.data.roles);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching role data:', error);
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

    const [errors, setErrors] = useState({
        fname: '',
        lname: '',
        email: '',
        phone: '',
        username: '',
        password: '',
        gender: '',
        role: '',
    });

    // create system
    const submitAdmin = (e) => {
        e.preventDefault();
        setLoading(true);
        const fname = e.target.fname.value;
        const lname = e.target.lname.value;
        const email = e.target.email.value;
        const phone = e.target.phone.value;
        const username = e.target.username.value;
        const password = e.target.password.value;
        const gender = e.target.gender.value;
        const role = e.target.role.value;

        // Validation
        let formIsValid = true;
        const errorsCopy = { ...errors };
        const isValidEmail = /[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+[.]{1}[a-zA-Z]{2,}$/;
        const isValidPhone = /(^([+]{1}[8]{2}|0088)?(01){1}[3-9]{1}\d{8})$/;

        if (fname.trim() === '') {
            errorsCopy.fname = 'The first name is required!';
            formIsValid = false;
        } else {
            errorsCopy.fname = '';
        }

        if (lname.trim() === '') {
            errorsCopy.lname = 'The last name is required!';
            formIsValid = false;
        } else {
            errorsCopy.lname = '';
        }
        if (email.trim() === '') {
            errorsCopy.email = 'The email is required!';
            formIsValid = false;
        } else {
            errorsCopy.email = '';
        }
        if (email && email.match(isValidEmail)) {
            errorsCopy.email = '';
        } else {
            errorsCopy.email = 'The email is not valid!';
            formIsValid = false;
        }

        if (phone.trim() === '') {
            errorsCopy.phone = 'The phone is required!';
            formIsValid = false;
        } else {
            errorsCopy.phone = '';
        }
        if (phone && phone.match(isValidPhone)) {
            errorsCopy.phone = '';
        } else {
            errorsCopy.phone = 'The phone is not valid!';
            formIsValid = false;
        }

        if (username.trim() === '') {
            errorsCopy.username = 'The username is required!';
            formIsValid = false;
        } else {
            errorsCopy.username = '';
        }

        if (password.trim() === '') {
            errorsCopy.password = 'The password is required!';
            formIsValid = false;
        } else {
            errorsCopy.password = '';
        }


        setErrors(errorsCopy);

        // Create FormData object
        const formData = new FormData();
        formData.append('fname', fname);
        formData.append('lname', lname);
        formData.append('email', email);
        formData.append('phone', phone);
        formData.append('username', username);
        formData.append('password', password);
        formData.append('gender', gender);
        formData.append('role', role);
        formData.append('photo', profilePhoto);

        // Proceed with form submission only if form is valid
        if (!formIsValid) {
            setLoading(false);
            return;
        }
        axios.post(`${MAIN_URL}/api/admin/store`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                if (response?.data?.code === 422) {
                    errorsCopy.email = response?.data?.massage;
                }
                if (response?.data?.code === 423) {
                    errorsCopy.phone = response?.data?.massage;
                }
                if (response?.data?.code === 424) {
                    errorsCopy.username = response?.data?.massage;
                }
                if (response?.data?.code === 200) {
                    toast.success(response?.data?.massage);
                    navigate("/dashboard/admin", { replace: true });
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
                <title>Create admin | Dashboard</title>
            </Helmet>
            <div className="w-full max-w-md mx-auto bg-white shadow-md rounded px-4 pt-4 pb-4 mb-4">
                <div className="flex justify-between border-b-2 pb-4 mb-2">
                    <h3>Add new admin</h3>

                    <div>
                        <CustomButton text="<< Back" path="/dashboard/admin" />
                    </div>
                </div>
                <form onSubmit={submitAdmin}>
                    <div className="mb-4">
                        <label htmlFor="fname">First name</label>
                        <input
                            name='fname'
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="fname"
                            placeholder="Enter first name"
                        />
                        {errors.fname !== '' && <p className='text-red-600'>{errors.fname}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="lname">Last name</label>
                        <input
                            name='lname'
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="lname"
                            placeholder="Enter last name"
                        />
                        {errors.lname !== '' && <p className='text-red-600'>{errors.lname}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email">Email</label>
                        <input
                            name='email'
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="email"
                            placeholder="Enter email"
                        />
                        {errors.email !== '' && <p className='text-red-600'>{errors.email}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone">Phone</label>
                        <input
                            name='phone'
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="phone"
                            placeholder="Enter phone"
                        />
                        {errors.phone !== '' && <p className='text-red-600'>{errors.phone}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="username">Username</label>
                        <input
                            name='username'
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="username"
                            placeholder="Enter username"
                        />
                        {errors.username !== '' && <p className='text-red-600'>{errors.username}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="password">Password</label>
                        <div className='relative'>
                            <input
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                id="password"
                                placeholder="Enter password"
                            />
                            <div style={{ top: '0', right: '0', marginTop: '6px' }} className='absolute mr-2' onClick={togglePasswordVisibility}>
                                {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                            </div>
                        </div>
                        {errors.password !== '' && <p className='text-red-600'>{errors.password}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="phone">Gender</label>
                        <select className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" name='gender'>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Others">Others</option>
                        </select>
                    </div>
                    <div className="mb-4">
                        <label>Role</label>
                        {
                            roleData && (
                                <select
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    name='role'
                                >
                                    {roleData?.map((item, index) => (
                                        <option key={index} value={item.id}>
                                            {item.name}
                                        </option>
                                    ))}
                                </select>
                            )
                        }
                    </div>

                    <div className="mb-4">
                        <label>Profile photo</label>
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
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (MAX. 800x400px)</p>
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


export default AdminCreate;
