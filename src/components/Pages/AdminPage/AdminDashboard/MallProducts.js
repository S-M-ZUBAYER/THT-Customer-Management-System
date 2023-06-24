import React, { createContext, useContext, useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import ProductDetailsLayout from './ProductDetailsLayout/ProductDetailsLayout';
import { AllProductContext } from '../../../../context/ProductContext';
import axios from 'axios';
import ModalForEdit from './ModalForEdit';
import { toast } from 'react-hot-toast';
import { AuthContext } from '../../../../context/UserContext';
import DisplaySpinner from '../../../Shared/Loading/DisplaySpinner';


const AddMallProducts = () => {
    const { allMallProduct, setAllMallProduct, setProduct } = useContext(AllProductContext)

    //create useState To update the product information
    const [editingProduct, setEditingProduct] = useState(null);

    //create useState To search the specific product
    const [searchTerm, setSearchTerm] = useState('');

    //create useState to declare the all mall product
    const [mallProduct, setMallProduct] = useState([]);

    //create useState To open and close modal
    const [isModalOpen, setIsModalOpen] = useState(false);

    //create useState To select any specific product
    const [selectedProduct, setSelectedProduct] = useState(null);

    const {loading,setLoading}=useContext(AuthContext)


    // use useEffect to load the all mall product from data base
    useEffect(() => {
        setLoading(true)
        fetch('https://customer-server-theta.vercel.app/tht/mallProducts')
            .then(response => response.json())
            .then(data => setMallProduct(data));
            setLoading(false)
    }, []);

    //create a function to got the modal of searching product
    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };


    //create a function to got the specific searching products
    const handleToSearch = (event) => {
        event.preventDefault();
        // filter products array based on search term
        const filteredProducts = mallProduct.filter((product) =>
            product?.modelNumber.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // update products state with filtered products
        setMallProduct(filteredProducts);
        console.log(mallProduct, filteredProducts)
    };


    //create a function to update any specific product information
    const handleToEdit = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };


    //create a function to save the update information of any specific product information
    const handleSave = (editedProduct) => {
        // Update the product with the edited values
        setMallProduct((prevProducts) =>
            prevProducts.map((product) => (product.productId === editedProduct.productId ? editedProduct : product))
        );
    };


    //create a function to close the modal
    const handleCloseModal = () => {
        setSelectedProduct(null);
        setIsModalOpen(false);
    };



    //create a function to delete  any specific product
    const handleToDelete = async (productId) => {
        try {
            await axios.delete(`https://customer-server-theta.vercel.app/tht/mallProducts/delete/${productId}`);
            toast.success(`One MallProduct deleted successfully`);
            setMallProduct((prevProducts) => prevProducts.filter((product) => product?.id !== productId));
        } catch (error) {
            console.error('Error deleting user:', error);
            toast.error('Failed to delete mall Product');
        }

    };


    const handleSubmit = () => {
        console.log("Submit")

    }



    //create a function to update a product information from the frontend and database both side 
    const updateUser = async (userId, editingUser) => {
        try {
            const response = await axios.put(`https://customer-server-theta.vercel.app/tht/users/update/${userId}`, editingUser);
            toast.success("user information updated successfully");
            // Optionally, you can show a success message to the user using a toast or other UI notification.
        } catch (error) {
            toast.error('Error updating user:', error);
            // Optionally, you can show an error message to the user using a toast or other UI notification.
        }
    };

    const saveProduct = (userId, updatedUser) => {
        updateUser(userId, updatedUser);
        setMallProduct(mallProduct.map((user) => (user.id === updatedUser.id ? updatedUser : user)));
        setEditingProduct(null);
    };
    const openEditModal = (product) => {
        setEditingProduct(product);
    };


    //   const handleSubmitToUpdate = async (event) => {
    //     event.preventDefault();

    //     const formData = new FormData();
    //     formData.append('productImg', productImg);
    //     formData.append('invoiceFile', invoiceFile);
    //     formData.append('productName', productName);
    //     formData.append('productPrice', productPrice);
    //     formData.append('productDescription', productDescription);
    //     formData.append('modelNumber', modelNumber);
    //     formData.append('printerColor', printerColor);
    //     formData.append('connectorType', connectorType);
    //     formData.append('stockQuantity', stockQuantity);
    //     formData.append('shelfStartTime', shelfStartTime);
    //     formData.append('shelfEndTime', shelfEndTime);
    //     formData.append('afterSalesText', afterSalesText);
    //     formData.append('afterSalesInstruction', afterSalesInstruction);
    //     formData.append('inventoryText', inventoryText);
    //     // Append selected images to the form data
    //     for (let i = 0; i < selectedImages.length; i++) {
    //       formData.append('images', selectedImages[i]);
    //     }

    //     // Append selected videos to the form data
    //     for (let i = 0; i < selectedVideos.length; i++) {
    //       formData.append('videos', selectedVideos[i]);
    //     }
    //     console.log(formData);
    //     try {
    //       await axios.put(`https://customer-server-theta.vercel.app/tht/mallProducts/update/${product?.id}`, formData, {
    //         headers: {
    //           'Content-Type': 'multipart/form-data'
    //         }
    //       });
    //       console.log('Product created successfully!');
    //       toast.success('Product created successfully!');
    //       // Reset form fields
    //       setProductName('');
    //       setProductPrice('');
    //       setProductDescription('');
    //       setModelNumber('');
    //       setPrinterColor('');
    //       setConnectorType('');
    //       setStockQuantity('');
    //       setSelectedImages([]);
    //       setSelectedVideos([]);
    //       setShelfStartTime('');
    //       setShelfEndTime('');
    //       setAfterSalesText('');
    //       setAfterSalesInstruction('');
    //       setInventoryText('');
    //       setProductImg(null);
    //       setInvoiceFile(null);
    //     } catch (error) {
    //       console.error('Error creating product:', error);
    //       toast.error("Failed to upload, Please input every data properly")
    //     }
    //   };




    return (

        <div className="text-gray-800">
            <h1 className="my-5 text-lg font-semibold">
                Mall product list
            </h1>
            <div className="p-4">
                <form className="flex justify-center" onSubmit={handleToSearch}>
                    <div className="flex flex-col md:flex-row md:items-center mb-4">
                        <input
                            type="text"
                            placeholder="Search products"
                            className="border border-gray-300 rounded-lg py-1 px-4 mb-2 md:mr-1 md:mb-0 bg-white"
                            value={searchTerm}
                            onChange={handleChange}
                        />
                        <button
                            type="submit"
                            className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-1 px-8 rounded-md"
                        >
                            Search
                        </button>
                    </div>
                </form>

                <div className="mx-2 my-3 grid grid-cols-7  text-start text-lg font-semibold bg-slate-300 px-2 py-2">
                    <div className=" col-span-6 grid grid-cols-3">
                        <p>
                            Image
                        </p>
                        <p>
                            product Name
                        </p>
                        <p className="">
                            Model No
                        </p>
                    </div>

                    <div className="flex items-center justify-around">
                        {/* <FiEdit></FiEdit> */}
                        <RiDeleteBin7Line></RiDeleteBin7Line>
                    </div>
                </div>

                {
                    loading?
                    <DisplaySpinner></DisplaySpinner>
                    :
(
                mallProduct?.length===0
                ?
                <span className="text-xl font-bold text-red-400">No Mall Product Available</span>
                :
                mallProduct?.map((product, index) => (
                    // <Link to={`/admin/mallProduct/details/${product?.Model},`}>
                    <div key={index} className="mx-2 my-3 grid grid-cols-7  text-start bg-slate-200 hover:bg-yellow-100 cursor-pointer rounded-lg px-2 py-2">
                        <Link to={`/admin/mallProduct/details/${product?.modelNumber}}`} onClick={() => setProduct(product)} className=" col-span-6 grid grid-cols-3">
                            <img className=" h-10 w-10 rounded-full" src={`https://customer-server-theta.vercel.app/tht/mallProductImages/${product.productImg}`} alt={product.productName} ></img>

                            <p>
                                {product?.productName}
                            </p>
                            <p className="">
                                {product?.modelNumber}
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
                )))}
            </div>

            <Link to="/admin/mallProduct/add">
                {

                }
                <button
                    className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 my-10 px-20 rounded-lg"
                    onClick={handleSubmit}
                >
                    Add new mall product
                </button>
            </Link>


            {/* mall product update */}
            {/* modal part start from here to update a user information */}
            {/* {editingProduct && (
                <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
                    <div className="bg-white p-8">
                        <h2 className="text-lg font-bold mb-4">Edit User</h2>
                        <input
                            type="text"
                            placeholder="Name"
                            value={editingProduct.pro}
                            onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                            className="mb-2 px-4 py-2 border border-gray-300 rounded-md w-full"
                        />
                        <input
                            type="email"
                            placeholder="Email"
                            readOnly
                            value={editingProduct.email}
                            onChange={(e) => setEditingProduct({ ...editingProduct, email: e.target.value })}
                            className="mb-2 px-4 py-2 border border-gray-300 rounded-md w-full"
                        />
                        <input
                            type="text"
                            placeholder="Phone"
                            value={editingProduct.phone}
                            onChange={(e) => setEditingProduct({ ...editingProduct, phone: e.target.value })}
                            className="mb-2 px-4 py-2 border border-gray-300 rounded-md w-full"
                        />
                        <input
                            type="text"
                            placeholder="Designation"
                            value={editingProduct.designation}
                            onChange={(e) => setEditingProduct({ ...editingProduct, designation: e.target.value })}
                            className="mb-2 px-4 py-2 border border-gray-300 rounded-md w-full"
                        />
                        <input
                            type="text"
                            placeholder="Language"
                            value={editingProduct.language}
                            onChange={(e) => setEditingProduct({ ...editingProduct, language: e.target.value })}
                            className="mb-2 px-4 py-2 border border-gray-300 rounded-md w-full"
                        />
                        <input
                            type="text"
                            placeholder="Country"
                            value={editingProduct.country}
                            onChange={(e) => setEditingProduct({ ...editingProduct, country: e.target.value })}
                            className="mb-2 px-4 py-2 border border-gray-300 rounded-md w-full"
                        />
                        <button
                            className="bg-blue-500 text-white px-4 py-2 rounded-md"
                        //   onClick={() => saveUser(editingUser.id,editingUser)}handleSubmitToUpdate
                        >
                            Save
                        </button>
                    </div>
                </div>
            )} */}



        </div>
    );
};

export default AddMallProducts;