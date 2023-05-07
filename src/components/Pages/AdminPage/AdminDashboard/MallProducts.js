import React, { createContext, useContext, useEffect, useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import ProductDetailsLayout from './ProductDetailsLayout/ProductDetailsLayout';
import { AllProductContext } from '../../../../context/ProductContext';
import axios from 'axios';


const AddMallProducts = () => {
    const { allMallProduct, setAllMallProduct, setProduct } = useContext(AllProductContext)
    const [searchTerm, setSearchTerm] = useState('');

    const [mallProduct, setMallProduct] = useState([]);

    // axios.get('http://localhost:5000/mall')
    //     .then(response => {
    //         setMallProduct(response.data);
    //     })
    //     .catch(error => {
    //         console.log(error);
    //     });

        useEffect(() => {
            fetch('http://localhost:5000/event')
              .then(response => response.json())
              .then(data => setMallProduct(data));
          }, []);


    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleToSearch = (event) => {
        event.preventDefault();
        // filter products array based on search term
        const filteredProducts = mallProduct.filter((product) =>
            product?.name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // update products state with filtered products
        setMallProduct(filteredProducts);
        console.log(mallProduct, filteredProducts)
    };

    const handleToEdit = () => {
        console.log("edit")

    }

    const handleToDelete = (model) => {
       const restProduct=mallProduct.filter(product=>(product.modelNo!==model));
       setMallProduct(restProduct)

    }


    const handleSubmit = () => {
        console.log("Submit")

    }




    return (

        <div>
            <h1 className="my-5 text-lg font-semibold">
                Mall product list
            </h1>
            <div className="p-4">
                <form className="flex justify-center" onSubmit={handleToSearch}>
                    <div className="flex flex-col md:flex-row md:items-center mb-4">
                        <input
                            type="text"
                            placeholder="Search products"
                            className="border border-gray-300 rounded-lg py-1 px-4 mb-2 md:mr-1 md:mb-0"
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
                    <div className=" col-span-6 grid grid-cols-2">
                        <p>
                            product Name
                        </p>
                        <p className="">
                            Model No
                        </p>
                    </div>

                    <div className="flex items-center justify-around">
                        <FiEdit></FiEdit>
                        <RiDeleteBin7Line></RiDeleteBin7Line>
                    </div>
                </div>

                {mallProduct?.map((product, index) => (
                    // <Link to={`/admin/mallProduct/details/${product?.Model},`}>
                    <div className="mx-2 my-3 grid grid-cols-7  text-start bg-slate-200 hover:bg-yellow-100 cursor-pointer rounded-lg px-2 py-2">
                        <Link key={index} to={`/admin/mallProduct/details/${product?.Model}}`} onClick={() => setProduct(product)} className=" col-span-6 grid grid-cols-2">
                            <p>
                                {product?.name}
                            </p>
                            <p className="">
                                {product?.modelNo}
                            </p>
                        </Link>

                        <div className="flex items-center justify-around">
                            <FiEdit onClick={handleToEdit} className="hover:cursor-pointer hover:text-2xl"></FiEdit>
                            <RiDeleteBin7Line onClick={()=>handleToDelete(product?.modelNo)} className="hover:cursor-pointer hover:text-2xl"></RiDeleteBin7Line>
                        </div>
                    </div>
                ))}
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

            <ProductDetailsLayout

            ></ProductDetailsLayout>
        </div>
    );
};

export default AddMallProducts;