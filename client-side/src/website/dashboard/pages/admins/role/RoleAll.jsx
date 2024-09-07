import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { SiteContext } from '../../../../context/ContextProvider';
import Spinner from '../../../shared/Spinner';
import axios from 'axios';
import CustomButton from '../../../shared/CustomButton';
import { Helmet } from 'react-helmet';

const RoleAll = () => {
    const { MAIN_URL, loggedinAdmin, setLoading } = useContext(SiteContext);
    const { isPending, data: roleData = [], isFetching, refetch } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => axios
            .get(`${MAIN_URL}/api/roles/all`)
            .then((res) => res.data.roles),
    });
    const [search, setSearch] = useState("");
    const filteredItems = roleData?.filter(
        (item) =>
            item.name && item.name.toLowerCase().includes(search.toLowerCase())
    );

    // status change system
    const statusChangeHandler = (id) => {
        setLoading(true);
        axios
            .get(`${MAIN_URL}/api/role/status/${id}`)
            .then((response) => {
                if (response.data.code == 200) {
                    toast.success(response.data.massage);
                }
                refetch();
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error storing data:", error);
                setLoading(false);
            });
    };
    // Delete system
    const deleteHandler = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .get(`${MAIN_URL}/api/role/delete/${id}`)
                    .then((response) => {
                        if (response.data.code == 200) {
                            toast.success(response.data.massage);
                        }
                        refetch();
                        setLoading(false);
                    })
                    .catch((error) => {
                        console.error("Error storing data:", error);
                        setLoading(false);
                    });
            }
        });
    }
    // columns for table
    const columns = [
        {
            name: "Name",
            selector: (row) => (
                <>
                    <div className="">
                        <p className="">{row.name}</p>
                    </div>
                </>
            ),
        },
        {
            name: "Permissions",
            selector: (row) => (
                <>
                    {row.permissions && (
                        <ul style={{ paddingLeft: 0 }}>
                            {JSON.parse(row.permissions)?.map((item, index) => (
                                <li key={index} style={{ listStyle: "none" }}>
                                    <label className="">{index + 1}.</label>
                                    <label className="ml-2">{item}</label>
                                </li>
                            ))}
                        </ul>
                    )}
                </>
            ),
        },
        {
            name: "Status",
            selector: (row) => (
                loggedinAdmin?.get_role?.id !== row?.id ? (
                    <label className="inline-flex items-center me-5 cursor-pointer">
                        <input id={row.name} type="checkbox" value="" className="sr-only peer" defaultChecked={row.status === 1} onChange={() => statusChangeHandler(row.id)} />
                        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                    </label>

                ) : (
                    <span>Logged In</span>
                )

            )

        },
        {
            name: "Action",
            selector: (row) => (
                <div className="">
                    <button className='mr-2'>
                        <Link to={`/dashboard/admin/role/edit/${row.id}`}>
                            <i className="fas fa-edit text-blue-600"></i>
                        </Link>
                    </button>
                    {loggedinAdmin?.get_role?.id !== row?.id ? (
                        <button className='' onClick={() => deleteHandler(row.id)}>
                            <i className="fas fa-trash text-red-600"></i>
                        </button>
                    ) : (
                        <span>Logged In</span>
                    )}

                </div>
            ),
        },
    ];

    return (
        <>
            <Helmet>
                <title>All roles | Dashboard</title>
            </Helmet>
            {
                isFetching ? (
                    <Spinner />
                ) : (
                    <DataTable
                        title="Role List"
                        actions={
                            <div className="">
                                <CustomButton text="+ Add new" path="/dashboard/admin/role/create" />
                            </div>
                        }
                        selectableRows
                        columns={columns}
                        data={filteredItems}
                        pagination
                        subHeader
                        subHeaderComponent={
                            <input
                                type="text"
                                placeholder="Search..."
                                className=""
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        }
                    />
                )
            }


        </>
    );
};


export default RoleAll;
