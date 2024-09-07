import React, { useContext } from 'react';
import { Helmet } from 'react-helmet';
import { SiteContext } from '../../../context/ContextProvider';
import axios from 'axios';
import { toast } from 'react-toastify';
import Spinner from '../../shared/Spinner';
import SubmitButton from '../../shared/SubmitButton';

const Info = () => {
    const { MAIN_URL, loading, setLoading, information } = useContext(SiteContext);

    // create system
    const submitCategory = (e) => {
        e.preventDefault();
        setLoading(true);
        const editor = e.target.editor.value;
        const advisory_editor = e.target.advisory_editor.value;
        const publisher = e.target.publisher.value;
        const address = e.target.address.value;
        const facebook = e.target.facebook.value;
        const instagram = e.target.instagram.value;
        const youtube = e.target.youtube.value;

        // Create FormData object
        const formData = new FormData();
        formData.append('editor', editor);
        formData.append('advisory_editor', advisory_editor);
        formData.append('publisher', publisher);
        formData.append('address', address);
        formData.append('facebook', facebook);
        formData.append('instagram', instagram);
        formData.append('youtube', youtube);


        axios.post(`${MAIN_URL}/api/setting/information`, formData, {
            headers: {
                'Content-Type': 'application/json',
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
                <title>Site info | Dashboard</title>
            </Helmet>
            <div className="w-full max-w-md mx-auto bg-white shadow-md rounded px-4 pt-4 pb-4 mb-4">
                <div className="flex justify-between border-b-2 pb-4 mb-2">
                    <h3 className='h4'>Site information</h3>
                </div>
                <form onSubmit={submitCategory}>
                    <div className="mb-4">
                        <label>Editor name</label>
                        <input
                            defaultValue={information?.editor}
                            name='editor'
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter editor name"
                        />

                    </div>
                    <div className="mb-4">
                        <label>Advisory Editor name</label>
                        <input
                            defaultValue={information?.advisory_editor}
                            name='advisory_editor'
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter advisory editor name"
                        />
                    </div>
                    <div className="mb-4">
                        <label>Publisher name</label>
                        <input
                            defaultValue={information?.publisher}
                            name='publisher'
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="Enter publisher name"
                        />
                    </div>
                    <div className="mb-4">
                        <label>Office address</label>
                        <textarea defaultValue={information?.address} name="address" id="" rows="5" className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'></textarea>
                    </div>
                    <div className="mb-4">
                        <label>Facebook</label>
                        <input
                            defaultValue={information?.facebook}
                            name='facebook'
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="https://facebook.com"
                        />
                    </div>
                    <div className="mb-4">
                        <label>Instagram</label>
                        <input
                            defaultValue={information?.instagram}
                            name='instagram'
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="https://instagram.com"
                        />
                    </div>
                    <div className="mb-4">
                        <label>Youtube</label>
                        <input
                            defaultValue={information?.youtube}
                            name='youtube'
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            placeholder="https://youtube.com"
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

export default Info;