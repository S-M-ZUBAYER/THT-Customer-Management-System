import React from 'react';
import img from "../../../../Assets/Images/Admin/printer.jpg"

function ProductDetails() {
    return (
        <div className="flex justify-around items-center">
            <div className="px-4 sm:px-6 lg:px-8 py-12">
                <div className="flex flex-col md:flex-row md:space-x-4">
                    <div className="md:w-1/2 mb-4 flex justify-center">
                        <img src={img} alt="Product" className="rounded-lg w-4/5 h-4/5" />
                    </div>
                    <div className="md:w-1/2 text-start pl-5">
                        <div className=" mb-5">
                            <h2 className="text-lg font-semibold">Product Price</h2>
                            <p className="text-sm">
                                Dot Matrix printer
                            </p>
                        </div>

                        <div className=" mb-5">
                            <h2 className="text-lg font-semibold">Product Name</h2>
                            <p className="text-sm">
                                34893894
                            </p>
                        </div>

                        <div className=" mb-5">
                            <h2 className="text-lg font-semibold">Product Description</h2>
                            <p className="text-sm">
                                please provide code for one page add information page with react js and tailwind css , envirnment set up already completed. in this page will be 2 column left column will be show product img and right column will show product name heading and below the product name. then product description heading and under show the product description. then product details heading then model number printer color , connector type then  stock quantity heading under this quantity number then shelf time.
                            </p>
                        </div>

                        <h2 className="text-lg font-semibold">Product Details</h2>
                        <div className=" mb-5 grid grid-cols-3">
                            <div className="">
                                <p className="my-1">Model Number</p>
                                <p  className="my-1">Model Number</p>
                                <p  className="my-1">Model Number</p>
                            </div>
                            <div className="">
                                <p  className="my-1">he9837473</p>
                                <p  className="my-1">color</p>
                                <p  className="my-1">Bluetooth</p>
                            </div>



                        </div>
                        <div className=" mb-5">
                            <h2 className="text-lg font-semibold">Product Name</h2>
                            <p className="text-sm">
                                Dot Matrix printer
                            </p>
                        </div>


                        <h4 className="text-gray-700 font-semibold mb-2 mt-4">Shelf Time</h4>
                        <div className="flex space-x-4">
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

    );
}

export default ProductDetails;