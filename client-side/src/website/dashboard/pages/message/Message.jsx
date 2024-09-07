import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useQuery } from 'react-query';
import DataTable from 'react-data-table-component';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2';
import axios from 'axios';
import { Helmet } from 'react-helmet';
import { SiteContext } from '../../../context/ContextProvider';
import Spinner from '../../shared/Spinner';

const Message = () => {
    const { MAIN_URL, loading, setLoading } = useContext(SiteContext);
    const { isPending, data: permissionData = [], isFetching, refetch } = useQuery({
        queryKey: ['repoData'],
        queryFn: () => axios
            .get(`${MAIN_URL}/api/message/all`)
            .then((res) => res.data.messages),
    });

    const [search, setSearch] = useState("");
    const filteredItems = permissionData?.filter(
        (item) =>
            item.email && item.email.toLowerCase().includes(search.toLowerCase())
    );




    const [messageData, setMessageData] = useState(false);
    const openModal = (id) => {
        setLoading(true);
        axios
            .get(`${MAIN_URL}/api/message/get/${id}`)
            .then((response) => {
                if (response.data.code == 200) {
                    setMessageData(response.data.message);
                }
                refetch();
                setLoading(false);
            })
            .catch((error) => {
                console.error("Error storing data:", error);
                setLoading(false);
            });
        Swal.fire({
            title: `From: ${messageData?.email}  Subject: ${messageData?.subject}`,
            text: `${messageData?.msg}`,
        })
    };




    // Delete system
    const deleteHandler = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: `You won't be able to revert this!`,
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
        }).then((result) => {
            if (result.isConfirmed) {
                axios
                    .get(`${MAIN_URL}/api/message/delete/${id}`)
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
            name: "Email",
            selector: (row) => (
                <>
                    <div className="">
                        <p className="">{row.email}</p>
                    </div>
                </>
            ),
        },
        {
            name: "Subject",
            selector: (row) => (
                <>
                    <div className="">
                        <p className="">{row.subject}</p>
                    </div>
                </>
            ),
        },
        {
            name: "Action",
            selector: (row) => (
                <div className="">
                    <button className='mr-2' onClick={() => openModal(row.id)}>
                        <i className="fa-solid fa-eye text-blue-600 text-xl"></i>
                    </button>
                    <button className='btn-sm' onClick={() => deleteHandler(row.id)}>
                        <i className="fas fa-trash text-red-600 text-xl"></i>
                    </button>

                </div>
            ),
        },
    ];

    return (
        <>
            <Helmet>
                <title>All Message | Dashboard</title>
            </Helmet>
            {
                isFetching ? (
                    <Spinner />
                ) : (
                    <DataTable
                        title="Message List"

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



export default Message;