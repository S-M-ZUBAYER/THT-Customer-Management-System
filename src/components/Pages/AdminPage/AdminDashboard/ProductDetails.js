import React, { useContext, useState } from 'react';
import ReactPlayer from 'react-player';
import img from "../../../../Assets/Images/Admin/printer.jpg"
import ProductDetailsLayout from './ProductDetailsLayout/ProductDetailsLayout';
import { AllProductContext } from '../../../../context/ProductContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import AddColorImg from './AddColorImg';


function ProductDetails() {
    const { Product } = useContext(AllProductContext);
    const url = window.location.href;
    const productCategory = url.split('/')[4];

    console.log(Product, "product")
    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedColorImage, setSelectedColorImage] = useState(null);
    const [selectedInstructionImage, setSelectedInstructionImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [colorImg, setColorImg] = useState("");
    const [selectedColorImages, setSelectedColorImages] = useState([]);
    const [productPrice, setProductPrice] = useState('');
    const [productDescription, setProductDescription] = useState('');
    const [stockQuantity, setStockQuantity] = useState('');
    const [modelNumber, setModelNumber] = useState('');

    const handleInstructionImageClick = (image) => {
        setSelectedInstructionImage(image);
    };
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };
    const handleColorImageClick = (image) => {
        setSelectedColorImage(image);
    };
    const handleColorImage= (e) => {
        setColorImg(e.target.value);
    };



    const handleClose = () => {
        setSelectedVideo(null);
    };


    const handleProductPriceChange = (e) => {
        setProductPrice(e.target.value);
    };

    const handleProductDescriptionChange = (e) => {
        setProductDescription(e.target.value);
    };

    const handleVideoClick = (video) => {
        setSelectedVideo(video);
    };


    const handleCloseImage = () => {
        setSelectedImage(null);
    };

    const handleCloseInstructionImage = () => {
        setSelectedInstructionImage(null);
    };
    const handleCloseColorImage = () => {
        setSelectedColorImage(null);
    };


      
      

    return (
        <div className="text-gray-800">
            <div className="flex justify-around items-center">

                <div className="px-4 sm:px-6 lg:px-8 py-12">
                    <div className="flex flex-col md:flex-row md:space-x-4">
                        <div>
                            <div title={`Link:  ${Product?.productImgLink}\nRemark:  ${Product?.productImgRemark}`} className="md:w-1/2 mb-4 flex justify-center">
                                <img src={`http://localhost:2000/tht/${productCategory === "mallProduct" ? "mallProductImages" : "eventProductImages"}/${Product?.productImg}`} alt="Product" className="rounded-lg w-96 h-96 " />


                            </div>


                        {/* need to paste in here */}
<AddColorImg
Product={Product}
></AddColorImg>

                        </div>
                        <div className="md:w-1/2 text-start pl-5">
                            <div className=" mb-5">
                                <h2 className="text-lg font-semibold">Product Name</h2>
                                <p className="text-base text-gray-700">
                                    {Product?.productName}
                                </p>
                            </div>
                            <div className=" mb-5">
                                <h2 className="text-lg font-semibold">Product Language Code</h2>
                                <p className="text-base text-gray-700">
                                    {Product?.productCountryName}
                                </p>
                            </div>

                            <div className=" mb-5">
                                <h2 className="text-lg font-semibold">Product Price </h2>
                                <p className="text-base text-gray-700">
                                    {Product?.productPrice}
                                </p>
                            </div>

                            <div className=" mb-5">
                                <h2 className="text-lg font-semibold">Product Description</h2>
                                <p className="text-base text-gray-700">
                                    {Product?.productDescription}
                                </p>
                            </div>

                            <h2 className="text-lg font-semibold">Product Details</h2>
                            <div className=" mb-5 grid grid-cols-3 text-gray-700">
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
                                <p className="text-base text-gray-700">
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
                                <h1 className="text-2xl font-bold mt-8 mb-5">Description Image Gallery Of  <span className="text-amber-400">{Product?.productName}</span></h1>
                                <div className="grid grid-cols-3 gap-3">
                                    {(Product?.allDescriptionImages)?.split(",")?.map((image, index) => (
                                        <img
                                            key={index}
                                            src={`http://localhost:2000/tht/${productCategory === "mallProduct" ? "mallProductImages" : "eventProductImages"}/${image}`}
                                            alt={`Image ${index + 1}`}
                                            onClick={() => handleColorImageClick(`http://localhost:2000/tht/mallProductImages/${image}`)}
                                            className="w-24 h-24 object-cover cursor-pointer mx-4 my-2 rounded-lg"
                                        />
                                    ))}
                                </div>
                                {selectedColorImage && (
                                    <div className="fixed inset-0 flex items-center justify-center mx-auto my-auto w-3/4 h-3/4 bg-black bg-opacity-75 z-40">
                                        <div className="max-w-3xl max-h-3xl">
                                            <img
                                                src={selectedColorImage}
                                                alt="Selected Image"
                                                className="mx-auto max-w-10/12 max-h-10/12"
                                            />
                                            <button
                                                onClick={handleCloseColorImage}
                                                className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>

                            <div className="container">
                                <h1 className="text-2xl font-bold mt-8 mb-5">Related Image Gallery Of <span className="text-amber-400">{Product?.productName}</span></h1>
                                <div title={`Link: ${Product?.relatedImgLink}\nRemark: ${Product?.relatedImgRemark}`} className="grid grid-cols-3 gap-3">
                                    {(Product.allImages)?.split(",")?.map((image, index) => (
                                        <img
                                            key={index}
                                            src={`http://localhost:2000/tht/${productCategory === "mallProduct" ? "mallProductImages" : "eventProductImages"}/${image}`}
                                            alt={`Image ${index + 1}`}
                                            onClick={() => handleImageClick(`http://localhost:2000/tht/mallProductImages/${image}`)}
                                            className="w-24 h-24 object-cover cursor-pointer mx-4 my-2 rounded-lg"
                                        />
                                    ))}
                                </div>
                                {selectedImage && (
                                    <div className="fixed inset-0 flex items-center justify-center mx-auto my-auto w-3/4 h-3/4 bg-black bg-opacity-75 z-40 overflow-scroll">
                                        <div className="max-w-3xl max-h-3xl ">
                                            <img
                                                src={selectedImage}
                                                alt="Selected Image"
                                                className="mx-auto max-w-10/12 max-h-10/12"
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
                                <h1 className="text-2xl font-bold mt-8 mb-5">
                                    Related Video Gallery Of{' '}
                                    <span className="text-amber-400">{Product?.productName}</span>{' '}
                                </h1>

                                <div className="grid grid-cols-3 gap-4">
                                    {((Product?.allVideos)?.split(','))?.map((video, index) => (
                                        <div
                                            key={index}
                                            onClick={() =>
                                                handleVideoClick(
                                                    `http://localhost:2000/tht/${productCategory === 'mallProduct'
                                                        ? 'mallProductImages'
                                                        : 'eventProductImages'
                                                    }/${video}`
                                                )
                                            }
                                            className="relative cursor-pointer"
                                        >
                                            <div className="w-full h-auto rounded-lg overflow-hidden">
                                                <ReactPlayer
                                                    url={`http://localhost:2000/tht/${productCategory === 'mallProduct'
                                                        ? 'mallProductImages'
                                                        : 'eventProductImages'
                                                        }/${video}`}
                                                    controls
                                                    width="100%"
                                                    height="100%"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {selectedVideo && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black">
                                        <ReactPlayer
                                            url={selectedVideo}
                                            controls
                                            width="80%" // Adjust the width as needed
                                            height="auto"
                                            playing
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




                            <div className="container">
                                <h1 className="text-2xl font-bold mt-8 mb-5">Instructions Image Gallery Of  <span className="text-amber-400">{Product?.productName}</span></h1>
                                <div className="grid grid-cols-3 gap-3">
                                    {(Product?.allInstructionsImage)?.split(",")?.map((image, index) => (
                                        <img
                                            key={index}
                                            src={`http://localhost:2000/tht/${productCategory === "mallProduct" ? "mallProductImages" : "eventProductImages"}/${image}`}
                                            alt={`Image ${index + 1}`}
                                            onClick={() => handleInstructionImageClick(`http://localhost:2000/tht/mallProductImages/${image}`)}
                                            className="w-24 h-24 object-cover cursor-pointer mx-4 my-2 rounded-lg"
                                        />
                                    ))}
                                </div>
                                {selectedInstructionImage && (
                                    <div className="fixed inset-0 flex items-center justify-center mx-auto my-auto w-3/4 h-3/4 bg-black bg-opacity-75 z-40 overflow-scroll">
                                        <div className="max-w-3xl max-h-3xl ">
                                            <img
                                                src={selectedInstructionImage}
                                                alt="Selected Image"
                                                className="mx-auto max-w-10/12 max-h-10/12"
                                            />
                                            <button
                                                onClick={handleCloseInstructionImage}
                                                className="mt-4 px-4 py-2 bg-gray-800 text-white rounded-lg"
                                            >
                                                Close
                                            </button>
                                        </div>
                                    </div>
                                )}

                            </div>


                            <div className="container">
                                <h1 className="text-2xl font-bold mt-8 mb-5">
                                    Instructions Video Gallery Of{' '}
                                    <span className="text-amber-400">{Product?.productName}</span>{' '}
                                </h1>

                                <div className="grid grid-cols-3 gap-4">
                                    {((Product?.allInstructionsVideos)?.split(','))?.map((video, index) => (
                                        <div
                                            key={index}
                                            onClick={() =>
                                                handleVideoClick(
                                                    `http://localhost:2000/tht/${productCategory === 'mallProduct'
                                                        ? 'mallProductImages'
                                                        : 'eventProductImages'
                                                    }/${video}`
                                                )
                                            }
                                            className="relative cursor-pointer"
                                        >
                                            <div className="w-full h-auto rounded-lg overflow-hidden">
                                                <ReactPlayer
                                                    url={`http://localhost:2000/tht/${productCategory === 'mallProduct'
                                                        ? 'mallProductImages'
                                                        : 'eventProductImages'
                                                        }/${video}`}
                                                    controls
                                                    width="100%"
                                                    height="100%"
                                                />
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                {selectedVideo && (
                                    <div className="fixed inset-0 flex items-center justify-center bg-black">
                                        <ReactPlayer
                                            url={selectedVideo}
                                            controls
                                            width="80%" // Adjust the width as needed
                                            height="auto"
                                            playing
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
