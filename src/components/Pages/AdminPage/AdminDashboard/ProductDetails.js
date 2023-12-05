import React, { useContext, useState } from 'react';
import ReactPlayer from 'react-player';
import img from "../../../../Assets/Images/Admin/printer.jpg"
import ProductDetailsLayout from './ProductDetailsLayout/ProductDetailsLayout';
import { AllProductContext } from '../../../../context/ProductContext';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import AddColorImg from './AddColorImg';
import { CiEdit } from "react-icons/ci";
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
    const [productPrice, setProductPrice] = useState(Product?.productPrice);
    const [productDescription, setProductDescription] = useState(Product?.productDescription);
    const [stockQuantity, setStockQuantity] = useState(Product?.stockQuantity);
    const [modelNumber, setModelNumber] = useState(Product?.modelNumber);

   



    const handleInstructionImageClick = (image) => {
        setSelectedInstructionImage(image);
    };
    const handleImageClick = (image) => {
        setSelectedImage(image);
    };
    const handleColorImageClick = (image) => {
        setSelectedColorImage(image);
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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isRelatedModalOpen, setIsRelatedModalOpen] = useState(false);
    const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
    const [newProductImg, setNewProductImg] = useState(null);
    const [productImgLink, setProductImgLink] = useState(Product?.productImgLink);
    const [productImgRemark, setProductImgRemark] = useState(Product?.productImgRemark);
    const [productCountryName, setProductCountryName] = useState(Product?.productCountryName);
    const [productName, setProductName] = useState(Product?.productName);
    const [printerColor, setPrinterColor] = useState(Product?.printerColor);
    const [connectorType, setConnectorType] = useState(Product?.connectorType);
    const [relatedImgRemark, setRelatedImgRemark] = useState(Product?.relatedImgRemark);
    const [relatedImgLink, setRelatedImgLink] = useState(Product?.relatedImgLink);
    const [shelfStartTime, setShelfStartTime] = useState(Product?.shelfStartTime);
    const [shelfEndTime, setShelfEndTime] = useState(Product?.shelfEndTime);
    const [afterSalesText, setAfterSalesText] = useState(Product?.afterSalesText);
    const [afterSalesInstruction, setAfterSalesInstruction] = useState(Product?.afterSalesInstruction);
    const [inventoryText, setInventoryText] = useState(Product?.inventoryText);


    const [relatedImages,setRelatedImages]=useState(null);
    const [descriptionImages,setDescriptionImages]=useState(null);

     //modal 
 
     // Inside your component, add a function to open the modal
     const openModal = () => {
         setIsModalOpen(!isModalOpen);
     };
     const openRelatedModal = () => {
         setIsRelatedModalOpen(!isRelatedModalOpen);
     };
     const openDescriptionModal = () => {
         setIsDescriptionModalOpen(!isDescriptionModalOpen);
     };
 
     // Add this function to close the modal
     const closeModal = () => {
         setIsModalOpen(false);
     };
     const closeRelatedModal = () => {
         setIsRelatedModalOpen(false);
     };
     const closeDescriptionModal = () => {
         setIsDescriptionModalOpen(false);
     };
 
     

   
   

      const handleEditSubmit = async (productId) => {
        
        if(newProductImg===null){
            
            toast.error("Please select a product image");
            return;
        }
        const formData = new FormData();
        formData.append('newProductImg', newProductImg);
    
        try {
            // Prepare the updated product data
            const updatedProduct = {
                oldImg: Product?.productImg,
                productImgLink,
                productImgRemark,
                productCountryName,
                productDescription,
                modelNumber,
                productPrice,
                relatedImgLink,
                productName,
                printerColor,
                stockQuantity,
                shelfStartTime,
                shelfEndTime,
                connectorType,
                relatedImgRemark,
                afterSalesText,
                afterSalesInstruction,
                inventoryText,
            };
    
            formData.append('updatedProduct', JSON.stringify(updatedProduct));
    
            // Make an API call to update the product
            const response = await axios.put(`https://grozziieget.zjweiting.com:8033/tht/${Product?.imgPath.split("/")[4]}/update/${productId}`, formData);
    
            // Check the response and handle accordingly
            if (response.status === 200) {
                console.log('Product updated successfully:', response.data);
                toast.success('Product updated successfully:', response.data);
                Product.productImg=newProductImg;
                Product.modelNumber=updatedProduct.modelNumber;
                Product.productImgLink=updatedProduct?.productImgLink;
                Product.productImgRemark=updatedProduct?.productImgRemark;
                Product.productCountryName=updatedProduct?.productCountryName;
                Product.productDescription=updatedProduct?.productDescription;
                Product.modelNumber=updatedProduct?.modelNumber;
                Product.productPrice=updatedProduct?.productPrice;
                Product.relatedImgLink=updatedProduct?.relatedImgLink;
                Product.productName=updatedProduct?.productName;
                Product.printerColor=updatedProduct?.printerColor;
                Product.stockQuantity=updatedProduct?.stockQuantity;
                Product.shelfStartTime=updatedProduct?.shelfStartTime;
                Product.shelfEndTime=updatedProduct?.shelfEndTime;
                Product.connectorType=updatedProduct?.connectorType;
                Product.relatedImgRemark=updatedProduct?.relatedImgRemark;
                Product.afterSalesText=updatedProduct?.afterSalesText;
                Product.afterSalesInstruction=updatedProduct?.afterSalesInstruction;
                Product.inventoryText=updatedProduct?.inventoryText;


                openModal();
                // Perform any additional actions after a successful update
            } else {
                console.error('Failed to update product:', response.data);
                toast.error('Failed to update product:', response.data);
    
                // Handle the failure, show an error message, etc.
            }
        } catch (error) {
            console.error('Error updating product:', error);
            toast.error('Error updating product:', error);
            // Handle the error, show an error message, etc.
        }
    };

  


    const handleProductImgUpload = (event) => {
        const preFile = event.target.files[0];
        const file = reduceImageResolution(preFile, 1000);
        file.then((fileObject) => {
            setNewProductImg(fileObject);
        });
    };

   
    
    const handleRelatedImgUpload = (e) => {
        const relatedImages = Array.from(e.target.files);
        const resizePromises = relatedImages.map((image) => reduceImageResolution(image, 1000));
    
        Promise.all(resizePromises)
          .then((resizedImages) => {
            setRelatedImages(resizedImages);
          });
      };

      const handleDescriptionImgUpload = (e) => {
        const images = Array.from(e.target.files);
        const updateImagesPromises = images.map((image) => reduceImageResolution(image, 1000));
    
        Promise.all(updateImagesPromises)
          .then((reducedImages) => {
            setDescriptionImages(reducedImages);
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
    const handleRelatedImgLink = (e) => {
        setRelatedImgLink(e.target.value);

    }

    const handleRelatedImageRemark = (e) => {
        setRelatedImgRemark(e.target.value);

    }
    const handleShelfStartTimeChange = (e) => {
        setShelfStartTime(e.target.value);
    };
    const handleShelfEndTimeChange = (e) => {
        setShelfEndTime(e.target.value);
    };
    const handleAfterSalesTextChange = (e) => {
        setAfterSalesText(e.target.value);
    };
    const handleAfterSalesInstructionChange = (e) => {
        setAfterSalesInstruction(e.target.value);
    };
    const handleInventoryTextChange = (e) => {
        setInventoryText(e.target.value);
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
                                <div className="fixed z-50 inset-0 grid grid-cols-2 mx-auto rounded-lg h-5/6 w-5/6 my-auto bg-gray-900 bg-opacity-50">
                                    <div className="bg-white w-11/12 my-4 mx-auto p-2 px-8 text-center rounded-lg">
                                        <h2 className="text-lg font-bold mb-2">Edit Product information</h2>
                                        <input type="file"
                                            onChange={handleProductImgUpload}
                                            className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 my-2 px-3 lg:px-2 lg:ml-5 rounded-lg "
                                            accept="image/*" />

                                        <div>
                                            <div className="mb-2 grid  grid-cols-3 text-start">
                                                <label htmlFor="modelNumber" className="block col-span-1 text-gray-200 font-semibold mb-2">
                                                    Img Link
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
                                            <div className="mb-2">
                                                <label htmlFor="productImageRemark" className="block text-start text-gray-700 font-bold mb-2">
                                                    Image Remarks
                                                </label>
                                                <textarea
                                                    id="productImageRemark"
                                                    placeholder="Add product Image Remark"
                                                    className="shadow resize-both appearance-none border rounded-lg w-full h-20  py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                                    value={productImgRemark}
                                                    onChange={handleProductImageRemark}
                                                ></textarea>
                                            </div>

                                        </div>

                                        <div className="mb-2">
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

                                        <div className="mb-2">
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


                                        <div className="mb-2">

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
                                        <div className="mb-2">
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
                                    </div>
                                    <div className="w-full py-2 px-8">
                                        {/* <form onSubmit={handleSubmit}> */}


                                        
                                        <div className="mb-2 grid  grid-cols-3 text-start ">
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
                                        <div className="mb-2 grid  grid-cols-3 text-start ">
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
                                        <div className="mb-2 grid  grid-cols-3 text-start ">
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
                                        <div className="mb-2 grid  grid-cols-3 text-start ">
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

                                        <div className="mb-1 grid  grid-cols-3 text-start">
                                            <label htmlFor="relatedImgLink" className="block col-span-1 text-gray-500 font-semibold mb-1">
                                                Related Imgs Link
                                            </label>
                                            <input
                                                type="text"
                                                id="relatedImgLink"
                                                className="shadow col-span-2  appearance-none border rounded w-full py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                                value={relatedImgLink}
                                                placeholder='Enter the related Image link'
                                                onChange={handleRelatedImgLink}

                                            />
                                        </div>
                                        <div className="mb-1">
                                            <label htmlFor="productImageRemark" className="block text-start text-gray-700 font-bold mb-1">
                                                Related Images Remarks
                                            </label>
                                            <textarea
                                                id="relatedImgRemark"
                                                placeholder="Add product related Image Remark"
                                                className="shadow resize-both appearance-none border rounded-lg w-full h-10  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                                value={relatedImgRemark}
                                                onChange={handleRelatedImageRemark}
                                            ></textarea>
                                        </div>
                                        <div className="mb-1">
                                            <label htmlFor="shelfTimeStart" className="block text-start text-gray-700 font-bold mb-2">
                                                Shelf Time
                                            </label>
                                            <div className="flex items-center justify-between">
                                                <input
                                                    type="datetime-local"
                                                    id="shelfTimeStart"
                                                    className="shadow appearance-none border rounded py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                                    value={shelfStartTime}
                                                    onChange={handleShelfStartTimeChange}
                                                />
                                                <input
                                                    type="datetime-local"
                                                    id="shelfTimeEnd"
                                                    className="shadow appearance-none border rounded  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                                    value={shelfEndTime}
                                                    onChange={handleShelfEndTimeChange}
                                                />
                                            </div>
                                        </div>

                                        <div className="mb-1">
                                            <label htmlFor="afterSales" className="block text-gray-700 font-bold mb-1 text-start">
                                                After-Sales
                                            </label>
                                            <textarea
                                                id="afterSales"
                                                placeholder="Add after-sales description"
                                                className="shadow resize-both appearance-none border rounded w-full h-16 py-1 px-3  text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                                value={afterSalesText}
                                                onChange={handleAfterSalesTextChange}
                                            ></textarea>
                                        </div>
                                        <div className="mb-1">
                                            <label htmlFor="afterSalesInstructions" className="block text-start text-gray-700 font-bold mb-1">
                                                After-Sales Instructions
                                            </label>
                                            <textarea
                                                id="afterSalesInstructions"
                                                placeholder='Add after-sales instructions'
                                                className="shadow resize-both appearance-none border rounded-lg w-full h-16  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                                value={afterSalesInstruction}
                                                onChange={handleAfterSalesInstructionChange}
                                            ></textarea>
                                        </div>
                                        <div className="mb-1">
                                            <label htmlFor="inventory" className="block text-start text-gray-700 font-bold mb-1">
                                                Inventory
                                            </label>
                                            <textarea
                                                id="inventory"
                                                placeholder="Add inventory description"
                                                className="shadow resize-both appearance-none border rounded-lg w-full h-16  py-1 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline bg-white"
                                                value={inventoryText}
                                                onChange={handleInventoryTextChange}
                                            ></textarea>
                                        </div>

                                        <div className="mt-8 text-right">
                                            <button
                                                onClick={()=>handleEditSubmit(Product?.id)}
                                                className="bg-blue-500 text-white  py-2 rounded-md mr-5 px-16 font-bold"

                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={closeModal}
                                                className="bg-yellow-500 text-white px-16 py-2 rounded-md font-bold"

                                            >
                                                Cancel
                                            </button>
                                        </div>


                                    </div>
                                   
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

                            <div className="container relative">
                            <button className="text-blue-500 absolute right-0 font-bold text-3xl cursor-pointer" onClick={openDescriptionModal}>
                                <FiEdit></FiEdit>
                            </button>




                            {isDescriptionModalOpen && (
                                <div className="fixed z-50 inset-0  mx-auto rounded-lg h-1/3 w-1/3 my-auto bg-gray-900 bg-opacity-50">
                                    <div className="bg-white w-11/12 my-4 mx-auto p-2 px-8 text-center rounded-lg">
                                        <h2 className="text-lg font-bold mb-2">Edit Description img</h2>
                                        <input type="file"
                                            onChange={handleDescriptionImgUpload}
                                            className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 my-2 px-3 lg:px-2 lg:ml-5 rounded-lg "
                                            accept="image/*" />

                                        

                                        <div className="mt-8 text-right">
                                            <button
                                                onClick={()=>handleEditSubmit(Product?.id)}
                                                className="bg-blue-500 text-white  py-2 rounded-md mr-5 px-16 font-bold"

                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={closeDescriptionModal}
                                                className="bg-yellow-500 text-white px-16 py-2 rounded-md font-bold"

                                            >
                                                Cancel
                                            </button>
                                        </div>


                                    </div>
                                   
                                </div>
                            )}





                            
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

                            <div className="container relative">
                            <button className="text-blue-500 absolute right-0 font-bold text-3xl cursor-pointer" onClick={openRelatedModal}>
                                <FiEdit></FiEdit>
                            </button>



                            {isRelatedModalOpen && (
                                <div className="fixed z-50 inset-0  mx-auto rounded-lg h-1/3 w-1/3 my-auto bg-gray-900 bg-opacity-50">
                                    <div className="bg-white w-11/12 my-4 mx-auto p-2 px-8 text-center rounded-lg">
                                        <h2 className="text-lg font-bold mb-2">Edit Related  img</h2>
                                        <input type="file"
                                            onChange={handleRelatedImgUpload}
                                            className="bg-[#004368] hover:bg-blue-700 text-white font-bold py-2 my-2 px-3 lg:px-2 lg:ml-5 rounded-lg "
                                            accept="image/*" />

                                        

                                        <div className="mt-8 text-right">
                                            <button
                                                onClick={()=>handleEditSubmit(Product?.id)}
                                                className="bg-blue-500 text-white  py-2 rounded-md mr-5 px-16 font-bold"

                                            >
                                                Edit
                                            </button>
                                            <button
                                                onClick={closeRelatedModal}
                                                className="bg-yellow-500 text-white px-16 py-2 rounded-md font-bold"

                                            >
                                                Cancel
                                            </button>
                                        </div>


                                    </div>
                                   
                                </div>
                            )}





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
