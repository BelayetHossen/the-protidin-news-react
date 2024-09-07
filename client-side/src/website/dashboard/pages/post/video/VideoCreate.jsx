import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SiteContext } from '../../../../context/ContextProvider';
import CustomButton from '../../../shared/CustomButton';
import Spinner from '../../../shared/Spinner';
import SubmitButton from '../../../shared/SubmitButton';
import { Helmet } from 'react-helmet';

const VideoCreate = () => {
    const { MAIN_URL, loading, setLoading } = useContext(SiteContext);
    const navigate = useNavigate();
    const [errors, setErrors] = useState({
        title: '',
        link: '',
    });


    const submitTag = (e) => {
        e.preventDefault();
        setLoading(true);
        const title = e.target.title.value;
        const link = e.target.link.value;

        // Validation
        let formIsValid = true;
        const errorsCopy = { ...errors };

        if (title.trim() === '') {
            errorsCopy.title = 'The title is required!';
            formIsValid = false;
        } else {
            errorsCopy.title = '';
        }
        if (link.trim() === '') {
            errorsCopy.link = 'The link is required!';
            formIsValid = false;
        } else {
            errorsCopy.link = '';
        }


        setErrors(errorsCopy);

        // Create FormData object
        const formData = new FormData();
        formData.append('title', title);
        formData.append('link', link);

        // Proceed with form submission only if form is valid
        if (!formIsValid) {
            setLoading(false);
            return;
        }
        axios.post(`${MAIN_URL}/api/video/store`, formData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response?.data?.code === 200) {
                    toast.success(response?.data?.message);
                    navigate("/dashboard/video", { replace: true });
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
                <title>Create video | Dashboard</title>
            </Helmet>
            <div className="w-full max-w-md mx-auto bg-white shadow-md rounded px-4 pt-4 pb-4 mb-4">
                <div className="flex justify-between border-b-2 pb-4 mb-2">
                    <h3>Add new video</h3>

                    <div>
                        <CustomButton text="<< Back" path="/dashboard/video" />
                    </div>
                </div>
                <form onSubmit={submitTag}>
                    <div className="mb-4">
                        <label htmlFor="title">Title</label>
                        <input name='title'
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            placeholder="Enter title" />
                        {errors.title !== '' && <p className='text-red-600'>{errors.title}</p>}
                    </div>
                    <div className="mb-4">
                        <label htmlFor="link">Youtube link</label>
                        <input name='link'
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="link"
                            placeholder="Enter link" />
                        {errors.link !== '' && <p className='text-red-600'>{errors.link}</p>}
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

export default VideoCreate;
