import { useContext, useState, useEffect } from 'react';
import { SiteContext } from '../../context/ContextProvider';
import DistrictSearch from './DistrictSearch';
import { Link } from 'react-router-dom';

const RightSideBar2 = () => {
    const { MAIN_URL, loading, setLoading, adbannerData } = useContext(SiteContext);
    return (
        <>
            <div className='flex flex-col gap-2 w-full md:w-3/12 lg:w-3/12'>
                {
                    adbannerData?.rightad1 &&
                    <Link to={JSON.parse(adbannerData?.rightad1)?.link} target='_blank'>
                        <img className="w-full" src={`${MAIN_URL + "/images/adbanner/" + JSON.parse(adbannerData?.rightad1)?.photo}`} alt="Logo" loading="lazy" />
                    </Link>
                }
                {
                    adbannerData?.rightad3 &&
                    <Link to={JSON.parse(adbannerData?.rightad3)?.link} target='_blank'>
                        <img className="w-full" src={`${MAIN_URL + "/images/adbanner/" + JSON.parse(adbannerData?.rightad3)?.photo}`} alt="Logo" loading="lazy" />
                    </Link>
                }
                {
                    adbannerData?.rightad5 &&
                    <Link to={JSON.parse(adbannerData?.rightad5)?.link} target='_blank'>
                        <img className="w-full" src={`${MAIN_URL + "/images/adbanner/" + JSON.parse(adbannerData?.rightad5)?.photo}`} alt="Logo" loading="lazy" />
                    </Link>
                }





                {/* Search option  */}
                {/* <DistrictSearch /> */}

                {
                    adbannerData?.rightad2 &&
                    <Link to={JSON.parse(adbannerData?.rightad2)?.link} target='_blank'>
                        <img className="w-full" src={`${MAIN_URL + "/images/adbanner/" + JSON.parse(adbannerData?.rightad2)?.photo}`} alt="Logo" loading="lazy" />
                    </Link>
                }
                {
                    adbannerData?.rightad4 &&
                    <Link to={JSON.parse(adbannerData?.rightad4)?.link} target='_blank'>
                        <img className="w-full" src={`${MAIN_URL + "/images/adbanner/" + JSON.parse(adbannerData?.rightad4)?.photo}`} alt="Logo" loading="lazy" />
                    </Link>
                }
                {
                    adbannerData?.rightad1 &&
                    <Link to={JSON.parse(adbannerData?.rightad1)?.link} target='_blank'>
                        <img className="w-full" src={`${MAIN_URL + "/images/adbanner/" + JSON.parse(adbannerData?.rightad1)?.photo}`} alt="Logo" loading="lazy" />
                    </Link>
                }
            </div>
        </>
    );
};

export default RightSideBar2;