import React, { useContext, useEffect, useRef, useState } from 'react';
import { SiteContext } from '../../../context/ContextProvider';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import JoditEditor from 'jodit-react';
import Spinner from '../../shared/Spinner';
import SubmitButton from '../../shared/SubmitButton';
import { toast } from 'react-toastify';

const Terms = () => {
    const { MAIN_URL, loading, setLoading } = useContext(SiteContext);
    const [page, setPage] = useState(null);


    const editor = useRef(null);
    const [bodyContent, setBodyContent] = useState("");
    console.log(bodyContent);
    // Fetch page
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/page/get/terms`)
            .then(response => {
                setPage(response.data.terms);
                setBodyContent(response.data.terms?.content);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tag data:', error);
                setLoading(false);
            });
    }, ['terms']);

    // update system
    const submitPost = (e) => {
        e.preventDefault();
        setLoading(true);
        // Create FormData object
        const formData = new FormData();
        formData.append('content', bodyContent);


        axios.post(`${MAIN_URL}/api/page/terms/update`, formData, {
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

    // Fetch page
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/page/get/${'privacy'}`)
            .then(response => {
                setPage(response.data.page);
                setBodyContent(response.data.page?.content);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tag data:', error);
                setLoading(false);
            });
    }, []);


    return (
        <>
            <Helmet>
                <title>Terms & conditions| Dashboard</title>
            </Helmet>
            <div className="w-full mx-auto bg-white shadow-md rounded px-4 pt-4 pb-4 mb-4">
                <div className="flex justify-between border-b-2 pb-4 mb-2">
                    <h3 className='h4'>Edit Terms & conditions</h3>
                </div>


                <form onSubmit={submitPost}>

                    <div className="mb-4">
                        <JoditEditor
                            ref={editor}
                            value={bodyContent}
                            onChange={newContent => setBodyContent(newContent)}
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

export default Terms;