import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SiteContext } from '../../../../context/ContextProvider';
import CustomButton from '../../../shared/CustomButton';
import Spinner from '../../../shared/Spinner';
import SubmitButton from '../../../shared/SubmitButton';
import { Helmet } from 'react-helmet';

const TagEdit = () => {
    const { MAIN_URL, loading, setLoading } = useContext(SiteContext);
    const [permissionData, setPermissionData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();


    const [nameCheck, setNameCheck] = useState(null);
    const [errors, setErrors] = useState({
        name: ''
    });

    // Fetch tag data by ID
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/tag/get/${id}`)
            .then(response => {
                setPermissionData(response.data.tag);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching tag data:', error);
                setLoading(false);
            });
    }, [id]);



    // Tag update system
    const updateTag = (e) => {
        e.preventDefault();
        const id = e.target.id.value;
        const name = e.target.name.value;
        if (name === '') {
            setErrors({
                ...errors,
                name: 'The name is required!'
            });
        } else {
            setErrors({
                ...errors,
                name: ''
            });
        }
        const tagData = {
            "id": id,
            "name": name
        };
        axios.put(`${MAIN_URL}/api/tag/update`, tagData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response?.data?.code === 200) {
                    toast.success(response?.data?.massage);
                    navigate("/dashboard/post/tag", { replace: true });
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
                <title>Edit Tag | Dashboard</title>
            </Helmet>
            <div className="w-full max-w-md mx-auto bg-white shadow-md rounded px-4 pt-4 pb-4 mb-4">
                <div className="flex justify-between border-b-2 pb-4 mb-2">
                    <h3 className='h4'>Tag edit</h3>

                    <div>
                        <CustomButton text="<< Back" path="/dashboard/post/tag" />
                    </div>
                </div>
                <form onSubmit={updateTag}>
                    <div className="mb-4">
                        <input
                            defaultValue={permissionData?.name}
                            name='name'
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            placeholder="Enter tag name"
                        />
                        {errors.name !== '' && <p className='text-red-600'>{errors.name}</p>}
                        {nameCheck && <p className='text-red-600'>{nameCheck}</p>}
                    </div>
                    <input defaultValue={permissionData?.id} name='id' type="hidden" />


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



export default TagEdit;
