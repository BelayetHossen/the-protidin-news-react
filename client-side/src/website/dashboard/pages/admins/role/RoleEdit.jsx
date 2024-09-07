import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';
import SubmitButton from '../../../shared/SubmitButton';
import Spinner from '../../../shared/Spinner';
import { SiteContext } from '../../../../context/ContextProvider';
import CustomButton from '../../../shared/CustomButton';
import { Helmet } from 'react-helmet';

const RoleEdit = () => {
    const { MAIN_URL, loading, setLoading, permissions } = useContext(SiteContext);
    const [findRole, setFindRole] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const [nameCheck, setNameCheck] = useState(null);
    const [errors, setErrors] = useState({
        name: ''
    });

    // Permission select
    const [selectedPermissions, setSelectedPermissions] = useState([]);
    const handlePermissionChange = (e) => {
        const { checked, value } = e.target;
        setSelectedPermissions(prevPermissions =>
            checked
                ? [...prevPermissions, value]
                : prevPermissions.filter(permission => permission !== value)
        );
    };

    // Fetch role data by id
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/role/get/${id}`)
            .then(response => {
                setFindRole(response.data.role);
                setSelectedPermissions(JSON.parse(response.data.role.permissions) || null);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching permission data:', error);
                setLoading(false);
            });
    }, [id]);


    // Role update system
    const submitRole = (e) => {
        e.preventDefault();
        setLoading(true);
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
        const roleInputData = {
            "id": id,
            "name": name,
            "permissions": selectedPermissions
        };

        axios.put(`${MAIN_URL}/api/role/update`, roleInputData, {
            headers: {
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                if (response?.data?.code === 200) {
                    toast.success(response?.data?.massage);
                    navigate("/dashboard/admin/role", { replace: true });
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
                <title>Edit role | Dashboard</title>
            </Helmet>
            <div className="w-full max-w-md mx-auto bg-white shadow-md rounded px-4 pt-4 pb-4 mb-4">
                <div className="flex justify-between border-b-2 pb-4 mb-2">
                    <h3>Add new role</h3>

                    <div>
                        <CustomButton text="<< Back" path="/dashboard/admin/role" />
                    </div>
                </div>
                <form onSubmit={submitRole}>
                    <div className="mb-4">
                        <input defaultValue={findRole?.id} type="hidden" name="id" />
                        <input name='name'
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            id="name"
                            placeholder="Enter role name" defaultValue={findRole?.name} />
                        {errors.name !== '' && <p className='text-red-600'>{errors.name}</p>}
                        {nameCheck && <p className='text-red-600'>{nameCheck}</p>}
                    </div>
                    <div className="mb-4">
                        <h4 className='font-black'>Permissions</h4>
                        {permissions && permissions.map((permission) => (
                            <div key={permission} className="mb-[0.125rem] block min-h-[1.5rem] ps-[1.5rem]">
                                <input
                                    className="relative float-left -ms-[1.5rem]"
                                    type="checkbox"
                                    value={permission}
                                    id={permission}
                                    onChange={handlePermissionChange}
                                    checked={selectedPermissions.includes(permission)}
                                />
                                <label
                                    className="inline-block ps-[0.15rem] hover:cursor-pointer"
                                    htmlFor={permission}>
                                    {permission}
                                </label>
                            </div>
                        ))}



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



export default RoleEdit;
