import React, { useContext, useState } from 'react';
import ReactPlayer from 'react-player';
import img from "../../../../Assets/Images/Admin/printer.jpg"
import ProductDetailsLayout from './ProductDetailsLayout/ProductDetailsLayout';
import { AllProductContext } from '../../../../context/ProductContext';


function ProductDetails() {
    const { Product } = useContext(AllProductContext);

   

    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);



    const handleImageClick = (image) => {
        setSelectedImage(image);
    };



    const handleClose = () => {
        setSelectedVideo(null);
    };




    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };


    const handleCloseImage = () => {
        setSelectedImage(null);
    };


    return (
        <div>
            <div className="flex justify-around items-center">
                <div className="px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div className="md:w-1/2 mb-4 flex justify-center">
                            <img src={`http://localhost:5000/tht/mallProductImages/${Product?.productImg}`} alt="Product" className="rounded-lg w-96 h-96" />
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
                                    {Product?.productPrice}
                                </p>
                            </div>

                            <div className=" mb-5">
                                <h2 className="text-lg font-semibold">Product Description</h2>
                                <p className="text-sm text-gray-500">
                                    {Product?.productDescription}
                                </p>
                            </div>

                            <h2 className="text-lg font-semibold">Product Details</h2>
                            <div className=" mb-5 grid grid-cols-3 text-gray-500">
                                <div className=" text-base font-semibold">
                                    <p className="my-1">Model Number</p>
                                    <p className="my-1">Printer Color</p>
                                    <p className="my-1">Connector type</p>
                                </div>
                                <div className="text-base">
                                    <p className="my-1">{Product?.modelNumber}</p>
                                    <p className="my-1">{Product?.printerColor}</p>
                                    <p className="my-1">{Product?.connectorType}</p>
                                </div>



                            </div>
                            <div className=" mb-5">
                                <h2 className="text-lg font-semibold">Product Name</h2>
                                <p className="text-sm text-gray-500">
                                    {Product?.productName}
                                </p>
                            </div>


                            <h4 className=" font-semibold mb-2 mt-4">Shelf Time</h4>
                            <div className="flex space-x-4 text-gray-500">
                                <div className="flex-grow border pl-3 mr-8 rounded-md">
                                    <p className="text-gray-700">{Product?.shelfStartTime.split("T")[0]
                                    }</p>
                                </div>
                                <div className="flex-grow border pl-3 mr-8 rounded-md">
                                    <p className="text-gray-700">{Product?.shelfEndTime.split("T")[0]
                                    }</p>
                                </div>
                            </div>

                            <div className="container">
                                <h1 className="text-2xl font-bold mt-8 mb-5">Image Gallery Of <span className="text-amber-400">{Product?.productName}</span></h1>
                                <div className="grid grid-cols-3 gap-3">
                                    {(Product.allImages).split(",").map((image, index) => (
                                        <img
                                            key={index}
                                            src={`http://localhost:5000/tht/mallProductImages/${image}`}
                                            alt={`Image ${index + 1}`}
                                            onClick={() => handleImageClick(`http://localhost:5000/tht/mallProductImages/${image}`)}
                                            className="w-24 h-24 object-cover cursor-pointer mx-4 my-2 rounded-lg"
                                        />
                                    ))}
                                </div>
                                {selectedImage && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75">
                                        <div className="max-w-3xl max-h-3xl">
                                            <img
                                                src={selectedImage}
                                                alt="Selected Image"
                                                className="mx-auto max-w-full max-h-full"
                                            />
                                            <button
                                                onClick={handleCloseImage}
                                                className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>


                            <div className="container">
                                <h1 className="text-2xl font-bold  mt-8 mb-5">Video Gallery Of <span className="text-amber-400">{Product?.productName}</span> </h1>

                                <div className="grid grid-cols-3 gap-4">
                                    {((Product?.allVideos).split(",")).map((video, index) => (
                                        <div
                                            key={index}
                                            onClick={() => handleVideoClick(`http://localhost:5000/tht/mallProductImages/${video}`)}
                                            className="relative cursor-pointer"
                                        >
                                            <video
                                                src={`http://localhost:5000/tht/mallProductImages/${video}`}
                                                alt={`Video ${index + 1}`}
                                                className="w-full h-auto rounded-lg"
                                                controls
                                            />
                                            <div className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 hover:bg-opacity-75 transition duration-300">
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    className="h-12 w-12 text-white"
                                                    viewBox="0 0 20 20"
                                                    fill="currentColor"
                                                >
                                                    <path
                                                        fillRule="evenodd"
                                                        d="M5 4a1 1 0 0 1 1 1v10a1 1 0 0 1-1.707.707L1 12.414V5.586l2.293-2.293A1 1 0 0 1 5 4zm10 1.414l2.293 2.293A1 1 0 0 1 18 8.586v6.828a1 1 0 0 1-1.707.707L15 15.586V8.414l2.293-2.293A1 1 0 0 1 17 6.414z"
                                                        clipRule="evenodd"
                                                    />
                                                </svg>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {selectedVideo && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black">
                                        <video
                                            src={selectedVideo}
                                            alt="Selected Video"
                                            className="w-4/6 h-auto"
                                            controls
                                            autoPlay
                                        />
                                        <button
                                            onClick={handleClose}
                                            className="absolute top-4 right-4 px-4 py-2 bg-gray-800 text-white rounded-lg"
                                        >
                                            Close
                                        </button>
                                    </div>
                                )}

                            </div>
                        </div>


                    </div>
                </div>
              
            </div>

            <ProductDetailsLayout
            product={Product}
            ></ProductDetailsLayout>

        </div>

    );
}

export default ProductDetails;
