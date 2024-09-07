import React, { useContext, useState } from 'react';
import { Helmet } from 'react-helmet';
import FrontLoader from '../parcials/FrontLoader';
import { SiteContext } from '../../context/ContextProvider';
import axios from 'axios';

const Contact = () => {
    const { MAIN_URL, information, loading, setLoading, identity } = useContext(SiteContext);
    const [success, setSuccess] = useState(null);
    const [warning, setWarning] = useState(null);





    const [errors, setErrors] = useState({
        email: '',
        subject: '',
        msg: '',
    });

    const submitMessage = (e) => {
        e.preventDefault();
        setLoading(true);
        const email = e.target.email.value;
        const subject = e.target.subject.value;
        const msg = e.target.msg.value;

        // Validation
        let formIsValid = true;
        const errorsCopy = { ...errors };

        if (email.trim() === '') {
            errorsCopy.email = 'The email is required!';
            formIsValid = false;
        } else {
            errorsCopy.title = '';
        }
        if (msg.trim() === '') {
            errorsCopy.msg = 'The msg is required!';
            formIsValid = false;
        } else {
            errorsCopy.msg = '';
        }


        setErrors(errorsCopy);

        // Create FormData object
        const formData = new FormData();
        formData.append('email', email);
        formData.append('subject', subject);
        formData.append('msg', msg);

        // Proceed with form submission only if form is valid
        if (!formIsValid) {
            setLoading(false);
            return;
        }
        axios.post(`${MAIN_URL}/api/message/store`, formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response?.data?.code === 200) {
                    setSuccess(response?.data?.message);
                }
                if (response?.data?.code === 400) {
                    setWarning(response?.data?.message);
                }
                setLoading(false);
            })
            .catch(error => {
                console.error(error);
                setLoading(false);
            });
    };



    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    return (
        <>
            <Helmet>
                <title>{"যোগাযোগ"} | {identity?.site_title || ""}</title>
            </Helmet>
            <div className='container mx-auto'>

                {
                    loading ?
                        <FrontLoader />
                        :
                        <>

                            <section className="py-5">
                                <div>
                                    <h2 className="my-4 h4 tracking-tight font-extrabold text-center text-gray-900 dark:text-white">যোগাযোগ ও অভিযোগ</h2>
                                </div>
                                <div className='flex flex-col md:flex-row items-center justify-between gap-8 px-3 mb-5'>
                                    <div className='w-full md:w-6/12'>
                                        <h4 className='h4 text-center'>হেডঅফিসঃ</h4>
                                        <h6 className='text-center h6'>
                                            {information?.address}
                                        </h6>
                                    </div>
                                    <div className="w-full md:w-6/12 bg-white p-4">

                                        {
                                            success ?
                                                <div className="p-4 my-8 text-sm text-red-800 rounded-lg bg-green-100  text-center" role="alert">
                                                    <span className="text-lg">{success}</span>
                                                </div> :
                                                <div>
                                                    {
                                                        warning ?
                                                            <div className="p-4 my-8 text-sm text-red-800 rounded-lg bg-red-100  text-center" role="alert">
                                                                <span className="text-lg">{warning}</span>
                                                            </div> :
                                                            <form onSubmit={submitMessage} className="space-y-4">
                                                                <div>
                                                                    <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">আপনার ইমেইল</label>
                                                                    <input name='email' type="email" id="email" className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required />
                                                                </div>
                                                                <div>
                                                                    <label for="subject" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">বিষয়</label>
                                                                    <input name='subject' type="text" id="subject" className="block p-3 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 shadow-sm focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light" required />
                                                                </div>
                                                                <div className="sm:col-span-2">
                                                                    <label for="message" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-400">অভিযোগ/পরামর্শ</label>
                                                                    <textarea name='msg' id="message" rows="6" className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg shadow-sm border border-gray-300 focus:ring-primary-500 focus:border-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"></textarea>
                                                                </div>
                                                                <div className="flex justify-between">
                                                                    <div></div>

                                                                    <div>
                                                                        {loading ? (
                                                                            <FrontLoader />
                                                                        ) : (
                                                                            <button type="submit" className="relative inline-block text-sm group float-right">
                                                                                <span className="relative z-10 block px-2 py-1 overflow-hidden font-medium leading-tight text-gray-800 transition-colors duration-300 ease-out border-2 border-gray-900 rounded-lg group-hover:text-white">
                                                                                    <span className="absolute inset-0 w-full h-full px-2 py-2 rounded-lg bg-gray-50"></span>
                                                                                    <span className="absolute left-0 w-48 h-48 -ml-2 transition-all duration-300 origin-top-right -rotate-90 -translate-x-full translate-y-12 bg-gray-900 group-hover:-rotate-180 ease"></span>
                                                                                    <span className="relative">
                                                                                        বার্তা পাঠান
                                                                                    </span>
                                                                                </span>
                                                                                <span className="absolute bottom-0 right-0 w-full h-8 -mb-1 -mr-1 transition-all duration-200 ease-linear bg-gray-900 rounded-lg group-hover:mb-0 group-hover:mr-0" data-rounded="rounded-lg"></span>
                                                                            </button>
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </form>
                                                    }
                                                </div>

                                        }


                                    </div>
                                </div>

                            </section>

                        </>
                }



            </div>
        </>
    );
};

export default Contact;