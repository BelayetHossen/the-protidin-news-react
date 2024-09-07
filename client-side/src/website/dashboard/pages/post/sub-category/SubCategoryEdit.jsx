import { useContext, useState, useEffect } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Breadcrumb from '../../../shared/Breadcrumb';
import axios from 'axios';
import { toast } from 'react-toastify';
import { SiteContext } from '../../../context/ContextProvider';
import SubmitSpinner from '../../../shared/SubmitSpinner';
import { Helmet } from 'react-helmet';

const SubCategoryEdit = () => {
    const { MAIN_URL, loading, setLoading } = useContext(SiteContext);
    const [categories, setCategories] = useState(null);
    const [categoryData, setCategoryData] = useState(null);
    const { id } = useParams();
    const navigate = useNavigate();

    const [nameCheck, setNameCheck] = useState(null);
    const [errors, setErrors] = useState({
        name: ''
    });

    // image preview system
    const [image, setImage] = useState(null);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const handleImageChange = (e) => {
        const selectedImage = e.target.files[0];
        if (selectedImage) {
            setImage(URL.createObjectURL(selectedImage));
            setProfilePhoto(selectedImage);
        }
    };
    const handleRemoveImage = () => {
        setImage(null);
    };
    const handleDragOver = (e) => {
        e.preventDefault();
    };
    const handleDrop = (e) => {
        e.preventDefault();
        const selectedImage = e.dataTransfer.files[0];
        if (selectedImage) {
            setImage(URL.createObjectURL(selectedImage));
            setProfilePhoto(selectedImage);
        }
    };

    // Fetch sub category data by ID
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/subcategory/get/${id}`)
            .then(response => {
                setCategoryData(response.data.subcategory);
                setImage(MAIN_URL + "/images/categories/" + response.data.subcategory?.photo);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching category data:', error);
                setLoading(false);
            });
    }, [id]);

    // Fetch Categories all data
    useEffect(() => {
        axios.get(`${MAIN_URL}/api/category/all`)
            .then(response => {
                setCategories(response.data.categories);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching permission data:', error);
                setLoading(false);
            });
    }, []);



    // update system
    const updateSubCategory = (e) => {
        e.preventDefault();
        const id = e.target.id.value;
        const name = e.target.name.value;
        const category_id = e.target.category_id.value;
        const old_photo = e.target.old_photo.value;
        // Validation
        let formIsValid = true;
        const errorsCopy = { ...errors };
        if (name.trim() === '') {
            errorsCopy.name = 'The name is required!';
            formIsValid = false;
        } else {
            errorsCopy.name = '';
        }
        setErrors(errorsCopy);
        // Proceed with form submission only if form is valid
        if (!formIsValid) {
            setLoading(false);
            return;
        }
        // Create FormData object
        const formData = new FormData();
        formData.append('id', id);
        formData.append('name', name);
        formData.append('category_id', category_id);
        formData.append('old_photo', old_photo);
        formData.append('photo', profilePhoto);
        axios.post(`${MAIN_URL}/api/subcategory/update`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data',
            }
        })
            .then(response => {
                if (response?.data?.code === 201) {
                    toast.success(response?.data?.message);
                    navigate("/dashboard/post/subcategory", { replace: true });
                } else {
                    setNameCheck(response?.data?.message);
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
                <title>Edit Category | Dashboard</title>
            </Helmet>
            <div className="content-wrapper">
                <Breadcrumb name={'Edit/modify sub category'} />

                <section className="content">
                    <div className="container-fluid">
                        <div className="row">
                            <div className="col-md-8 m-auto">
                                <div className="card">
                                    <div className="card-header">
                                        <h3 className="card-title">Edit sub category</h3>

                                        <div className="card-tools">
                                            <button className="float-right">
                                                <Link to={'/dashboard/post/subcategory'}>Back</Link>
                                            </button>
                                        </div>
                                    </div>
                                    <div className="card-body">
                                        <form onSubmit={updateSubCategory}>
                                            <div className="form-group">
                                                <label htmlFor="name">Name</label>
                                                <input
                                                    defaultValue={categoryData?.name}
                                                    name='name'
                                                    type="text"
                                                    className="form-control"
                                                    id="name"
                                                    placeholder="Enter name"

                                                />
                                                {errors.name !== '' && <p className='text-danger'>{errors.name}</p>}
                                                {nameCheck && <p className='text-danger'>{nameCheck}</p>}
                                            </div>
                                            <div className="form-group">
                                                <label>Main category name</label>
                                                {
                                                    categories && (
                                                        <select
                                                            className="form-control"
                                                            name='category_id'
                                                        >
                                                            {categories?.map((item, index) => (
                                                                <option key={index} value={item.id} selected={categoryData?.main_category?.id === item.id}>
                                                                    {item.name}
                                                                </option>
                                                            ))}
                                                        </select>
                                                    )
                                                }
                                            </div>
                                            <input defaultValue={categoryData?.id} name='id' type="hidden" />
                                            <input
                                                name='old_photo'
                                                type="text"
                                                className="d-none"
                                                defaultValue={categoryData?.photo}
                                            />
                                            <div className="form-group">
                                                <label>Profile photo</label>
                                                {
                                                    !image && <>
                                                        <label
                                                            onDrop={handleDrop}
                                                            onDragOver={handleDragOver}
                                                            htmlFor="fileInput"
                                                            className="d-block border border-md py-3 text-center"
                                                        >
                                                            <h5 className='text-success text-bold'>Drag and drop or</h5> <p className='btn btn-sm'>select file</p>
                                                            <p className='text-danger'>Recomanded size(200 X 200)</p>
                                                        </label>
                                                        <input
                                                            name='photo'
                                                            id="fileInput"
                                                            type="file"
                                                            accept="image/*"
                                                            onChange={handleImageChange}
                                                            className="d-none"
                                                        />
                                                    </>
                                                }

                                                <div className="mt-3 position-relative">
                                                    <div className="row">
                                                        {image &&
                                                            <div className="col-3 mb-3 border m-auto">
                                                                <img src={image} alt={`Preview `} className="w-100" />
                                                                <button
                                                                    style={{ top: '0', right: '0' }}
                                                                    className="btn btn-sm mt-2 position-absolute mr-2"
                                                                    onClick={handleRemoveImage}
                                                                >
                                                                    <i className="fas fa-times-circle text-danger"></i>
                                                                </button>
                                                            </div>
                                                        }
                                                    </div>

                                                </div>
                                            </div>

                                            {loading ? (
                                                <SubmitSpinner />
                                            ) : (
                                                <button type="submit" className="btn btn-primary float-right">Submit</button>
                                            )}
                                        </form>
                                    </div>

                                </div>

                            </div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
};



export default SubCategoryEdit;
