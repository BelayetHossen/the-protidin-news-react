import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { Helmet } from 'react-helmet';
import { SiteContext } from '../../../context/ContextProvider';
import Spinner from '../../shared/Spinner';
import SubmitButton from '../../shared/SubmitButton';

const Rightad4 = () => {
    const { MAIN_URL, loading, setLoading, adbannerData } = useContext(SiteContext);



    const [rightad4, setrightad4] = useState(null);
    const [rightad4Photo, setrightad4Photo] = useState(null);
    const handlerightad4Change = (e) => {
        const selectedrightad4 = e.target.files[0];
        if (selectedrightad4) {
            setrightad4(URL.createObjectURL(selectedrightad4));
            setrightad4Photo(selectedrightad4);
        }
    };
    const handleRemoverightad4 = () => {
        setrightad4(null);
    };
    const handlerightad4DragOver = (e) => {
        e.preventDefault();
    };
    const handlerightad4Drop = (e) => {
        e.preventDefault();
        const selectedrightad4 = e.dataTransfer.files[0];
        if (selectedrightad4) {
            setrightad4(URL.createObjectURL(selectedrightad4));
            setrightad4Photo(selectedrightad4);
        }
    };







    // Fetch AdBanner
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/setting/adbanner`)
            .then(response => {
                setrightad4(MAIN_URL + "/images/adbanner/" + JSON.parse(response.data.adbanner?.rightad4)?.photo);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tag data:', error);
                setLoading(false);
            });
    }, []);



    // create system
    const submitAdBanner = (e) => {
        e.preventDefault();
        setLoading(true);
        const link = e.target.link.value;
        const old_photo = e.target.old_photo.value;
        // Create FormData object
        const formData = new FormData();
        formData.append('rightad4', rightad4Photo);
        formData.append('old_photo', old_photo);
        formData.append('link', link);


        axios.post(`${MAIN_URL}/api/setting/adbanner/${'rightad4'}`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                if (response?.data?.code === 201) {
                    toast.success(response?.data?.message);
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
                <title>Right ad 4 | Dashboard</title>
            </Helmet>
            <div className="w-full max-w-md mx-auto bg-white shadow-md rounded px-4 pt-4 pb-4 mb-4">
                <div className="flex justify-between border-b-2 pb-4 mb-2">
                    <h3 className='h4'>Right ad 4</h3>
                </div>
                <form onSubmit={submitAdBanner}>
                    <input name='old_photo' type="hidden" defaultValue={adbannerData?.rightad4 && JSON.parse(adbannerData?.rightad4)?.photo} />
                    <div className="mb-4">
                        <label>Right ad 4</label>
                        {
                            !rightad4 && <>
                                <div className="flex items-center justify-center w-full">
                                    <label onDrop={handlerightad4Drop}
                                        onDragOver={handlerightad4DragOver}
                                        htmlFor="fileInput" className="flex flex-col items-center justify-center w-full h-32 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer bg-gray-50 dark:hover:bg-bray-800 dark:bg-gray-700 hover:bg-gray-100 dark:border-gray-600 dark:hover:border-gray-500 dark:hover:bg-gray-600">
                                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                            <svg className="w-8 h-8 mb-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                                                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                                            </svg>
                                            <p className="mb-2 text-sm text-gray-500 dark:text-gray-400"><span className="font-semibold">Click to upload</span> or drag and drop</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">SVG, PNG, JPG or GIF (600x600px)</p>
                                        </div>
                                        <input name='photo'
                                            id="fileInput"
                                            type="file"
                                            accept="image/*"
                                            onChange={handlerightad4Change} className="hidden" />
                                    </label>
                                </div>
                            </>
                        }

                        <div className="mt-3 relative">
                            <div className="row">
                                {rightad4 &&
                                    <div className="mb-3">
                                        <img src={rightad4} alt={`Preview `} className="w-100" />
                                        <button
                                            style={{ top: '0', right: '0' }}
                                            className="mt-2 absolute mr-4"
                                            onClick={handleRemoverightad4}
                                        >
                                            <i className="fas fa-times-circle text-red-600"></i>
                                        </button>
                                    </div>
                                }
                            </div>

                        </div>
                    </div>

                    <div className="mb-4">
                        <label>Link</label>
                        <input
                            defaultValue={adbannerData?.rightad4 && JSON.parse(adbannerData?.rightad4)?.link}
                            name='link'
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="https://example.com"
                        />
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


export default Rightad4;