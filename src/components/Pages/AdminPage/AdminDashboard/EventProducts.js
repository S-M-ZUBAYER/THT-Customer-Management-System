import React, { useContext, useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import ProductContext, { AllProductContext } from '../../../../context/ProductContext';
import axios from 'axios';
import { toast } from 'react-hot-toast';
import DisplaySpinner from '../../../Shared/Loading/DisplaySpinner';
import { AuthContext } from '../../../../context/UserContext';



const AddMallProducts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchAllQuery, setSearchAllQuery] = useState('');
    const { allEventProduct, setAllEventProduct, setProduct } = useContext(AllProductContext)
    const { loading, setLoading } = useContext(AuthContext)


    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const [eventProduct, setEventProduct] = useState([]);

    //     axios.get('https://grozziie.zjweiting.com:8033/event')
    //   .then(response => {
    //     setEventProduct(response.data);
    //   })
    //   .catch(error => {
    //     console.log(error);
    //   });

    // use useEffect to load the all mall product from data base
    useEffect(() => {
        setLoading(true)
        fetch('https://grozziie.zjweiting.com:8033/tht/eventProducts')
            .then(response => response.json())
            .then(data => setEventProduct(data));
        setLoading(false);
    }, []);

    //create a function to got the specific searching products
    const handleToSearch = (event) => {
        event.preventDefault();
        setSearchAllQuery('');
        setSearchTerm('');
        // event.preventDefault();
        // // filter products array based on search term
        // const filteredProducts = eventProduct.filter((product) =>
        //     product?.modelNumber.toLowerCase().includes(searchTerm.toLowerCase())
        // );
        // // update products state with filtered products
        // setEventProduct(filteredProducts);
    };




    //create a function to delete  any specific product
    const handleToDelete = async (productId) => {
        const confirmed = window.confirm('Are you sure you want to delete this product information?');
        if (!confirmed) {
            return; // Cancel the deletion if the user clicks Cancel or closes the modal
        }
        try {
            await axios.delete(`https://grozziie.zjweiting.com:8033/tht/eventProducts/delete/${productId}`);
            toast.success(`One MallProduct deleted successfully`);
            const restProduct = eventProduct.filter(product => (product?.id !== productId));
            setEventProduct(restProduct)
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error(`Failed to delete event Product ${error}`);
        }

    };



    const handleSubmit = () => {
        console.log("Submit")

    }

    const handleSearchAllChange = (event) => {
        setSearchAllQuery(event.target.value);
        setSearchTerm(event.target.value);
    };


    const filteredAllProduct = eventProduct.filter((request) =>
        request?.productName.toLowerCase().includes(searchAllQuery.toLowerCase()) ||
        request?.productCountryName.toLowerCase().includes(searchAllQuery.toLowerCase()) ||
        request?.productPrice.toLowerCase().includes(searchAllQuery.toLowerCase()) ||
        // request?.id.includes(searchAllQuery.toLowerCase()) ||
        request?.modelNumber.toLowerCase().includes(searchAllQuery.toLowerCase())
        // request?.printerColo.toLowerCase().includes(searchAllQuery.toLowerCase())
    );




    return (
        <div className="text-gray-800">
            <h1 className="my-5 text-lg font-semibold">
                Event product list
            </h1>
            <div className="p-4">
                <form className="flex justify-center" onSubmit={handleToSearch}>
                    <div className="flex flex-col md:flex-row md:items-center mb-4">
                        <input
                            type="text"
                            placeholder="Search products"
                            className="border border-gray-300 rounded-lg py-1 px-4 mb-2 md:mr-1 md:mb-0 bg-white"
                            value={searchTerm}
                            // onChange={handleChange}
                            onChange={handleSearchAllChange}
                        />
                        <button
                            type="submit"
                            className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-1 px-8 rounded-md"
                        >
                            Clear
                        </button>
                    </div>
                </form>

                <div className=" h-screen overflow-y-scroll">
                <div className="mx-2 my-3 grid grid-cols-7  text-start text-lg font-semibold bg-slate-300 px-2 py-2">
                    <div className=" col-span-6 grid grid-cols-6">
                        <p>
                            Image
                        </p>
                        <p>
                            product Name
                        </p>
                        <p className="">
                            Model No
                        </p>
                        <p className="">
                            country
                        </p>
                        <p className="">
                            Id
                        </p>

                        <p className="">
                            Show Type
                        </p>
                    </div>

                    <div className="flex items-center justify-around">
                        {/* <FiEdit></FiEdit> */}
                        <RiDeleteBin7Line></RiDeleteBin7Line>
                    </div>
                </div>

                {loading ?
                    <DisplaySpinner></DisplaySpinner>
                    :

                    filteredAllProduct?.length === 0
                        ?
                        <span className="text-xl font-bold text-red-400">No Mall Product Available</span>
                        :
                        filteredAllProduct?.map((product, index) => (
                            // <Link to={`/admin/mallProduct/details/${product?.Model},`}>
                            <div className="  mx-2 my-3 grid grid-cols-7  text-start bg-slate-200 hover:bg-yellow-100 cursor-pointer rounded-lg px-2 py-2">
                                <Link key={index} to={`/admin/eventProduct/details/${product?.modelNumber}}`} onClick={() => setProduct(product)} className=" col-span-6 grid grid-cols-6">
                                    <img className=" h-10 w-10 rounded-full" src={`https://grozziie.zjweiting.com:8033/tht/eventProductImages/${product.productImg}`} alt={product.productName} ></img>

                                    <p>
                                        {product?.productName}
                                    </p>
                                    <p className="">
                                        {product?.modelNumber}
                                    </p>
                                    <p className="">
                                        {product?.productCountryName}
                                    </p>
                                    <p className="">
                                        {product?.id}
                                    </p>
                                    <p className="">
                                        {product?.productImgRemark}
                                    </p>
                                </Link>

                                <div className="flex items-center justify-around">
                                    {/* <button className="text-blue-500 hover:cursor-pointer hover:text-2xl" onClick={() => openEditModal(product)}>
                             <FiEdit></FiEdit>
                         </button>
                         {isModalOpen && (
                             <ModalForEdit product={selectedProduct} onSave={handleSave} onClose={handleCloseModal} />
                         )} */}
                                    <RiDeleteBin7Line onClick={() => handleToDelete(product?.id)} className="hover:cursor-pointer hover:text-2xl"></RiDeleteBin7Line>
                                </div>
                            </div>
                        ))}

                </div>

               
            </div>


            <Link to="/admin/eventProduct/add">
                <button
                    className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 my-10 px-20 rounded-lg"
                    onClick={handleSubmit}
                >
                    Add new event product
                </button>
            </Link>
        </div>
    );
};

export default AddMallProducts;