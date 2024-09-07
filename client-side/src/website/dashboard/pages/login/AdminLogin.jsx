import React, { useContext, useEffect, useState } from 'react';
import SubmitButton from '../../shared/SubmitButton';
import { SiteContext } from '../../../context/ContextProvider';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import Spinner from '../../shared/Spinner';
import { Link } from 'react-router-dom';

const AdminLogin = () => {
    const { MAIN_URL, loading, setLoading, loggedinAdmin } = useContext(SiteContext);
    const [showPassword, setShowPassword] = useState(false);
    const [isChecked, setIsChecked] = useState(true);
    const [saveloggedIn, setSaveLoggedIn] = useState(JSON.parse(localStorage.getItem('_loggedIn')));

    const handleCheckboxChange = (event) => {
        setIsChecked(event.target.checked);
    };
    const [errors, setErrors] = useState({
        identity: '',
        password: '',
    });
    useEffect(() => {
        setLoading(false);
    }, []);

    if (loggedinAdmin) {
        toast.warning("You are already loggedIn");
        window.location.href = '/dashboard';
    }

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };


    // login system
    const submitLogin = (e) => {
        e.preventDefault();

        setLoading(true);
        const identity = e.target.identity.value;
        const password = e.target.password.value;

        // Validation
        let formIsValid = true;
        const errorsCopy = { ...errors };
        if (identity.trim() === '') {
            errorsCopy.identity = 'The email/phone/username is required!';
            formIsValid = false;
        } else {
            errorsCopy.identity = '';
        }

        if (password.trim() === '') {
            errorsCopy.password = 'The password is required!';
            formIsValid = false;
        } else {
            errorsCopy.password = '';
        }
        setErrors(errorsCopy);
        const loginData = {
            "identity": identity,
            "password": password,
        };
        // Proceed with form submission only if form is valid
        if (!formIsValid) {
            setLoading(false);
            return;
        }
        axios.post(`${MAIN_URL}/api/admin/login`, loginData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response?.data?.code === 421) {
                    errorsCopy.identity = response?.data?.message;
                }
                if (response?.data?.code === 201) {
                    toast.success(response?.data?.massage);
                    localStorage.setItem('_token', response?.data?.token);
                    if (isChecked) {
                        localStorage.setItem('_loggedIn', JSON.stringify({ "identity": identity, "password": password }));
                    }
                    window.location.href = '/dashboard';
                }
                if (response?.data?.code === 422) {
                    errorsCopy.password = response?.data?.message;
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
            <ToastContainer />
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Sign in to your account
                </h3>
                <form className="space-y-4 md:space-y-6 py-4" onSubmit={submitLogin}>
                    <div>
                        <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Your email</label>
                        <input
                            name='identity'
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            id="email"
                            placeholder="Email/phone/username"
                            defaultValue={saveloggedIn?.identity}
                        />
                        {errors.identity !== '' && <p className='text-red-600'>{errors.identity}</p>}
                    </div>
                    <div>
                        <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                        <div className='relative w-100'>
                            <input
                                name='password'
                                type={showPassword ? 'text' : 'password'}
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                                id="password"
                                placeholder="Enter password"
                                defaultValue={saveloggedIn?.password}
                            />
                            <div style={{ top: '5px', right: '0', marginTop: '6px' }} className='absolute mr-2 text-gray-800' onClick={togglePasswordVisibility}>
                                {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
                            </div>
                        </div>

                        {errors.password !== '' && <p className='text-red-600'>{errors.password}</p>}
                    </div>
                    <div className="flex items-center justify-between">
                        <div className="flex items-start">

                            <div className="flex items-center h-5">
                                <input name='remember' type="checkbox" id="remember" onChange={handleCheckboxChange} checked={isChecked} className='w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300' />
                            </div>
                            <div className="ml-3 text-sm">
                                <label htmlFor="remember" className='text-gray-500'>
                                    Remember Me
                                </label>
                            </div>
                        </div>
                        <Link to={'/admin/password/forgot'} className="text-sm font-medium text-red-600 hover:underline">I forgot my password</Link>
                    </div>
                    <div className="mb-4">
                        {loading ? (
                            <Spinner />
                        ) : (
                            <SubmitButton />
                        )}
                    </div>
                </form>

            </div>
        </>
    );
};

export default AdminLogin;