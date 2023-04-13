import React, { useState } from 'react';
import { FiEdit } from 'react-icons/fi';
import { RiDeleteBin7Line } from 'react-icons/ri';
import { Link } from 'react-router-dom';
import ProductContext from '../../../../context/ProductContext';

const AddMallProducts = () => {
    const [searchTerm, setSearchTerm] = useState('');
    const [products, setProducts] = useState([
        {
            productName: "Dot Printer",
            Model: "vz474gh",
            id: 1

        },
        {
            productName: "Dot Printer",
            Model: "vz474gh",
            id: 2

        },
        {
            productName: "Thermal Printer",
            Model: "vz474gh",
            id: 3

        },
        {
            productName: "Dot Matrix Printer",
            Model: "vz474gh",
            id: 4

        },
        {
            productName: "Dot Printer",
            Model: "vz474gh",
            id: 5

        },
        {
            productName: "Dot Printer",
            Model: "vz474gh",
            id: 6

        },

    ]);


    const handleChange = (event) => {
        setSearchTerm(event.target.value);
    };

    const handleToSearch = (event) => {
        event.preventDefault();
        // filter products array based on search term
        const filteredProducts = products.filter((product) =>
            product?.productName.toLowerCase().includes(searchTerm.toLowerCase())
        );
        // update products state with filtered products
        setProducts(filteredProducts);
    };

    const handleToEdit = () => {
       
    }

    const handleToDelete = () => {
        
    }


    const handleSubmit = () => {
        
    }




    return (
        <ProductContext>
        <div>
            <h1 className="my-5 text-lg font-semibold">
                Event product list
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
                {products.map((product) => (
                     <Link to={`/admin/eventProduct/details/${product?.Model}`}>
                    <div className="mx-2 my-3 grid grid-cols-7  text-start bg-slate-200 hover:bg-yellow-100 cursor-pointer rounded-lg px-2 py-2">
                        <div className=" col-span-6 grid grid-cols-2">
                            <p>
                                {product?.productName}
                            </p>
                            <p className="">
                                {product?.Model}
                            </p>
                        </div>

                        <div className="flex items-center justify-around">
                            <FiEdit onClick={handleToEdit} className="hover:cursor-pointer"></FiEdit>
                            <RiDeleteBin7Line onClick={handleToDelete} className="hover:cursor-pointer"></RiDeleteBin7Line>
                        </div>

                    </div>
                    </Link>
                ))}
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
        </ProductContext>
    );
};

export default AddMallProducts;