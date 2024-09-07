import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SiteContext } from '../../../context/ContextProvider';
import Spinner from '../../shared/Spinner';
import CustomButton from '../../shared/CustomButton';
import SubmitButton from '../../shared/SubmitButton';

const ResetPassword = () => {
    const { MAIN_URL, loading, setLoading } = useContext(SiteContext);
    const [warningMsg, setWarningMsg] = useState(null);
    const [successMsg, setSuccessMsg] = useState(null);
    const [errors, setErrors] = useState({
        password: '',
    });
    const { token, email } = useParams();
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(3);
    useEffect(() => {
        if (countdown === 0) {
            navigate('/admin/login');
        }
    }, [countdown, navigate]);
    useEffect(() => {
        setLoading(false);
    }, []);

    const submitUpdatePasssword = (e) => {
        e.preventDefault();

        setLoading(true);
        const password = e.target.password.value;

        // Validation
        let formIsValid = true;
        const errorsCopy = { ...errors };
        if (password.trim() === '') {
            errorsCopy.password = 'The password is required!';
            formIsValid = false;
        } else {
            errorsCopy.password = '';
        }

        setErrors(errorsCopy);
        const forgotData = {
            "password": password,
            "email": email,
            "token": token,
        };
        // Proceed with form submission only if form is valid
        if (!formIsValid) {
            setLoading(false);
            return;
        }
        axios.post(`${MAIN_URL}/api/admin/password/update`, forgotData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                console.log(response);
                if (response?.data?.code === 401) {
                    setWarningMsg(response?.data?.message);
                }
                if (response?.data?.code === 201) {
                    toast.success(response?.data?.massage);
                    setSuccessMsg(response?.data?.message);
                    const interval = setInterval(() => {
                        setCountdown(prevCountdown => prevCountdown - 1);
                    }, 1000);
                    return () => clearTimeout(timeout);
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

            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                <h3 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Set new password
                </h3>
                <form onSubmit={submitUpdatePasssword}>
                    {
                        successMsg &&
                        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-200" role="alert">
                            <span className="font-medium">{successMsg}</span>
                        </div>
                    }
                    {
                        warningMsg &&
                        <div className="p-4 mb-4 text-sm text-orange-800 rounded-lg bg-green-200" role="alert">
                            <span className="font-medium">{warningMsg}</span>
                        </div>
                    }

                    <div >
                        <input
                            name='password'
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            id="password"
                            placeholder="Password"
                        />
                        {errors.password !== '' && <p className='text-red-600'>{errors.password}</p>}
                    </div>


                    <div className="flex justify-between items-center mt-4">
                        <div className="">
                            <CustomButton text="<< Back" path="/admin" />
                        </div>
                        <div className="">
                            {loading ? (
                                <Spinner />
                            ) : (
                                <SubmitButton />
                            )}
                        </div>
                    </div>
                </form>


            </div>



            {/* <div className="login-logo">
                <a><b>Reset</b>password</a>
            </div>
            <div className="card">
                <div className="card-body login-card-body">
                    {successMsg ? <div className="alert alert-success" role="alert">
                        {successMsg}
                        <p>Redirecting in {countdown} seconds...</p>
                    </div> : <p className="login-box-msg">Put a new password</p>}

                    {warningMsg && <div className="alert alert-warning" role="alert">
                        {warningMsg}
                    </div>}
                    <form onSubmit={submitUpdatePasssword}>
                        <div className="form-group">
                            <input
                                name='password'
                                type="text"
                                className="form-control"
                                id="password"
                                placeholder="Password"
                            />
                            {errors.password !== '' && <p className='text-danger'>{errors.password}</p>}
                        </div>


                        <div className="row d-flex justify-content-between align-items-center">
                            <div className="">
                                <div className="icheck-primary">
                                    <span type="submit"></span>
                                </div>
                            </div>
                            <div className="">
                                {loading ? (
                                    <Spinner />
                                ) : (
                                    <button type="submit" className="btn btn-primary">Reset</button>
                                )}
                            </div>
                        </div>
                    </form>
                </div>
            </div> */}
        </>
    );
};

export default ResetPassword;
