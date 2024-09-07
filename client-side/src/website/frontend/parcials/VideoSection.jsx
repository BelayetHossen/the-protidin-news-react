import React, { useContext } from 'react';
import ReactPlayer from 'react-player';
import { SiteContext } from '../../context/ContextProvider';
import { Link } from 'react-router-dom';

const VideoSection = () => {
    const { MAIN_URL, homeVideos } = useContext(SiteContext);
    return (
        <>
            <section className='bg-[#191818] text-white px-3 pt-3 pb-12 my-2'>
                <div className='mb-2 gap-2 p-2 border-b-4 border-red-600 flex items-center justify-between'>
                    <div className='flex items-center gap-2 py-1'>
                        <h3 className='font-black text-xl'>ভিডিও</h3>
                        <i className="fa-solid fa-play text-red-600 text-2xl"></i>
                    </div>
                    <div className='hover:text-green-600'>
                        <Link to={`/videos`}>
                            আরও {">>"}
                        </Link>
                    </div>
                </div>
                <div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        {
                            homeVideos?.map((item, index) => (
                                <div key={item.id} className='px-2 py-4 my-3 shadow hover:shadow-lg'>
                                    <ReactPlayer
                                        className='react-player'
                                        url={item.link}
                                        width='100%'
                                        height='100%'
                                        controls={true}
                                    />
                                    <h4 className='font-black text-md py-2'>{item.title}</h4>
                                </div>

                            ))
                        }





                    </div>
                </div>
            </section>
        </>
    );
};

export default VideoSection;