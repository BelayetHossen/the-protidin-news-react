import { useContext, useState, useEffect } from 'react';
import { SiteContext } from '../../../context/ContextProvider';
import Spinner from '../../shared/Spinner';
import SubmitButton from '../../shared/SubmitButton';
import CustomButton from '../../shared/CustomButton';
import axios from 'axios';

const Forgot = () => {
    const { MAIN_URL, loading, setLoading } = useContext(SiteContext);
    const [succMsg, setSuccMsg] = useState(null);
    const [errors, setErrors] = useState({
        identity: '',
        password: '',
    });
    useEffect(() => {
        setLoading(false);
    }, []);

    const submitForgot = (e) => {
        e.preventDefault();

        setLoading(true);
        const identity = e.target.identity.value;

        // Validation
        let formIsValid = true;
        const errorsCopy = { ...errors };
        if (identity.trim() === '') {
            errorsCopy.identity = 'The email is required!';
            formIsValid = false;
        } else {
            errorsCopy.identity = '';
        }

        setErrors(errorsCopy);
        const forgotData = {
            "identity": identity,
        };
        // Proceed with form submission only if form is valid
        if (!formIsValid) {
            setLoading(false);
            return;
        }
        axios.post(`${MAIN_URL}/api/admin/password/forgot`, forgotData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response?.data?.code === 201) {
                    setSuccMsg(response?.data?.message);
                }
                if (response?.data?.code === 401) {
                    errorsCopy.identity = response?.data?.message;
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
                    Put your registered email
                </h3>
                <form onSubmit={submitForgot}>
                    {
                        succMsg &&
                        <div className="p-4 mb-4 text-sm text-green-800 rounded-lg bg-green-200" role="alert">
                            <span className="font-medium">{succMsg}</span>
                        </div>
                    }

                    <div >
                        <input
                            name='identity'
                            type="text"
                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                            id="email"
                            placeholder="Email"
                        />
                        {errors.identity !== '' && <p className='text-red-600'>{errors.identity}</p>}
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
        </>
    );
};

export default Forgot;
