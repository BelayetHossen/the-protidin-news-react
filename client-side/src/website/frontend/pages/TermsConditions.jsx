import React, { useContext, useEffect, useState } from 'react';
import { Helmet } from 'react-helmet';
import { SiteContext } from '../../context/ContextProvider';
import FrontLoader from '../parcials/FrontLoader';
import axios from 'axios';

const TermsConditions = () => {
    const { MAIN_URL, removeHtmlTags, loading, setLoading, identity } = useContext(SiteContext);
    const [terms, setTerms] = useState(null);

    // Fetch page
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/page/get/terms`)
            .then(response => {
                setTerms(response.data.terms);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tag data:', error);
                setLoading(false);
            });
    }, ['terms']);

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

    return (
        <>
            <Helmet>
                <title>{"শর্তাবলী ও নীতিমালা"} | {identity?.site_title || ""}</title>
            </Helmet>
            <div className='container mx-auto'>

                {
                    loading ?
                        <FrontLoader />
                        :
                        <>

                            <section className='my-8'>
                                <div className=''>
                                    <h3 className='text-black h4 text-center my-4'>শর্তাবলী ও নীতিমালা</h3>
                                </div>
                                <div className='w-full'>
                                    <div className='flex flex-col md:flex-row gap-3 '>
                                        {removeHtmlTags(terms?.content)}
                                    </div>
                                </div>

                            </section>





                        </>
                }



            </div>
        </>
    );
};


export default TermsConditions;