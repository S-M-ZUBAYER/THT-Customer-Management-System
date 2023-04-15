import React, { useContext } from 'react';
import img from "../../../../Assets/Images/Admin/printer.jpg"
import ProductDetailsLayout from './ProductDetailsLayout/ProductDetailsLayout';
import { AllProductContext } from '../../../../context/ProductContext';


function ProductDetails() {
const {Product}=useContext(AllProductContext);
    
    return (
    <div>
<div className="flex justify-around items-center">
            <div className="px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="md:w-1/2 mb-4 flex justify-center">
                        <img src={img} alt="Product" className="rounded-lg w-4/5 h-4/5" />
                    </div>
                    <div className="md:w-1/2 text-start pl-5">
                        <div className=" mb-5">
                            <h2 className="text-lg font-semibold">Product Name</h2>
                            <p className="text-sm text-gray-500">
                                {Product?.productName}
                            </p>
                        </div>

                        <div className=" mb-5">
                            <h2 className="text-lg font-semibold">Product Price </h2>
                            <p className="text-sm text-gray-500">
                                34893894
                            </p>
                        </div>

                        <div className=" mb-5">
                            <h2 className="text-lg font-semibold">Product Description</h2>
                            <p className="text-sm text-gray-500">
                                please provide code for one page add information page with react js and tailwind css , envirnment set up already completed. in this page will be 2 column left column will be show product img and right column will show product name heading and below the product name. then product description heading and under show the product description. then product details heading then model number printer color , connector type then  stock quantity heading under this quantity number then shelf time.
                            </p>
                        </div>

                        <h2 className="text-lg font-semibold">Product Details</h2>
                        <div className=" mb-5 grid grid-cols-3 text-gray-500">
                            <div className=" text-base font-semibold">
                                <p className="my-1">Model Number</p>
                                <p  className="my-1">Printer Color</p>
                                <p  className="my-1">Connector type</p>
                            </div>
                            <div className="text-base">
                                <p  className="my-1">{Product?.Model}</p>
                                <p  className="my-1">color</p>
                                <p  className="my-1">Bluetooth</p>
                            </div>



                        </div>
                        <div className=" mb-5">
                            <h2 className="text-lg font-semibold">Product Name</h2>
                            <p className="text-sm text-gray-500">
                                Dot Matrix printer
                            </p>
                        </div>


                        <h4 className=" font-semibold mb-2 mt-4">Shelf Time</h4>
                        <div className="flex space-x-4 text-gray-500">
                            <div className="flex-grow border pl-3 mr-8 rounded-md">
                                <p className="text-gray-700">Start Time</p>
                            </div>
                            <div className="flex-grow border pl-3 mr-8 rounded-md">
                                <p className="text-gray-700">End Time</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <ProductDetailsLayout></ProductDetailsLayout>

    </div>

    );
}

export default ProductDetails;
