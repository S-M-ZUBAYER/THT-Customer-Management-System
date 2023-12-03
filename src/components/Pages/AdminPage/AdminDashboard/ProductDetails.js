import React, { useContext, useState } from 'react';
import ReactPlayer from 'react-player';
import img from "../../../../Assets/Images/Admin/printer.jpg"
import ProductDetailsLayout from './ProductDetailsLayout/ProductDetailsLayout';
import { AllProductContext } from '../../../../context/ProductContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import AddColorImg from './AddColorImg';
import { CiEdit } from "react-icons/ci";
import EditProductInfo from './EditProductInfo';
import { FiEdit } from 'react-icons/fi';
import { reduceImageResolution, reduceImagesResolution } from './Warehouse&Cities.js/functionForImageResulation';


function ProductDetails() {
    const { Product } = useContext(AllProductContext);
    const url = window.location.href;
    const productCategory = url.split('/')[4];




    const [selectedImage, setSelectedImage] = useState(null);
    const [selectedColorImage, setSelectedColorImage] = useState(null);
    const [selectedInstructionImage, setSelectedInstructionImage] = useState(null);
    const [selectedVideo, setSelectedVideo] = useState(null);
    const [colorImg, setColorImg] = useState("");
    const [selectedColorImages, setSelectedColorImages] = useState([]);
    const [productPrice, setProductPrice] = useState(Product?.productPrice);
    const [productDescription, setProductDescription] = useState(Product?.productDescription);
    const [stockQuantity, setStockQuantity] = useState(Product?.stockQuantity);
    const [modelNumber, setModelNumber] = useState(Product?.modelNumber);

    //modal 
    const [isModalOpen, setIsModalOpen] = useState(false);
    // Inside your component, add a function to open the modal
    const openModal = () => {
        setIsModalOpen(!isModalOpen);
    };

    // Add this function to close the modal
    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleEditSubmit = () => {
        console.log("edit")
    }



    const handleInstructionImageClick = (image) => {
        setSelectedInstructionImage(image);
    };
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };
    const handleColorImageClick = (image) => {
        setSelectedColorImage(image);
    };
    const handleColorImage = (e) => {
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
    const handleStockQuantityChange = (e) => {
        setStockQuantity(e.target.value);
    };

    console.log(Product, "product")



    //edit  part start

    const [productImg, setProductImg] = useState(Product?.productImg);
    const [productImgLink, setProductImgLink] = useState(Product?.productImgLink);
    const [productImgRemark, setProductImgRemark] = useState(Product?.productImgRemark);
    const [productCountryName, setProductCountryName] = useState(Product?.productCountryName);
    const [productName, setProductName] = useState(Product?.productName);
    const [printerColor, setPrinterColor] = useState('');
    const [connectorType, setConnectorType] = useState('');

    const handleProductImgUpload = (event) => {
        // extract the current date and time components
        const preFile = event.target.files[0];
        const file = reduceImageResolution(preFile, 1000);
        file.then((fileObject) => {
            setProductImg(fileObject);
        });


    };

    const handleProductImgLink = (e) => {
        setProductImgLink(e.target.value);

    }

    const handleProductImageRemark = (e) => {
        setProductImgRemark(e.target.value);

    }
    const handleProductCountryNameChange = (e) => {
        setProductCountryName(e.target.value);
    };
    const handleProductNameChange = (e) => {
        setProductName(e.target.value);
    };

    const handleModelNumberChange = (e) => {
        setModelNumber(e.target.value);
    };
    const handlePrinterColorChange = (e) => {
        setPrinterColor(e.target.value);
    };
    const handleConnectorTypeChange = (e) => {
        setConnectorType(e.target.value);
    };

    return (
        <div className="text-gray-800">
            <div className="flex justify-around items-center ">

                <div className="px-4 sm:px-6 lg:px-8 py-12 ">
                    <div className="flex flex-col md:flex-row md:space-x-4">

                        <div>
                            <div className="flex justify-center">
                                <div title={`Link:  ${Product?.productImgLink}\nRemark:  ${Product?.productImgRemark}`} className="md:w-1/2 mb-4 ">
                                    <img src={`https://grozziieget.zjweiting.com:8033/tht/${productCategory === "mallProduct" ? "mallProductImages" : "eventProductImages"}/${Product?.productImg}`} alt="Product" className="rounded-lg w-96 h-96 " />
                                </div>
                            </div>



                            {/* need to paste in here */}
                            <AddColorImg
                                Product={Product}
                            ></AddColorImg>

                        </div>


                        {/* This is the part to start the edit and modal functionalities */}

                        <div className="md:w-1/2 text-start pl-5 relative">
                            <button className="text-blue-500 absolute right-0 font-bold text-3xl cursor-pointer" onClick={openModal}>
                                <FiEdit></FiEdit>
                            </button>
                            {/* <CiEdit className="absolute right-0 font-bold text-3xl cursor-pointer"
                                onClick={openModal}
                            /> */}


                            {isModalOpen && (
                                <div className="fixed z-50 inset-0 flex items-center justify-center mx-auto rounded-lg h-5/6 w-5/6 my-auto bg-gray-900 bg-opacity-50">
                                    <div className="bg-white p-8">
                                        <h2 className="text-lg font-bold mb-4">Edit Product information</h2>
                                        <input type="file"
                                            onChange={handleProductImgUpload}
                                            className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 my-10 px-3 lg:px-10 lg:ml-5 rounded-lg "
                                            accept="image/*" />

                                        <div>
                                            <div className="mb-4 grid  grid-cols-3 text-start">
                                                <label htmlFor="modelNumber" className="block col-span-1 text-gray-200 font-semibold mb-2">
                                                    Product Img Link
                                                </label>
                                                <input
                                                    type="text"
                                                    id="productImgLink"
                                                    className="shadow col-span-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                                    value={productImgLink}
                                                    placeholder='Enter the product Image link'
                                                    onChange={handleProductImgLink}

                                                />
                                            </div>
                                            <div className="mb-4">
                                                <label htmlFor="productImageRemark" className="block text-start text-gray-700 font-bold mb-2">
                                                    Product Image Remarks
                                                </label>
                                                <textarea
                                                    id="productImageRemark"
                                                    placeholder="Add product Image Remark"
                                                    className="shadow resize-none appearance-none border rounded-lg w-full h-44  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                                    value={productImgRemark}
                                                    onChange={handleProductImageRemark}
                                                ></textarea>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="w-full md:w-1/2 p-8">
                                        {/* <form onSubmit={handleSubmit}> */}
                                        <div className="mb-4">
                                            <select
                                                id="productCountryCategory"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                                value={productCountryName}
                                                onChange={handleProductCountryNameChange}
                                                required
                                            >
                                                <option value="">Select Country Category</option>
                                                <option value="zh-CN">中文</option>
                                                <option value="en-US">English</option>
                                                <option value="th-TH">ไทย</option>
                                                <option value="fil-PH">Philippines</option>
                                                <option value="vi-VN">Tiếng Việt</option>
                                                <option value="ms-MY">Malaysia</option>
                                                <option value="id-ID">Indonesia</option>
                                            </select>
                                        </div>

                                        <div className="mb-4">
                                            <select
                                                id="productName"
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                                value={productName}
                                                onChange={handleProductNameChange}
                                                required
                                            >
                                                <option value="">Select Product</option>
                                                <option value="Dot Printer">Dot Printer</option>
                                                <option value="Thermal Printer">Thermal Printer</option>
                                                <option value="Attendance Machine">Attendance Machine</option>
                                            </select>
                                        </div>


                                        <div className="mb-4">

                                            <input
                                                type="digit"
                                                id="productPrice"
                                                placeholder='Product Price'
                                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                                value={productPrice}
                                                onChange={handleProductPriceChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-4">
                                            <label htmlFor="productDescription" className="block text-start text-gray-200 font-bold mb-2">
                                                Product Description
                                            </label>


                                            <textarea
                                                id="productDescription"
                                                placeholder="Add Product description"
                                                className="shadow resize-both appearance-none border rounded-lg w-full min-h-20 max-h-100 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                                value={productDescription}
                                                onChange={handleProductDescriptionChange}
                                                required
                                                rows={5} // Initial number of visible text lines
                                            ></textarea>


                                        </div>

                                        <h2 className="text-lg text-gray-200 font-bold text-start my-10">
                                            Product Details
                                        </h2>
                                        <div className="mb-4 grid  grid-cols-3 text-start mr-14">
                                            <label htmlFor="modelNumber" className="block col-span-1 text-gray-200 font-semibold mb-2">
                                                Model Number
                                            </label>
                                            <input
                                                type="text"
                                                id="modelNumber"
                                                className="shadow col-span-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                                value={modelNumber}
                                                placeholder='Model Number'
                                                onChange={handleModelNumberChange}
                                                required
                                            />
                                        </div>
                                        <div className="mb-4 grid  grid-cols-3 text-start mr-14">
                                            <label htmlFor="modelNumber" className="block col-span-1 text-gray-200 font-semibold mb-2">
                                                Printer Color
                                            </label>
                                            <input
                                                type="text"
                                                id="printerColor"
                                                className="shadow col-span-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                                value={printerColor}
                                                placeholder='Color'
                                                onChange={handlePrinterColorChange}

                                            />
                                        </div>
                                        <div className="mb-4 grid  grid-cols-3 text-start mr-14">
                                            <label htmlFor="modelNumber" className="block col-span-1 text-gray-200 font-semibold mb-2">
                                                connector type
                                            </label>
                                            <input
                                                type="text"
                                                id="connectorType"
                                                className="shadow col-span-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                                value={connectorType}
                                                placeholder='Bluetooth'
                                                onChange={handleConnectorTypeChange}


                                            />
                                        </div>
                                        <div className="my-8 mt-16 grid  grid-cols-3 text-start mr-14">
                                            <label htmlFor="modelNumber" className="block col-span-1 text-gray-200 font-bold mb-2">
                                                Stock Quantity
                                            </label>
                                            <input
                                                type="text"
                                                id="stockQuantity"
                                                className="shadow col-span-2  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                                value={stockQuantity}
                                                placeholder='Add quantity'
                                                onChange={handleStockQuantityChange}

                                            />
                                        </div>

                                        <div>
                                            <button
                                                onClick={handleEditSubmit}
                                                className="bg-blue-500 text-white px-4 py-2 rounded-md mr-5 px-8"

                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={closeModal}
                                                className="bg-yellow-500 text-white px-4 py-2 rounded-md"

                                            >
                                                Cancel
                                            </button>
                                        </div>


                                    </div>
                                    <p></p>
                                </div>
                            )}





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
                                            src={`https://grozziieget.zjweiting.com:8033/tht/${productCategory === "mallProduct" ? "mallProductImages" : "eventProductImages"}/${image}`}
                                            alt={`Image ${index + 1}`}
                                            onClick={() => handleColorImageClick(`https://grozziieget.zjweiting.com:8033/tht/${productCategory === "mallProduct" ? "mallProductImages" : "eventProductImages"}/${image}`)}
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
                                {
                                    Product && <div title={`Link: ${Product?.relatedImgLink}\nRemark: ${Product?.relatedImgRemark}`} className="grid grid-cols-3 gap-3">
                                        {(Product.allImages)?.split(",")?.map((image, index) => (
                                            <img
                                                key={index}
                                                src={`https://grozziieget.zjweiting.com:8033/tht/${productCategory === "mallProduct" ? "mallProductImages" : "eventProductImages"}/${image}`}
                                                alt={`Image ${index + 1}`}
                                                onClick={() => handleImageClick(`https://grozziieget.zjweiting.com:8033/tht/${productCategory === "mallProduct" ? "mallProductImages" : "eventProductImages"}/${image}`)}
                                                className="w-24 h-24 object-cover cursor-pointer mx-4 my-2 rounded-lg"
                                            />
                                        ))}
                                    </div>
                                }

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
                                                    `https://grozziieget.zjweiting.com:8033/tht/${productCategory === 'mallProduct'
                                                        ? 'mallProductImages'
                                                        : 'eventProductImages'
                                                    }/${video}`
                                                )
                                            }
                                            className="relative cursor-pointer"
                                        >
                                            <div className="w-full h-auto rounded-lg overflow-hidden">
                                                <ReactPlayer
                                                    url={`https://grozziieget.zjweiting.com:8033/tht/${productCategory === 'mallProduct'
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
                                            src={`https://grozziieget.zjweiting.com:8033/tht/${productCategory === "mallProduct" ? "mallProductImages" : "eventProductImages"}/${image}`}
                                            alt={`Image ${index + 1}`}
                                            onClick={() => handleInstructionImageClick(`https://grozziieget.zjweiting.com:8033/tht/${productCategory === "mallProduct" ? "mallProductImages" : "eventProductImages"}/${image}`)}
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
                                                    `https://grozziieget.zjweiting.com:8033/tht/${productCategory === 'mallProduct'
                                                        ? 'mallProductImages'
                                                        : 'eventProductImages'
                                                    }/${video}`
                                                )
                                            }
                                            className="relative cursor-pointer"
                                        >
                                            <div className="w-full h-auto rounded-lg overflow-hidden">
                                                <ReactPlayer
                                                    url={`https://grozziieget.zjweiting.com:8033/tht/${productCategory === 'mallProduct'
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
