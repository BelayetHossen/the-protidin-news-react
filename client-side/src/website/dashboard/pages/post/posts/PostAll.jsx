import { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import { SiteContext } from '../../../../context/ContextProvider';
import CustomButton from '../../../shared/CustomButton';
import Spinner from '../../../shared/Spinner';
import axios from 'axios';
import { Helmet } from 'react-helmet';

const PostAll = () => {
    const { MAIN_URL, loading, setLoading } = useContext(SiteContext);
    const { isPending, data: permissionData = [], isFetching, refetch } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => axios
            .get(`${MAIN_URL}/api/post/all`)
            .then((res) => res.data.posts),
    });
    const [search, setSearch] = useState("");
    const filteredItems = permissionData?.filter(
        (item) =>
            item.title && item.title.toLowerCase().includes(search.toLowerCase())
    );
    // Post status change system
    const statusChangeHandler = (id) => {
        setLoading(true);
        axios
            .get(`${MAIN_URL}/api/post/status/${id}`)
            .then((response) => {
                if (response.data.code == 201) {
                    toast.success(response.data.message);
                }
                refetch();
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error storing data:", error);
                setLoading(false);
            });
    };
    // Post headline change system
    const headlineChangeHandler = (id) => {
        setLoading(true);
        axios
            .get(`${MAIN_URL}/api/post/headline/${id}`)
            .then((response) => {
                if (response.data.code == 201) {
                    toast.success(response.data.message);
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
                    .get(`${MAIN_URL}/api/post/delete/${id}`)
                    .then((response) => {
                        if (response.data.code == 200) {
                            toast.success(response.data.message);
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
            name: "Title",
            selector: (row) => (
                <div className='flex items-center'>

                    {
                        row.photo && <img className='rounded w-14 my-1 mr-2' src={MAIN_URL + "/images/posts/" + row.photo} alt="" />
                    }
                    {

                        row.title.length > 20 ? <p className="">{row.title.substring(0, 20) + "..."}</p> : <p className="">{row.title}</p>
                    }
                </div>
            ),
        },
        {
            name: "Category",
            selector: (row) => (
                <>
                    <p className="">{row.main_category?.name}</p>
                </>
            ),
        },
        {
            name: "Sub-Category",
            selector: (row) => (
                <>
                    {
                        row.sub_category && <p className="">{row.sub_category?.name}</p>
                    }
                </>
            ),
        },
        {
            name: "Sub-Sub-Category",
            selector: (row) => (
                <>
                    {
                        row.sub_sub_category && <p className="">{row.sub_sub_category?.name}</p>
                    }
                </>
            ),
        },
        {
            name: "Status",
            selector: (row) => (
                <label className="inline-flex items-center me-5 cursor-pointer">
                    <input id={row.name} type="checkbox" value="" className="sr-only peer" defaultChecked={row.status === 1} onChange={() => statusChangeHandler(row.id)} />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
            )

        },
        {
            name: "Headline",
            selector: (row) => (
                <label className="inline-flex items-center me-5 cursor-pointer">
                    <input id={row.name} type="checkbox" value="" className="sr-only peer" defaultChecked={row.is_headline === 1} onChange={() => headlineChangeHandler(row.id)} />
                    <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-focus:ring-4 peer-focus:ring-green-300 dark:peer-focus:ring-green-800 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-green-600"></div>
                </label>
            )

        },
        {
            name: "Action",
            selector: (row) => (
                <div className="">
                    <button className='mr-2'>
                        <Link to={`/dashboard/post/edit/${row.id}`}>
                            <i className="fas fa-edit text-blue-600"></i>
                        </Link>
                    </button>
                    <button className='text-red-600' onClick={() => deleteHandler(row.id)}>
                        <i className="fas fa-trash"></i>
                    </button>

                </div>
            ),
        },
    ];

    return (
        <>
            <Helmet>
                <title>All Posts | Dashboard</title>
            </Helmet>
            {
                isFetching ? (
                    <Spinner />
                ) : (
                    <DataTable
                        title="Posts List"
                        actions={
                            <div className="">
                                <CustomButton text="+ Add new" path="/dashboard/post/create" />
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

export default PostAll;
