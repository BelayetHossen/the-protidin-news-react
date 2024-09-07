import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SiteContext } from '../../../../context/ContextProvider';
import CustomButton from '../../../shared/CustomButton';
import Spinner from '../../../shared/Spinner';
import SubmitButton from '../../../shared/SubmitButton';
import { Helmet } from 'react-helmet';

const VideoEdit = () => {
    const { MAIN_URL, loading, setLoading } = useContext(SiteContext);
    const [videoData, setPermissionData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();


    const [errors, setErrors] = useState({
        title: '',
        link: ''
    });

    // Fetch tag data by ID
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/video/get/${id}`)
            .then(response => {
                setPermissionData(response.data.video);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tag data:', error);
                setLoading(false);
            });
    }, [id]);



    // Tag update system
    const updateVideo = (e) => {
        e.preventDefault();
        const id = e.target.id.value;
        const title = e.target.title.value;
        const link = e.target.link.value;
        if (title === '') {
            setErrors({
                ...errors,
                title: 'The title is required!'
            });
        } else {
            setErrors({
                ...errors,
                title: ''
            });
        }
        if (link === '') {
            setErrors({
                ...errors,
                link: 'The link is required!'
            });
        } else {
            setErrors({
                ...errors,
                link: ''
            });
        }
        const tagData = {
            "id": id,
            "title": title,
            "link": link,
        };
        axios.post(`${MAIN_URL}/api/video/update`, tagData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response?.data?.code === 200) {
                    toast.success(response?.data?.massage);
                    navigate("/dashboard/video", { replace: true });
                } else {
                    setNameCheck(response?.data?.massage);
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
                <title>Edit Video | Dashboard</title>
            </Helmet>
            <div className="w-full max-w-md mx-auto bg-white shadow-md rounded px-4 pt-4 pb-4 mb-4">
                <div className="flex justify-between border-b-2 pb-4 mb-2">
                    <h3 className='h4'>Video edit</h3>

                    <div>
                        <CustomButton text="<< Back" path="/dashboard/post/tag" />
                    </div>
                </div>
                <form onSubmit={updateVideo}>
                    <div className="mb-4">
                        <label htmlFor="title">Title</label>
                        <input name='title'
                            defaultValue={videoData?.title}
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="title"
                            placeholder="Enter title" />
                        {errors.title !== '' && <p className='text-red-600'>{errors.title}</p>}
                    </div>
                    <input name='id'
                        defaultValue={videoData?.id}
                        type="hidden"
                    />
                    <div className="mb-4">
                        <label htmlFor="link">Youtube link</label>
                        <input name='link'
                            defaultValue={videoData?.link}
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



export default VideoEdit;
