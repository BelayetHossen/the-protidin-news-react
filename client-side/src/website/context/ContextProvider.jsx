import axios from "axios";
import { createContext, useState, useEffect } from "react";
export const SiteContext = createContext();
// const MAIN_URL = "http://127.0.0.1:8000";
const MAIN_URL = "https://datab.theprotidin.com";
const permissions = ["Dashboard", "Admins", "Settings", "Posts", "Pages", "Message"];


const ContextProvider = ({ children }) => {
    const [loading, setLoading] = useState(true);
    const [loggedinAdmin, setLoggedinAdmin] = useState(null);
    const token = localStorage.getItem('_token');
    const [allPosts, setAllPosts] = useState(null);
    const [activePosts, setActivePosts] = useState(null);
    const [inactivePosts, setInactivePosts] = useState(null);
    const [categories, setCategories] = useState(null);
    const [latestOne, setLatestOne] = useState(null);
    const [nextFourPost, setNextFourPost] = useState([]);
    const [nextSixPost, setNextSixPost] = useState([]);
    const [popularFourPosts, setPopularFourPosts] = useState([]);
    const [isHeadline, setIsHeadline] = useState([]);
    const [homeVideos, setHomeVideos] = useState([]);
    const [allVideos, setAllVideos] = useState([]);
    const [identity, setIdentity] = useState(null);
    const [information, setInformation] = useState(null);
    const [admins, setAdmins] = useState(null);


    // Fatch loggedIn admin
    useEffect(() => {
        const fetchAdmin = async () => {
            const token = localStorage.getItem('_token');
            if (token) {
                try {
                    const headers = {
                        Authorization: `Bearer ${token}`
                    };
                    const response = await axios.get(`${MAIN_URL}/api/admin/loggedin`, { headers });
                    setLoggedinAdmin(response?.data?.admin);
                    setLoading(false);
                } catch (error) {
                    console.error('Error fetching admin:', error);
                    setLoading(false);
                } finally {
                    setLoading(false);
                }
                setLoading(false);
            }
        };
        fetchAdmin();
    }, []);

    // remove html tag
    const removeHtmlTags = (htmlString) => {
        if (htmlString) {
            const regex = /(<([^>]+)>)/gi;
            return htmlString.replace(regex, '');
        } else {
            return '';
        }
    };



    // Fetch home post
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/home/post`)
            .then(response => {
                setAllPosts(response.data.allPosts);
                setActivePosts(response.data.activePosts);
                setInactivePosts(response.data.inactivePosts);
                setCategories(response.data.Categories);
                setLatestOne(response.data.latestOne);
                setNextFourPost(response.data.nextFourPosts);
                setNextSixPost(response.data.nextSixPosts);
                setPopularFourPosts(response.data.popularFourPosts);
                setIsHeadline(response.data.isHeadline);
                setHomeVideos(response.data.homeVideos);
                setAllVideos(response.data.allVideos);
                setAdmins(response.data.admins);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching permission data:', error);
                setLoading(false);
            });
    }, []);

    // increase populer post count by click user
    const handlePopulerClick = async (id) => {
        try {
            const response = await axios.get(`${MAIN_URL}/api/posts/${id}/click`);
        } catch (error) {
            console.error('Error incrementing popular count:', error);
        }
    };

    // Fetch identity
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/setting/identity`)
            .then(response => {
                setIdentity(response.data.identity);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tag data:', error);
                setLoading(false);
            });
    }, []);

    // Fetch Information
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/setting/information`)
            .then(response => {
                setInformation(response.data.information);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tag data:', error);
                setLoading(false);
            });
    }, []);

    const [adbannerData, setAdbannerData] = useState(null);

    // Fetch AdBanner
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/setting/adbanner`)
            .then(response => {
                const adData = typeof response.data.adbanner === 'string'
                    ? JSON.parse(response.data.adbanner)
                    : response.data.adbanner;
                setAdbannerData(adData);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tag data:', error);
                setLoading(false);
            });
    }, []);





    const authInfo = {
        MAIN_URL,
        loading,
        setLoading,
        loggedinAdmin,
        token,
        removeHtmlTags,
        allPosts,
        activePosts,
        inactivePosts,
        categories,
        latestOne,
        nextFourPost,
        nextSixPost,
        popularFourPosts,
        isHeadline,
        homeVideos,
        allVideos,
        handlePopulerClick,
        permissions,
        identity,
        information,
        adbannerData,
        admins
    };

    return (
        <SiteContext.Provider value={authInfo}>{children}</SiteContext.Provider>
    );
};

export default ContextProvider;
